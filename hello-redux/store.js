// create an example of using redux

import {
  applyMiddleware,
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import exampleEnhancer from "./enhancers/example-enhancer";
import { httpHelper } from "./helpers/http-helper";
import thunkMiddleware from "./middlewares/thunk-middleware";
import thunk from "redux-thunk";
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
export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const res = await httpHelper.get("http://localhost:1337/todos");
    return res;
  }
);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state, action) => {
        state.state = STATES.LOADING;
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.error = error;
          state.state = STATES.ERROR;
          return;
        }
        // otherwise
        state.items = data;
        state.state = STATES.COMPLETED;
      });
  },
});

export const todosReducer = todosSlice.reducer;

// 3rd step : create store by combining all reducers

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: [thunkMiddleware],
  enhancers: [exampleEnhancer, applyMiddleware(thunk)],
});

// let's test

export const fetchTodos = () => async (dispatch, getState) => {
  // In this example, the extra arg is an object with an API service inside
  dispatch(loadTodoList());
  const { data, error } = await httpHelper.get("http://localhost:1337/todos");

  if (error) {
    return dispatch(todoListLoadedFailed(error));
  }
  return dispatch(todoListLoaded(data));
};

export const { loadTodoList, todoListLoadedFailed, todoListLoaded } =
  todosSlice.actions;

// store.dispatch(loadTodoList());
store.dispatch(fetchTodosAsync());
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
