const game = document.getElementById('canvas')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
const ctx = game.getContext('2d')

//class for shopper
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
// class for food
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
//player
const player = new Shopper(380, 410, '#113CFC', 50, 30)

//game score starts at 120
let gameScore = 120
let gamePoints = 3

//key movement for player
const keysToMove = (e) => {
    switch (e.keyCode) {
        case (65):
            //move left
            player.x -= 50
            if(player.x <= 0) {
                player.x = 0
            }
            break
        case (68):
            player.x += 50
            if(player.x + player.width >= game.width) {
                player.x = game.width - player.width
            }
            break 
    }
}
//foods function
const allFoods = []
function addFood() {
    for (let i = 0; i <= 5; i++) {
        let candy = new Food(Math.random()* game.width, 0, "red", 20, 20)
        let donuts = new Food(Math.random() * game.width, 0, '#FFC0CB', 20, 20)
        let potatoChip = new Food(Math.random() * game.width, 0, 'white', 20, 20)
        let twinkie = new Food(Math.random() * game.width, 0, '#F4A442', 20, 20)
        allFoods.push(candy)
        allFoods.push(donuts)
        allFoods.push(potatoChip)
        allFoods.push(twinkie)
    }
}
//detect hit
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
//food falling
const foodFalling = () => {
    for (let i = 0; i < allFoods.length; i++) {
        allFoods[i].y += 10
    }
}
//renders the food
const renderFood = () => {
    for (let j = 0; j < allFoods.length; j++) {
        allFoods[j].render()
    }
}
//detect the food hit
const foodHitDetect = () => {
    for (let i = 0; i < allFoods.length; i++){
        thingDetectHit(allFoods[i])
    }
}
//heart attack message when you eat too much junkfood
const heartAttack = () => {
    if (gameScore < 1) {
        player.alive = false
        document.querySelector('#btm-right > h2').innerText = 'You lost. You had a heart attack!'
        clearInterval(gameInterval)
    }
}

//draw a score board to track points
function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = '#FF5C58';
    ctx.fillText("Score: " + gameScore, 650, 30)
}

//start game at 2 seconds
const startGame = () => {
    const spawnFood = setInterval(addFood, 2000)
    }

 //timeout function after 40 seconds declaring winner  
const timeOut = setTimeout(function(){
        clearInterval(gameInterval)
        document.querySelector('#btm-right > h2').innerText = 'You win, you made some healthy choices!'
    },40000)

//gameLoop for the game
const gameLoop = () => {
    //clear canvas for the animation loop to start again
    ctx.clearRect(0, 0, game.width, game.height)
    player.render()
    renderFood()
    foodFalling()
    foodHitDetect()
    heartAttack()
    drawScore()
}


//key movement event listener
document.addEventListener('keydown', keysToMove)
//the timing function will determing how and when our game animates
let gameInterval = setInterval(gameLoop, 80)

startGame()
//refresh button
function reload() {
    reload = location.reload();
}
reloadButton.addEventListener("click", reload, false);






