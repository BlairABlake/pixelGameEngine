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

class Pixel extends Pair {
    constructor(x, y, color) {
        super(x, y)
        this.color = color
    }
}

class DiscreteCanvas {
    constructor(id, grid_width, grid_height) {
        this.canvas = document.getElementById(id)
        this.ctx = this.canvas.getContext("2d");
        this.grid_width = grid_width
        this.grid_height = grid_height
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.pixels = new PriorityQueue(true)

        if(this.canvas == null) {
            throw Error("canvas not found")
        }
    }

    setPixel(x, y, z, color) {
        this.pixels.insert(new Pixel(x, y, color), z)
    }

    /**
     * 
     * @param {Pixel} pixel 
     */
    renderPixel(pixel) {
        this.ctx.fillStyle = pixel.color.colorHex
        this.ctx.fillRect(pixel.x * this.grid_width, pixel.y * this.grid_height, this.grid_width, this.grid_height)
    }

    render() {
        this.pixels.foreach(pixel => this.renderPixel(pixel))
    }
}