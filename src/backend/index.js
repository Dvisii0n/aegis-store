import ProductosService from "./services/productosService.js";
import UsuariosService from "./services/usuariosService.js";

const users = new UsuariosService();
const productos = new ProductosService();

const ejemploRequestBody = {
    // nombre: "mehashearon",
    // email: "test2@gmail.com",
    password: "hashthis",
    // telefono: "",
    // direccion: "",
};

// await users.createRow(ejemploRequestBody);

// await users.updateRow(13, ejemploRequestBody);
// console.log(await users.fetchByName("mehashearon"));

// console.log(await users.fetchRows());
// console.log(await productos.fetchRows());

// console.log(await users.fetchByID(3));
