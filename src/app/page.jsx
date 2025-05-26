"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../services/auth';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ username, password });
      localStorage.setItem('token', data.token);
      router.push('/home');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[350px] p-6 border  rounded-md bg-white shadow-md">
        <div className="flex justify-center mb-6">
            <img  src="/img/logo.svg"
              alt="Logo" className="h-10" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
        <div className="flex flex-col mt-8 md:mt-10">

            <p className="label-text">Username</p>
            <input
              type="text"
              placeholder="Input username"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <p className="label-text">Password</p>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Input password"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-2  text-sm text-black-500"
                onClick={() => setShowPassword(!showPassword)}
              >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm ">
          <p className="text">
              Don’t have an account?{' '}
          </p>
            <Link href="/register" className="text-blue-600 hover:underline">
        Register
      </Link>
        </div>
      </div>
    </div>
  );
}

