import { API_URL } from "./variables.js";

let token = "";
window.addEventListener("load", () => {
    token = sessionStorage.getItem("access_token");
    loadRelatedUsers();
});

document.getElementById("cancel").addEventListener("click", (event) => {
    event.preventDefault();
    window.location.href = "./constructions.html";
})

async function loadRelatedUsers() {
    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const responseUsers = await response.json();
    const users = responseUsers.users;
    console.log(users);
    if (users.error) {
        alert(users.error);
    } else {
        const select = document.getElementById("manager");
        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id;
            option.innerText = user.name;
            select.appendChild(option);
        });
    }
}

window.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const manager_id = document.getElementById("manager").value;
    if (name == "" || address == "" || manager == "") {
        alert("Preencha todos os campos!");
        return;
    }
    const data = { name, address, manager_id };
    const response = await fetch(`${API_URL}/constructions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    const construction = await response.json();
    if (construction.error) {
        alert(construction.error);
    } else {
        alert("Obra cadastrada com sucesso!");
        window.location.href = "./constructions.html";
    }
})