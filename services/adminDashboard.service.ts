import api from "@/lib/api";

class AdminDashboardService {
  async getDashboard() {
    const response = await api.get("/admin/dashboard");
    return response.data;
  }
}

export default new AdminDashboardService();