require("dotenv").config();

const { Client } = require("pg");
const express = require("express");

const app = express();
app.use(express.json());

const connection = new Client({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    port: process.env.PORT_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME,
});

connection.connect().then(() => console.log("connected"));

//CRUD
app.post("/postData", (request, response) => {
    const { name, id, quantity, price, timestamp, address } = request.body;

    const insertQuery = `INSERT INTO orders (name, id, quantity, price, timestamp, address) VALUES ($1, $2, $3, $4, $5, $6)`;
    connection.query(
        insertQuery,
        [name, id, quantity, price, timestamp, address],
        (error, result) => {
            if (error) {
                response.send(error);
            } else {
                console.log(result);
                response.send("POSTED DATA");
            }
        }
    );
});

app.get("/fetchData", (request, response) => {
    const query = "SELECT * FROM orders";
    connection.query(query, (error, result) => {
        if (error) {
            response.send(error);
        } else {
            console.log(response);
            response.send(result.rows);
        }
    });
});

app.get("/fetchById/:id", (request, response) => {
    const id = request.params.id;
    const fetchQuery = "SELECT * FROM orders WHERE id = $1";

    connection.query(fetchQuery, [id], (error, result) => {
        if (error) {
            response.send(error);
        } else {
            console.log(response);
            response.send(result.rows[0]);
        }
    });
});

app.put("/update/:id", (request, response) => {
    const id = request.params.id;

    const { name, quantity, price, address } = request.body;

    const updateQuery =
        "UPDATE orders SET name = $2, quantity = $3, price = $4, address = $5 WHERE id = $1";

    connection.query(
        updateQuery,
        [id, name, quantity, price, address],
        (error, result) => {
            if (error) {
                response.send(error);
            } else {
                console.log(result);
                response.send("UPDATED");
            }
        }
    );
});

app.delete("/delete/:id", (request, response) => {
    const id = request.params.id;

    const deleteQuery = "DELETE FROM orders WHERE id = $1 ";

    connection.query(deleteQuery, [id], (error, result) => {
        if (error) {
            response.send(error);
        } else {
            console.log(result);
            response.send("DELETED ROW");
        }
    });
});

app.listen(3000, () => {
    console.log("server running...");
});
