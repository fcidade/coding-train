import world from './world.js'

export default class Apple {
    constructor() {
        this.reset()
    }
    reset(){
        this.x = round(random(0, world.width - 1))
        this.y = round(random(0, world.height - 1))
    }
    show(){
        fill(200, 10, 10)
        rect(this.x * world.blockSize, this.y * world.blockSize, world.blockSize, world.blockSize)
    }
}