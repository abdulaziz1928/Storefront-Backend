/* Replace with your SQL commands */
CREATE TYPE order_status AS ENUM ('active','complete');

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    status order_status
    );
