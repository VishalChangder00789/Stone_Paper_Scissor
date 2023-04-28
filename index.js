let userImage = "";
let pcImage = "";
// More references
var yourChoice;
var pcChoice;
// CONSTANT VALUES
const rock = "rock";
const paper = "paper";
const scissor = "scissor";
// IMAGE SOURCES
const rockImageSrc = "./Assets//Png/Rock.png";
const paperImageSrc = "./Assets//Png/Paper.png";
const ScissorImageSrc = "./Assets//Png/Scissors.png";
// SCORE
let userScore = 0;
let pcScore = 0;
// SELECTION
let userSelected = "";
let pcSelected = "";

//references
let rockRef = document.getElementById("rock");
let paperRef = document.getElementById("paper");
let scissorRef = document.getElementById("scissor");
let textRef = document.getElementById("text");
let playAgainButton = document.getElementById("playAgainButton");
let youWinRef = document.getElementById("you-win");
let pcWinRef = document.getElementById("pc-win");
let tieRef = document.getElementById("tie");
let crossButtonRef = document.getElementById("cross");
let rulesBoxRef = document.getElementById("rules-box");
let rulesButtonRef = document.getElementById("rulesButton");
let userScoreRef = document.getElementById("user-score");
let compScoreRef = document.getElementById("comp-score");
let nextButtonRef = document.getElementById("nextButton");
let victoriusRef = document.getElementById("vic-id");
let scoreContainerRef = document.getElementById("score-container-id");
let userContainerRef = document.getElementById("userContainer-id");

// INITIALIZATION

victoriusRef.style.display = "none";
youWinRef.style.display = "none";
pcWinRef.style.display = "none";
tieRef.style.display = "none";
playAgainButton.style.display = "none";

// CLICK EVENT LISTNERS

nextButtonRef.addEventListener("click", (e) => {
  console.log("Next Button Clicked");
  nextButtonController();
});

rulesButtonRef.addEventListener("click", (e) => {
  openRulesBox();
});

crossButtonRef.addEventListener("click", (e) => {
  closeRulesBox(e);
});

rockRef.addEventListener("click", (e) => {
  handleOptionClick(e, 0);
});

paperRef.addEventListener("click", (e) => {
  handleOptionClick(e, 1);
});

scissorRef.addEventListener("click", (e) => {
  handleOptionClick(e, 2);
});

playAgainButton.addEventListener("click", (e) => {
  playAgain(e);
});

// HANDLES CLICK ON ANY OF THE THREE OPTIONS

function handleOptionClick(e, valuePassed) {
  if (valuePassed === 0) {
    disableCss();
    userImage = instantiatePng(
      rockImageSrc,
      100,
      100,
      "absolute",
      "35%",
      "45%",
      rock
    );
    userSelected = rock;
    pcSelected = generateRandom();
    pcImage = instantiator(pcSelected);
  } else if (valuePassed === 1) {
    userSelected = paper;
    disableCss();
    userImage = instantiatePng(
      paperImageSrc,
      100,
      100,
      "absolute",
      "35%",
      "45%",
      paper
    );

    pcSelected = generateRandom();
    pcImage = instantiator(pcSelected);
  } else if (valuePassed == 2) {
    userSelected = scissor;
    disableCss();
    userImage = instantiatePng(
      ScissorImageSrc,
      100,
      100,
      "absolute",
      "35%",
      "45%",
      scissor
    );
    pcSelected = generateRandom();
    pcImage = instantiator(pcSelected);
  }
  showBanner();
  document.body.appendChild(userImage);
  document.body.appendChild(pcImage);
  playAgainButton.style.display = "inline-block";
  whoWon(userSelected, pcSelected);
}

// Return an image Instantiate an Image on the Go
function instantiatePng(src, width, height, position, left, top, options) {
  let x = document.createElement("IMG");

  if (options == rock) {
    x.style.boxShadow = "0 0 0px 10px rgb(0, 21, 255)";
  } else if (options == paper) {
    x.style.boxShadow = "0 0 0px 10px rgb(255, 128, 0)";
  } else if (options == scissor) {
    x.style.boxShadow = "0 0 0px 10px rgb(166, 0, 255)";
  }

  // Attributes
  x.setAttribute("src", `${src}`);
  x.setAttribute("width", `${width}`);
  x.setAttribute("height", `${height}`);

  //Styling
  x.style.position = `${position}`;
  x.style.left = `${left}`;
  x.style.top = `${top}`;

  x.className = "image-beauty";

  // Sending
  return x;
  // document.body.appendChild(x);
}

