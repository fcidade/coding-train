import world from './world.js'

export default class Snake {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = round(world.width / 2)
        this.y = round(world.height / 2)
        this.dirX = 0
        this.dirY = 0
        this.tails = []

        this.points = 0
    }
    input() {
        if (keyCode == LEFT_ARROW && this.dirX === 0) {
            this.dirX = -1
            this.dirY = 0
        }
        else if (keyCode == RIGHT_ARROW && this.dirX === 0) {
            this.dirX = 1
            this.dirY = 0
        }
        else if (keyCode == UP_ARROW && this.dirY === 0) {
            this.dirX = 0
            this.dirY = -1
        }
        else if (keyCode == DOWN_ARROW && this.dirY === 0) {
            this.dirX = 0
            this.dirY = 1
        }
    }
    checkCollision(apple) {
        if (this.x === apple.x && this.y === apple.y) {
            this.points++
            this.addTail()
            apple.reset()
        }
    }
    addTail() {
        this.tails.push({ x: this.x, y: this.y })
    }
    checkSuicide() {
        this.tails.forEach(tail => {
            if (this.x === tail.x && this.y === tail.y) {
                this.reset()
            }
        })
    }
    updateTails() {
        for (let i = this.tails.length - 1; i >= 0; i--) {
            const targetTail = this.tails[i - 1]
            if (!targetTail) {
                this.tails[i] = { x: this.x, y: this.y }
            } else {
                this.tails[i] = targetTail
            }
        }
    }
    update() {
        this.input()

        this.updateTails()

        this.x += this.dirX
        this.y += this.dirY

        this.checkSuicide()

        if (this.x >= world.width) this.x = 0
        else if (this.x < 0) this.x = world.width - 1
        if (this.y >= world.height) this.y = 0
        else if (this.y < 0) this.y = world.height - 1
    }
    show() {
        fill(245)
        this.drawBox(this.x, this.y)

        this.tails.forEach((tail, i) => {
            fill(map(i, 0, this.tails.length, 255, 0))
            this.drawBox(tail.x, tail.y)
        })
    }
    drawBox(x, y) {
        rect(x * world.blockSize,
            y * world.blockSize,
            world.blockSize,
            world.blockSize
        )
    }
}