import { a as api } from "./client2.js";
import { c as createQuery } from "./createQuery.js";
import { u as useQueryClient, c as createMutation } from "./createMutation.js";
function useJobRequirements(companyId, params) {
  return createQuery({
    queryKey: ["jobs", companyId, params],
    queryFn: async () => {
      if (!companyId) throw new Error("Company ID is required");
      const response = await api.GET("/companies/{company_id}/job-requirements/", {
        params: {
          path: { company_id: companyId },
          query: params
        }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch job requirements");
      return response.data;
    },
    enabled: !!companyId
  });
}
function useJobRequirement(jobId) {
  return createQuery({
    queryKey: ["job", jobId],
    queryFn: async () => {
      if (!jobId) throw new Error("Job ID is required");
      const response = await api.GET("/job-requirements/{job_requirement_id}/", {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch job requirement");
      return response.data?.data;
    },
    enabled: !!jobId
  });
}
function useCreateJobRequirement() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async ({
      companyId,
      payload
    }) => {
      const response = await api.POST("/companies/{company_id}/job-requirements/", {
        params: { path: { company_id: companyId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || "Failed to create job requirement");
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobs", variables.companyId] });
      queryClient.invalidateQueries({ queryKey: ["jobs", "all"] });
    }
  });
}
function useUpdateJobRequirement() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async ({
      jobId,
      payload
    }) => {
      const response = await api.PUT("/job-requirements/{job_requirement_id}/", {
        params: { path: { job_requirement_id: jobId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || "Failed to update job requirement");
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["job", variables.jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    }
  });
}
function useDeleteJobRequirement() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async (jobId) => {
      const response = await api.DELETE("/job-requirements/{job_requirement_id}/", {
        params: { path: { job_requirement_id: jobId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to delete job requirement");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    }
  });
}
function useUpdateJobStatus() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async ({ jobId, status }) => {
      const response = await api.PATCH("/job-requirements/{job_requirement_id}/status/", {
        params: { path: { job_requirement_id: jobId } },
        body: { status }
      });
      if (response.error) throw new Error(response.error.message || "Failed to update job status");
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["job", variables.jobId] });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    }
  });
}
const createJobQuery = (jobId) => useJobRequirement(jobId);
export {
  useJobRequirements as a,
  useDeleteJobRequirement as b,
  useUpdateJobStatus as c,
  createJobQuery as d,
  useCreateJobRequirement as e,
  useUpdateJobRequirement as f,
  useJobRequirement as u
};
