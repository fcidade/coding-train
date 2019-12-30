import world from './world.js'
import Snake from './Snake.js'
import Apple from './Apple.js'

let player
let apple

function update() {
    player.update()
    player.checkCollision(apple)
    setTimeout(update, world.gameSpeed * 1000)
}

window.setup = () => {
    createCanvas(640, 480);
    player = new Snake()
    apple = new Apple()

    setTimeout(update, 500)
}

window.draw = () => {
    background(10)

    noFill()
    strokeWeight(2)
    stroke(245)
    rect(0, 0, world.width * world.blockSize, world.height * world.blockSize)

    apple.show()
    player.show()
}