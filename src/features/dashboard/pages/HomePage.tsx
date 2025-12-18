import { useMemo } from "react";
import { useGetUsers } from "../../users/hooks/useGetUsers";
import type { User } from "../../../types/user";

const groupUsersByMonth = (users: User[]) => {
  const counts = new Map<string, number>();

  users.forEach((user) => {
    const date = new Date(user.createdAt);
    if (Number.isNaN(date.getTime())) return;

    const key = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });

  const sorted = Array.from(counts.entries()).sort((a, b) =>
    a[0] > b[0] ? 1 : -1
  );

  // Only keep last 6 months for the chart
  return sorted.slice(-6);
};

const HomePage = () => {
  const { data, isLoading, isError } = useGetUsers(1, 100);

  const users = data?.data ?? [];
  const totalUsers = data?.meta.total ?? users.length;

  const { activeCount, adminCount, inactiveCount, userCount } = useMemo(() => {
    let active = 0;
    let inactive = 0;
    let admins = 0;
    let normalUsers = 0;

    users.forEach((u) => {
      if (u.isActive) active += 1;
      else inactive += 1;

      if (u.role === "ADMIN") admins += 1;
      else normalUsers += 1;
    });

    return {
      activeCount: active,
      inactiveCount: inactive,
      adminCount: admins,
      userCount: normalUsers,
    };
  }, [users]);

  const monthlyData = useMemo(() => groupUsersByMonth(users), [users]);
  const maxMonthly = monthlyData.reduce(
    (max, [, value]) => (value > max ? value : max),
    0
  );

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500">
        Loading dashboard...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-red-600">
        Failed to load dashboard data. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Users Overview
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          High-level stats and activity for your user management system.
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Total Users
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {totalUsers}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-emerald-600">
            Active Users
          </div>
          <div className="mt-2 text-2xl font-semibold text-emerald-900">
            {activeCount}
          </div>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-amber-600">
            Admins
          </div>
          <div className="mt-2 text-2xl font-semibold text-amber-900">
            {adminCount}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Inactive Users
          </div>
          <div className="mt-2 text-2xl font-semibold text-slate-900">
            {inactiveCount}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Users over time chart */}
        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                New users over time
              </h2>
              <p className="text-xs text-slate-500">
                Based on account creation dates (last 6 months).
              </p>
            </div>
            <span className="rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-500">
              Simple chart
            </span>
          </div>

          {monthlyData.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-xs text-slate-500">
              Not enough data yet to display this chart.
            </div>
          ) : (
            <div className="flex h-40 items-end gap-3 sm:h-48">
              {monthlyData.map(([month, count]) => {
                const height =
                  maxMonthly === 0 ? 0 : Math.max((count / maxMonthly) * 100, 10);

                const [year, monthNum] = month.split("-");
                const label = new Date(
                  Number(year),
                  Number(monthNum) - 1,
                  1
                ).toLocaleDateString(undefined, {
                  month: "short",
                });

                return (
                  <div key={month} className="flex-1">
                    <div
                      className="rounded-t-xl bg-slate-900/80"
                      style={{ height: `${height}%` }}
                    />
                    <div className="mt-2 text-center text-[10px] text-slate-500 sm:text-xs">
                      {label}
                    </div>
                    <div className="mt-0.5 text-center text-[10px] font-medium text-slate-700 sm:text-xs">
                      {count}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Role vs status distribution */}
        <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
                User distribution
              </h2>
              <p className="text-xs text-slate-500">
                Breakdown by role and activity status.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Role chart */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
                <span>Roles</span>
                <span>
                  {adminCount} admins · {userCount} users
                </span>
              </div>

              <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-amber-400"
                  style={{
                    width:
                      totalUsers === 0
                        ? "0%"
                        : `${(adminCount / totalUsers) * 100}%`,
                  }}
                />
                <div
                  className="bg-slate-900"
                  style={{
                    width:
                      totalUsers === 0
                        ? "0%"
                        : `${(userCount / totalUsers) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Admin
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-900" />
                  User
                </span>
              </div>
            </div>

            {/* Active vs inactive chart */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
                <span>Activity</span>
                <span>
                  {activeCount} active · {inactiveCount} inactive
                </span>
              </div>

              <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="bg-emerald-500"
                  style={{
                    width:
                      totalUsers === 0
                        ? "0%"
                        : `${(activeCount / totalUsers) * 100}%`,
                  }}
                />
                <div
                  className="bg-slate-400"
                  style={{
                    width:
                      totalUsers === 0
                        ? "0%"
                        : `${(inactiveCount / totalUsers) * 100}%`,
                  }}
                />
              </div>

              <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Active
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  Inactive
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
