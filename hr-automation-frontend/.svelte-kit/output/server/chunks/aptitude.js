import { f as fetchWithAuth, A as API_URLS, a as api } from "./client2.js";
import { c as createQuery } from "./createQuery.js";
import { u as useQueryClient, c as createMutation } from "./createMutation.js";
function useAptitudeAttemptByCandidate(candidateIdGetter) {
  const get = () => typeof candidateIdGetter === "function" ? candidateIdGetter() : candidateIdGetter;
  return createQuery(() => {
    const id = get();
    return {
      queryKey: ["aptitude-attempt-by-candidate", id],
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
      refetchOnMount: "always"
    };
  });
}
function useCreateAptitudeTest() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async (jobId) => {
      const response = await api.POST("/aptitude/create/{job_requirement_id}", {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to create aptitude test");
      return response.data;
    },
    onSuccess: (_, jobId) => {
      queryClient.invalidateQueries({ queryKey: ["aptitude-test", jobId] });
    }
  });
}
function useValidateAptitudeLogin() {
  return createMutation({
    mutationFn: async ({
      jobId,
      testId,
      email,
      password
    }) => {
      const response = await api.POST("/aptitude/validate-login/{job_requirement_id}/{aptitude_test_id}", {
        params: { path: { job_requirement_id: jobId, aptitude_test_id: testId } },
        body: { email, password }
      });
      if (response.error) throw new Error(response.error.message || "Login validation failed");
      return response.data;
    }
  });
}
function useAptitudeTestQuestions(jobId) {
  return createQuery({
    queryKey: ["aptitude-test-questions", jobId],
    queryFn: async () => {
      if (!jobId) throw new Error("Job ID is required");
      const response = await api.GET("/aptitude/get-test-questions/{job_requirement_id}", {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch test questions");
      return response.data;
    },
    enabled: !!jobId,
    staleTime: Infinity,
    // Questions don't change during test
    gcTime: 1e3 * 60 * 60
    // Keep in cache for 1 hour
  });
}
function useSubmitAptitudeTest() {
  return createMutation({
    mutationFn: async (payload) => {
      const response = await api.POST("/aptitude/submit-test", {
        body: {
          attempt_id: payload.attempt_id,
          answers: payload.answers,
          time_taken_seconds: payload.time_taken_seconds,
          tab_switches: payload.tab_switches || 0,
          keyboard_violations: payload.keyboard_violations || 0
        }
      });
      if (response.error) throw new Error(response.error.message || "Failed to submit test");
      return response.data;
    }
  });
}
export {
  useCreateAptitudeTest as a,
  useAptitudeTestQuestions as b,
  useValidateAptitudeLogin as c,
  useSubmitAptitudeTest as d,
  useAptitudeAttemptByCandidate as u
};
