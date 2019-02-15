// see https://wallabyjs.com/docs/integration/angular.html#jest
module.exports = function () {

    const jestTransform = file => require('jest-preset-angular/preprocessor').process(file.content, file.path, {
      globals: {
        __TRANSFORM_HTML__: true,
      },
      rootDir: __dirname
    });
  
    return {
      files: [
        'src/app/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
        'jest.config.js',
        { pattern: '.babelrc', instrument: false },
        'src/setup-jest.ts',
        'src/__mocks__/jestGlobalMocks.ts',
        '!src/app/**/*.+(spec|test).ts'
      ],
  
      tests: [
          'src/app/**/*.+(spec|test).ts',
      ],
  
      env: {
        type: 'node',
        runner: 'node'
      },
  
      preprocessors: {
        'src/**/*.js': [
          jestTransform,
          (file) => require('@babel/core').transform(file.content, {
            sourceMap: true,
            filename: file.path,
            presets: [require('babel-preset-jest')]
          })
        ]
      },
  
      compilers: {
          '**/*.html': file => ({
              code: jestTransform(file),
              map: {
              version: 3,
              sources: [],
              names: [],
              mappings: []
              },
              ranges: []
          })
      },
  
      testFramework: 'jest',
  
      setup: wallaby => {
          const jestConfig = require('./jest.config');
          jestConfig.transform = {
            '^.*node_modules.*\\.(js|jsx|mjs)$': 'babel-jest',
            '^.+\\.(ts|js)$': '<rootDir>/node_modules/jest-preset-angular/preprocessor.js',
          }; 
          wallaby.testFramework.configure(jestConfig);
      }
    };
  };
  
