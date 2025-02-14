"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/Button";

// Create a separate component that uses useSearchParams
function AuthContent() {
  const searchParams = useSearchParams();
  const initialActiveTab = searchParams.get("activeTab") || "login";
  const [currentTab, setCurrentTab] = useState(initialActiveTab);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card Container */}
      <div className="w-[350px] bg-white rounded shadow-lg p-3">
        {/* Card Header */}
        <div className="space-y-1">
          <h1 className="text-2xl text-center font-bold">ClassConnect</h1>
          <p className="text-center text-gray-600">Login or create an account to get started</p>
        </div>
        {/* Card Content */}
        <div className="p-4">
          {/* Tabs - Using buttons to switch forms */}
          <div className="grid w-full grid-cols-2 mb-4 bg-gray-300 rounded">
            <button
              onClick={() => setCurrentTab("login")}
              className={`py-2 ${currentTab === "login" ? "bg-white ml-1 my-1 rounded" : ""
                }`}
            >
              Login
            </button>
            <button
              onClick={() => setCurrentTab("signup")}
              className={`py-2 ${currentTab === "signup" ? "bg-white mr-1 my-1 rounded" : ""
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          {currentTab === "login" && (
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="login-email" className="text-sm">
                    Email
                  </label>
                  <input
                    id="login-email"
                    placeholder="Enter your email"
                    type="email"
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="login-password" className="text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="login-password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                      className="border rounded w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Signup Form */}
          {currentTab === "signup" && (
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="signup-name" className="text-sm">
                    Name
                  </label>
                  <input
                    id="signup-name"
                    placeholder="Enter your name"
                    type="text"
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="signup-email" className="text-sm">
                    Email
                  </label>
                  <input
                    id="signup-email"
                    placeholder="Enter your email"
                    type="email"
                    className="border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <label htmlFor="signup-password" className="text-sm">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="signup-password"
                      placeholder="Create a password"
                      type={showPassword ? "text" : "password"}
                      className="border rounded w-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Card Footer */}
        <div className="p-4 border-t flex flex-col">
          <Link href={"/dashboard"} className="w-full">
            <Button className="w-full">
              {currentTab === "login" ? "Log In" : "Sign Up"}
            </Button>
          </Link>
          <p className="mt-2 text-xs text-center text-gray-700">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-blue-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-blue-600">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

// Suspense wrapping necessary for the useSearchParams hook
export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  );
}