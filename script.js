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

let allFoods = [watermelon, spinach, potatoChip, twinkie]

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

const foodFalling = () => {
        for(i = 0; i < 4; i++) {
            allFoods[i].y += 10
        }
    }

const watermelonDetectHit = () => {
    if(
        player.x < watermelon.x + watermelon.width &&
        player.x + player.width > watermelon.x &&
        player.y < watermelon.y + watermelon.height &&
        player.y + player.height > watermelon.y)
        {
            watermelon.alive = false
            document.querySelector('#top-right> h2').innerText="+10"
        }
    }

    const spinachDetectHit = () => {
        if(
            player.x < spinach.x + spinach.width &&
            player.x + player.width > spinach.x &&
            player.y < spinach.y + spinach.height &&
            player.y + player.height > spinach.y)
        {
            spinach.alive = false
            document.querySelector('#top-right> h2').innerText='+20' 
        }
    }

    const potatoChipDetectHit = () => {
        if(
            player.x < potatoChip.x + potatoChip.width &&
            player.x + player.width > potatoChip.x &&
            player.y < potatoChip.y + potatoChip.height &&
            player.y + player.height > potatoChip.y)
        {
            potatoChip.alive = false
            document.querySelector('#top-right> h2').innerText='-20' 
        }
    }

    const twinkieDetectHit = () => {
        if(
            player.x < twinkie.x + twinkie.width &&
            player.x + player.width > twinkie.x &&
            player.y < twinkie.y + twinkie.height &&
            player.y + player.height > twinkie.y)
        {
            twinkie.alive = false
            document.querySelector('#top-right> h2').innerText='-20' 
        }
    }
    

// const foodSpawn = () => {
//     for(i = 0; i < 4; i++) {
//         if(allFoods.alive = false) {
//         allFoods[i].x = Math.floor(Math.random())
//         x++
//     }
//     foodSpawn()
// }


const gameLoop = () => {
        //clear canvas for the animation loop to start again
        ctx.clearRect(0,0, game.width, game.height)
        for(i = 0; i < 4; i++) {
            allFoods[i].render()
        }
        foodFalling()
        watermelonDetectHit()
        spinachDetectHit()
        twinkieDetectHit()
        potatoChipDetectHit()
        player.render()

    }

//     const foodFalling = () => {
//         // / //clear canvas for the animation loop to start again
//            ctx.clearRect(0, 0, game.width, game.height)
           
// }


//set up game loop function, declaring what happens when our game is running 
let gameStop = () => {clearInterval(gameInterval)}
//add event listener after gameStop which is clear Interval
document.addEventListener('keydown', keysToMove)
//the timing function will determing how and when our game animates
let gameInterval = setInterval(gameLoop, 75)
// let newFoodSpawn = setInterval(foodSpawn, 10)}







// // we are making a supermarket shopping game
// //the point of the game is for the player to gain points by collision or lose points by collision
// // we will have three elements, player, good points, bad points
// //the player can move from right to left
// //the player can lose all points and lose or last for at least 40 seconds

// //Set up canvas
// const game = document.getElementById('canvas')
// //set up points tracker tracker

// //we're going to set up width and height variables
// //that means we are going to use setAttribute together with get computed Style
// game.setAttribute('width', getComputedStyle(game)['width'])
// game.setAttribute('height', getComputedStyle(game)['height'])
// // console.log('current game width', game.width)
// // console.log('current game height', game.height)
// //now we need to get the games contect so we can add to it, draw on it, create animations 
// //we do this with the built in canvas methos, getContext
// const ctx = game.getContext('2d')

// // we're going to follow some sort of basic Object Oriented Programming 'rules' to build an interactive game 
// // we'll create objects for our player 
// var load;

// let startButton = document.getElementById('startGame') 

// function Shopper (x, y, color, width, height) {
//     this.x = x
//     this.y = y
//     this.color = color
//     this.width = width
//     this.height = height
//     this.alive = true
//     this.draw = function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// let player = new Shopper((380), 410,'#113CFC', 40, 30)    

