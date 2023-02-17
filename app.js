// Global Variables
var canvas;
var canvasContext;
// For The Ball
var ballX = 50; //This Gives The Space At The Left Handside For The Ball(Horizontal).
var ballSpeedX = 10;
var ballY = 50; //This Is For The Vertical Movement.
var ballSpeedY = 4;
//Scoreboard
var player1Score = 0;//Left Handside Player Human.
var player2Score = 0;//Right Handside Player Automatic.
const winningScore = 10;//Maximum Score For Contest.
var winScreen = false;//Stops The Game When It Turns True.
//For The Paddle
var paddle1Y = 250; //Vertical Position(Left Paddle).
var paddle2Y = 250; //Right Paddle.
const paddleHeight = 100; //For All The Paddles.
const paddleThickness = 10; //For All The Paddles(Thickness Or Width).


//Function For The Mouse Movement.
let mousePosition = (evt) => {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

//Restarting Function.
let handleMouseClick = (evt) =>{
  if(winScreen){
    player1Score = 0;
    player2Score = 0;
    winScreen = false;
  }
}

//Window OnLoad Function
window.onload = () => {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");

  // Movement Of The Ball And Recalling Of The Functions Each Time.
  var framesPerSecond = 30;
  setInterval(() => {
    ourMovement();
    allDrawing();
  }, 1000 / framesPerSecond);
  //Restarting Click
  canvas.addEventListener("mousedown", handleMouseClick);

  //For The Mouse Movement.
  canvas.addEventListener("mousemove", (evt) => {
    var mousePos = mousePosition(evt);
    paddle1Y = mousePos.y - (paddleHeight / 2);
  });
}

//Ball Resetting
let ballReset = () => {
  if(player1Score >= winningScore || player2Score >= winningScore){
    winScreen = true;
  }
  ballSpeedX = -ballSpeedX
  ballX = canvas.width / 2; //Will Get Us The Horizontal
  ballY = canvas.height / 2; //Will Get Us The Vertical
}

//Automatic Movement Of Paddle For The Right Handside
let computerMovement = () => {
  var paddle2YCenter = paddle2Y + (paddleHeight/2)
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 6;
  } else if(paddle2YCenter > ballY + 35){
    paddle2Y -= 6;
  }
}

//Our Movement Function
let ourMovement = () => {
  if(winScreen){
    return;
  }
  computerMovement();
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX; //For The Left Handside Bouncing Back.
      var deltaY = ballY - (paddle1Y + paddleHeight/2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player2Score++;//Score Needs To Update Before Reset.
      ballReset();
    }

  }
  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX; //For The Right Handside Bouncing Back.
      var deltaY = ballY - (paddle2Y + paddleHeight/2);
      ballSpeedY = deltaY * 0.35;
    } else {
      player1Score++;//Score Needs To Update Before Reset.
      ballReset();
    }
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY; //For The Top Bouncing Back.
  }
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY; //For The Down Bouncing Back.
  }
}

let drawMiddleLine = () =>{
  for(var i = 0; i<canvas.height; i+=40){
    colourRect(canvas.width/2 - 1, i, 2, 20, "white")
  }
}
//Our Drawing Function
let allDrawing = () => {
  //The Background Drawing and Shapping Of The Game
  colourRect(0, 0, canvas.width, canvas.height, "#4C3A34");
  if(winScreen){
    if(player1Score >= winningScore) {
      canvasContext.fillStyle = "white";
      canvasContext.font = "100 15px Proxima-nova";
      canvasContext.fillText("Player One Wins!!!🏆", canvas.width/2, 200);
    }else if (player2Score >= winningScore){
      canvasContext.fillStyle = "white";
      canvasContext.font = "100 15px Proxima-nova";
      canvasContext.fillText("Computer Wins!!!🏆", canvas.width/2, 200);
    }
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Click To Play Again", canvas.width/2, canvas.height/2);
    canvasContext.fillStyle = "red";
    canvasContext.fillText("Created By ZedPriest", canvas.width - 200, canvas.height - 100);
    return;
  }
  drawMiddleLine();
  //The Left Player Paddle
  colourRect(0, paddle1Y, paddleThickness, paddleHeight, "white");
  //The Right Player Paddle
  colourRect(canvas.width - paddleThickness, paddle2Y, paddleThickness, paddleHeight, "white");
  //The Ball
  circle(ballX, ballY, 10, "white")
  //Scoreboard
  canvasContext.font = "100 15px Proxima-nova";
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

//Creating The Object Function For The Drawing Of The Ball (Circle).
let circle = (centreX, centreY, radius, drawColour) => {
  canvasContext.fillStyle = drawColour;
  canvasContext.beginPath();
  canvasContext.arc(centreX, centreY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

// Creating The Object Function For The Drawing Of The Game Requirements Except The Circle(Ball).
let colourRect = (leftX, topY, width, height, drawColour) => {
  canvasContext.fillStyle = drawColour;
  canvasContext.fillRect(leftX, topY, width, height);
}
