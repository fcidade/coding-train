class Box {
    constructor(x = 0, y = 0, z = 0, deep = 1, r=250) {
        this.children = []
        this.pos = createVector(x, y, z)
        this.deep = deep || 1
        this.radius = r

        if (this.deep <= 2) {
            setTimeout(() => this.activate(), 1000)
        }
    }
    activate() {
        if (this.children.length) return

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    // If two axis are 0, ignore the block
                    if (abs(x) + abs(y) + abs(z) <= 1)
                        continue;
                    const nr = this.radius/3
                    const nx = this.pos.x + (x * nr)
                    const ny = this.pos.y + (y * nr)
                    const nz = this.pos.z + (z * nr)
                    const nb = new Box(nx, ny, nz, this.deep + 1, nr)
                    this.children.push(nb)
                }
            }
        }
    }
    draw() {

        if (this.children.length) {
            this.children.forEach(b => b.draw())
        } else {
            const { x, y, z } = this.pos

            push()
            translate(x, y, z)
            const r = map(x, -75, 75, 33, 245)
            const g = map(y, -75, 75, 33, 245)
            const b = map(z, -75, 75, 33, 245)
            fill(r, g, b)
            box(this.radius)
            pop()
        }
    }
}

let boxParent = null
let count = 0

window.setup = () => {
    createCanvas(640, 480, WEBGL)
    boxParent = new Box()
}

window.draw = () => {
    count += deltaTime * .001

    background(100)
    rotateX(count)
    rotateZ(count + Math.PI / 4)
    boxParent.draw()
}