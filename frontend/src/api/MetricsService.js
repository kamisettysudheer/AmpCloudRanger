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
}

export default MetricsService;
