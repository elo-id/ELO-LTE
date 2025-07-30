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
    // Register plugin dynamically inside mounted() to avoid lifecycle issues
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

      this.chart = new Chart(this.$refs.chartCanvas, {
        type: "polarArea",
        data: this.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: !this.hideLegend,
            position: "bottom",
            labels: {
              usePointStyle: true,
              boxWidth: 12,
              padding: 20,
              fontColor: "#333",
              fontSize: 14,
            },
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex].data;
                const total = dataset.reduce((acc, value) => acc + value, 0);
                const value = dataset[tooltipItem.index];
                const percentage = ((value / total) * 100).toFixed(2);
                return `${
                  data.labels[tooltipItem.index]
                }: ${value} (${percentage}%)`;
              },
            },
          },
          plugins: {
            datalabels: {
              color: "white",
              font: {
                weight: "normal",
                size: 12,
              },
              // formatter: (value, context) => {
              //   let label = context.chart.data.labels[context.dataIndex];
              //   return `${label}\n${value}`;
              // },
              anchor: "center", // ✅ Menjaga posisi teks tetap di tengah slice
              align: "center", // ✅ Pastikan masih rata tengah
              offset: 10, // ✅ Jarak lebih kecil untuk menghindari teks keluar
              clamp: true, // ✅ Mencegah teks keluar area chart
              clip: false, // ✅ Memastikan teks tetap terlihat
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

<style>
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
