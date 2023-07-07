class Time {
    constructor() {
        this.previousTime = Date.now()
    }

    /**
     * 
     * @returns {Date} return elapsed time
     */
    update() {
        let currentTime = Date.now()
        let elapsedTime = currentTime - this.previousTime
        this.previousTime = currentTime
        return elapsedTime
    }
}

/**
 * Engine manages all the sub components
 */
class Engine {
    static isKeyPressed = {}
    static Camera
    static Scene
    static Time

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(camera, scene, fps) {
        Engine.Camera = camera
        Engine.Scene = scene
        Engine.Time = new Time()

        this.isRunning = false
        this.fps = fps
        this.deltaTime = 1000 / this.fps
    }

    static onKeyDown(e) {
        Engine.isKeyPressed[e.keyCode] = true
    }

    static onKeyUp(e) {
        Engine.isKeyPressed[e.keyCode] = false
    }

    setUp() {
        window.addEventListener("keyup", Engine.onKeyUp)
        window.addEventListener("keydown", Engine.onKeyDown)

        this.isRunning = true
        Engine.Time.update()
    }

    run() {
        if(!this.isRunning) return

        requestAnimationFrame(() => this.run())

        let elapsedTime = Engine.Time.update()
        
        if (elapsedTime < this.deltaTime) return

        Engine.Scene._update()
    }
}