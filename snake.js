//*** Creating the snake: *** 
//we create two global variables that keeps the value of xChange and yChange.
//So in the event of key press we can change the value of them and then feed them to our goSnake function. I will add them at the beginning of the script
let stepX=10;
let stepY=0;
const GameBoard = document.getElementById("GameBoard"); //we introducing our canvas to js.
const context = GameBoard.getContext("2d"); //we need a context object for rendering drawings in our canvas.

//we create our snake by defining an array of objects that each one are coordination of one part of the snake.
//snake is our array name and we have 5 objects in snake array.
let snake = [
    {x:250,y:250},
    {x:240,y:250},
    {x:230,y:250},
    {x:220,y:250},
    {x:210,y:250}
]
//to create each part of snake or food we need some code to draw a square of the size 10 * 10 in a place that we give it we colors we provide it
function drawSquare(xCoordinate, yCoordinate, squareColor, borderColor) {
    context.fillStyle = squareColor;
    context.strokeStyle = borderColor;
    context.fillRect(xCoordinate, yCoordinate, 10, 10);
    context.strokeRect(xCoordinate, yCoordinate, 10, 10);
}
//now we have to use forEach method in js to draw our snake by passing ach snake part to the drawSquare() function 
//we put this task inside of showSnake() function and for now our snake color is light blue with black borders. 
function showSnake() {
    snake.forEach(Element => drawSquare(Element.x, Element.y, 'lightblue', 'black'));
}
showSnake(); //we call our showSnake() function.

//*** The Snake moves: ***
//first lets define the snake head and add 10 to head x coordinate so new head is one step further than old head and then add new head to the snake 
//we gonna use array in js method for array called unshift().
//we wrap the whole thing in a function and called goSnake()
//lets call goSnake() function 7 times to see snake is 7 steps further but don't forget that we must call showSnake() to show the moved snake.
//we create a snake that moves in x dimension so now we have to do the same to y dimension so we will have two inputs and use that inputs in our goSnake() function.
function goSnake() {
    const head = {x: snake[0].x + stepX, y: snake[0].y + stepY};
    snake.unshift(head);
    //we cut the tail using Js method for array called pop().
    snake.pop();
}
//there is one problem ,now you see two snakes. one is the snake in one position and second is our snake after move so we clear our game board before showing snake again.
//that can be done by a drawing a big white square on the game board so we wrap it in ome function and call that  clearBoard.
function clearBoard() {
    context.fillStyle = "white";
    context.fillRect(0, 0, GameBoard.width, GameBoard.height);
} 

//*** Animate the moment: *** 
//now we need to make the code in a way that it shows each step automatically wait some time and then show next step.
//there is one function in js that is responsible for waiting called setTimeout(a, b) which a is the function we want to run are some time and b is amount of waiting time in milliseconds.
//now we will wrap setTimeout() in one function lets call it startMoving and then at the end of function we call it again.
//lets remove our first showSnake() because we don't need it anymore and call goSnake() one time,also lets run our function after declaring it.
//and now we need to put our addEventListener() in a function that runs at the beginning of game, So lets put it at the beginning of startMoving()
function startMoving() {
    document.addEventListener("keydown", changeDirection);
    setTimeout(() => {
        clearBoard();
        goSnake(stepX,stepY); //the snake will move towards bottom of the game board, if we put -10 it will go up.
        showSnake();
        startMoving();
    }, 200);
} 
startMoving();

//*** Getting keyboard inputs *** 
//to be able to move our snake's movement with keyboard first we need to capture the event of pressing the keyboard key in our code,this can be done by attaching something called 'event listener' to our page.
//every time  a key is pressed a function is called that has an event input,we can use this event input to get find which key was pressed.
//each key on the keyboard has a uniq value called keycode.


//*** using input to change direction *** 
//First lets create a function called changeDirection(), 
//this function has one input of the event type that we are going to use in our addEventListener() function.
//it should not be allowed to go left when it is going right or vice versa, same about up and down, 
//let's fix that by adding a variable that keeps the direction of the snake and then check it when we want to change direction.
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

//*** Lets kill the snake: ***
//Snake is dead if on of the following cases happens:
//1.Snake's head hits the wall.
//2.Snake's head goes on any part of its body (snake eats itself)


