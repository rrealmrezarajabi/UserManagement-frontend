import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const DashBoardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <NavBar />

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:py-6">
        <SideBar />

        <main className="min-h-[calc(100vh-190px)] flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
