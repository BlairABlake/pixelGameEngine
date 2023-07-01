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
    }

    update() {
        this.canvas.clearPixels()

        for(let i=0; i < 100; i++) {
            let x = randint(100)
            let y = randint(100)
            this.canvas.setPixel(x, y, 10, "#ffffff")
        }
    }
}