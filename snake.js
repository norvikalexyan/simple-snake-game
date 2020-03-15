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