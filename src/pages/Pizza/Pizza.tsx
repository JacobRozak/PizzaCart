import { FC } from "react";
import { motion } from "framer-motion";

const Pizza: FC = () => {
  return (
    <motion.div
      className="pizza page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <PizzaList /> */}
    </motion.div>
  );
};

export default Pizza;
