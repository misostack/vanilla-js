// create an example of using redux

import { applyMiddleware, configureStore, createSlice } from "@reduxjs/toolkit";
import { httpHelper } from "./helpers/http-helper";
import createSagaMiddleware from "redux-saga";
import {
  all,
  call,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
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
export const initialStates = {
  items: [],
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
    fetchTodoList: (state) => {
      state.state = STATES.IDDLE;
    },
    loadTodoList: (state) => {
      state.state = STATES.LOADING;
    },
    todoListLoaded: (state, action) => {
      state.state = STATES.COMPLETED;
      state.items = action.payload;
    },
    todoListLoadedFailed: (state, action) => {
      state.state = STATES.ERROR;
      state.error = action.payload;
    },
  },
});

export const {
  loadTodoList,
  todoListLoadedFailed,
  todoListLoaded,
  fetchTodoList,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;

// 3rd step : create saga middleware
function* exampleSagaHandler(action) {
  console.log("action", action);
}
function* exampleSaga() {
  yield takeEvery("*", exampleSagaHandler);
}

export function* fetchTodoListSagaHandler(action) {
  console.log(action);
  yield put(loadTodoList());
  const res = yield call(httpHelper.get, "http://localhost:1337/todos", {});
  if (res.error) {
    yield put(todoListLoadedFailed(res.error));
  } else {
    yield put(todoListLoaded(res.data));
  }
}

export function* fetchTodoListSaga() {
  yield takeLatest(fetchTodoList.type, fetchTodoListSagaHandler);
}

function* sagaRoot() {
  yield all([exampleSaga(), fetchTodoListSaga()]);
}
const sagaMiddleware = createSagaMiddleware();

// 4th step : create store by combining all reducers
const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: [],
  enhancers: [applyMiddleware(sagaMiddleware)],
});

sagaMiddleware.run(sagaRoot);

// let's test
store.dispatch(fetchTodoList());

export const reduxSagaTodoListExample = () => {
  store.subscribe(() => {
    console.log(store.getState());
  });
};
