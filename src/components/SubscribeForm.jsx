// src/components/SubscribeForm.jsx
import React, { useState } from "react";
import { subscribeUser } from "../services/subscribeService";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null); // null | success | error | exists

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await subscribeUser(email.trim().toLowerCase());
      if (res.alreadySubscribed) {
        setStatus("exists");
      } else {
        setStatus("success");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        required
        placeholder="Enter your email to get notified"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 p-3 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-r-md">Subscribe</button>

      <div className="w-full mt-2">
        {status === "success" && <p className="text-green-400">Subscribed — you will be notified.</p>}
        {status === "exists" && <p className="text-yellow-400">You're already subscribed.</p>}
        {status === "error" && <p className="text-red-400">Something went wrong. Try again.</p>}
      </div>
    </form>
  );
};

export default SubscribeForm;
