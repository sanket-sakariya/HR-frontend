import { a as api, A as API_URLS } from "./client2.js";
import { c as createQuery } from "./createQuery.js";
import { u as useQueryClient, c as createMutation } from "./createMutation.js";
function useCompany(companyId) {
  return createQuery({
    queryKey: ["company", companyId],
    queryFn: async () => {
      if (!companyId) throw new Error("Company ID is required");
      const response = await api.GET("/companies/{company_id}/", {
        params: { path: { company_id: companyId } }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch company");
      return response.data?.data;
    },
    enabled: !!companyId
  });
}
function useCompanies(params) {
  return createQuery({
    queryKey: ["companies", params],
    queryFn: async () => {
      const response = await api.GET("/companies/", {
        params: { query: params }
      });
      if (response.error) throw new Error(response.error.message || "Failed to fetch companies");
      return response.data;
    }
  });
}
function useRegisterCompany() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async (payload) => {
      const workspaceId = typeof window !== "undefined" ? localStorage.getItem("workspace-id") : null;
      const userId = typeof window !== "undefined" ? localStorage.getItem("user-id") : null;
      const headers = {
        "Content-Type": "application/json"
      };
      if (workspaceId) headers["workspace-id"] = workspaceId;
      if (userId) headers["user-id"] = userId;
      const response = await fetch(`${API_URLS.main}/companies/register/`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error_message || error.message || "Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    }
  });
}
function useUpdateCompany() {
  const queryClient = useQueryClient();
  return createMutation({
    mutationFn: async ({
      companyId,
      payload
    }) => {
      const response = await api.PUT("/companies/{company_id}/", {
        params: { path: { company_id: companyId } },
        body: payload
      });
      if (response.error) throw new Error(response.error.message || "Failed to update company");
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["company", variables.companyId] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    }
  });
}
const createUpdateCompanyMutation = () => useUpdateCompany();
const createRegisterCompanyMutation = () => useRegisterCompany();
export {
  useCompany as a,
  createRegisterCompanyMutation as b,
  createUpdateCompanyMutation as c,
  useCompanies as u
};
