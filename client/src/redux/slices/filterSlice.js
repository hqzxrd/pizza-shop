import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: `популярности`,
    property: `rating`,
  },
  sortType: false,
};

const filterSlice = createSlice({
  name: `filter`,
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      console.log(action);
      state.sort = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setSortType } = filterSlice.actions;
export default filterSlice.reducer;
