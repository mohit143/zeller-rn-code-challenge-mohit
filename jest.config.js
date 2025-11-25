module.exports = {
  preset: "react-native",
  injectGlobals: true,

  // IMPORTANT: apply setup file to ALL tests, not only src/__tests__
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.tsx"],

  transformIgnorePatterns: [
    "node_modules/(?!(react-native|" +
      "@react-native|" +
      "react-redux|" +
      "@react-navigation|" +
      "@reduxjs/toolkit|" +
      "immer" +
      "))"
  ],

  moduleNameMapper: {
    "\\.(png|jpg|jpeg|svg)$": "<rootDir>/src/__mocks__/fileMock.js",
  },
};
