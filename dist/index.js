'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var fsExtra = require('fs-extra');
var path = _interopDefault(require('path'));

/**
 * 数据类型判断
 * @param  subject 待判断的数据
 * @param  type    数据类型名字
 * @return         判断结果
 */
function is(subject, type) {
    return Object.prototype.toString.call(subject).substr(8, type.length).toLowerCase() === type;
}

/**
 * 是否是数组
 * @param  subject 待判断的数据
 */
function isObject(subject) {
    return is(subject, "object");
}

/**
 * 是否 undefined
 * @param  subject 待判断的数据
 */
function isUndefined(subject) {
    return is(subject, "undefined");
}

/**
 * 带花括号标签检测正则
 * @type {RegExp}
 */
var labelReplaceExp = /\{(\w+)\}/g;
/**
 * 批量替换字符串中带花括号标签为指定数据
 * @param  tpl  待处理的字符串
 * @param  data 替换数据
 * @param  keep 是否保留未能解析的标签
 * @return      替换后端字符串
 * @example
 * ```tsx
 * labelReplace('{a}/{b}/c', {a: 1, b: 2}) // 1/2/c
 * labelReplace('{a}/{b}/c', {a: 1}, true) // 1/{b}/c
 * ```
 */
function labelReplace(tpl, data, keep) {
    if ( keep === void 0 ) keep = false;

    return tpl.replace(labelReplaceExp, function (_, key) {
        var re = isObject(data) ? data[key] : data;
        if (isUndefined(re) && keep) {
            return _;
        }
        return re;
    });
}

function processor(options = {}) {
    var { target, sources, copyFile = true, list = [], data = {} } = options;
    return {
        "name": "replace-html-vars",
        async generateBundle({ dir }) {
            if (!target) {
                if (dir) {
                    const dirArr = dir.split("/");
                    dirArr.pop();
                    target = dirArr.join("/");
                }
                else {
                    throw new Error("Target dir is required.");
                }
            }
            await fsExtra.ensureDir(target);
            if (copyFile) {
                await fsExtra.copy(sources, target);
            }
            if (list && list.length) {
                list.forEach(async (name) => {
                    const filePath = path.resolve(target, name);
                    var fileStr = fs.readFileSync(filePath, "utf8");
                    fileStr = labelReplace(fileStr, data);
                    fs.writeFileSync(filePath, fileStr);
                });
            }
        }
    };
}

exports.default = processor;
exports.replaceHtmlVars = processor;
//# sourceMappingURL=index.js.map
