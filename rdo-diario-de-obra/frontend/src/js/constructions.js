import { API_URL } from "./variables.js";
import jwt_decode from "jwt-decode";

let userRole = jwt_decode(sessionStorage.getItem("access_token")).role;
window.addEventListener("load", () => {
    let token = sessionStorage.getItem("access_token");
    if (userRole !== "MANAGER") {
        document.getElementById("addWorkerButton").style.visibility = "visible";
        document.getElementById("addConstructionButton").style.visibility = "visible";
    }
    loadProducts(token);
});

document.getElementById("logoutButton").addEventListener("click", () => {
    sessionStorage.removeItem('access_token')
    window.location.href = './index.html'
})

async function loadProducts(token) {
    const response = await fetch(`${API_URL}/constructions`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const constructions = await response.json();
    const constructionsContainer = document.getElementById("constructionsContainer");
    constructions.forEach((construction) => {
      const constructionCard = document.createElement("li")
      constructionCard.setAttribute("data_id", construction.id);
      if (userRole !== "MANAGER") {
        constructionCard.setAttribute("onclick", "window.location.href = './constructionHistory.html'");
      } else {
        constructionCard.setAttribute("onclick", "window.location.href = './register.html'");
      }
      constructionCard.innerHTML = `
        <li class="construction">
          <h2>${construction.name}</h2>
          <p>${construction.address}</p>
          <p>Situação: Em andamento</p>
          <p>Responsável: ${construction.manager.name}</p>
        </li>`;
      constructionsContainer.appendChild(constructionCard);
    });
}