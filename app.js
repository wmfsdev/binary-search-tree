
const Node = (data, left = null, right = null) => {
    return { data, left, right }
};


function randomNumber(number = 25, max = 100) {

    let array = []

    for ( let i = 0 ; i <= number ; i++) {
        array.push(Math.floor(Math.random() * max));
    }

    return array
};


const Tree = (array) => {

    let root = buildTree(removeSortedDupes(array.sort(compareFn)))

    const rebalance = () => {

        let array = levelOrder()
        root = buildTree(array.sort(compareFn))

    };

    const getRoot = () => root 

    const isBalanced = (node = root) => {

        if (node === null) return 0

        const left = height(node.left)
        const right = height(node.right)

        if ( (left - right) > 1 || (right - left) > 1 ) {
            return false
        } else return true
    
        // if (left > right) {
        //     return left + 1;
        // } else {
        //     return right + 1;
        // } from height()       
    };

    const balanceHeight = (current = root) => {
     
        if(current == null) return true
            
        let lh = height(current.left)
        let rh = height(current.right)
         
        if (Math.abs(lh - rh) <= 1 && balanceHeight(current.left) == true && balanceHeight( current.right) == true) return true
          
        return false
    };
    
    const trial = (currentNode = root) => {
        debugger
        if (currentNode === null)  return -1;

        let leftSubtreeHeight = trial (currentNode.left);
        if (leftSubtreeHeight === false) return false;

        let rightSubtreeHeight = trial (currentNode.right);
        if (rightSubtreeHeight === false) return false;
        
        if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) return false;
        console.log(leftSubtreeHeight, rightSubtreeHeight)
        console.log(Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1)
        return (Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1);
    };

    // root - left - right
    const preorder = (cb, current = root, array = []) => {  
        
        if (current) {

            if ( current === null ) return
            
            if (cb) {
                console.log(current)
              cb(current)
            } else {
                array.push(current.data)
            }

            preorder(cb, current.left, array)
            preorder(cb, current.right, array)
        }

        if (!cb) return array
    };

    // left - root - right
    const inorder = (cb, current = root, array = [], cbArray = []) => {  

        if (current) {
  
            if ( current === null ) return
        
            inorder(cb, current.left, array, cbArray)

            if (cb) {

                cbArray.push(cb(current))
    
            } else {
                array.push(current.data)
            }

            inorder(cb, current.right, array, cbArray)
            
        }

        if (!cb) return array
        else return cbArray
    };

    // left - right - root
    const postorder = (cb, current = root, array = []) => {  

        if (current) {
  
            if ( current === null ) return
        
            postorder(cb, current.left, array)
            postorder(cb, current.right, array)

            if (cb) {
                cb(current)
            } else {
                array.push(current.data)
            }
        }

       if (!cb) return array
        
    };

    const height = (node = root) => { 
    // Height is defined as the number of edges in longest path from a given node to a leaf node.

        if (node === null) return -1
      
        const left = height(node.left)
        const right = height(node.right)
    
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        }
    };

    const depth = (node = root, current = root, d = 0) => { 
    // Depth is defined as the number of edges in path from a given node to the tree’s root node.

        if (node === null) return 0

        if (node.data === current.data) {
            return d
        }

        if (node.data < current.data) {
            return depth(node, current.left, d + 1)
        } else {
            return depth(node, current.right, d + 1)
        }
    };

    const find = (value, current = root) => {

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
                console.log(queue[0].data)
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
            return insert(value, currentNode)
        } else {
             
            currentNode = currentNode.right
            return insert(value, currentNode)
        }
    };

    return { root, insert, remove, find, levelOrder, preorder, inorder, postorder, height, depth, isBalanced, balanceHeight, trial, rebalance, getRoot }
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


const compareFn = (a, b) => {
    return a - b
};    


const removeSortedDupes = (array, a = array[0], b = array[1], count = 0) => {
    
    if ( array.length === count ) {
        return array
    }
    
    a = array[0 + count]
    b = array[1 + count]

    if ( a === b) {
        array.splice(count, 1)
    } else count++

    return removeSortedDupes(array, a, b, count)
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

let tree = Tree(randomNumber())     // 1. Create a binary search tree from an array of random numbers < 100. You can create a function 
                                    // that returns an array of random numbers every time you call it, if you wish.
prettyPrint(tree.root)

console.log("isBalanced?", tree.isBalanced())      // 2. Confirm that the console.log(tree is balanced by calling isBalanced.
console.log(tree.levelOrder())                     // 3. Print out all elements in level, pre, post, and in order.
console.log(tree.preorder())
console.log(tree.postorder())
console.log(tree.inorder())
tree.insert(150)                                // 4. Unbalance the tree by adding several numbers > 100.
tree.insert(200)
tree.insert(250)
prettyPrint(tree.root)
console.log("isBalanced?", tree.isBalanced())   // 5. Confirm that the console.log(tree is unbalanced by calling isBalanced.
tree.rebalance() 
console.log("rebalancing...")                   // 6. Balance the tree by calling rebalance.
console.log("isBalanced?",tree.isBalanced())    // 7. Confirm that the tree is balanced by calling isBalanced.   
console.log("levelOrder", tree.levelOrder())    // 8. Print out all elements in level, pre, post, and in order.
console.log("preorder", tree.preorder())
console.log("postorder", tree.postorder())
console.log("inorder", tree.inorder())