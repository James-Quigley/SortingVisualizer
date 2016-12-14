function bubbleSort(data) {
    var n = data.length;
    while (n != 0){
        var newn = 0;
        for (var i = 1; i <= n-1; i++){
            if (data[i-1] > data[i]) {
                //swap data[i-1] and data[i]
                var tmp = data[i-1];
                data[i-1] = data[i];
                data[i] = tmp;
                newn = i;
            }
        }
        n = newn;
    }
    return data;
}

function selectionSort(data) {
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
        }
    }
    return data;
}

function mergeSort(data) {
    if (data.length < 2) {
        return data;
    }
    var mid = parseInt(data.length/2);
    var left = data.slice(0,mid);
    var right = data.slice(mid, data.length);
    
    return merge(mergeSort(left), mergeSort(right));
}

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
* Cocktail Shaker Sorting algorithm
*/
function cocktailShakerSort(data){
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
            }
        }
        
        //Sorts next, unsorted smallest-value
        for(var j = data.length - 2 - i; j > i; j--){
            if(data[j] < data[j-1]){
                var tmp = data[j];
                data[j] = data[j-1];
                data[j-1] = tmp;
                swapped = true;
            }
        }
        
        if(!swapped) break; //If finished sorting
    }
    
    return data;
}


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