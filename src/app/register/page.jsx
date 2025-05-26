"use client";

import { register } from "../../services/auth";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(username, role, password);
      window.alert(response.message);
      router.push("/");
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[350px] p-6 rounded-md bg-white shadow-md">
            <div className="flex justify-center mb-6">
              <img src="/img/logo.svg" alt="Logo" className="h-10" />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col mt-8 md:mt-10">

                  <p className="label-text">Nama</p>
                  <input
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2"
                    type="text"
                    placeholder="Masukkan nama anda..."
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                <p className="label-text">Password</p>
                <input
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2"
                  type="password"
                  placeholder="Masukkan password anda..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <p className="label-text">Role</p>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2 text-gray-700"
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Pilih Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                      Register
                </button>
                  <div className="text-center mt-4 text-sm">
                  <p className="text">Sudah punya akun?{" "}
                  <u
                    className="font-bold text-blue-700 cursor-pointer"
                    onClick={() => router.push("/")}
                  >
                    Login
                  </u>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
  );
};

export default RegisterPage;
