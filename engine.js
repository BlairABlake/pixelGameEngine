const c = new DiscreteCanvas("canvas", 10, 10)
c.setPixel(1, 1, 10, new Color("#000000"))
c.setPixel(2, 1, 10, new Color("#000000"))
c.setPixel(3, 1, 10, new Color("#000000"))
c.setPixel(1, 2, 10, new Color("#000000"))
c.setPixel(2, 2, 9, new Color("#000000"))
c.setPixel(2, 2, 10, new Color("#ffffff"))
c.setPixel(3, 2, 10, new Color("#000000"))
c.render()