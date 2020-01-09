# @boilerplate-monorepo

A monorepo setup for winning

<img src="screenshot.png"/>

## 🗳️ What's in the box?

- <img src="https://www.google.com/s2/favicons?domain=postgresql.org"/> Postgres (database)
- <img src="https://www.google.com/s2/favicons?domain=graphql.org"/> GraphQL (service)
- <img src="https://www.google.com/s2/favicons?domain=reactjs.org"/> React (ui)

## ⚙️ System Requirements

1. <a href="https://docker.com"><img src="https://www.google.com/s2/favicons?domain=docker.com"/> Docker</a> v19.03+
2. <a href="https://nodejs.org"><img src="https://www.google.com/s2/favicons?domain=nodejs.org"/> Node</a> v12.13.0+
3. <a href="https://yarnpkg.com"><img src="https://www.google.com/s2/favicons?domain=yarnpkg.com"/> Yarn</a> v1.19.2+

## 🍔 Recommended Tooling

- <a href="https://insomnia.rest"><img src="https://www.google.com/s2/favicons?domain=insomnia.rest"/> Insomnia</a> v7.0.6+
  - Makes GraphQL queries and mutations a breeze
  - Easily browse our schema
  - Just load up the [config](packages/service/insomnia/config.yaml)

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
yarn boostrap
```

## 👍 Start Up

We've got two choices for local development. With Docker or natively. Each have their own pros and cons depending on whatever flavor suits you. Try them both out. You do you boo.

### 🐳 Dockerized

```bash
# Start db, service, and UI
yarn dev

# Stop db, service, and UI
yarn down
```

### 🍕 Natively Adhoc

```bash
# Starting the db instance
yarn start:db # yarn stop:db

# Starting the service
yarn start:server

# Starting the ui
yarn start:ui
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
