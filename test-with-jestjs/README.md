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
