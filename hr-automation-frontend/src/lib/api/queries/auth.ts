import { createMutation } from '@tanstack/svelte-query';
import { api } from '../client';
import type { components } from '../generated';

// ==================== USER AUTHENTICATION ====================

export type UserSignupRequest = components['schemas']['UserSignupRequest'];
export type UserLoginRequest = components['schemas']['UserLoginRequest'];

export interface SignupResponse {
  user_id: string;
  username: string;
  email: string;
  workspace_id: string;
  is_active: boolean;
  is_logged_in: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface LoginResponse {
  user_id: string;
  username: string;
  email: string;
  workspace_id: string;
  access_token: string;
  token_type: string;
}

/**
 * Hook for user signup/registration
 * Creates a new user account with username, email and password
 */
export function useSignup() {
  return createMutation({
    mutationFn: async (payload: UserSignupRequest) => {
      const response = await api.POST('/auth/signup/', {
        body: payload
      });
      if (response.error) {
        throw new Error(response.error.message || 'Signup failed');
      }
      return response.data as unknown as { success: boolean; data: SignupResponse; message: string };
    }
  });
}

/**
 * Hook for user login
 * Authenticates user with email and password
 * Returns user_id, workspace_id, and access_token for subsequent API calls
 */
export function useLogin() {
  return createMutation({
    mutationFn: async (payload: UserLoginRequest) => {
      const response = await api.POST('/auth/login/', {
        body: payload
      });
      if (response.error) {
        throw new Error(response.error.message || 'Login failed');
      }
      return response.data as unknown as { success: boolean; data: LoginResponse; message: string };
    }
  });
}

/**
 * Hook for user logout
 * Logs out the currently authenticated user
 */
export function useLogout() {
  return createMutation({
    mutationFn: async () => {
      const userId = typeof window !== 'undefined' ? localStorage.getItem('user-id') : null;
      const response = await api.POST('/auth/logout/', {
        params: {
          header: { 'user-id': userId || '' }
        }
      });
      if (response.error) {
        throw new Error(response.error.message || 'Logout failed');
      }
      return response.data;
    }
  });
}

// Alias exports for convenience
export const createSignupMutation = () => useSignup();
export const createLoginMutation = () => useLogin();
export const createLogoutMutation = () => useLogout();
