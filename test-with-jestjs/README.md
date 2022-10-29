# Test with JestJS

- [jestjs]()

Getting started

```bash
npm install --save-dev jest babel-jest @babel/core @babel/preset-env
node ./node_modules/jest/bin/jest.js --init
```

## Debug Jest with vscode

```json
// .vscode/launch.json
    {
      "type": "node",
      "request": "launch",
      "name": "Jest: current file",
      "cwd": "${workspaceRoot}/test-with-jestjs",
      "program": "${workspaceFolder}/test-with-jestjs/node_modules/jest/bin/jest.js",
      "args": ["${fileBasenameNoExtension}", "--config", "jest.config.js"],
      "console": "integratedTerminal"
    },
```

## Mocks

- [Es6 class mocks](https://jestjs.io/docs/es6-class-mocks)
- [Google Test Primer](https://github.com/google/googletest/blob/main/docs/primer.md#test-fixtures-using-the-same-data-configuration-for-multiple-tests-same-data-multiple-tests)
- [Test fixture](https://en.wikipedia.org/wiki/Test_fixture)
- [Mock vs Stub & Spy](https://www.javatpoint.com/mock-vs-stub-vs-spy)
