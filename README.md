# Rollup html 处理插件

一些前端工程需要根据需要将 html 页面输出到不同的目录中，该插件可以通过设置将指定目录下的文件复制到指定目录并处理指定文件

## 使用
```ts
import { replaceHtmlVars } from "@x-drive/rollup-plugin-replace-html-vars";

export default {
    // ...其他配置
    "plugins": [
        replaceHtmlVars({
			// 模块配置
		})
    ]
}

```

## 参数
- `target` 最终文件输出目录，如未配置则会尝试在 `output.dir` 中获取
- `sources` 源文件地址
- `list` 要处理的文件名
- `copyFile` 是否复制文件
- `data` 替换用的数据