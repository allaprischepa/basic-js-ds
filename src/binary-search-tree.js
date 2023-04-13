const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.tree = {
      data: null,
      left: null,
      right: null,
    };
  }

  root() {
    return this.tree.data ? this.tree : null;
  }

  add(data) {
    this.tree = this.addData(this.tree, data);
  }

  has(data) {
    return this.find(data) !== null ? true : false;
  }

  find(data) {
    return this.findData(this.tree, data);
  }

  remove(data) {
    if (this.has(data)) this.tree = this.removeData(this.tree, data);
  }

  min() {
    return this.findMin(this.tree.left, this.tree.data);
  }

  max() {
    return this.findMax(this.tree.right, this.tree.data);
  }

  addData(tree, data) {
    if (!tree) tree = { data: data, left: null, right: null };
    else if (!tree.data) tree.data = data;
    else if (data <= tree.data) tree.left = this.addData(tree.left, data);
    else if (data > tree.data) tree.right = this.addData(tree.right, data);

    return tree;
  }

  findData(tree, data) {
    if (!tree) return null;
    else if (!tree.data) return null;
    else if (tree.data === data) return tree;
    else if (data <= tree.data) return this.findData(tree.left, data);
    else if (data > tree.data) return this.findData(tree.right, data);
  }

  findMin(tree, currentMin) {
    if (!tree) return currentMin;
    else if (tree.data < currentMin) return this.findMin(tree.left, tree.data)
    else if (!tree.left) return currentMin;
    else return this.findMin(tree.left, tree.left.data);
  }

  findMax(tree, currentMax) {
    if (!tree) return currentMax;
    else if (!tree.right) return currentMax;
    else return this.findMax(tree.right, tree.right.data);
  }

  removeData(tree, data) {
    if (data < tree.data) {tree.left = this.removeData(tree.left, data)};
    if (data > tree.data) {tree.right = this.removeData(tree.right, data)};
    if (data === tree.data) {
      if (!tree.left && !tree.right) return null;
      else if (!tree.left) return tree.right;
      else if (!tree.right) return tree.left;
      else {
        let maxFromLeft = this.findMax(tree.left, tree.left.data);
        tree.data = maxFromLeft;
        tree.left = this.removeData(tree.left, maxFromLeft);
      }
    }

    return tree;
  }
}

module.exports = {
  BinarySearchTree
};