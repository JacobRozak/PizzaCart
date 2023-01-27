import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { notification } from "../../notifications/notifications";
import {
  minusItem,
  removeItem,
  increaseAmount
} from "../../redux/Slices/cartSlice";
import "./CartItem.scss";

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  count: number;
  rating: number;
  size: number;
  type: number;
};

const CartItem: FC<CartItemProps> = ({
  id,
  title,
  price,
  imageUrl,
  count,
  rating,
  size,
  type
}) => {
  const dispatch = useDispatch();
  const sizeOfPizza = [26, 30, 40];

  const onClickMinus = () => {
    dispatch(minusItem(id));
    notification("info", "ohh well!", `"${title}" amount decreased`)
  };

  const onClickPlus = () => {
    dispatch(increaseAmount({ id }));
    notification("info", "Amazing!", `"${title}" amount increased`)
  };

  const onClickRemove = () => {
    dispatch(removeItem(id));
    notification("info", "well that was pointless!", `"${title}" has been removed`)
  };

  return (
    <div className="cart">
      <div className="cart__container">
        {title} / {price} £
        <div className="cart__image">
          <img className="cart__img" src={imageUrl} alt={title} />
        </div>
        <div className="cart__info">
          Size: {size}
        </div>
        <div className="cart__container-btn">
          <button
            className="button-plus button-cart"
            onClick={() => onClickPlus()}
          >
            {" "}
            +{" "}
          </button>
          {count}
          <button
            className="button-minus button-cart"
            onClick={() => onClickMinus()}
          >
            {" "}
            -{" "}
          </button>
        </div>
      </div>
      <div className="cart__buttons-proceed">
        <button
          className="button-remove button-cart"
          onClick={() => onClickRemove()}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
