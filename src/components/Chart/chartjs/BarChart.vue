<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

export default {
  props: {
    chartData: Object,
    options: Object,
    hideLegend: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    Chart.plugins.unregister(ChartDataLabels);
    Chart.plugins.register(ChartDataLabels);

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

      // Dynamically calculate highest value in datasets
      const allData = this.chartData.datasets.map((ds) => ds.data).flat();
      const maxValue = Math.max(...allData);
      const suggestedMax = maxValue + 1;

      this.chart = new Chart(this.$refs.chartCanvas, {
        type: "bar",
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: {
              top: 10,
              bottom: 30,
            },
          },
          legend: {
            display: !this.hideLegend,
            position: "bottom",
            labels: {
              boxWidth: 12,
              // padding: 20,
              fontColor: "#333",
              fontSize: 12,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  suggestedMax: suggestedMax,
                  stepSize: 1,
                  precision: 0,
                },
              },
            ],
          },
          plugins: {
            datalabels: {
              color: "#6a6a6a",
              font: {
                weight: "normal",
                size: 12,
              },
              anchor: "end",
              align: "top",
              formatter: (value) => value || "",
              padding: 2,
            },
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0]._index;
              const label = this.chart.data.labels[index];

              this.$emit("slice-click", label);
            }
          },
        },
      });
    },
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
