import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { CreateUserDto, UserRole } from "../../../types/user";
import { useCreateUser } from "../hooks/useCreateUser";

const CreateUserPage = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserDto>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      avatar: "https://i.pravatar.cc/150?img=1",
      role: "USER",
      isActive: true,
    },
  });

  const onSubmit = (data: CreateUserDto) => {
    mutate(data, {
      onSuccess: () => navigate("/dashboard/users"),
    });
  };

  const roles: UserRole[] = ["USER", "ADMIN"];

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-xl font-semibold text-slate-900">Create User</h1>
      <p className="mt-1 text-sm text-slate-500">
        Add a new user to the system
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            {...register("phone")}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            placeholder="+1 555 123 4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Avatar URL
          </label>
          <input
            {...register("avatar")}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-slate-400">
            Example: https://i.pravatar.cc/150?img=12
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Role
          </label>
          <select
            {...register("role")}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-slate-700">
            Active
          </label>
          <input
            type="checkbox"
            {...register("isActive")}
            className="h-4 w-4"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting || isPending}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;
