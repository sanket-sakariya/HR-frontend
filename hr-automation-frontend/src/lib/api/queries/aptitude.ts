import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
import { api, API_URLS, fetchWithAuth } from '../client';

export function useAptitudeAttemptByCandidate(candidateIdGetter: string | null | (() => string | null)) {
  const get = () => (typeof candidateIdGetter === 'function' ? candidateIdGetter() : candidateIdGetter);
  return createQuery(() => {
    const id = get();
    return {
      queryKey: ['aptitude-attempt-by-candidate', id],
      queryFn: async () => {
        if (!id) return null;
        const res = await fetchWithAuth(`${API_URLS.main}/aptitude/attempt/by-candidate/${id}`);
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 404) return null;
          throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
        }
        return body?.data ?? null;
      },
      enabled: !!id,
      staleTime: 0,
      refetchOnMount: 'always'
    };
  });
}

export function useCreateAptitudeTest() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async (jobId: string) => {
      const response: any = await api.POST('/aptitude/create/{job_requirement_id}', {
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
      const response: any = await api.GET('/aptitude/generate-test-form/{job_requirement_id}/{aptitude_test_id}', {
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
      const response: any = await api.GET('/aptitude/generate-login-form/{job_requirement_id}/{aptitude_test_id}', {
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

// Fetch test details and questions for candidates
export function useAptitudeTestQuestions(jobId: string | null) {
  return createQuery({
    queryKey: ['aptitude-test-questions', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response: any = await api.GET('/aptitude/get-test-questions/{job_requirement_id}', {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch test questions');
      return response.data;
    },
    enabled: !!jobId,
    staleTime: Infinity, // Questions don't change during test
    gcTime: 1000 * 60 * 60 // Keep in cache for 1 hour
  });
}

export function useSubmitAptitudeTest() {
  return createMutation({
    mutationFn: async (payload: {
      attempt_id: string;
      answers: Record<number, string>;
      time_taken_seconds: number;
      tab_switches?: number;
      keyboard_violations?: number;
    }) => {
      const response: any = await api.POST('/aptitude/submit-test', {
        body: {
          attempt_id: payload.attempt_id,
          answers: payload.answers,
          time_taken_seconds: payload.time_taken_seconds,
          tab_switches: payload.tab_switches || 0,
          keyboard_violations: payload.keyboard_violations || 0
        }
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

// Question interface for type safety
export interface AptitudeQuestion {
  question_id: string;
  question_number: number;
  difficulty: 'simple' | 'medium' | 'hard';
  category: string;
  question_text: string;
  options: Record<string, string>;
  time_allocated_seconds: number;
  tags?: string[];
}

export interface TestDetails {
  aptitude_test_id: string;
  job_requirement_id: string;
  test_title: string;
  total_questions: number;
  total_time_minutes: number;
  passing_score_percentage: number;
  test_metadata?: Record<string, any>;
  proctoring_settings?: {
    tab_switch_detection?: boolean;
    keyboard_shortcuts_blocked?: boolean;
  };
}

export interface AttemptInfo {
  attempt_id: string;
  status: string;
  user_attempt: number;
  message?: string;
}

export interface CandidateInfo {
  candidate_id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface TestResult {
  attempt_id: string;
  candidate_email: string;
  candidate_name: string;
  score: number;
  correct_answers_count: number;
  total_questions_attempted: number;
  total_questions: number;
  passed: boolean;
  aptitude_test_result: 'pass' | 'fail';
  time_taken_seconds: number;
  submitted_at: string;
}
