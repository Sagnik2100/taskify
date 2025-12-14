"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // Type the change event for input elements
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // Type the form submit event
  async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: formData.username,
        password: formData.password
      })
    });

    const data = await res.json();

    // Assuming your API returns a property `isValidated`
    if (data[0]?.isValidated === 1) {
      router.push("../tasks");
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl p-8">
        <form onSubmit={HandleSubmit} className="p-6 bg-white shadow-md rounded">
          <label className="block mb-2">Enter Username</label>
          <input
            className="border-2 border-solid"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
          />
          <label className="block mb-2">Enter Password</label>
          <input
            className="border-2 border-solid"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
