import { useNavigate, useParams } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { formatDateTime } from "../../../utils/date";

const UserDetailPage = () => {
  const { id } = useParams();
  const userId = Number(id);
  const navigate = useNavigate();

  const { data: user, isLoading, isError } = useGetUser(userId);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-6 w-40 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-64 rounded bg-slate-100" />
          </div>
          <div className="h-9 w-24 rounded-xl bg-slate-100" />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="h-14 w-14 rounded-full bg-slate-100" />
            <div className="mt-4 h-5 w-48 rounded bg-slate-100" />
            <div className="mt-2 h-4 w-56 rounded bg-slate-50" />
            <div className="mt-5 flex gap-2">
              <div className="h-7 w-20 rounded-full bg-slate-100" />
              <div className="h-7 w-20 rounded-full bg-slate-100" />
            </div>
            <div className="mt-6 h-10 w-full rounded-xl bg-slate-100" />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <div className="h-5 w-44 rounded bg-slate-100" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-4">
                  <div className="h-3 w-20 rounded bg-slate-100" />
                  <div className="mt-2 h-4 w-40 rounded bg-slate-50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="text-sm font-medium text-red-800">
            Failed to load user details
          </div>
          <div className="mt-1 text-sm text-red-700">
            Please check the user id and try again.
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard/users")}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Users List
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusBadge = user.isActive ? (
    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
      Active
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700">
      Inactive
    </span>
  );

  const roleBadge =
    user.role === "ADMIN" ? (
      <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
        ADMIN
      </span>
    ) : (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
        USER
      </span>
    );

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">User Details</h1>
          <p className="mt-1 text-sm text-slate-500">
            View profile information, account status, and metadata.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate("/dashboard/users")}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to Users
          </button>
          <button
            type="button"
            onClick={() => navigate(`/dashboard/users/edit/${user.id}`)}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Edit User
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-14 w-14 rounded-full border border-slate-200 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 rounded-full border border-white bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                #{user.id}
              </div>
            </div>

            <div className="min-w-0">
              <div className="truncate text-base font-semibold text-slate-900">
                {user.name}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {roleBadge}
            {statusBadge}
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Quick Info
            </div>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-slate-500">Phone</span>
                <span className="font-medium text-slate-900">
                  {user.phone || "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Email</span>
                <span className="font-medium text-slate-900">{user.email}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-900">
              Account Information
            </h2>
            <span className="text-xs text-slate-400">
              Last updated: {formatDateTime(user.updatedAt)}
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Email
              </div>
              <div className="mt-2 break-all text-sm font-medium text-slate-900">
                {user.email}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Phone
              </div>
              <div className="mt-2 text-sm font-medium text-slate-900">
                {user.phone || "—"}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Role
              </div>
              <div className="mt-2">{roleBadge}</div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </div>
              <div className="mt-2">{statusBadge}</div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Created At
              </div>
              <div className="mt-2 text-sm font-medium text-slate-900">
                {formatDateTime(user.createdAt)}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Last Login
              </div>
              <div className="mt-2 text-sm font-medium text-slate-900">
                {formatDateTime(user.lastLogin)}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDetailPage;
