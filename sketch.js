var path,path_img;
var door,doorG,door_img;
var rail,railG,rail_img;
var ghost,ghostimg;
var invisible,invisibleG;
var gameState = "PLAY";
var scary;


function preload(){
  path_img = loadImage("tower.png");
  door_img = loadImage("door.png");
  rail_img = loadImage("climber.png");
  ghostimg = loadImage("ghost-standing.png");
  scary = loadSound("spooky.wav");
  
}
function setup(){
  createCanvas(600,600);
  
  doorG = new Group();
  railG = new Group();
  invisibleG = new Group();
  
  scary.loop();

  
  path = createSprite(300,300,20,20);
  path.addImage("tower",path_img);
  path.velocityY = 2;
  
  ghost = createSprite(300,300,20,2);
  ghost.addImage("stand",ghostimg);
  ghost.scale = 0.35;
  
  
  
  
  
  
  
  
  
}
function draw(){
  
  if(gameState==="PLAY"){
    
  
  if(path.y>400){
    path.y = 300;
    
  }
  

  if(keyDown("space")){
    ghost.velocityY = -3;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-2;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+2;
  }
  
  if(railG.isTouching(ghost)){
    ghost.velocityY = 1;
  }

  if(invisibleG.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "END"
  }

  Spawndoor();
  }
  
  if(gameState==="END"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAMEOVER",300,300)
  }
  drawSprites();
  
}
function Spawndoor(){
  if(frameCount%200===0){
    door = createSprite(200,-50);
    rail = createSprite(200,14);
    invisible = createSprite(200,20);
    invisible.width = rail.width;
    invisible.height = 2;
    door.x = Math.round(random(120,400));
    rail.x = door.x;
    invisible.x = door.x;
    door.addImage("gate",door_img);
    rail.addImage("climber",rail_img);
    door.velocityY = 2;
    rail.velocityY = 2;
    invisible.velocityY = 2;
    doorG.add(door);
    railG.add(rail);
    invisibleG.add(invisible);
    doorG.setLifetimeEach(600);
    railG.setLifetimeEach(600); 
    ghost.depth = door.depth;
    ghost.depth +=1;
    ghost.depth = rail.depth;
    ghost.depth +=1;
    invisible.debug = true;
  }
  
}