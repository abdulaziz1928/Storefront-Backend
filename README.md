# Storefront Backend

## Ports

postgress port: 5432
express port: 3000

## Setup

### Creating a docker container with postgres

#### in commandline run the following:

```
docker run --name tester -e POSTGRES_PASSWORD=password123 -p 5432:5432 -d postgres
docker exec -it tester bash
psql -U postgres
```

#### in psql run the following:

```sql
CREATE USER tester WITH PASSWORD 'password123';
CREATE DATABASE postgres;
CREATE DATABASE postgres_test;
GRANT ALL PRIVILEGES ON DATABASE postgres TO tester;
GRANT ALL PRIVILEGES ON DATABASE postgres_test TO tester;
```

### Environment variables

#### Create .env file and add it to the project folder with the following:

```
POSTGRES_HOST=0.0.0.0
POSTGRES_DB=postgres
POSTGRES_TEST_DB=postgres_test
POSTGRES_USER=tester
POSTGRES_PASSWORD=password123
ENV=dev

BCRYPT_PASSWORD=the-password
SALT_ROUNDS=10
TOKEN_SECRET=this-is-my-secret
```

### Installation:

#### install dependencies

```
npm i
```

#### install dev dependencies

```
npm i -D
```

### Running the project:

#### run the database migrations

```
db-migrate up
```

#### run the project

```
npm run watch
```

#### run the project tests

```
npm run test
```
