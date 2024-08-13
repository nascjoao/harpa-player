/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transform: {
        "^.+.tsx?$": ["ts-jest", {}],
    },
};
