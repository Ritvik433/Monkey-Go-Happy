
var monkey, monkey_running;
var ground;
var bananaImage, obstacleImage;
var bananaGroup, obstaclesGroup;
var survivalTime = 0;

function preload(){
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(500, 500);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
}

function draw() {
  background(180);
  
  stroke("black");
  textSize(20);
  fill("balck");
  survivalTime = Math.round(frameCount/frameRate());
  text("Survival Time: "+ survivalTime, 100, 50);
  
  if (ground.x < 500){
      ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey.y >= 250) {
        monkey.velocityY = -12;
    }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spawnBanana();
  spawnObstacles();
  
  drawSprites();
}

function spawnBanana(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(500,300,20,20);
    banana.y = Math.round(random(150, 250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(500,330,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
    obstacle.depth = ground.depth;
    ground.depth = ground.depth + 1;
    //obstacle.collide(ground);
    obstaclesGroup.add(obstacle);
  }
}