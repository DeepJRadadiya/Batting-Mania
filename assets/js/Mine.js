// const notyf = new Notyf();

// Get the relevant DOM elements
let alloverMoney = document.getElementById("moneyOfBC");
const rangeInput = document.getElementById("rangeTag");
const minSpan = document.getElementById("rangePosition");
const maxSpan = document.getElementById("rangeLimit");
const betHandeler = document.getElementById("betHandeler");
const batingMoney = document.getElementById("batingMoney");
let gameGround = document.getElementById("gameGround");
let doubletoMoney = document.getElementById("doubletoMoney");
let halftoMoney = document.getElementById("halftoMoney");
let ranger = document.getElementById("ranger");
let scoreingTab = document.getElementById("scoreingTab");
let gameBox = document.getElementsByClassName("gameBox");
let profitBord = document.getElementById("profitBord");
let profiter = document.getElementById("profiter");
let profitMoney = document.getElementById("profitMoney");
let logUserId = localStorage.getItem("loggedinUserId");
logUserId = logUserId.replace(/"/g, "").trim();

let casoutState = false;
const blurEffect = "blurDisplayEffect";
gameGround.classList.add(blurEffect);
let price = 0;
let gemCount = -1;

const gemsAudio = new Audio("../assets/audio/mine/sound_gems-e61ff752.mp3");
const mineAudio = new Audio("../assets/audio/mine/sound_mines-6f72d248.mp3");
const battingAudion = new Audio("../assets/audio/mine/bet-5c7f51b9.mp3");
const casoutAudio = new Audio("../assets/audio/mine/win-57edf57c.mp3")
gemsAudio.preload = "auto";
mineAudio.preload = "auto";
battingAudion.preload = "auto";
casoutAudio.preload = "auto";

//profit multipler
const multiplierValues = {
  0: 0.0,
  1: 1.03,
  2: 1.08,
  3: 1.13,
  4: 1.18,
  5: 1.24,
  6: 1.3,
  7: 1.38,
  8: 1.46,
  9: 1.55,
  10: 1.65,
  11: 1.77,
  12: 1.9,
  13: 2.06,
  14: 2.25,
  15: 2.48,
  16: 2.75,
  17: 3.09,
  18: 3.54,
  19: 4.13,
  20: 4.95,
  21: 6.19,
  22: 8.25,
  23: 12.38,
  24: 24.72,
};

// Update the span values dynamically
rangeInput.addEventListener("input", () => {
  minSpan.textContent = rangeInput.value;
  minSpan.style.color = "white";
  maxSpan.textContent = rangeInput.max;
});

function afterBattingClick() {
  battingAudion.play();
  casoutState = true;
  gameGround.classList.add(blurEffect);
  gameGround.classList.remove(blurEffect);
  scoreingTab.classList.add(blurEffect);
  batingMoney.disabled = true;
  batingMoney.style.userSelect = "none";
  halftoMoney.disabled = true;
  halftoMoney.style.cursor = "context-menu";
  doubletoMoney.disabled = true;
  doubletoMoney.style.cursor = "context-menu";
  betHandeler.classList.add("signoutbtn");
  betHandeler.innerText = "Cash out";
  rangeInput.disabled = true;
  ranger.classList.add(blurEffect);
  profitBord.style.display = "block";
}

function afterCasoutClick() {
  betHandeler.disabled = 'true'
  casoutState = false;
  gameGround.classList.add(blurEffect);
  ranger.classList.remove(blurEffect);
  scoreingTab.classList.remove(blurEffect);
  batingMoney.disabled = false;
  batingMoney.style.userSelect = " ";
  halftoMoney.disabled = false;
  halftoMoney.style.cursor = "pointer";
  doubletoMoney.disabled = false;
  doubletoMoney.style.cursor = "pointer";
  betHandeler.classList.remove("signoutbtn");
  betHandeler.innerText = "Bat";
  rangeInput.disabled = false;
  ranger.classList.remove(blurEffect);
  profitBord.style.display = "none";
  if (Number(price) != 0) {
    casoutAudio.play();
    alloverMoney.value =  (Number(alloverMoney.value) + Number(price) + Number(batingMoney.value)).toFixed(2);
    setTimeout(() => {
      updateMoneyInDatabase(logUserId, Number(alloverMoney.value));
    }, 2000);
    betHandeler.disabled = 'false'
  } else {
    alloverMoney.value = Number(alloverMoney.value)
  }
  setTimeout(() => {
    updateMoneyInDatabase(logUserId, Number(alloverMoney.value));
    betHandeler.disabled = 'false'
  }, 1800);
}

// random number logic
function generateUniqueRandomNumbers(n) {
  const min = 0;
  const max = 24; // Assuming there are 25 boxes (indexes 0-24)
  if (n > max - min + 1) {
    throw new Error(
      "Cannot generate more unique numbers than the range allows"
    );
  }
  const numbers = new Set();
  while (numbers.size < n) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }
  return Array.from(numbers);
}


