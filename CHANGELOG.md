# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.6.0](https://github.com/n8io/boilerplate-monorepo/compare/v1.5.0...v1.6.0) (2020-11-22)


### Bug Fixes

* **cookie:** 🐛 Fix `SameSite` cookie issues for refresh token ([ff6db79](https://github.com/n8io/boilerplate-monorepo/commit/ff6db79664f1ab787120daf6c51f5945df98e7df))
* **cookie:** 🐛 Fix `SameSite` cookie issues for refresh token ([2e8a64e](https://github.com/n8io/boilerplate-monorepo/commit/2e8a64e58f7930313935a50c009f8a6fcff3ae3c))


### Features

* **db:** 🌱 Add `admin` seed user to db ([6b3f22d](https://github.com/n8io/boilerplate-monorepo/commit/6b3f22d51edffefe4fef05fc886b78e41d3a8f97))
* **internet:** 🔥 Remove `InternetConnectivity` component ([229ee18](https://github.com/n8io/boilerplate-monorepo/commit/229ee18bf71064c0695fe0fbee5a1c53098e4931))





# [1.5.0](https://github.com/n8io/boilerplate-monorepo/compare/v1.4.0...v1.5.0) (2020-05-29)


### Features

* **feature-flags:** ✨ Add attribute map to feature flag requests ([24b251a](https://github.com/n8io/boilerplate-monorepo/commit/24b251ac6e10951eee9b1420cff0e106f0c707d7))
* **logrocket:** ✨ Add user info to LogRocket session tracking ([3e16eb5](https://github.com/n8io/boilerplate-monorepo/commit/3e16eb55dd6cbc32a00f2a4ac54acf30b7f77f16))
* ✨ Add prompt when navigating away from dirty forms ([93cc9a8](https://github.com/n8io/boilerplate-monorepo/commit/93cc9a8bc731eb70d89776079a0b2bc3d50e62f7))





# [1.4.0](https://github.com/n8io/boilerplate-monorepo/compare/v1.3.2...v1.4.0) (2020-05-26)


### Features

* **feature-flags:** ✨ Properly track anonymous users ([e8e471d](https://github.com/n8io/boilerplate-monorepo/commit/e8e471d0188c0b21516878f61128cf5114535682))
*  ✨Add SplitIO functionality ([78276c0](https://github.com/n8io/boilerplate-monorepo/commit/78276c0f9be5dd3c97a7bac3cf73225f7429637f))
* **feature-flags:**  ✨Add SplitIO for feature flags functionality ([cfebd8c](https://github.com/n8io/boilerplate-monorepo/commit/cfebd8cdab5e52fd24bdd38c25e82085a7e69ebf))





## [1.3.2](https://github.com/n8io/boilerplate-monorepo/compare/v1.3.1...v1.3.2) (2020-05-19)


### Bug Fixes

* 🐛 Throw email in use error when necessary ([3c17f98](https://github.com/n8io/boilerplate-monorepo/commit/3c17f98db6d260c16eba34662fb4c1de09cc2215))





## [1.3.1](https://github.com/n8io/boilerplate-monorepo/compare/v1.3.0...v1.3.1) (2020-05-18)


### Bug Fixes

* 🐛 Double posting success message on profile save ([e1faad0](https://github.com/n8io/boilerplate-monorepo/commit/e1faad025b3b065c18a44ec86b2526dee9b4ac06))





# [1.3.0](https://github.com/n8io/boilerplate-monorepo/compare/v1.2.0...v1.3.0) (2020-05-18)


### Bug Fixes

* 🐛 Fix how paginated results omit deleted rows ([364c939](https://github.com/n8io/boilerplate-monorepo/commit/364c939f64ace02ca3b13289e6740ee848ed6cb3))
* 🐛 Fix specs for Unauthenticated error instead of Forbidden ([3e2d270](https://github.com/n8io/boilerplate-monorepo/commit/3e2d270641522c65b0a88ec00cf78caf0923ca64))
* 🐛 Send AuthenticationError instead of ForbiddenError ([73a51f1](https://github.com/n8io/boilerplate-monorepo/commit/73a51f1cdf5b5b9f875f55a2197964dcc5b519d3))


### Features

* ✨ Add `useIsInternetConnected` hook ([9b76eba](https://github.com/n8io/boilerplate-monorepo/commit/9b76eba5164aede0700fa0a0c59561a2e996b7d7))
* ✨ Add `UserList` to users page ([fc76e9e](https://github.com/n8io/boilerplate-monorepo/commit/fc76e9e3a1dac03e512b0e8f8cae640125fd9d9a))





# [1.2.0](https://github.com/n8io/boilerplate-monorepo/compare/v1.1.1...v1.2.0) (2020-05-17)


### Features

* **ui:** ✨ Add user management page and respective nav links ([df3740f](https://github.com/n8io/boilerplate-monorepo/commit/df3740f0d8856467952119769fd3f18636a62fa3))





## [1.1.1](https://github.com/n8io/boilerplate-monorepo/compare/v1.1.0...v1.1.1) (2020-05-16)

**Note:** Version bump only for package boilerplate-monorepo





# 1.1.0 (2020-05-16)


### Bug Fixes

* **build:** 🐛 Only enable deployment on tagged release builds ([a4e8019](https://github.com/n8io/boilerplate-monorepo/commit/a4e8019fc593d9e64af02b3dbd36225c2e01b30a))
* ⬅️ Revert package versions ([d27780f](https://github.com/n8io/boilerplate-monorepo/commit/d27780fdd1dd49d831bee0296326ff2918a12bdb))
* ⬇️ Rollback versions to 1.0.0 ([e173e1a](https://github.com/n8io/boilerplate-monorepo/commit/e173e1aae513c54bb720b3dc907b95803b96e900))
* 💚 Fix semantic release on builds ([08491e1](https://github.com/n8io/boilerplate-monorepo/commit/08491e17f1c8ae720e76ed03f7ea503265c9c5c7))
* 💚 Sematic release troubleshooting ([1c9762c](https://github.com/n8io/boilerplate-monorepo/commit/1c9762c370d1086a94444fba99c7a992a52088ba))
* 💚 Update how cache keys are read ([e55eb27](https://github.com/n8io/boilerplate-monorepo/commit/e55eb2772c93778f5acd6b5bee3c4a98057a1997))
* 🔥 Remove extra build stuffs around version bumping ([bc77fb4](https://github.com/n8io/boilerplate-monorepo/commit/bc77fb45cba5ede97388276c38ae895ac5aaceb1))
* 🔧 Remove success and fail comments during release ([77f1018](https://github.com/n8io/boilerplate-monorepo/commit/77f1018f2f56e2db10eb1b0431d6a086b4cb9c33))
* **build:** 💚 Attempt to fix semantic releases ([03f2384](https://github.com/n8io/boilerplate-monorepo/commit/03f23844782f68e414bf63280a63a5325b405044))


### Features

*  ✨Add approval job to tagged builds for deployment ([60bd3eb](https://github.com/n8io/boilerplate-monorepo/commit/60bd3ebed3c118fec16568a33318f87e1b255664))
* ✨ Add automated semantic releases ([dc737cf](https://github.com/n8io/boilerplate-monorepo/commit/dc737cfa5bc21b488024db2ede61154c6edabcdb))
* ✨ Add pre/post build steps to upload sourcemaps ([5e8fef3](https://github.com/n8io/boilerplate-monorepo/commit/5e8fef362e6b9f3f25fe5d20a225b7f04c8801fa))
* 💚 Add release to ci workflow for master ([9d05cf5](https://github.com/n8io/boilerplate-monorepo/commit/9d05cf5598f625e4d86d83e5b808ee66f65593cd))
