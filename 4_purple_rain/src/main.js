class Drops {
    constructor() {
        this.x = random(0, width)
        this.y = -random(0, -height)
        this.z = random(0, 5)
        this.size = 10 * this.z
        this.speed = .2 * this.z
    }
    update() {
        this.y += this.speed * deltaTime
        if (this.y > height) this.y = -this.size
    }
    show() {
        stroke(145, 109, 213, map(this.z, 0, 5, 255, 150))
        strokeWeight(this.z * .7)
        line(this.x, this.y, this.x, this.y + this.size)
    }
}

const drops = []

window.setup = () => {
    createCanvas(640, 480);
    for (let i = 0; i < 1000; i += 1) {
        drops.push(new Drops())
    }
}

window.draw = () => {
    drops.forEach(drop => drop.update())

    background('#f0e3ff')
    drops.forEach(drop => drop.show())
}