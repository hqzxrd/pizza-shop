import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzasPerPage: 8,
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: `pagination`,
  initialState,
  reducers: {
    setPizzaCount(state, action) {
      state.pizzaCount = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPizzaCount, setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
