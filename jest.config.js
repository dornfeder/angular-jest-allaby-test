const esModules = ['lodash-es'].join('|');

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
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
    transform: { 
        [`(${esModules}).+\\.js$`]: 'babel-jest',
        '^.+\\.(ts|js)$': 'jest-preset-angular/preprocessor.js',
        '^.+\\.html$': 'jest-preset-angular/preprocessor.js',
    }
};
