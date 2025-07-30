<template>
  <div class="charts">
    <div class="pie-card">
      <h3>Status Document</h3>
      <PieChart :chart-data="pieChartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import PieChart from "@/components/Chart/chartjs/PieChart.vue";

export default {
  components: { PieChart },
  props: {
    data: Object,
  },
  computed: {
    pieChartData() {
      if (!this.data || !this.data.status) return { labels: [], datasets: [] };

      const status = this.data.status;

      return {
        labels: Object.keys(status),
        datasets: [
          {
            data: Object.values(status),
            backgroundColor: ["#28a745", "#ffc107", "#6c757d", "#dc3545"],
            borderWidth: 0,
            borderColor: "transparent",
          },
        ],
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
            fontColor: "#ffffff", // Text color
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
.charts {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.pie-card {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.pie-card h3 {
  text-align: center;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
}
</style>
