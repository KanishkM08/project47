var database;
var back_img;
var gameState =0;
var playerCount = 0;
var allPlayers;
var score = 0;
var player, form, game;
var player1,player2;
var players;
var player_img;
var player1score =0;
var player2score =0;
var jet1_Img, jet2_Img;
var alien_Img;
var aliens;
var aliensGroup;
var bulletGroup;
var bullet; 
var bullet_Img;
var back_img;
function preload(){
 back_img = loadImage("images/space_img.jpg");
 jet1_Img = loadImage("images/Jet1.png");
 jet2_Img = loadImage("images/Jet2.png");
 alien_Img = loadImage("images/alien_img.png");
}

function setup() {
  createCanvas(1400,800);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  }

function draw() {
  background("Black");  

  if (gameState === 1) {
    clear(); 
    game.play();
  }
  if (gameState === 2) {
    game.end();
  }
  if (playerCount === 2) {
    game.update(1);
  }
    
}
