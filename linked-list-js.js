class Node {
    constructor(value) {
        this.next = null
        this.data = value
    }
}

class LinkedList {
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

    add(index, value) {
        const newNode = new Node(value)
        if (this.#start == null) this.#start = newNode
        if (index == 0) {
            newNode.next = this.#start
            this.#start = newNode
            this.#start.next = null
            return
        }
        const previousNode = this.#getNodeParentByIndex(index, this.#start)
        if (previousNode == null) return this.#end.next = newNode
        const nextNode = previousNode.next
        previousNode.next = newNode
        previousNode.next.next = nextNode
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

    #getNodeParentByIndex(index, node, counter = 0) {
        if (node == null) return null
        if (counter == index - 1) return node
        return this.#getNodeParentByIndex(index - 1, node.next, counter++)
    }
}

const linkedList = new LinkedList()

console.log("adding values")
linkedList.push(1)
linkedList.push(2)
linkedList.push(3)
linkedList.push(4)
linkedList.print()
console.log("--------------")
console.log("popping values")
console.log(linkedList.pop())
console.log(linkedList.pop())
console.log(linkedList.pop())
console.log(linkedList.pop())
linkedList.print()
console.log("--------------")
console.log("add value at specific index")
linkedList.push(1)
linkedList.push(2)
linkedList.push(3)
linkedList.push(4)
linkedList.add(2, -1)
linkedList.print()
console.log("--------------")