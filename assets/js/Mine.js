// const notyf = new Notyf();

// Get the relevant DOM elements
const rangeInput = document.getElementById("rangeTag");
const minSpan = document.getElementById("rangePosition");
const maxSpan = document.getElementById("rangeLimit");
const betHandeler = document.getElementById("betHandeler");
// Update the span values dynamically
rangeInput.addEventListener("input", () => {
  minSpan.textContent = rangeInput.value;
  minSpan.style.color = "white";
  maxSpan.textContent = rangeInput.max;
});

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

//on button click
betHandeler.addEventListener("click", () => {

  // game setup
  const boxes = document.querySelectorAll(".gameBox");
  const bombCount = Number(minSpan.innerHTML);
  console.log(bombCount);
  const bombIndexes = new Set(generateUniqueRandomNumbers(bombCount));
  let gameOver = false;
  let bombid = 0

  if(bombCount >= 1){
  // function to reveal all boxes
  function revealAllBoxes() {
    boxes.forEach((box, index) => {
      if (bombIndexes.has(index)) {
        box.classList.add('findbom')
        let bomb = box.id.split('Box')
        if(bomb[1] == (bombid+1)){
            box.classList.remove('findbom')
            setTimeout(()=>{
                location.reload()
            },3000)
        }
        box.classList.add("mineimg");
        box.classList.add("bomb");
      } else {
        box.classList.add('findbom')
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
        bombid = index
        // console.log(isBomb)
        box.classList.add("mineimg");
        box.classList.add("bomb");
        gameOver = true;
        notyf.error('you clicked on bomb')
        revealAllBoxes();
      } else {
        box.classList.add("gemsimg");
        box.classList.add("gem");
      }
    });
  });}
  else{
    notyf.error('first selcet number of bomb')
  }
});
