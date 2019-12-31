import { Spritesheet } from './config.js'

export function sprite(sptr, dx, dy) {
    const { x, y, w, h } = sptr
    image(Spritesheet.img, dx, dy, w, h, x, y, w, h)
}

export function isColliding(boxA, boxB) {
    const { x: leftA, y: topA } = boxA
    const rightA = boxA.x + boxA.w
    const bottomA = boxA.y + boxA.h

    const { x: leftB, y: topB } = boxB
    const rightB = boxB.x + boxB.w
    const bottomB = boxB.y + boxB.h

    return ((leftB >= leftA && leftB <= rightA)
        && (topB >= topA && topB <= bottomA))
        || ((rightB >= leftA && rightB <= rightA)
        && (bottomB >= topA && bottomB <= bottomA))
}