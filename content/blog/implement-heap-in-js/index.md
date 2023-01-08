---
title: Implement Heap In JavaScript
date: "2021-11-07T22:12:03.284Z"
description: "Let's build a min-heap class that can be used in software development from scratch in JavaScript."
tag: ["JavaScript", "data structure"]
isDraft: false
---

## Overview
Heap is one of the fundamental data structures that are widely used in software development. In most other modern programming languages, there are built-in supports for heap. For example, in C++, there is priority_queue that implements heap; in Java, there is PriorityQueue that can be used as a heap. However, in JavaScript, there are no built-in APIs that can be easily used as heaps. In this article, we will build a heap class that can be used in software development from scratch.

## What Is Heap
Before starting the design of the heap class, let’s spend some time refreshing what a heap is. There are two types of heaps: min-heap and max-heap. No matter which type, a heap is a tree-based data structure that satisfies the heap property: in a max-heap, for any given node C, if P is a parent node of C, then the key (the value) of P is greater than or equal to the key of C; in a min-heap, the key of P is less than or equal to the key of C. The node at the "top" of the heap (with no parents) is called the root node. Heap is a data structure that supports quick visiting of the root node, as well as inserting, deleting and searching a node. Normally, a heap is a represented as a binary tree. Example min-heap:

``` mermaid
graph TB
    A((1))---B((2))
    A---C((3))
    B---D((5))
    B---E((6))
    C---F((7))
    C---G((8))
    D---H((9))
    D---I((10))
    
```

## Design Heap

Since max heap and min heap are similar in implementation, let's start implement a min heap first, then it is relatively easy to convert it to a max heap.

Let's use an array, *heap*, as the internal data structure to implement the heap's binary tree. Then we have below observations regarding the *heap* array, which will be very helpful for our later implementation:

1. the root node is heap[0]
2. heap[i]'s left child is heap[2* i + 1], heap[i]'s right child is heap[2 * i + 2]
3. heap[i]'s parent node is heap[Math.floor((i - 1)/ 2)]

Now let's think about what functionalities our MinHeap class needs. 

- First it needs a constructor, inside which the heap array will be initialized. Two types of initialization for the MinHeap should be supported: initialization with an empty input and initialization with an array as input. 
- MinHeap should be able to quickly visit and extract the contained minimum element.
- Basic operations should be supported: insert/remove/search an element.
- The heap property should be maintained by Heapify process(es).

Now we have a good plan for our MinHeap class.

```javascript
Class MinHeap {
   	constructor()
    
    // functionalities to visit/extract min element
    findMin()
    extractMin()
    
    // Basic functionalities
    insert()
    remove()
    search()
    
    // Heapify
    bubbleUp()
    sinkDown()
    
    // Basic properties
    size()
    isEmpty()
}
```



## Implementation Details

Let's start with constructor. 

```javascript
constructor(array?) {
    this._heap = [];
  	if(array !== undefined) {
    	array.forEach(c => {
	    	this.insert(c);
       });
    }
}
```

Then it comes to functions that finds min element and extracts min element. Because of the heap property, the min element is the first element in heap array. To extract it from the heap, we return the first element and then remove it, using the remove function we will implement shortly.

```javascript
findMin() {
    if(this.heap.length === 0) {
        throw Error("Empty heap!");
    }
    this.heap[0];
}

extractMin() {
    if(this.heap.length === 0) {
        throw Error("Empty heap!");
    }
    const res = this.heap[0];
	this.remove(0);
    return res;
}
```

Some basic functionalities: insert, remove and search. In order to insert an element, we add the element to the end of the heap array, then heapify the heap; in order to remove an element, we need to find it first, and swap it with the last element in the array,  then heapify the heap again. The heapify process contains two operations: bubbleUp and sinkDown. We will revisit both of them shortly. Unfortunately, to search an element, we have to do a linear search which will traverse all the elements in the heap.

```javascript
insert(node) {
    this.heap.push(node);
    this.bubbleUp(this.heap.length -1);
}

remove(node) {
    let i = this.search(node);
    if(i !== -1) {
        if(i === this.heap.length -1) {
            this.heap.pop();
        } else {
            this.heap[i] = this.heap.pop();
            this.bubbleUp(i);
            this.sinkDown(i);
        }
    }
}

search(node) {
    for(let i = 0; i < this.heap.length; i++) {
    	if(this.heap[i] === number)
	      	return i;
    }
    return -1;
}
```

Now it comes to the heapify processes. We use two utility functions to realize heapify: bubbleUp and sinkDown. bubbleUp will move the ith element in the heap up until it's in a correct position that qualifies heap property; similarly, sinkDown will move the ith element in the heap down until it's in a correct position that qualifies heap property.

```javascript
bubbleUp(index) {
    if(index === 0) {
    	return;
    }
    const curNode = this.heap[index];
    while(curNode.key < this.heap[Math.floor((index - 1) / 2)].key) {
        let parent_index = Math.floor((index - 1) / 2);
        this.heap[index] = this.heap[parent_index];
        index = parent_index;
    }
    this.heap[index] = curNode;
}

sinkDown(index) {
    while(index < this.heap.length) {
        let l = index * 2 + 1;
        let r = index * 2 + 2;
        let smallest = index;
        if(l < this.heap.length && this.heap[smallest].key > this.heap[l].key) {
            smallest = l;
        }
        if(r < this.heap.length && this.heap[smallest].key > this.heap[r].key) {
            smallest = r;
        }
        if(index === smallest) {
            break;
        }
        let cur = this.heap[index];
        this.heap[index] = this.heap[smallest];
        index = smallest;
        this.heap[index] = cur;
    }
}
```

At last, let's return a few quick property.

```javascript
size() {
    return this.heap.length;
}

isEmpty() {
    return this.heap.length === 0;
}
```



## Time Complexity

Let's look at the time complexity of the functions we wrote:

`findMin` takes O(1) time

`extractMin`, `insert`, `bubbleUp`, `sinkDown` all takes O(logn) time

`search` and `remove` takes O(n) time



## In Conclusion

Implementing a heap in JavaScript seems like a challenging job at first glance, but after breaking it down into smaller functionalities and address them piece by piece, it becomes a relatively easy job. Now that we have our MinHeap class, we are able to use it in our learning, daily development and even interviews. 
