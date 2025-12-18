import { useEffect, useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import UserTable from "../components/UserTable";

const UserListPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const [q, setQ] = useState(""); // search input
  const [search, setSearch] = useState(""); // debounce

  // Debounce 
  useEffect(() => {
    const t = setTimeout(() => setSearch(q.trim()), 1000);
    return () => clearTimeout(t);
  }, [q]);


  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading, error } = useGetUsers(
    page,
    limit,
    search || undefined
  );

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-slate-900">Users</h1>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name / email / phone..."
          className="w-full max-w-sm rounded border px-3 py-2 text-sm"
        />
      </div>

      {data && (
        <>
          <UserTable users={data.data} />

          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              className="rounded border px-3 py-1 disabled:opacity-50"
              disabled={!data.meta.hasPrev}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span className="text-sm text-slate-700">
              Page {data.meta.page} of {data.meta.totalPages} — Total{" "}
              {data.meta.total}
            </span>

            <button
              className="rounded border px-3 py-1 disabled:opacity-50"
              disabled={!data.meta.hasNext}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserListPage;
