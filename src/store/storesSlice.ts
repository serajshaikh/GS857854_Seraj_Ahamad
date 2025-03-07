import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
    deleteStore: (state, action: PayloadAction<number>) => {
      state.stores = state.stores.filter(store => store.id !== action.payload);
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex(store => store.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
    reorderStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload;
    },
  },
});

export const { addStore, deleteStore, updateStore, reorderStores } = storeSlice.actions;
export default storeSlice.reducer;