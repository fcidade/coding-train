import Game from './Game.js'
import {SPRITESHEET} from './config.js'
import {sprite, isColliding} from './utils.js'

export default class Alien{
    constructor(i=0, j=0){
        this.sprite = SPRITESHEET.img.alien1
        this.x = i * this.sprite.w + 10
        this.y = j * this.sprite.w
        this.alive = true
    }
    die(){
        this.alive = false
    }
    update(){
        if(!this.alive) return
        Game.player.bullets.forEach(bullet => {
            const alienBox = {
                x: this.x,
                y: this.y,
                w: this.sprite.w,
                h: this.sprite.h,
            }
            const bulletBox = {
                x: bullet.x,
                y: bullet.y,
                w: bullet.sprite.w,
                h: bullet.sprite.h,
            }

            if(isColliding(alienBox, bulletBox)){
                console.log('colidiu')
                this.die()
            }
        })
    }
    show(){
        if(!this.alive) return
        sprite(this.sprite, this.x, this.y)
    }
}