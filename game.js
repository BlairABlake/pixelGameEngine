class Game {
    /**
     * 
     * @param {Canvas} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas
    }

    update() {

    }

    _update() {
        this.canvas.clear()
        this.update()
        this.canvas.render()
    }
}

class SampleGame extends Game {
    /**
     * 
     * @param {DiscreteCanvas} canvas 
     */
    constructor(canvas) {
        super(canvas)

        this.canvas.setPixel(1, 1, 10, new Color("#000000"))
        this.canvas.setPixel(2, 1, 10, new Color("#000000"))
        this.canvas.setPixel(3, 1, 10, new Color("#000000"))
    }

    update() {
    }
}