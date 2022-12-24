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

    append(value) {
        this.#current = new Node(value)
        this.#counter++
        if (this.#start == null)
            return this.#start = this.#end = this.#current
        this.#end.next = this.#current
        this.#end = this.#current
    }

    insetAt(index, value) {
        const newNode = new Node(value)
        if (this.#start == null) this.#start = newNode
        if (index == 0) {
            newNode.next = this.#start
            this.#start = newNode
            this.#start.next = null
            return
        }
        const previousNode = this.#getNodeParentByIndex(index, this.#start)
        if (previousNode == null) {
            this.#end.next = newNode
            this.#end = newNode
            return
        }
        const nextNode = previousNode.next
        if (nextNode == null) this.#end = newNode
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

    removeAt(index) {
        if (this.#start == null) return
        if (index == 0) return this.#start = this.#start.next
        let deletedNode;
        const previousNode = this.#getNodeParentByIndex(index, this.#start)
        if (previousNode != null && previousNode.next) {
            deletedNode = previousNode.next
            previousNode.next = previousNode.next.next
        }
        return deletedNode
    }

    remove(value) {
        if (this.#start == null) return
        if (this.#start.data == value) return this.#start = this.#start.next
        const previousNode = this.#getParentNodeByValue(value, this.#start)
        if (previousNode != null && previousNode.next) previousNode.next = previousNode.next.next
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

    #getParentNodeByValue(value, node) {
        if (value == null) return
        if (node == null) return
        if (node.next && node.next.data == value) return node
        return this.#getParentNodeByValue(value, node.next)
    }
}

const linkedList = new LinkedList()

console.log("adding values")
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)
linkedList.print()
console.log("--------------")
console.log("popping values")
console.log(linkedList.pop())
console.log(linkedList.pop())
console.log(linkedList.pop())
console.log(linkedList.pop())
linkedList.print()
console.log("--------------")
console.log("insetAt at specific index")
linkedList.append(1)
linkedList.append(2)
linkedList.append(3)
linkedList.append(4)
linkedList.insetAt(2, -1)
linkedList.print()
console.log("--------------")
console.log("removeAt at specific index")
console.log(linkedList.removeAt(2))
linkedList.print()
console.log("--------------")
console.log("remove by value")
linkedList.remove(1)
linkedList.print()
console.log("--------------")