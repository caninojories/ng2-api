<h1 align="center">Edamama Api</h1>

## Description

Api Implementation.

## Requirements
1. [Node.JS](https://nodejs.org/en/download) LTS version (v12.18.3)
2. [Docker](https://www.docker.com)
3. [Docker Compose](https://docs.docker.com/compose/install)

## docker-compose

```bash
# run at the root of the project folder
# will run the mongodb via docker-compose
$ docker-compose up -d
```

## Seed
```bash
# run at the root of the project folder
# will run the mongodb via docker-compose
$ npm run create-products
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# compile first and watch for ts changes
npm run build-dev

# development
$ npm run dev

# production mode
$ npm run prod --> soon
```

## Utilities
```bash
# check style format ts
$ npm run format

# fix style format ts
$ npm run format:fix

# lint ts
$ npm run lint

# fix lint ts
$ npm run lint:fix
```

## Test

```bash
# unit tests
$ npm run test --> soon
# for now run a sample test
$ npm run test-sample

# test coverage
$ npm run test:cov --> soon
```
