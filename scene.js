/**
 * A Scene is a fundamental unit of a view.
 * We can switch the scenes, but one canvas can render at most one scene
 */
class Scene {
    /**
     * 
     * @param {PixelRenderer} renderer
     */
    constructor(renderer) {
        this.renderer = renderer
    }

    update() {

    }

    _update() {
        this.renderer.clearCanvas()
        this.update()
        this.renderer.render()
    }
}

class SampleScene extends Scene {
    /**
     * 
     * @param {PixelRender} renderer
     */
    constructor(renderer) {
        super(renderer)
        this.pixelGroup = new PixelGroup(new Vec3D(1, 1, 1), new Heap())
        this.pixelGroup = this.pixelGroup
                            .add(new Pixel(new Vec3D(0, 0, 1), new Color("#000000")))
                            .add(new Pixel(new Vec3D(1, 0, 1), new Color("#000000")))
                            .add(new Pixel(new Vec3D(2, 0, 1), new Color("#000000")))
                            .add(new Pixel(new Vec3D(3, 0, 1), new Color("#000000")))
                            .add(new Pixel(new Vec3D(4, 0, 1), new Color("#000000")))
    }

    update() {
        this.renderer.clearPixels()
        this.renderer.clearPixelGroups()
        if (Engine.isKeyPressed[65]) this.pixelGroup = this.pixelGroup.translate(new Vec2D(-1, 0))
        if (Engine.isKeyPressed[68]) this.pixelGroup = this.pixelGroup.translate(new Vec2D(1, 0))
        this.renderer.addPixelGroup(this.pixelGroup)
    }
}