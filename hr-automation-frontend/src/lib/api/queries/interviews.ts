import { createQuery, createMutation, useQueryClient } from '@tanstack/svelte-query';
import { api, techInterviewApi, hrInterviewApi } from '../client';
import type { TechnicalInterview, HRInterview, components } from '../generated';

// ==================== TECHNICAL INTERVIEW ====================

export function useTechnicalInterviews(jobId: string | null, status?: string) {
  return createQuery({
    queryKey: ['technical-interviews', jobId, status],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await api.GET('/technical-interview/job/{job_requirement_id}/interviews', {
        params: { 
          path: { job_requirement_id: jobId },
          query: status ? { status } : undefined
        }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch technical interviews');
      return response.data?.data as TechnicalInterview[];
    },
    enabled: !!jobId
  });
}

export function useTechnicalInterview(interviewId: string | null) {
  return createQuery({
    queryKey: ['technical-interview', interviewId],
    queryFn: async () => {
      if (!interviewId) throw new Error('Interview ID is required');
      const response = await api.GET('/technical-interview/{technical_interview_id}', {
        params: { path: { technical_interview_id: interviewId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch technical interview');
      return response.data?.data as TechnicalInterview;
    },
    enabled: !!interviewId
  });
}

export function useTechnicalInterviewBySession(sessionId: string | null) {
  return createQuery({
    queryKey: ['technical-interview-session', sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error('Session ID is required');
      const response = await api.GET('/technical-interview/session/{session_id}', {
        params: { path: { session_id: sessionId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch interview session');
      return response.data?.data as TechnicalInterview;
    },
    enabled: !!sessionId
  });
}

export function useTechnicalInterviewStatistics(jobId: string | null) {
  return createQuery({
    queryKey: ['technical-interview-statistics', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await api.GET('/technical-interview/job/{job_requirement_id}/statistics', {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch statistics');
      return response.data?.data;
    },
    enabled: !!jobId
  });
}

export function useCandidateTechnicalStatus(candidateId: string | null) {
  return createQuery({
    queryKey: ['candidate-technical-status', candidateId],
    queryFn: async () => {
      if (!candidateId) throw new Error('Candidate ID is required');
      const response = await api.GET('/technical-interview/candidate/{candidate_id}/status', {
        params: { path: { candidate_id: candidateId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch status');
      return response.data?.data;
    },
    enabled: !!candidateId
  });
}

export function useStartTechnicalInterview() {
  return createMutation({
    mutationFn: async ({
      candidateId,
      payload
    }: {
      candidateId: string;
      payload: components['schemas']['TechnicalInterviewLoginRequest'];
    }) => {
      const response = await api.POST('/technical-interview/start/{candidate_id}', {
        params: { path: { candidate_id: candidateId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || 'Failed to start interview');
      return response.data;
    }
  });
}

export function useCompleteTechnicalInterview() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({
      interviewId,
      payload
    }: {
      interviewId: string;
      payload: components['schemas']['CompleteInterviewRequest'];
    }) => {
      const response = await api.POST('/technical-interview/complete/{technical_interview_id}', {
        params: { path: { technical_interview_id: interviewId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || 'Failed to complete interview');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['technical-interview', variables.interviewId] });
      queryClient.invalidateQueries({ queryKey: ['technical-interviews'] });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    }
  });
}

export function useSelectTopTechnicalCandidates() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({ jobId, topN }: { jobId: string; topN: number }) => {
      const response = await api.POST('/technical-interview/select-top-candidates', {
        params: {
          query: { job_requirement_id: jobId, top_n: topN }
        }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to select top candidates');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidates', { job_requirement_id: variables.jobId }] });
      queryClient.invalidateQueries({ queryKey: ['technical-interviews', variables.jobId] });
    }
  });
}

// ==================== HR INTERVIEW ====================

export function useHRInterviews(jobId: string | null, status?: string) {
  return createQuery({
    queryKey: ['hr-interviews', jobId, status],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await api.GET('/hr-interview/job/{job_requirement_id}/interviews', {
        params: { 
          path: { job_requirement_id: jobId },
          query: status ? { status } : undefined
        }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch HR interviews');
      return response.data?.data as HRInterview[];
    },
    enabled: !!jobId
  });
}

export function useHRInterview(interviewId: string | null) {
  return createQuery({
    queryKey: ['hr-interview', interviewId],
    queryFn: async () => {
      if (!interviewId) throw new Error('Interview ID is required');
      const response = await api.GET('/hr-interview/{hr_interview_id}', {
        params: { path: { hr_interview_id: interviewId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch HR interview');
      return response.data?.data as HRInterview;
    },
    enabled: !!interviewId
  });
}

export function useHRInterviewBySession(sessionId: string | null) {
  return createQuery({
    queryKey: ['hr-interview-session', sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error('Session ID is required');
      const response = await api.GET('/hr-interview/session/{session_id}', {
        params: { path: { session_id: sessionId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch interview session');
      return response.data?.data as HRInterview;
    },
    enabled: !!sessionId
  });
}

export function useHRInterviewStatistics(jobId: string | null) {
  return createQuery({
    queryKey: ['hr-interview-statistics', jobId],
    queryFn: async () => {
      if (!jobId) throw new Error('Job ID is required');
      const response = await api.GET('/hr-interview/job/{job_requirement_id}/statistics', {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch statistics');
      return response.data?.data;
    },
    enabled: !!jobId
  });
}

export function useCandidateHRStatus(candidateId: string | null) {
  return createQuery({
    queryKey: ['candidate-hr-status', candidateId],
    queryFn: async () => {
      if (!candidateId) throw new Error('Candidate ID is required');
      const response = await api.GET('/hr-interview/candidate/{candidate_id}/status', {
        params: { path: { candidate_id: candidateId } }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to fetch status');
      return response.data?.data;
    },
    enabled: !!candidateId
  });
}

export function useStartHRInterview() {
  return createMutation({
    mutationFn: async ({
      candidateId,
      payload
    }: {
      candidateId: string;
      payload: components['schemas']['HRInterviewLoginRequest'];
    }) => {
      const response = await api.POST('/hr-interview/start/{candidate_id}', {
        params: { path: { candidate_id: candidateId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || 'Failed to start interview');
      return response.data;
    }
  });
}

export function useCompleteHRInterview() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({
      interviewId,
      payload
    }: {
      interviewId: string;
      payload: components['schemas']['CompleteHRInterviewRequest'];
    }) => {
      const response = await api.POST('/hr-interview/complete/{hr_interview_id}', {
        params: { path: { hr_interview_id: interviewId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || 'Failed to complete interview');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['hr-interview', variables.interviewId] });
      queryClient.invalidateQueries({ queryKey: ['hr-interviews'] });
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
    }
  });
}

export function useSelectTopHRCandidates() {
  const queryClient = useQueryClient();

  return createMutation({
    mutationFn: async ({ jobId, topN }: { jobId: string; topN: number }) => {
      const response = await api.POST('/hr-interview/select-top-candidates', {
        params: {
          query: { job_requirement_id: jobId, top_n: topN }
        }
      });
      if (response.error) throw new Error(response.error.message || 'Failed to select top candidates');
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['candidates', { job_requirement_id: variables.jobId }] });
      queryClient.invalidateQueries({ queryKey: ['hr-interviews', variables.jobId] });
    }
  });
}

// Alias exports for convenience
export const createTechnicalInterviewsQuery = (jobId: string | null) => useTechnicalInterviews(jobId);
export const createTechnicalInterviewQuery = (interviewId: string | null) => useTechnicalInterview(interviewId);
export const createHRInterviewsQuery = (jobId: string | null) => useHRInterviews(jobId);
export const createHRInterviewQuery = (interviewId: string | null) => useHRInterview(interviewId);
