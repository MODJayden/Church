import Navbar from "@/components/Navbar"
import { Outlet } from "react-router-dom"

const NormalLayout = () => {
  return (
    <>
    <Navbar />
      <Outlet />
    </>
  )
}
export default NormalLayout