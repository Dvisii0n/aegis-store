import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Client } from "pg";
import express from "express";
import { setUsersRoutes } from "../routes/usuarios.js";
import { setCarritosRoutes } from "../routes/carritos.js";
import { setCarritoItemsRoutes } from "../routes/carrito_items.js";
import { setPedidoItemsRoutes } from "../routes/pedido_items.js";
import { setPedidosRoutes } from "../routes/pedidos.js";
import { setProductosRoutes } from "../routes/productos.js";
import { setStatsRoutes } from "../routes/stats.js";
import { authApp } from "../auth/authApp.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use("/auth", authApp);
app.use(express.json());

const connection = new Client({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    port: process.env.PORT_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_NAME,
});

connection.connect().then(() => console.log("connected"));

await setUsersRoutes();
await setCarritosRoutes();
await setCarritoItemsRoutes();
await setPedidoItemsRoutes();
await setPedidosRoutes();
await setProductosRoutes();
await setStatsRoutes();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, connection };
