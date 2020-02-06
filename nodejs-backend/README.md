## Description

This project was bootstrapped with [NestJS](https://nestjs.com/) A progressive <a href="http://nodejs.org" target="blank">Node.js</a>
 framework for building efficient and scalable server-side applications.


## Installation

##### Install Packages
 
```bash
yarn install
```

##### Set up environment
Copy `.env.example` file to `.env` and fill in the values.

For development set `TYPEORM_SYNCHRONIZE=true`.

## Database

PostgreSQL database is used. 

Setting up database for development:

```postgresql
--- create user
CREATE USER project WITH LOGIN;
ALTER ROLE project with password 'password';

--- create database
CREATE DATABASE project WITH OWNER project;

--- use the new database:
\c project;
--- enable uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

#### ORM

[TypeORM](https://typeorm.io/#/) is used as ORM tool.

Configuration file [`ormconfig.js`](./ormconfig.js).

TypeORM CLI tool can be used as follows:

```bash
yarn run typeorm <command> [params, ...]
```

More info about CLI tool can be found in [TypeORM CLI docs](https://typeorm.io/#/using-cli).


#### Fixtures

To load fixtures execute:

```bash
yarn run fixtures:load
```


## Running the app

If `TYPEORM_SYNCHRONIZE` wasn't set to true, database sync must be done manually:

```bash
yarn run typeorm schema:sync
```

To run the app execute one of the following:

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```