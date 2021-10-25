// we are making a supermarket shopping game
//the point of the game is for the player to gain points by collision or lose points by collision
// we will have three elements, player, good points, bad points
//the player can move from right to left
//the player can lose all points and lose or last for at least 40 seconds

//Set up canvas
const game = document.getElementById('canvas')
//set up points tracker tracker

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
// we'll create objects for our player and our ogre
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
    
function Food (x, y, color, width, height) {
    this.x = Math.random()* game.width
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

// set up game loop to be used in our timing functions)

let y = 0
// const gameLoop = () => {
    window.requestAnimationFrame(function loop() {
    y += 10
    // ctx.clearRect(0,0,game.width, game.height)
    watermelon.render()
    spinach.render()
    potatoChip.render()
    twinkie.render()
    window.requestAnimationFrame(loop)
    console.log('loop', loop)
})

const gameLoop = () => {
        //clear canvas for the animation loop to start again
        ctx.clearRect(0,0, game.width, game.height)
        if (watermelon.alive) {
            watermelon.render();
            spinach.render();
            potatoChip.render();
            twinkie.render();
        }
        player.render()
    }

//set up game loop function, declaring what happens when our game is running 
let gameStop = () => {clearInterval(gameInterval)}
//add event listener after gameStop which is clear Interval
document.addEventListener('keydown', keysToMove)
//the timing function will determing how and when our game animates
let gameInterval = setInterval(gameLoop, 50)

// let foodMovement = () => {
//     if(foods.alive) {
//     for (i = 0; i < foods.length; i++)
//         foods.y += Math.random() * 2
//         foods.x += Math.random() * 2
    
    // let foodInterval = setInterval(foodMovement, 2000)

