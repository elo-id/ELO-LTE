<template>
  <div class="content">
    <h3>Weekly Target & Actual Execution</h3>
    <div class="chart-container">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  props: {
    chartData: Object,
    options: Object,
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.renderChart();
  },
  watch: {
    chartData: {
      deep: true,
      handler() {
        this.renderChart();
      },
    },
  },
  methods: {
    renderChart() {
      if (this.chart) this.chart.destroy();

      this.chart = new Chart(this.$refs.chartCanvas, {
        type: "line",
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Weekly Progress Comparison",
          },
          legend: {
            position: "right",
            labels: {
              usePointStyle: true,
              fontSize: 14,
            },
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return `${tooltipItem.yLabel}%`;
              },
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  max: 100,
                  callback: (value) => `${value}%`,
                },
                scaleLabel: {
                  display: true,
                  labelString: "Progress (%)",
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Weeks",
                },
              },
            ],
          },
          elements: {
            line: {
              tension: 0.3,
            },
            point: {
              radius: 4,
              hoverRadius: 6,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.content {
 padding: 0 20px 0 20px;
}

h3 {
  display: flex;
  align-items: start;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 26px;
}

.chart-container {
  width: 800px;
  height: 500px;
  max-width: 100%;
  margin: auto;
  position: relative;
}

@media (max-width: 768px) {
  .chart-container {
    width: 400px;
    height: 350px;
  }
}
</style>
