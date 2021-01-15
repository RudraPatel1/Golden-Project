var PLAY = 1
var END = 0
var count = 0
var gameState = PLAY
var player
var rock, eagle;
var coin;
var ground
var rockGroup, eagleGroup, coinGroup
var coinImg
var duck
var eagleImg
var rockImg
var jump
var run

function preload(){
  duck = loadAnimation("images/Duck1.png","images/Duck2.png")
  eagleImg = loadAnimation("images/Eagle1.png","images/Eagle2.png","images/Eagle3.png")
 // jump = loadAnimation("images/Jump1.png","images/Jump2.png","images/Jump3.png","images/Jump4.png","images/Jump5.png","images/Jump6.png")
  run = loadAnimation("images/Run1.png","images/Run2.png","images/Run3.png","images/Run4.png","images/Run5.png","images/Run6.png")

rockImg = loadImage("images/rock.png")
  coinImg = loadImage("images/coin.png")
}

function setup() {
   
  createCanvas(1600, 400);
 ground= createSprite(100, 390, 3200 ,20);
 ground.x = ground.width/2
 ground.velocityX = -6

 player = createSprite(200, 390, 50, 50);
 player.addAnimation("run", run)
 //player.addAnimation("jump" , jump)
 player.addAnimation("duck" , duck)
 
 rockGroup = createGroup();
 eagleGroup = createGroup();
 coinGroup = createGroup();
}
 
function draw() {
  
  background(255,255,255);

  if (gameState === PLAY){
    if (keyDown(UP_ARROW) && player.y >= 341) {
      player.velocityY = -12
     // player.changeAnimation("jump", jump)
    }  
   
    
    player.velocityY = player.velocityY + 0.8
   
    if (ground.x <0){
      ground.x = ground.width/2
  
    }
  
    if (keyWentDown(DOWN_ARROW)) {
      player.changeAnimation("duck" , duck)
    }
   
    if (keyWentUp(DOWN_ARROW)){
      player.changeAnimation("run",run)
    }
    
    text("Score: "+ count, 250, 100);

    if(gameState === PLAY){
     
      ground.velocityX = -(6 + 3*count/100);
     
      count = count + Math.round(getFrameRate()/45);
      console.log(getFrameRate())

      if(eagleGroup.isTouching(player)){
        gameState = END
      }
      if(rockGroup.isTouching(player)){
        gameState = END
      }
      
    }

    
      Spawncoin();
 Spawneagle();
 Spawnrock();
  
 for(var i = 0; i < coinGroup.length; i++){
  if(coinGroup.get(i).isTouching(player)) {
 coinGroup.get(i).remove()

 
  

  }
 }

  
  }
  
   if (gameState ===  END){
     rockGroup.destroyEach()
     coinGroup.destroyEach()
     eagleGroup.destroyEach()
   }
  player.collide(ground)
 
  drawSprites();
}
 function Spawnrock() {
   if(frameCount% 60 === 0){
    rock = createSprite(1601, 360, 20,20);
    rock.addImage("rock",rockImg)
    rock.velocityX = -7
    rockGroup.add(rock)
   }
 }

 function Spawneagle() {
   if(frameCount% 280 === 0){
eagle = createSprite(1600,random(250, 300) , 20,20);
eagle.addAnimation("eagle",eagleImg)
     eagle.velocityX = -10
     eagle.lifetime = 230
     eagleGroup.add(eagle)
     eagle.scale = 0.5
   }
 }

 function Spawncoin() {
   if(frameCount% 150 === 0) {
     coin = createSprite(1600,random(230 , 270), 20,20);
     coin.addImage("coin",coinImg)
     coin.velocityX = -8
     coin.lifetime = 200
     coinGroup.add(coin)
     coin.scale = 0.3
   }
 }