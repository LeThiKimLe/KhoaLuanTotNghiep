module.exports = {
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(scss|sass|css)$": "identity-obj-proxy",
      "^query-string$": "<rootDir>/__mocks__/fileMock.js",
      "^axios$": "<rootDir>/node_modules/axios/dist/axios.js",
      "^localStorage$": "<rootDir>/__mocks__/localStorage.js",
    },
    setupFiles:["<rootDir>/__mocks__/localStorage.js"],
    transformIgnorePatterns: [
    "node_modules/(?!(react-native|my-project|redux-persist)/)"
    ],
    testEnvironment: 'jsdom'
  }