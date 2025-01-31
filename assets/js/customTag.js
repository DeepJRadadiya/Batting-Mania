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
                                        <span id='moneyOfBC'>1000.0</span>
                                    </div>
                                </div>
                                <div class="currancy-btn">
                                    <i class="fa-solid fa-angle-down fa-sm" style="color: rgb(250, 251, 255);"></i>
                                    <button type="submit">Deposit</button>
                                </div>
                            </div>
                        </li>
                        <li><a href="#">Support</a></li>
                        <li><a href="promotion.html">Promotion</a></li>
                        <li><a href="#">Sponsorships</a></li>
                        <li class="profile"><a href="#"><img src="../assets/images/profile/profile.png" alt="profile img" class="profile-img" id="profile-btn"></a></li>
                    </ul>
                </div>
            </div>
            `;

      // Attach logout event after rendering
      setTimeout(() => {
        document.getElementById("logout-btn").addEventListener("click", () => {
          this.setLoginStatus(false);
        });
      }, 0);
    } else {
      // Render when not logged in
      this.innerHTML = `
            <div class="container">
                <div class="main">
                    <div class="logo">
                        <a href='index.html'><img src="../assets/images/icons/logo.png" alt="logo"></a>
                    </div>
                    <ul>
                        <li><a href="#">Support</a></li>
                        <li><a href="promotion.html">Promotion</a></li>
                        <li><a href="#">Sponsorships</a></li>
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

// Define the custom element
customElements.define("custom-header", CustomHeader);
