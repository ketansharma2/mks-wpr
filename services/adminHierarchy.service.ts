import api from "@/lib/api";

class AdminHierarchyService {
  async getDocuments() {
    const response = await api.get("/admin/hierarchy");
    return response.data;
  }

  async uploadDocument(formData: FormData) {
    const response = await api.post(
      "/admin/hierarchy",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  }

  async deleteDocument(id: string) {
    const response = await api.delete(
      `/admin/hierarchy/${id}`
    );

    return response.data;
  }
}

export default new AdminHierarchyService();