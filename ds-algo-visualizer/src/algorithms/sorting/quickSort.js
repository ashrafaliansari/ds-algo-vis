function partition(arr, low, high, steps) {
    let pivot = arr[high];
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      steps.push({
        type: "compare",
        pivot: high,
        indices: [j],
        array: [...arr],
      });
  
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          type: "swap",
          pivot: high,
          indices: [i, j],
          array: [...arr],
        });
      }
    }
  
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      type: "swap",
      pivot: high,
      indices: [i + 1, high],
      array: [...arr],
    });
  
    return i + 1;
  }
  
  function quickSortHelper(arr, low, high, steps) {
    if (low < high) {
      let pi = partition(arr, low, high, steps);
  
      quickSortHelper(arr, low, pi - 1, steps);
      quickSortHelper(arr, pi + 1, high, steps);
    }
  }
  
  export default function quickSortSteps(arr) {
    let steps = [];
    quickSortHelper(arr, 0, arr.length - 1, steps);
    return steps;
  }  