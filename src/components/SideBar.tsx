import { NavLink } from "react-router-dom";

const SideBar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "block rounded-xl px-3 py-2 text-sm font-medium transition",
      isActive
        ? "bg-slate-900 text-white"
        : "text-slate-700 hover:bg-slate-100",
    ].join(" ");

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:w-64">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Menu
        </div>
      </div>

      <nav className="space-y-2">
        <NavLink to="/dashboard" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/dashboard/users" end className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/dashboard/users/create" className={linkClass}>
          Create User
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideBar;
