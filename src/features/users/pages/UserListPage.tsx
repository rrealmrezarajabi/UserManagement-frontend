import { useGetUsers } from "../hooks/useGetUsers";
import UserTable from "../components/UserTable";

const UserListPage = () => {
  const { data, isLoading, error } = useGetUsers();

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users</p>;

  return (
    <div>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">Users</h1>

      {data && <UserTable users={data} />}
    </div>
  );
};

export default UserListPage;
