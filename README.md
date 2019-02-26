<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/53383576-04e5ee80-392d-11e9-9643-d6eaba2d5a40.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/ts-unified"><img src="https://img.shields.io/npm/v/@darkobits/ts-unified.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/darkobits/ts-unified"><img src="https://img.shields.io/travis/darkobits/ts-unified.svg?style=flat-square"></a>
  <a href="https://www.codacy.com/app/darkobits/ts-unified"><img src="https://img.shields.io/codacy/coverage/292afa3db205485ba5e39109b7b5b151.svg?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/ts-unified"><img src="https://img.shields.io/david/darkobits/ts-unified.svg?style=flat-square"></a>
  <a href="https://github.com/conventional-changelog/standard-version"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-027dc6.svg?style=flat-square"></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-e271a5.svg?style=flat-square"></a>
</p>

Boilerplate for TypeScript-based Node modules.

# Features

* Compilation via Babel.
  * Type-checking and declaration file generation with TypeScript.
* Unit testing with Jest.
* Linting with TSLint.
* Version and change log management with `standard-version`.
* Package script management with NPS.

# Usage

```
npm install --save-dev @darkobits/ts-unified
```

This repository provides most of the build and code quality tooling needed for modern TypeScript-based projects. It also provides several common package scripts for building, testing, and versioning a project. These scripts are provided via NPS. For a complete list of all provided scripts, run:

```
$(npm bin)/nps --scripts
```

## Configuration Files

This repository also provides configuration defaults for several common tools. Each is exported as a function that accepts an optional additional configuration object that will be merged with the default configuration.

### Babel

In your project root, create `babel.config.js`. Then, export the Babel configuration from ts-unified, optionally providing your own configuration to merge with the default.

> `babel.config.js`

Using base configuration:

```js
module.exports = require('@darkobits/ts-unified/dist/config/babel')();
```

Providing additional configuration:

```js
module.exports = require('@darkobits/ts-unified/dist/config/babel')({
  presets: [
    'my-custom-babel-preset'
  ]
});
```

### Jest

In your project root, create `jest.config.js`. Then, export the Jest configuration from ts-unified, optionally providing your own configuration to merge with the default.

> `jest.config.js`

Using base configuration:

```js
module.exports = require('@darkobits/ts-unified/dist/config/jest')();
```

Providing additional configuration:

```js
module.exports = require('@darkobits/ts-unified/dist/config/jest')({
  collectCoverageFrom: [
    '<rootDir>/my-custom-path'
  ]
});
```

### NPS

In your project root, create `package-scripts.js`. Then, export the NPS configuration from ts-unified, optionally providing your own configuration to merge with the default.

> `package-scripts.js`

Using base configuration:

```js
module.exports = require('@darkobits/ts-unified/dist/config/package-scripts')();
```

Providing additional configuration:

```js
module.exports = require('@darkobits/ts-unified/dist/config/package-scripts')({
  scripts: {
    foo: {
      description: 'My awesome script.',
      script: 'foo --bar --baz'
    }
  }
});
```

### TypeScript

In your project root, create `tsconfig.json`. Then, extend the TypeScript configuration from ts-unified, optionally providing your own configuration. It is recommended that you at least set `baseUrl, `ourDir`, and `paths`; these cannot be set by ts-unified because TypeScript computes them relative to the `tsconfig.json` file from which they were declared.

> `tsconfig.json`

Using base configuration:

```jsonc
{
  "extends": "./node_modules/@darkobits/ts-unified/dist/config/tsconfig.json",
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "dist",
    "paths": {
      "*": [
        "*",
        "src/*"
      ]
    }
  },
  // Additinal custom configuration here.
}
```

### TSLint

In your project root, create `tslint.json`. Then, extend the TSLint configuration from ts-unified, optionally providing your own rules.

> `tslint.json`

Using base configuration:

```jsonc
{
  "extends": "@darkobits/ts-unified/dist/config/tslint.json",
  "rules": {
    // Additional rules here.
  }
}
```

## Running Scripts

For a list of all scripts provided by ts-unified, make sure you have created a `package-scripts.js` file in your project root per the instructions above. Then, you may run:

```
$(npm bin)/nps --scripts
```

### Building

To build your project, assuming its source is located at `src` and build artifacts are to be written to `dist`, you may run:

```
$(npm bin)/nps build
```

or add the following to your `package.json`:

```json
"scripts": {
  "build": "nps build"
}
```

and run:

```
npm run build
```

To continuously build the project in watch mode:

```
$(npm bin)/nps build.watch
```

or:

```json
"scripts": {
  "build:watch": "nps build.watch"
}
```

```
npm run build:watch
```

### Testing

To run unit tests for your project, assuming your test files end in `.spec.ts`, you may run:

```
$(npm bin)/nps test
```

or, add the following to your `package.json`:

```json
"scripts": {
  "test": "nps test"
}
```

and run:

```
npm test
```

To continuously run tests in watch mode:

```
$(npm bin)/nps test.watch
```

or:

```json
"scripts": {
  "test:watch": "nps test.watch"
}
```

```
npm run build:watch
```

To run unit tests and generate a coverage report:

```
$(npm bin)/nps test.coverage
```

or:

```json
"scripts": {
  "test:coverage": "nps test.coverage"
}
```

```
npm run test:coverage
```

### Version-Bumping

To generate a `CHANGELOG.md` and bump the project's version, assuming you use Conventional Commits, you may run:

```
$(npm bin)/nps bump
```

or, add the following to your `package.json`:

```json
"scripts": {
  "bump": "nps bump"
}
```

and run:

```
npm run bump
```

Alternatively, if you need to create a beta tag:

```
$(npm bin)/nps bump.beta
```

or:

```json
"scripts": {
  "bump:beta": "nps bump.beta"
}
```

```
npm run bump:beta
```

### NPM Lifecycles

This repository also has a `prepare` script that will build and test the project. If you wish to use this script, add a `prepare` script to your project's `package.json`:

```json
"scripts": {
  "prepare": "nps prepare"
}
```

## &nbsp;
<p align="center">
  <br>
  <img width="22" height="22" src="https://cloud.githubusercontent.com/assets/441546/25318539/db2f4cf2-2845-11e7-8e10-ef97d91cd538.png">
</p>
