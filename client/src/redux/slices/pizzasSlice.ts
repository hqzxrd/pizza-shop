import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type Pizza = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

interface PizzasSliceState {
  pizzas: Pizza[];
  pizzaCount: number;
  status: Status.LOADING | Status.OK | Status.ERROR;
}

export type FetchPizzasArgs = {
  category: string;
  sortProperty: string;
  order: string;
  search: string;
  currentPage: number;
  pizzasPerPage: number;
};

interface FetchPizzas {
  data: Pizza[];
  pizzaCount: number;
}

enum Status {
  LOADING = `loading`,
  OK = `ok`,
  ERROR = `error`,
}

export const fetchPizzas = createAsyncThunk(
  `pizza/fetchPizzas`,
  async (params: FetchPizzasArgs) => {
    const {
      category,
      sortProperty,
      order,
      search,
      currentPage,
      pizzasPerPage,
    } = params;

    const { data, headers } = await axios.get(
      `http://localhost:12552/pizzas?_limit=${pizzasPerPage}&_page=${currentPage}&_sort=${sortProperty}${order}${category}${search}`
    );

    const pizzaCount = headers[`x-total-count`] ? +headers[`x-total-count`] : 0;
    let pizzas = { data, pizzaCount };
    return pizzas as FetchPizzas;
  }
);

const initialState: PizzasSliceState = {
  pizzas: [],
  pizzaCount: 0,
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: `pizza`,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
      state.pizzas = payload.data;
      state.pizzaCount = payload.pizzaCount;
      state.status = Status.OK;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.pizzas = [];
    });
  },
});

export const {} = pizzasSlice.actions;
export default pizzasSlice.reducer;
