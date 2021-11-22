//封装二叉搜索树
function BinarySearchTree() {
  function Node(key) {
      this.key = key;
      this.left = null;
      this.right = null;
  }

  this.root = null;

  //插入数据
  BinarySearchTree.prototype.insert = function(key) {
      //1.创建节点
      var newNode = new Node(key);

      //2.判读根节点是否有值
      if (this.root === null) {
          this.root = newNode;
      } else {
          this.insertNode(this.root, newNode);
      }
  };

  BinarySearchTree.prototype.insertNode = function(node, newNode) {
      if (newNode.key < node.key) {
          //向左查找
          if (node.left === null) {
              node.left = newNode;
          } else {
              this.insertNode(node.left, newNode);
          }
      } else {
          //向右查找
          if (node.right === null) {
              node.right = newNode;
          } else {
              this.insertNode(node.right, newNode);
          }
      }
  };

  //树的遍历
  //1.先序遍历
  BinarySearchTree.prototype.preOrderTraversal = function(handler) {
      this.preOrderTraversalNode(this.root, handler);
  };
  BinarySearchTree.prototype.preOrderTraversalNode = function(node, handler) {
      if (node != null) {
          //1.处理经过的结点
          handler(node.key);

          //2.处理经过的左子节点
          this.preOrderTraversalNode(node.left, handler);

          //3.处理经过的右子节点
          this.preOrderTraversalNode(node.right, handler);
      }
  };
  //2.中序遍历
  BinarySearchTree.prototype.midOrderTravaersal = function(handler) {
      this.midOrderTravaersalNode(this.root, handler);
  };
  BinarySearchTree.prototype.midOrderTravaersalNode = function(node, handler) {
      if (node != null) {
          //1.查找左子树中的节点
          this.midOrderTraversalNode(node.left, handler);

          //2.处理节点
          handler(node.key);

          //3.查找右子树中的节点
          this.midOrderTraversalNode(node.right, handler);
      }
  };
  //3.后序遍历
  BinarySearchTree.prototype.postOrderTraversal = function(node, handler) {
      this.postOrderTraversalNode(this.root, handler);
  };
  BinarySearchTree.prototype.postOrderTraversalNode = function(node, handler) {
      if (node != null) {
          //1.查找左子树中的节点
          this.postOrderTraversalNode(node.left, handler);

          //2.查找右子树中国的节点
          this.postOrderTraversalNode(node.right, handler);

          //3.处理节点
          handler(node.key);
      }
  };
  //根据某个key是否存在
  BinarySearchTree.prototype.search = function(key) {
      //获取根节点
      var node = this.root;

      //不用递归 使用循环的方式
      while (node != null) {
          if (key < node.key) {
              node = node.left;
          } else if (key > node.key) {
              node = node.right;
          } else {
              return true;
          }
      }
      return false;
  };

  //删除节点
  BinarySearchTree.prototype.remove = function (key) {
      //1.寻找要删除的节点
      //1.1定义变量，保存一些信息
      var current = this.root;
      var parent = null;
      var isLeftChild = true;

      //1.2开始寻找删除的节点
      while (current.key != key) {
          parent = current;
          if (key < current.key) {
              current = current.left;
              isLeftChild = true;
          } else {
              current = current.right;
              isLeftChild = false;
          }

          //某种情况：已经找到了最后的节点，依然没有找到对应的key
          if (current == null) return false;
      }

      //2.根据对应的情况删除节点.
      //2.1删除的节点是叶子节点
      if (current.left == null && current.right == null) {
          if (current == this.root) {
              this.root = null;
          } else if (isLeftChild) {
              parent.left = null;
          } else {
              parent.right = null;
          }
      }

      //2.2删除的节点只有一个子节点
      else if (current.right == null) {//只有左子节点
          if (current == this.root) {
              this.root = current.left;
          } else if (isLeftChild) {
              parent.left = current.left;
          } else {
              parent.right = current.left; //???
          }
      } else if (current.left == null) {//只有右子节点
          if (current == this.root) {
              this.root = current.right;
          } else if (isLeftChild) {
              parent.left = current.right;
          } else {
              parent.right = current.right;
          }
      }

      //2.3删除的节点有两个子节点
      else {
          //2.3.1获取后继节点
          let successer = this.getSuccesser(current);

          //2.3.2判断是否是根节点
          if (current === this.root) {
              this.root = successer;
          } else if (isLeftChild) {
              parent.left = successer;
          } else {
              parent.right = successer;
          }
          successer.left = current.left;
      }
      return true;
  };

  getSuccesser(delNode) {
      let successerParent = delNode;
      let successer = delNode;
      let current = delNode.right;

      //寻找节点
      while (current != null) {
          successerParent = successer;
          successer = current;
          current = current.right;
      }

      //如果后继节点不是删除节点的右节点
      if (successer != delNode.right) {
          successerParent.left = successer.right;
          successer.right = delNode.right;
      }

      return successer;

  }
}

var bts = new BinarySearchTree();
var resultString = "";
bts.preOrderTraversal(function(key) {
  resultString += key + " ";
});
alert(resultString);