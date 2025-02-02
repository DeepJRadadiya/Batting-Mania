//img Chnage
let signupImg = document.getElementById("signup-img");
let originalImg = "../assets/images/other/mainbg1.a54313bf.png";
let newImg = "../assets/images/other/mainbg2.70dbb460.png";
let isOriginal = true;
function changeImg() {
  setTimeout(() => {
    // Change the image source
    signupImg.src = isOriginal ? newImg : originalImg;
    isOriginal = !isOriginal;
  }, 1000);
}
setInterval(changeImg, 5000);

const notyf = new Notyf();
const form = document.getElementById("loginform");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const emailvalue = email.value;
  const passwordvalue = password.value;

  if (emailvalue.length == 0 || passwordvalue.length == 0) {
    notyf.error("email or password is empty");
    email.style.border = "2px solid red";
    password.style.border = "2px solid red";
    setTimeout(() => {
      email.style.border = "";
      password.style.border = "";
    }, 2300);
  } else {
    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const emailExists = users.some((users) => users.email === emailvalue);
      const user = users.find((user) => user.email === emailvalue);
      if (emailExists) {
        //if email exist
        // console.log(user.pass,passwordvalue)
        if (user.pass === passwordvalue) {
          localStorage.setItem("loggedInUser", JSON.stringify(user)); // user details
          localStorage.setItem("userLoggedIn", true); //  login status
          localStorage.setItem('loggedinUserId',JSON.stringify(user.id))
          
          notyf.success(`Welcome, BC.Game's hero!`);
          setTimeout(() => {
            window.location.href = "index.html"; // redirect to index page
          }, 1500);//sec in ms
         
        } else {
          notyf.error("password or email was wrong!");
        }
      } else {
        notyf.error("please create first account");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.message.includes("Failed to fetch")) {
        notyf.error(
          "Server connection failed! Please check your internet or try again later."
        );
      } else {
        notyf.error("An error occurred. Please try again.");
      }
    }
  }
});
