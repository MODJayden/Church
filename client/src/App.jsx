import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Normal/Home";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
