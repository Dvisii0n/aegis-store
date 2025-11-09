import AuthService from "../../backend/auth/authService.js";

const auth = new AuthService();

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
    const signUpForm = document.querySelector(".sign-in>form");

    signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(signUpForm);

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
            console.log(res);
            localStorage.setItem("accessToken", res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
            window.location.href = "../pages/index.html";
        } catch (error) {
            alert("Usuario no valido");
        }
    });
})();
