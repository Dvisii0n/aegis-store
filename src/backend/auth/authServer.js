import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { setAuthRoutes } from "./authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const authApp = express();
authApp.use(express.json());

setAuthRoutes();

authApp.listen(4000, () => {
    console.log("auth server running...");
});

export { authApp };
