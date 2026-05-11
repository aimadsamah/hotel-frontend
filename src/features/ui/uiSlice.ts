import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UiState } from '@/types';

const initialState: UiState = {
  mobileMenuOpen: false,
  lightboxOpen: false,
  lightboxIndex: 0,
  toasts: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuOpen = action.payload;
    },
    openLightbox: (state, action: PayloadAction<number>) => {
      state.lightboxOpen = true;
      state.lightboxIndex = action.payload;
    },
    closeLightbox: (state) => {
      state.lightboxOpen = false;
    },
    setLightboxIndex: (state, action: PayloadAction<number>) => {
      state.lightboxIndex = action.payload;
    },
  },
});

export const { toggleMobileMenu, setMobileMenuOpen, openLightbox, closeLightbox, setLightboxIndex } = uiSlice.actions;
export default uiSlice.reducer;
