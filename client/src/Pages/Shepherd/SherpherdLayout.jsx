import MemberNavbar from "@/components/MemberNavbar";
import { Outlet } from "react-router-dom";
const SherpherdLayout = () => {
  return (
    <>
      <MemberNavbar />
      <Outlet />
    </>
  );
};
export default SherpherdLayout;
