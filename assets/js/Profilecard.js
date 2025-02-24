document.addEventListener("DOMContentLoaded", async () => {
  
  const userLogged = JSON.parse(localStorage.getItem("userLoggedIn")) || false;
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const profileBtn = document.getElementById("profile-btn");
  const profileCard = document.getElementById("profile-card");
  const overlay = document.getElementById("overlay");
  const closeBTN = document.getElementById("profile-close");
  const userEmails = document.getElementById("userEmails");
  const userName = document.getElementById("userName");
  const firstLogin = document.getElementById("firstLogin"); 

  // If user is logged in, setup profile card events
  if (userLogged && profileBtn && profileCard && overlay) {
    profileBtn.addEventListener("click", () => {
      const isVisible = profileCard.style.display === "block";

      profileCard.style.display = isVisible ? "none" : "block";
      overlay.style.display = isVisible ? "none" : "block";

      // Toggle card opened/closed
      document.body.style.overflow = isVisible ? "auto" : "hidden";
    });

    // Hide card when click outside
    document.addEventListener("click", (event) => {
      if (!profileCard.contains(event.target) && event.target !== profileBtn) {
        profileCard.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });

    // Close when click close button
    if (closeBTN) {
      closeBTN.addEventListener("click", () => {
        console.log("clicked");
        profileCard.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
  }

  // If user data exists, update the profile info
  if (user) {
    if (userEmails) userEmails.innerHTML = user.email;
    if (userName) userName.innerHTML = user.email.split("@")[0];
    if (firstLogin && user.date) firstLogin.innerHTML = user.date.split("T")[0];
  } else {
    notyf.error("Cannot log in");
  }
});
