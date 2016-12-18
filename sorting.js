var timeouts = [];
/*
* BubbleSort sorting algorithm
*/
function bubbleSort(array, delay) {
    var data = array.slice();
    var n = data.length;
    var swaps = 0;
    while (n != 0){
        var newn = 0;
        for (var i = 1; i <= n-1; i++){
            if (data[i-1] > data[i]) {
                //swap data[i-1] and data[i]
                var tmp = data[i-1];
                data[i-1] = data[i];
                data[i] = tmp;
                newn = i;
                timeouts.push(setTimeout(swap,delay*swaps,i-1, i));
                swaps++;
            }
        }
        n = newn;
    }
    return data;
}

/*
* SelectionSort sorting algorithm
*/
function selectionSort(array, delay) {
    var data = array.slice();
    var swaps = 0;
    var n = data.length;
    for (var i = 0; i < n - 1; i++) {
        var min = i;
        for (var j = i + 1; j < n; j++) {
            if (data[j] < data[min]){
                min = j;
            }
        }
        if (min != i) {
            var tmp = data[i];
            data[i] = data[min];
            data[min] = tmp;
            timeouts.push(setTimeout(swap,delay*swaps, i, min));
            swaps++;
        }
    }
    return data;
}

/*
* MergeSort sorting algorithm
*/
function mergeSort(data) {
    if (data.length < 2) {
        return data;
    }
    var mid = parseInt(data.length/2);
    var left = data.slice(0,mid);
    var right = data.slice(mid, data.length);
    
    return merge(mergeSort(left), mergeSort(right));
}

/*
* Helper function for MergeSort
*/
function merge(left, right) {
    var result = [];
    
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        }
        else {
            result.push(right.shift());
        }
    }
    
    while(left.length) {
        result.push(left.shift());
    }
    
    while(right.length) {
        result.push(right.shift());
    }
    
    return result;
}

/*
* InsertionSort sorting Algorithm
*/
function insertionSort(data) {
    for (var i = 1; i < data.length; i++) {
        var x = data[i];
        var j = i - 1;
        while (j >= 0 && data[j] > x) {
            data[j+1] = data[j];
            j = j - 1;
        }
        data[j+1] = x;
    }
    return data;
}

/*
* QuickSort sorting algorithm
*/
function quickSort(data, left, right) {
    var len = data.length, pivot, partitionIndex;
    
    if (left < right) {
        pivot = right;
        partitionIndex = partition(data, pivot, left, right);
        quickSort(data, left, partitionIndex - 1);
        quickSort(data, partitionIndex + 1, right);
    }
    
    return data;
}

/*
* Helper function for quicksort
*/ 
function partition(data, pivot, left, right) {
    var pivotValue = data[pivot], partitionIndex = left;
    
    for (var i = left; i < right; i++) {
        if (data[i] < pivotValue) {
            var tmp = data[i];
            data[i] = data[partitionIndex];
            data[partitionIndex] = tmp;
            partitionIndex++;
        }
    }
    var tmp = data[right];
    data[right] = data[partitionIndex];
    data[partitionIndex] = tmp;
    return partitionIndex;
}

/*
* Cocktail Shaker sorting algorithm
*/
function cocktailShakerSort(array, delay){
    var data = array.slice();
    var swaps = 0;
    //Main loop
    for(var i = 0; i < data.length/2; i++){
        var swapped = false;
        
        //Sorts next, unsorted largest-value
        for(var j = i; j < data.length - i - 1; j++){
            if(data[j] > data[j+1]){
                var tmp = data[j];
                data[j] = data[j+1];
                data[j+1] = tmp;
                swapped = true;
                
                timeouts.push(setTimeout(swap, delay*swaps, j, j+1));
                swaps++;
            }
        }
        
        //Sorts next, unsorted smallest-value
        for(var j = data.length - 2 - i; j > i; j--){
            if(data[j] < data[j-1]){
                var tmp = data[j];
                data[j] = data[j-1];
                data[j-1] = tmp;
                swapped = true;
                
                timeouts.push(setTimeout(swap, delay*swaps, j, j-1));
                swaps++;
            }
        }
        
        if(!swapped) break; //If finished sorting
    }
    
    return data;
}

/*
* CombSort sorting algorithm
*/
function combSort(array, delay) {
    var data = array.slice();
    var swaps = 0;
    var gap = data.length;
    var shrink = 1.3;
    var sorted = false;
    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap > 1) {
            sorted = false;
        }
        else {
            gap = 1;
            sorted = true;
        }
        
        var i = 0;
        while (i + gap < data.length) {
            if (data[i] > data[i + gap]){
                var tmp = data[i];
                data[i] = data[i+gap];
                data[i+gap] = tmp;
                sorted = false;
                
                timeouts.push(setTimeout(swap, delay*swaps, i, i+gap));
                swaps++;
            }
            i++;
        }
    }
    
    return data;
}