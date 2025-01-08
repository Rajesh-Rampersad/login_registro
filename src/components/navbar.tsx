//creacion de navbar
"use client"

import { ToggleTheme } from "./toggle-theme"

export const Navbar = () => {
    return (
        <div className="flex items-center justify-between p-4 mx-auto cursor-pointer sm:max-w-6xl">
       <ToggleTheme />
       <h1 className="text-2xl font-bold">Next.js App</h1>
        </div>
    )
}