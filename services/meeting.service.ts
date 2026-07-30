import api from "@/lib/api";

export interface MeetingPayload {
  date: string;
  dept: string;
  attendees: string;
  topic: string;
  time: number;
  propSlot: string;
  status: string;
  notes: string;
}

class MeetingService {
  async getMeetings(params?: {
    startDate?: string;
    endDate?: string;
  }) {
    const response = await api.get("/meetings", {
      params,
    });

    return response.data;
  }

  async getMeeting(id: string) {
    const response = await api.get(`/meetings/${id}`);

    return response.data;
  }

  async createMeeting(data: MeetingPayload) {
    const response = await api.post("/meetings", data);

    return response.data;
  }

  async updateMeeting(id: string, data: MeetingPayload) {
    const response = await api.put(`/meetings/${id}`, data);

    return response.data;
  }

  async deleteMeeting(id: string) {
    const response = await api.delete(`/meetings/${id}`);

    return response.data;
  }
}

export default new MeetingService();