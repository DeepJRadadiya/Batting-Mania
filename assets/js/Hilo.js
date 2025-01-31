let HiloCardImg = document.getElementById("HiloCardImg");
let hiImg = document.getElementById("hiImg");
let lowImg = document.getElementById("lowImg");
let displayVal = document.getElementById("displayVal");
let cardgenBtn = document.getElementById("cardgenBtn");
let cardgenBtn2 = document.getElementById("cardgenBtn2");
let betHandelerbtn = document.getElementById('betHandeler');
// let state = false
let score = 0;
let imgURL = HiloCardImg.src;
let prevVal = null;
let randVal = null;



function getRandomNumber() {
  return Math.floor(Math.random() * (13 - 1 + 1)) + 1;
}
// betHandelerbtn.addEventListener('click',()=>{
//     state = true
// });
// if(state){

function scoreset() {
  if (score === 0) {
    hiImg.removeEventListener("click", hiImgHandler);
    lowImg.removeEventListener("click", lowImgHandler);
    cardgenBtn.removeEventListener("click", cardgenBtnHandler);
    cardgenBtn2.removeEventListener("click", cardgenBtnHandler);
    cardgenBtn.style.cursor = "not-allowed";
    cardgenBtn2.style.cursor = "not-allowed";
    hiImg.style.cursor = "not-allowed";
    lowImg.style.cursor = "not-allowed";
    HiloCardImg.style.outline = '4px solid red'
    HiloCardImg.style.borderRadius = '5px'
  } else {
    displayVal.innerHTML = score;
  }
}
function cardgenBtnHandler() {
  prevVal = randVal;
  randVal = getRandomNumber();
  HiloCardImg.src = "../assets/images/cards/" + randVal + ".png";
}

function hiImgHandler() {
  cardgenBtnHandler();
  if (prevVal <= randVal) {
    // console.log("high", prevVal, randVal);
    score += 1;
    scoreset();
  } else {
    // console.log("game over");
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

cardgenBtn.addEventListener("click", cardgenBtnHandler);
cardgenBtn2.addEventListener("click", cardgenBtnHandler);

lowImg.addEventListener("click", lowImgHandler);
hiImg.addEventListener("click", hiImgHandler);
// }else{
//     cardgenBtn.style.cursor = "not-allowed";
//     cardgenBtn2.style.cursor = "not-allowed";
//     hiImg.style.cursor = "not-allowed";
//     lowImg.style.cursor = "not-allowed";
// }