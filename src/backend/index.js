import ProductosService from "./services/productosService.js";
import UsuariosService from "./services/usuariosService.js";
import PedidosService from "./services/pedidosService.js";

import AuthService from "./auth/authService.js";

const users = new UsuariosService();
const productos = new ProductosService();
const pedidos = new PedidosService();

const auth = new AuthService();

const ejemploUsuario = {
    nombre: "registro4",
    // email: "test@gmail.com",
    password: "password",
};

const ejemploRegistro = {
    nombre: "registro4",
    email: "registro4@gmail.com",
    password: "password",
    telefono: "",
    direccion: "",
};

const ejemploRefreshToken = {
    token: "",
};
const tokens = await auth.userLogin(ejemploUsuario);

console.log(tokens);

// console.log(await auth.getNewAccessToken(ejemploRefreshToken));

// console.log(await auth.registerUser(ejemploRegistro));

// console.log(await users.fetchByName("test", tokens.accessToken));

console.log(await users.fetchRows(tokens.accessToken));
console.log(await productos.fetchRows(tokens.accessToken));
console.log(await pedidos.fetchRows(tokens.accessToken));

await auth.logout({ token: tokens.refreshToken });
