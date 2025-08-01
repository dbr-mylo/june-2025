// src/components/layout/ContributorLayout.tsx
import { Outlet } from "react-router-dom"
import { MainSidebar } from "./MainSidebar"

export function ContributorLayout() {
  return (
    <div className="flex h-screen">
      <MainSidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  )
}
