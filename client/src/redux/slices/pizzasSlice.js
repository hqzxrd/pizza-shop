import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  `pizza/fetchPizzas`,
  async ({
    category,
    sortProperty,
    order,
    search,
    currentPage,
    pizzasPerPage,
  }) => {
    const { data, headers } = await axios.get(
      `http://localhost:12552/pizzas?_limit=${pizzasPerPage}&_page=${currentPage}&_sort=${sortProperty}${order}${category}${search}`
    );
    const pizzaCount = headers[`x-total-count`];
    return { data, pizzaCount };
  }
);

const initialState = {
  pizzas: [],
  pizzaCount: 0,
  status: `loading`,
};

const pizzasSlice = createSlice({
  name: `pizza`,
  initialState,
  reducers: {
    setPizzas(state, { payload }) {
      state.pizzas = payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = `loading`;
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, { payload }) => {
      state.pizzas = payload.data;
      state.pizzaCount = payload.pizzaCount;
      state.status = `ok`;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = `error`;
      state.items = [];
    },
  },
});

export const { setPizzas } = pizzasSlice.actions;
export default pizzasSlice.reducer;
