import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartList from "../../components/CartList/CartList";
import { clearItems } from "../../redux/Slices/cartSlice";
import { selectCart } from "../../redux/Slices/cartSlice";
import { motion } from "framer-motion";
import "./Cart.scss";
import { notification } from "../../notifications/notifications";

const Cart: FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector(selectCart);

  const clearCart = (): void => {
    dispatch(clearItems());
    notification("default", "ehh that was a waste of time!", "Cart has been cleared")
  };

  return (
    <motion.div
      className="cart"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      {items.length > 0 ? (
        <div className="cart__items">
          <CartList />
          <div className="cart__buttons">
            <button
              className="cart__button-clear cart__button"
              onClick={clearCart}
            >
              Clear
            </button>
            <Link to="/payment">
              <button className="cart__button-pay cart__button">
                Pay ({totalPrice} £)
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart__empty">
          <h3>
            Here is no pizza... However, you can{" "}
            <Link to="/create-pizza">
              <b className="b">order</b>
            </Link>{" "}
            one
          </h3>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
