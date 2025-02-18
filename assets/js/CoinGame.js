// const notyf = new Notyf();

let alloverMoney = document.getElementById("moneyOfBC");
let headBar = document.getElementById("headBar");
let tailBar = document.getElementById("tailBar");
let betHandeler = document.getElementById("betHandeler");
let scoreingTab = document.getElementById("scoreingTab");
let choiceBar = document.getElementById("choiceBar");
let winCount = document.getElementById("winCount");
let batingMoney = document.getElementById("batingMoney");
let halftoMoney = document.getElementById("halftoMoney");
let doubletoMoney = document.getElementById("doubletoMoney");
let profiter = document.getElementById("profiter");
let pro = document.getElementById("pro");

let logUserId = localStorage.getItem("loggedinUserId");
logUserId = logUserId.replace(/"/g, "").trim();

let coinState = "";
let heads = 0;
let tails = 0;
let casoutState = false;
let score = 0;
let money = 0;
let profiterVal = 1.98;
let investVal = 0

let batAudio = new Audio("../assets/audio/coin/bet.mp3");
let cashoutAudio = new Audio("../assets/audio/coin/cashout.mp3");
let loseAudio = new Audio("../assets/audio/coin/lose.mp3");
let startAudio = new Audio("../assets/audio/coin/start.mp3");
let winAudio = new Audio("../assets/audio/coin/win.mp3");

console.log(logUserId)
//main animation and game logic
function animationHandler() {
  heads = 0;
  tails = 0;
  startAudio.play();
  let coin = document.querySelector(".coin");
  function disableButton() {
    betHandeler.disabled = true;
    setTimeout(function () {
      betHandeler.disabled = false;
    }, 3000);
  }
  let i = Math.floor(Math.random() * 2);
  coin.style.animation = "none";
  if (i) {
    setTimeout(function () {
      coin.style.animation = "spin-heads 3s forwards";
    }, 100);
    heads++;
  } else {
    setTimeout(function () {
      coin.style.animation = "spin-tails 3s forwards";
    }, 100);
    tails++;
  }
  disableButton();
}

function gameHandler() {
  betHandeler.disabled = true;
  console.log(heads,tails)
  profiterVal = profiterVal + Number(profiter.innerHTML)
  if (coinState == "head" && heads > 0) {
    setTimeout(() => {
      winAudio.play();
        winCount.innerHTML = Number(winCount.innerHTML) + 1;
        profiter.innerHTML =  profiterVal
        setTimeout(() => {
            tailBar.disabled = false
            headBar.disabled = false
            betHandeler.disabled = false;
        }, 1000);
    }, 2000);
  } else if (coinState == "tail" && tails > 0) {
    setTimeout(() => {
      winAudio.play();
        winCount.innerHTML = Number(winCount.innerHTML) + 1;
        profiter.innerHTML =  Number(profiterVal) 
        setTimeout(() => {
            headBar.disabled = false
            tailBar.disabled = false
            betHandeler.disabled = false;
        }, 1000);
    }, 2000);
  }
  else{
    
    setTimeout(() => {
      loseAudio.play();
        notyf.error('your are out');
        pro.style.color = 'red'
        profiterVal = 0
        afterCasoutClick();
    }, 1000);
  }
}

// after click on bating button
function afterBattingClick() {
  batAudio.play();
  headBar.classList.add("btnAnimation");
  tailBar.classList.add("btnAnimation");
  headBar.disabled = false;
  tailBar.disabled = false;
  scoreingTab.classList.add("opacity");
  choiceBar.classList.remove("opacity");
  betHandeler.innerText = "Picking Side....";
  betHandeler.style.cursor = "no-drop";
  betHandeler.classList.add("btnStyle");
  betHandeler.disabled = true;
  halftoMoney.disabled = true;
  doubletoMoney.disabled = true;
  halftoMoney.style.cursor = "no-drop";
  doubletoMoney.style.cursor = "no-drop";
  headBar.style.cursor = "pointer";
  tailBar.style.cursor = "pointer";
}

function afterCasoutClick() {
  headBar.classList.remove("btnAnimation");
  tailBar.classList.remove("btnAnimation");
  headBar.disabled = true;
  tailBar.disabled = true;
  scoreingTab.classList.remove("opacity");
  choiceBar.classList.add("opacity");
  betHandeler.innerText = "Bat";
  betHandeler.style.cursor = "pointer";
  betHandeler.classList.remove("btnStyle");
  betHandeler.disabled = false;
  halftoMoney.disabled = false;
  doubletoMoney.disabled = false;
  halftoMoney.style.cursor = "pointer";
  doubletoMoney.style.cursor = "pointer";
  betHandeler.classList.remove("signoutbtn");
  if (Number(profiterVal) != 0) {
    console.log()
    alloverMoney.value = (Number(alloverMoney.value) + (Number(profiterVal) *  Number(investVal))).toFixed(2);
    cashoutAudio.play();
    setTimeout(() => {
      updateMoneyInDatabase(logUserId, Number(alloverMoney.value));
    }, 2000);
  } 
  else{
  alloverMoney.value =Number(alloverMoney.value).toFixed(2);
  setTimeout(() => {
    updateMoneyInDatabase(logUserId, Number(alloverMoney.value));
    }, 1000);
  }
  profiterVal = 0
  
}

headBar.addEventListener("click", () => {
  coinState = "head";
  animationHandler();
  gameHandler();
  betHandeler.disabled = true
  tailBar.disabled = true;
  headBar.disabled = true;
  setTimeout(()=>{
    betHandeler.innerText = "CaseOut";
    betHandeler.classList.remove("btnStyle");
    betHandeler.disabled = false;
    betHandeler.classList.add("signoutbtn");
    betHandeler.style.cursor = "pointer";
  },2000)
});
tailBar.addEventListener("click", () => {
  coinState = "tail";
  animationHandler();
  gameHandler();
  betHandeler.disabled = true
  headBar.disabled = true;
  tailBar.disabled = true;
  setTimeout(() => {
    betHandeler.innerText = "CaseOut";
  betHandeler.classList.remove("btnStyle");
  betHandeler.disabled = false;
  betHandeler.classList.add("signoutbtn");
  betHandeler.style.cursor = "pointer";
  }, 2000);
});

betHandeler.addEventListener("click", () => {
  let values = Number(batingMoney.value);
  if (!casoutState) {
    if (values == 0) {
      notyf.error("add money first");
    } else if (values > 0 && values <= 5000) {
      money = Number(alloverMoney.value) - values;
      // console.log(alloverMoney.value, money, values);
      if (Number(alloverMoney.value) < values) {
        notyf.error("you hav not enough balance");
      } else {
        investVal = Number(batingMoney.value);
        alloverMoney.value = money.toFixed(2);
        afterBattingClick();
        casoutState = true;
      }
    } else {
      notyf.error("money out of range");
      casoutState = true;
    }
  } else {
    afterCasoutClick();
    casoutState = false;
  }
});