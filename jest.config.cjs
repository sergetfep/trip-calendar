module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/tests/styleMock.js",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
};
