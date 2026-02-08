import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
import { api } from '../client';
import type { JobRequirement, components } from '../generated';

export function useJobRequirements(companyId: string | null, params?: { status?: string; offset?: number; limit?: number }) {
  return createQuery({
    queryKey: ['jobs', companyId, params],
    queryFn: async () => {
      if (!companyId) throw new Error('Company ID is required');
      const response = await api.GET('/companies/{company_id}/job-requirements/', {
        params: { 
          path: { company_id: companyId },
          query: params
        }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch job requirements');
      return response.data;
    },
    enabled: !!companyId
  });
}

export function useAllJobRequirements(params?: { status?: string; offset?: number; limit?: number; search?: string }) {
  return createQuery({
    queryKey: ['jobs', 'all', params],
    queryFn: async () => {
      const response = await api.GET('/job-requirements/', {
        params: { query: params }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch job requirements');
      return response.data;
    }
  });
}

export function useJobRequirement(jobId: string | null) {
  return createQuery({
    queryKey: ['job', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await api.GET('/job-requirements/{job_requirement_id}/', {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch job requirement');
      return response.data?.data as JobRequirement;
    },
    enabled: !!jobId
  });
}

export function useCreateJobRequirement() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({
      companyId,
      payload
    }: {
      companyId: string;
      payload: components['schemas']['JobRequirementCreateRequest'];
    }) => {
      const response = await api.POST('/companies/{company_id}/job-requirements/', {
        params: { path: { company_id: companyId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || 'Failed to create job requirement');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['jobs', variables.companyId] });
      queryClient.invalidateQueries({ queryKey: ['jobs', 'all'] });
    }
  });
}

export function useUpdateJobRequirement() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({
      jobId,
      payload
    }: {
      jobId: string;
      payload: components['schemas']['JobRequirementUpdateRequest'];
    }) => {
      const response = await api.PUT('/job-requirements/{job_requirement_id}/', {
        params: { path: { job_requirement_id: jobId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || 'Failed to update job requirement');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['job', variables.jobId] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    }
  });
}

export function useDeleteJobRequirement() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async (jobId: string) => {
      const response = await api.DELETE('/job-requirements/{job_requirement_id}/', {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to delete job requirement');
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    }
  });
}

export function useUpdateJobStatus() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({ jobId, status }: { jobId: string; status: string }) => {
      const response = await api.PATCH('/job-requirements/{job_requirement_id}/status/', {
        params: { path: { job_requirement_id: jobId } },
        body: { status }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to update job status');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['job', variables.jobId] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    }
  });
}

// Alias exports for convenience
export const createJobsQuery = (params?: Parameters<typeof useAllJobRequirements>[0]) => useAllJobRequirements(params);
export const createJobQuery = (jobId: string | null) => useJobRequirement(jobId);
export const createJobMutation = () => useCreateJobRequirement();
export const createUpdateJobMutation = () => useUpdateJobRequirement();
export const createDeleteJobMutation = () => useDeleteJobRequirement();
