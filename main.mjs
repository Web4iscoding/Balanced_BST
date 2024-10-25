import { Tree } from "./Tree.mjs";
import { Node } from "./Node.mjs";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

tree.buildTree();
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());
tree.insert(10);
tree.insert(.5);
tree.insert(.1);
tree.insert(.01);
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());
tree.deleteItem(4);
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());
tree.rebalance();
prettyPrint(tree.root);
console.log("Is balanced:", tree.isBalanced());


// │           ┌── 6345
// │       ┌── 324
// │   ┌── 67
// │   │   │   ┌── 23
// │   │   └── 9
// └── 8
//     │       ┌── 7
//     │   ┌── 5
//     └── 4
//         │   ┌── 3
//         └── 1

 