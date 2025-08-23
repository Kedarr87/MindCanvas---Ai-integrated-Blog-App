import { useLocation, useNavigate } from "react-router-dom"
import {assets} from "../assets/assets"
const Navbar = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const isAdminPage = location.pathname.startsWith("/admin")


    const handleClick = () => {
      if(isAdminPage){
        navigate("/login")
      }else{
        navigate("/login")
      }
    }

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32 cursor-pointer '>
      <img src="/logo.svg" alt="logo" onClick={() => navigate("/")} className="w-32 sm:w-44 cursor-pointer" />
      <button onClick={handleClick} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5">{isAdminPage ? "Logout" : "Login"}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  )
}

export default Navbar
