import api from "@/lib/api";

class MemberService {
  async getAll(params?: unknown) {
    const response = await api.get("/members", {
      params,
    });

    return response.data;
  }

  async getById(id: string) {
    const response = await api.get(`/members/${id}`);
    return response.data;
  }

  async getProfile() {
    const response = await api.get("/members/profile");
    return response.data;
  }

  async updateProfile(data: {
  name: string;
}) {
  const response = await api.put(
    "/members/profile",
    data
  );

  return response.data;
}
  
  async create(data: unknown) {
    const response = await api.post("/members", data);
    return response.data;
  }

  async update(id: string, data: unknown) {
    const response = await api.put(`/members/${id}`, data);
    return response.data;
  }

  async delete(id: string) {
    const response = await api.delete(`/members/${id}`);
    return response.data;
  }
}

export default new MemberService();