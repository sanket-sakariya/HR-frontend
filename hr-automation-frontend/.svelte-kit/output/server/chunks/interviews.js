import { f as fetchWithAuth, A as API_URLS, a as api } from "./client2.js";
import { c as createQuery } from "./createQuery.js";
import { c as createMutation, u as useQueryClient } from "./createMutation.js";
function useTechnicalResultByCandidate(candidateIdGetter) {
  const get = () => typeof candidateIdGetter === "function" ? candidateIdGetter() : candidateIdGetter;
  return createQuery(() => {
    const id = get();
    return {
      queryKey: ["technical-result-by-candidate", id],
      queryFn: async () => {
        if (!id) return null;
        const res = await fetchWithAuth(`${API_URLS.main}/technical-interview/candidate/${id}/result`);
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 404) return null;
          throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
        }
        return body?.data ?? null;
      },
      enabled: !!id,
      staleTime: 0,
      refetchOnMount: "always"
    };
  });
}
function useHRResultByCandidate(candidateIdGetter) {
  const get = () => typeof candidateIdGetter === "function" ? candidateIdGetter() : candidateIdGetter;
  return createQuery(() => {
    const id = get();
    return {
      queryKey: ["hr-result-by-candidate", id],
      queryFn: async () => {
        if (!id) return null;
        const res = await fetchWithAuth(`${API_URLS.main}/hr-interview/candidate/${id}/result`);
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          if (res.status === 404) return null;
          throw new Error(body?.detail || body?.message || `HTTP ${res.status}`);
        }
        return body?.data ?? null;
      },
      enabled: !!id,
      staleTime: 0,
      refetchOnMount: "always"
    };
  });
}
function useTechnicalInterviews(jobId, status) {
  return createQuery({
    queryKey: ["technical-interviews", jobId, status],
    queryFn: async () => {
      if (!jobId) throw new Error("Job ID is required");
      const response = await api.GET("/technical-interview/job/{job_requirement_id}/interviews", {
        params: {
          path: { job_requirement_id: jobId },
          query: void 0
        }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch technical interviews");
      return response.data?.data?.interviews || [];
    },
    enabled: !!jobId
  });
}
function useTechnicalInterviewBySession(sessionId) {
  return createQuery({
    queryKey: ["technical-interview-session", sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error("Session ID is required");
      const response = await api.GET("/technical-interview/session/{session_id}", {
        params: { path: { session_id: sessionId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch interview session");
      return response.data?.data;
    },
    enabled: !!sessionId
  });
}
function useTechnicalInterviewStatistics(jobId) {
  return createQuery({
    queryKey: ["technical-interview-statistics", jobId],
    queryFn: async () => {
      if (!jobId) throw new Error("Job ID is required");
      const response = await api.GET("/technical-interview/job/{job_requirement_id}/statistics", {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch statistics");
      return response.data?.data;
    },
    enabled: !!jobId
  });
}
function useStartTechnicalInterview() {
  return createMutation({
    mutationFn: async ({
      candidateId,
      jobRequirementId
    }) => {
      const response = await api.POST("/technical-interview/start/{candidate_id}", {
        params: { path: { candidate_id: candidateId } },
        body: { job_requirement_id: jobRequirementId }
      });
      if (response.error) throw new Error(response.error.message || "Failed to start interview");
      return response.data;
    }
  });
}
function useSelectTopTechnicalCandidates() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async ({ jobId, topN }) => {
      const response = await api.POST("/technical-interview/select-top-candidates", {
        params: {
          query: { job_requirement_id: jobId, top_n: topN }
        }
      });
      if (response.error) throw new Error(response.error.message || "Failed to select top candidates");
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["candidates", { job_requirement_id: variables.jobId }] });
      queryClient.invalidateQueries({ queryKey: ["technical-interviews", variables.jobId] });
    }
  });
}
function useHRInterviews(jobId, status) {
  return createQuery({
    queryKey: ["hr-interviews", jobId, status],
    queryFn: async () => {
      if (!jobId) throw new Error("Job ID is required");
      const response = await api.GET("/hr-interview/job/{job_requirement_id}/interviews", {
        params: {
          path: { job_requirement_id: jobId },
          query: void 0
        }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch HR interviews");
      return response.data?.data?.interviews || [];
    },
    enabled: !!jobId
  });
}
function useHRInterviewBySession(sessionId) {
  return createQuery({
    queryKey: ["hr-interview-session", sessionId],
    queryFn: async () => {
      if (!sessionId) throw new Error("Session ID is required");
      const response = await api.GET("/hr-interview/session/{session_id}", {
        params: { path: { session_id: sessionId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch interview session");
      return response.data?.data;
    },
    enabled: !!sessionId
  });
}
function useHRInterviewStatistics(jobId) {
  return createQuery({
    queryKey: ["hr-interview-statistics", jobId],
    queryFn: async () => {
      if (!jobId) throw new Error("Job ID is required");
      const response = await api.GET("/hr-interview/job/{job_requirement_id}/statistics", {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch statistics");
      return response.data?.data;
    },
    enabled: !!jobId
  });
}
function useStartHRInterview() {
  return createMutation({
    mutationFn: async ({
      candidateId,
      jobRequirementId
    }) => {
      const response = await api.POST("/hr-interview/start/{candidate_id}", {
        params: { path: { candidate_id: candidateId } },
        body: { job_requirement_id: jobRequirementId }
      });
      if (response.error) throw new Error(response.error.message || "Failed to start interview");
      return response.data;
    }
  });
}
function useSelectTopHRCandidates() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async ({ jobId, topN }) => {
      const response = await api.POST("/hr-interview/select-top-candidates", {
        params: {
          query: { job_requirement_id: jobId, top_n: topN }
        }
      });
      if (response.error) throw new Error(response.error.message || "Failed to select top candidates");
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["candidates", { job_requirement_id: variables.jobId }] });
      queryClient.invalidateQueries({ queryKey: ["hr-interviews", variables.jobId] });
    }
  });
}
export {
  useHRResultByCandidate as a,
  useStartTechnicalInterview as b,
  useStartHRInterview as c,
  useTechnicalInterviews as d,
  useHRInterviews as e,
  useHRInterviewStatistics as f,
  useSelectTopHRCandidates as g,
  useTechnicalInterviewStatistics as h,
  useSelectTopTechnicalCandidates as i,
  useHRInterviewBySession as j,
  useTechnicalInterviewBySession as k,
  useTechnicalResultByCandidate as u
};
