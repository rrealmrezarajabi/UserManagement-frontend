import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar"

const DashBoardLayout = () => {
  return (
    <div>
      <NavBar/>
      <div>
        <SideBar/>
        <main>
            <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default DashBoardLayout
