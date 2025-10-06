"use client";

import React, { useState, useEffect } from 'react';

// Define the structure of a single to-do item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the possible filter states
type Filter = 'all' | 'active' | 'completed';

// Main component for the To-Do application
export default function App() {
  // State to hold the list of todos, typed as an array of Todo objects
  const [todos, setTodos] = useState<Todo[]>([]);
  // State for the new todo input
  const [newTodo, setNewTodo] = useState<string>('');
  // State to manage the current filter
  const [filter, setFilter] = useState<Filter>('all');
  // State for error messages
  const [error, setError] = useState<string>('');

  // Effect to load todos from localStorage when the component mounts
  useEffect(() => {
    try {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos) as Todo[]);
      }
    } catch (err) {
      console.error("Failed to load todos from localStorage", err);
    }
  }, []);

  // Effect to save todos to localStorage whenever the todos list changes
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (err)      {
      console.error("Failed to save todos to localStorage", err);
    }
  }, [todos]);

  // Handles adding a new todo. The event is typed for form submissions.
  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (!newTodo.trim()) {
      setError('A to-do item cannot be empty.');
      return;
    }
    if (todos.some(todo => todo.text.toLowerCase() === newTodo.trim().toLowerCase())) {
        setError('This to-do item already exists.');
        return;
    }
    // Create a new todo object that matches the Todo interface
    const newTodoItem: Todo = { 
      id: Date.now(), 
      text: newTodo.trim(), 
      completed: false 
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo(''); // Clear the input field
    setError(''); // Clear any existing error message
  };

  // Toggles the completed state of a todo
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Deletes a todo from the list
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Clears all completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  }

  // Filters the todos based on the current filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // Corresponds to 'all'
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-thin tracking-widest text-blue-500 dark:text-blue-400 opacity-80">
            TODOS
          </h1>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
          {/* Input form */}
          <form onSubmit={addTodo} className="p-4 border-b border-gray-200 dark:border-gray-700">
            <input
              type="text"
              value={newTodo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full text-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>

          {/* Todo list */}
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-80 overflow-y-auto">
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center justify-between p-4 group hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center cursor-pointer" onClick={() => toggleTodo(todo.id)}>
                  <div className={`w-6 h-6 rounded-full border-2 ${todo.completed ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-500'} flex items-center justify-center mr-4 transition-all`}>
                    {todo.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    )}
                  </div>
                  <span className={`text-gray-800 dark:text-gray-200 ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </li>
            ))}
          </ul>
          
          {/* Footer with filters and actions */}
          {todos.length > 0 && (
             <div className="p-4 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-between">
                <span>{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>
                <div className="flex items-center space-x-2">
                    <button onClick={() => setFilter('all')} className={`px-2 py-1 rounded ${filter === 'all' ? 'border border-blue-500 text-blue-500' : ''}`}>All</button>
                    <button onClick={() => setFilter('active')} className={`px-2 py-1 rounded ${filter === 'active' ? 'border border-blue-500 text-blue-500' : ''}`}>Active</button>
                    <button onClick={() => setFilter('completed')} className={`px-2 py-1 rounded ${filter === 'completed' ? 'border border-blue-500 text-blue-500' : ''}`}>Completed</button>
                </div>
                <button onClick={clearCompleted} className="hover:text-gray-800 dark:hover:text-gray-200">Clear completed</button>
            </div>
          )}
        </div>
        
        <footer className="text-center mt-8 text-xs text-gray-400 dark:text-gray-500">
            <p>Click a to-do to mark it as complete.</p>
            <p>Happy organizing!</p>
        </footer>
      </div>
    </div>
  );
}