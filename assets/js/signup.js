const notyf = new Notyf();

document.getElementById("radio1").addEventListener("click", ()=>{
    notyf.error("you can't deselect the button");
  });
  document.getElementById("radio2").addEventListener("click",  ()=>{
    notyf.error("you can't deselect the button");
  });
  
const form = document.getElementById("signupForm");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

 
  // Get form data
  const email = document.getElementById("email").value.toLowerCase();
  const password = document.getElementById("password").value.toLowerCase();

  if (email.length === 0 || password.length === 0) {
    notyf.error("Email or password is blank");
    document.getElementById("email").style.border = "2px solid red";
    document.getElementById("password").style.border = "2px solid red";
  } else {
    try {
      // Check if email already exists
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const emailExists = users.some((user) => user.email === email);
      const firstSignInTime = new Date().toISOString();
      if (emailExists) {
        notyf.error("This email is already registered. Please log in.");
        document.getElementById("email").style.border = "2px solid orange";
        document.getElementById("password").style.border = "2px solid orange";
      } else {
        // Create new user object
        const user = {
          email,
          pass: password,
          isLoggined: true,
          money: 1000,
          date: firstSignInTime,
        };

        // Add the new user to db.json
        const createResponse = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (createResponse.ok) {
          notyf.success("Welcome!");
          form.reset();
          document.getElementById("email").style.border = "2px solid green";
          document.getElementById("password").style.border = "2px solid green";
          window.location.href = "../views/login.html";
        } else {
          notyf.error("Failed to sign up. Please try again.");
        }
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
