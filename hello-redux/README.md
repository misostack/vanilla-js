# Hello Redux

> Redux is predictable state container for Javascript applications. It helps you write your applications that behave consistently, and easy to test

Let's get started

```bash
npm install
npm run dev
```

## Debug

```bash
npm i cross-env --save-dev
```

### Launch Mode

```json
// .vscode/launch.json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug hello redux",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}/hello-redux"
    }
  ]
}

// package.json
{
  "name": "hello-redux",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 3000",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^3.2.0"
  }
}

```

### Attach Mode

- https://code.visualstudio.com/docs/nodejs/browser-debugging

chrome://version/

## Add redux

```bash
npm install redux
```
