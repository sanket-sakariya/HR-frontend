import "clsx";
class AuthStore {
  isAuthenticated = false;
  userId = null;
  username = null;
  email = null;
  workspaceId = null;
  accessToken = null;
  companyId = null;
  company = null;
  isLoading = true;
  constructor() {
    if (typeof window !== "undefined") {
      this.userId = localStorage.getItem("user-id");
      this.username = localStorage.getItem("username");
      this.email = localStorage.getItem("email");
      this.workspaceId = localStorage.getItem("workspace-id");
      this.accessToken = localStorage.getItem("access-token");
      this.companyId = localStorage.getItem("company-id");
      this.isAuthenticated = !!(this.userId && this.workspaceId);
      this.isLoading = false;
    }
  }
  /**
   * Set user credentials after successful login
   */
  setUserCredentials(data) {
    this.userId = data.user_id;
    this.username = data.username;
    this.email = data.email;
    this.workspaceId = data.workspace_id;
    this.accessToken = data.access_token || null;
    this.isAuthenticated = true;
    if (typeof window !== "undefined") {
      localStorage.setItem("user-id", data.user_id);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.email);
      localStorage.setItem("workspace-id", data.workspace_id);
      if (data.access_token) {
        localStorage.setItem("access-token", data.access_token);
      }
    }
  }
  /**
   * Legacy method for backward compatibility with company-based auth
   * @deprecated Use setUserCredentials instead
   */
  setCredentials(data) {
    this.companyId = data.company_id;
    this.workspaceId = data.workspace_id;
    this.userId = data.user_id;
    this.company = data.company || null;
    this.isAuthenticated = true;
    if (typeof window !== "undefined") {
      localStorage.setItem("company-id", data.company_id);
      localStorage.setItem("workspace-id", data.workspace_id);
      localStorage.setItem("user-id", data.user_id);
    }
  }
  setCompany(company) {
    this.company = company;
    this.companyId = company.company_id;
    if (typeof window !== "undefined") {
      localStorage.setItem("company-id", company.company_id);
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
    if (typeof window !== "undefined") {
      localStorage.removeItem("user-id");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("workspace-id");
      localStorage.removeItem("access-token");
      localStorage.removeItem("company-id");
    }
  }
  get isReady() {
    return !this.isLoading;
  }
  get displayName() {
    return this.username || this.email || "User";
  }
}
const authStore = new AuthStore();
export {
  authStore as a
};
