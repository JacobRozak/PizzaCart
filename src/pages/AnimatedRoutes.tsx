import { Routes, Route, useLocation } from "react-router-dom";

import Cart from "./Cart/Cart";
import Create from "./CreataPizza/Create";

import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Cart />} />
          <Route path="/create-pizza" element={<Create />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default AnimatedRoutes;
