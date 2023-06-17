//Score
let userScore = 0;
let pcScore = 0;

// STATE MANAGEMENT
window.onload = function () {
  userScore = Number(sessionStorage.getItem("userScore"));
  pcScore = Number(sessionStorage.getItem("pcScore"));
  updateScore();
};

// References
let userWin = false;
let pcWin = false;
let tie = false;

// Constant
const rock = "Rock";
const paper = "Paper";
const scissor = "Scissors";

// Variables
let userSelected = "";
let pcSelected = "";
var userImage = "";
var pcImage = "";

//Score
const userScore_Ref = document.getElementById("user-score-id");
const pcScore_Ref = document.getElementById("pc-score-id");
const scoreContainer_Ref = document.getElementById("score-container-id");

// Triangle
const userContainer_Ref = document.getElementById("userContainer-id"); // for triangle

// You pick pc pick
const youPickPcPick_Ref = document.getElementById(
  "selectionDisplayContainer-id"
);

const deiciderContainer = document.getElementById("DeciderContainer-id");

// Rules Box
const rulesBox_Ref = document.getElementById("rulesBox-id");
const crossButton_Ref = document.getElementById("cross-id");
const rulesButton_Ref = document.getElementById("rulesButton");
const nextButton_Ref = document.getElementById("nextButton");

// Rules button and Next Button togather
const combinedButton_Ref = document.getElementById("AllButtons");

// Individual Elements
const youWin_Ref = document.getElementById("you-win");
const pcWin_Ref = document.getElementById("pc-win");
const tie_Ref = document.getElementById("tie");
const playAgainButton_Ref = document.getElementById("playAgainButton");

const rockButton_Ref = document.getElementById("rock");
const paperButton_Ref = document.getElementById("paper");
const scissorButton_Ref = document.getElementById("scissor");

const victorius_Ref = document.getElementById("vic-id");
const playAgainVictory_Ref = document.getElementById("playAgainButton-2");

victorius_Ref.style.display = "none";

// INITIALISATION
deiciderContainer.style.display = "none";
youWin_Ref.style.display = "none";
pcWin_Ref.style.display = "none";
tie_Ref.style.display = "none";
playAgainButton_Ref.style.display = "none";
youPickPcPick_Ref.style.display = "none";

if (userScore > pcScore) {
  nextButton_Ref.style.display = "block";
} else {
  nextButton_Ref.style.display = "none";
}

// CLICK EVENT LISTNERS
rockButton_Ref.addEventListener("click", (e) => {
  // console.log("Rock Clicked");
  HandleUserChoiceButton(0);
});

paperButton_Ref.addEventListener("click", (e) => {
  console.log("Paper Clicked");
  HandleUserChoiceButton(1);
});

scissorButton_Ref.addEventListener("click", (e) => {
  // console.log("scissor Clicked");
  HandleUserChoiceButton(2);
});

crossButton_Ref.addEventListener("click", (e) => {
  closeRulesBox();
});

rulesButton_Ref.addEventListener("click", (e) => {
  openRulesBox();
});

playAgainButton_Ref.addEventListener("click", (e) => {
  HandlePlayAgain();
});

playAgainVictory_Ref.addEventListener("click", (e) => {
  HandlePlayAgain2();
});
nextButton_Ref.addEventListener("click", (e) => {
  HandleNextButton();
});
// CLICK EVENT LISTNERS

function randomGenerator() {
  const choice = [rock, paper, scissor];
  return choice[Math.floor(Math.random() * choice.length)];
}

function DisableCss() {
  // Disappear the triangle
  userContainer_Ref.style.display = "none";
}

function closeRulesBox() {
  rulesBox_Ref.style.display = "none";
}

