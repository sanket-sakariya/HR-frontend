import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
import { api, fetchWithAuth, API_URLS } from '../client';
import type { Company, components } from '../generated';

export function useCompany(companyId: string | null) {
  return createQuery({
    queryKey: ['company', companyId],
    queryFn: async () => {
      if (!companyId) throw new Error('Company ID is required');
      const response = await api.GET('/companies/{company_id}/', {
        params: { path: { company_id: companyId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch company');
      return response.data?.data as Company;
    },
    enabled: !!companyId
  });
}

export function useCompanies(params?: { offset?: number; limit?: number; search?: string }) {
  return createQuery({
    queryKey: ['companies', params],
    queryFn: async () => {
      const response = await api.GET('/companies/', {
        params: { query: params }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch companies');
      return response.data;
    }
  });
}

export function useRegisterCompany() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async (payload: Omit<components['schemas']['CompanyCreateRequest'], 'password'>) => {
      // Get auth headers from localStorage
      const workspaceId = typeof window !== 'undefined' ? localStorage.getItem('workspace-id') : null;
      const userId = typeof window !== 'undefined' ? localStorage.getItem('user-id') : null;

      const headers: Record<string, string> = {
        'Content-Type': 'application/json'
      };
      if (workspaceId) headers['workspace-id'] = workspaceId;
      if (userId) headers['user-id'] = userId;

      const response = await fetch(`${API_URLS.main}/companies/register/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_message || error.message || 'Registration failed');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    }
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({
      companyId,
      payload
    }: {
      companyId: string;
      payload: components['schemas']['CompanyUpdateRequest'];
    }) => {
      const response = await api.PUT('/companies/{company_id}/', {
        params: { path: { company_id: companyId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || 'Failed to update company');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['company', variables.companyId] });
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    }
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async (companyId: string) => {
      const response = await api.DELETE('/companies/{company_id}/', {
        params: { path: { company_id: companyId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to delete company');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    }
  });
}

// Alias exports for convenience
export const createCompanyQuery = (companyId: string | null) => useCompany(companyId);
export const createCompaniesQuery = (params?: Parameters<typeof useCompanies>[0]) => useCompanies(params);
export const createUpdateCompanyMutation = () => useUpdateCompany();
export const createRegisterCompanyMutation = () => useRegisterCompany();
