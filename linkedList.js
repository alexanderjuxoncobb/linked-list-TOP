class Node {
  constructor(value, nextNode) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = new Node(value, null);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode; // if list is empty the new node is both the head and tail
    } else {
      this.tail.nextNode = newNode; // add the new node ot the end
      this.tail = newNode; // make it the last node in the list. Note: newNode has a nextNode of null as required.
    }
  }

  prepend(value) {
    const newNode = new Node(value, this.head);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head = newNode;
    }
  }

  size() {
    if (!this.head) {
      return 0;
    } else {
      let counter = 1;
      let next = this.head.nextNode;
      while (next) {
        counter++;
        next = next.nextNode;
      }
      return counter;
    }
  }

  at(index) {
    // return null for invalid index or empty list
    if (index < 0 || !this.head) return null;
    let counter = 0;
    let node = this.head;
    while (node && counter < index) {
      // ensures you don’t try to access nextNode of a null node when index exceeds the list’s size.
      node = node.nextNode;
      counter++;
    }
    return node;
  }

  pop() {
    const size = this.size();
    if (size === 0) return null;
    else if (size === 1) {
      const poppedValue = this.head.value;
      this.head = null;
      this.tail = null;
      return poppedValue;
    } else {
      const poppedValue = this.tail.value;
      const secondLastNode = this.at(size - 2);
      secondLastNode.nextNode = null;
      this.tail = secondLastNode;
      return poppedValue;
    }
  }

  contains(value, indexRef = null) {
    let node = this.head;
    let index = 0;
    while (node) {
      if (node.value === value) {
        if (indexRef) indexRef.index = index;
        return true;
      }
      index++;
      node = node.nextNode;
    }
    return false;
  }

  find(value) {
    let indexRef = {};

    if (this.contains(value, indexRef)) {
      return indexRef.index;
    }
    return null;
  }

  toString() {
    let string = "";
    let node = this.head;
    while (node) {
      string += `( ${node.value} ) -> `;
      node = node.nextNode;
    }
    string += "null";
    return string;
  }

  insertAt(value, index) {
    if (index === 0) this.prepend(value);
    else if (index < this.size()) {
      const nodeAtIndex = this.at(index);
      const nodeBeforeIndex = this.at(index - 1);
      const newNode = new Node(value, nodeAtIndex);

      nodeBeforeIndex.nextNode = newNode;
    }
  }

  removeAt(index) {
    const nodeBeforeIndex = this.at(index - 1);
    const nodeAfterIndex = this.at(index + 1);

    if (index === 0) this.head = nodeAfterIndex;
    else nodeBeforeIndex.nextNode = nodeAfterIndex;
  }
}
