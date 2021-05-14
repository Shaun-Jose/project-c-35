var ball1;
var database;
var position;
function preload(){
    balloonImage1 = loadAnimation('Hot Air Ballon-01.png')
}
function setup(){
    database = firebase.database()
    createCanvas(1500,700);
   balloon1 = createSprite(250,650,150,150);
   balloon1.scale = 0.5
    balloon1.addAnimation('hot air balloon',balloonImage1)
    var ballPosition = database.ref('balloon/height')
    ballPosition.on('value',readPosition,showError)

}


function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+10);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref('balloon/height').set({
        'x':position.x + x,'y':position.y + y 
    })
    
    
}


function readPosition(data) {
position = data.val()
balloon1.x = position.x
balloon1.y = position.y
}

function showError(){
    console.log('There is an error')
}
