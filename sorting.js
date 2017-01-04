/*
* BubbleSort sorting algorithm
* #FFFF00 = index 1
* #0000FF = index 2
* #00FF00 = sorted
*/
function bubbleSort(array) {
    var states = [];
    var color = {}; // Object for color
    var data = array.slice();
    var n = data.length;
    var swaps = 0;
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    
    while (n != 0){ // While we are still building up the max values.
        var newn = 0;
        for (var i = 1; i <= n-1; i++){ // Iterate up to last element
            color[i] = "#FFFF00"        // Instantiate cursor color.
            color[i-1] = "#0000FF";
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            if (data[i-1] > data[i]) {  // If we must swap
                //swap data[i-1] and data[i]
                var tmp = data[i-1];    // Store swapping value
                data[i-1] = data[i];    // Set new min
                data[i] = tmp;          // Set new max
                
                color[i-1] = "#FFFF00"; // Set yellow swap.
                color[i] = "#0000FF";   // Set blue swap
                newn = i;               // Change 'n' appropriately.
                
                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            } 
            color[i-1] = null;  // Remove cursor coloring.
            color[i] = null;    
            color[n] = "#00FF00";   // Set new 'n' value to sorted.
            if (data[i+1] > data[i]) {  
                // Safe catch for rare instances where value in 
                // front is already in sorted position 
                // but not accessed.
                color[i+1] = "#00FF00"; 
            }
        }
        // Set n to the new n designated value to determine when algorith is done looping.
        n = newn;   
        if (n == 0) {       
        /* Check to ensure we have green coloring 
        * because of special cases where values are 
        * already less than designated value before sort.
        */
            for (var i = 0; i < data.length-1; i++) {
                color[i] = "#00FF00";
            }
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        }
    }
    return states;
}

/*
* SelectionSort sorting algorithm
* #FFFF00 = min
* #0000FF = current
* #00FF00 = sorted
*/
function selectionSort(array) {
    var states = [];
    var color = {};
    var data = array.slice();
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
            } else {
                color[j] = null;
            }
        }
        color[n-1] = null;
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        if (min != i) {
            var tmp = data[i];
            data[i] = data[min];
            data[min] = tmp;
            color[min] = null;
        }
        color[i] = "#00FF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    }
    color[n-1] = "#00FF00";
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
function insertionSort(array) {
    var states = [];
    var color = {};
    var data = array.slice();
    var n = data.length;
    
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    
    for (var i = 1; i < data.length; i++) {
        var x = data[i];
        var j = i - 1;
        while (j >= 0 && data[j] > x) {
            data[j+1] = data[j];
            j = j - 1;
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        }
        data[j+1] = x;
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    }
    return states;
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
* Finds the max moving forward, then the minimum moving backwards.
*/
function cocktailShakerSort(array, delay){
    var states = [];
    var color = {};
    var data = array.slice();
    //Main loop
    
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    
    for(var i = 0; i < data.length/2; i++){
        var swapped = false;
        
        //Sorts next, unsorted largest-value
        for(var j = i; j < data.length - i - 1; j++){
            if (color[j-1] != "#00FF00") {  // If we haven't set sorted
                color[j-1] = null;
            }
            color[j] = "#0000FF"        // Instantiate cursor color.
            color[j+1] = "#FFFF00";
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            if(data[j] > data[j+1]){
                var tmp = data[j];
                data[j] = data[j+1];
                data[j+1] = tmp;
                color[j] = "#FFFF00";
                color[j+1] = "#0000FF";
                swapped = true;
                
                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            }
        }
        // Set new max value as colored.
        color[data.length-(i+1)] = "#00FF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        
        //Sorts next, unsorted smallest-value
        for(var j = data.length - 2 - i; j > i; j--){
            if (color[j+1] != "#00FF00") {  // If we haven't set to sorted.
                color[j+1] = null;
            }
            color[j] = "#0000FF";
            color[j-1] = "#FFFF00";
            
            states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            if(data[j] < data[j-1]){
                var tmp = data[j];
                data[j] = data[j-1];
                data[j-1] = tmp;
                color[j] = "#FFFF00";
                color[j-1] = "#0000FF";
                swapped = true;
                
                
                states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
            }
        }
        // Set new minimum value as colored.
        color[i] = "#00FF00";
        states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
        
        if(!swapped) break; //If finished sorting
    }
    
    // The middle of the algorithm will be sorted by this point, so
    // we want to set it to sorted coloring.
    for (var i = 0; i < data.length-1; i++) {
        color[i] = "#00FF00";
    }
    states.push(new State(data.slice(), JSON.parse(JSON.stringify(color))));
    
    return states;
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