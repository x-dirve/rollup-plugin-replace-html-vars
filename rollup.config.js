import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import cjs from "rollup-plugin-commonjs";
import alias from "rollup-plugin-alias";
import babel from "rollup-plugin-babel";
import { join } from "path";

const cwd = __dirname;

const baseConfig = {
    "input": join(cwd, "src/index.ts")
    ,"output": [
        {
            "file": join(cwd, "dist/index.js")
            ,"format": "cjs"
            ,"sourcemap": true
            ,"exports": "named"
        }
    ]
    , "external": ["fs", "path", "fs-extra"]
    ,"plugins": [
        resolve({
            preferBuiltins: false
        })
        ,cjs()
        ,babel({
            "babelrc": false
            ,"presets": [
                ["@babel/preset-env", {
                    modules: false
                }]
            ]
            ,"plugins": [
                [
                    "import"
                    , {
                        "libraryName": "@x-drive/utils"
                        , "libraryDirectory": "dist/libs"
                        , "camel2DashComponentName": false
                    }
                    , "@x-drive/utils"
                ]
            ]
            , "include": "node_modules/@x-drive"

        })
        ,typescript()
    ]
}
const esmConfig = Object.assign({}, baseConfig, {
    "output": Object.assign({}, baseConfig.output, {
        "sourcemap": true
        ,"format": "es"
        ,"file": join(cwd, "dist/index.esm.js")
    })
    , "external": ["fs", "path", "fs-extra"]
   , "plugins": [
        babel({
            "babelrc": false
            ,"presets": [
                ["@babel/preset-env", {
                    "modules": false
                }]
            ]
            ,"plugins": [
                [
                    "import"
                    , {
                        "libraryName": "@x-drive/utils"
                        , "libraryDirectory": "dist/libs"
                        , "camel2DashComponentName": false
                    }
                    , "@x-drive/utils"
                ]
            ]
            , "include": "node_modules/@x-drive"
        })
        ,alias({
            "entries": [
                {
                    "find": "@x-drive/utils",
                    "replacement": join(cwd, "node_modules/@x-drive/utils/dist/index.esm")
                }
            ]
        })
        ,typescript()
    ]
});

export default [baseConfig, esmConfig];
