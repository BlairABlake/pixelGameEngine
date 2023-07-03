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
     * @param {number} z 
     */
    add(v, z) {
        this.objects.insert(v, z)
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