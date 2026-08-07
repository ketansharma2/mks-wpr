import api from "@/lib/api";

class AdminHelpService {
  async getIssues(params?: any) {
    const response = await api.get("/admin/help", {
      params,
    });

    return response.data;
  }

  async getIssue(id: string) {
    const response = await api.get(
      `/admin/help/${id}`
    );

    return response.data;
  }

  async updateIssue(
    id: string,
    data: any
  ) {
    const response = await api.put(
      `/admin/help/${id}`,
      data
    );

    return response.data;
  }
}

export default new AdminHelpService();