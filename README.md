<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/53383576-04e5ee80-392d-11e9-9643-d6eaba2d5a40.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/ts-unified"><img src="https://img.shields.io/npm/v/@darkobits/ts-unified.svg?style=flat-square"></a>
  <a href="https://travis-ci.com/darkobits/ts-unified"><img src="https://img.shields.io/travis/com/darkobits/ts-unified/master?style=flat-square"></a>
  <a href="https://www.codacy.com/app/darkobits/ts-unified"><img src="https://img.shields.io/codacy/coverage/292afa3db205485ba5e39109b7b5b151.svg?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/ts-unified"><img src="https://img.shields.io/david/darkobits/ts-unified.svg?style=flat-square"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-027dc6.svg?style=flat-square"></a>
</p>

Boilerplate-as-a-package for TypeScript-based projects. To create a new
repository based on `ts-unified`, check out the [`ts-unified` template repository](https://github.com/darkobits/ts-unified-starter).

# Features

* Compilation with [Babel](https://babeljs.io/).
* Type-checking and declaration generation with [TypeScript](https://www.typescriptlang.org).
* Unit testing with [Jest](https://jestjs.io/).
* Linting with [ESLint](https://eslint.org/).
* Version and change log management with [`standard-version`](https://github.com/conventional-changelog/standard-version).
* Package script management with [NPS](https://github.com/sezna/nps).

# Usage

```
npm install --save-dev @darkobits/ts-unified
```

This repository provides most of the build and code quality tooling needed for
modern TypeScript-based projects. It also provides several common package
scripts for building, testing, and versioning a project. These scripts are
provided via NPS. For more information, see the [NPS](#nps) section below.

## Configuration Files

This section will walk you through setting up the configuration files required
by the various tools that `ts-unified` provides support for. Each base
configuration file is provided as a function that accepts an optional additional
configuration object that will be merged with the default configuration,
allowing projects to extend or modify the base configuration.

### NPS

In your project root, create `package-scripts.js`. Then, export the NPS
configuration from `ts-unified`, optionally providing your own
configuration/scripts to merge with the defaults.

**💡 PROTIP:** NPS does not provide a native `extends` feature, so configuration
merging is achieved by passing an object containing your configuration to the
function exported by `package-scripts`. If you do not need to provide any
additional configuration, you still need to invoke this function to ensure the
correct object is exported by your configuration file.

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

Once you have created this file, you can get a list of all NPS scripts provided
via `ts-unified` by running the following command:

```
npx nps --scripts
```

### Jest

In your project root, create `jest.config.js`. Then, export the Jest
configuration from `ts-unified`, optionally providing your own configuration to
merge with the default.

**💡 PROTIP:** Jest does not provide a native `extends` feature, so
configuration merging is achieved by passing an object containing your
configuration to the function exported by `jest`. If you do not need to provide
any additional configuration, you still need to invoke this function to ensure
the correct object is exported by your configuration file.

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


### TypeScript

In your project root, create `tsconfig.json`. Then, `extend` the TypeScript
configuration from `ts-unified`, optionally providing your own configuration. It
is recommended that you at least set `baseUrl`, `outDir`, and `paths`; these
cannot be set by `ts-unified` because TypeScript computes them relative to the
`tsconfig.json` file from which they were declared.

> `tsconfig.json`

Using base configuration:

```jsonc
{
  "extends": "./node_modules/@darkobits/ts-unified/dist/config/tsconfig.json",
  // You should specify at least the following configuration options, as
  // TypeScript resolves these directories relative to the tsconfig.json file
  // where they were defined.
  "compilerOptions": {
    "baseUrl": ".",
    "outDir": "dist",
    "paths": {
      "*": ["*", "src/*"]
    }
  }
}
```

### ESLint

In your project root, create `.eslintrc.js`. Then, `extend` the ESLint
configuration from `ts-unified`, optionally providing your own additional
configuration.

> `.eslintrc.js`

```js
module.exports = {
 extends: [
    require.resolve('@darkobits/ts-unified/dist/config/eslint')
  ]
}
```

#### React Rules

If you're working in a React project, `ts-unified` provides a React variant of
its ESLint rules. To use these rules, `extend` `eslint-react`:

> `.eslintrc.js`

```js
module.exports = {
 extends: [
    require.resolve('@darkobits/ts-unified/dist/config/eslint-react')
  ]
}
```

## Running Scripts

For a list of all scripts provided by `ts-unified`, make sure you have created a
`package-scripts.js` file in your project root per the instructions above. Then,
you may run:

```
npx nps --scripts
```

### Building

To build your project, assuming its source is located at `src` and build
artifacts are to be written to `dist`, you may run:

```
npx nps build
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
npx nps build.watch
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

To run unit tests for your project, assuming your test files end in `.spec.ts`,
you may run:

```
npx nps test
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
npx nps test.watch
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
npx nps test.coverage
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

### Versioning

To generate (or update) a `CHANGELOG.md` and bump the project's version,
assuming you use [Conventional Commits](https://www.conventionalcommits.org),
you may run:

```
npx nps bump
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
npx nps bump.beta
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

### NPM Life Cycles

`ts-unified` also provides a `prepare` script that will build and test the
project. If you wish to use this script, add a `prepare` script to your
project's `package.json`:

```json
"scripts": {
  "prepare": "nps prepare"
}
```

This script will then be run after every `npm install` and as part of every
`npm publish` command.

<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/69777002-41ac7380-1153-11ea-85a4-88184f8c9975.png" style="max-width: 100%;">
</a>
