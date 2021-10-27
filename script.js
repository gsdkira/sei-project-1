// we are making a supermarket shopping game
//the point of the game is for the player to gain points by collision or lose points by collision
// we will have three elements, player, good points, bad points
//the player can move from right to left
//the player can lose all points and lose or last for at least 40 seconds

//Set up canvas
const game = document.getElementById('canvas')

//we're going to set up width and height variables
//that means we are going to use setAttribute together with get computed Style
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
// console.log('current game width', game.width)
// console.log('current game height', game.height)
//now we need to get the games contect so we can add to it, draw on it, create animations 
//we do this with the built in canvas methos, getContext
const ctx = game.getContext('2d')

// we're going to follow some sort of basic Object Oriented Programming 'rules' to build an interactive game 
// we'll create objects for our player
function Shopper (x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.alive = true
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}
// create objects for Food
function Food (x, y, color, width, height) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.alive = true
    this.render = function () {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

}
//we'll give them their own 'draw methods to place them on the canvas
let player = new Shopper(380, 410, '#113CFC', 40, 30)
let watermelon = new Food (110, 0, '#FF5C58', 20, 20)
let spinach = new Food (290, 0, '#125C13', 20, 20)
let potatoChip = new Food (470, 0, '#C36A2D', 20, 20)
let twinkie = new Food (640, 0, '#F4A442', 20, 20)

let allFoods = [watermelon, spinach, potatoChip, twinkie]

let gameScore = 50
let gamePoints = 3


//we have to establish a key movement with keyboard before the looop
const keysToMove = (e) => {
    switch (e.keyCode) {
        case (65):
        player.x -= 50
        break
        case(68):
        player.x += 50
        break
    }
}
// function for the food to fall
const foodFalling = () => {
        for(i = 0; i < 4; i++) {
            allFoods[i].y += 10
        }
    }
//function to create new foods for interval
// const foodSpawn = () => {
//     for(i = 0; i < 4; i++) {
//         if (allFoods.alive = true) { 
//         allFoods[i] = allFoods[i] * Math.random(Math.floor())
//         i++
//     }
//     }
// }
//Detect hit collision for watermelon
let watermelonDetectHit = () => {
    if(
        player.x < watermelon.x + watermelon.width &&
        player.x + player.width > watermelon.x &&
        player.y < watermelon.y + watermelon.height &&
        player.y + player.height > watermelon.y)
        {
            watermelon.alive = false
            document.querySelector('#top-right> h2').innerText="+12"
            gameScore = gameScore + gamePoints
        }
    }
//Detect hit collision for spinach
    let spinachDetectHit = () => {
        if(
            player.x < spinach.x + spinach.width &&
            player.x + player.width > spinach.x &&
            player.y < spinach.y + spinach.height &&
            player.y + player.height > spinach.y)
        {
            spinach.alive = false
            document.querySelector('#top-right> h2').innerText='+12' 
            gameScore = gameScore + gamePoints
        }
    }
//Detect hit collision for potatoChip
    let potatoChipDetectHit = () => {
        if(
            player.x < potatoChip.x + potatoChip.width &&
            player.x + player.width > potatoChip.x &&
            player.y < potatoChip.y + potatoChip.height &&
            player.y + player.height > potatoChip.y)
        {
            potatoChip.alive = false
            document.querySelector('#top-right> h2').innerText='-12' 
            gameScore = gameScore - gamePoints
        }
    }
//Detect hit collision for twinkie
    let twinkieDetectHit = () => {
        if(
            player.x < twinkie.x + twinkie.width &&
            player.x + player.width > twinkie.x &&
            player.y < twinkie.y + twinkie.height &&
            player.y + player.height > twinkie.y)
        {
            twinkie.alive = false
            document.querySelector('#top-right> h2').innerText='-12' 
            gameScore = gameScore - gamePoints
        }
    }
//draw a score board to track points
    function drawScore() {
        ctx.font = "24px Arial";
        ctx.fillStyle = '#FF5C58';
        ctx.fillText ("Score: "+gameScore, 650, 30)
    }

    let heartAttack = () => {
        if (gameScore < 39) {
            player.alive = false
            document.querySelector('#btm-right > h2').innerText='You had a heart attack!'
        }
    }
    
//gameLoop for the game
const gameLoop = () => {
        //clear canvas for the animation loop to start again
        ctx.clearRect(0,0, game.width, game.height)
        for(i = 0; i < 4; i++) {
            allFoods[i].render()
        }
        drawScore()
        // setInterval(foodSpawn, 5)
        foodFalling()
        watermelonDetectHit()
        spinachDetectHit()
        twinkieDetectHit()
        potatoChipDetectHit()
        player.render()
        heartAttack()
    }
        

//key movement event listener
document.addEventListener('keydown', keysToMove)
//the timing function will determing how and when our game animates
let gameInterval = setInterval(gameLoop, 70)
// let newFoodSpawn = setInterval(foodSpawn, 5)
startBtn = document.getElementById('startGame')
startBtn.addEventListener('click', (e) => {
    console.log('click')
})










// startButton.addEventListener('click', function(e) {
//     window.requestAnimationFrame(foodFalling);
// });


       

// //set up game loop function, declaring what happens when our game is running 
// // let gameStop = () => {clearInterval(gameInterval)}
// // //add event listener after gameStop which is clear Interval


// // let foodMovement = () => {
// //     if(foods.alive) {
// //     for (i = 0; i < foods.length; i++)
// //         foods.y += Math.random() * 2
// //         foods.x += Math.random() * 2
    


