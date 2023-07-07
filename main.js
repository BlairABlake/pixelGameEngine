const canvas = new PixelCanvas("canvas", 10, 10, true)
const renderer = new PixelRenderer(canvas)

const camera = new Camera(new Vec2D(1, 1))
const scene = new SampleScene(renderer)
const engine = new Engine(camera, scene, 60)

engine.setUp()
engine.run()