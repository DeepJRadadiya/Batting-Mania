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
let casoutState = false;
const blurEffect = "blurDisplayEffect";
gameGround.classList.add(blurEffect)


// Update the span values dynamically
rangeInput.addEventListener("input", () => {
  minSpan.textContent = rangeInput.value;
  minSpan.style.color = "white";
  maxSpan.textContent = rangeInput.max;
});

function afterBattingClick() {
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
}

function afterCasoutClick() {
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

// game handler
function gameHandlingFun() {
  const boxes = document.querySelectorAll(".gameBox");
  const bombCount = Number(minSpan.innerHTML);
  console.log(bombCount);
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
          bombid = index;
          // console.log(isBomb)
          box.classList.add("mineimg");
          box.classList.add("bomb");
          gameOver = true;
          notyf.error("you clicked on bomb");
          revealAllBoxes();
        } else {
          console.log(box)
          box.classList.add("gemsimg","gem")
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
    } else if (values > 0 && values <= 5000) {
      money = Number(alloverMoney.value) - values;
      console.log(alloverMoney.value, money, values);
      if (Number(alloverMoney.value) < values) {
        notyf.error("you hav not enough balance");
      } else {
        const bombCount = Number(minSpan.innerHTML);
        if (bombCount <= 0) {
          notyf.error("select bomb range");
        } else {
          alloverMoney.value = money;
          afterBattingClick();
          gameHandlingFun();
        }
      }
    } else {
      notyf.error("money out of range");
      casoutState = true;
    }
  } else {
    //button will be work as casout
    notyf.success("money will withdrwal");
    afterCasoutClick();
  }
});
