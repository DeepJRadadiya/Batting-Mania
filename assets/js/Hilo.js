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
let logUserId = localStorage.getItem("loggedinUserId");
logUserId = logUserId.replace(/"/g, '').trim();
let investVal = 0;
let casoutState = false;
let prevVal = null;
let randVal = null;
let score = 0;

// all audio files
const cardgenAudio = new Audio("../assets/audio/bet-4388e4b9.mp3");
const casoutAudio = new Audio('../assets/audio/cashout-19360f23.mp3')
const winAudio = new Audio("../assets/audio/win-88e8723b.mp3") 
const lossAudio = new Audio('../assets/audio/deal-4c5ef928.mp3')
const skipAudio = new Audio('../assets/audio/skip-639cbd65.mp3')
cardgenAudio.preload = "auto";
casoutAudio.preload = 'auto';
winAudio.preload = 'auto';
lossAudio.preload = 'auto';
skipAudio.preload = 'auto';

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
  if (!(score === 0)) {
    alloverMoney.value = Number(alloverMoney.value) + score + investVal;
      casoutAudio.play()
    setTimeout(() => {
      updateMoneyInDatabase(logUserId, Number(alloverMoney.value));
    }, 5000);
  }

  totalProfitScore.innerHTML = 0;
  setTimeout(() => {
  updateMoneyInDatabase(logUserId, Number(alloverMoney.value));
  }, 4000);
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


// randome nuber genrate
function getRandomNumber() {
  return Math.floor(Math.random() * (13 - 1 + 1)) + 1;
}

//skip card gen
function cardgenBtnHandlers() {
  prevVal = randVal;
  randVal = getRandomNumber();
  skipAudio.play()
  setTimeout(() => {
    cardgenAudio.play()
  }, 300);
  HiloCardImg.src = "../assets/images/cards/" + randVal + ".png";
}

//all card gen
function cardgenBtnHandler() {
  prevVal = randVal;
  randVal = getRandomNumber();
  cardgenAudio.play()
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
      totalProfitScore.innerHTML = score;
      notyf.error("opps! game over");
      setTimeout(() => {
        afterCasoutClick();
      }, 2000);
    } else {
      totalProfitScore.innerHTML = score;
      
    }
  }

  //hi button click
  function hiImgHandler() {
    cardgenBtnHandler();
    if (prevVal <= randVal) {
      console.log("high", prevVal, randVal);
      score += 1;
      scoreset();
      cardgenAudio.pause()
      winAudio.play()

    } else {
      console.log("game over");
      score = 0;
      cardgenAudio.pause()
      lossAudio.play()
      scoreset();
    }
  }

  //low button click
  function lowImgHandler() {
    cardgenBtnHandler();
    if (prevVal >= randVal) {
        console.log("low", prevVal, randVal);
      score += 1;
      cardgenAudio.pause()
      winAudio.play()
      scoreset();
    } else {
        console.log("game over");
      score = 0;
      cardgenAudio.pause()
      lossAudio.play()
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
      money = Number(alloverMoney.value) - value;
      if (alloverMoney.valueL < value) {
        notyf.error("you hav not enough balance");
      } else {
          alloverMoney.value = money
          // moneyChanged(alloverMoney.value)
          // updateMoneyInDatabase(logUserId, alloverMoney.value);
          
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

// update money on databse when chnage the score
async function updateMoneyInDatabase(id, moneyChangedValue) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PATCH",  // Use PATCH for partial update
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ money: moneyChangedValue }),  // Send updated money
    });

    if (!response.ok) {
      throw new Error("Failed to update money in the database.");
    }

    const updatedUser = await response.json();
    console.log("Money updated successfully:", updatedUser);

    // Optionally, you can update the UI here after the successful update
    // For example, update the displayed money in the UI
    let alloverMoney = document.getElementById("moneyOfBC");
    alloverMoney.value = updatedUser.money;

  } catch (error) {
    console.error("Error updating money:", error);
  }
}






