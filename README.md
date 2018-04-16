# Abacash API [![Build Status](https://ci.abakus.no/api/badges/abakus-ntnu/abacash-api/status.svg)](https://ci.abakus.no/abakus-ntnu/abacash-api) [![Coverage Status](https://coveralls.io/repos/github/abakus-ntnu/abacash-api/badge.svg?branch=master)](https://coveralls.io/github/abakus-ntnu/abacash-api?branch=master)

> Node backend for Abacash

## Setup

The Abacash backend is built using Node.js, and needs
[yarn](https://github.com/yarnpkg/yarn) installed on the system. After that is
done, the server can be built using:

```bash
yarn
yarn build
```

## Getting Started

You can use docker-compose to start up required backend services, such as
PostgreSQL (the database). For that to work Docker and Docker Compose needs to
be installed.

```bash
# Start required backend services with docker-compose:
$ docker-compose up -d

# Start the server (reloads on code changes):
$ yarn start:watch

# Or without reloading (production):
$ yarn build
$ yarn start
```

## Tests

```bash
$ yarn test
```

To run tests with file watch:

```bash
$ yarn test:watch
```

To run a test a subset of the tests:

```bash
$ yarn test -g *pattern*
```

Here, _pattern_ is a regex for the test descriptions. This also works on `yarn test:watch`.

## Linting

ESLint and [Prettier](https://prettier.io/) are used to maintain high code
quality and a unified code style. It's recommended to install a
[Prettier](https://github.com/prettier/prettier/blob/master/docs/plugins.md)
plugin for your editor if there is one, to format the code when saving.

To run the linters, use:

```bash
$ yarn prettier
$ yarn lint
```

## Load database with test data

```
$ yarn load-db
```

Will fill the `abacash` postgres database with fixtures from `./fixtures/`. Connection string can be set by setting environment variable `PG_URL`. Contents in the `fixtures` are not (and should not be) used for automatic testing, which means the fixtures can be edited to test the client.
