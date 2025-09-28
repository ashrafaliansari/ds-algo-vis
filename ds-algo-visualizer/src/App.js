import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MergeSortVisualizer from "./components/pages/MergeSortVisualizer";
import BubbleSortVisualizer from "./components/pages/BubbleSortVisualizer";
import QuickSortVisualizer from "./components/pages/QuickSortVisualizer";
function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center space-y-6">
                <h1 className="text-3xl font-bold">Sorting Visualizers</h1>
                <div className="space-x-4">
                  <Link
                    to="/bubble-sort"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
                  >
                    Bubble Sort
                  </Link>
                  <Link
                    to="/merge-sort"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
                  >
                    Merge Sort
                  </Link>
                  <Link
                    to="/quick-sort"
                    className="px-4 py-2 bg-red-600 text-white rounded-lg shadow"
                  >
                    Quick Sort
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="/bubble-sort" element={<BubbleSortVisualizer />} />
          <Route path="/merge-sort" element={<MergeSortVisualizer />} />
          <Route path="/quick-sort" element={<QuickSortVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
