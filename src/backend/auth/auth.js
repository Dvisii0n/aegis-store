import { authApp } from "./authApp.js";
import pkg from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { connection } from "../server/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const { sign, verify } = pkg;
async function setAuthRoutes(authRoutes) {
    authApp.post(authRoutes.login, async (req, res) => {
        const fetchQuery = `SELECT * FROM usuarios WHERE email = $1`;

        connection.query(fetchQuery, [req.body.email], async (err, result) => {
            if (err) {
                return res.send(err);
            }

            const user = result.rows[0];

            if (user === undefined) {
                res.statusMessage = "User does not exist";
                return res.status(400).send();
            }

            try {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const accessToken = generateAccessToken(user);
                    const refreshToken = sign(
                        user,
                        process.env.REFRESH_TOKEN_SECRET
                    );

                    res.send({
                        msg: "Login Succesful",
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                    });
                    //guarda el refresh token en la bd
                    connection.query(
                        "INSERT INTO refreshtokens (token) VALUES ($1)",
                        [refreshToken],
                        (err, result) => {
                            if (err) {
                                return res.send(err);
                            }
                        }
                    );
                } else {
                    res.statusMessage = "Password does not match user";
                    res.status(400).send();
                }
            } catch (error) {
                res.status(500).send;
            }
        });
    });

    //reminder: esta funcion nomas se puede ejecutar al llenar el formulario de registro
    authApp.post(authRoutes.signup, async (req, res) => {
        const { nombre, email, password, telefono, direccion } = req.body;

        const hashedPassword = await getPasswordHash(password);

        const insertQuery = `INSERT INTO usuarios (nombre, email, password, telefono, direccion) VALUES ($1, $2, $3, $4, $5)`;
        connection.query(
            insertQuery,
            [nombre, email, hashedPassword, telefono, direccion],
            (error, result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            }
        );
    });

    //mandar peticion aqui para refrescar token de acceso
    authApp.post(authRoutes.token, async (req, res) => {
        const refreshToken = req.body.token;
        if (refreshToken === null) return res.sendStatus(401);

        connection.query(
            `SELECT * FROM refreshtokens WHERE token = $1`,
            [refreshToken],
            (err, result) => {
                if (err) {
                    return res.sendStatus(403);
                }

                verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                    (err, user) => {
                        if (err) {
                            return res.sendStatus(403);
                        }

                        const accessToken = generateAccessToken({
                            name: user.nombre,
                        });
                        res.send({ accessToken: accessToken });
                    }
                );
            }
        );
    });

    authApp.delete("/logout", async (req, res) => {
        connection.query(
            "DELETE FROM refreshtokens WHERE token = $1",
            [req.body.token],
            (err, result) => {
                if (err) {
                    return res.send(err);
                }

                res.send(result);
            }
        );
    });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === null) return res.sendStatus(401);

    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function generateAccessToken(user) {
    return sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "100m" });
}

async function getPasswordHash(password) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export { setAuthRoutes, authenticateToken };
