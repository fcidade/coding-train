import { Spritesheet, SPRITESHEET } from './config.js'
import Game from './Game.js'
import Player from './Player.js'
import Alien from './Alien.js'

const aliens = []
window.setup = () => {
    createCanvas(128, 128);
    noSmooth()
    Spritesheet.img = loadImage(SPRITESHEET.file)
    Game.player = new Player()

    const rows = 7
    const columns = width / 10
    for (let i = 0; i < columns; i += 1) {
        for (let j = 0; j < rows; j += 1.5) {
            aliens.push(new Alien(i, j))
        }
    }
}

window.draw = () => {
    aliens.forEach(alien => alien.update())
    Game.player.update()

    background(10)

    aliens.forEach(alien => alien.show())
    Game.player.show()
}
