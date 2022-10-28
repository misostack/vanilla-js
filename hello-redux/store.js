// create an example of using redux

import { configureStore, createSlice } from "@reduxjs/toolkit";
import exampleEnhancer from "./enhancers/example-enhancer";
import { httpHelper } from "./helpers/http-helper";
import thunkMiddleware from "./middlewares/thunk-middleware";
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

export const todosReducer = todosSlice.reducer;

// 3rd step : create store by combining all reducers

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: [thunkMiddleware],
  enhancers: [exampleEnhancer],
});

// let's test

export const fetchTodos = () => async (dispatch, getState) => {
  // In this example, the extra arg is an object with an API service inside
  dispatch(loadTodoList());
  const { data, error } = await httpHelper.get("http://localhost:1337/todos");
  console.log(data, error);
  if (error) {
    return dispatch(todoListLoadedFailed(error));
  }
  return dispatch(todoListLoaded(data));
};

export const { loadTodoList, todoListLoadedFailed, todoListLoaded } =
  todosSlice.actions;

// store.dispatch(loadTodoList());
store.dispatch(fetchTodos());
// store.dispatch(
//   todoListLoaded([{ id: 1, name: "Task 1", status: STATUSES.PENDING }])
// );
// store.dispatch(loadTodoList());
// store.dispatch(todoListLoadedFailed("400 error"));

export const reduxTodoListExample = () => {
  store.subscribe(() => {
    console.log(store.getState());
  });
};