//logic for profiter
function profitCounter(n, initialValue, remainGems) {
  function factorial(num) {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
      result *= i;
    }
    return result;
  }
  if (n < -1 || n > 23) {
    return "Invalid input. Please enter a number between 1 and 23.";
  }

  let result =
    initialValue *
    (factorial(24) / factorial(24 - n)) *
    (factorial(remainGems - n) / factorial(remainGems));

  return result.toFixed(2);
}

// game handler
function gameHandlingFun() {
  const boxes = document.querySelectorAll(".gameBox");
  const bombCount = Number(minSpan.innerHTML);
  const defValue = multiplierValues[bombCount];
  const remainGems = 24 - bombCount;
  console.log(defValue, remainGems);
  const bombIndexes = new Set(generateUniqueRandomNumbers(bombCount));
  let gameOver = false;
  let bombid = 0;
  

  // function to reveal all boxes
  function revealAllBoxes() {
    boxes.forEach((box, index) => {
      if (bombIndexes.has(index)) {
        box.classList.add("findbom");
        let bomb = box.id.split("Box");
        if (bomb[1] == bombid + 1) {
          box.classList.remove("findbom");
          // setTimeout(()=>{
          //     location.reload()
          // },3000)
        }

        box.classList.add("mineimg");
        box.classList.add("bomb");
      } else {
        box.classList.add("findbom");
        box.classList.add("gemsimg");
        box.classList.add("gem");
      }
      box.classList.add("clicked");
    });
  }

  // Attach event listeners to boxes
  boxes.forEach((box, index) => {
    const isBomb = bombIndexes.has(index);

    box.addEventListener("click", () => {
      if (gameOver || box.classList.contains("clicked")) return;

      box.classList.add("clicked");
      if (isBomb) {
        mineAudio.play();
        price = 0;
        bombid = index;
        // console.log(isBomb)
        box.classList.add("mineimg");
        box.classList.add("bomb");
        gameOver = true;
        notyf.error("you clicked on bomb");
        revealAllBoxes();
        afterCasoutClick();
      } else {
        gemsAudio.play();
        gemCount += 1;
        profiter.innerText = profitCounter(gemCount, defValue, remainGems);
        price = (
          Number(profiter.innerText) * Number(batingMoney.value) -
          Number(batingMoney.value)
        ).toFixed(2);
        profitMoney.innerText = price;
        box.classList.add("animations", "gemsimg", "gem");
      }
    });
  });
}

//on button click
betHandeler.addEventListener("click", () => {
  let values = Number(batingMoney.value);
  if (!casoutState) {
    if (values == 0) {
      notyf.error("add money first");
    } else if (values > 1 && values <= 5000000) {
      money = Number(alloverMoney.value) - values;
      console.log(alloverMoney.value, money, values);
      if (Number(alloverMoney.value) < values) {
        notyf.error("you hav not enough balance");
      } else {
        alloverMoney.value = money.toFixed(2);
        afterBattingClick();
        gameHandlingFun();
      }
    } else {
      notyf.error("money out of range");
      casoutState = true;
    }
  } else {
    //button will be work as casout
    if(gemCount > -1){
      notyf.success("money will withdrwal");
      afterCasoutClick();
    }
    else{
      notyf.error("you need to select one box first")
    }
    
  }
});