CREATE DATABASE todo_app;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    status BOOLEAN NOT NULL,
    creation_date TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW()
);
