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
