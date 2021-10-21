const dirt = document.querySelectorAll(".dirt");
const rat = document.querySelectorAll(".rat");
const scoreboard = document.querySelector(".scoreboard");
const pop = document.querySelector("#pop");

let PREVDIRT;
let FINISH;
let SCORE;

function selectRandomDirt(dirt) {
  const temp = Math.floor(Math.random() * dirt.length);
  const dRandom = dirt[temp];
  if (dRandom == PREVDIRT) {
    selectRandomDirt(dirt);
  }
  PREVDIRT = dRandom;
  return dRandom;
}

function setRandomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setRatToAppear() {
  const dRandom = selectRandomDirt(dirt);
  const time = setRandomTime(300, 1000);
  dRandom.classList.add("appear");
  setTimeout(() => {
    dRandom.classList.remove("appear");
    if (!FINISH) {
      setRatToAppear();
    }
  }, time);
}

function play() {
  FINISH = false;
  SCORE = 0;
  scoreboard.textContent = SCORE;
  setRatToAppear();
  var timeleft = 59;
  var downloadTimer = setInterval(function () {
    if (timeleft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("countdown").innerHTML = 0;
    } else {
      document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft--;
  }, 1000);
  setTimeout(() => {
    FINISH = true;
  }, 60000);
}

function smashTheRat() {
  SCORE++;
  this.parentNode.classList.remove("appear");
  pop.play();
  scoreboard.textContent = SCORE;
}

rat.forEach((temp) => {
  temp.addEventListener("click", smashTheRat);
});
