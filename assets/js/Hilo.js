const notyf = new Notyf();
let alloverMoney = document.getElementById("moneyOfBC");
let batingMoney = document.getElementById("batingMoney");
let halftoMoney = document.getElementById("halftoMoney");
let doubletoMoney = document.getElementById("doubletoMoney");
let cardskipBtn1 = document.getElementById("cardskipBtn1");
let cardskipBtn2 = document.getElementById("cardskipBtn2");
let betHandelerbtn = document.getElementById("betHandeler");
let totalProfitScore = document.getElementById("totalProfitScore");
let lowImg = document.getElementById("lowImg");
let hiImg = document.getElementById("hiImg");
let loProfiter = document.getElementById("loProfiter");
let hiProfiter = document.getElementById("hiProfiter");
let scoreingTab = document.getElementById("scoreingTab");
let logUserId = localStorage.getItem("loggedinUserId");
let probabilityofHSinBatSide = document.getElementById('probabilityofHSinBatSide');
let probabilityofLSinBatSide = document.getElementById('probabilityofLSinBatSide');
let probabilityofHSinGameSide = document.getElementById('probabilityofHSinGameSide');
let probabilityofLSinGameSide = document.getElementById('probabilityofLSinGameSide');
let profitCalFromHi = document.getElementById("profitCalFromHi");
let profitCalFromLo = document.getElementById("profitCalFromLo");
logUserId = logUserId.replace(/"/g, "").trim();


let investVal = 0;
let casoutState = false;
let prevVal = null;
let randVal = null;
let score = 0;

// all audio files
const cardgenAudio = new Audio("../assets/audio/bet-4388e4b9.mp3");
const casoutAudio = new Audio("../assets/audio/cashout-19360f23.mp3");
const winAudio = new Audio("../assets/audio/win-88e8723b.mp3");
const lossAudio = new Audio("../assets/audio/deal-4c5ef928.mp3");
const skipAudio = new Audio("../assets/audio/skip-639cbd65.mp3");
cardgenAudio.preload = "auto";
casoutAudio.preload = "auto";
winAudio.preload = "auto";
lossAudio.preload = "auto";
skipAudio.preload = "auto";

// profit multipler dic
profitMultipler = {
  1: { h: 1.07, l: 12 },
  2: { h: 1.08, l: 6.5 },
  3: { h: 1.18, l: 4.33 },
  4: { h: 1.3, l: 3.24 },
  5: { h: 1.44, l: 2.6 },
  6: { h: 1.62, l: 2.16 },
  7: { h: 1.85, l: 1.85 },
  8: { h: 2.16, l: 1.62 },
  9: { h: 2.6, l: 1.44 },
  10: { h: 3.24, l: 1.3 },
  11: { h: 4.33, l: 1.18 },
  12: { h: 6.5, l: 1.08 },
  13: { h: 13, l: 1.08 },
};

//probabilty of next high and low card
const probabilityMultipler = {
  1: { h: "92.31%", l: "7.69%" },
  2: { h: "92.31%", l: "15.38%" },
  3: { h: "84.62%", l: "23.08%" },
  4: { h: "76.92%", l: "30.77%" },
  5: { h: "69.23%", l: "38.46%" },
  6: { h: "61.55%", l: "46.15%" },
  7: { h: "53.85%", l: "53.85%" },
  8: { h: "46.15%", l: "61.55%" },
  9: { h: "38.46%", l: "69.23%" },
  10: { h: "30.77%", l: "76.92%" },
  11: { h: "23.08%", l: "84.62%" },
  12: { h: "15.38%", l: "92.31%" },
  13: { h: "7.69%", l: "92.31%" }
};




// disabel all btn
const elements = [cardskipBtn1, cardskipBtn2, hiImg, lowImg];
elements.forEach((el) => (el.style.cursor = "not-allowed"));

// after batting button click
function afterBattingClick() {
  elements.forEach((el) => (el.style.cursor = ""));
  Array.from(document.getElementsByClassName("blurDisplayEffect")).forEach(
    (el) => {
      el.style.filter = "none";
    }
  );
  scoreingTab.classList.add("blurDisplayEffect");
  batingMoney.disabled = true;
  batingMoney.style.userSelect = "none";
  halftoMoney.disabled = true;
  halftoMoney.style.cursor = "context-menu";
  doubletoMoney.disabled = true;
  doubletoMoney.style.cursor = "context-menu";
  betHandelerbtn.classList.add("signoutbtn");
  betHandelerbtn.innerText = "Cash out";
}

// after casout button click
function afterCasoutClick() {
  elements.forEach((el) => (el.style.cursor = ""));
  Array.from(document.getElementsByClassName("blurDisplayEffect")).forEach(
    (el) => {
      el.style.filter = "";
    }
  );
  scoreingTab.classList.remove("blurDisplayEffect");
  betHandelerbtn.classList.remove("signoutbtn");
  batingMoney.disabled = false;
  batingMoney.style.userSelect = " ";
  halftoMoney.disabled = false;
  halftoMoney.style.cursor = "pointer";
  doubletoMoney.disabled = false;
  doubletoMoney.style.cursor = "";
  betHandelerbtn.style = "";
  betHandelerbtn.innerText = "Bat";
  HiloCardImg.src = "../assets/images/cards/0.png";
  HiloCardImg.style.outline = "";
  casoutState = false;
  if (Number(totalProfitScore.innerHTML) != 0) {
    alloverMoney.value =
      Number(alloverMoney.value) + Number(score) + Number(investVal);
    casoutAudio.play();
    setTimeout(() => {
      updateMoneyInDatabase(logUserId, Number(alloverMoney.value));
    }, 5000);
  } 
  else{
  alloverMoney.value =Number(alloverMoney.value);
  }
  setTimeout(() => {
  updateMoneyInDatabase(logUserId, Number(alloverMoney.value));
  }, 2000);
  totalProfitScore.innerHTML = 0;
}

// randome nuber genrate
function getRandomNumber() {
  return Math.floor(Math.random() * (13 - 1 + 1)) + 1;
}

//skip card gen
function cardgenBtnHandlers() {
  prevVal = randVal;
  randVal = getRandomNumber();
  hiProfiter.innerHTML = Number(profitMultipler[randVal].h.toFixed(2));
  loProfiter.innerHTML = Number(profitMultipler[randVal].l.toFixed(2));
  probabilityofHSinBatSide.innerHTML = probabilityMultipler[randVal].h
  probabilityofLSinGameSide.innerText  = probabilityMultipler[randVal].l
  probabilityofHSinGameSide.innerHTML = probabilityMultipler[randVal].h
  probabilityofLSinBatSide.innerHTML = probabilityMultipler[randVal].l

  profitCalFromHi.innerHTML = Number(
    (
      Number(investVal) * profitMultipler[randVal].h -
      Number(investVal)
    ).toFixed(2)
  );
  profitCalFromLo.innerHTML = Number(
    (
      Number(investVal) * profitMultipler[randVal].l -
      Number(investVal)
    ).toFixed(2)
  );

  // profitCalFromHi.innerHTML = Number(((investVal + score) * profitMultipler[randVal].h ) - investVal)
  // profitCalFromLo.innerHTML =  Number(((investVal + score) * profitMultipler[randVal].l ) - investVal)
  // console.log('profit',profitCalFromHi,profitCalFromHi)
  // console.log(profitMultipler[randVal].h,profitMultipler[randVal].l)

  skipAudio.play();
  setTimeout(() => {
    cardgenAudio.play();
  }, 300);
  HiloCardImg.src = "../assets/images/cards/" + randVal + ".png";
}

//all card gen
function cardgenBtnHandler() {
  prevVal = randVal;
  randVal = getRandomNumber();
  hiProfiter.innerHTML = Number(profitMultipler[randVal].h.toFixed(2));
  loProfiter.innerHTML = Number(profitMultipler[randVal].l.toFixed(2));
  probabilityofHSinBatSide.innerHTML = probabilityMultipler[randVal].h
  probabilityofLSinGameSide.innerText  = probabilityMultipler[randVal].l
  probabilityofHSinGameSide.innerHTML = probabilityMultipler[randVal].h
  probabilityofLSinBatSide.innerHTML = probabilityMultipler[randVal].l

  profitCalFromHi.innerHTML = Number(
    (
      Number(investVal) * profitMultipler[randVal].h -
      Number(investVal)
    ).toFixed(2)
  );
  profitCalFromLo.innerHTML = Number(
    (
      Number(investVal) * profitMultipler[randVal].l -
      Number(investVal)
    ).toFixed(2)
  );

  // profitCalFromHi.innerHTML = Number(((investVal + score) * profitMultipler[randVal].h ) - investVal)
  // profitCalFromLo.innerHTML =  Number(((investVal + score) * profitMultipler[randVal].l ) - investVal)
  // console.log('profit',profitCalFromHi.innerHTML,profitCalFromHi.innerHTML)
  // console.log(profitMultipler[randVal].h,profitMultipler[randVal].l)
  cardgenAudio.play();
  HiloCardImg.src = "../assets/images/cards/" + randVal + ".png";
}

// game handling function
function gameHandler() {
  function scoreset() {
    if (score === 0) {
      casoutState = false;
      hiImg.removeEventListener("click", hiImgHandler);
      lowImg.removeEventListener("click", lowImgHandler);
      cardskipBtn1.removeEventListener("click", cardgenBtnHandler);
      cardskipBtn2.removeEventListener("click", cardgenBtnHandler);
      HiloCardImg.style.outline = "4px solid red";
      HiloCardImg.style.borderRadius = "5px";
      totalProfitScore.innerHTML = Number(score.toFixed(2));
      notyf.error("opps! game over");
      hiProfiter.innerHTML, (loProfiter.innerHTML = 0), 0;
      setTimeout(() => {
        afterCasoutClick();
      }, 2000);
    } else {
      totalProfitScore.innerHTML = Number(score.toFixed(2));
      console.log(totalProfitScore.innerHTML, score);
    }
  }

  //hi button click
  function hiImgHandler() {
    cardgenBtnHandler();
    if (prevVal <= randVal) {
      console.log("high", prevVal, randVal);
      score += Number(
        (investVal * profitMultipler[prevVal].h - investVal).toFixed(2)
      );
      scoreset();
      cardgenAudio.pause();
      winAudio.play();
    } else {
      console.log("game over");
      score = 0;
      cardgenAudio.pause();
      lossAudio.play();
      scoreset();
    }
  }

  //low button click
  function lowImgHandler() {
    cardgenBtnHandler();
    if (prevVal >= randVal) {
      console.log("low", prevVal, randVal);
      score += Number(
        (investVal * profitMultipler[prevVal].l - investVal).toFixed(2)
      );
      cardgenAudio.pause();
      winAudio.play();
      scoreset();
    } else {
      console.log("game over");
      score = 0;
      cardgenAudio.pause();
      lossAudio.play();
      scoreset();
    }
  }
  cardskipBtn1.addEventListener("click", cardgenBtnHandlers);
  cardskipBtn2.addEventListener("click", cardgenBtnHandlers);
  lowImg.addEventListener("click", lowImgHandler);
  hiImg.addEventListener("click", hiImgHandler);
}

//bet button click
betHandelerbtn.addEventListener("click", (event) => {
  event.preventDefault();
  let values = Number(batingMoney.value);
  if (!casoutState) {
    //button will be work as bat btn
    if (values == 0) {
      notyf.error("add money first");
    } else if (values > 0 && values <= 500000) {
      money = Number(alloverMoney.value) - values;
      console.log(alloverMoney.value, money, values);
      if (Number(alloverMoney.value) < values) {
        notyf.error("you hav not enough balance");
      } else {
        alloverMoney.value = money;
        totalProfitScore.innerHTML = Number(score.toFixed(2));
        investVal = values;
        console.log(values);
        afterBattingClick();
        cardgenBtnHandler();
        batingMoney.value = 0;
        casoutState = true;
        //game logic
        gameHandler();
      }
    } else {
      notyf.error("money out of range");
      casoutState = true;
    }
  } else {
    //button will be work as casout
    afterCasoutClick();
      notyf.success("money will withdrwal");
      casoutState = false;
  
  }
});

