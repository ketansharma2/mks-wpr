import api from "@/lib/api";

class AdminMemberService {
  async getMembers(params?: any) {
    const response = await api.get("/admin/members", {
      params,
    });

    return response.data;
  }

  

  async getMember(id: string) {
    const response = await api.get(
      `/admin/members/${id}`
    );

    return response.data;
  }

  async createMember(data: any) {
    const response = await api.post(
      "/admin/members",
      data
    );

    return response.data;
  }

  async updateMember(
    id: string,
    data: any
  ) {
    const response = await api.put(
      `/admin/members/${id}`,
      data
    );

    return response.data;
  }
}

export default new AdminMemberService();