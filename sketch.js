//Create variables here
var dog, dog_img;
var happyDog, happyDog_img;
var database;
var foodS;
var foodStock;

function preload(){
  //load images here
  dog_img = loadImage("images/dogImg.png");
  happyDog_img = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);

  dog = createSprite(250, 250, 50, 50);
  dog.addImage(dog_img);
  dog.scale = 0.15;

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  textSize(20);
}

function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img);
  }
  
  //add styles here
  fill("red");
  stroke("black");
  textSize(20);
  text("Note: Press UP ARROW key to feed the dog Milk", 50, 50);
  
  text("Food remaining : "+foodS,240,480);

  drawSprites();
  //readStock();
  //writeStock();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    food:x
  })
}