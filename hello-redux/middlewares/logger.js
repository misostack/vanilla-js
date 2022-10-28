const logger = (storeAPI) => (dispatch) => (action) => {
  console.log("oldState", storeAPI.getState());
  console.log("dispatch", action);
  const res = dispatch(action);
  console.log("res", res);
  return res;
};

export default logger;
