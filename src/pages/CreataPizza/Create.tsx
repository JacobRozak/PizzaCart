import { FC, useState } from "react";
import "./Create.scss";
import "react-widgets/styles.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import {
  setIngradients,
  setSize,
  setToStart
} from "../../redux/Slices/createPizzaSlice";
import { addItemToCart, CartItem } from "../../redux/Slices/cartSlice";
import { Multiselect, DropdownList } from "react-widgets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { notification } from "../../notifications/notifications";

const Create: FC = () => {
  const [name, setName] = useState<string>("");
  const [sizeForPizza, setSizePizza] = useState<number>(1);

  const { items, totalPrice, pizzaSizesArray, completedSize, completedPizza } = useSelector(
    (state: any) => state.createPizza
  );
  const dispatch = useAppDispatch();

  let navigate = useNavigate();

  const addPizzaToCart = () => {
    if (totalPrice && completedPizza.length <= completedSize[0].avaliableToppings) {
      const item: CartItem = {
        id: Date.now().toFixed(5).toString(),
        title: name || "Your Pizza",
        price: totalPrice,
        imageUrl:
          "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg",
        size: sizeForPizza,
        count: 1
      };
      dispatch(addItemToCart(item));
      dispatch(setToStart());
      notification("success", "Wonderful News!", `"${item.title}" Added to cart`)
      navigate(`/`);
    } else {
      notification("warning", "Nahhhhh!", `you can have maximum of ${completedSize[0].avaliableToppings} toppings with this size of pizza, maybe try going for the large one you cheap bastard`)
    }
  };

  const setIngradientArray = (e: any) => {
    dispatch(setIngradients(e));
  };

  const setSizeForPizza = (e: any) => {
    setSizePizza(e.pizzaIndex);
    dispatch(setSize(e));
  };

  return (
    <motion.div
      className="create page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="create__header">Create your own Pizza</div>
      <div className="create__complete">
        <div className="create__pizzablock">
          <div className="create__pizzaimage">
            <img
              src={
                totalPrice
                  ? "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/1e1a6e80-b3ba-4a44-b6b9-beae5b1fbf27.jpg"
                  : "https://dodopizza.azureedge.net/static/Img/Products/Pizza/ru-RU/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg"
              }
              alt="pizza-img"
              className="create__pizzaimg"
            />
          </div>
          <div className="create__priceinfo">
            <div className="create__price">
              Price for self-made pizza: {totalPrice} £
            </div>
            <div className="create__addtocart">
              <button className="button-btn" onClick={addPizzaToCart}>
                { "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        <div className="create__pizzaelements">
          <div className="create__input"></div>
          <div className="create__ingradients">
            <div className="create__ingradient">
              <input
                placeholder="Call your pizza"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input__name"
              />
            </div>
            <div className="create__ingradient">
              <DropdownList
                placeholder="Chose size of pizza"
                data={pizzaSizesArray}
                textField="pizzaSize"
                dataKey="id"
                onChange={setSizeForPizza}
              />
            </div>
            <div className="create__ingradient">
              <Multiselect
                placeholder="Chose ingradients"
                data={items}
                textField="ingradient"
                dataKey="id"
                showSelectedItemsInList
                onChange={setIngradientArray}
              />
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </motion.div>
  );
};

export default Create;
