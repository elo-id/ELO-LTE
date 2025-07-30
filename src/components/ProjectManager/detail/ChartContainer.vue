<template>
  <div v-if="project && project.weekly_progress.length">
    <LineChart :chart-data="chartData" :chart-options="chartOptions" />
  </div>
  <div v-else>
    <p style="padding: 20px">No weekly progress data available.</p>
  </div>
</template>

<script>
import LineChart from "@/components/Chart/chartjs/LineChart.vue";

export default {
  name: "ChartContainer",
  components: { LineChart },
  props: {
    project: Object,
  },
  computed: {
    chartData() {
      const weeks = this.project.weekly_progress.map((wp) => wp.week);
      const plan = this.project.weekly_progress.map((wp) =>
        parseFloat(wp.plan.replace("%", ""))
      );
      const actual = this.project.weekly_progress.map((wp) => {
        const val = parseFloat(wp.actual.replace("%", ""));
        return val === 0 ? null : val; // breaks the line at 0
      });

      return {
        labels: weeks,
        datasets: [
          {
            label: "Planned",
            data: plan,
            borderColor: "#36A2EB",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 3,
            fill: false,
          },
          {
            label: "Actual",
            data: actual,
            borderColor: "#FF6384",
            backgroundColor: "transparent",
            borderWidth: 2,
            pointRadius: 3,
            fill: false,
            spanGaps: false, // IMPORTANT: prevents connecting nulls
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Weekly Progress Comparison",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback: (value) => `${value}%`,
            },
          },
        },
      };
    },
  },
};
</script>
