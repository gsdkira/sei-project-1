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
function Shopper(x, y, color, width, height) {
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
function Food(x, y, color, width, height) {
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
let player = new Shopper(380, 410, '#113CFC', 60, 30)

let gameScore = 120
let gamePoints = 3


//we have to establish a key movement with keyboard before the looop
const keysToMove = (e) => {
    switch (e.keyCode) {
        case (65):
            player.x -= 50
            break
        case (68):
            player.x += 50
            break
    }
}

const allFoods = []
function addFood() {
    // console.log('addFood')
    for (let i = 0; i <= 5; i++) {
        // console.log('for loop')
        let candy = new Food(Math.random()* game.width, 0, "red", 20, 20)
        let donuts = new Food(Math.random() * game.width, 0, '#FFC0CB', 20, 20)
        let potatoChip = new Food(Math.random() * game.width, 0, 'white', 20, 20)
        let twinkie = new Food(Math.random() * game.width, 0, '#F4A442', 20, 20)
        // console.log('this is the new food', watermelon)
        allFoods.push(candy)
        allFoods.push(donuts)
        allFoods.push(potatoChip)
        allFoods.push(twinkie)
    }
    // console.log('j loop')
}

const thingDetectHit = (item) => {
    if (
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y) {
            item.alive = false
        document.querySelector('#top-right> h2').innerText = "-12"
        gameScore -= gamePoints
    }
}

const foodFalling = () => {
    for (let i = 0; i < allFoods.length; i++) {
        allFoods[i].y += 10
    }
    // console.log(foodFalling)
}

const renderFood = () => {
    for (let j = 0; j < allFoods.length; j++) {
        allFoods[j].render()
        // allFoods[j].y += 10
    }
}

const foodHitDetect = () => {
    for (let i = 0; i < allFoods.length; i++){
        thingDetectHit(allFoods[i])
    }
}

const heartAttack = () => {
    if (gameScore < 1) {
        player.alive = false
        document.querySelector('#btm-right > h2').innerText = 'You had a heart attack!'
        clearInterval(gameInterval)
    }
}

//draw a score board to track points
function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = '#FF5C58';
    ctx.fillText("Score: " + gameScore, 650, 30)
}

const startGame = () => {
    const spawnFood = setInterval(addFood, 2000)

}
//gameLoop for the game
const gameLoop = () => {
    //clear canvas for the animation loop to start again
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    renderFood()
    // addFood()
    foodFalling()
    foodHitDetect()
    heartAttack()
    drawScore()
}


//key movement event listener
document.addEventListener('keydown', keysToMove)
//the timing function will determing how and when our game animates
const gameInterval = setInterval(gameLoop, 80)
// let gameStop = () => {clearInterval(gameInterval)}


startGame()

const strButton = document.getElementById('startButton');





