import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import pkg from "./package.json" assert { type: "json" };
import { dts } from "rollup-plugin-dts";
import del from "rollup-plugin-delete";

const jsBundleConfig = {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
        },
        {
            file: pkg.module,
            format: "esm",
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json",
            declarationDir: "./types",
            exclude: [
                "**/*.test.ts",
                "**/*.test.tsx",
                "**/*.stories.ts",
                "**/*.stories.tsx",
            ],
        }),
        terser(),
    ],
    external: ["react"],
};

// Type Declarations Configuration
const dtsConfig = {
    input: "dist/types/index.d.ts",
    output: {
        file: "dist/harpa-player.d.ts",
        format: "es",
    },
    plugins: [dts(), del({ hook: "buildEnd", targets: "dist/types" })],
};

export default [jsBundleConfig, dtsConfig];
