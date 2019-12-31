const pos = (x, y, w, h) => ({ x, y, w, h })

export const SPRITESHEET = {
    file: 'assets/space_invaders.png',
    img: {
        alien1: pos(0, 0, 8, 8),
        alien2: pos(8, 0, 8, 8),
        alien3: pos(16, 0, 8, 8),
        alienBig: pos(24, 0, 24, 8),
        player: pos(0, 8, 24, 8),
        bullet: pos(24, 8, 8, 8),
    }
}

export class Spritesheet {
    _img = null
    set img(a) {
        this._img = a
    }
    get img() { return this._img }
}