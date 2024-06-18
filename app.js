let user = [];
let game = [];
let btns = ["color1", "color2", "color3", "color4"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

let startBtn = document.querySelector("#start-btn");
let resetBtn = document.querySelector("#reset-btn");

startBtn.addEventListener("click", function () {
  const audio = new Audio();
  audio.src = "button_press.mp3";
  audio.play();
  setTimeout(() => {
    if (!started) {
      started = true;
      levelUp();
    }
  }, 1500);
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function levelUp() {
  user = [];
  level++;

  h2.innerText = `Level ${level}`;
  let ranIdx = Math.floor(Math.random() * 4); // Should be 4, not 3
  let randColor = btns[ranIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  game.push(randColor);
  btnFlash(randBtn);

  // Play sound when button blinks
  const audio = new Audio();
  audio.src = "button_blink.wav";
  audio.play();
}

function checkAns() {
  for (let i = 0; i < user.length; i++) {
    if (user[i] !== game[i]) {
      h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press Reset key to restart`;
      document.querySelector("body").style.backgroundColor = "red";
      setTimeout(() => {
        document.querySelector("body").style.backgroundColor = "white";
      }, 1500);
      const audio = new Audio();
      audio.src = "game_over.mp3";
      audio.play();
      return;
    }
  }

  if (user.length === game.length) {
    setTimeout(levelUp, 1000);
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  // Play sound when user clicks a button
  const audio = new Audio();
  audio.src = "button_press.mp3";
  audio.play();

  let userColor = btn.getAttribute("id");
  user.push(userColor);

  if (user.length === game.length) {
    checkAns();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let allBtns = document.querySelectorAll(".btn");
  for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
  }

  resetBtn.addEventListener("click", resetGame);
});

function resetGame() {
  started = false;
  game = [];
  user = [];
  level = 0;
  h2.innerText = "Game has been reset. Press Start to play again!";
  const audio = new Audio();
  audio.src = "button_press.mp3";
  audio.play();
}
