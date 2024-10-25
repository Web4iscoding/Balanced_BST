import { Node } from "./Node.mjs";

export class Tree {
    constructor(array=[], root=null) {
        this.array = array;
        this.root = root;
    }

    buildTree(array=this.array) {
        const newArray = [];
        array.forEach(item => {
            if(!newArray.includes(item))
                newArray.push(item)
        })
    
        newArray.sort((a,b) => a-b);
    
        this.root =  (function innerBuildTree(arr, left, right) {
            if (left <= right) {
                const mid = Math.floor((left + right) / 2);
                const root = new Node(arr[mid]);
                
                root.left = innerBuildTree(arr, left, mid - 1);
                root.right = innerBuildTree(arr, mid + 1, right);
    
                return root;
            }
            return null;
    
        })(newArray, 0, newArray.length - 1)

        return this.root;
    }    

    insert(value) {
        (function traverse(node) {
            if (node.value === value)
                return;
            if (node.value < value) {
                if (node.right === null) {
                    node.right = new Node(value);
                    return;
                }
                traverse(node.right);
            }
            if (node.value > value) {
                if (node.left === null) {
                    node.left = new Node(value);
                    return;
                }
                traverse(node.left);
            }
        })(this.root);
    }

    deleteItem(value) {
        const root = this.root;
        (function traverse(node) {
            if (node.value < value) {
                node.right = traverse(node.right);
                return node;
            }
            else if (node.value > value) {
                node.left = traverse(node.left);
                return node;
            }
            else {
                if (node.left === null && node.right === null) {
                    return null;
                }
                if (node.left === null)
                    return node.right;
                if (node.right === null)
                    return node.left;

                let currentNode = node.right;
                while (currentNode.left !== null)
                    currentNode = currentNode.left;
                [node.value, currentNode.value] = [currentNode.value, node.value];
                node.right = traverse(node.right);
                return node;
            }
        })(root);
    }

    find(value) {
        return (function traverse(node) {
            if (node === null)
                return null;
            if (node.value < value)
                return traverse(node.right);
            else if (node.value > value)
                return traverse(node.left);
            else
                return node;

        })(this.root);
    }

    levelOrder(callback) {
        (function traverse(node, queue){
            if (node.left !== null)
                queue.push(node.left);
            if (node.right !== null)
                queue.push(node.right);
            const currentNode = queue.shift();
            callback(currentNode);
            if (queue.length === 0)
                return;
            traverse(queue[0], queue);
        })(this.root, [this.root]);
    }

    inOrder(callback) {
        (function traverse(node) {
            if (node !== null) {
                traverse(node.left);
                callback(node);
                traverse(node.right);
            }
        })(this.root)
    }

    preOrder(callback) {
        (function traverse(node) {
            if (node !== null) {
                callback(node);
                traverse(node.left);
                traverse(node.right);
            }
        })(this.root)
    }

    postOrder(callback) {
        (function traverse(node) {
            if (node !== null) {
                traverse(node.left);
                traverse(node.right);
                callback(node);
            }
        })(this.root)
    }

    height(node) {
        const depths = [];
        (function traverse(node, i) {
            if (node === null)
                return 0;
            if (node.left === null && node.right === null) {
                depths.push(i);
                return;
            }
            if (node.left === null && node.right !== null) {
                traverse(node.right, ++i);
                return;
            }
            if (node.right === null && node.left !== null) {
                traverse(node.left, ++i);
                return;
            }
            i++;
            traverse(node.left, i);
            traverse(node.right, i);
        })(node, 1)
        return depths.reduce((acc, curr) => {
            return acc < curr ? curr : acc;
        }, depths[0]);
    }

    depth(node) {
        const targetNode = node;
        return (function traverse(node, i) {
            if (targetNode.value === node.value)
                return i;
            if (node === null)
                return 0;
            if (targetNode.value > node.value)
                return traverse(node.right, ++i);
            else if (targetNode.value < node.value)
                return traverse(node.left, ++i)
        })(this.root, 1);
    }

    isBalanced() {
        let result = true;
        this.inOrder((node) => {
            const leftSubtree = this.height(node.left);
            const rightSubtree = this.height(node.right);
            
            if (leftSubtree - rightSubtree > 1 )
                result = false;
        });
        return result;
    }

    rebalance() {
        const newArray = [];
        this.inOrder(node => newArray.push(node.value));
        this.buildTree(newArray);
    }
}