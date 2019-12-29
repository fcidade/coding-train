class Box {
    constructor(x = 0, y = 0, z = 0, parentPos = null, deep = 1) {
        this.children = []
        this.pos = createVector(x, y, z)
        this.parentPos = parentPos || createVector(0);
        this.deep = deep || 1

        if (this.deep <= 2) {
            setTimeout(() => this.activate(), 2000)
        }
    }
    activate() {
        if (this.children.length) return

        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {
                    // If two axis are 0, ignore the block
                    if ((x == 0 && y == 0) ||
                        (x == 0 && z == 0) ||
                        (y == 0 && z == 0))
                        continue;

                    this.children.push(new Box(x, y, z, this.pos, this.deep + 1))
                }
            }
        }
    }
    draw() {

        if (this.children.length) {
            this.children.forEach(b => b.draw())
        } else {
            const sz = 200 / (this.deep * this.deep)

            const { x, y, z } = this.pos
            const { x: px, y: py, z: pz } = this.parentPos

            push()
            translate(x * sz + (px * sz) * (this.deep), y * sz + (py * sz) * (this.deep), z * sz + (pz * sz) * (this.deep))

            const r = map(x, -1, 1, 33, 245)
            const g = map(y, -1, 1, 33, 245)
            const b = map(z, -1, 1, 33, 245)
            fill(r, g, b)
            box(sz)
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