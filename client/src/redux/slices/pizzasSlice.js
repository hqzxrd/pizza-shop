import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: `pizza`,
  initialState,
  reducers: {
    setItems(state, { payload }) {
      state.items = payload.items;
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
