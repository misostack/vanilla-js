# Headfirst Unit Test

> What is unit test and how to write test for javascript application?

- [Unit testing for NodeJS/Javascript using mocha and chai](https://www.browserstack.com/guide/unit-testing-for-nodejs-using-mocha-and-chai)

> Mocha is a widely used JavaScript test framework

> Chai is an assertion library that is mostly used alongside Mocha. It can be used both as a BDD / TDD assertion library

## There are couple of concepts we will use when write unit test

### Test Driven Development (TDD)

- Create precise tests
- Correcting the Code
- Refactor the Code

> It means you have to create all precise tests and refactor your code until all tests are passed

### Behavioral-Driven Development (BDD)

A derived from TDD methodology, but tests are mainly based on system behavior.
Eg:

- Given the user has entered valid login credentials
- When a user clicks on the login button
- Then display the successful validation message

## Let's write some tests with mocha and chai

```bash
npm install mocha chai @babel/cli @babel/core @babel/polyfill @babel/preset-env @babel/register --save-dev
```

```js
import { describe, it } from "mocha";
import { expect } from "chai";

describe("app.js", () => {
  it("should be valid", () => {
    expect(true).equal(true);
  });
});
```

### To support ES6

```bash
npm i @babel/cli @babel/core @babel/polyfill @babel/preset-env @babel/register --save-dev
  "@babel/cli": "^7.19.3",
  "@babel/core": "^7.19.6",
  "@babel/polyfill": "^7.12.1",
  "@babel/preset-env": "^7.19.4",
  "@babel/register": "^7.18.9",
```

```yml
#.mocharc.yml
# This is an example Mocha config containing every Mocha option plus others.
allow-uncaught: false
async-only: false
bail: false
check-leaks: false
color: true
delay: false
diff: true
exit: false # could be expressed as "no-exit: true"
extension: ["js", "cjs", "mjs"]
fail-zero: true
# # fgrep and grep are mutually exclusive
# fgrep: "something"
# # file:
# #   - "/path/to/some/file"
# #   - "/path/to/some/other/file"
# forbid-only: false
# forbid-pending: false
# full-trace: false
# global:
#   - "jQuery"
#   - "$"
# # fgrep and grep are mutually exclusive
# # grep: "/something/i" # also 'something'
# growl: false
# # ignore:
# #   - "/path/to/some/ignored/file"
# inline-diffs: false
# # needs to be used with grep or fgrep
# # invert: false
# jobs: 1
# node-option:
#   - "unhandled-rejections=strict" # without leading "--", also V8 flags
# package: "./package.json"
# parallel: false
# recursive: false
# reporter: "spec"
# # reporter-option: # array, not object
# #   - "foo=bar"
# #   - "baz=quux"
require:
  - "@babel/polyfill"
  - "@babel/register"
# retries: 1
# slow: 75
# sort: false
spec:
  - "spec/*.spec.js" # the positional arguments!
  - "spec/**/*.spec.js" # the positional arguments!
timeout: 100000 # same as "timeout: '2s'"
# # timeout: false # same as "timeout: 0"
trace-warnings: true # node flags ok
ui: "tdd"
# v8-stack-trace-limit: 100 # V8 flags are prepended with "v8-"
# watch: false
# watch-files:
#   - "src/**/*.js"
#   - "test/*.js"
#   - "test/**/*.js"
# watch-ignore:
#   - "lib/*"
```

### Debug with mocha

```json
// .vscode/launch.json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Mocha Tests",
      "cwd": "${workspaceRoot}/headfirst-unit-test",
      "program": "${workspaceRoot}/headfirst-unit-test/node_modules/mocha/bin/mocha",
      "args": [
        "--config",
        "${workspaceRoot}/headfirst-unit-test/.mocharc.debug.yml",
        "${workspaceRoot}/${relativeFile}"
      ],
      "internalConsoleOptions": "openOnSessionStart",
      "skipFiles": ["<node_internals>/**"],
      "sourceMaps": true,
      "runtimeArgs": ["--nolazy"]
    },
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug hello redux",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/hello-redux"
    }
  ]
}
```

```yml
# .mocharc.debug.yml
# This is an example Mocha config containing every Mocha option plus others.
allow-uncaught: false
async-only: false
bail: false
check-leaks: false
color: true
delay: false
diff: true
exit: true
extension: ["js"]
fail-zero: true
require:
  - "@babel/polyfill"
  - "@babel/register"

timeout: 100000 # same as "timeout: '2s'"

trace-warnings: true # node flags ok
ui: "tdd"
```

### Generate coverage report

- [Istanbul - JavaScript test coverage made simple.](https://istanbul.js.org/)

```bash
npm install --save-dev nyc
```

```json
{
  "scripts": {
    "test": "nyc mocha",
    "test:report": "nyc --reporter=html --reporter=text mocha && serve ./coverage"
  }
}
```

**.nycrc**

```json
{
  "all": true,
  "include": ["src/**/*.js"],
  "exclude": ["**/*.spec.js"]
}
```

## References

- [TDD](https://www.browserstack.com/guide/what-is-test-driven-development)
- [BDD](https://www.browserstack.com/guide/tdd-vs-bdd-vs-atdd)
- [Top javascript testing frameworks](https://www.browserstack.com/guide/top-javascript-testing-frameworks)
