import { readFileSync, writeFileSync } from "fs";
import { labelReplace } from "@x-drive/utils";
import { ensureDir, copy } from "fs-extra";
import path from "path";

/**配置 */
interface Options {
    /**最终文件输出目录 */
    target?: string;

    /**源文件地址 */
    sources?: string;

    /**要处理的文件名 */
    list?: string[];

    /**是否复制文件 */
    copyFile?: boolean;

    /**替换用的数据 */
    data?: Record<string, string>;
}

function processor(options: Options = {}) {
    var { target, sources, copyFile = true, list = [], data = {} } = options;
    return {
        "name": "replace-html-vars"
        , async generateBundle({ dir }) {
            if (!target) {
                if (dir) {
                    const dirArr = dir.split("/");
                    dirArr.pop();
                    target = dirArr.join("/");
                } else {
                    throw new Error("Target dir is required.");
                }
            }

            await ensureDir(target);

            if (copyFile) {
                await copy(sources, target);
            }

            if (list && list.length) {
                list.forEach(async (name) => {
                    const filePath = path.resolve(target, name);
                    var fileStr = readFileSync(filePath, "utf8");
                    fileStr = labelReplace(fileStr, data, true);
                    writeFileSync(filePath, fileStr);
                });
            }
        }
    }
}

export { processor as replaceHtmlVars };

export default processor;