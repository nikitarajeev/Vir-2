// Physics Engine
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

// variables
var d1 , d2;
var database;
var foodStock,foodS;
var engine, world;


function preload()
{
  //loading images 
  d1 = loadImage("images/dogImg.png");
  d2 = loadImage("images/dogImg1.png");
  
}


function setup() 
{
  createCanvas(500, 500);

  // Physics Engine 
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  // Assigning the database
  database = firebase.database();

  // Creating dog
  dog = createSprite(200,300);
  dog.scale=0.2;
  dog.addImage(d1);

  // Fetching the foodStock from the database 
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
}


function draw()
 {  
  background(46, 139, 87);

  // To update the physics engine
  Engine.update(engine);
  
  // When the up key is pressed the dog will bend downwards(i.e the dog will change its animation)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(d2);    
  }
  // If not the the dog will remain the same 
  else {
    dog.addImage(d1);
  }

  drawSprites();

  // Text 
  fill ("black");
  text ("Food Remaining : "+foodS,200,200);
  text ("Press Up arrow to feed the dog",200,50);

}

// Function to read value from DB
function readStock(data){
  foodS = data.val();
  }

  // Function to write value in DB

  function writeStock(x){
    if(x<=0){
      x=0
    }
    else{
      x=x-1;
    }
    database.ref("/").update({
      Food:x
    })
  }



