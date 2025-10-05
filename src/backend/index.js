import ProductosService from "./services/productosService.js";
import UsuariosService from "./services/usuariosService.js";

const users = new UsuariosService();
const productos = new ProductosService();

// await u.createRow({
//     nombre: "test",
//     email: "test6@gmail.com",
//     password: "password",
//     telefono: "",
//     direccion: "",
// });

console.log(await users.fetchRows());
console.log(await productos.fetchRows());

// console.log(await u.fetchByID(3));
