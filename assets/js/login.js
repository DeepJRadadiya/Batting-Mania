document.getElementById('submit').addEventListener('click',()=>{
  window.location.href = "index.html";
  localStorage.setItem("userLoggedIn",false)
})

