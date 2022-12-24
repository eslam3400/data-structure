class Node {
    constructor(value) {
        this.next = null
        this.data = value
    }
}

export class LinkedList {
    #start
    #end
    #current
    #counter = 0

    constructor() { }

    push(value) {
        this.#current = new Node(value)
        this.#counter++
        if (this.#start == null)
            return this.#start = this.#end = this.#current
        this.#end.next = this.#current
        this.#end = this.#current
    }

    pop() {
        if (this.#start == null) {
            console.log('No More Nodes To Remove!\nstart add some :D')
            return null;
        }
        const node = this.#getLastNodeParent(this.#start)
        const childNode = node.next
        node.next = null
        this.#end = node
        this.#counter--
        if (node == this.#start && this.#counter == 0) this.#start = null
        if (childNode == null) return node
        return childNode
    }

    print() {
        if (this.#start == null)
            return console.log('No Nodes Yet!\nstart to start some :D')
        console.log(this.#getNodesValueAsString(this.#start))
    }

    #getNodesValueAsString(node) {
        if (node == null) return ''
        let result = `${node.data}`
        if (node.next) result += ' => '
        result += this.#getNodesValueAsString(node.next)
        return result
    }

    #getLastNodeParent(node) {
        if (node == null) return node
        if (node.next == null) return node
        if (node.next.next == null) return node
        return this.#getLastNodeParent(node.next)
    }
}