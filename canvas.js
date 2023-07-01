class Color {
    constructor(colorHex) {
        this.colorHex = colorHex
    }

    static rgb(r, g, b) {
        return new Color(rgbToHex(r, g, b))
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
      
    rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
}

class Canvas {
    constructor(id) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext("2d");
    }

    render() {}
    clearCanvas() {}
}


/**
 * Basically this class render all the pixels in a priority queue, pixels.
 * Bunch of pixels can be grouped into a PixelGroup, and stored in objects.
 * Pixels in a PixelGroup will be mapped to pixels and then rendered.
 * 
 * Both single Pixel and a PixelGroup must have a z index.
 * Pixels with greater z index will be rendered.
 */
class DiscreteCanvas extends Canvas {
    /**
     * 
     * @param {number} id 
     * @param {number} grid_width 
     * @param {number} grid_height 
     */
    constructor(id, grid_width, grid_height) {
        super(id)
        this.grid_width = grid_width
        this.grid_height = grid_height
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.pixels = new Heap(true) //priority queue of pixles
        this.pixelGroups = new Heap(true) //priority queue of pixel groups

        if(this.canvas == null) {
            throw Error("canvas not found")
        }
    }

    addPixelGroup(pixelGroup, z) {
        this.pixelGroups.insert(pixelGroup, z)
    }

    setPixel(pixel, z) {
        this.pixels.insert(pixel, z)
    }

    /**
     * 
     * @param {Pixel} pixel 
     */
    renderPixel(pixel) {
        this.ctx.fillStyle = pixel.color.colorHex
        this.ctx.fillRect(pixel.origin.x * this.grid_width, pixel.origin.y * this.grid_height, this.grid_width, this.grid_height)
    }

    render() {
        this.pixelGroups.forEach((pixelGroup, z) => {
            pixelGroup.toPixels().forEach((pixel, _z) => this.setPixel(pixel, z+_z))
        })

        this.pixels.forEach((pixel, _) => this.renderPixel(pixel))
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    clearPixels() {
        this.pixels = new Heap(true)
    }

    clearPixelGroups() {
        this.pixelGroups = new Heap(true)
    }

    clear() {
        this.clearCanvas()
        this.clearPixels()
    }
}