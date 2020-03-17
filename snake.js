let stepX=10;
		let stepY=0;
		let food = {x:200,y:300};
    	const GameBoard = document.getElementById("GameBoard");

    	const context = GameBoard.getContext("2d");

    	let snake = [
		    {x:250,y:250},
		    {x:240,y:250},
		    {x:230,y:250},
		    {x:220,y:250},
		    {x:210,y:250},
		];

		function drawSquare(xCoordinate, yCoordinate, squareColor, borderColor){
		    context.fillStyle = squareColor;
		    context.strokeStyle = borderColor;
		    context.fillRect(xCoordinate, yCoordinate, 10, 10);
		    context.strokeRect(xCoordinate, yCoordinate, 10, 10);
		};

		function showSnake(){
			snake.forEach(element => drawSquare(element.x , element.y, 'lightblue', 'black'));
		};

		function goSnake(){
			const head = {x: snake[0].x + stepX, y: snake[0].y + stepY};
			snake.unshift(head);
			if(snake[0].x === food.x && snake[0].y === food.y){
				giveMeFood();
			} else {
				snake.pop();
			}
		};

		function giveMeRandom(from,to,step){
			let Rand = Math.random(); //gives a number between 0(excusive) and 1 (inclusive)
			Rand *=(to-from)/step;
			Rand = Math.floor(Rand);
			Rand *= step;
			Rand +=from;
			return Rand;
		};

		function giveMeFood(){
			food.x = giveMeRandom(0,GameBoard.width,10);
			food.y = giveMeRandom(0,GameBoard.height,10);
			snake.forEach(part=>{
				if(part.x == food.x && part.y == food.y){  
					giveMeFood();
				}
			});
		};

		function clearBoard() {  
		    context.fillStyle = "white";  
		    context.fillRect(0, 0, GameBoard.width, GameBoard.height);  
		};

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

		function isSnakeAlive(){
			if(
				snake[0].x < 0 ||   // head hits the left wall
                snake[0].x > GameBoard.width - 10 ||   // head hits the right wall
				snake[0].y < 0 ||   // head hits the top wall
				snake[0].y > GameBoard.height - 10   // head hits the bottom wall
			) {
				return false;
			}
			for (let i = 4; i < snake.length; i++) {
				if (snake[i].x === snake[0].x && snake[i].y === snake[0].y){
					return false;
				}
			}
			return true;
		}

		function startMoving(){
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
