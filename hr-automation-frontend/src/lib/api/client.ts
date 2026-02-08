import createClient from 'openapi-fetch';
import type { paths } from './generated';

const MAIN_API = 'http://localhost:8888/interview-management-service/api/v1';
const TECH_INTERVIEW_API = 'http://localhost:8100';
const HR_INTERVIEW_API = 'http://localhost:8200';
const DYNAMIC_FORM_API = 'http://localhost:8889';
const APTITUDE_TEST_API = 'http://localhost:8890';

function getAuthHeaders(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const workspaceId = localStorage.getItem('workspace-id');
  const userId = localStorage.getItem('user-id');
  
  const headers: Record<string, string> = {};
  if (workspaceId) headers['workspace-id'] = workspaceId;
  if (userId) headers['user-id'] = userId;
  
  return headers;
}

function createApiClient(baseUrl: string) {
  const client = createClient<paths>({ baseUrl });

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

export const api = createApiClient(MAIN_API);
export const techInterviewApi = createApiClient(TECH_INTERVIEW_API);
export const hrInterviewApi = createApiClient(HR_INTERVIEW_API);
export const dynamicFormApi = createApiClient(DYNAMIC_FORM_API);
export const aptitudeTestApi = createApiClient(APTITUDE_TEST_API);

// Helper function to make raw fetch calls with auth headers
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
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

// API base URLs export for WebSocket connections
export const API_URLS = {
  main: MAIN_API,
  techInterview: TECH_INTERVIEW_API,
  hrInterview: HR_INTERVIEW_API,
  dynamicForm: DYNAMIC_FORM_API,
  aptitudeTest: APTITUDE_TEST_API
};
