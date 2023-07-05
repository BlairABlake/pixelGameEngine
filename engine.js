/**
 * Engine manages the loop and event handling.
 */
class Engine {
    static isKeyPressed = {}

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(scene, fps) {
        this.scene = scene
        this.isRunning = false
        this.fps = fps
        this.lagTime = 1000 / this.fps
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
        this.previousTime = Date.now()
    }

    run() {
        if(!this.isRunning) return

        requestAnimationFrame(() => this.run())

        let currentTime = Date.now()
        let elapsedTime = currentTime - this.previousTime
        
        if (elapsedTime < this.lagTime) return

        this.previousTime = currentTime

        this.scene._update()
    }
}