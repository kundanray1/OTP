// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    // Transform modules from node_modules that need to be processed (e.g. react-toastify, @testing-library)
    transformIgnorePatterns: [
      "/node_modules/(?!(react-toastify|@testing-library)/)"
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    }
  };
  