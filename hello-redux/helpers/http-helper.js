export const httpHelper = {
  get: async (url, query = {}) => {
    const userQuery = new URLSearchParams();
    Reflect.ownKeys(query).map((key) => {
      userQuery.append(key, Reflect.get(query, key));
    });
    const finalUrl =
      Reflect.ownKeys(query) === 0 ? url : `${url}?${userQuery.toString()}`;
    try {
      const response = await fetch(finalUrl, {
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = await response.json();
      return {
        error: null,
        data,
      };
    } catch (error) {
      return {
        data: null,
        error,
      };
    }
  },
};