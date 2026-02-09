import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
import { api, API_URLS } from '../client';
import type { AptitudeTest } from '../generated';

// Create aptitude test - this creates the test in the database
export function useCreateAptitudeTest() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async (jobId: string) => {
      const response: any = await api.POST('/aptitude/create/{job_requirement_id}', {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) {
        throw new Error(response.error.message || 'Failed to create aptitude test');
      }
      return response.data;
    },
    onSuccess: (_, jobId) => {
      queryClient.invalidateQueries({ queryKey: ['aptitude-test', jobId] });
      queryClient.invalidateQueries({ queryKey: ['aptitude-test-form', jobId] });
      queryClient.invalidateQueries({ queryKey: ['aptitude-generated-test', jobId] });
    }
  });
}

// Generate aptitude test and get all URLs - this is what returns login_form_url, test_form_url, entry_url
export function useGenerateAptitudeTest() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async (jobId: string) => {
      const response = await fetch(`${API_URLS.main}/aptitude/generate-test/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_message || error.message || 'Failed to generate aptitude test');
      }
      return response.json();
    },
    onSuccess: (_, jobId) => {
      queryClient.invalidateQueries({ queryKey: ['aptitude-generated-test', jobId] });
    }
  });
}

// Query to get generated test details (if already generated)
export function useGeneratedAptitudeTest(jobId: string | null) {
  return createQuery({
    queryKey: ['aptitude-generated-test', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await fetch(`${API_URLS.main}/aptitude/generate-test/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_message || error.message || 'Failed to fetch generated test');
      }
      return response.json();
    },
    enabled: !!jobId
  });
}

// Generate test form - only needs job_requirement_id (backend auto-finds the aptitude test)
export function useAptitudeTestForm(jobId: string | null) {
  return createQuery({
    queryKey: ['aptitude-test-form', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await fetch(`${API_URLS.main}/aptitude/generate-test-form/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_message || error.message || 'Failed to fetch test form');
      }
      return response.json();
    },
    enabled: !!jobId
  });
}

// Generate login form - only needs job_requirement_id (backend auto-finds the aptitude test)
export function useAptitudeLoginForm(jobId: string | null) {
  return createQuery({
    queryKey: ['aptitude-login-form', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await fetch(`${API_URLS.main}/aptitude/generate-login-form/${jobId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_message || error.message || 'Failed to fetch login form');
      }
      return response.json();
    },
    enabled: !!jobId
  });
}

// Validate login - needs both job_requirement_id and aptitude_test_id
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
      const response = await fetch(`${API_URLS.main}/aptitude/validate-login/${jobId}/${testId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_message || error.message || 'Login validation failed');
      }
      return response.json();
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
      const response: any = await api.POST('/aptitude/submit-test', {
        body: payload
      });
      if (response.error) {
        throw new Error(response.error.message || 'Failed to submit test');
      }
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
      const response: any = await api.POST('/aptitude/select-top-candidates', {
        params: {
          query: {
            job_requirement_id: jobId,
            aptitude_test_id: testId,
            top_n: topN
          }
        }
      });
      if (response.error) {
        throw new Error(response.error.message || 'Failed to select top candidates');
      }
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidates', { job_requirement_id: variables.jobId }] });
    }
  });
}

// Alias exports for convenience
export const createAptitudeTestMutation = () => useCreateAptitudeTest();
export const createAptitudeTestsQuery = (jobId: string | null) => {
  // Note: There's no endpoint to list all tests. Use localStorage to persist test info after creation.
  return createQuery({
    queryKey: ['aptitude-tests', jobId],
    queryFn: async () => {
      // Return empty array - tests should be stored locally after creation
      return [];
    },
    enabled: false // Always disabled since there's no list endpoint
  });
};
export const createCreateAptitudeTestMutation = () => useCreateAptitudeTest();
