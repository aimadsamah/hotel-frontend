import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { BookingState, Booking } from '@/types';

const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
  success: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
      state.currentBooking = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
    clearBookingState: (state) => {
      state.currentBooking = null;
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
});

export const { setBookings, setCurrentBooking, setLoading, setError, setSuccess, clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;
