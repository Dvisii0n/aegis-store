import ProductosService from "./services/productosService.js";
import UsuariosService from "./services/usuariosService.js";
import AuthService from "./auth/authService.js";

const users = new UsuariosService();
const productos = new ProductosService();
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
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksIm5vbWJyZSI6InJlZ2lzdHJvNCIsImVtYWlsIjoicmVnaXN0cm80QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJC5DTTkzVzVUNE5tR2JZQXJqVzltSU9hODZ2MG52bnpTQlRUZlh4eW1vS21MUVNqUEMydjQyIiwidGVsZWZvbm8iOiIiLCJkaXJlY2Npb24iOiIiLCJyb2wiOiJjbGllbnRlIiwiZmVjaGFfY3JlYWNpb24iOiIyMDI1LTEwLTA5VDA0OjA1OjQ5LjgwMloiLCJpYXQiOjE3NTk5ODI3Nzl9.Ujdy-T1634R38vUU-fBAPyYauYNTv0owm50xzN0wmC8",
};
// console.log(await auth.userLogin(ejemploUsuario));

// console.log(await auth.getNewAccessToken(ejemploRefreshToken));

console.log(await auth.logout(ejemploRefreshToken));

// console.log(await auth.registerUser(ejemploRegistro));
