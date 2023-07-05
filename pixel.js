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

class Pixel extends Transformable {
    /**
     * 
     * @param {Vec3D} origin 
     * @param {Color} color 
     */
    constructor(origin, color) {
        super()
        this.color = color
        this.origin = origin
    }

    get x() {
        return this.origin.x
    }

    get y() {
        return this.origin.y
    }

    get z() {
        return this.origin.z
    }

    translate(v) {
        return new Pixel(this.origin.add(v), this.color)
    }
}

/**
 * Container for a bunch of pixels
 * Coordinates of pixels are relative to the origin
 */
class PixelGroup extends Transformable {
    /**
     * 
     * @param {Vec3D} origin 
     * @param {Heap} objects
     */
    constructor(origin, objects) {
        super()
        this.origin = origin
        this.objects = objects
    }

    /**
     * 
     * @param {Pixel|PixelGroup} v 
     * @returns {PixelGroup} return the reference to this object so you can chain methods
     */
    add(v) {
        this.objects.insert(v, v.origin.z)
        return this
    }

    /**
     * This method return priority queue of pixels after translation
     */
    toPixels() {
        let xs = this.objects.flatMap((v, z) => {
            if (v instanceof PixelGroup) return v.toPixels().map((e, _z) => new PriorityQueueElement(e, z + _z))
            else if (v instanceof Pixel) return new PriorityQueueElement(v.translate(this.origin), z)
        })
        let heap = new Heap(true)
        heap.xs = xs
        return heap
    }

    translate(v) {
        return new PixelGroup(this.origin.add(v), this.objects)
    }
}