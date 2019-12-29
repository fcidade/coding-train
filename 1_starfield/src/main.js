class Star {
    constructor(hasTail = false) {
        this.hasTail = hasTail
        this.reset()
    }
    reset() {
        this.angle = randomGaussian(0, Math.PI)

        this.speed = map(Math.random(), 0, 1, .5, 1)

        const distanceFromCenter = map(Math.random(), 0, 1, 50, 100)

        this.x = cos(this.angle) * distanceFromCenter
        this.y = sin(this.angle) * distanceFromCenter

        this.tailDistance = 1.5
        this.tx = this.x / this.tailDistance
        this.ty = this.y / this.tailDistance
    }
    update(speedFactor) {
        this.speed *= (speedFactor + 1)

        this.x += cos(this.angle) * this.speed * deltaTime
        this.y += sin(this.angle) * this.speed * deltaTime

        this.tx = this.x / this.tailDistance;
        this.ty = this.y / this.tailDistance;

        if (this.tx > width || this.tx < -width / 2
            || this.ty > width || this.ty < -height / 2)
            this.reset()
    }
    draw() {
        const distX = width / 2 - abs(this.x)
        const distY = height / 2 - abs(this.y)
        const distanceFactor = map(distX + distY, 0, width / 2 + height / 2, 255, 10)
        stroke(255, 255, 255, distanceFactor)
        if (this.hasTail) {
            strokeWeight(1)
            line(this.tx, this.ty, this.x, this.y)
        }
        else {
            strokeWeight(Math.random() * 3)
            point(this.x, this.y)
        }
    }
}

const stars = []
let speedSlider = null;

window.setup = () => {
    createCanvas(640, 480)
    speedSlider = createSlider(0, 2, .1, .01)

    for (let i = 0; i < 200; i++) {
        stars.push(new Star())
        stars.push(new Star(true))
    }
}

window.draw = () => {
    stars.forEach(star => star.update(speedSlider.value()))

    background(10)

    translate(width / 2, height / 2)
    stars.forEach(star => star.draw())
}