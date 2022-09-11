## API Endpoints

#### Products

#### - Index

- route: /products
- http verb: GET
- body: None

#### - Show

- route: /products/:id
- http verb: GET
- body: None

#### - Create [token required]

- route: /products
- http verb: POST
- body:

```json
{
  name: "",
  category: "",
  price: ,
};
```

#### Users

#### - Index [token required]

- route: /users
- http verb: GET
- body:None

#### - Show [token required]

- route: /users/:id
- http verb: GET
- body:None

#### - Create N[token required]

- route: /users
- http verb: POST
- body:

```json
{
  firstname: "",
  lastname: "",
  password: "" ,
};
```

#### Orders

#### - Current Order by user (args: user id) [token required]

- route: /orders/:id/products
- http verb: GET
- body:

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    price INTEGER NOT NULL,
    category VARCHAR
);
```

#### User

- id
- firstName
- lastName
- password

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    password VARCHAR
    );
```

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

```sql
CREATE TYPE order_status AS ENUM ('active','complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    status order_status
    );
```

```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
    );
```
