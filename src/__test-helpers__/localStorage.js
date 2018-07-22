export default {
  setItem: (key, value) => {
    return `saved ${key}, ${value}`;
  },
  removeItem: key => {
    return key;
  },
  successful: data => ({
    getItem: key => {
      return data;
    },
  }),
};
