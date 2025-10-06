"use client";

import React, { useState } from 'react';

// Main component for the Counter application
export default function CounterApp() {
  // State to hold the current count, initialized to 0
  const [count, setCount] = useState<number>(0);

  // Function to increase the count by 1
  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  // Function to decrease the count by 1
  const decrement = () => {
    setCount(prevCount => prevCount - 1);
  };
    
  // Function to reset the count to 0
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 text-center">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Simple Counter
          </h1>
        </header>
        
        <div className="mb-8">
          <p className="text-6xl font-bold text-blue-500 dark:text-blue-400">
            {count}
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={decrement}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            -
          </button>
          <button
            onClick={reset}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-transform transform hover:scale-105"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}