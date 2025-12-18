import { useState } from "react";
import { useGetUsers } from "../hooks/useGetUsers";
import UserTable from "../components/UserTable";

const UserListPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10; 

  const { data, isLoading, error } = useGetUsers(page, limit);

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">Users</h1>

      {data && (
        <>
          <UserTable users={data.data} />

          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              className="rounded border px-3 py-1 disabled:opacity-50 text-white bg-slate-900 hover:bg-slate-800"
              disabled={!data.meta.hasPrev}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </button>

            <span className="text-sm text-slate-700">
              Page {data.meta.page} of {data.meta.totalPages}
            </span>

            <button
              className="rounded border px-3 py-1 disabled:opacity-50 text-white bg-slate-900 hover:bg-slate-800"
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
