import AuthService from "../../backend/auth/authService.js";
import CarritosService from "../../backend/services/carritosService.js";

const auth = new AuthService();
const cart = new CarritosService();

async function createCart(userID, accessToken) {
    try {
        await cart.createRow({ usuario_id: userID }, accessToken);
    } catch (error) {
        throw error;
    }
}

(function setRegisterEvent() {
    const signUpForm = document.querySelector(".sign-up>form");

    signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(signUpForm);

        const requestBody = {
            nombre: data.get("username"),
            email: data.get("email"),
            password: data.get("password"),
        };

        const res = await auth.registerUser(requestBody);

        if (res.name === "error") {
            alert(`El correo ${requestBody.email} ya esta en uso.`);
        } else {
            alert("Usuario registrado con exito, por favor inicia sesion");

            location.reload();
        }
    });
})();

(function setLoginEvent() {
    const signInForm = document.querySelector(".sign-in>form");

    signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(signInForm);

        const requestBody = {
            email: data.get("email"),
            password: data.get("password"),
        };

        try {
            const res = await auth.userLogin(requestBody);
            if (res.name === "error") {
                alert(res.name);
                return;
            }

            alert("Sesion iniciada con exito");

            localStorage.setItem("userID", res.userID);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            localStorage.setItem("role", res.role);

            const cartExistsResponse = await cart.cartExists(
                res.userID,
                res.accessToken
            );

            if (cartExistsResponse.exists === false) {
                await createCart(res.userID, res.accessToken);
            }

            if (location.search) {
                history.replaceState(
                    null,
                    "",
                    location.pathname + location.hash
                );
            }

            window.location.href = "../pages/index.html";
        } catch (error) {
            alert("Usuario no valido");
        }
    });
})();
