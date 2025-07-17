// src/api/MetricsService.js

class MetricsService {
  static async fetchMetrics() {
    try {
      const response = await fetch("http://localhost:8080/metrics");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch metrics:", error);
      throw error;
    }
  }
  static async fetchCostService(from, to, groupBy = null) {
    try {
      const params = new URLSearchParams({
        from: from,
        to: to
      });
      if (groupBy) {
        params.append('group_by', groupBy);
      }
      const response = await fetch(`http://localhost:8080/billing?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Return only the costs array for direct use in cost by service chart
      return data.costs || [];
    } catch (error) {
      console.error("Failed to fetch billing data:", error);
      throw error;
    }
  }
}

export default MetricsService;
