//*** Creating the snake: *** 
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
function goSnake() {
    const head = {x: snake[0].x + 10, y: snake[0].y};
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
function startMoving() {
    setTimeout(() => {
        clearBoard();
        goSnake();
        showSnake();
        startMoving();
    }, 200);
} 
startMoving();


