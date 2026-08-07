import api from "@/lib/api";

class AdminWprService {
  async getTasks(params: any) {
    const response = await api.get("/admin/wpr/tasks", {
      params,
    });

    return response.data;
  }

  async getMeetings(params: any) {
    const response = await api.get("/admin/wpr/meetings", {
      params,
    });

    return response.data;
  }

  async getMembers() {
    const response = await api.get("/admin/rnr/members");

    return response.data;
  }
}

export default new AdminWprService();