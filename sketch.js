var dog,happyDog;
var database
var foodS,foodStock;
var Image_dog
var fedTime,lastFed;
var feed
var foodObj





function preload() {
   
 Image_dog=loadImage("images/dogImg.png")
happyDog=loadImage("images/dogImg1.png")
}
function setup(){
     createCanvas(1000,400);
   

    database=firebase.database()
    foodObj=new Food()

    foodStock =database.ref("food")
    foodStock.on("value",readStock)

   
    
    dog = createSprite(250,250,10,10);
   dog.addImage("image",Image_dog)
   dog.scale=0.3;

  


   feed=createButton("feed the dog")
   feed.position(700,95)
   feed.mousePressed(feedDog);

   addFood=createButton("Add Food")
   addFood.position(800,95)
   addFood.mousePressed(addFoods);
  
}

function draw(){
    background(43,139,87);

    foodObj.display();

    text(mouseX+","+mouseY,250,255)
    fedTime=database.ref('FeedTime'); fedTime.on("value",function(data){ lastFed=data.val(); });
textSize(15);
if(lastFed>=12){
    text("lastFeed : "+lastFed%12+"PM",350,30)
}else if(lastFed===0){
    text("lastFeed : 12 AM ",350,30)  
}else{
    text("lastFeed : "+lastFed +" AM ",350,30)  
}



drawSprites();



  
   
}
function readStock(data){
    foodS=data.val();
    foodObj.updateFoodStock(foodS)
}


 function feedDog(){
     dog.addImage(happyDog)
   
     foodObj.updateFoodStock(foodObj.getFoodStock()-1);
     database.ref(' / ').update({
        food:foodObj. getFoodStock(),
        feedTime:hour()
     })
  
 }

 function addFoods(){
     foodS++
     database.ref(' / ').update({
        food:foodS
       
     })
 }