class CustomHeader extends HTMLElement {
  constructor() {
    super();
    // Initialize userLoggedIn properly
    this.userLoggedIn =
      JSON.parse(localStorage.getItem("userLoggedIn")) || false;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.userLoggedIn) {
      // Render when logged in
      this.innerHTML = `
            <div class="container">
                <div class="main">
                    <div class="logo">
                        <a href='index.html'><img src="../assets/images/icons/logo.png" alt="logo"></a>
                    </div>
                    <ul>
                        <li>
                            <div class="currancy-bar">
                                <div class="currancny-logo">
                                    <img src="../assets/images/icons/BC.webp" alt="logo" >
                                    <div id="price">
                                        <span class="money-logo"><i class="fa-solid fa-indian-rupee-sign fa-xs" style="color: #ffffff;"></i></span>
                                        <span><input type='text' name='money' id='moneyOfBC' value='0'  disabled/></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="promoson"><a href="promotion.html"><i class="fa-solid fa-bullhorn" style=" color: rgba(255, 255, 255, 0.650)";></i></a></li>
                        <li class="sponsorship"><a href="sponsorship.html"><i class="fa-solid fa-handshake" style=" color: rgba(255, 255, 255, 0.650) ;"></i></a></li>
                        <li class="profile"><a href="#"><img src="../assets/images/profile/profile.png" alt="profile img" class="profile-img" id="profile-btn"></a></li>
                    </ul>
                </div>
            </div>
            `;
            document.addEventListener("DOMContentLoaded", () => {
              abcfun();
          });
      // Attach logout event after rendering
      setTimeout(() => {
        document.getElementById("logout-btn").addEventListener("click", () => {
          this.setLoginStatus(false);
        });
      }, 1000);
    } else {
      // Render when not logged in
      this.innerHTML = `
            <div class="container">
                <div class="main">
                    <div class="logo">
                        <a href='index.html'><img src="../assets/images/icons/logo.png" alt="logo"></a>
                    </div>
                    <ul>
                        <li class="promoson"><a href="promotion.html"><i class="fa-solid fa-bullhorn" style=" color: rgba(255, 255, 255, 0.650)";></i></a></li>
                        <li class="sponsorship"><a href="sponsorship.html"><i class="fa-solid fa-handshake" style=" color: rgba(255, 255, 255, 0.650) ;"></i></a></li>
                        <li><button class="loginbtn"><a href="/views/login.html">Login</a></button></li>
                        <li><button class="signupbtn"><a href="/views/signup.html">Signup</a></button></li>
                    </ul>
                </div>
            </div>
            `;
    }
  }

  // Method to change login status
  setLoginStatus(isLoggedIn) {
    this.userLoggedIn = isLoggedIn;
    if (isLoggedIn) {
      localStorage.setItem("userLoggedIn", "true");
    } else {
      localStorage.removeItem("userLoggedIn"); // Clear login data
      window.location.href = "/views/login.html"; // Redirect to login page
    }
    this.render();
  }
}
customElements.define("custom-header", CustomHeader); // Define the custom element


async function abcfun() {
  let logUserId = localStorage.getItem("loggedinUserId");
  logUserId = logUserId.replace(/"/g, "").trim(); // Clean user ID

  try {
    const response = await fetch(`http://localhost:3000/users/${logUserId}`);
    if (!response.ok) {
      throw new Error("User not found");
    }

    const users = await response.json();
    let alloverMoney = document.getElementById("moneyOfBC");
    alloverMoney.value = users.money;
    
  } catch (error) {
    console.error("Server error:", error.message);
    // alert("Server error: " + error.message); // Handle error gracefully
  }
}
