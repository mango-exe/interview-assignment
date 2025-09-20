import { Outlet, Link } from "react-router-dom";
import Topbar from "./Topbar";

import { ChevronRight } from 'lucide-react'

import { useLocation } from 'react-router-dom'

export default function MainLayout() {
  const location = useLocation()
  return (
    <div className="grid grid-cols-[250px_1fr] min-h-screen bg-gradient-to-t from-[var(--light-purple)] to-[var(--brighter-purple)]">
      <aside className="relative p-4 bg-gradient-to-t from-light-purple to-brighter-purple">
        <div className="relative top-10">
          <div className="bg-white rounded-xl flex items-center justify-center h-[4em] w-[12em]">
            <div className="text-gray-400 font-bold">
              LOGO
            </div>
          </div>
          <div className="mt-5">
            <div>
              Menu
            </div>
            <nav className="mt-5 flex flex-col gap-2">
              <div className="grid grid-cols-[20%_80%] items-center">
                <ChevronRight className="justify-self-start" />
                <Link className={`justify-self-start ${location.pathname === '/home' ? 'font-bold' : ''}`} to="/home">Home</Link>
              </div>
              <div className="grid grid-cols-[20%_80%] items-center">
                <ChevronRight className="justify-self-start" />
                <Link className={`justify-self-start ${location.pathname === '/invoices' ? 'font-bold' : ''}`} to="/invoices">Invoices</Link>
              </div>
              <div className="grid grid-cols-[20%_80%] items-center">
                <ChevronRight className="justify-self-start" />
                <Link className={`justify-self-start ${location.pathname === '/bills' ? 'font-bold' : ''}`} to="/bills">Bills</Link>
              </div>
              <div className="grid grid-cols-[20%_80%] items-center">
                <ChevronRight className="justify-self-start" />
                <Link className={`justify-self-start ${location.pathname === '/expenses' ? 'font-bold' : ''}`} to="/expenses">Expenses</Link>
              </div>
              <div className="grid grid-cols-[20%_80%] items-center">
                <ChevronRight className="justify-self-start" />
                <Link className={`justify-self-start ${location.pathname === '/reports' ? 'font-bold' : ''}`} to="/reports">Reports</Link>
              </div>
            </nav>
          </div>

        </div>
      </aside>

      <main className="relative top-2 mb-2  right-1 rounded-2xl bg-white">
        <div className="p-5">
          <Topbar />
        </div>
        <div className="w-full h-[1px] bg-gray-300"></div>
        <div className="p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
