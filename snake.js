//to control our snake we need to change the value of xChange and yChange in our goSnake(xChange,yChange) function.
//let's create two global variable that keeps the value of xChange and yChange so in the event of key press we can change the value of them and feed them to our goSnake() function.
let stepX=10;
let stepY=0;

//we put our food coordination in a global variable and then call the drawSquare() function n the loop of each frame.
//Every time we start the game food is at {x:200,y:300} so we can call our giveMeFood() function before starting the game.
let food = {x:200,y:300};

//we introduce our canvas to js.
const GameBoard = document.getElementById("GameBoard");

//we need a context object that it used in js for rendering drawings in our canvas.
const context = GameBoard.getContext("2d");

//we create our snake by defining an array of objects that each one are coordinate one part of snake.
let snake = [
    {x:250,y:250},
    {x:240,y:250},
    {x:230,y:250},
    {x:220,y:250},
    {x:210,y:250},
];

//each part of snake or food we need some codes that will draw a square of the size 10x10 in a place that we give colors.
//we put this codes in one function that we call it drawSquare().
function drawSquare(xCoordinate, yCoordinate, squareColor, borderColor){
    context.fillStyle = squareColor;
    context.strokeStyle = borderColor;
    context.fillRect(xCoordinate, yCoordinate, 10, 10);
    context.strokeRect(xCoordinate, yCoordinate, 10, 10);
};

//we can draw our snake by passing each snake part to the drawSquare() function, using js method forEach. for noe our snake is light blue with black borders.
function showSnake(){
    snake.forEach(element => drawSquare(element.x , element.y, 'lightblue', 'black'));
};

//first lets define the snake head and add 10 to head x coordinate so new head is one step further than old head and the add new head to the snake array using js method for array called unshift().
//we wrap all this code in one function which we call goSnake().
//lets call the goSnake() function 7 times to see snake is 7 steps further and we have to call showSnake() to show the moved snake.

// function goSnake(){
//     const head = {x: Snake[0].x + 10, y: Snake[0].y};
//     Snake.unshift(head);
//     Snake.pop();
// }

// goSnake();
// goSnake();
// goSnake();
// goSnake();
// goSnake();
// goSnake();
// goSnake();
// showSnake();

//for moving in y dimension we need to do the same for y value of snake head 
//we can change the function to have inputs and use those inputs in our function.

// function goSnake(xChange, yChange){
//     const head = {x: Snake[0].x + xChange, y: Snake[0].y + yChange};
//     Snake.unshift(head);
//     Snake.pop();
// };

//eating the food happens when coordinations of snake's head is equal to coordinations of food,
//in such case, we don't need to pop() the last element of snake array so the snake grows. So let's update our goSnake() function like this:
function goSnake(){
    //we add here 2 global variable (stepX and stepY).
    const head = {x: snake[0].x + stepX, y: snake[0].y + stepY};
    snake.unshift(head);
    if(snake[0].x === food.x && snake[0].y === food.y){
        giveMeFood();
    } else {
        //cut the tail using js method for array called pop().
        snake.pop();
    }
};

//This food only appears on the place we set for it but in the game we need to generate a food on a random position. Here we will create a function that gets three inputs:
//1.from: minimum number acceptable.
//2.to: maximum number acceptable
//3.step: space between generate numbers,Example:if from is 10, to is 30, step is 5, numbers generated would be 10,15,20,25,30
function giveMeRandom(from,to,step){
    let Rand = Math.random(); //gives a number between 0(excessive) and 1 (inclusive)
    Rand *=(to-from)/step;
    Rand = Math.floor(Rand);
    Rand *= step;
    Rand +=from;
    return Rand;
};

//we can have a function that generate food in random position by calling our random once for food.x and once for food.y
//Also since the food should appear  in any of snake body parts we will check the coordinations that was generated and if it was the same of any of snake parts, we will call the function again.
function giveMeFood(){
    food.x = giveMeRandom(0,GameBoard.width,10);
    food.y = giveMeRandom(0,GameBoard.height,10);
    snake.forEach(part=>{
        if(part.x == food.x && part.y == food.y){  
            giveMeFood();
        }
    });
};

