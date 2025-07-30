<template>
  <div class="dashboard-charts">
    <div class="pie-card">
      <h3>Status Document</h3>
      <PieChart :chart-data="pieChartData" :options="chartOptions" />
    </div>
    <div class="bar-card">
      <h3>Overall Finished Document</h3>
      <BarChart :chart-data="barChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Chart/chartjs/PieChart.vue";
import BarChart from "@/components/Chart/chartjs/BarChart.vue";

export default {
  components: { PieChart, BarChart },
  props: {
    data: Array, // Data passed from Dashboard.vue
  },
  computed: {
    pieChartData() {
      if (!this.data.length) return { labels: [], datasets: [] };

      const summary = this.data[0].summary;

      return {
        labels: ["Outgoing document", "Unread", "Pending Actions", "Not Sent"],
        datasets: [
          {
            data: [
              summary.outgoing_document,
              summary.unread,
              summary.pending_actions,
              summary.not_sent,
            ],
            backgroundColor: ["#F09101", "#575757", "#0064A0", "#BCC3C6"], // Colors
            borderWidth: 0,
            borderColor: "transparent",
          },
        ],
      };
    },
    barChartData() {
      if (!this.data.length) return { labels: [], datasets: [] };

      const overall = this.data[0].overall;

      return {
        labels: ["Documents"], // Single label for x-axis
        datasets: [
          {
            label: "2022",
            data: [overall["2022"] ?? null], // ❌ Use null instead of 0 if empty
            backgroundColor: "#F09101",
            hidden: false,
          },
          {
            label: "2023",
            data: [overall["2023"] !== undefined ? overall["2023"] : 0],
            backgroundColor: "#575757",
            hidden: false,
          },
          {
            label: "2024",
            data: [overall["2024"] ?? null],
            backgroundColor: "#0064A0",
            hidden: false,
          },
          {
            label: "2025",
            data: [overall["2025"] ?? null],
            backgroundColor: "#BCC3C6",
            hidden: false,
          },
        ].filter((dataset) => dataset.data.some((val) => val !== null)), // ✅ Remove empty datasets
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: "bottom",
          labels: {
            usePointStyle: true, // Use small dots instead of squares
            boxWidth: 8, // Adjust dot size
            padding: 20, // Add space between items
            fontColor: "#333", // Text color
            fontSize: 14, // Adjust text size
          },
        },
        tooltips: {
          enabled: true,
        },
      };
    },
  },
};
</script>

<style scoped>
.dashboard-charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 16px;
  box-sizing: border-box;
}

.pie-card,
.bar-card {
  width: 100%; /* Let Grid handle sizing */
  padding: 0px;
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  min-height: 440px;
}

.pie-card {
  height: 440px;
}

.bar-card {
  height: 480px;
}

.pie-card h3,
.bar-card h3 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .dashboard-charts {
    flex-direction: column;
    align-items: center;
    padding: 0 8px;
    gap: 60px;
  }

  .pie-card,
  .bar-card {
    width: 100%;
    max-width: 95vw;
  }
}
</style>
