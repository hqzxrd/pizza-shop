import { configureStore } from "@reduxjs/toolkit";

import filterSlice from "./slices/filterSlice";
import paginationSlice from "./slices/paginationSlice";
import cartSlice from "./slices/cartSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: { filterSlice, paginationSlice, cartSlice, pizzasSlice },
});
