import ProductosService from "../../backend/services/productosService.js";
import AuthService from "../../backend/auth/authService.js";

const auth = new AuthService();
const prods = new ProductosService();
const productos = [
    {
        nombre: "Camisa Deportiva Black Panther",
        descripcion: "Camisa deportiva negra para hombre con diseño ajustado",
        precio: "500",
        stock: "30",
        categoria: "Deportiva",
        talla: "M",
        color: "Negra",
        imagen_url: "/src/frontend/assets/img/Hombre/9.jpg",
    },
    {
        nombre: "Camisa Deportiva Blue Strike",
        descripcion: "Camisa deportiva azul con detalles blancos para hombre",
        precio: "520",
        stock: "28",
        categoria: "Deportiva",
        talla: "M",
        color: "Azul",
        imagen_url: "/src/frontend/assets/img/Hombre/10.jpg",
    },
    {
        nombre: "Camisa Deportiva Night Runner",
        descripcion:
            "Camisa deportiva negra con diseño moderno para entrenamientos intensos",
        precio: "530",
        stock: "25",
        categoria: "Deportiva",
        talla: "L",
        color: "Negra",
        imagen_url: "/src/frontend/assets/img/Hombre/11.jpg",
    },
    {
        nombre: "Camisa Deportiva Cream Motion",
        descripcion:
            "Camisa deportiva color crema con corte atlético para hombre",
        precio: "505",
        stock: "27",
        categoria: "Deportiva",
        talla: "L",
        color: "Crema",
        imagen_url: "/src/frontend/assets/img/Hombre/12.jpg",
    },
    {
        nombre: "Camisa Deportiva Shadow Core",
        descripcion: "Camisa deportiva negra con tecnología de secado rápido",
        precio: "515",
        stock: "32",
        categoria: "Deportiva",
        talla: "M",
        color: "Negra",
        imagen_url: "/src/frontend/assets/img/Hombre/14.jpg",
    },
    {
        nombre: "Camisa Deportiva Blue Core",
        descripcion:
            "Camisa deportiva azul marino ideal para entrenamiento o uso diario",
        precio: "510",
        stock: "30",
        categoria: "Deportiva",
        talla: "S",
        color: "Azul",
        imagen_url: "/src/frontend/assets/img/Hombre/3.jpg",
    },
    {
        nombre: "Camisa Deportiva Classic Fit",
        descripcion: "Camisa deportiva negra de compresión con acabado liso",
        precio: "495",
        stock: "25",
        categoria: "Deportiva",
        talla: "M",
        color: "Negra",
        imagen_url: "/src/frontend/assets/img/Hombre/c1.webp",
    },
    {
        nombre: "Camisa Deportiva Ultra Fit",
        descripcion:
            "Camisa deportiva azul oscuro con tela elástica y transpirable",
        precio: "520",
        stock: "28",
        categoria: "Deportiva",
        talla: "L",
        color: "Azul",
        imagen_url: "/src/frontend/assets/img/Hombre/c222.webp",
    },
    {
        nombre: "Camisa Deportiva Light Cream",
        descripcion: "Camisa deportiva color crema para entrenamiento o yoga",
        precio: "500",
        stock: "26",
        categoria: "Deportiva",
        talla: "S",
        color: "Crema",
        imagen_url: "/src/frontend/assets/img/Mujer/11.webp",
    },
    {
        nombre: "Camisa Deportiva Ocean Blue",
        descripcion: "Camisa deportiva azul cielo con ajuste suave y ligero",
        precio: "505",
        stock: "27",
        categoria: "Deportiva",
        talla: "M",
        color: "Azul",
        imagen_url: "/src/frontend/assets/img/Mujer/22.webp",
    },
    {
        nombre: "Camisa Deportiva Cream Fit",
        descripcion: "Camisa deportiva color crema con diseño minimalista",
        precio: "510",
        stock: "30",
        categoria: "Deportiva",
        talla: "L",
        color: "Crema",
        imagen_url: "/src/frontend/assets/img/Mujer/4.webp",
    },
    {
        nombre: "Camisa Deportiva Blue Air",
        descripcion:
            "Camisa deportiva azul con microperforaciones para mejor ventilación",
        precio: "515",
        stock: "29",
        categoria: "Deportiva",
        talla: "S",
        color: "Azul",
        imagen_url: "/src/frontend/assets/img/Mujer/5.webp",
    },
    {
        nombre: "Camisa Deportiva Cream Active",
        descripcion: "Camisa deportiva color crema ligera y cómoda",
        precio: "500",
        stock: "28",
        categoria: "Deportiva",
        talla: "M",
        color: "Crema",
        imagen_url: "/src/frontend/assets/img/Mujer/6.webp",
    },
    {
        nombre: "Camisa Deportiva Blue Storm",
        descripcion:
            "Camisa deportiva azul oscuro de secado rápido para alto rendimiento",
        precio: "525",
        stock: "31",
        categoria: "Deportiva",
        talla: "L",
        color: "Azul",
        imagen_url: "/src/frontend/assets/img/Mujer/mujer 2.webp",
    },
    {
        nombre: "Camisa Deportiva Black Motion",
        descripcion: "Camisa deportiva negra ajustada con detalles en gris",
        precio: "530",
        stock: "25",
        categoria: "Deportiva",
        talla: "XL",
        color: "Negra",
        imagen_url: "/src/frontend/assets/img/Mujer/mujer1.webp",
    },
    {
        nombre: "Camisa Deportiva Cream Flow",
        descripcion:
            "Camisa deportiva color crema con diseño elegante para entrenamientos ligeros",
        precio: "505",
        stock: "27",
        categoria: "Deportiva",
        talla: "M",
        color: "Crema",
        imagen_url: "/src/frontend/assets/img/Mujer/sueteer.webp",
    },
];

productos.forEach(async (prod) => {
    await prods.createRow(
        prod,
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsIm5vbWJyZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkWUhtZ1NlLkszTGovYVQ4MEI1eldULjRjNEtGeVB2U2lFaFpjRFpZUlJaMkVUcFFPRlBicy4iLCJ0ZWxlZm9ubyI6bnVsbCwiZGlyZWNjaW9uIjpudWxsLCJyb2wiOiJjbGllbnRlIiwiZmVjaGFfY3JlYWNpb24iOiIyMDI1LTExLTExVDAxOjIxOjI1LjU1N1oiLCJpYXQiOjE3NjI4MjUxMzQsImV4cCI6MTc2MjgzMTEzNH0.sAtGK-Cl0Okf_7cRTgVAglikosq6Rnya-A2d_YHROtU"
    );
});
