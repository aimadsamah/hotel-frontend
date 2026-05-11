import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';
import type {
  Room, Booking, ContactMessage, User, ApiResponse,
} from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Room', 'Booking', 'Contact', 'User'],
  endpoints: (builder) => ({
    // Auth
    login: builder.mutation<ApiResponse<{ token: string; user: User }>, { email: string; password: string }>({
      query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
    }),
    verifyToken: builder.query<ApiResponse<{ user: User }>, void>({
      query: () => '/auth/verify',
    }),

    // Rooms
    getRooms: builder.query<ApiResponse<{ rooms: Room[]; pagination: object }>, Record<string, string | number | boolean | undefined>>({
      query: (params = {}) => ({
        url: '/rooms',
        params,
      }),
      providesTags: ['Room'],
    }),
    getRoom: builder.query<ApiResponse<{ room: Room }>, string>({
      query: (id) => `/rooms/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Room', id }],
    }),
    createRoom: builder.mutation<ApiResponse<{ room: Room }>, Partial<Room>>({
      query: (room) => ({ url: '/rooms', method: 'POST', body: room }),
      invalidatesTags: ['Room'],
    }),
    updateRoom: builder.mutation<ApiResponse<{ room: Room }>, { id: string; data: Partial<Room> }>({
      query: ({ id, data }) => ({ url: `/rooms/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Room', id }, 'Room'],
    }),
    deleteRoom: builder.mutation<ApiResponse, string>({
      query: (id) => ({ url: `/rooms/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Room'],
    }),

    // Bookings
    createBooking: builder.mutation<ApiResponse<{ booking: Booking }>, Partial<Booking>>({
      query: (booking) => ({ url: '/bookings', method: 'POST', body: booking }),
      invalidatesTags: ['Booking'],
    }),
    getBookings: builder.query<ApiResponse<{ bookings: Booking[]; pagination: object; stats: object[] }>, Record<string, string | number | undefined>>({
      query: (params = {}) => ({ url: '/bookings', params }),
      providesTags: ['Booking'],
    }),
    updateBooking: builder.mutation<ApiResponse<{ booking: Booking }>, { id: string; data: Partial<Booking> }>({
      query: ({ id, data }) => ({ url: `/bookings/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Booking'],
    }),

    // Contact
    createContact: builder.mutation<ApiResponse, { name: string; email: string; phone?: string; subject: string; message: string }>({
      query: (data) => ({ url: '/contact', method: 'POST', body: data }),
    }),
    getContacts: builder.query<ApiResponse<{ contacts: ContactMessage[]; unreadCount: number; pagination: object }>, Record<string, string | number | undefined>>({
      query: (params = {}) => ({ url: '/contact', params }),
      providesTags: ['Contact'],
    }),
    updateContact: builder.mutation<ApiResponse<{ contact: ContactMessage }>, { id: string; status: string }>({
      query: ({ id, ...data }) => ({ url: `/contact/${id}`, method: 'PUT', body: data }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation<ApiResponse, string>({
      query: (id) => ({ url: `/contact/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyTokenQuery,
  useGetRoomsQuery,
  useGetRoomQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useCreateBookingMutation,
  useGetBookingsQuery,
  useUpdateBookingMutation,
  useCreateContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = apiSlice;
