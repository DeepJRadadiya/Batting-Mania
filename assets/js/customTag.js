class CustomHeader extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <div class="container">
    <div class="main">
        <div class="logo">
            <img src="../assets/images/icons/logo.png" alt="logo">
        </div>
        <ul>
            <li>
                <div class="currancy-bar">
                    <div class="currancny-logo">
                        <img src="../assets/images/icons/BC.webp" alt="logo" >
                        <div id="price">
                            <span class="money-logo"><i class="fa-solid fa-indian-rupee-sign fa-xs" style="color: #ffffff;"></i></span>
                            <span>0.00</span>
                        </div>
                    </div>
                    <div class="currancy-btn">
                        <i class="fa-solid fa-angle-down fa-sm" style="color: rgb(250, 251, 255);"></i>
                        <button type="submit">Deposit</button>
                    </div>
                </div>
            </li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Sponsorships</a></li>
            <li><a href="#">Country</a></li>
            <li class="profile"><a href="#"><img src="../assets/images/profile/profile.png" alt="profile img" class="profile-img"></a></li>
        </ul>
    </div>
</div>
`
    }
}


customElements.define("custom-header",CustomHeader)