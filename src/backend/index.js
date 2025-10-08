import ProductosService from "./services/productosService.js";
import UsuariosService from "./services/usuariosService.js";
import AuthService from "./auth/authService.js";

const users = new UsuariosService();
const productos = new ProductosService();
const auth = new AuthService();

const ejemploRequestBody = {
    nombre: "tet",
    // email: "test2@gmail.com",
    // password: "passwrd",
    // telefono: "",
    // direccion: "",
};

// await users.createRow(ejemploRequestBody);

// await users.updateRow(13, ejemploRequestBody);
console.log(await users.fetchByName("test"));

// console.log(await users.fetchRows());
// console.log(await productos.fetchRows());

// console.log(await users.fetchByID(3));

// console.log(await auth.userLogin(ejemploRequestBody));
