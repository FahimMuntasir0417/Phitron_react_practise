import React from "react";
import ResponsiveNavbar from "./ResponsiveNavbar";

import Footer from "./Footer";
import { Outlet } from "react-router-dom";
// import RentAdvertisementCarousel from "./RentAdvertisementCarousel";
import RentAdvertisementCarousel from "../RentAdvertisementCarousel.jsx";
import UserManagement from "../components/UserManagement.jsx";

const MaimLayouts = () => {
  return (
    <div>
      {/* <ResponsiveNavbar /> */}
      <Outlet />
      <RentAdvertisementCarousel />
      <UserManagement />

      <Footer />
    </div>
  );
};

export default MaimLayouts;
