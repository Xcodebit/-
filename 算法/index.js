
/**
 * @msg: 简单排序-冒泡排序
 */
function bubblesort(arr) {
    var i = arr.length;
    while (i > 0) {
        var pos = 0;
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                debugger;
                pos = j;
                var jmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = jmp;
            }
        }
        i = pos;
    }
    return arr;
}
//console.log(bubblesort([2, 5, 1, 4, 3]));


/**
 * @msg: 简单排序-选择排序
 */
function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}


/**
 * @msg: 简单排序-插入排序1
 */
function insertionSort(arr) {
    if (Object.prototype.toStrgin.call(arr).slice(8, -1) === "Array") {
        // 外层循环：从第1个位置开始获取数据，向前面局部有序进行插入
        for (var i = 1; i < arr.length; i++) {
            var key = arr[i];
            var j = i - 1;
            // 内存循环：获取i位置的元素，与前面的数据依次进行比较
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
        return arr;
    } else {
        return "arr is not an Array";
    }
}

/**
 * @msg: 简单排序-插入排序2
 */
function insetionSort2(arr) {
    if (Object.prototype.toString.call(arr).slice(8, -1)) {
        for (var i = 1; i < arr.length; i++) {
            var key = arr[i],
                left = 0,
                right = i - 1;
            while (left <= right) {
                var middle = parseInt((left + right) / 2);
                if (key < arr[middle]) {
                    right = middle - 1;
                } else {
                    left = middle + 1;
                }
            }
            for (var j = i - 1; j >= left; j--) {
                arr[j + 1] = arr[j];
            }
            arr[left] = key;
        }
        return arr;
    } else {
        return "arr is not an Array!";
    }
}

/**
 * @msg: 高级排序-希尔排序
 */
function shellsort(arr) {
    //1.获取数组长度
    var length = arr.length;
    //2.初始化增量
    var gap = Math.floor(length / 2);
    //3.循环
    while (gap >= 1) {
        debugger
        //4.以gap为间隔进行分组，对分组进行插入排序
        for (var i = gap; i < length; i++){
            var temp = arr[i];
            var j = i;
            while (j > gap - 1 && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }
            arr[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
}

var arr = [81, 94, 11, 96, 12, 35, 17, 95, 28, 58, 41, 75, 0];
// shellsort(arr);
// alert(arr);


//高级排序-快速排序
function Sort() {
    this.Array = [];

    Sort.prototype.quickSort = function () {
        quick(0, this.Array.length - 1);
    }
    function quick(left, right) {
        //1.结束条件
        if (left >= right) return;
        //2.获取枢纽
        let pivot = median(left, right);
        //3.定义变量，用于记录当前找到的位置
        let i = left, j = right - 1;
        //4.开始进行交换
        while (true) {
            while (arr[++i] < pivot) { }
            while (arr[++j] > pivot) { }
            if (i < j) {
                swap(i, j);
            } else {
                break;
            }
        }
        //5.将枢纽放置在正确位置(i位置)
        swap(i, right - 1);
        //6.分而治之
        quick(left, i - 1);
        quick(i + 1, right);
    }

    //选择快速排序时使用的枢纽（取头 中 尾的中位数）
    function median(left, right) {
        //1.取中间的位置
        let center = Math.floor((left + right) / 2);
        //2.判断大小，对头 中 尾三个数进行排序
        if (this.Array[left] > this.Array[center]) {
            swap(left, center);
        }
        if (this.Array[center] > this.Array[right]) {
            swap(center, right);
        }
        if (this.Array[left] > this.Array[center]) {
            swap(left, center);
        }
        //3.将center位置的数据换到right-1的位置
        swap(center, right - 1);
        return this.Array[right - 1];
    }

    //交换两个数据
    function swap(i, j) {
        let temp = this.Array[i];
        this.Array[i] = this.Array[j];
        this.Array[j] = temp;
    }
}
