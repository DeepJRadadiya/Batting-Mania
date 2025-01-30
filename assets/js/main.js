const notyf = new Notyf();
let userLogged = JSON.parse(localStorage.getItem("userLoggedIn")) || false;

let joinNowbtn = document.getElementById("joinNowbtn");
joinNowbtn.addEventListener("click", () => {
  if (!userLogged) {
    window.location.href = "/views/login.html";
  } else {
    window.location.href = "/views/promotion.html";
  }
});


let hiloGameCard = document.getElementById('hilo')
let coinGameCard = document.getElementById('coin')
let tossGameCard = document.getElementById('toss')
const  CardentryError = ()=>{
  if(!userLogged){
    notyf.error('please login first to play')
  }
}
hiloGameCard.addEventListener('click',()=>{
  if(!userLogged){
    notyf.error('please login first to play')
  }
  else{
    //if user is loggin
    window.location.href = '/views/HiloGame.html'
  }
})
coinGameCard.addEventListener('click',()=>{
  if(!userLogged){
    notyf.error('please login first to play')
  }
  else{
    //if user is loggin
    window.location.href = '/views/CoinGame.html'
  }
})
tossGameCard.addEventListener('click',CardentryError)
