//哈希表实现
function HashTable() {
  this.storage = [];
  this.count = 0; //数据个数
  this.limit = 7;

  //哈希函数
  HashTable.prototype.hashFunc = function(str, size) {
      var hashCode = 0;
      //霍纳算法来定义hashCode值
      for (var i = 0; i < str.length; i++) {
          hashCoded = 37 * hashCode + str.charCodeAt(i);
      }
      //取余操作
      var index = hashCode % size;
      return index;
  };
  //插入修改
  HashTable.prototype.put = function(key, value) {
      //根据key获取对应的index
      var index = this.hashFunc(key, this.limit);

      //根据index取出对应的bucket
      var bucket = this.storage[index];

      //判断bucket是否为null
      if (bucket === null) {
          bucket = [];
          this.storage[index] = bucket;
      }

      //判断是否是修改数据
      for (var i = 0; i < bucket.length; i++) {
          var tuple = bucket[i];
          if (tuple[0] === key) {
              tuple[1] = value;
              return;
          }
      }

      //进行添加操作
      bucket.push([key, value]);
      this.count += 1;

      //判断是否需要扩容
      if (this.count > this.limit * 0.75) {
          var newPrime = this.getPrime(this.limit * 2);
          this.resize(newPrime);
      }
  };
  HashTable.prototype.remove = function(key) {
      //1.根据key获取对应的index
      var index = this.hashFunc(key, this.limit);

      //2.根据index获取对应的bucket
      var bucket = this.storage[index];

      //3.判断bucket是否为null
      if (bucket === null) return null;

      //4.bucket存在，那么进行线性查找，并且删除
      for (var i = 0; i < bucket.length; i++) {
          var tuple = bucket[i];
          if (tuple[0] === key) {
              bucket.splice(i, 1);
              this.count--;

              //缩小容量
              if (this.limit > 7 && this.count < this.limit * 0.25) {
                  var newPrime = this.getPrime(Math.floot(limit / 2));
                  this.resize(newPrime);
              }
              return tuple[1];
          }
      }

      //5.依然还没找到时
      return null;
  };

  //扩容操作
  HashTable.prototype.resize = function(newLimit) {
      //1.保存旧的数据内容
      var oldStorage = this.storage;

      //2.重置所有属性
      this.storage = [];
      this.count = 0;
      this.limit = newLimit;

      //3.遍历oldStorage中所有bucket
      for (var i = 0; i < oldStorage.length; i++) {
          //3.1取出对应的bucket
          var bucket = oldStorage[i];

          //3.2判断bucket是否为null
          if (bucket === null) {
              continue;
          }

          //3.3bucket中有数据时，取出数据，重新插入
          for (var j = 0; j < bucket.length; j++) {
              var tuple = bucket[j];
              this.put(tuple[0], tuple[1]);
          }
      }
  };

  //判读是否为质数（也称素数）:只能被自己和1整除
  HashTable.prototype.isPrime = function(num) {
      //获取当前数的平方根
      var temp = parseInt(Math.sqrt(num));

      //循环判断
      for (var i = 2; i <= temp; i++) {
          if (num % i === 0) {
              return false;
          }
      }
      return true;
  };

  //获取某个数最近的质数
  HashTable.prototype.getPrime = function(num) {
      while (!this.isPrime(num)) {
          num++;
      }
      return num;
  };
}