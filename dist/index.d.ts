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
declare function processor(options?: Options): {
    name: string;
    generateBundle({ dir }: {
        dir: any;
    }): Promise<void>;
};
export { processor as replaceHtmlVars };
export default processor;
