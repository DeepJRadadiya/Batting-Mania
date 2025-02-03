const notyf = new Notyf();
let userLogged = JSON.parse(localStorage.getItem("userLoggedIn")) || false;

let joinNowbtn = document.getElementById("joinNowbtn");

// Redirect Join Now Button
joinNowbtn.addEventListener("click", () => {
  window.location.href = userLogged
    ? "/views/promotion.html"
    : "/views/login.html";
});

// Game Cards
let hiloGameCard = document.getElementById("hilo");
let coinGameCard = document.getElementById("coin");
let tossGameCard = document.getElementById("mine");

hiloGameCard.addEventListener("click", () => {
  userLogged
    ? (window.location.href = "/views/HiloGame.html")
    : notyf.error("Please login first to play");
});

coinGameCard.addEventListener("click", () => {
  userLogged
    ? (window.location.href = "/views/CoinGame.html")
    : notyf.error("Please login first to play");
});

tossGameCard.addEventListener("click", () => {
  userLogged
    ? (window.location.href = "/views/MineGame.html")
    : notyf.error("Please login first to play");
});

