"use client";

import { ToggleTheme } from "./toggle-theme";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";


export const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null); // Especifica el tipo del estado
  
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        console.log("Session fetched:", sessionData);
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
  
    fetchSession();
  }, []);
  

  return (
<div
  className="flex items-center justify-between p-4 w-full 
  bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 
  dark:from-gray-900 dark:via-blue-800 dark:to-gray-700
  text-white shadow-lg"
>

      {/* Botón de cambio de tema */}
      <ToggleTheme />

      <nav className="flex justify-between bg-inherit">
        <h1>NextAuth</h1>

        <ul className="flex gap-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          {!session ? (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/api/auth/signout" className="text-sm underline">
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <h1 className="text-2xl font-bold">Next.js App</h1>
    </div>
  );
};
