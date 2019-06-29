require('ts-node/register');

module.exports = require('./src/config/jest.ts')({
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/dist',
    '<rootDir>/src/bin',
    '<rootDir>/src/config',
    '<rootDir>/src/etc'
  ],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      lines: 80
    }
  }
});
