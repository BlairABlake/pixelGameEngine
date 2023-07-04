/**
 * This class is neither subclass nor abstract class because this library is dedicated to rendering pixels
 */
class PixelCanvas {
    /**
     * 
     * @param {number} id 
     * @param {number} grid_width 
     * @param {number} grid_height 
     * @param {boolean} show_grid
     */
    constructor(id, grid_size, show_grid) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext("2d")
        this.grid_size = grid_size
        this.show_grid = show_grid
        this.width = this.canvas.width
        this.height = this.canvas.height

        if(this.canvas == null) {
            throw Error("canvas not found")
        }
    }

    /**
     * 
     * @param {Pixel} pixel 
     */
    renderPixel(pixel) {
        this.ctx.fillStyle = pixel.color.colorHex
        this.ctx.fillRect(pixel.origin.x * this.grid_size, pixel.origin.y * this.grid_size, this.grid_size, this.grid_size)
    }

    clearRender() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    clear() {
        this.clearCanvas()
        this.clearPixels()
    }
}

/**
 * PixelRenderer is what render pixels onto a PixelCanvas
 * PixelRenderer also map the pixelGroups to pixels
 * 
 * This class is neither subclass nor abstract class because this library is dedicated to rendering pixels
 */
class PixelRenderer {
    /**
     * 
     * @param {PixelCanvas} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas
        this.pixels = new Heap(true) //The parameter reverse is set to true since pixels with higher z index should be rendered later.
        this.pixelGroups = new Heap()
    }

    /**
     * 
     * @param {Pixel} pixel 
     */
    setPixel(pixel) {
        this.pixels.insert(pixel, pixel.origin.z)
    }

    /**
     * 
     * @param {PixelGroup} pixelGroup 
     */
    setPixelGroup(pixelGroup) {
        this.pixelGroups.insert(pixelGroup, pixelGroup.origin.z)
    }

    render() {
        // Mapping pixelGroups into pixels
        this.pixelGroups.forEach((pixelGroup, z) => {
            pixelGroup.toPixels().forEach((pixel, _z) => {
                pixel.origin.z = z + _z
                this.setPixel(pixel)
            })
        })

        this.pixels.forEach((pixel, _) => {
            this.canvas.renderPixel(pixel)
            console.log(pixel)
        })
    }

    clearPixels() {
        this.canvas.clearPixels()
    }

    clearPixelGroups() {
        this.canvas.clearPixelGroups()
    }

    clearRender() {
        this.canvas.clearRender()
    }
}