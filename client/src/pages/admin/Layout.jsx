import { Outlet } from "react-router-dom"
import Sidebar from "../../components/admin/Sidebar"


const Layout = () => {



  return (
    <>
        <div className="flex h-[85vh]">
            
            <Sidebar />
            <Outlet />
        </div>
    </>
  )
}

export default Layout
