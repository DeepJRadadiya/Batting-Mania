class CustomHeader extends HTMLElement {
    constructor() {
        super();
        // Initialize userLoggedIn based on localStorage value
        this.userLoggedIn = localStorage.getItem('userLoggedIn');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        if (this.userLoggedIn) {
            // Render profile and other elements when logged in
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
                        <li><button id="logout-btn" class="logoutbtn">Logout</button></li>
                        <li class="profile"><a href="#"><img src="../assets/images/profile/profile.png" alt="profile img" class="profile-img"></a></li>
                    </ul>
                </div>
            </div>
            `;
        } else {
            // Render login and signup buttons when not logged in
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
                        <li><a href="/views/signup.html">Login</a></li>
                        <li><a href="signup.html">Signup</a></li>
                    </ul>
                </div>
            </div>
            `;
        }
        // Add event listener for logout
        if (this.userLoggedIn) {
            document.getElementById("logout-btn").addEventListener("click", () => {
                this.setLoginStatus(false);
            });
        }
    }

    // Method to change the login status
    setLoginStatus(isLoggedIn) {
        this.userLoggedIn = isLoggedIn;
        localStorage.setItem('userLoggedIn', isLoggedIn);
        this.render(); // Re-render the header based on login status
    }
}

customElements.define("custom-header", CustomHeader);
