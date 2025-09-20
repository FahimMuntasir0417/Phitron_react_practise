import { useState, useEffect } from "react";

const ResponsiveNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-lg py-2"
          : "bg-gradient-to-r from-blue-900 to-purple-900 py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="text-xl md:text-2xl font-bold text-white flex items-center"
            >
              <div className="bg-blue-500 p-2 rounded-md mr-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className={scrolled ? "text-blue-900" : "text-white"}>
                BrandName
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <a
              href="#"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-300"
              }`}
            >
              Home
            </a>
            <a
              href="#"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-300"
              }`}
            >
              About
            </a>
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-md font-medium flex items-center transition-colors ${
                  scrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-white hover:text-blue-300"
                }`}
              >
                Services
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  Web Development
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  App Development
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  UI/UX Design
                </a>
              </div>
            </div>
            <a
              href="#"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-300"
              }`}
            >
              Portfolio
            </a>
            <a
              href="#"
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                scrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-white hover:text-blue-300"
              }`}
            >
              Contact
            </a>
          </div>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                scrolled
                  ? "text-blue-600 hover:bg-blue-100"
                  : "text-white hover:bg-blue-700 hover:bg-opacity-20"
              }`}
            >
              Login
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md focus:outline-none ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {!isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white rounded-md mt-2 shadow-lg">
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-100"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-100"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-100"
            >
              Services
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-100"
            >
              Portfolio
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-100"
            >
              Contact
            </a>
            <div className="border-t border-gray-200 pt-2">
              <button className="block w-full text-left px-4 py-2 text-blue-600 rounded-md hover:bg-blue-100">
                Login
              </button>
              <button className="block w-full text-left px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
