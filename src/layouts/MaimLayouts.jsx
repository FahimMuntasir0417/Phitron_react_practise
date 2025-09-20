import React from "react";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { Outlet } from "react-icons/bs";
import Footer from "./Footer";

const MaimLayouts = () => {
  return (
    <div>
      <ResponsiveNavbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MaimLayouts;
