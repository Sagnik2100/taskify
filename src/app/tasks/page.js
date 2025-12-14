"use client";
import { useEffect, useState } from "react";
import AddTask from "../components/addTask";

export default function TasksPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [userTasks, setUserTasks] = useState([]);

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch("/api/getTasks");
        const data = await res.json();
        setUserTasks(data);
        
      } catch (e) {
        alert(e);
      }
    }

    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
          My Task List
        </h2>

        <ul className="space-y-4">
          {userTasks.length > 0 ? (
            userTasks.map((task) => (
              <li
                className="p-4 rounded-lg shadow-md bg-purple-50 border-l-4 border-purple-500 hover:bg-purple-100 transition-colors"
                key={task.id}
              >
                <span className="font-semibold text-gray-800">{task.title}</span>{" "}
                : <span className="text-gray-600">{task.description}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500 italic">No tasks found.</li>
          )}
        </ul>

        <button
          className="mt-6 w-full py-3 bg-purple-500 text-white font-semibold rounded-lg shadow hover:bg-purple-600 transition-colors"
          onClick={toggleVisibility}
        >
          {isVisible ? "Close Task Form" : "Add a Task?"}
        </button>

        {isVisible && (
          <div className="mt-6 bg-gray-50 p-6 rounded-xl shadow-inner border border-gray-200">
            <AddTask onTaskAdded={setUserTasks} />
          </div>
        )}
      </div>
    </div>
  );
}
