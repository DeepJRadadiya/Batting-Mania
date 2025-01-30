document.addEventListener("DOMContentLoaded", () => {
  // profile card css
  let userLogged = JSON.parse(localStorage.getItem("userLoggedIn")) || false;
  if (userLogged) {
    const profileBtn = document.getElementById("profile-btn");
    const profileCard = document.getElementById("profile-card");
    const overlay = document.getElementById("overlay");

    profileBtn.addEventListener("click", () => {
      const isVisible = profileCard.style.display === "block";

      profileCard.style.display = isVisible ? "none" : "block";
      overlay.style.display = isVisible ? "none" : "block";

      // Disable scrolling when profile card is open
      document.body.style.overflow = isVisible ? "auto" : "hidden";
    });

    // Hide profile card when clicking outside
    document.addEventListener("click", (event) => {
      if (!profileCard.contains(event.target) && event.target !== profileBtn) {
        profileCard.style.display = "none";
        overlay.style.display = "none";

        // Enable scrolling again
        document.body.style.overflow = "auto";
      }
    });

    // close btn
    let closeBTN = document.getElementById("profile-close");
    closeBTN.addEventListener("click", () => {
      console.log("clicked");
      profileCard.style.display = "none";
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
});
