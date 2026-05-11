export interface Room {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  category: 'Standard' | 'Deluxe' | 'Suite' | 'Presidential' | 'Villa';
  images: { url: string; alt: string }[];
  amenities: string[];
  features: {
    size?: string;
    beds?: string;
    occupancy?: number;
    view?: string;
    floor?: string;
  };
  isAvailable: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  room: string | Room;
  roomTitle?: string;
  checkIn: string;
  checkOut: string;
  guests: { adults: number; children: number };
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice?: number;
  confirmationNumber?: string;
  notes?: string;
  createdAt: string;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  room: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  specialRequests?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'superadmin';
  lastLogin?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: { field: string; message: string }[];
}

export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface RoomsState {
  rooms: Room[];
  selectedRoom: Room | null;
  isLoading: boolean;
  error: string | null;
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
  };
}

export interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export interface UiState {
  mobileMenuOpen: boolean;
  lightboxOpen: boolean;
  lightboxIndex: number;
  toasts: Toast[];
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}
