# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.0.0-beta.2](https://github.com/darkobits/ts-unified/compare/v6.0.0-beta.1...v6.0.0-beta.2) (2020-11-12)

## [6.0.0-beta.1](https://github.com/darkobits/ts-unified/compare/v6.0.0-beta.0...v6.0.0-beta.1) (2020-11-07)


### Bug Fixes

* Improve handling of user scripts and binary resolving. ([0a45348](https://github.com/darkobits/ts-unified/commit/0a4534835e3eebeba3f81cce159a8601351ffe47))

## [6.0.0-beta.0](https://github.com/darkobits/ts-unified/compare/v5.3.0-beta.0...v6.0.0-beta.0) (2020-11-07)


### ⚠ BREAKING CHANGES

* **deps:** This update introduces several new rules and changes to existing rules that may require updates to existing projects.
* Users will need to use the updated 'deps.check' script name.

### Features

* Ensure user-defined scripts are used during NPM lifecycle scripts. ([1fe3d9e](https://github.com/darkobits/ts-unified/commit/1fe3d9ea444e506abc73d89990b8c302114d3a1a))


* **deps:** Update eslint-plugin-unicorn. ([78ce468](https://github.com/darkobits/ts-unified/commit/78ce4686e58edbd6dba0ff360b1370d7fcb491a4))
* Rename 'checkDeps' to 'deps.check'. ([58dd15d](https://github.com/darkobits/ts-unified/commit/58dd15df0adacbc1d2c3fa3773661c6a15bac04f))

## [5.3.0-beta.0](https://github.com/darkobits/ts-unified/compare/v5.2.1...v5.3.0-beta.0) (2020-11-07)


### Features

* **deps:** Upgrade ESLint to 4.6.1. ([091ea1b](https://github.com/darkobits/ts-unified/commit/091ea1bf91c7b75af9b1c17b941ccfe9118be827))
* **deps:** Upgrade standard-version to 9.0.0. ([7dddfdb](https://github.com/darkobits/ts-unified/commit/7dddfdb5ca7c4e270e1e9429d7b73d10c27e7815))
* **deps:** Upgrade TypeScript to 4.0.5. ([4768b66](https://github.com/darkobits/ts-unified/commit/4768b66005e97128cb202b8b806482613b335709))

### [5.2.1](https://github.com/darkobits/ts-unified/compare/v5.2.0...v5.2.1) (2020-08-06)

## [5.2.0](https://github.com/darkobits/ts-unified/compare/v5.1.4...v5.2.0) (2020-08-01)


### Features

* Update dependencies. ([938555b](https://github.com/darkobits/ts-unified/commit/938555b2b984ca2e46d7125d3c27dce423afa6db))

### [5.1.4](https://github.com/darkobits/ts-unified/compare/v5.1.3...v5.1.4) (2020-07-01)


### Bug Fixes

* **babel:** Ensure decorators plugin runs before class-properties plugin. ([53d6692](https://github.com/darkobits/ts-unified/commit/53d669209ce0bcf59349234429803c6667452b86))

### [5.1.3](https://github.com/darkobits/ts-unified/compare/v5.1.2...v5.1.3) (2020-06-30)


### Bug Fixes

* Move plugin-transform-runtime to dependencies. ([bbb6de6](https://github.com/darkobits/ts-unified/commit/bbb6de6f3abb6f80f744cea8e3d44e0f8196e8d7))

### [5.1.2](https://github.com/darkobits/ts-unified/compare/v5.1.1...v5.1.2) (2020-06-30)


### Bug Fixes

* **babel:** Define 'targets' as an Array. ([1ae6a52](https://github.com/darkobits/ts-unified/commit/1ae6a52a21926674362e347f9c249ed5b56ddde1))

### [5.1.1](https://github.com/darkobits/ts-unified/compare/v5.1.0...v5.1.1) (2020-06-26)


### Bug Fixes

* **eslint:** Apply switch case indent configuration to React rules. ([73a959d](https://github.com/darkobits/ts-unified/commit/73a959d79d3006d69303e410ae4c39adc36c2b52))

## [5.1.0](https://github.com/darkobits/ts-unified/compare/v5.0.0...v5.1.0) (2020-06-24)


### Features

* **eslint:** Allow the use of type aliases. ([1a8df04](https://github.com/darkobits/ts-unified/commit/1a8df04a30a70291181f0a87e34fd9c8ff47b251))

## [5.0.0](https://github.com/darkobits/ts-unified/compare/v4.0.0...v5.0.0) (2020-06-18)


### ⚠ BREAKING CHANGES

* This update is a substantial change to this project's tooling, and will
  require users to replace their `tslint.json` file with an `.eslintrc.js` file,
  and properly extend this project's base rules. See `README.md` for
  instructions.

* Migrate from TSLint to ESLint. ([8ae34e9](https://github.com/darkobits/ts-unified/commit/8ae34e9f9b8b62403558e4baf474fbe200b33859))

## [4.0.0](https://github.com/darkobits/ts-unified/compare/v4.0.0-beta.2...v4.0.0) (2020-04-13)


### ⚠ BREAKING CHANGES

* Several import paths for configuration files no longer need the "dist/config" path segment.

### Bug Fixes

* Don't hoist config files to root. ([2727a70](https://github.com/darkobits/ts-unified/commit/2727a7011678f0f48a927282ed34efb44cff9466))
* Utilize TS in source files, use publish-root. ([f3e66e3](https://github.com/darkobits/ts-unified/commit/f3e66e39d5438f6ab9b64c835541ef6f92da7fbf))


## [3.3.0](https://github.com/darkobits/ts-unified/compare/v3.3.0-beta.0...v3.3.0) (2019-12-11)


### Features

* Use TypeScript 3.7. ([54ec5b7](https://github.com/darkobits/ts-unified/commit/54ec5b7))

### [3.2.4](https://github.com/darkobits/ts-unified/compare/v3.2.3...v3.2.4) (2019-11-28)


### Bug Fixes

* Check script does not fail on outdated dependencies. ([6c57bc8](https://github.com/darkobits/ts-unified/commit/6c57bc8))

### [3.2.3](https://github.com/darkobits/ts-unified/compare/v3.2.2...v3.2.3) (2019-10-26)

### [3.2.2](https://github.com/darkobits/ts-unified/compare/v3.2.1...v3.2.2) (2019-09-27)


### Bug Fixes

* Move preset-react to dependencies. ([8b73e69](https://github.com/darkobits/ts-unified/commit/8b73e69))

### [3.2.1](https://github.com/darkobits/ts-unified/compare/v3.2.0...v3.2.1) (2019-09-27)


### Bug Fixes

* Use proper key in read-pkg-up results. ([6f74708](https://github.com/darkobits/ts-unified/commit/6f74708))

## [3.2.0](https://github.com/darkobits/ts-unified/compare/v3.1.0...v3.2.0) (2019-09-27)


### Features

* Add @babel/preset-react. ([2bc0496](https://github.com/darkobits/ts-unified/commit/2bc0496))
* Add object-literal-key-quotes rule. ([795c562](https://github.com/darkobits/ts-unified/commit/795c562))

## [3.1.0](https://github.com/darkobits/ts-unified/compare/v3.0.6...v3.1.0) (2019-09-25)


### Features

* **Jest:** Set `clearMocks` to `true`. ([f8c2bae](https://github.com/darkobits/ts-unified/commit/f8c2bae))

### [3.0.6](https://github.com/darkobits/ts-unified/compare/v3.0.5...v3.0.6) (2019-08-28)

### [3.0.5](https://github.com/darkobits/ts-unified/compare/v3.0.4...v3.0.5) (2019-08-21)

### [3.0.4](https://github.com/darkobits/ts-unified/compare/v3.0.3...v3.0.4) (2019-08-02)

### [3.0.3](https://github.com/darkobits/ts-unified/compare/v3.0.2...v3.0.3) (2019-07-12)



### [3.0.2](https://github.com/darkobits/ts-unified/compare/v3.0.1...v3.0.2) (2019-06-29)


### Bug Fixes

* Remove extraneous lint task. ([640efe8](https://github.com/darkobits/ts-unified/commit/640efe8))



### [3.0.1](https://github.com/darkobits/ts-unified/compare/v3.0.0...v3.0.1) (2019-06-29)



## [3.0.0](https://github.com/darkobits/ts-unified/compare/v2.1.5...v3.0.0) (2019-06-29)


### refactor

* Revert to Babel + TSC. ([2b6471b](https://github.com/darkobits/ts-unified/commit/2b6471b))


### BREAKING CHANGES

* Bumping to 3.0 due to significant architectural changes.



### [2.1.5](https://github.com/darkobits/ts-unified/compare/v2.1.4...v2.1.5) (2019-06-29)


### Bug Fixes

* Ensure `ttsc` is used. ([305f810](https://github.com/darkobits/ts-unified/commit/305f810))



### [2.1.4](https://github.com/darkobits/ts-unified/compare/v2.1.3...v2.1.4) (2019-06-29)


### Bug Fixes

* Add interop export for Jest config. ([14fd966](https://github.com/darkobits/ts-unified/commit/14fd966))



### [2.1.3](https://github.com/darkobits/ts-unified/compare/v2.1.2...v2.1.3) (2019-06-29)


### Bug Fixes

* Fix bin name. ([2e666f5](https://github.com/darkobits/ts-unified/commit/2e666f5))



### [2.1.2](https://github.com/darkobits/ts-unified/compare/v2.1.1...v2.1.2) (2019-06-29)


### Bug Fixes

* Add interop export for package-scripts. ([6e32609](https://github.com/darkobits/ts-unified/commit/6e32609))



### [2.1.1](https://github.com/darkobits/ts-unified/compare/v2.1.0...v2.1.1) (2019-06-29)


### Bug Fixes

* Copy non-TS source files afer building. ([a6b5869](https://github.com/darkobits/ts-unified/commit/a6b5869))



## [2.1.0](https://github.com/darkobits/ts-unified/compare/v2.0.0...v2.1.0) (2019-06-29)


### Bug Fixes

* Copy non-TS source files after building. ([0d4cadd](https://github.com/darkobits/ts-unified/commit/0d4cadd))


### Features

* Support user-defined pre/post scripts on build and bump tasks. ([98f2bca](https://github.com/darkobits/ts-unified/commit/98f2bca))



## [2.0.0](https://github.com/darkobits/ts-unified/compare/v1.6.0...v2.0.0) (2019-06-29)


### refactor

* Use TypeScript for compilation. ([9b9e0af](https://github.com/darkobits/ts-unified/commit/9b9e0af))


### BREAKING CHANGES

* Removing Babel and switching to TSC for compilation is a significant enough change that a major version bump seems warranted.

  **Note:** After upgrading to version `2.0.0`, you can remove `babel.config.js` from your project as it is no longer required.



## [1.6.0](https://github.com/darkobits/ts-unified/compare/v1.5.0...v1.6.0) (2019-06-07)


### Features

* Update dependencies. ([93d9aae](https://github.com/darkobits/ts-unified/commit/93d9aae))



# [1.5.0](https://github.com/darkobits/ts-unified/compare/v1.4.0...v1.5.0) (2019-04-29)


### Features

* Update dependencies. ([6da7fef](https://github.com/darkobits/ts-unified/commit/6da7fef))



# [1.4.0](https://github.com/darkobits/ts-unified/compare/v1.3.0...v1.4.0) (2019-04-25)


### Features

* **NPS:** Add bump.first script for initial releases. ([98fb5d7](https://github.com/darkobits/ts-unified/commit/98fb5d7))



# [1.3.0](https://github.com/darkobits/ts-unified/compare/v1.2.1...v1.3.0) (2019-04-09)


### Features

* Update dependencies. ([bf18107](https://github.com/darkobits/ts-unified/commit/bf18107))



## [1.2.1](https://github.com/darkobits/ts-unified/compare/v1.2.0...v1.2.1) (2019-03-08)



# [1.2.0](https://github.com/darkobits/ts-unified/compare/v1.1.5...v1.2.0) (2019-03-08)


### Bug Fixes

* Add "json" to extensions list for Jest configuration. ([a98fd8a](https://github.com/darkobits/ts-unified/commit/a98fd8a))


### Features

* Add script "nps check-deps" to check for outdated dependencies. ([28e3c3e](https://github.com/darkobits/ts-unified/commit/28e3c3e))



## [1.1.5](https://github.com/darkobits/ts-unified/compare/v1.1.4...v1.1.5) (2019-02-26)


### Bug Fixes

* Add dependency on tslint-eslint-rules. ([e5335ae](https://github.com/darkobits/ts-unified/commit/e5335ae))



<a name="1.1.3"></a>
## [1.1.3](https://github.com/darkobits/ts-unified/compare/v1.1.2...v1.1.3) (2019-02-26)


### Bug Fixes

* Prepare script uses --passWithNoTests. ([6fc4855](https://github.com/darkobits/ts-unified/commit/6fc4855))



<a name="1.1.2"></a>
## [1.1.2](https://github.com/darkobits/ts-unified/compare/v1.1.1...v1.1.2) (2019-02-26)


### Bug Fixes

* Update TSLint rules. ([f18427d](https://github.com/darkobits/ts-unified/commit/f18427d))



<a name="1.1.1"></a>
## [1.1.1](https://github.com/darkobits/ts-unified/compare/v1.1.0...v1.1.1) (2019-02-26)


### Bug Fixes

* Add nps-utils to dependencies. ([5e2c08e](https://github.com/darkobits/ts-unified/commit/5e2c08e))



<a name="1.1.0"></a>
# 1.1.0 (2019-02-26)


### Features

* Add ts-unified. ffeae0f
