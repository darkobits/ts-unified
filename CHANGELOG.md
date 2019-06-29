# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
