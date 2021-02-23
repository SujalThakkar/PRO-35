var balloon;
var balloonI;
var bg;
var database;
var position;

function preload(){
   balloonI = loadAnimation("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
   bg = loadImage("images/Hot Air Ballon-01.png");
  }

function setup() {
  database = firebase.database();
  createCanvas(1500,700);
 balloon = createSprite(250, 650, 150, 150);
  balloon.addAnimation("balloonImg",balloonI);
  balloon.scale = 0.5;

  var balloonposition = database.ref('balloon/position')
  balloonposition.on("value",readPosition,showerror)
}



function draw() {
  background(bg); 

  if(keyDown(LEFT_ARROW)){
    updatePosition(-40,0);

  } 
  else if(keyDown(RIGHT_ARROW)){
    updatePosition(40,0);
    
  } 
 else if(keyDown(UP_ARROW)){
    updatePosition(0,-40);
    balloon.scale = balloon.scale - 0.005
  } 
 else if(keyDown(DOWN_ARROW)){
    updatePosition(0,40);
    balloon.scale = balloon.scale + 0.005
  } 
  drawSprites();
  textSize(50)
  text("use arrow keys to move the balloon",50,50)
}

function updatePosition(x,y){
  database.ref("balloon/position").set({
    'x' : position.x + x ,
    'y' : position.y + y 
  })
}
function readPosition(data){
  position = data.val();
  balloon.x = position.x ;
  balloon.y = position.y ;
}
function showerror(){
  console.log("this is error")
}