// Generate Random Choice for Computer
function generateRandom() {
  const options = ["rock", "paper", "scissor"];
  return options[Math.floor(Math.random() * options.length)];
}

// Custom Choice for computer
function instantiator(pcSelected) {
  if (pcSelected == "rock") {
    return instantiatePng(
      rockImageSrc,
      100,
      100,
      "absolute",
      "55%",
      "45%",
      rock
    );
  } else if (pcSelected == "paper") {
    return instantiatePng(
      paperImageSrc,
      100,
      100,
      "absolute",
      "55%",
      "45%",
      paper
    );
  } else if (pcSelected == "scissor") {
    return instantiatePng(
      ScissorImageSrc,
      100,
      100,
      "absolute",
      "55%",
      "45%",
      scissor
    );
  }
}

// Disable the required CSS
function disableCss() {
  document.getElementById("userContainer-id").style.display = "none";
}

function showBanner() {
  yourChoice = document.createElement("div");
  pcChoice = document.createElement("div");
  yourChoice.innerHTML = "Your Choice";
  pcChoice.innerHTML = "Pc Choice";

  // STYLING
  yourChoice.style.display = "inline";
  yourChoice.style.position = "absolute";
  yourChoice.style.top = "38%";
  yourChoice.style.left = "33%";

  pcChoice.style.display = "inline";
  pcChoice.style.position = "absolute";
  pcChoice.style.top = "38%";
  pcChoice.style.left = "55%";

  yourChoice.classList.add("text");
  pcChoice.classList.add("text");

  document.body.appendChild(yourChoice);
  document.body.appendChild(pcChoice);
}

function playAgain() {
  userImage.style.display = "none";
  pcImage.style.display = "none";

  document.getElementById("userContainer-id").style.display = "block";
  yourChoice.style.display = "none";
  pcChoice.style.display = "none";
  playAgainButton.style.display = "none";

  youWinRef.style.display = "none";
  pcWinRef.style.display = "none";
  tieRef.style.display = "none";
}

function whoWon(userSelected, pcSelected) {
  if (userSelected == rock && pcSelected == paper) {
    // PC WON
    pcWinRef.style.display = "block";

    // Add Ripple
    pcImage.classList.add("winRipple");

    pcScore += 5;
  } else if (userSelected == rock && pcSelected == scissor) {
    // USER WON
    userImage.classList.add("winRipple");
    youWinRef.style.display = "block";
    userScore += 5;
  } else if (userSelected == scissor && pcSelected == paper) {
    //USER WON
    userScore += 5;
    userImage.classList.add("winRipple");

    youWinRef.style.display = "block";
  } else if (userSelected == scissor && pcSelected == rock) {
    //PC WON
    pcScore += 5;
    pcImage.classList.add("winRipple");

    pcWinRef.style.display = "block";
  } else if (userSelected == paper && pcSelected == scissor) {
    // PC WON
    pcScore += 5;
    pcImage.classList.add("winRipple");
    pcWinRef.style.display = "block";
  } else if (userSelected == paper && pcSelected == rock) {
    // USER WON
    userScore += 5;
    userImage.classList.add("winRipple");
    youWinRef.style.display = "block";
  } else if (userSelected == pcSelected) {
    //TIE
    tieRef.style.display = "block";
  }

  userScoreRef.innerHTML = userScore;
  compScoreRef.innerHTML = pcScore;
}

function closeRulesBox() {
  rulesBoxRef.style.display = "none";
}

function openRulesBox() {
  rulesBoxRef.style.display = "inline-block";
}

function nextButtonController() {
  if (userScore > pcScore) {
    victoriusRef.style.display = "block";

    // Hide Everthing
    scoreContainerRef.style.display = "none";
    userContainerRef.style.display = "none";

    yourChoice.style.display = "none";
    pcChoice.style.display = "none";
    youWinRef.style.display = "none";
    playAgainButton.style.display = "none";

    userImage.style.display = "none";
    pcImage.style.display = "none";

    rulesBoxRef.style.display = "none";
    rulesButtonRef.style.display = "none";
    nextButtonRef.style.display = "none";
  }
}
