document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const notyf = new Notyf();
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const isLoggedIn = 1; // true (1) for logged-in
  const emails = document.getElementById("email")
  const passwords = document.getElementById("password")
    if (email === "" || password === "") {
        
        emails.style.border = '2px solid red'
        passwords.style.border = '2px solid red'
        notyf.error("Email or Password are empty!");
        
    } else {
        
        emails.style.border = '2px solid green'
        passwords.style.border = '2px solid green'
  // Debug log to check form data
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("isLoggedIn:", isLoggedIn);

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("isLoggedIn", isLoggedIn); // Add isLoggedIn

  // Send data to the server using Fetch API
  fetch("http://localhost/project/Batting-Mania/database/signup.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        notyf.success("your are loggiend");
        window.location.href = "../views/index.html";
      } else {
        notyf.error("Error message!");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      console.log("An error occurred. Please try again.");
    });
    }
   
});
