class Pair {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class PriorityQueueElement extends Pair {
    get priority() { return this.y }
}

/**
 * This class implemented a binary heap, hence this is not an abstract class. */ 
class PriorityQueue {
    constructor() {
        this.xs = []
    }

    top() {
        if (this.size() == 0) this._emptyError("top()")

        let last = this.xs.pop()
        if (this.size() == 0) return last.x

        let first = this.xs[0]
        this.xs[0] = last
        this._pushDown(0)

        return first.x
    }

    peek() {
        return this.xs[0].x
    }

    insert(element, priority) {
        this.xs.push(new PriorityQueueElement(element, priority))
        this._bubbleUp(this.lastIndex())
    }

    remove(element) {
        if (this.size() == 0) this._emptyError("top()")

        let last = this.xs.pop()
        if (this.size() == 0) return e.x

        let index = this.xs.findIndex(element)
        this.xs[index] = last
        this._pushDown(index)
    }

    update(element, newPriority) {
        let index = this.xs.findIndex(element)
        if (index < 0) return 

        let oldPriority = this.xs[index].priority
        if(oldPriority < newPriority) this._bubbleUp(index)
        else this._pushDown(index)
    }

    size() {
        return this.xs.length
    }

    lastIndex() {
        return this.size() - 1
    }

    empty() {
        return this.size() == 0
    }

    foreach(func) {
        do {
            let e = this.top()
            func(e)
        } while (!this.empty());
    }

    _bubbleUp(index) {
        const loop = () => {
            let parentIndex = Math.ceil(index/2) - 1
            if(parentIndex < 0) return
            if(this.xs[index].priority > this.xs[parentIndex].priority) {
                [this.xs[index], this.xs[parentIndex]] = [this.xs[parentIndex], this.xs[index]]
                index = parentIndex
                loop()
            } 
        }
        loop()
    }

    _pushDown(index) {
        const loop = () => {
            let children = this._children(index)
            let childIndex = 0

            if (children.length == 0) return
            else if(children.length == 1) childIndex = this._leftIndex(index)
            else if(children.length == 2) childIndex = this._highestPriorityChildIndex(index)

            if(this.xs[index].priority < this.xs[childIndex].priority) {
                [this.xs[index], this.xs[childIndex]] = [this.xs[childIndex], this.xs[index]]
                index = childIndex
                loop()
            }
        }
        loop()
    }

    _children(index) {
        if(this._leftIndex(index) > this.lastIndex()) return []
        else if (this._leftIndex(index) == this.lastIndex()) return [this.xs[this.lastIndex()]]
        else return [this.xs[this._leftIndex(index)], this.xs[this._rightIndex(index)]]
    }

    _leftIndex(index) {
        return index * 2 + 1
    }

    _rightIndex(index) {
        return index * 2 + 2
    }

    _highestPriorityChildIndex(index) {
        return this.xs[this._leftIndex(index)].priority >= this.xs[this._rightIndex(index)].priority ? this._leftIndex(index) : this._rightIndex(index)
    }

    _emptyError(operationName) {
        throw Error(`${operationName} cannot be called upon empty queue`)
    }
}