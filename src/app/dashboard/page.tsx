"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <nav className="p-4 space-y-2">
          <h1 className="text-lg font-bold dark:text-gray-100">Dashboard</h1>
          <ul className="space-y-2">
            <li>
              <a
                href="#overview"
                className={cn(
                  "block px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
                )}
              >
                Overview
              </a>
            </li>
            <li>
              <a
                href="#analytics"
                className={cn(
                  "block px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
                )}
              >
                Analytics
              </a>
            </li>
            <li>
              <a
                href="#settings"
                className={cn(
                  "block px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-100"
                )}
              >
                Settings
              </a>
            </li>
          </ul>
          <Button variant="default" className="mt-2"
          onClick={() => signOut({ callbackUrl: '/login' })}>
               Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Use the sidebar to navigate through the sections.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Card */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                This is an overview of your dashboard data.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Analyze your data to make informed decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                Customize your preferences and configurations here.
              </p>
              <Button variant="default" className="mt-4">
                Go to Settings
              </Button>
            </CardContent>
          </Card>
          
        </div>
      </main>
    </div>
  );
}
