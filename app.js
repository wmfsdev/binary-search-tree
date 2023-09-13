#!/usr/bin/node

const Node = (data, left = null, right = null) => {
    return { data, left, right }
};


const Tree = (array) => {

    let root = buildTree(array)


    const remove = (value, currentNode = root, previousNode) => {
        console.log(currentNode)
        console.log("-> currentNode.data: " + currentNode.data)
        console.log("-> value: " + value)

        // checks current node with sought after value
        if (currentNode.data === value) {
            // console.log("matched value: " + value)
            // console.log(currentNode.data, currentNode.left, currentNode.right)
            // console.log(currentNode.left === null)

            // LEAF NODE
            if ( currentNode.data === value && currentNode.left === null && currentNode.right === null ) {
                
                console.log("leaf")
                console.log(currentNode.data)
                console.log(previousNode.data)

                if ( currentNode.data < previousNode.data ) {
                        previousNode.left = null
                } else previousNode.right = null
                
                return 
            }

            // NODE WITH ONE CHILD
            if ( currentNode.data === value && currentNode.right === null ) {
                console.log("left remove test")

                if ( currentNode.data > previousNode.data ) {
                    previousNode.right = currentNode.left
                } else previousNode.left = currentNode.left 
            }

            if ( currentNode.data === value && currentNode.left === null ) {
                console.log("right remove test")

                if ( currentNode.data > previousNode.data ) {
                    previousNode.right = currentNode.left
                } else previousNode.left = currentNode.right
            }

            // NODE WITH TWO CHILDREN

           

            return 
        };

        // console.log("post-base-case")
        if ( value < currentNode.data ) {
            previousNode = currentNode
            currentNode = currentNode.left
            return remove(value, currentNode, previousNode)
        } else {
            previousNode = currentNode
            currentNode = currentNode.right
            return remove(value, currentNode, previousNode)
        }

    };


    const insert = (value, currentNode = root) => {

        if ( currentNode.data === value ) {
            return "value already exists"
        }
    
        // console.log(value)
        // console.log(currentNode.data)
        // console.log(currentNode.left)
       
        if ( value < currentNode.data && currentNode.left === null ) {
            // console.log(currentNode)
            currentNode.left = Node(value)
            
            console.log(currentNode)
            return 
        }
        
        if ( value > currentNode.data && currentNode.right === null ) {
            // console.log(currentNode)
            currentNode.right = Node(value)
            console.log(currentNode.right)
            return 
        }

        // console.log(currentNode)

        if ( value < currentNode.data ) {
            currentNode = currentNode.left
            // console.log(currentNode)
            return insert(value, currentNode)
        } else {
            // console.log(currentNode)
            currentNode = currentNode.right
            return insert(value, currentNode)
        }
    }

    return { root, insert, remove }
};


function buildTree(array) {

    let copy = array

    let end = copy.length - 1
    let mid = Math.ceil(end / 2)

    let root = Node(copy[mid])
    let left = copy.slice(0, mid)
    let right = copy.slice(mid + 1)

    if ( array[mid] === undefined && left.length === 0 && right.length === 0 ) {
        return null // Node(array[mid], left[0], right[0]) 
    }

    if ( left.length === 0 && right.length === 0 ) {
        console.log(array[mid])
        return Node(array[mid], left[0], right[0]) 
    }

    root.left = buildTree(left)
    root.right = buildTree(right)
    return root
};



const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const tree = Tree([1,2,4,5,7,9])    //  1,2,3,4,5,6,7,8
tree.insert(8)
tree.insert(6)

prettyPrint(tree.root)
console.log(tree.root)