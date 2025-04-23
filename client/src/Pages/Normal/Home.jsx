import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import apostle from "../../assets/apostle.png";
import offering from "../../assets/offering.png";
import emblem from "../../assets/throneroom.png";
import banner from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";

import { CheckCircle, MapPin } from "lucide-react";
/* import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; */

// Fix Leaflet default icon issue
/* delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
}); */

// Image URLs (same as before)
const backgroundImages = [banner2, banner, banner3, banner4];

// --- TODO: Replace with the actual path to your pioneer image ---
const pioneerImagePath = apostle;
// ---------------------------------------------------------------

// --- TODO: Replace with the actual path to your partnership image ---
const partnershipImagePath = offering;
// ------------------------------------------------------------------

// --- Coordinates for Bojo Beach area ---
const churchPosition = [5.5096, -0.3274];
// ----------------------------------------

// --- TODO: Replace with actual path to church building image ---
const churchBuildingImagePath = "/src/assets/church-building.jpg";
// -------------------------------------------------------------

// --- TODO: Replace with actual path to About Us image ---
const aboutUsImagePath = emblem;
// -------------------------------------------------------

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="flex flex-col">
      {" "}
      {/* Full screen hero section */}
      {/* Background Image Container */}
      <div className="relative h-screen w-full overflow-hidden">
        {backgroundImages.map((imageUrl, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              // Smooth fade transition
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        ))}
        {/* Optional: Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        {/* Overlay Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to Throneroom Int.
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Experience fellowship, growth, and purpose with us. Find your place
            in our vibrant community.
          </p>
          <Link to="/membership">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white border border-transparent hover:border-white transition-all"
            >
              Become a Member
            </Button>
          </Link>
        </div>
      </div>
      {/* --- End Hero Section --- */}
      {/* --- About Us Section --- */}
      {/* --- End About Us Section --- */}
      {/* --- Mission & Vision Section --- */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12 text-center">
            Our Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Mission List */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 text-center md:text-left">
                Our Mission
              </h3>
              <ul className="space-y-4 list-none">
                {/* --- TODO: Replace with actual mission points --- */}
                <li className="flex items-start gap-3">
                  <CheckCircle
                    size={24}
                    className="text-green-500 shrink-0 mt-1"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    To spread the Gospel through dynamic worship and relevant
                    teaching.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle
                    size={24}
                    className="text-green-500 shrink-0 mt-1"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    To build authentic community through fellowship and care.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle
                    size={24}
                    className="text-green-500 shrink-0 mt-1"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    To serve our local community and beyond with compassion.
                  </span>
                </li>
                {/* ------------------------------------------------ */}
              </ul>
            </div>
            {/* Vision List */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-5 text-center md:text-left">
                Our Vision
              </h3>
              <ul className="space-y-4 list-none">
                {/* --- TODO: Replace with actual vision points --- */}
                <li className="flex items-start gap-3">
                  <CheckCircle
                    size={24}
                    className="text-blue-500 shrink-0 mt-1"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    To be a beacon of hope, known for our love and impact.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle
                    size={24}
                    className="text-blue-500 shrink-0 mt-1"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    To raise up passionate followers of Christ who transform the
                    world.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle
                    size={24}
                    className="text-blue-500 shrink-0 mt-1"
                  />
                  <span className="text-gray-700 leading-relaxed">
                    To establish a legacy of faith for future generations.
                  </span>
                </li>
                {/* ------------------------------------------------ */}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* --- End Mission & Vision Section --- */}
      {/* --- About the Pioneer Section --- */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image Column */}
          <div className="order-1 md:order-1">
            <img
              src={pioneerImagePath}
              alt="Pioneer of Throneroom Int."
              className="w-full h-auto rounded-lg shadow-xl object-cover aspect-square md:aspect-auto" // Added aspect ratio control
            />
          </div>
          {/* Text Column */}
          <div className="order-2 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
              Meet Our Pioneer
            </h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              {/* --- TODO: Replace with actual content about the pioneer --- */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
              {/* ------------------------------------------------------------ */}
            </p>
            {/* Optional: Add a button/link for more info */}
            {/* <Link to="/about-pioneer">
              <Button variant="link" className="mt-4 px-0 text-blue-600">
                Learn More About Their Story &rarr;
              </Button>
            </Link> */}
          </div>
        </div>
      </section>
      {/* --- End About the Pioneer Section --- */}
      {/* --- Partnership Section --- */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Column */}
          <div className="order-2 md:order-1">
            {" "}
            {/* Text first on mobile, left on desktop */}
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
              Partner With Us
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              {/* --- TODO: Replace with actual content about partnership --- */}
              Your generous support helps us continue our mission, reach more
              people, and make a difference in the community. Join us in
              spreading hope and faith.
              {/* ------------------------------------------------------------- */}
            </p>
            <Link to="/give-offering">
              {" "}
              {/* TODO: Update link if needed */}
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Give Online
              </Button>
            </Link>
          </div>
          {/* Image Column */}
          <div className="order-1 md:order-2">
            {" "}
            {/* Image second on mobile, right on desktop */}
            <img
              src={partnershipImagePath}
              alt="Partnership and Giving"
              className="w-full h-auto rounded-lg shadow-xl object-cover aspect-video md:aspect-auto" // Use aspect-video for potentially wider image
            />
          </div>
        </div>
      </section>
      {/* --- End Partnership Section --- */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text Column */}
          <div className="order-2 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-6">
              About Throneroom Int.
            </h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              {/* --- TODO: Replace with actual content about the church --- */}
              We are a vibrant community of faith dedicated to sharing the
              message of hope, love, and transformation. Our doors are open to
              everyone seeking spiritual growth and genuine fellowship.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Founded on strong biblical principles, we strive to impact our
              local community and the world through worship, service, and
              discipleship. Come experience the difference faith makes.
              {/* ---------------------------------------------------------- */}
            </p>
            {/* Optional: Add a button linking to a more detailed about page */}
            {/* <Link to="/about-us">
              <Button variant="outline" className="mt-8 border-blue-500 text-blue-500 hover:bg-blue-50">
                Learn More About Us
              </Button>
            </Link> */}
          </div>
          {/* Image Column */}

          <div className="order-1 md:order-1">
            <img
              src={aboutUsImagePath}
              alt="About Throneroom Int. Community"
              className="w-full h-auto rounded-lg shadow-xl object-cover aspect-video md:aspect-[4/3]"
            />
          </div>
        </div>
      </section>
            {/* --- Location Section --- */}
            <section className="bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
            Visit Us
          </h2>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-gray-600 text-lg mb-8">
              <MapPin size={24} className="text-blue-500" />
              <p>The church is located at Kasoa, Old Bortianor, close to Bojo Beach</p>
            </div>
            
            {/* Uncomment this section if you want to enable the map */}
           
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map would be displayed here</p>
            </div>
            
          </div>
        </div>
      </section>
      {/* --- End Location Section --- */}
      {/* <section className="z-0 bg-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mb-4">
            Visit Us
          </h2>
          <p className="flex items-center justify-center gap-2 text-gray-600 text-lg mb-8">
            <MapPin size={20} className="text-blue-500" />
            Kasoa Old Bortianor, close to Bojo Beach
          </p>
        
          {L && (
            <MapContainer
              center={churchPosition}
              zoom={15} // Adjust zoom level as needed
              scrollWheelZoom={false} // Disable scroll wheel zoom if preferred
              style={{
                height: "450px",
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }} // Define height and styling
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={churchPosition}>
                <Popup minWidth={200}>
                  <img
                    src={churchBuildingImagePath}
                    alt="Throneroom Int. Building"
                    className="w-full h-auto rounded"
                  />
                  <p className="text-center font-semibold mt-2">
                    Throneroom Int.
                  </p>
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </div>
      </section> */}
    </div>
  );
};

export default Home;
