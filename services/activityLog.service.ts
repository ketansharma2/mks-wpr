import api from "@/lib/api";

class ActivityLogService {
  async getLogs(params?: any) {
    const response = await api.get(
      "/admin/activity-logs",
      {
        params,
      }
    );

    return response.data;
  }
}

export default new ActivityLogService();