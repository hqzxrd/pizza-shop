import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartPizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  totalCount: number;
  pizzas: CartPizza[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalCount: 0,
  pizzas: [],
};

function calculateTotal(state: CartSliceState) {
  state.totalPrice = state.pizzas.reduce((sum: number, obj: CartPizza) => {
    return sum + obj.price * obj.count;
  }, 0);

  state.totalCount = state.pizzas.reduce((sum: number, obj: CartPizza) => {
    return sum + obj.count;
  }, 0);
}

const cartSlice = createSlice({
  name: `cart`,
  initialState,
  reducers: {
    addProduct(state, { payload }: PayloadAction<CartPizza>) {
      const itemFind = state.pizzas.find(
        (obj) =>
          obj.id === payload.id &&
          obj.type === payload.type &&
          obj.size === payload.size
      );

      if (itemFind) {
        itemFind.count++;
      } else {
        state.pizzas.push({ ...payload, count: 1 });
      }

      calculateTotal(state);
    },

    minusProduct(state, { payload }: PayloadAction<CartPizza>) {
      const itemFind = state.pizzas.find(
        (obj) =>
          obj.id === payload.id &&
          obj.type === payload.type &&
          obj.size === payload.size
      );
      itemFind && itemFind.count !== 0 && itemFind.count--;

      calculateTotal(state);
    },

    deleteCartItem(state, { payload }: PayloadAction<CartPizza>) {
      const index = state.pizzas
        .map((item) => {
          return (
            item.id === payload.id &&
            item.size === payload.size &&
            item.type === payload.type &&
            item.id
          );
        })
        .indexOf(payload.id);

      state.pizzas.splice(index, 1);

      calculateTotal(state);
    },

    clearProducts(state) {
      state.pizzas = [];

      calculateTotal(state);
    },
  },
});

export const { addProduct, deleteCartItem, minusProduct, clearProducts } =
  cartSlice.actions;
export default cartSlice.reducer;
