class Vec2D {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * 
     * @param {Vec2D} other 
     * @returns new instance of Vec2D
     */
    add(other) {
        return new Vec2D(this.x + other.x, this.y + other.y)
    }

    negate() {
        return new Vec2D(this.x * -1, this.y * -1, this.z * -1)
    }
}

class Vec3D {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
    }

    /**
     * 
     * @param {Vec3D} other 
     * @returns new instantce of Vec3D
     */
    add(other) {
        if(other instanceof Vec2D) return new Vec3D(this.x + other.x, this.y + other.y, this.z)
        return new Vec3D(this.x + other.x, this.y + other.y, this.z + other.z)
    }
}

class PriorityQueueElement extends Vec2D {
    get priority() { return this.y }
}

/**
 * This is an abstract class for priority queue.
 * Do not instantiate this class.
 */
class PriorityQueue {
    constructor() {
        this.xs = []
    } 

    top() {}
    peek() {}
    insert() {}
    remove() {}
    update() {}
    forEach() {}

    size() {
        return this.xs.length
    }

    lastIndex() {
        return this.size() - 1
    }

    empty() {
        return this.size() == 0
    }

    /**
     * Caution, this doesn't return a priority queue
     * @param {Function} func function must accept two parameters, one for the element and another for its priority
     * @returns {Array} array of elements in priority queue after mapping
     */
    map(func) {
        if(this.empty()) return this
        
        return this.xs.map(e => func(e.x, e.y))
    }

    /**
     * Caution, this doesn't return a priority queue
     * @param {Function} func function must accept two parameters, one for the element and another for its priority
     * @returns {Array} array of elements in priority queue after mapping and flattend
     */
    flatMap(func) {
        if(this.empty()) return this
        
        return this.xs.flatMap(e => func(e.x, e.y))
    }
}


class SortedList extends PriorityQueue {
    constructor(reverse=false) {
        super()
        this.reverse = reverse
    }

    top() {
        return this.xs.pop()
    }

    peek() {
        return this.xs[0]
    }

    insert(element, priority) {
        if(this.reverse) priority *= -1
        let index = this.xs.findIndex(v => v.priority >= priority)
        let e = new PriorityQueueElement(element, priority)
        if (index < 0) {
            this.xs.push(e)
        } else if(index == 0) {
            [e].push(...this.xs)
        } else {
            let xs = this.xs.slice(index-1)
            xs.push(e)
            xs.push(...this.xs.slice(index, this.size()))
            this.xs = xs
        }
    }

    remove(element) {
        let index = this.xs.indexOf(element)
        this.xs.splice(index, 1)
    }

    update(element, newPriority) {
        this.remove(element)
        this.insert(element, newPriority)
    }


    /**
     * @param {Function} func function must accept two parameters, one for the element and another for its priority
     */
    forEach(func) {
        this.xs.forEach(e => func(e.x, e.y))
    }
}

class Heap extends PriorityQueue {
    constructor(reverse=false) {
        super()
        this.reverse = reverse
    }

    top() {
        if (this.size() == 0) this._emptyError("top()")

        let last = this.xs.pop()
        if (this.size() == 0) return last

        let first = this.xs[0]
        this.xs[0] = last
        this._pushDown(0)

        return first
    }

    peek() {
        return this.xs[0]
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

    insert(element, priority) {
        if(this.reverse) priority *= -1
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

        let oldPriority = this.xs[index].y
        if(oldPriority < newPriority) this._bubbleUp(index)
        else this._pushDown(index)
    }

    /**
     * @param {Function} func function must accept two parameters, one for the element and another for its priority
     */
    forEach(func) {
        let t = new Heap()
        t.xs = this.xs.slice(0)
        if(t.empty()) return

        do {
            let e = t.top()
            func(e.x, e.y)
        } while (!t.empty());
    }


    _bubbleUp(index) {
        const loop = () => {
            let parentIndex = Math.ceil(index/2) - 1
            if(parentIndex < 0) return
            if(this.xs[index].y > this.xs[parentIndex].y) {
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

            if(this.xs[index].y < this.xs[childIndex].y) {
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
        return this.xs[this._leftIndex(index)].y >= this.xs[this._rightIndex(index)].y ? this._leftIndex(index) : this._rightIndex(index)
    }

    _emptyError(operationName) {
        throw Error(`${operationName} cannot be called upon empty queue`)
    }
}