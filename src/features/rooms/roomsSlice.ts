import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RoomsState, Room } from '@/types';

const initialState: RoomsState = {
  rooms: [],
  selectedRoom: null,
  isLoading: false,
  error: null,
  filters: {
    category: '',
    minPrice: 0,
    maxPrice: 10000,
  },
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    setSelectedRoom: (state, action: PayloadAction<Room | null>) => {
      state.selectedRoom = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<RoomsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setRooms, setSelectedRoom, setFilters, clearFilters, setLoading, setError } = roomsSlice.actions;
export default roomsSlice.reducer;
