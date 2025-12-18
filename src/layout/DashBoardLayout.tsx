import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const DashBoardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />

      <div className="mx-auto flex max-w-7xl gap-4 px-4 py-6">
        <SideBar />

        <main className="min-h-[calc(100vh-190px)] flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
