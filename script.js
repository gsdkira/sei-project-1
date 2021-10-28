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
let player = new Shopper(380, 410, '#113CFC', 40, 30)

let gameScore = 50
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
        let watermelon = new Food(Math.random()* game.width, 0, "red", 20, 20)
        let spinach = new Food(Math.random() * game.width, 0, '#125C13', 20, 20)
        let potatoChip = new Food(Math.random() * game.width, 0, 'white', 20, 20)
        let twinkie = new Food(Math.random() * game.width, 0, '#F4A442', 20, 20)
        // console.log('this is the new food', watermelon)
        allFoods.push(watermelon)
        allFoods.push(spinach)
        allFoods.push(potatoChip)
        allFoods.push(twinkie)
    }
    // console.log('j loop')
}
// Math.random() * 700) +100)

let thingDetectHit = (item) => {
    if (
        player.x < item.x + item.width &&
        player.x + player.width > item.x &&
        player.y < item.y + item.height &&
        player.y + player.height > item.y) {
            item.alive = false
        document.querySelector('#top-right> h2').innerText = "+12"
        gameScore += gamePoints
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

//Detect hit collision for watermelon
// let watermelonDetectHit = () => {
//     if (
//         player.x < allFoods[0].x + allFoods[0].width &&
//         player.x + player.width > allFoods[0].x &&
//         player.y < allFoods[0].y + allFoods[0].height &&
//         player.y + player.height > allFoods[0].y) {
//         allFoods[0].alive = false
//         document.querySelector('#top-right> h2').innerText = "+12"
//         gameScore += gamePoints
//     }
// }
//Detect hit collision for spinach
// let spinachDetectHit = () => {
//     if (
//         player.x < allFoods[1].x + allFoods[1].width &&
//         player.x + player.width > allFoods[1].x &&
//         player.y < allFoods[1].y + allFoods[1].height &&
//         player.y + player.height > allFoods[1].y) {
//         allFoods[1].alive = false
//         document.querySelector('#top-right> h2').innerText = '+12'
//         gameScore += gamePoints
//     }
// }
//Detect hit collision for potatoChip
// let potatoChipDetectHit = () => {
//     if (
//         player.x < allFoods[2].x + allFoods[2].width &&
//         player.x + player.width > allFoods[2].x &&
//         player.y < allFoods[2].y + allFoods[2].height &&
//         player.y + player.height > allFoods[2].y) {
//         allFoods[2].alive = false
//         document.querySelector('#top-right> h2').innerText = '-12'
//         gameScore -= gamePoints
//     }
// }
// //Detect hit collision for twinkie
// let twinkieDetectHit = () => {
//     if (
//         player.x < allFoods[3].x + allFoods[3].width &&
//         player.x + player.width > allFoods[3].x &&
//         player.y < allFoods[3].y + allFoods[3].height &&
//         player.y + player.height > allFoods[3].y) {
//         allFoods[3].alive = false
//         document.querySelector('#top-right> h2').innerText = '-12'
//         gameScore -= gamePoints
//     }
// }

let heartAttack = () => {
    if (gameScore < 1) {
        player.alive = false
        document.querySelector('#btm-right > h2').innerText = 'You had a heart attack!'
    }
}

//draw a score board to track points
function drawScore() {
    ctx.font = "24px Arial";
    ctx.fillStyle = '#FF5C58';
    ctx.fillText("Score: " + gameScore, 650, 30)
}

const startGame = () => {
    const spawnFood = setInterval(addFood, 3000)

}
//gameLoop for the game
const gameLoop = () => {
    //clear canvas for the animation loop to start again
    ctx.clearRect(0, 0, game.width, game.height)
    // for(i = 0; i < 4; i++) {
    //     allFoods[i].render()
    // }
    player.render()
    renderFood()
    // addFood()
    foodFalling()
    foodHitDetect()
    // watermelonDetectHit()
    // spinachDetectHit()
    // twinkieDetectHit()
    // potatoChipDetectHit()
    heartAttack()
    drawScore()
}


//key movement event listener
document.addEventListener('keydown', keysToMove)
//the timing function will determing how and when our game animates
let gameInterval = setInterval(gameLoop, 80)

startGame()








// let gameEndMsg = () => {
    //     if (gameEnd == true) {
    //         document.querySelector('btm-right > h2').innerText = 'Great Job, You survived!'
    //         gameEnd()

    //     }
    // }

// //set up game loop function, declaring what happens when our game is running 
// // let gameStop = () => {clearInterval(gameInterval)}
// // //add event listener after gameStop which is clear Interval




