import React, { useState } from "react";

export default function AddTask() {
  const [TaskData, setTaskData] = useState<{ title: string; desc: string }>({
    title: "",
    desc: ""
  });

  async function AddTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (TaskData.title === "" || TaskData.desc === "") {
      alert("Provide Data!!");
      return;
    }

    const res = await fetch("/api/addTask", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(TaskData)
    });

    setTaskData({ title: "", desc: "" });
    alert("Task Added");
    console.log(res);
  }

  return (
    <div>
      <form onSubmit={AddTask}>
        <label htmlFor="title">Add Title</label>
        <input
          type="text"
          className="shadow-md rounded"
          name="title"
          value={TaskData.title}
          onChange={(e) =>
            setTaskData({ ...TaskData, title: e.target.value })
          }
        />

        <label htmlFor="desc">Add Description</label>
        <input
          type="text"
          className="shadow-md rounded"
          name="desc"
          value={TaskData.desc}
          onChange={(e) =>
            setTaskData({ ...TaskData, desc: e.target.value })
          }
        />

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg hover:scale-105 transform transition-all duration-200"
        >
          Add
        </button>
      </form>
    </div>
  );
}
