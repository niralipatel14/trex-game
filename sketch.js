
//making variables
var trex ,trex_running, ground, ground_image, invisibleGround, cloud, cloud_image;
var trex_collided;
var score = 0;
var obstacle_group, cloud_group;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var game_over;
var gameover;
var restart;
var re_start;

//loading images and animations
function preload()
{
  trex_running = loadAnimation ("trex1.png","trex3.png","trex4.png");  
  trex_collided = loadAnimation ("trex_collided-1.png");
  ground_image = loadImage ("ground2.png");
  cloud_image = loadImage ("cloud.png");
  obstacle1 = loadImage ("obstacle1.png");
  obstacle2 = loadImage ("obstacle2.png");
  obstacle3 = loadImage ("obstacle3.png");
  obstacle4 = loadImage ("obstacle4.png");
  obstacle5 = loadImage ("obstacle5.png");
  obstacle6 = loadImage ("obstacle6.png");
  gameover = loadImage ("gameOver.png");
  restart = loadImage ("restart trex.png");
}

function setup()
{
  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite (50, 180, 20, 50);
  trex.addAnimation ("running",trex_running);
  trex.scale = 0.5;

  //edges = createEdgeSprites ();
  ground = createSprite (200, 180, 400, 20);
  ground.addImage (ground_image);

  //invisible ground to make it more realistic
  invisibleGround = createSprite (200, 190, 400, 10);
  invisibleGround.visible = false;

  obstacle_group = createGroup ();
  cloud_group = createGroup ();

  game_over = createSprite (300,100);
  game_over.addImage(gameover);
  re_start = createSprite (300,150);
  re_start.addImage(restart);

}

function draw()
{
  background("white");
  text ("Score: " + score, 400, 20);

  if (gamestate===PLAY)
  {
    //when space bar is pressed, Trex will jump
     if (keyDown("space")&&(trex.y>=160)) 
     {
       trex.velocityY = -10;
      }  

    //gravity effect
     trex.velocityY = trex.velocityY + 0.5;
     trex.collide (invisibleGround);
     ground.velocityX = -3;


    //making the ground reset
     if (ground.x<0)
      {
        ground.x = ground.width/2;
      }
  
    //adding score
      score = score + Math.round(frameCount/50);

    create_clouds();
    create_cactus();

    re_start.visible = false;
    game_over.visible = false;

    if (obstacle_group.isTouching (trex))
    {
      gamestate=END;
    }
  
  }
 
 
  else if (gamestate===END)
  {
      ground.velocityX = 0;
      cloud_group.setVelocityXEach(0);
      obstacle_group.setVelocityXEach(0);
      trex.changeAnimation("collided", trex_collided)
      cloud_group.setLifetimeEach(-1);
      obstacle_group.setLifetimeEach(-1);
      trex.velocityY = 0;
      re_start.visible = true;
      game_over.visible = true;

  }

trex.setCollider("circle", 0, 0, 39.5);
//trex.debug = true;  


  //console.log (frameCount);

  drawSprites ();
}

//creating clouds
function create_clouds ()
{
  if (frameCount%100 == 0)
  {
    cloud = createSprite (600,100,40,40);
    cloud.velocityX = -3;
    cloud.addImage (cloud_image);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(70,100));
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloud.lifetime = 200;
    cloud_group.add (cloud);
  }

}

//creating cactus
function create_cactus ()
{
  if (frameCount%90 == 0)
  {
    cactus = createSprite (600, 165, 40, 40);
    cactus.velocityX = -3;
    cactus.scale = 0.45;
    cactus.lifetime = 200;
    var random_cactus = Math.round(random(1,6));
    obstacle_group.add(cactus);

    //switch statement
    switch (random_cactus)
    {
      case 1:
        cactus.addImage (obstacle1);
        break;

      case 2:
        cactus.addImage (obstacle2);
        break;

      case 3:
        cactus.addImage (obstacle3);
          break;

      case 4:
        cactus.addImage (obstacle4);
            break;

      case 5:
        cactus.addImage (obstacle5);
              break;

      case 6:
        cactus.addImage (obstacle6);
        break;

    }

  }
}
