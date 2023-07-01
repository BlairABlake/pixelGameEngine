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
        this.canvas.clearCanvas()
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
        this.pixelGroup = new PixelGroup(new Vec2D(0, 0), new Heap(true))
        this.pixelGroup = this.pixelGroup
                            .add(new Pixel(new Vec2D(0, 0), new Color("#000000")), 0)
                            .add(new Pixel(new Vec2D(1, 0), new Color("#000000")), 0)
    }

    update() {
        this.canvas.clearPixels()
        this.canvas.clearPixelGroups()
        this.pixelGroup = this.pixelGroup.translate(new Vec2D(1, 0))
        this.canvas.addPixelGroup(this.pixelGroup, 0)
    }
}