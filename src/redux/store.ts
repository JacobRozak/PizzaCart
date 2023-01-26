import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartSlice from "./Slices/cartSlice";
import createPizzaSlice from "./Slices/createPizzaSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    createPizza: createPizzaSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
