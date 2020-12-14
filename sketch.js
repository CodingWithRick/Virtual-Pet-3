var dog, sadDog, happyDog, database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;
var gameState, readState;
var current;


function preload() {
    sadDog = loadImage("dog2.png");
    happyDog = loadImage("dog.png");
}

function setup() {
    createCanvas(1000, 400);
    database = firebase.database();

    foodObj = new Food();

    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    dog = createSprite(800, 200, 150, 150);
    dog.addImage(sadDog);
    dog.scale = 0.15;

    feed = createButton("Feed the dog");
    feed.position(700, 95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add Food");
    addFood.position(800, 95);
    addFood.mousePressed(addFood_DB);

    readState = database.ref("gameState");
    readState.on("value", function (data) {
        gameState = data.val();
        // console.log(gameState);
        // foodObj.updateState(gameState);
    })
    current = hour();

    console.log(current);
}

function draw() {
    background("green");
    foodObj.display();

    fedTime = database.ref('FeedTime');
    fedTime.on("value", function (data) {
        lastFed = data.val();
    });
    foodObj.getFedTime(lastFed);

    fill(255, 255, 254);
    textSize(15);
    if (lastFed >= 12) {
        text("Last Fed : " + foodObj.lastFed % 12 + " PM", 350, 30);
    } else if (lastFed == 0) {
        text("Last Fed : 12 AM", 350, 30);
    } else {
        text("Last Fed : " + foodObj.lastFed + " AM", 350, 30);
    }

    if (gameState != 0) {
        feed.hide();
        addFood.hide();
        dog.visible = false;
    } else {
        feed.show();
        addFood.show();
        dog.visible = true;
    }
    if (current == (lastFed + 1)) {
        foodObj.updateState(1);
        clear();
        foodObj.g();
    }
    else if (current == (lastFed + 2)) {
        foodObj.updateState(2);
        clear();
        foodObj.bedroom();
    }
    else if (current > (lastFed + 2) && current <= (lastFed + 4)) {
        foodObj.updateState(3);
        clear();
        foodObj.washroom();

    } else {
        foodObj.updateState(0);

    }

    drawSprites();
}

//function to read food Stock
function readStock(data) {
    foodS = data.val();
    foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog() {
    if (foodObj.foodStock > 0) {

        dog.addImage(happyDog);

        foodObj.updateFoodStock(foodObj.foodStock - 1);
        database.ref('/').update({
            Food: foodObj.foodStock,
            FeedTime: hour()
        })
    }
}

//function to add food in stock
function addFood_DB() {
    foodS++;
    database.ref('/').update({
        Food: foodS
    })
}

