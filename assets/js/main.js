const notyf = new Notyf();
let userLogged = JSON.parse(localStorage.getItem('userLoggedIn')) || false;
if(userLogged){
   setTimeout(() => {
    notyf.success(`Welcome, hero!`)
   }, 1500); 
}

let joinNowbtn = document.getElementById('joinNowbtn')
joinNowbtn.addEventListener('click',()=>{
  window.location.href = '/views/login.html'
})
