import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Normal/Home";
import Footer from "./components/Footer";
import Membership from "./Pages/Normal/Membership";
import Login from "./Pages/Normal/Login";
const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
