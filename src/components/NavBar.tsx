import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            A
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Admin Dashboard
            </div>
            <div className="text-xs text-slate-500">User Management</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-sm font-medium text-slate-900">
              {user?.name ?? "Admin"}
            </div>
            <div className="text-xs text-slate-500">{user?.email}</div>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
