import { SPRITESHEET } from './config.js'
import { sprite, isColliding } from './utils.js'

class Bullet {
    constructor(x, y) {
        this.sprite = SPRITESHEET.img.bullet
        this.x = x
        this.y = y
        this.diry = -1
        this.speed = 1
    }
    update(){
        this.y += this.diry * this.speed
    }
    show() {
        sprite(this.sprite, this.x, this.y)
    }
}

export default class Player {
    constructor() {
        this.sprite = SPRITESHEET.img.player
        this.x = width / 2 - this.sprite.w / 2
        this.y = height - 8 * 2
        this.dirx = 0
        this.speed = .1
        this.shootInterval = 2000 // in ms

        this.bullets = []
        this.shootingTimer = setTimeout(this.shoot.bind(this), this.shootInterval)
    }
    shoot() {
        const nb = new Bullet(this.x + this.sprite.w / 3, this.y)
        this.bullets.push(nb)
        this.shootingTimer = setTimeout(this.shoot.bind(this), this.shootInterval)
    }
    input() {
        this.dirx = 0
        if (keyIsDown(LEFT_ARROW))
            this.dirx = -1
        else if (keyIsDown(RIGHT_ARROW))
            this.dirx = 1
    }
    update() {
        this.input()

        this.x += this.dirx * this.speed * deltaTime
        if (this.x < 0) this.x = 0
        else if (this.x > width - this.sprite.w) this.x = width - this.sprite.w

        this.bullets.forEach(bullet => bullet.update())

    }
    show() {
        sprite(this.sprite, this.x, this.y)
        this.bullets.forEach(bullet => bullet.show())
    }
}