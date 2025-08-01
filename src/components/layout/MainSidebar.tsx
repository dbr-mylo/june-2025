// src/components/layout/MainSidebar.tsx
import { NavLink } from "react-router-dom"

export function MainSidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 space-y-2 text-sm">
      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Navigation
      </div>
      <NavLink
        to="/documents"
        className={({ isActive }) =>
          `block px-2 py-1 rounded ${
            isActive ? "font-semibold bg-white" : "text-gray-700 hover:bg-gray-200"
          }`
        }
      >
        Documents
      </NavLink>
      <NavLink
        to="/documents/trash"
        className={({ isActive }) =>
          `block px-2 py-1 rounded ${
            isActive ? "font-semibold bg-white" : "text-gray-700 hover:bg-gray-200"
          }`
        }
      >
        Trash
      </NavLink>
    </aside>
  )
}
