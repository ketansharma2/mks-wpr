import api from "@/lib/api";

export interface WprTaskPayload {
  date: string;
  timeline: string;
  task: string;
  trgtMin: number;
  type: string;
  status: string;
  upload: string;
}

class WprTaskService {
  async getTasks(params?: {
    startDate?: string;
    endDate?: string;
  }) {
    const response = await api.get("/wpr-tasks", {
      params,
    });

    return response.data;
  }

  async getTask(id: string) {
    const response = await api.get(`/wpr-tasks/${id}`);

    return response.data;
  }

  async createTask(data: WprTaskPayload) {
    const response = await api.post("/wpr-tasks", data);

    return response.data;
  }

  async addFixedTasks() {
  const response = await api.post("/wpr-tasks/add-fixed-tasks");
  return response.data;
}

  async updateTask(id: string, data: WprTaskPayload) {
    const response = await api.put(`/wpr-tasks/${id}`, data);

    return response.data;
  }
  async checkTask(task: string) {
    const response = await api.get("/wpr/tasks/check", {
      params: { task },
    });

    return response.data;
  }
  async deleteTask(id: string) {
    const response = await api.delete(`/wpr-tasks/${id}`);

    return response.data;
  }
}

export default new WprTaskService();