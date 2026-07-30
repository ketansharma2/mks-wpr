import api from "@/lib/api";

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: {
    stats: {
      totalTasks: number;
      completed: number;
      notStarted: number;
      inProgress: number;
      onHold: number;
      cancelled: number;
      totalMeetings: number;
      wprStreak: number;
    };

    allTasks: unknown[];
    allMeetings: unknown[];

    todayTasks: unknown[];
    todayMeetings: unknown[];
  };
}

const memberDashboardService = {
  async getDashboard(): Promise<DashboardResponse> {
    const response = await api.get("/member-dashboard");
    return response.data;
  },
};

export default memberDashboardService;