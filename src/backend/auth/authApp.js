import express from "express";
import { setAuthRoutes } from "./auth.js";
import { authRoutes } from "./authRoutes.js";

const authApp = express();
authApp.use(express.json());

setAuthRoutes(authRoutes);

export { authApp };
