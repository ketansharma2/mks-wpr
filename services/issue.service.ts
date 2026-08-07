// services/issue.service.ts

import api from "@/lib/api";

class IssueService {
  async createIssue(data: any) {
    const response = await api.post(
      "/admin/help",
      data
    );

    return response.data;
  }
}

export default new IssueService();