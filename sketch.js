//variaveis da ball
let xBall = 300;
let yBall = 200;
let diameter = 20;
let radius = diameter/2;

//speed da ball
let speedXBall = 6;
let speedYBall = 6;

//variaveis da racket
let xRacket = 5;
let yRacket = 150;
let racketLength = 10;
let racketHeight = 90;

//variaveis do Opponent
let xRacketOpponent = 585;
let yRacketOpponent = 150;
let speedYOpponent;

let hit = false;

//placar do jogo
let myScore = 0;
let opponentScore = 0;

//sons do jogo
let racketSound;
let score;
let soundtrack;

//erro do Opponent
let mistakeChance = 0;

function preload(){
  soundtrack = loadSound("soundtrack.mp3");
  score = loadSound("score.mp3");
  racketSound = loadSound("racketSound.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0);
  showBall();
  moveBall();
  verifyBorderCollision();
  showRacket(xRacket, yRacket);
  moveMyRacket();
  //verificaColisaoracket();
  //colisaoMinharacketBiblioteca();
  showRacket(xRacketOpponent, yRacketOpponent);
  //movimentaracketOpponent();
  verifyRacketCollisionLibrary(xRacket, yRacket);
  verifyRacketCollisionLibrary(xRacketOpponent, yRacketOpponent);
  scorePanel();
  addScore();
  moveOpponentRacketPc();
  fixingStuckBall();
}

function showBall(){
  circle(xBall, yBall, diameter);
}

function moveBall(){
  xBall += speedXBall;
  yBall += speedYBall;
}

function verifyBorderCollision(){
  if (xBall + radius >= width || xBall - radius <= 0){
    speedXBall *= -1;
  }
  
  if(yBall + radius >= height || yBall - radius <= 0){
    speedYBall *= -1;
  }
}

function showRacket(x, y){
  rect(x, y, racketLength, racketHeight);
}

function moveMyRacket(){
  if (keyIsDown(UP_ARROW)){
    yRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRacket += 10;
  }
  
  //Limita a racket na tela
  yRacket = constrain(yRacket, 5, 305);
}

/*
function verificaColisaoracket(){
  if (xBall - radius < xRacket + racketLength && yBall - radius< yRacket + racketHeight && yBall + radius > yRacket){
    speedXBall *= -1;
  }
  
}
*/

function verifyRacketCollisionLibrary(x, y){
  hit = collideRectCircle(x, y, racketLength, racketHeight, xBall, yBall, radius);
  if (hit){
    speedXBall *= -1;
    racketSound.play();
  }
}

/*
function movimentaracketOpponent(){
  if (keyIsDown(87)){
    yRacketOpponent -= 10;
  }
  if (keyIsDown(83)){
    yRacketOpponent += 10;
  }
  
  //Limita a racket na tela
  yRacketOpponent = constrain(yRacketOpponent, 5, 305);
}
*/

function moveOpponentRacketPc(){
  speedYOpponent = yBall - yRacketOpponent - racketLength /2 -30;
  yRacketOpponent += speedYOpponent + mistakeChance;
  calcMistakeChance();
}

function calcMistakeChance(){
  if (opponentScore >= myScore){
    mistakeChance +=1
    if (mistakeChance >= 39){
      mistakeChance = 40;
    }
  } else {
    mistakeChance -= 1
    if (mistakeChance <= 35){
      mistakeChance = 35
    }
  }
}

function scorePanel(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myScore, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(opponentScore, 470, 26);
}

function addScore(){
  if(xBall > 590){
    myScore += 1;
    score.play();
  }
  if(xBall < 10){
    opponentScore += 1;
    score.play();
  }
}

function fixingStuckBall(){
  if (xBall - radius < 0){
    xBall = 23;
  }
}




