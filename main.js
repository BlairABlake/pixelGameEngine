const canvas = new PixelCanvas("canvas", 10, 10, true)
const renderer = new PixelRenderer(canvas)

const scene = new SampleScene(renderer)
const engine = new Engine(scene, 60)

engine.setUp()
engine.run()