function openRulesBox() {
  rulesBox_Ref.style.display = "inline-block";
}
/*




*/
function updateScore() {
  userScore_Ref.innerHTML = userScore;
  pcScore_Ref.innerHTML = pcScore;
}
function InstantiateImage(whoHasSelectedWhat, whoHasPassed) {
  let Source = `./Assets//Png2/${whoHasSelectedWhat}.png`;
  let el = document.createElement("IMG");

  // Styling
  el.className = "img-dimension";
  if (whoHasSelectedWhat == rock) {
    el.id = "rock";
  } else if (whoHasSelectedWhat == paper) {
    el.id = "paper";
  } else if (whoHasSelectedWhat == scissor) {
    el.id = "scissor";
  }

  el.setAttribute("src", Source);
  el.style.position = "absolute";

  if (whoHasPassed == "user") {
    // Fix the dimension
    console.log("user sent");
    el.style.top = "40%";
    el.style.left = "23%";
  } else if (whoHasPassed == "pc") {
    console.log("pc sent");
    el.style.top = "40%";
    el.style.left = "58%";
  }

  return el;
}
function WhatBeatsWhat(userSelected, pcSelected) {
  // user won cases
  if (
    (userSelected == rock && pcSelected == scissor) ||
    (userSelected == paper && pcSelected == rock) ||
    (userSelected == scissor && pcSelected == paper)
  ) {
    userWin = true;
    userImage.style.boxShadow =
      "0px 0px 10px #063b00, 0px 0px 20px #0a5d00, 0px 0px 30px #089000, 0px 0px 40px #1fc600, 0px 0px 50px #0eff00 ";
    userScore += 5;
  } else if (userSelected == pcSelected) {
    tie = true;
  } else {
    pcWin = true;
    pcImage.style.boxShadow =
      "0px 0px 10px #063b00, 0px 0px 20px #0a5d00, 0px 0px 30px #089000, 0px 0px 40px #1fc600, 0px 0px 50px #0eff00  ";
    pcScore += 5;
  }
  sessionStorage.setItem("userScore", userScore);
  sessionStorage.setItem("pcScore", pcScore);
  updateScore();
  if (userScore > pcScore) {
    nextButton_Ref.style.display = "block";
  } else {
    nextButton_Ref.style.display = "none";
  }
  return;
}

function WhoWon() {
  deiciderContainer.style.display = "inline-block";

  if (userWin) {
    youWin_Ref.style.display = "block";
    userWin = false;
  } else if (pcWin) {
    pcWin_Ref.style.display = "block";
    pcWin = false;
  } else {
    tie_Ref.style.display = "block";
  }

  playAgainButton_Ref.style.display = "block";
}
function HandleUserChoiceButton(param) {
  if (param == 0) {
    userSelected = rock;
  } else if (param == 1) {
    userSelected = paper;
  } else if (param == 2) {
    userSelected = scissor;
  }

  youPickPcPick_Ref.style.display = "inline-block";
  pcSelected = randomGenerator();
  // Creating Source
  userImage = InstantiateImage(userSelected, "user");
  pcImage = InstantiateImage(pcSelected, "pc");

  document.body.appendChild(userImage);
  document.body.appendChild(pcImage);
  console.log("User Selected : ", userSelected);
  console.log("Pc Selected : ", pcSelected);
  // Disable all the Css
  DisableCss();
  WhatBeatsWhat(userSelected, pcSelected);
  WhoWon();
}

function HandlePlayAgain() {
  // Activate the triangle
  userContainer_Ref.style.display = "flex";
  userImage.style.display = "none";
  pcImage.style.display = "none";
  youPickPcPick_Ref.style.display = "none";

  tie_Ref.style.display = "none";
  youWin_Ref.style.display = "none";
  pcWin_Ref.style.display = "none";
  playAgainButton_Ref.style.display = "none";
  deiciderContainer.style.display = "none";

  // Hide Everything else
}

function HandlePlayAgain2() {
  // Activate the triangle
  userContainer_Ref.style.display = "inline-block";
  scoreContainer_Ref.style.display = "block";
  victorius_Ref.style.display = "none";
  openRulesBox();
  combinedButton_Ref.style.display = "inline-block";

  // Hide Everything else
}
function HandleNextButton() {
  scoreContainer_Ref.style.display = "none";
  userContainer_Ref.style.display = "none";
  userImage.style.display = "none";
  pcImage.style.display = "none";
  youPickPcPick_Ref.style.display = "none";
  tie_Ref.style.display = "none";
  youWin_Ref.style.display = "none";
  pcWin_Ref.style.display = "none";
  playAgainButton_Ref.style.display = "none";
  deiciderContainer.style.display = "none";
  closeRulesBox();
  combinedButton_Ref.style.display = "none";

  victorius_Ref.style.display = "inline-block";
  // Display Victory
}
