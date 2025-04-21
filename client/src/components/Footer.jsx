import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 p-8 md:p-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Brand/Logo Section */}
        <div className="mb-6 md:mb-0">
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            Throneroom Int.
          </Link>
          <p className="mt-2 text-sm">
            Spreading the message of faith and community.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="hover:text-blue-400 transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/give-offering"
                className="hover:text-blue-400 transition-colors"
              >
                Give Offering
              </Link>
            </li>
            <li>
              <Link
                to="/gates"
                className="hover:text-blue-400 transition-colors"
              >
                Gates
              </Link>
            </li>
            <li>
              <Link
                to="/resources"
                className="hover:text-blue-400 transition-colors"
              >
                Resources
              </Link>
            </li>
            {/* Add other relevant links if needed */}
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
          </div>
          <p className="mt-4 text-sm">Follow us on social media for updates.</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 pt-6 text-center text-sm">
        <p>&copy; {currentYear} Throneroom Int. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
