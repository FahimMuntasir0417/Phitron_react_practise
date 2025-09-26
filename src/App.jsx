import { Routes, Route } from "react-router-dom";
import MaimLayouts from "./layouts/MaimLayouts";
import Cartltem from "./Cart/CartItem";

// import { CgCarousel } from "react-icons/cg";
// import Home from "./pages/Home";
// import Blogs from "./pages/Blogs";

import Carousel from "./Carousel";
import Carosol from "./components/Carosol";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Activation from "./components/Activation";
import ProfileUpdate from "./components/ProfileUpdate";

const App = () => {
  return (
    <Routes>
      {/* Layout route */}
      <Route element={<MaimLayouts />}>
        <Route path="/" element={<Carousel />} />
        {/* <Route path="/" element={<Carosol />} /> */}
        <Route path="/cart" element={<Cartltem></Cartltem>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/activate/:uid/:token" element={<Activation />} />
        <Route path="/profile" element={<ProfileUpdate />} />
      </Route>
    </Routes>
  );
};

export default App;
