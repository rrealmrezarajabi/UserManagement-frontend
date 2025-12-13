import LoginForm from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  if (isAuthenticated) {
    navigate("/dashboard");
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-slate-900">
                Admin Dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-500">Sign in to continue</p>
            </div>

            <LoginForm />

            <div className="mt-6 text-xs text-slate-400">
              Demo login: <span className="font-medium">admin@example.com</span>{" "}
              / <span className="font-medium">123456</span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} User Management Dashboard
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
