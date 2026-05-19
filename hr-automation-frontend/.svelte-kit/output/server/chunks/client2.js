import createClient from "openapi-fetch";
const MAIN_API = "http://localhost:8888/interview-management-service/api/v1";
const TECH_INTERVIEW_API = "http://localhost:8100";
const HR_INTERVIEW_API = "http://localhost:8200";
const DYNAMIC_FORM_API = "http://localhost:8889";
const APTITUDE_TEST_API = "http://localhost:8890";
function getAuthHeaders() {
  if (typeof window === "undefined") return {};
  const workspaceId = localStorage.getItem("workspace-id");
  const userId = localStorage.getItem("user-id");
  const headers = {};
  if (workspaceId) headers["workspace-id"] = workspaceId;
  if (userId) headers["user-id"] = userId;
  return headers;
}
function createApiClient(baseUrl) {
  const client = createClient({ baseUrl });
  client.use({
    onRequest({ request }) {
      const authHeaders = getAuthHeaders();
      Object.entries(authHeaders).forEach(([key, value]) => {
        request.headers.set(key, value);
      });
      return request;
    }
  });
  return client;
}
const api = createApiClient(MAIN_API);
createApiClient(TECH_INTERVIEW_API);
createApiClient(HR_INTERVIEW_API);
createApiClient(DYNAMIC_FORM_API);
createApiClient(APTITUDE_TEST_API);
async function fetchWithAuth(url, options = {}) {
  const authHeaders = getAuthHeaders();
  const headers = new Headers(options.headers);
  Object.entries(authHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
  return fetch(url, {
    ...options,
    headers
  });
}
const API_URLS = {
  main: MAIN_API,
  techInterview: TECH_INTERVIEW_API,
  hrInterview: HR_INTERVIEW_API,
  dynamicForm: DYNAMIC_FORM_API,
  aptitudeTest: APTITUDE_TEST_API
};
export {
  API_URLS as A,
  api as a,
  fetchWithAuth as f
};
