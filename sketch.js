var stars = 0
function preload(){
    starImg = loadImage("star.png");
    starBA = loadAnimation("starB1.png", "starB2.png")
    ballImg = loadImage("ball.png");
    gameOverImg = loadImage("game over.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    player = createSprite(windowWidth / 2, windowHeight / 2, 40, 40);
    player.shapeColor = "#00FF19";
    player.setCollider("rectangle", 0, 0, 17, 17)
    //player.debug = true

    down_wall = createSprite(windowWidth / 2, windowHeight / 150, windowWidth, 10);
    down_wall.visible = false
    up_wall = createSprite(windowWidth / 2, windowHeight / 1, windowWidth, 10);
    up_wall.visible = false
    right_wall = createSprite(windowWidth / 1, windowHeight / 2, 10, windowHeight);
    right_wall.visible = false
    left_wall = createSprite(windowWidth / 200, windowHeight / 2, 10, windowHeight);
    left_wall.visible = false
    
    go = createSprite(windowWidth / 2, windowHeight / 2,)
    go.addImage(gameOverImg)
    go.visible = false

    starG = new Group
    starBG = new Group
    ballG = new Group
}

function draw() {
    background("#724C6E");

    if(player.isTouching(starG)){
        starG.destroyEach();
        stars += 1;
    }

    if(player.isTouching(starBG)){
        starBG.destroyEach();
        stars += 5;
    }

    player.collide(down_wall);
    player.collide(up_wall);
    player.collide(right_wall);
    player.collide(left_wall);

    if(player.isTouching(ballG) == false){
        ballsY();
        ballsX();
        starSpawn();
        starBSpawn();
        move();
    }else{
        ballG.setVelocityYEach(0);
        ballG.setVelocityXEach(0);
        ballG.setLifetimeEach(10000);
        ballG.setLifetimeEach(10000);
        player.shapeColor = "#ff0000";
        go.visible = true
        if(keyDown('SPACE')){
            restart()
        }
    }
    
    drawSprites();

    fill("white");
    textSize(30);
    text("points = " + stars, width / 1.3, height - 630)
};

function starSpawn(){
    if(World.frameCount % 100 == 0){
        star = createSprite(Math.round(random(50, width - 50)), Math.round(random(50, height - 50)), 10, 10);
        star.lifetime = 100;
        star.scale = 0.6;
        star.addImage(starImg);
        starG.add(star)
    }
    
};

function starBSpawn(){
    if(World.frameCount % 700 == 0){
        starB = createSprite(Math.round(random(50, width - 50)), Math.round(random(50, height - 50)), 10, 10);
        starB.lifetime = 150;
        starB.scale = 0.4;
        starB.addAnimation("estrelaBonus", starBA);
        starBG.add(starB);
    }
};

function ballsY(){
    if(World.frameCount % 12 == 0){
        bally = createSprite(Math.round(random(width / 20, width)), 30, 10, 10);
        bally.lifetime = 80;
        bally.scale = 1.6;
        bally.velocity.y = 11
        bally.addImage(ballImg);
        ballG.add(bally);
        ballG.setColliderEach("rectangle", 0, 0, 17, 17)
        ballG.debug = true
    }
}

function ballsX(){
    if(World.frameCount % 12 == 0){
        ballx = createSprite(width / 110, Math.round(random(height / 20, height)), 10, 10);
        ballx.lifetime = 150;
        ballx.scale = 1.6;
        ballx.velocity.x = 11
        ballx.addImage(ballImg);
        ballG.add(ballx);
    }
}

function move(){
    if(keyIsDown(UP_ARROW)){
        player.position.y -= 10
    }
    if(keyIsDown(DOWN_ARROW)){
        player.position.y += 10
    }
    if(keyIsDown(LEFT_ARROW)){
        player.position.x -= 10
    }
    if(keyIsDown(RIGHT_ARROW)){
        player.position.x += 10
    }
}
function restart(){
    stars = 0;

    player.position.x = windowWidth / 2;
    player.position.y = windowHeight / 2;
    player.shapeColor = "#00ff00";

    go.position.x = windowWidth / 2;
    go.position.y = windowHeight / 2;
    go.visible = false

    ballG.destroyEach();
    starG.destroyEach();
    starBG.destroyEach();
}