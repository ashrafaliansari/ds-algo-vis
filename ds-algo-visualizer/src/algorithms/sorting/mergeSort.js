function merge(arr, l, m, r, steps) {
    let n1 = m - l + 1;
    let n2 = r - m;
  
    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);
  
    let i = 0, j = 0, k = l;
  
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      steps.push({ type: "merge", array: [...arr] });
      k++;
    }
  
    while (i < n1) {
      arr[k] = L[i];
      i++; k++;
      steps.push({ type: "merge", array: [...arr] });
    }
  
    while (j < n2) {
      arr[k] = R[j];
      j++; k++;
      steps.push({ type: "merge", array: [...arr] });
    }
  }
  
  function mergeSortHelper(arr, l, r, steps) {
    if (l >= r) return;
  
    let m = Math.floor((l + r) / 2);
  
    steps.push({ type: "split", left: [...Array(m - l + 1).keys()].map(i => i + l), right: [...Array(r - m).keys()].map(i => i + m + 1), array: [...arr] });
  
    mergeSortHelper(arr, l, m, steps);
    mergeSortHelper(arr, m + 1, r, steps);
  
    merge(arr, l, m, r, steps);
  }
  
  export default function mergeSortSteps(arr) {
    let steps = [];
    mergeSortHelper(arr, 0, arr.length - 1, steps);
    return steps;
  }  