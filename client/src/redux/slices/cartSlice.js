import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: [],
};

function calculateTotal(state) {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);

  state.totalCount = state.items.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
}

const cartSlice = createSlice({
  name: `cart`,
  initialState,
  reducers: {
    addProduct(state, { payload }) {
      const itemFind = state.items.find(
        (obj) =>
          obj.id === payload.id &&
          obj.type === payload.type &&
          obj.size === payload.size
      );

      if (itemFind) {
        itemFind.count++;
      } else {
        state.items.push({ ...payload, count: 1 });
      }

      calculateTotal(state);
    },

    minusProduct(state, { payload }) {
      const itemFind = state.items.find(
        (obj) =>
          obj.id === payload.id &&
          obj.type === payload.type &&
          obj.size === payload.size
      );
      itemFind.count !== 0 && itemFind.count--;

      calculateTotal(state);
    },

    deleteCartItem(state, { payload }) {
      const index = state.items
        .map((item) => {
          return (
            item.id === payload.id &&
            item.size === payload.size &&
            item.type === payload.type &&
            item.id
          );
        })
        .indexOf(payload.id);

      state.items.splice(index, 1);

      calculateTotal(state);
    },

    clearProducts(state) {
      state.items = [];

      calculateTotal(state);
    },
  },
});

export const { addProduct, deleteCartItem, minusProduct, clearProducts } =
  cartSlice.actions;
export default cartSlice.reducer;