//because we will see to snake on game board, one is the snake in first position and is our snake after move so we will create one function that we called clearBoard().
//clearBoard() function will clear game board before showing snake again and that can be done by drawing a big white square on the game board.
function clearBoard() {  
    context.fillStyle = "white";  
    context.fillRect(0, 0, GameBoard.width, GameBoard.height);  
};

//each key on the keyboard has a uniq value called keycode.
//we have one problem,it should not be allowed to go left  when it's going right and same about up and down.
//lets fix the problem that we have above by adding a variable that keeps the direction of the snake and then check it when we want to change.
let direction = "right";
function changeDirection(event) {
    const pressedKey = event.keyCode;
    const LeftKey = 37;  
    const RightKey = 39;  
    const UpKey = 38;  
    const DownKey = 40;
    switch(pressedKey) {
        case LeftKey:
            if(direction !== "right"){
                stepX = -10;
                stepY = 0;
                direction = "left"
            }
            break;
        case RightKey:
            if(direction !== "left"){
                stepX = 10;
                stepY = 0;
                direction = "right"	
            }
            break;
        case UpKey:
            if(direction !== "down"){
                stepX = 0;
                stepY = -10;
                direction = "up"
            }
            break;
        case DownKey:
            if(direction !== "up"){
                stepX = 0;
                stepY = 10;
                direction = "down"
            }
            break;
    } 
}

//snake is dead if this 2 cases happen:
//1.snake's head hits the wall.
//we wrap all of this in isSnakeAlive() function and we can use this in startMoving() function.
function isSnakeAlive(){
    if(
        snake[0].x < 0 ||   // head hits the left wall
        snake[0].x > GameBoard.width - 10 ||   // head hits the right wall
        snake[0].y < 0 ||   // head hits the top wall
        snake[0].y > GameBoard.height - 10   // head hits the bottom wall
    ) {
        return false;
    }
    //2.snake's head goes on any part of its body(snake eats itself)
    //so we will loop over all parts of the snake body and if position of the head x and y is equal to any of the body parts the snake is dead. 
    //just one thing, snake can not eat itself on the first 3 parts, so we start at 4.
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return false;
        }
    }
    return true;
}

//now we need to make the code in a way that it shows each step automatically wait some time and then show next step.
//there is one function in js that is responsible for waiting called setTimeout(a,b).
//'a' is the function we want to run are some time and 'b' is the amount of waiting time in millisecond.

// setTimeout(()=>{
//     clearBoard();
//     goSnake();
//     goSnake();
//     goSnake();
//     goSnake();
//     goSnake();
//     goSnake();
//     goSnake();
//     showSnake();
//     }, 1000);
//above code doesn't look good so lets go one step at a time, we will wrap setTimeout() in a function let call that  startMoving().
//then at the end of function we call it again so lets remove our first showSnake() because we don't need it anymore and call goSnake() one time.
//also lets run our function after declaring it.
//if we change the calling of goSnake() in the startMoving() like below our snake will moving y dimension towards bottom of the game board.
//if we change goSnake(0,10) to goSnake(0,-10) it will go up.

// function startMoving(){
//     setTimeout(()=>{
//         clearBoard();
//         goSnake(0,10);
//         showSnake();

//         startMoving();
//     }, 200);
// };
        
//we need to put our addEventListener() in a function that runs at the beginning of startMoving().
//final step for startMoving() function:
function startMoving(){
    //to be able to control our snake's movement with keyboard,first we need to capture the event of pressing a keyboard key in our code.
    //we can achieve that by attaching something called event listener to our page.
    //we can use this event input to get find which key was pressed.
    //we create a function called changeDirection(),this function has one input of the event type that we are going to use in our addEventListener() function.
	document.addEventListener("keydown", changeDirection);
	setTimeout(()=>{
		clearBoard();
		if(isSnakeAlive()){
			goSnake();
		} else {
			showSnake();
			return false;
		}
		showSnake();
		drawSquare(food.x , food.y, 'red', 'black'); //food
startMoving();
	}, 200);
};
giveMeFood();
startMoving();
