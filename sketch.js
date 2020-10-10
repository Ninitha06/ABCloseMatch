const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Mouse = Matter.Mouse;
const MouseConstraint = Matter.MouseConstraint;

var engine, world;
var box1, pig1,pig2;
var backgroundImg,platform;
var bird, slingshot;

var sling1,sling2;

var gameState = "onsling";
var bg = "sprites/bg.png";
var score = 0;
var bs=0;
function preload() {
   // getBackgroundImg();
    backgroundImg = loadImage("sprites/bg.png");
    sling1=loadImage("sprites/sling1.png");
    sling2=loadImage("sprites/sling2.png");
   
}

function setup(){
    var canvas = createCanvas(1200, 600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,590,1200,20);
    platform = new Ground(140, 485, 290, 440);

    box1 = new Box(850,550,80,80);
    box2 = new Box(1030,550,80,80);
    box3 = new Box(850,450,80,80);
    box4 = new Box(1030,450,80,80);
    box5 = new Box(940,350,80,80);
    

    pig1 = new Pig(940, 550);
    pig2 = new Pig(940, 450);

    log1 = new Log(940,500,260, PI/2);
    log2 =  new Log(940,400,260, PI/2);
    log3 = new Log(880,315,150, PI/7);
    log4 = new Log(1000,315,150, -PI/7);

    bird = new Bird(260,135);
   // console.log(bird.body);
   
    slingshot = new SlingShot(bird.body,{x:260, y:135});
    //engine.world.gravity.y=2.5;


    let canvasmouse = Mouse.create(canvas.elt);
    canvasmouse.pixelRatio = pixelDensity();
    let options = {
      mouse: canvasmouse }
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
  
    }

function draw(){
    if(backgroundImg)
        background(backgroundImg);
        
        noStroke();
        textSize(35);
        fill("white");
        textSize(20);
        text( score, 1100, 30);
        
    
    Engine.update(engine);

       
    ground.display();
    platform.display();
    box1.display();
    box2.display();
    log1.display();
    box3.display();
    box4.display();
    log2.display();
    box5.display();
    

    
    
    log3.display();
    log4.display();



    
    pig1.display();
    pig1.score();
    pig2.display();
    pig2.score();
    
    
    
   
    image(sling1,260,135,30,130);
    
    bird.display();
    image(sling2,240,135,30,80);
    slingshot.display();
 
    if(gameState === "launched"){
        World.remove(world,mConstraint);
    }

    
    }

/*function mouseDragged(){
    if (gameState!=="launched"){

       var mx=map(mouseX,0,displayWidth-100,100,400)
       var my=map(mouseY,0,displayHeight-120,50,300)
      
       //var mx=mouseX;
       //var my=mouseY;
        Matter.Body.setPosition(bird.body, {x: mx, y: my});
    }
   }*/


function mouseReleased(){
    setTimeout(() => {
        slingshot.fly();
      }, 150);
    
      //engine.timing.timeScale = 1.5;

       //engine.world.gravity.y=2;

     }

function keyPressed(){
    console.log(bird.body.speed);
    if(keyCode === 32 && bird.body.speed < 1){
       bird.trajectory = [];    
       Matter.Body.setVelocity(bird.body, { x : 0, y: 0});
       Matter.Body.setPosition(bird.body,{x:270,y:170});
       slingshot.attach(bird.body);
       Matter.Body.setAngle(bird.body,0);
       World.add(world,mConstraint);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=6 && hour<=19){
        bg = "sprites/bg.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    //console.log(backgroundImg);
}