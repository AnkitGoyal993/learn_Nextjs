/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
 
  useEffect(() => {
    const urlToken = searchParams.get("token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlToken) setToken(urlToken);
  }, [searchParams]);
 
  const handleReset = async () => {
    if (!password) {
      setMessage("Password is required");
      return;
    }

    try {
      await axios.post("/api/users/reset-password", {
        token,
        password,
      });

      setMessage("Password reset successfully");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Reset failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Reset Password</h1>

      <input
        type="password"
        placeholder="New password"
        className="border p-2 rounded w-64"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleReset}
        className="bg-black text-white px-4 py-2 rounded"
        disabled={!token}
      >
        Reset Password
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
