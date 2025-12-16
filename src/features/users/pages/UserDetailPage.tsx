import { useParams } from "react-router-dom";

const UserDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-xl font-semibold">User Details</h1>
      <p className="mt-2 text-sm text-slate-500">User ID: {id}</p>
    </div>
  );
};

export default UserDetailPage;
