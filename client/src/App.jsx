
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Normal/Home";
import Footer from "./components/Footer";
import Membership from "./Pages/Normal/Membership";
import Login from "./Pages/Normal/Login";
import Gates from "./Pages/Normal/Gates";
import Resources from "./Pages/Normal/Resources";
import Gallery from "./Pages/Normal/Gallery";
import Calender from "./Pages/Normal/Calender";
import Activities from "./Pages/Admin/Activities";
import PictureUpload from "./Pages/Admin/PictureUpload";
import UploadResource from "./Pages/Admin/UploadResource";
import AddGate from "./Pages/Admin/AddGate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkAuth } from "../store/userSlice";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Auth from "./Pages/CheckAuth";
import SherpherdLayout from "./Pages/Shepherd/SherpherdLayout";
import MemberHome from "./Pages/Shepherd/MemberHome";
import MemberCalender from "./Pages/Shepherd/MemberCalender";
import Dashboard from "./Pages/Shepherd/Dashboard";
import MemberGallery from "./Pages/Shepherd/MemberGallery";
import AuthLayout from "./Pages/Normal/AuthLayout";
import NormalLayout from "./Pages/Normal/NormalLayout";
import Giving from "./Pages/Normal/Giving";
import Upcoming from "./Pages/Normal/Upcoming";
import AnnouncementsPage from "./Pages/Shepherd/AnnoucementsPage";

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuth, isloading } = useSelector((store) => store?.user);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = JSON?.parse(sessionStorage?.getItem("token"));
    if (token) {
      dispatch(checkAuth(token)).finally(() => {
        setAuthChecked(true);
      });
    } else {
      setAuthChecked(true); 
      // No token, no need to check auth
    }
  }, [dispatch]);

  if (!authChecked) {
    return <div className="bg-gray-50 h-screen" />;
  }

  return (
    <>
      

      <Routes>
        <Route path="/" element={<NormalLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="gates" element={<Gates />} />
          <Route path="giving" element={<Giving />} />
          <Route path="resources" element={<Resources />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="calender" element={<Calender />} />
          <Route path="upcoming" element={<Upcoming />} />
        </Route>

        {/* auth */}
        <Route
          path="/auth"
          element={
            <Auth user={user} isAuth={isAuth} isLoading={isloading}>
              <AuthLayout />
            </Auth>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="singup" element={<Membership />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <Auth user={user} isAuth={isAuth} isLoading={isloading}>
              <AdminLayout />
            </Auth>
          }
        >
          <Route path="uploadresource" element={<UploadResource />} />
          <Route path="activities" element={<Activities />} />
          <Route path="upload" element={<PictureUpload />} />
          <Route path="addgate" element={<AddGate />} />
        </Route>

        {/* sHERPHERD */}
        <Route
          path="/member"
          element={
            <Auth user={user} isAuth={isAuth} isLoading={isloading}>
              <SherpherdLayout />
            </Auth>
          }
        >
          <Route path="memberHome" element={<MemberHome />} />
          <Route path="giving" element={<Giving />} />
          <Route path="upcoming" element={<Upcoming/>} />
          <Route path="activities" element={<MemberCalender />} />
          <Route path="gatediscussion" element={<AnnouncementsPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gallery" element={<MemberGallery />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
};
export default App;
