import { f as fetchWithAuth, A as API_URLS, a as api } from "./client2.js";
import { c as createQuery } from "./createQuery.js";
import { u as useQueryClient, c as createMutation } from "./createMutation.js";
function useCandidates(params) {
  return createQuery({
    queryKey: ["candidates", params],
    queryFn: async () => {
      if (!params?.job_requirement_id) throw new Error("Job requirement ID is required");
      const response = await api.GET("/candidates/", {
        params: { query: params }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch candidates");
      return response.data;
    },
    enabled: !!params?.job_requirement_id
  });
}
function useCandidate(candidateId) {
  return createQuery({
    queryKey: ["candidate", candidateId],
    queryFn: async () => {
      if (!candidateId) throw new Error("Candidate ID is required");
      const response = await api.GET("/candidates/{candidate_id}", {
        params: { path: { candidate_id: candidateId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch candidate");
      return response.data?.data || response.data;
    },
    enabled: !!candidateId
  });
}
function useSubmitApplication() {
  return createMutation({
    mutationFn: async (formData) => {
      const response = await fetchWithAuth(`${API_URLS.main}/candidates/apply`, {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }
      return response.json();
    }
  });
}
function useSelectTopResumes() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async ({ jobId, topN }) => {
      const response = await api.POST("/candidates/select-top-resumes/{job_requirement_id}", {
        params: {
          path: { job_requirement_id: jobId },
          query: { top_n: topN }
        }
      });
      if (response.error) throw new Error(response.error.message || "Failed to select top resumes");
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["candidates", { job_requirement_id: variables.jobId }] });
      queryClient.invalidateQueries({ queryKey: ["candidates"] });
    }
  });
}
function useAllJobsCandidates(jobIds) {
  return createQuery({
    queryKey: ["all-candidates", jobIds],
    queryFn: async () => {
      if (!jobIds.length) return [];
      const results = await Promise.all(
        jobIds.map(async (jobId) => {
          try {
            const response = await api.GET("/candidates/", {
              params: { query: { job_requirement_id: jobId } }
            });
            const candidates = response.data?.data?.data || response.data?.data || [];
            return Array.isArray(candidates) ? candidates : [];
          } catch {
            return [];
          }
        })
      );
      return results.flat();
    },
    enabled: jobIds.length > 0
  });
}
const createCandidateQuery = (candidateId) => useCandidate(candidateId);
const createApplyMutation = () => useSubmitApplication();
export {
  useAllJobsCandidates as a,
  useCandidate as b,
  createCandidateQuery as c,
  useSelectTopResumes as d,
  createApplyMutation as e,
  useCandidates as u
};
