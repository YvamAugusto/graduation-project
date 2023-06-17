import { API_URL } from "./variables.js";

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const cpf = document.getElementById("cpf").value;
    const password = document.getElementById("password").value;
    const data = { cpf, password };
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify( data )
    })
    const result = await response.json();
    if (response.status == 200) {
        sessionStorage.setItem("access_token", result.access_token);
        window.location.href = "./constructions.html"
    } else {
        alert(result.message)
    }
})
