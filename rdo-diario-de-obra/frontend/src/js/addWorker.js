import { API_URL } from "./variables.js";

let token = "";
window.addEventListener("load", () => {
    token = sessionStorage.getItem("access_token");
});

document.getElementById("cancel").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "./constructions.html";
})

window.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const cpf = document.getElementById("cpf").value;
    const password = document.getElementById("password").value;
    if (name == "" || cpf == "" || password == "") {
        alert("Preencha todos os campos!");
        return;
    }
    const data = { name, cpf, password };
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    const worker = await response.json();
    if (worker.error) {
        alert(worker.error);
    } else {
        alert("Trabalhador cadastrado com sucesso!");
        window.location.href = "./constructions.html";
    }
})
