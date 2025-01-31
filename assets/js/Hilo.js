// let HiloCardImg = document.getElementById("HiloCardImg");
// let hiImg = document.getElementById("hiImg");
// let lowImg = document.getElementById("lowImg");
// let displayVal = document.getElementById("displayVal");
// let cardgenBtn = document.getElementById("cardgenBtn");
// let cardgenBtn2 = document.getElementById("cardgenBtn2");
// let betHandelerbtn = document.getElementById('betHandeler');
// // let state = false
// let score = 0;
// let imgURL = HiloCardImg.src;
// let prevVal = null;
// let randVal = null;

// function getRandomNumber() {
//   return Math.floor(Math.random() * (13 - 1 + 1)) + 1;
// }
// // betHandelerbtn.addEventListener('click',()=>{
// //     state = true
// // });
// // if(state){

// function scoreset() {
//   if (score === 0) {
//     hiImg.removeEventListener("click", hiImgHandler);
//     lowImg.removeEventListener("click", lowImgHandler);
//     cardgenBtn.removeEventListener("click", cardgenBtnHandler);
//     cardgenBtn2.removeEventListener("click", cardgenBtnHandler);
//     cardgenBtn.style.cursor = "not-allowed";
//     cardgenBtn2.style.cursor = "not-allowed";
//     hiImg.style.cursor = "not-allowed";
//     lowImg.style.cursor = "not-allowed";
//     HiloCardImg.style.outline = '4px solid red'
//     HiloCardImg.style.borderRadius = '5px'
//   } else {
//     displayVal.innerHTML = score;
//   }
// }
// function cardgenBtnHandler() {
//   prevVal = randVal;
//   randVal = getRandomNumber();
//   HiloCardImg.src = "../assets/images/cards/" + randVal + ".png";
// }

// function hiImgHandler() {
//   cardgenBtnHandler();
//   if (prevVal <= randVal) {
//     // console.log("high", prevVal, randVal);
//     score += 1;
//     scoreset();
//   } else {
//     // console.log("game over");
//     score = 0;
//     scoreset();
//   }
// }

// function lowImgHandler() {
//   cardgenBtnHandler();
//   if (prevVal >= randVal) {
//     //   console.log("low", prevVal, randVal);
//     score += 1;
//     scoreset();
//   } else {
//     //   console.log("game over");
//     score = 0;
//     scoreset();
//   }
// }

// cardgenBtn.addEventListener("click", cardgenBtnHandler);
// cardgenBtn2.addEventListener("click", cardgenBtnHandler);

// lowImg.addEventListener("click", lowImgHandler);
// hiImg.addEventListener("click", hiImgHandler);
// // }else{
// //     cardgenBtn.style.cursor = "not-allowed";
// //     cardgenBtn2.style.cursor = "not-allowed";
// //     hiImg.style.cursor = "not-allowed";
// //     lowImg.style.cursor = "not-allowed";
// // }
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
  betHandelerbtn.style =
    "background: linear-gradient(270deg, rgb(251, 215, 101) 0%, rgb(239, 158, 63) 100%);box-shadow: rgba(255, 187, 0, 0.5) 0px 0px 10px 0px;";
  betHandelerbtn.innerText = "Cash out";
}

halftoMoney.addEventListener("click", () => {
  let currentValue = Number(batingMoney.value); 
  if (currentValue >= 20) {  
    // if 10 or more
    batingMoney.value = currentValue / 2;
  } else {
    notyf.error("Your money cannot go below 10!");
  }
});


betHandelerbtn.addEventListener("click", () => {
  let value = Number(batingMoney.value);
  if (value == 0) {
    notyf.error("add money first");
  } else if (value > 0 && value < 9) {
    notyf.open({
      type: "warning",
      message: "add max 10 ruppes!",
      className: "warning",
    });
  } else if (value >= 10) {
    afterBattingClick();
    batingMoney.value = 0;
  }
});
