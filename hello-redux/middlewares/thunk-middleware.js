const thunkMiddleware = (storeAPI) => (next) => (action) => {
  if (typeof action === "function") {
    return action(storeAPI.dispatch, storeAPI.getState);
  }
  return next(action);
};

export default thunkMiddleware;
