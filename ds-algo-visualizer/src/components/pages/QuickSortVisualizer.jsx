import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import quickSortSteps from "../../algorithms/sorting/quickSort";

const QuickSortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [speed, setSpeed] = useState(700);

  // Generate random array
  const generateArray = (size = 8) => {
    const arr = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setArray(arr);
    setSteps([]);
    setStepIndex(0);
    setIsRunning(false);
    setActiveIndices([]);
    setPivotIndex(null);
  };

  // Run Quick Sort
  const runSort = () => {
    const sortSteps = quickSortSteps([...array]);
    setSteps(sortSteps);
    setStepIndex(0);
    setIsRunning(true);
    setActiveIndices([]);
    setPivotIndex(null);
  };

  // Animate step by step
  useEffect(() => {
    if (!isRunning || stepIndex >= steps.length) return;

    const timeout = setTimeout(() => {
      const step = steps[stepIndex];

      setArray(step.array);

      if (step.type === "compare") {
        setActiveIndices(step.indices);
        setPivotIndex(step.pivot);
      } else if (step.type === "swap") {
        setActiveIndices(step.indices);
        setPivotIndex(step.pivot);
      }

      setStepIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [isRunning, stepIndex, steps, speed]);

  // Run once on mount
  useEffect(() => {
    generateArray();
  }, []);

  const getTileColor = (idx) => {
    if (idx === pivotIndex) return "bg-red-500";
    if (activeIndices.includes(idx)) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-5xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Quick Sort Visualizer
        </h1>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
            onClick={() => generateArray()}
            disabled={isRunning}
          >
            🎲 Generate Array
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow"
            onClick={runSort}
            disabled={isRunning}
          >
            ▶️ Start Quick Sort
          </button>
          <div className="flex items-center space-x-2">
            <label className="font-medium text-gray-700">Speed:</label>
            <input
              type="range"
              min="200"
              max="1200"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-40"
            />
          </div>
        </div>

        {/* Tiles */}
        <div className="flex justify-center gap-4">
          {array.map((value, idx) => (
            <motion.div
              key={value + "-" + idx}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`w-16 h-16 flex items-center justify-center text-white font-bold rounded-lg shadow-lg ${getTileColor(
                idx
              )}`}
            >
              {value}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickSortVisualizer;
