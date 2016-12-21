var timeouts = [];

/*
* Adds a new state to the 'states' array parameter
*/
function pushToStates(states, data, color){
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
}

/*
* BubbleSort sorting algorithm
*/
function bubbleSort(array, delay) {
    var states = [];
    var color = {};
    var data = array.slice();
    var swaps = 0;
    var n = data.length;
    
    //Pushes original state of data with no new colors
    pushToStates(states, data, color);
    
    while (n != 0){
        var newn = 0;
        for (var i = 1; i <= n-1; i++){
            
            color[i] = "#0000FF"; //Current item
            color[i-1] = "#FFFF00" //Item 'current' is comparing to
            pushToStates(states, data, color);
            
            if (data[i-1] > data[i]) {
                //swap data[i-1] and data[i]
                var tmp = data[i-1];
                data[i-1] = data[i];
                data[i] = tmp;
                newn = i;
                timeouts.push(setTimeout(swap,delay*swaps,i-1, i));
                swaps++;
            }
            
            //Resets colors from current iteration
            color[i] = null;
            color[i-1] = null;
            color[newn] = "#00FF00"; //Item is sorted
            pushToStates(states, data, color);
        }
        
        n = newn;
    }
    return data;
}

/*
* SelectionSort sorting algorithm
* #FFFF00 = min
* #0000FF = current
* #00FF00 = sorted
*/
function selectionSort(array, delay) {
    var states = [];
    var color = {};
    var data = array.slice();
    var swaps = 0;
    var n = data.length;
    
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    for (var i = 0; i < n - 1; i++) {
        var min = i;
        color[i] = "#FFFF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        for (var j = i + 1; j < n; j++) {
            color[j] = "#0000FF";
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            if (data[j] < data[min]){
                color[min] = null;
                min = j;
                color[j] = "#FFFF00";
                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            }
        }
        color[n-1] = null;
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        if (min != i) {
            var tmp = data[i];
            data[i] = data[min];
            data[min] = tmp;
            timeouts.push(setTimeout(swap,delay*swaps, i, min));
            swaps++;
            color[min] = null;
        }
        color[i] = "#00FF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    }
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    return states;
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