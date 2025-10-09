import express from "express";
import { setAuthRoutes } from "./auth.js";
import { authRoutes } from "./authRoutes.js";

const authApp = express();
authApp.use(express.json());

setAuthRoutes(authRoutes);

authApp.listen(4000, () => {
    console.log("auth server running on port 4000...");
});

export { authApp };
