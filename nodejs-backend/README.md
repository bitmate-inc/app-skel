# Description

This project was bootstrapped with [NestJS](https://nestjs.com/), a
progressive <a href="http://nodejs.org" target="blank">Node.js</a>
framework for building efficient and scalable server-side applications.

# Quick setup and run

## Requirements

* node >= 12
* docker
* docker-compose
* yarn

## Setup

1. Setup infrastructure with docker and docker-compose

```bash
docker-compose up -d
```

2. Install packages

```bash
yarn install
```

3. Create database schema

```bash
yarn typeorm schema:sync
```

4. Load fixtures

```bash
yarn fixtures:load:dev
```

## Run

```bash
yarn start
```

This will run the app on port 8000.

# Details

## Docker

Using docker and docker-compose for development is suggested. It will set up necessary infrastructure for running the
app.

Use `docker-compose up -d` to create/run the containers.

Use `docker-compose down` to stop/remove containers.

Use `docker-compose down -v --remove-orphans` to completely clean all docker related stuff (volumes, networks, etc.).

## Install Packages

```bash
yarn install
```

## PostgreSQL

Setting up database for development (this is necessary if docker-compose is **not** used):

```postgresql
--- create user
CREATE USER project WITH LOGIN;
ALTER ROLE project with password 'password';

--- create database
CREATE DATABASE project WITH OWNER project;

--- use the new database:
\c project;

--- enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "tablefunc";
```

## Environment

Base environment variables are set in `.env` file. This file is committed to repository and should **NOT** be changed
locally.

Overriding values of environment variables **MUST** be done in `.env.local` file!

If necessary, set database user, pw, database, etc in corresponding `TYPEORM_` vars. For development
set `TYPEORM_SYNCHRONIZE=true`, it will do database synchronisation with the model on app startup
(otherwise use `yarn typeorm schema:sync`).

Set `AUTH_UPDATE_PASSWORD_URL` (if necessary) to `<frontend_base_url>/auth/update-password/:token`. This is the URL that
will be put to password reset email. Default is `http://localhost:3000/auth/update-password/:token`.

Set `AUTH_CONFIRM_EMAIL_URL` (if necessary) to `<frontend_base_url>/auth/confirm-email/:token`. This is the URL that
will be put to password reset email. Default is `http://localhost:3000/auth/confirm-email/:token`.

## ORM

[TypeORM](https://typeorm.io/#/) is used as ORM tool.

Configuration is in configuration file [`ormconfig.js`](./ormconfig.js).

TypeORM CLI tool can be used as follows:

```bash
yarn typeorm <command> [params, ...]
```

More info about CLI tool can be found in [TypeORM CLI docs](https://typeorm.io/#/using-cli).

## Fixtures

To load dev fixtures execute:

```bash
yarn fixtures:load:dev
```

To load production fixtures execute:

```bash
yarn fixtures:load:prod
```

## Migrations

Migrations are handled by TypeORM. Please see [TypeORM Migrations docs](https://typeorm.io/#/migrations) on how they
work.

Migration classes are located in [./src/migration](./src/migration) folder.

## SMTP Server (optional)

Set up an SMTP server of your choice, like Sendgrid, and setup correct values for env vars noted in [.env](.env) file,
under `Email`.

## Running the app

If `TYPEORM_SYNCHRONIZE` wasn't set to true, database sync must be done manually:

```bash
yarn typeorm schema:sync
```

To run the app execute one of the following:

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## App CLI

See available CLI commands:

```bash
$ yarn cli -h
```

For yarn scripts check `"scripts"` part of [package.json](./package.json) or run:

```bash
$ yarn run
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e:prepare     // prepare db for tests
$ yarn test:e2e             // run tests

# test coverage
$ yarn test:cov
```
