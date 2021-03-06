# @boilerplate-monorepo

[![CircleCI](https://circleci.com/gh/n8io/boilerplate-monorepo/tree/master.svg?style=svg)](https://circleci.com/gh/n8io/boilerplate-monorepo/tree/master)
[![codecov](https://codecov.io/gh/n8io/boilerplate-monorepo/branch/master/graph/badge.svg)](https://codecov.io/gh/n8io/boilerplate-monorepo)

A monorepo setup for winning.

## 😎 Show Me Already

[View the demo here](https://app.n8c.io)

😴 We're big fans of siestas so we let our app take nap too. ⏳ Please be patient while it spins up.

<img src="screenshot.png"/>

## 🗳️ What's in the box?

- <img src="https://www.google.com/s2/favicons?domain=postgresql.org"/> Postgres (database)
- <img src="https://www.google.com/s2/favicons?domain=graphql.org"/> GraphQL (service)
- <img src="https://www.google.com/s2/favicons?domain=reactjs.org"/> React (ui)

## ⚙️ System Requirements

1. <a href="https://docker.com"><img src="https://www.google.com/s2/favicons?domain=docker.com"/> Docker</a> v19.03+
2. <a href="https://nodejs.org"><img src="https://www.google.com/s2/favicons?domain=nodejs.org"/> Node</a> v14.2.0+
3. <a href="https://yarnpkg.com"><img src="https://www.google.com/s2/favicons?domain=yarnpkg.com"/> Yarn</a> v1.19.1+

## 🍔 Recommended Tooling

- <a href="https://insomnia.rest"><img src="https://www.google.com/s2/favicons?domain=insomnia.rest"/> Insomnia</a> v7.0.6+
  - Easily call `GraphQL` queries/mutations
  - Make `REST` calls too!
  - Take a tour of our schema with built-in `Docs`
  - Load up the [config](packages/service/insomnia/config.yaml) and go!

## 🏎 Getting Started

```bash
# 1. ⬇️ Clone this repo
git clone git@github.com:n8io/boilerplate-monorepo.git

# 2. 🛠️ Generate local environment variable files
(
  cd packages \
  cp -n service/.env.example service/.env \
  cp -n ui/.env ui/.env.local \
  ;
)

# 3. 🌱 Install dependencies
yarn

# 4. ↩️ Add hosts file entry (if needed)
yarn hosts
```

## 🤓 Development Experience

```bash
# Start all the things!
yarn start # 👏🤜🤛🍾🥳

# When you're done dev'ing, spin down the Docker containers
yarn down
```

### 🧪 Testing

#### 🏘️ Unit Tests

```shell
# Run all the tests
yarn test

# Watch all the tests
yarn test:watch
```

#### 🌲 End-to-End Tests

This project is setup to run functional tests using [Cypress](https://www.cypress.io).

```shell
# Opens up Cypress test dashboard
yarn e2e:dev
```

### 🗂 Database Migrations

**NOTE** Database migrations are ran adhoc. You must manually run them before using the app.

#### Run existing migrations

```shell
yarn db:migrate
```

#### Rollback a single migration

```shell
yarn db:migrate:down
```

#### Generate a new migration

```shell
yarn db:migrate:gen create-table-foo # the name is up to you
```

Existing migration files can be found in [`packages/service/src/migrations`](packages/service/src/migrations).

### 🧰 Tooling

#### 🎣 Hook Code Generator

There is a handy dandy generator for creating `React` hooks for our `GraphQL` queries/mutations. Give it a try!

```shell
cd packages/tool-hook-generator

# Refresh your schema file
# Make sure your GraphQL server is running before you run this command
yarn codegen # Rerun as needed

# Creates a `useUserRegister` mutation hook
yarn hook:mutation UserRegister

# Creates a `useUserSelf` query hook
yarn hook:query UserSelf
```

### 📘 Cutting a release

**WARNING**:
Running the command below will:

1. Bump versions in all `package.json`'s using conventional commits
2. Update `README`s using conventional commits
3. Tag and push a new release to GitHub
4. Assuming you have a CircleCI workflow setup...
   1. It will kick off a release build
   2. Don't worry, it won't deploy until you **manually approve** the deployment in CircleCI

_While it is possible to unravel_, please make sure you
mean to release a new version of the repo when running it.

Pending you have permissions to push to `master`, run the following:

```shell
GH_TOKEN=<YOUR_GITHUB_PERSONAL_ACCESS_TOKEN> yarn release

# Follow the prompts

```

## License

[MIT](https://choosealicense.com/licenses/mit/)
