import { a as api } from "./client2.js";
import { c as createMutation } from "./createMutation.js";
function useSignup() {
  return createMutation({
    mutationFn: async (payload) => {
      const response = await api.POST("/auth/signup/", {
        body: payload
      });
      if (response.error) {
        throw new Error(response.error.message || "Signup failed");
      }
      return response.data;
    }
  });
}
function useLogin() {
  return createMutation({
    mutationFn: async (payload) => {
      const response = await api.POST("/auth/login/", {
        body: payload
      });
      if (response.error) {
        throw new Error(response.error.message || "Login failed");
      }
      return response.data;
    }
  });
}
function useLogout() {
  return createMutation({
    mutationFn: async () => {
      const userId = typeof window !== "undefined" ? localStorage.getItem("user-id") : null;
      const response = await api.POST("/auth/logout/", {
        params: {
          header: { "user-id": userId || "" }
        }
      });
      if (response.error) {
        throw new Error(response.error.message || "Logout failed");
      }
      return response.data;
    }
  });
}
export {
  useLogin as a,
  useSignup as b,
  useLogout as u
};
