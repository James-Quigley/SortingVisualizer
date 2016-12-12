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