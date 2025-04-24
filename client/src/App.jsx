import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gates" element={<Gates />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/calender" element={<Calender />} />

        {/* Admin */}

        <Route path="/activities" element={<Activities />} />
        <Route path="/upload" element={<PictureUpload />} />
        <Route path="/addgate" element={<AddGate />} />

      </Routes>
      <Footer />
    </>
  );
};
export default App;
