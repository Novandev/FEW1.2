// get the canvas element
var canvas = document.getElementById("myCanvas");

// Sets the canvas to render 2d elements
var ctx = canvas.getContext("2d");

var x = canvas.width/2;     // Defines the starting x coordinate for the ball in the canvas
var y = canvas.height-30;   // Defines the starting y coordinate for the ball in the canvas

var dx = 2;     // Defines the place that the x position will be moved to at each reload
var dy = -2;    // Defines the place that the y position will be moved to at each reload

var ballRadius = 10;    // Used as a sentinel value to control the balls bouncing

// Paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;


// Block variable section
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
// END Block Variable section


// Create the bricks
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
// End brick creation



document.addEventListener("keydown", keyDownHandler, false);    // Listens for key down event
document.addEventListener("keyup", keyUpHandler, false);    // Listens for key up events

// End  Paddle variables


// Keyboard methods

function keyDownHandler(e) {
    if(e.keyCode === 39) {
        rightPressed = true;
    }
    else if(e.keyCode === 37) {
        leftPressed = true;
    }
    if(e.keyCode === 40) {      //if the down arrow key is pressed
        paddleWidth = paddleWidth - 3
    }

    else if(e.keyCode === 38) {     //if the Up arrow key is pressed
        paddleWidth = paddleWidth + 3
    }


}

function keyUpHandler(e) {          // handles the logic for then the key is released to prevent it from endlessly going to one side
    if(e.keyCode === 39) {
        rightPressed = false;
    }
    else if(e.keyCode === 37) {
        leftPressed = false;
    }
}


//End Keyboard methods

// RANDOM COLOR GENERATOR
const hexColors = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'] // every possible color in the hex code
const getRandomColor = () => {

    let hexStr = '#';
    for(let i =0; i < 6; i++){
        const randomInt = Math.floor(Math.random() * Math.floor(hexColors.length));
        hexStr += hexColors[randomInt]
    }
   return hexStr
}
//END RANDOM COLOR GENERATOR


// Ball object to render the ball itself
let  drawBall =  {
    // drawing code
    color:"#0095DD",
    render(){
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);    // Draws the arc
        ctx.fillStyle = this.color;
        ctx.fill();         // Fills the object with whatever fillstyle color is above
        ctx.closePath();
    }


}

//End Ball object

// Paddle class

let drawPaddle = {

    render(){
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }


}

// END paddle class

// Brick function
const drawBricks = () => {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// End brick section

//Collision section

const collisionDetection = () => {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}
//END Collision section

// Draws on the screen and updates the x and y points
let draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //This method takes four parameters: the x and y coordinates of the top left corner of a rectangle, and the x and y coordinates of the bottom right corner of a rectangle. The whole area covered by this rectangle will be cleared of any content previously painted there.
    drawBricks()
    drawPaddle.render()
    drawBall.render()      //  Continuously renders the ball
    collisionDetection();


    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {     // for the x axis if the current position, plus whatever is being adding to it places that out of the canvas, reviserse the bounce
        dx = -dx;
        drawBall.color = getRandomColor()       // changes the color to another via hex code on each bump
    }

    if(y + dy < ballRadius || y + dy < ballRadius) {    //     for the y axis if the current position, plus whatever is being adding to it places that out of the canvas, reviserse the bounce

        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {        // if the ball is moved below the canvas
        if(x > paddleX && x < paddleX + paddleWidth) {   // if the paddle X basically isn't covering the smae space as the ball is currently at
            if(y= y-paddleHeight){
                dy = -dy  ;
            }
        }
        else {
            console.log("game over")
            document.location.reload();
        }
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth) { //Move the paddle to the left or right
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
       paddleX -= 7;
    }

    x += dx;        // By adding  2 to each of the x and y axis, the ball moves
    y += dy;
}

setInterval(draw, 10);  // Set interval is used to redraw the ball after every 10 milliseconds allowing for "movement"