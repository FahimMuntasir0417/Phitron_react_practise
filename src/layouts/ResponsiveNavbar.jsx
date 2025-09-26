import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ResponsiveNavbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
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

  // Close mobile menu when clicking on a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Navbar style configuration
  const navbarStyles = {
    nav: scrolled
      ? "bg-white shadow-lg py-2"
      : "bg-gradient-to-r from-blue-900 to-purple-900 py-4",

    text: scrolled
      ? "text-gray-700 hover:text-blue-600"
      : "text-white hover:text-blue-300",

    logo: scrolled ? "text-blue-900" : "text-white",

    button: scrolled
      ? "text-blue-600 hover:bg-blue-100"
      : "text-white hover:bg-blue-700 hover:bg-opacity-20",

    mobileButton: scrolled ? "text-gray-700" : "text-white",
  };

  // Menu items data
  const menuItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Portfolio", href: "#" },
    { label: "Contact", href: "#" },
  ];

  // Services dropdown items
  const servicesItems = [
    { label: "Web Development", to: "/cart" },
    { label: "App Development", href: "#" },
    { label: "UI/UX Design", href: "#" },
  ];

  // User menu items
  const userMenuItems = [
    { label: "Profile", href: "#", badge: "New" },
    { label: "Settings", href: "#" },
    { label: "Logout", action: logoutUser },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${navbarStyles.nav}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Navbar Container */}
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl md:text-2xl font-bold flex items-center"
            >
              <div className="bg-blue-500 p-2 rounded-md mr-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <span className={navbarStyles.logo}>BrandName</span>
            </Link>
          </div>

          {/* Desktop Menu Section */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Regular Menu Items */}
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${navbarStyles.text}`}
              >
                {item.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative group">
              <button
                className={`px-4 py-2 rounded-md font-medium flex items-center transition-colors ${navbarStyles.text}`}
              >
                Services
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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
                {servicesItems.map((service) =>
                  service.to ? (
                    <Link
                      key={service.label}
                      to={service.to}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                      onClick={handleLinkClick}
                    >
                      {service.label}
                    </Link>
                  ) : (
                    <a
                      key={service.label}
                      href={service.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                    >
                      {service.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Auth Section - Desktop */}
          {user ? (
            <div className="hidden md:flex items-center space-x-4">
              {/* Shopping Cart */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">8</span>
                  </div>
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
                >
                  <div className="card-body">
                    <span className="text-lg font-bold">8 Items</span>
                    <span className="text-info">Subtotal: $999</span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block">
                        View cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Profile"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  {userMenuItems.map((item) => (
                    <li key={item.label}>
                      {item.action ? (
                        <a onClick={item.action} className="cursor-pointer">
                          {item.label}
                        </a>
                      ) : (
                        <a className="justify-between">
                          {item.label}
                          {item.badge && (
                            <span className="badge">{item.badge}</span>
                          )}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <button
                className={`px-4 py-2 rounded-md font-medium transition-colors ${navbarStyles.button}`}
              >
                Login
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-600 transition-colors">
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md focus:outline-none ${navbarStyles.mobileButton}`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Section */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white rounded-md mt-2 shadow-lg">
            {/* Mobile Menu Items */}
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-100"
                onClick={handleLinkClick}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Services Link */}
            <Link
              to="/services"
              className="block px-4 py-2 text-gray-700 rounded-md hover:bg-blue-100"
              onClick={handleLinkClick}
            >
              Services
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="border-t border-gray-200 pt-2">
              {user ? (
                <>
                  <button className="block w-full text-left px-4 py-2 text-gray-700 rounded-md hover:bg-blue-100">
                    My Profile
                  </button>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left px-4 py-2 mt-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="block w-full text-left px-4 py-2 text-blue-600 rounded-md hover:bg-blue-100">
                    Login
                  </button>
                  <button className="block w-full text-left px-4 py-2 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ResponsiveNavbar;
