import api from "@/lib/api";

class WprService {
  async getTasks(params?: unknown) {
    const response = await api.get("/wpr/tasks", {
      params,
    });

    return response.data;
  }

  async createTask(data: unknown) {
    const response = await api.post("/wpr/tasks", data);
    return response.data;
  }

  async updateTask(id: string, data: unknown) {
    const response = await api.put(`/wpr/tasks/${id}`, data);
    return response.data;
  }

  async deleteTask(id: string) {
    const response = await api.delete(`/wpr/tasks/${id}`);
    return response.data;
  }

  

  async getMeetings() {
    const response = await api.get("/meetings");
    return response.data;
  }

  async createMeeting(data: unknown) {
    const response = await api.post("/meetings", data);
    return response.data;
  }
}

export default new WprService();