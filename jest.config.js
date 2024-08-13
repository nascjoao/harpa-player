/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "^@harpa-player$": "<rootDir>/src/index.ts",
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};
