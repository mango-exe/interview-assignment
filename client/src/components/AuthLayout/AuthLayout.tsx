import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-[var(--light-purple)] to-[var(--brighter-purple)]">
      <div className="w-full h-auto max-w-md p-6 bg-white rounded-2xl shadow">
        <Outlet />
      </div>
    </div>
  );
}
