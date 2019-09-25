require('@babel/register');
const merge = require('deepmerge');
const {EXTENSIONS, SRC_DIR, OUT_DIR} = require('etc/constants');


// Paths we always want Jest to ignore.
const ALWAYS_IGNORE = [
  `<rootDir>/${OUT_DIR}`,
  '/node_modules/'
];


module.exports = (userConfig = {}) => merge({
  testEnvironment: 'node',
  testRegex: '^.+\\.spec.*$',
  testPathIgnorePatterns: ALWAYS_IGNORE,
  clearMocks: true,
  collectCoverageFrom: [
    `<rootDir>/${SRC_DIR}/**/*.{${EXTENSIONS.join(',')}}`,
    '!**/node_modules/**',
  ],
  coveragePathIgnorePatterns: ALWAYS_IGNORE,
  moduleFileExtensions: [...EXTENSIONS, 'json'],
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 95,
      functions: 100,
      lines: 100
    }
  }
}, userConfig);
