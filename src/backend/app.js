import UsuariosService from "./services/usuariosService.js";

const u = new UsuariosService();

// await u.createRow({
//     nombre: "test",
//     email: "test6@gmail.com",
//     password: "password",
//     telefono: "",
//     direccion: "",
// });

// console.log(await u.fetchRows());

console.log(await u.fetchByID(3));
