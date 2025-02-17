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

let serverStatus = true; // Track server status

// Function to check server status
const checkServerStatus = async () => {
  try {
    const response = await fetch("http://localhost:3000/users/");

    // Server is connected (successful response)
    if (response.ok) {
      if (!serverStatus) {
        // If server was down and now back up
        serverStatus = true;
        console.log("Server connected");
        window.location.replace("index.html"); // Redirect to index.html
      }
    }
  } catch (error) {
    // Server is not reachable
    if (serverStatus) {
      serverStatus = false; // Update status
      console.error("Server error:", error.message);
      window.location.replace("/views/404.html"); // Redirect to 404 page
    }
  }
};

// Poll every 5 seconds to check the server status
setInterval(checkServerStatus, 5000);

// Call immediately to check server status when the page loads
window.onload = () => {
  checkServerStatus();
};
