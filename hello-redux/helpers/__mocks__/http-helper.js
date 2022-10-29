export const httpHelper = {
  get: async (url, query = {}) => {
    console.log("http helper mock get was called!");
    return [{ id: 1, name: "task1", status: 1 }];
  },
};
