<template>
  <div class="chart-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: Object,
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
        legend: {
          position: "bottom",
          display: false,
        },
        plugins: {
          datalabels: {
            display: true,
            color: "#ffffff", // 👈 Text color inside bars
            font: {
              weight: "bold",
              size: 12,
            },
            formatter: (value) => value, // Optional: customize label content
          },
        },
      },
    };
  },
  mounted() {
    // Dynamically calculate suggestedMax
    const allData = this.chartData.datasets
      .map((ds) => ds.data)
      .reduce(
        (acc, cur) => acc.map((val, i) => val + (cur[i] || 0)),
        new Array(this.chartData.labels.length).fill(0)
      );

    const maxValue = Math.max(...allData);
    const suggestedMax = maxValue + 1;

    this.chartOptions.scales.yAxes[0].ticks.suggestedMax = suggestedMax;
    this.renderChart(this.chartData, this.chartOptions);
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

canvas {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
