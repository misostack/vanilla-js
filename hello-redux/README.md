# Hello Redux

> Redux is predictable state container for Javascript applications. It helps you write your applications that behave consistently, and easy to test

- A single store containing "global" state
- Dispatching plain object actions to the store when something happens in the app
- Pure reducer functions looking at those actions and returning immutably updated state

And also:

- Action creators that generate those action objects
- Middleware to enable side effects
- Thunk functions that contain sync or async logic with side effects
- Normalized state to enable looking up items by ID
- Memoized selector functions with the Reselect library for optimizing derived data
- The Redux DevTools Extension to view your action history and state changes
- TypeScript types for actions, state, and other functions

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

### Simple flow

```js
// create an example of using redux

import { configureStore, createSlice } from "@reduxjs/toolkit";
// Example: todolist application
// 1st step: define application states
const STATUSES = {
  PENDING: 1,
  INPROGRESS: 2,
  DONE: 3,
};
const STATES = {
  IDDLE: "iddle",
  LOADING: "loading",
  COMPLETED: "completed",
  ERROR: "error",
};
const initialStates = {
  todos: [],
  filters: [],
  pageNumber: 1,
  pageSize: 10,
  state: STATES.IDDLE,
  error: null,
};
// application events:
// loadTodoList, todoListLoaded
// 2nd step: define reducers and actions
const todosSlice = createSlice({
  initialState: initialStates,
  name: "todosSlice",
  reducers: {
    // name action as event
    loadTodoList: (state) => {
      state.state = STATES.LOADING;
    },
    todoListLoaded: (state, action) => {
      state.state = STATES.COMPLETED;
      state.todos = action.payload;
    },
    todoListLoadedFailed: (state, action) => {
      state.state = STATES.ERROR;
      state.error = action.payload;
    },
  },
});

// 3rd step : create store by combining all reducers

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer,
  },
});

// let's test

const { loadTodoList, todoListLoadedFailed, todoListLoaded } =
  todosSlice.actions;

store.dispatch(loadTodoList());
store.dispatch(
  todoListLoaded([{ id: 1, name: "Task 1", status: STATUSES.PENDING }])
);
store.dispatch(loadTodoList());
store.dispatch(todoListLoadedFailed("400 error"));

export const reduxTodoListExample = () => {
  store.subscribe(() => {
    console.log(store.getState());
  });
};
```

### Let's test

- https://redux.js.org/usage/writing-tests#writing-integration-tests-with-components

```js
import { describe, expect, test } from "@jest/globals";

import {
  todosReducer,
  loadTodoList,
  todoListLoaded,
  todoListLoadedFailed,
  initialStates,
} from "../store";

// write tests : https://redux.js.org/usage/writing-tests#writing-integration-tests-with-components

describe("todosSlice", () => {
  test("should return initial state", () => {
    expect(todosReducer(undefined, { type: undefined })).toEqual(initialStates);
  });
});
```

But life is not easy like that. In real world, we have to call API which is async.
So what should be we do

## What is redux thunk and how to use it?

- [Redux thunk](https://github.com/reduxjs/redux-thunk)

Sometimes user will trigger and event that leads to another event, so how do you implement that inside redux. Eg: we have fetchData event which will trigger and event show loading modal, then call the api to retrieve data, when the request is completed, we can receive data or an error.
And each of steps like that is an event.
It means you have to dispatch a specific action in an action.
And that's when we use "thunk" - the piece of code that delay some work.
For redux specially, "thunks" are pattern of writing functions or logic inside that can interact with a Redux store's dispatch and getState methods.

Let's dive in **code**

```bash
npm i redux-thunk
```
