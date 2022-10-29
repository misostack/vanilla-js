import { describe, expect, test, jest } from "@jest/globals";

import { fork, call, put } from "redux-saga/effects";
import { httpHelper } from "../helpers/http-helper";
import { fetchTodoListSagaHandler, loadTodoList } from "../store-saga";

// httpHelper.get should be mocked
jest.mock("../helpers/http-helper");
const iterator = fetchTodoListSagaHandler();

describe("test saga store", () => {
  test("should be valid", () => {
    const value1 = iterator.next().value;
    expect(value1).toEqual(put(loadTodoList()));
    // expect(value).toEqual(
    //   call(httpHelper.get, "http://localhost:1337/todos", {})
    // );
  });
});
