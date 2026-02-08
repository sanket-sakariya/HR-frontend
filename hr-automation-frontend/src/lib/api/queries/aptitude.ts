import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
import { api } from '../client';
import type { AptitudeTest } from '../generated';

export function useCreateAptitudeTest() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async (jobId: string) => {
      const response = await api.POST('/aptitude/create/{job_requirement_id}', {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to create aptitude test');
      return response.data;
    },
    onSuccess: (_, jobId) => {
      queryClient.invalidateQueries({ queryKey: ['aptitude-test', jobId] });
    }
  });
}

export function useAptitudeTestForm(jobId: string | null, testId: string | null) {
  return createQuery({
    queryKey: ['aptitude-test-form', jobId, testId],
    queryFn: async () => {
      if (!jobId || !testId) throw new Error('Job ID and Test ID are required');
      const response = await api.GET('/aptitude/generate-test-form/{job_requirement_id}/{aptitude_test_id}', {
        params: { path: { job_requirement_id: jobId, aptitude_test_id: testId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch test form');
      return response.data;
    },
    enabled: !!jobId && !!testId
  });
}

export function useAptitudeLoginForm(jobId: string | null, testId: string | null) {
  return createQuery({
    queryKey: ['aptitude-login-form', jobId, testId],
    queryFn: async () => {
      if (!jobId || !testId) throw new Error('Job ID and Test ID are required');
      const response = await api.GET('/aptitude/generate-login-form/{job_requirement_id}/{aptitude_test_id}', {
        params: { path: { job_requirement_id: jobId, aptitude_test_id: testId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch login form');
      return response.data;
    },
    enabled: !!jobId && !!testId
  });
}

export function useValidateAptitudeLogin() {
  return createMutation({
    mutationFn: async ({
      jobId,
      testId,
      email,
      password
    }: {
      jobId: string;
      testId: string;
      email: string;
      password: string;
    }) => {
      const response = await api.POST('/aptitude/validate-login/{job_requirement_id}/{aptitude_test_id}', {
        params: { path: { job_requirement_id: jobId, aptitude_test_id: testId } },
        body: { email, password }
      });
      if (response.error) throw new Error(response.error.message || 'Login validation failed');
      return response.data;
    }
  });
}

export function useSubmitAptitudeTest() {
  return createMutation({
    mutationFn: async (payload: {
      attempt_id: string;
      answers: Record<string, string>;
      time_taken_seconds: number;
    }) => {
      const response = await api.POST('/aptitude/submit-test', {
        body: payload
      });
      if (response.error) throw new Error(response.error.message || 'Failed to submit test');
      return response.data;
    }
  });
}

export function useSelectTopAptitudeCandidates() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({
      jobId,
      testId,
      topN
    }: {
      jobId: string;
      testId: string;
      topN: number;
    }) => {
      const response = await api.POST('/aptitude/select-top-candidates', {
        params: {
          query: {
            job_requirement_id: jobId,
            aptitude_test_id: testId,
            top_n: topN
          }
        }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to select top candidates');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidates', { job_requirement_id: variables.jobId }] });
    }
  });
}

// Alias exports for convenience
export const createAptitudeTestsQuery = (jobId: string | null) => {
  // Returns a query that fetches aptitude test form for a job
  return useAptitudeTestForm(jobId);
};
export const createCreateAptitudeTestMutation = () => useCreateAptitudeTest();
