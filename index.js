//variables
let inputDirect = { x: 0, y: 0 };
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [{ x: 15, y: 15 }];
let score = 0;
food = { x: 10, y: 20 };

//music
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const bgmSound = new Audio('background.mp3');

//functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    //console.log(ctime);
    gameEngine();
}

function isColide(snake)
{
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 30 || snake[0].x <=0 || snake[0].y >= 30 || snake[0].y <=0){
        return true;
    }
    return false;
}
function gameEngine() {
    //moving snake & food
    if(isColide(snakeArr))
    {
        bgmSound.pause();
        gameOverSound.play();
        inputDirect={x:0, y:0}
        alert("Game Over!!");
        snakeArr = [{x:15, y:15}];
        bgmSound.play();
        score = 0;
    }

    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDirect.x, y: snakeArr[0].y + inputDirect.y});
        let a = 2;
        let b = 27;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    for (let i = snakeArr.length-2; i >= 0; i--){
       snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDirect.x;
    snakeArr[0].y += inputDirect.y;
    
    //Displaying snake
    background.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index == 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        background.appendChild(snakeElement);
    })
    //Displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    background.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    bgmSound.play();
    inputDirect = { x: 0, y: 1 } //starts game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirect.x = 0;
            inputDirect.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDirect.x = 0;
            inputDirect.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirect.x = -1;
            inputDirect.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDirect.x = 1;
            inputDirect.y = 0;
            break;
            default:
                break;
    }
})