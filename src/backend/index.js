import ProductosService from "./services/productosService.js";
import UsuariosService from "./services/usuariosService.js";

const users = new UsuariosService();
const productos = new ProductosService();

const ejemploRequestBody = {
    nombre: "test",
    email: "test6@gmail.com",
    password: "password",
    telefono: "",
    direccion: "",
};

await users.createRow(ejemploRequestBody);

console.log(await users.fetchRows());
console.log(await productos.fetchRows());

console.log(await users.fetchByID(3));
