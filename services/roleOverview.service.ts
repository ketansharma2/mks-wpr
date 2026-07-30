import api from "@/lib/api";

export interface RoleOverview {
  name: string;
  designation: string;
  subject: string;
  object: string;
  goal: string;
}

class RoleOverviewService {
  async get() {
    const response = await api.get("/role-overview");
    return response.data;
  }

  async save(data: RoleOverview) {
    const response = await api.post("/role-overview", data);
    return response.data;
  }
}

export default new RoleOverviewService();