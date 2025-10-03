import "dotenv/config";
import { Client } from "pg";
import express from "express";

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

app.listen(3000, () => {
    console.log("server running...");
});

export { app };
