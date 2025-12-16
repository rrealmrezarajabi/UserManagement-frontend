import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import type { UpdateUserDto, UserRole } from "../../../types/user";
import { useGetUser } from "../hooks/useGetUser";
import { useUpdateUser } from "../hooks/useUpdateUser";

const EditUserPage = () => {
  const { id } = useParams();
  const userId = Number(id);
  const navigate = useNavigate();

  const { data: user, isLoading } = useGetUser(userId);
  const { mutate, isPending } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserDto>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        isActive: user.isActive,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UpdateUserDto) => {
    mutate(
      { id: userId, data },
      {
        onSuccess: () => navigate("/dashboard/users"),
      }
    );
  };

  const roles: UserRole[] = ["USER", "ADMIN"];

  if (isLoading) {
    return <div className="text-sm text-slate-500">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-xl font-semibold text-slate-900">Edit User</h1>
      <p className="mt-1 text-sm text-slate-500">Update user information</p>

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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;
