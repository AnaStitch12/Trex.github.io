//var da linha 1 a 2
//binario - 0 1
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var p = 0


var trex, trex_running, trex_parado ,edges;
var groundImage;
var nuvemImg;

var gO
var Nv
var Nv2;
var r, r2;

//sons
var jump;
var tche;
var die;

//function
function preload()
{
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_parado = loadAnimation('trex1.png');
  
  groundImage = loadImage("ground2.png")
  nuvemImg = loadImage("cloud.png")
  obstacle1 = loadImage('obstacle1.png')
  obstacle2 = loadImage('obstacle2.png')
  obstacle3 = loadImage('obstacle3.png')
  obstacle4 = loadImage('obstacle4.png')
  obstacle5 = loadImage('obstacle5 (1).png')
  obstacle6 = loadImage('obstacle6.png')
  r2 = loadImage('r2.png')

  jump = loadSound("jump.mp3");
  tche = loadSound("checkpoint.mp3")
  die = loadSound("die.mp3")
  
}


//functionSetup da linha 13 a 33
function setup()
{
  //windowWidth, windowHeight
  createCanvas(windowWidth,windowHeight);
  

  trex = createSprite(width*0.2,height*0.7);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("parado", trex_parado);
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  trex.debug = false

  trex.setCollider("rectangle", 0,0,80,80);
 // trex.setCollider("rectangle", 0,0,320, trex.height); IA

  //ground da linha 23 a 27
  ground = createSprite(width*0.5,height*0.8);
  ground.addImage(groundImage);
  
  ground.debug=false;
  ground.setCollider("rectangle",0,7)

  //criar os grupos
  gO = new Group(); //grupo dos obstaculos
  Nv = new Group()  //grupo das nuvens
  Nv2 = new Group()  //grupo das nuvens 2
  
 
  r = createSprite(1100,400)
  r.addImage(r2)
  r.scale = 0.1


  //edges da linha 30 a 30
  edges = createEdgeSprites();
}


function draw()
{
    //definir a cor do plano de fundo 
    background("white");

    if(gameState === PLAY)
    {

      ground.velocityX = -(20+p/200)
      //chão inifinito
      if(ground.x<100)
      {
        ground.x= width/2;
      }


      r.visible = false


      //ckeckpoint :)
      
     if (p > 0 && p % 500 == 0){
        tche.play();
      }
      //pular quando tecla de espaço for pressionada da linha 51 a 54
      if(keyDown("space") &&  trex.y > 560)
      {
        jump.play();
        trex.velocityY = -10;
      }
      //gravidade do trex da linha 55 a 56
      trex.velocityY = trex.velocityY + 0.6;


      Nuvens();

      gObstaculos();


      //trex bater nos obstaculos 
      if (gO.isTouching(trex)) {
          die.play();
          gameState = END
         // jump.play();
        //trex.velocityY = -10;

      }



      //text("o que voce quer escrever" + variavel , x, y)
      textSize(30)      
      text('Pontos: ' + p, width*0.7, height*0.3)
     
      p =  p + Math.round(getFrameRate()/60);
      
    }

    else if(gameState === END)
    {
      
      textSize(100)
      text('Game over',200,313 )
    
      r.visible = true;
      
      ground.velocityX = 0;
      trex.changeAnimation("parado", trex_parado);

      gO.setVelocityXEach(0);
      
      Nv.setVelocityXEach(0);
     
      Nv2.setVelocityXEach(0);

      gO.setLifetimeEach(-999);

     Nv.setLifetimeEach(-999);
     Nv2.setLifetimeEach(-999);
    
    
      

      textSize(30)
      text('Pontos: ' + p, width*0.7, height*0.3);
     
    
      //mousePressed, mousePressedover
  

      if(mousePressedOver(r))
      {

        //função resetar acontecer
        reset();
      }



    }
    

    //registrando a posição y do trex x da linha 48 a 48
    //console.log(trex.y)
    
    
   //impedir que o trex caia da linha 59 a 59
    trex.collide(ground);

    
    
    
    drawSprites();

    


}

function reset()
{
  gameState = PLAY;

  trex.changeAnimation("running", trex_running);
  p = 0;

  gO.destroyEach();
  Nv.destroyEach();
  Nv2.destroyEach();
}

function gObstaculos (){
if (frameCount %60===0){
  var obstaculo = createSprite (width,height*0.78);
  obstaculo.velocityX = -(20+p/200)
  var num = Math.round(random(1,6));
  switch(num){
    case 1:obstaculo.addImage(obstacle1);break;
    case 2:obstaculo.addImage(obstacle2);break;
    case 3:obstaculo.addImage(obstacle3);break;
    case 4:obstaculo.addImage(obstacle4);break;
    case 5:obstaculo.addImage(obstacle5);break;
    case 6:obstaculo.addImage(obstacle6);break;
    default:break;
    
  }
  obstaculo.scale=0.5;
  obstaculo.lifetime=300

  gO.add(obstaculo)
 
  
}
}









function Nuvens()
{

  //nuvens grandes
  if(frameCount %60 === 0)
  {
    var nuvem = createSprite(1393,100);
    nuvem.velocityX = -5;
    nuvem.addImage(nuvemImg);
    nuvem.scale = 2
    nuvem.y = Math.round(random(20,312))

    console.log("A camada da primeira nuvem: " + nuvem.depth)

    nuvem.lifetime=400

    Nv.add(nuvem)
    
    //  nuvem.depth = trex.depth
    //    trex.depth = nuvem.depth + 1;


  }

  //nuvens pequenas
  if(frameCount %95 === 0)
  {
    var nuvem2 = createSprite(1393,100);
    nuvem2.velocityX = -5;
    nuvem2.addImage(nuvemImg);
    nuvem2.scale = 0.8
    nuvem2.y = Math.round(random(20,300));

    Nv2.add(nuvem2)
/*
    nuvem2.depth = trex.depth
    trex.depth = nuvem2.depth + 1;


    console.log("A camada da segunda nuvem: " + nuvem2.depth)
    console.log("A camada do trex: " + trex.depth)

*/

  }


  }