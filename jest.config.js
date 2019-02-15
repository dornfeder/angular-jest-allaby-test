module.exports = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/__mocks__/",
        "/environments/"
    ],
    collectCoverage: true,
    roots: ['src'],
    globals: {
        "ts-jest": {
            "tsConfigFile": "tsconfig.json"
        },
        "__TRANSFORM_HTML__": true
    },
    reporters: [
        "default",
        ["jest-junit", {
            output: "./output/jest/report/junit.xml",
            usePathForSuiteName: "true"
        }],
        ["jest-html-reporter", {
            pageTitle: "Test Report",
            outputPath: "./output/jest/report/index.html"
        }]
    ],    
    coverageReporters: ["html","lcovonly"],
    coverageDirectory: "./output/jest/coverage/",
    testURL: "http://localhost/",
    transformIgnorePatterns: [
        "/!node_modules\\/lodash-es/"
    ],
    transform: { "^.+\\.(js|jsx|mjs)$": "./node_modules/babel-jest"}
};
