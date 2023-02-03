import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Sort = {
  name: string;
  property: `rating` | `price` | `title`;
};

interface FilterSliceState {
  categoryId: number;
  sort: Sort;
  sortType: boolean;
  pizzasPerPage: number;
  currentPage: number;
  count: number;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  sort: {
    name: `популярности`,
    property: `rating`,
  },
  sortType: false,
  pizzasPerPage: 8,
  currentPage: 1,
  count: 0,
};

const filterSlice = createSlice({
  name: `filter`,
  initialState,
  reducers: {
    setCategoryId(state, { payload }: PayloadAction<number>) {
      state.categoryId = payload;
    },
    setSort(state, { payload }: PayloadAction<Sort>) {
      state.sort = payload;
    },
    setSortType(state, { payload }: PayloadAction<boolean>) {
      state.sortType = payload;
    },
    setPizzaCount(state, { payload }: PayloadAction<number>) {
      state.count = payload;
    },
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setSortType,
  setPizzaCount,
  setCurrentPage,
} = filterSlice.actions;
export default filterSlice.reducer;
