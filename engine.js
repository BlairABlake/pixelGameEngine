class GameEngine {
    /**
     * 
     * @param {Game} game 
     */
    constructor(game, fps) {
        this.game = game
        this.isRunning = false
        this.fps = fps
        this.lagTime = 1000 / this.fps
    }

    setUp() {
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

        this.game._update()
    }
}

const engine = new GameEngine(new SampleGame(new DiscreteCanvas("canvas", 10, 10)), 60)
engine.setUp()
engine.run()