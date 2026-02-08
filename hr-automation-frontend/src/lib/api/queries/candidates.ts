import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
import { api, API_URLS } from '../client';
import type { Candidate } from '../generated';

export function useCandidates(params?: {
  job_requirement_id?: string;
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}) {
  return createQuery({
    queryKey: ['candidates', params],
    queryFn: async () => {
      const response = await api.GET('/candidates/', {
        params: { query: params }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch candidates');
      return response.data;
    }
  });
}

export function useCandidate(candidateId: string | null) {
  return createQuery({
    queryKey: ['candidate', candidateId],
    queryFn: async () => {
      if (!candidateId) throw new Error('Candidate ID is required');
      const response = await api.GET('/candidates/{candidate_id}', {
        params: { path: { candidate_id: candidateId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch candidate');
      return response.data?.data as Candidate;
    },
    enabled: !!candidateId
  });
}

export function useApplicationForm(jobId: string | null) {
  return createQuery({
    queryKey: ['application-form', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await api.GET('/candidates/apply/{job_requirement_id}', {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch application form');
      return response.data;
    },
    enabled: !!jobId
  });
}

export function useSubmitApplication() {
  return createMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`${API_URLS.main}/candidates/apply`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit application');
      }

      return response.json();
    }
  });
}

export function useSelectTopResumes() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({ jobId, topN }: { jobId: string; topN: number }) => {
      const response = await api.POST('/candidates/select-top-resumes/{job_requirement_id}', {
        params: {
          path: { job_requirement_id: jobId },
          query: { top_n: topN }
        }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to select top resumes');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidates', { job_requirement_id: variables.jobId }] });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    }
  });
}

// Alias exports for convenience
export const createCandidatesQuery = (params?: Parameters<typeof useCandidates>[0]) => useCandidates(params);
export const createCandidateQuery = (candidateId: string | null) => useCandidate(candidateId);
export const createApplyMutation = () => useSubmitApplication();
export const createUpdateCandidateMutation = () => {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({ candidateId, data }: { candidateId: string; data: Partial<Candidate> }) => {
      const response = await api.PUT('/candidates/{candidate_id}', {
        params: { path: { candidate_id: candidateId } },
        body: data as any
      });
      if (response.error) throw new Error(response.error.message || 'Failed to update candidate');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidate', variables.candidateId] });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    }
  });
};
