import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const dataOfIngradients = [
  { id: 0, ingradient: "Pepperoni"},
  { id: 1, ingradient: "Pickles"},
  { id: 2, ingradient: "Cheese"},
  { id: 3, ingradient: "Tomato"},
  { id: 4, ingradient: "Rukola"},
  { id: 5, ingradient: "Sausage"},
  { id: 6, ingradient: "Chicken"},
  { id: 7, ingradient: "Duck"},
  { id: 8, ingradient: "Bacon" },
  { id: 9, ingradient: "Ham"},
  { id: 10, ingradient: "Mushrooms"},
  { id: 11, ingradient: "Tofu"},
  { id: 12, ingradient: "Green Onions"}
];

const pizzaSizes = [
  { id: 13, pizzaSize: 'Small', avaliableToppings: 2, price: 7.99 },
  { id: 14, pizzaSize: 'Medium', avaliableToppings: 3, price: 9.99 },
  { id: 15, pizzaSize: 'Large', avaliableToppings: 5, price: 13.99 }
];

export type IngradientType = {
  id: number;
  ingradient?: string;
  price?: number;
  size?: number;
  pizzaType?: string;
  pizzaSize?: string;
  avaliableToppings?: number;
};

export interface CreatePizzaSliceState {
  items: IngradientType[];
  totalPrice: number;
  completedPizza: IngradientType[];
  completedSize: IngradientType[];
  completedType: IngradientType[];
  pizzaSizesArray: IngradientType[];
  priceForIngradients: number;
  priceForSize: number;
  pizza: any;
}

const initialState: CreatePizzaSliceState = {
  items: dataOfIngradients,
  pizzaSizesArray: pizzaSizes,
  completedPizza: [],
  completedSize: [],
  completedType: [],
  totalPrice: 0,
  priceForSize: 0,
  priceForIngradients: 0,
  pizza: []
};

export const createPizzaSlice = createSlice({
  name: "createPizza",
  initialState,
  reducers: {
    setIngradients(state, action: PayloadAction<IngradientType[]>) {
      const newItem = action.payload;
      state.completedPizza = newItem;
      state.pizza = [...state.pizza, state.completedPizza];
    },
    setSize(state, action: PayloadAction<IngradientType>) {
      const newItem = action.payload;
      state.completedSize = [...state.completedSize, newItem].filter(
        (obj) => obj.id === newItem.id
      );
      state.pizza = [...state.pizza, state.completedSize];
      state.priceForSize = state.completedSize.reduce((sum, obj:any) => {
        return obj.price
      }, 0);
      state.totalPrice = state.priceForSize;
    },
    setToStart(state) {
      state.totalPrice = 0;
      state.priceForSize = 0;
      state.priceForIngradients = 0;
    }
  }
});

export const {
  setIngradients,
  setSize,
  setToStart
} = createPizzaSlice.actions;
export default createPizzaSlice.reducer;
