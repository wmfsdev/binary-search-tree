#!/usr/bin/node

const Node = (data, left = null, right = null) => {
    return { data, left, right }
};

function test(a) {
    console.log(a)
}

const Tree = (array) => {

    let root = buildTree(mergeSort(array))

    // root - left - right
    const preorder = (cb, current = root, array = []) => {  
        
        if (current) {

            if ( current === null ) return
            
            array.push(current.data)

            if (cb) {
                cb(array[array.length - 1])
            }

            preorder(cb, current.left, array)
            preorder(cb, current.right, array)
        }

        if (!cb) return array
    };

    // left - root - right
    const inorder = (cb, current = root, array = []) => {  

        if (current) {
  
            if ( current === null ) return
        
            inorder(cb, current.left, array)

            array.push(current.data)

            if (cb) {
                cb(array[array.length - 1])
            }

            inorder(cb, current.right, array)
            
        }

        if (!cb) return array
    };

    // left - right - root
    const postorder = (cb, current = root, array = []) => {  

        if (current) {
  
            if ( current === null ) return
        
            postorder(cb, current.left, array)
            postorder(cb, current.right, array)

            array.push(current.data)

            if (cb) {
                cb(array[array.length - 1])
            }
        }

       if (!cb) return array
        
    };


    const find = (value, current = root) => {

        console.log(current)

        if ( value === current.data ) {
           return current 
        }

        if ( value < current.data ) {
            current = current.left
            return find(value, current)
        } else {
            current = current.right
            return find(value, current)
        }
    };

    const levelOrder = (cb) => { 

        let queue = [root]
        let store = []

        while ( queue.length !== 0 ) {  
            
            let current = queue[0]
            store.push(current.data)
           
            if (current.left !== null) {
                queue.push(current.left)
            }
        
            if (current.right !== null) {
                queue.push(current.right)
            }
        
            if (cb) {
                cb(queue[0]) 
            }
        
            queue.shift()
        }
        
        if ( queue.length === 0 ) {
            return store
        }
    };

    const remove = (value, currentNode = root, previousNode) => {
        //   console.log(currentNode)
        // checks current node with sought after value
        if (currentNode.data === value) {

            // LEAF NODE
            if ( currentNode.data === value && currentNode.left === null && currentNode.right === null ) {

                if ( currentNode.data < previousNode.data ) {
                    previousNode.left = null
                } else previousNode.right = null
                
                return 
            }

            // NODE WITH ONE CHILD
            if ( currentNode.data === value && currentNode.right === null ) {

                if ( currentNode.data > previousNode.data ) {
                    previousNode.right = currentNode.left
                } else previousNode.left = currentNode.left 
            }

            if ( currentNode.data === value && currentNode.left === null ) {

                if ( currentNode.data > previousNode.data ) {
                    previousNode.right = currentNode.left
                } else previousNode.left = currentNode.right
            }

            // NODE WITH TWO CHILDREN
            if ( currentNode.data === value && currentNode.left !== null && currentNode.right !== null ) {
                console.log("two children")
                let leftNode = currentNode.right.left
                let previousNodeTwoChildren = previousNode
                console.log(previousNode)
            
                if ( leftNode === null && currentNode.right.right === null ) {  // right node has 0 children
                    console.log("1")
                    currentNode.data = currentNode.right.data
                    currentNode.right = null
                    return
                }

                if ( leftNode === null && currentNode.right.right !== null ) { // right node has one child on right
                    console.log("2")
                    currentNode.data = currentNode.right.data
                    currentNode.right = currentNode.right.right
                    return
                }

                if ( leftNode.left === null ) { // right node has only one left child
                    console.log("3") 
                    currentNode.data = leftNode.data
                    currentNode.right.left = null
                    return
                }

                while ( leftNode !== null ) {

                    previousNodeTwoChildren = leftNode
                    leftNode = leftNode.left
                    
                    if ( leftNode === null || leftNode.left === null ) {
                        currentNode.data = leftNode.data
                        previousNodeTwoChildren.left = null
                        return
                    } 
                }

                // if ( leftNode.left !== null ) {
                    
                //     while ( leftNode !== null ) {

                //         previousNodeTwoChildren = leftNode
                //         leftNode = leftNode.left
                    
                //         if ( leftNode === null || leftNode.left === null ) {
                //             currentNode.data = leftNode.data
                //             previousNodeTwoChildren.left = null
                //             return
                //         } 
                //     } 
                // // in case right node has only one left child
                // } else {
                //     currentNode.data = leftNode.data
                //     currentNode.right.left = null
                //     return
                // }
                return
            };
            return 
        };

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

        if ( value < currentNode.data && currentNode.left === null ) {
            return currentNode.left = Node(value)
        }
        
        if ( value > currentNode.data && currentNode.right === null ) {
            return currentNode.right = Node(value)
        }

        if ( value < currentNode.data ) {
            currentNode = currentNode.left
             console.log(currentNode)
            return insert(value, currentNode)
        } else {
             
            currentNode = currentNode.right
            console.log(currentNode)
            return insert(value, currentNode)
        }
    };

    return { root, insert, remove, find, levelOrder, preorder, inorder, postorder }
};


function buildTree(array) {

    let copy = array

    let end = copy.length - 1
    let mid = Math.ceil(end / 2)

    let root = Node(copy[mid])
    let left = copy.slice(0, mid)
    let right = copy.slice(mid + 1)

    if ( array[mid] === undefined && left.length === 0 && right.length === 0 ) {
        return null
    }

    if ( left.length === 0 && right.length === 0 ) {
        return Node(array[mid], left[0], right[0]) 
    }

    root.left = buildTree(left)
    root.right = buildTree(right)
    return root
};


function mergeSort(arr) {
	
	if (arr.length < 2) {
		return arr
	} else {

		function sort(left, right, newArr) {
			
			let integerCount = left.length + right.length

			for ( let i = 0 ; i < integerCount ; i++ ) {

				if (left[0] < right[0]) {
					newArr.push(left[0])
					left.splice(0,1)
					
					if (left.length === 0) {
						newArr.push(...right)
						right = []
						break	
				} 

				} else {
					
					newArr.push(right[0])
					right.splice(0, 1)
					
					if (right.length === 0) {
						newArr.push(...left)
						left = []
						break
					}
				}
			}
		return newArr
		}

	return sort( mergeSort(arr.splice(0, Math.round(arr.length / 2))), mergeSort(arr), newArr = [] )
	}
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


const tree = Tree([26, 49, 93, 46, 99, 37, 67, 3, 100, 30])


75, 59, 47, 72, 5, 71, 90, 54, 13, 29, 22, 48, 84, 23, 40, 15, 32
36, 57, 42, 58, 6, 24, 35, 96, 2, 50, 53, 27, 76, 85, 20, 55, 98, 11, 43, 94, 41, 12, 87

prettyPrint(tree.root)
console.log(tree.root)