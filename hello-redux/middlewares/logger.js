const logger = (storeAPI) => (next) => (action) => {
  console.log("oldState", storeAPI.getState());
  console.log("next", action);
  const res = next(action);
  console.log("res", res);
  return res;
};

export default logger;
