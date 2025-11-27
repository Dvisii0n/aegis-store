import PedidosService from "../../backend/services/pedidosService.js";
import PedidoItemsService from "../../backend/services/pedidoItemsService.js";
import ProductosService from "../../backend/services/productosService.js";
import UsuariosService from "../../backend/services/usuariosService.js";

(async function setPaymentSubmitEvent() {
    const order = new PedidosService();
    const orderItem = new PedidoItemsService();
    const prod = new ProductosService();
    const user = new UsuariosService();
    const form = document.querySelector(".payment-form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = new FormData(form);

        const info = {
            name: data.get("name"),
            lastName: data.get("last-name"),
            countryCode: data.get("country-code"),
            phoneNum: data.get("phone-num"),
            address: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            postalCode: data.get("postal-code"),
            country: data.get("country"),
        };

        const accessToken = localStorage.getItem("accessToken");
        const userID = localStorage.getItem("userID");
        const prodIDs = JSON.parse(localStorage.getItem("orderItems"));
        const total = localStorage.getItem("total");

        try {
            await user.updateRow(
                userID,
                {
                    telefono: `${info.countryCode} ${info.phoneNum}`,
                    direccion: info.address,
                },
                accessToken
            );

            const orderID = await order.createRow(
                { usuario_id: userID, total: total },
                accessToken
            );

            for (let product of prodIDs) {
                const prodInfo = await prod.fetchByID(product.id, accessToken);
                await orderItem.createRow(
                    {
                        pedido_id: orderID,
                        producto_id: product.id,
                        cantidad: product.quantity,
                        precio_unitario: prodInfo.precio,
                    },
                    accessToken
                );
            }

            alert("PEDIDO REALIZADO CON EXITO");

            window.location.href = "../pages/orders.html";
        } catch (error) {
            console.log(error);
            alert(error);
        }
    });
})();
