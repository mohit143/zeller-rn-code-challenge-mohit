let store: Record<string, string> = {};

export default {
  setItem: jest.fn((key, val) => {
    store[key] = val;
    return Promise.resolve(true);
  }),
  getItem: jest.fn((key) => Promise.resolve(store[key])),
  removeItem: jest.fn((key) => {
    delete store[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    store = {};
    return Promise.resolve();
  }),
};
