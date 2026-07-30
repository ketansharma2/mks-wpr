import api from "@/lib/api";

export interface FixedTaskPayload {
  assignedBy: string;
  task: string;
  frequency: string;
  uploadClosing: string;
}

class FixedTaskService {
  async getTasks() {
    const response = await api.get("/fixed-tasks");
    return response.data;
  }

  async getTask(id: string) {
    const response = await api.get(`/fixed-tasks/${id}`);
    return response.data;
  }

  async createTask(data: FixedTaskPayload) {
    const response = await api.post("/fixed-tasks", data);
    return response.data;
  }

  async updateTask(id: string, data: FixedTaskPayload) {
    const response = await api.put(`/fixed-tasks/${id}`, data);
    return response.data;
  }

  async deleteTask(id: string) {
    const response = await api.delete(`/fixed-tasks/${id}`);
    return response.data;
  }
}

export default new FixedTaskService();