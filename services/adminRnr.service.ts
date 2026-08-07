import api from "@/lib/api";

class AdminRnrService {
  async getMemberData(userId: string) {
    const response = await api.get(
      `/admin/rnr/member/${userId}`
    );

    return response.data;
  }

  async getMembers() {
    const response = await api.get(
      "/admin/members"
    );

    return response.data;
  }
}

export default new AdminRnrService();