function checkRoutePermission(route) {
    const token = sessionStorage.getItem("access_token");
    if (!route.includes("index") && !token) {
      return false;
    }
    return true;
}
  
window.addEventListener("load", function (event) {
    if (!checkRoutePermission(window.location.pathname)) {
        event.preventDefault();
        window.location.href = "./index.html";
    }
})