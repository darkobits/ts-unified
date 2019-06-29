import merge from 'deepmerge';

import {EXTENSIONS, SRC_DIR, OUT_DIR} from '../etc/constants';
import {LooseObject} from '../etc/types';

/**
 * Paths we always want Jest to ignore.
 */
const ALWAYS_IGNORE = [
  `<rootDir>/${OUT_DIR}`,
  '/node_modules/'
];


const jestConfig = {
  testEnvironment: 'node',
  testRegex: '^.+\\.spec.*$',
  testPathIgnorePatterns: ALWAYS_IGNORE,
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
  },
  transform: {
    [`^.+\\.(${EXTENSIONS.join('|')})$`]: 'ts-jest'
  },
  globals: {
    'ts-jest': {
      compiler: 'ttypescript'
    }
  }
};


export default function mergeConfig(userConfig: LooseObject = {}) {
  return merge(jestConfig, userConfig);
}


// @ts-ignore
module.exports = mergeConfig;
