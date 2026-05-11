'use client';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { setCredentials, logout, hydrateAuth } from '@/features/auth/authSlice';
import { useLoginMutation, useVerifyTokenQuery } from '@/features/api/apiSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, token, isAuthenticated, isLoading, error } = useAppSelector((s) => s.auth);
  const [loginMutation] = useLoginMutation();

  const login = async (email: string, password: string) => {
    const result = await loginMutation({ email, password }).unwrap();
    if (result.success && result.data) {
      dispatch(setCredentials({ user: result.data.user, token: result.data.token }));
    }
    return result;
  };

  const signOut = () => {
    dispatch(logout());
  };

  return { user, token, isAuthenticated, isLoading, error, login, logout: signOut };
}

export function useAuthHydration() {
  const dispatch = useAppDispatch();
  const { token, isAuthenticated } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (!token) {
      dispatch(hydrateAuth());
    }
  }, [dispatch, token]);

  const { data } = useVerifyTokenQuery(undefined, {
    skip: !token || isAuthenticated,
  });

  useEffect(() => {
    if (data?.success && data.data) {
      const storedToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
      if (storedToken) {
        dispatch(setCredentials({ user: data.data.user, token: storedToken }));
      }
    }
  }, [data, dispatch]);
}
