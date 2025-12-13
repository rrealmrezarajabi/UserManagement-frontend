import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: "admin@example.com",
      password: "123456",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (e: any) {
      setServerError(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          className={[
            "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none",
            "placeholder:text-slate-400",
            "focus:ring-4 focus:ring-slate-100",
            errors.email
              ? "border-red-300 focus:border-red-400"
              : "border-slate-200 focus:border-slate-300",
          ].join(" ")}
          placeholder="admin@example.com"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          type="password"
          className={[
            "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-900 outline-none",
            "placeholder:text-slate-400",
            "focus:ring-4 focus:ring-slate-100",
            errors.password
              ? "border-red-300 focus:border-red-400"
              : "border-slate-200 focus:border-slate-300",
          ].join(" ")}
          placeholder="••••••"
          {...register("password", {
            required: "Required",
            minLength: { value: 6, message: "Min 6 characters" },
          })}
        />
        {errors.password && (
          <p className="mt-1.5 text-xs text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className={[
          "w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-white",
          "bg-slate-900 hover:bg-slate-800",
          "focus:outline-none focus:ring-4 focus:ring-slate-200",
          "disabled:cursor-not-allowed disabled:opacity-60",
        ].join(" ")}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
