import api from "@/lib/api";

interface LoginRequest {
  email: string;
  password: string;
}

class AuthService {
  async login(payload: LoginRequest) {
    const response = await api.post("/auth/login", payload);
    return response.data;
  }

  async me() {
    const response = await api.get("/auth/me");
    return response.data;
  }

  async logout() {
    const response = await api.post("/auth/logout");
    return response.data;
  }
}

export default new AuthService();