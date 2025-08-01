import { NavLink } from "react-router-dom"

export default function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded hover:bg-gray-200 transition-colors"

  const activeClass = "font-semibold text-black bg-gray-200"

  return (
    <aside className="w-64 bg-gray-100 h-full p-4">
      <nav className="space-y-4">
        <div>
          <div className="px-4 pb-1 text-xs uppercase text-gray-500 tracking-wide">
            Documents
          </div>
          <ul className="space-y-1">
            <li>
              <NavLink
                to="/documents"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                }
              >
                All Documents
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/documents/trash"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeClass : "text-gray-700"}`
                }
              >
                Trash
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}
