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
let scoreingTab = document.getElementById("scoreingTab");
let investVal = 0;
let casoutState = false;
let prevVal = null;
let randVal = null;
let score = 0;

// disabel all btn
const elements = [cardskipBtn1, cardskipBtn2, hiImg, lowImg];
elements.forEach((el) => (el.style.cursor = "not-allowed"));

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
  if (!(score === 0)) {
    alloverMoney.innerHTML = Number(alloverMoney.innerHTML) + score + investVal;
  }
  totalProfitScore.innerHTML = 0;
}

//half button
halftoMoney.addEventListener("click", () => {
  let currentValue = Number(batingMoney.value);
  if (currentValue >= 10) {
    if (currentValue >= 20) {
      // if 10 or more
      batingMoney.value = currentValue / 2;
    } else {
      notyf.error("Your money cannot go below 10!");
    }
  } else {
    notyf.error("Minimum bet is 10");
  }
});

//2x button
doubletoMoney.addEventListener("click", () => {
  let currentValue = Number(batingMoney.value);

  if (currentValue >= 10) {
    let newValue = currentValue * 2;

    if (newValue <= 5000) {
      batingMoney.value = newValue;
    } else {
      notyf.error("Batting limit is 5000");
    }
  } else {
    notyf.error("Minimum bet is 10");
  }
});

function getRandomNumber() {
  return Math.floor(Math.random() * (13 - 1 + 1)) + 1;
}

function cardgenBtnHandler() {
  prevVal = randVal;
  randVal = getRandomNumber();
  HiloCardImg.src = "../assets/images/cards/" + randVal + ".png";
}
// game handling function
function gameHandler() {
  function scoreset() {
    if (score === 0) {
      hiImg.removeEventListener("click", hiImgHandler);
      lowImg.removeEventListener("click", lowImgHandler);
      cardskipBtn1.removeEventListener("click", cardgenBtnHandler);
      cardskipBtn2.removeEventListener("click", cardgenBtnHandler);
      HiloCardImg.style.outline = "4px solid red";
      HiloCardImg.style.borderRadius = "5px";
      totalProfitScore.innerHTML = score;
      notyf.error("opps! game over");
      setTimeout(() => {
        afterCasoutClick();
      }, 2000);
    } else {
      totalProfitScore.innerHTML = score;
    }
  }

  function hiImgHandler() {
    cardgenBtnHandler();
    if (prevVal <= randVal) {
      console.log("high", prevVal, randVal);
      score += 1;
      scoreset();
    } else {
      console.log("game over");
      score = 0;
      scoreset();
    }
  }

  function lowImgHandler() {
    cardgenBtnHandler();
    if (prevVal >= randVal) {
      //   console.log("low", prevVal, randVal);
      score += 1;
      scoreset();
    } else {
      //   console.log("game over");
      score = 0;
      scoreset();
    }
  }
  cardskipBtn1.addEventListener("click", cardgenBtnHandler);
  cardskipBtn2.addEventListener("click", cardgenBtnHandler);
  lowImg.addEventListener("click", lowImgHandler);
  hiImg.addEventListener("click", hiImgHandler);
}

betHandelerbtn.addEventListener("click", () => {
  let value = Number(batingMoney.value);
  if (!casoutState) {
    //button will be work as bat btn
    if (value == 0) {
      notyf.error("add money first");
    } else if (value > 0 && value < 9) {
      notyf.open({
        type: "warning",
        message: "add max 10 ruppes!",
        className: "warning",
      });
    } else if (value >= 10 && value <= 5000) {
      money = Number(alloverMoney.innerHTML) - value;
      if (alloverMoney.innerHTML < value) {
        notyf.error("you hav not enough balance");
      } else {
          alloverMoney.innerHTML = money
          investVal = value;
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
    setTimeout(() => {
      afterCasoutClick();
      notyf.success("money will withdrwal");
      casoutState = false;
    }, 500);
  }
});