// function Food (x, y, vx, vy, color, width, height) {
//     this.x = x//Math.random()* game.width
//     this.y = y
//     this.vx = vx
//     this.vy = vy
//     this.color = color
//     this.width = width
//     this.height = height
//     this.alive = true
//     this.draw = function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.vx, this.vy, this.width, this.height)
//     }
//     // this.update = function () {
//     //     this.y -= this.vy
//     //     this.draw()
//     // }
// }
//     console.log(Food)
//     // console.log('hey', 'this.Food')
//     let watermelon = new Food ((110), 0, 5, 0, '#FF5C58', 20, 20)
//     let spinach = new Food ((290), 0, 5, 0, '#125C13', 20, 20)
//     let potatoChip = new Food ((470), 0, 5, 0, '#C36A2D', 20, 20)
//     let twinkie = new Food ((640), 0, 5, 0, '#F4A442', 20, 20)

// //we'll give them their own 'draw methods to place them on the canvas

// let allFoods = [watermelon, spinach, potatoChip, twinkie]
// // console.log(foods)
// if (watermelon.alive) {
//     watermelon.draw()
//     // allFoods[0]++
//     spinach.draw();
//     potatoChip.draw();
//     twinkie.draw();
// }
// player.draw()

// // const foodFalling = () => {
// //     //clear canvas for the animation loop to start again
// //     ctx.clearRect(0, 0, game.width, game.height)
// //     if (watermelon.alive) {
// //         watermelon.draw()
// //         // allFoods[0]++
// //         spinach.draw();
// //         potatoChip.draw();
// //         twinkie.draw();
// //     }
// //     player.draw()
// //     //I want to run the loop with the foods for each food item
// //     allFoods.update()
// // }
// // let gameInterval = setInterval(foodFalling, 10000)

// startButton.addEventListener('click', function(e) {
//     window.requestAnimationFrame(foodFalling);
// });

// //we have to establish a key movement with keyboard before the looop
// const keysToMove = (e) => {
//     switch (e.keyCode) {
//         case (65):
//         player.x -= 50
//         break
//         case(68):
//         player.x += 50
//         break
//     }
// }

// // set up game loop to be used in our timing functions)

// //     let y = 0
// // // const gameLoop = () => {
// //     game.requestAnimationFrame(function loop() {
// //     y += 10
// //     ctx.clearRect(0,0,game.width, game.height)
// //     watermelon.render()
// //     spinach.render()
// //     potatoChip.render()
// //     twinkie.render()
// //     game.requestAnimationFrame(loop)
// //     console.log('loop', )
// // })

// // document.addEventListener('keydown', keysToMove)

       

// //set up game loop function, declaring what happens when our game is running 
// // let gameStop = () => {clearInterval(gameInterval)}
// // //add event listener after gameStop which is clear Interval

// // //the timing function will determing how and when our game animates
// // let gameInterval = setInterval(gameLoop, 50)

// // let foodMovement = () => {
// //     if(foods.alive) {
// //     for (i = 0; i < foods.length; i++)
// //         foods.y += Math.random() * 2
// //         foods.x += Math.random() * 2
    
//     // let foodInterval = setInterval(foodMovement, 2000)
//     // if (watermelon.alive) {
//     //     watermelon.draw();
//     //     spinach.draw();
//     //     potatoChip.draw();
//     //     twinkie.draw();
//     // }
//     // player.draw()

// set up game loop to be used in our timing functions)

// let y = 0
// // const gameLoop = () => {
//     window.requestAnimationFrame(function loop() {
//     y += 10
//     // ctx.clearRect(0,0,game.width, game.height)
//     watermelon.render()
//     spinach.render()
//     potatoChip.render()
//     twinkie.render()
//     window.requestAnimationFrame(loop)
    
// })


