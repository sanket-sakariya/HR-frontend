import type { Company } from '$lib/api/generated';

interface UserData {
  user_id: string;
  username: string;
  email: string;
  workspace_id: string;
  access_token?: string;
}

class AuthStore {
  isAuthenticated = $state(false);
  userId = $state<string | null>(null);
  username = $state<string | null>(null);
  email = $state<string | null>(null);
  workspaceId = $state<string | null>(null);
  accessToken = $state<string | null>(null);
  companyId = $state<string | null>(null);
  company = $state<Company | null>(null);
  isLoading = $state(true);

  constructor() {
    // Hydrate from localStorage on init (client-side only)
    if (typeof window !== 'undefined') {
      this.userId = localStorage.getItem('user-id');
      this.username = localStorage.getItem('username');
      this.email = localStorage.getItem('email');
      this.workspaceId = localStorage.getItem('workspace-id');
      this.accessToken = localStorage.getItem('access-token');
      this.companyId = localStorage.getItem('company-id');
      this.isAuthenticated = !!(this.userId && this.workspaceId);
      this.isLoading = false;
    }
  }

  /**
   * Set user credentials after successful login
   */
  setUserCredentials(data: UserData) {
    this.userId = data.user_id;
    this.username = data.username;
    this.email = data.email;
    this.workspaceId = data.workspace_id;
    this.accessToken = data.access_token || null;
    this.isAuthenticated = true;

    if (typeof window !== 'undefined') {
      localStorage.setItem('user-id', data.user_id);
      localStorage.setItem('username', data.username);
      localStorage.setItem('email', data.email);
      localStorage.setItem('workspace-id', data.workspace_id);
      if (data.access_token) {
        localStorage.setItem('access-token', data.access_token);
      }
    }
  }

  /**
   * Legacy method for backward compatibility with company-based auth
   * @deprecated Use setUserCredentials instead
   */
  setCredentials(data: { 
    company_id: string; 
    workspace_id: string; 
    user_id: string;
    company?: Company;
  }) {
    this.companyId = data.company_id;
    this.workspaceId = data.workspace_id;
    this.userId = data.user_id;
    this.company = data.company || null;
    this.isAuthenticated = true;

    if (typeof window !== 'undefined') {
      localStorage.setItem('company-id', data.company_id);
      localStorage.setItem('workspace-id', data.workspace_id);
      localStorage.setItem('user-id', data.user_id);
    }
  }

  setCompany(company: Company) {
    this.company = company;
    this.companyId = company.company_id;
    if (typeof window !== 'undefined') {
      localStorage.setItem('company-id', company.company_id);
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.userId = null;
    this.username = null;
    this.email = null;
    this.workspaceId = null;
    this.accessToken = null;
    this.companyId = null;
    this.company = null;

    if (typeof window !== 'undefined') {
      localStorage.removeItem('user-id');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('workspace-id');
      localStorage.removeItem('access-token');
      localStorage.removeItem('company-id');
    }
  }

  get isReady() {
    return !this.isLoading;
  }

  get displayName() {
    return this.username || this.email || 'User';
  }
}

export const authStore = new AuthStore();
