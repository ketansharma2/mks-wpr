import api from "@/lib/api";

class RnrService {
  async getTasks() {
    const response = await api.get("/rnr");
    return response.data;
  }

  async createTask(data: unknown) {
    const response = await api.post("/rnr", data);
    return response.data;
  }

  async updateTask(id: string, data: unknown) {
    const response = await api.put(`/rnr/${id}`, data);
    return response.data;
  }

  async deleteTask(id: string) {
    const response = await api.delete(`/rnr/${id}`);
    return response.data;
  }
}

export default new RnrService();