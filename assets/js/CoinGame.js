const notyf = new Notyf();

let headBar = document.getElementById("headBar");
let tailBar = document.getElementById("tailBar");
let betHandeler = document.getElementById("betHandeler");
let scoreingTab = document.getElementById("scoreingTab");
let choiceBar = document.getElementById("choiceBar");
let winCount = document.getElementById("winCount");
let batingMoney = document.getElementById("batingMoney");
let halftoMoney = document.getElementById("halftoMoney");
let doubletoMoney = document.getElementById("doubletoMoney");

let coinState = "";
let heads = 0;
let tails = 0;
let casoutState = false;
let score = 0;

//main animation and game logic
function animationHandler() {
   heads,tails = 0;
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
  if (coinState == "head" && heads > 0) {
    setTimeout(() => {
        winCount.innerHTML = Number(winCount.innerHTML) + 1;
        setTimeout(() => {
            tailBar.disabled = false
        }, 1000);
    }, 2000);
  } else if (coinState == "tail" && tails > 0) {
    setTimeout(() => {
        winCount.innerHTML = Number(winCount.innerHTML) + 1;
        setTimeout(() => {
            headBarBar.disabled = false
        }, 1000);
    }, 2000);
  }
  else{
    setTimeout(() => {
        notyf.error('your are out');
        location.reload();
    }, 3000);
  }
}

// after click on bating button
function afterBattingClick() {
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
}

function afterCasoutClick() {
  betHandeler.disabled = false;
  halftoMoney.disabled = false;
  doubletoMoney.disabled = false;
  halftoMoney.style.cursor = "pointer";
  doubletoMoney.style.cursor = "pointer";
}
headBar.addEventListener("click", () => {
  coinState = "head";
  animationHandler();
  gameHandler();
  tailBar.disabled = true;
  betHandeler.innerText = "CaseOut";
  betHandeler.classList.remove("btnStyle");
  betHandeler.disabled = false;
  betHandeler.classList.add("signoutbtn");
  betHandeler.style.cursor = "pointer";
});
tailBar.addEventListener("click", () => {
  coinState = "tail";
  animationHandler();
  gameHandler();
  headBar.disabled = true;
  betHandeler.innerText = "CaseOut";
  betHandeler.classList.remove("btnStyle");
  betHandeler.disabled = false;
  betHandeler.classList.add("signoutbtn");
  betHandeler.style.cursor = "pointer";
});

betHandeler.addEventListener("click", () => {
  if (!casoutState) {
    console.log("clicked");
    if (batingMoney.value > 0) {
      afterBattingClick();
      casoutState = true;
    } else {
      notyf.error("add money first");
    }
  } else {
    afterCasoutClick();
    casoutState = false;
  }
});
