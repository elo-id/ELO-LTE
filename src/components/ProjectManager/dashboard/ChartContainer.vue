<template>
  <div class="charts">
    <div class="bar-chart">
      <h3>Project Status</h3>
      <BarChart :chart-data="barChartData" />
    </div>
    <div class="stacked-chart">
      <h3>Project Type</h3>
      <StackedChart :chart-data="stackedChartData" />
    </div>
    <div class="pie-chart">
      <h3>Finished Status</h3>
      <PieChart :chart-data="pieChartData" />
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/Chart/chartjs/BarChart.vue";
import StackedChart from "@/components/Chart/chartjs/StackedChart.vue";
import PieChart from "@/components/Chart/chartjs/PieChart.vue";

export default {
  components: { StackedChart, BarChart, PieChart },
  props: {
    data: Object, // Contains full data.json
  },
  computed: {
    barChartData() {
      const projectStatus = this.data.projectStatus;

      return {
        labels: ["Status"], // dummy label (group name)
        datasets: Object.entries(projectStatus).map(([key, value], i) => ({
          label: key, // this appears in the legend
          data: [value], // single value per dataset
          backgroundColor: ["#575757", "#0064A0", "#BCC3C6", "#F09101"][i],
          borderWidth: 1,
        })),
      };
    },
    stackedChartData() {
      const projectType = this.data.projectType;

      const categories = Object.keys(projectType); // ['IT', 'Legal', 'Finance']
      const allMethods = new Set();

      // Collect all unique methods
      for (const cat of categories) {
        for (const method in projectType[cat]) {
          allMethods.add(method);
        }
      }

      const methodsArray = Array.from(allMethods); // consistent order

      // Build dataset for each method
      const datasets = methodsArray.map((method, i) => {
        return {
          label: method,
          data: categories.map((cat) => projectType[cat][method] || 0),
          backgroundColor: [
            "#F09101",
            "#575757",
            "#00A0DC",
            "#0064A0",
            "#BCC3C6",
            "#49D157",
            "#FF6200",
          ][i % 10], // Cycle colors
          stack: "stack1",
        };
      });

      return {
        labels: categories,
        datasets,
      };
    },
    pieChartData() {
      const finishedStatus = this.data.finishedStatus;
      return {
        labels: Object.keys(finishedStatus),
        datasets: [
          {
            data: Object.values(finishedStatus),
            backgroundColor: ["#0064A0", "#F09101"], // Adjust colors if needed
            borderWidth: 1,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.charts {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  margin-bottom: 0;
}


.chart-container {
  width: 400px; /* ✅ Adjust width as needed */
  height: 450px; /* ✅ Adjust height as needed */
  max-width: 100%;
  margin: auto;
  position: relative;
}

.bar-chart,
.stacked-chart,
.pie-chart {
  width: 30%; /* Allows 3 charts side-by-side */
  min-width: 300px; /* Prevents them from becoming too small */
  background: var(--bg);
  border-radius: 8px;
  box-sizing: border-box;
  position: relative;
  min-height: 440px;
  padding: 1rem;
}

/* Optional: Adjust headings */
.bar-chart h3,
.stacked-chart h3,
.pie-chart h3 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 16px;
  font-weight: 600;
}

/* Large desktops (1501px and above) */
@media (min-width: 1501px) {
  .charts {
    gap: 2rem;
    flex-direction: row;
  }
}

/* Medium screens: 1025px to 1500px */
@media (max-width: 1500px) and (min-width: 1025px) {
  .charts {
    gap: 3rem;
    flex-direction: row;
  }
}

/* Tablets: 768px to 1024px */
@media (max-width: 1024px) and (min-width: 769px) {
  .charts {
    flex-direction: column;
    gap: 4rem;
    align-items: center;
  }
}

/* Phones: up to 768px */
@media (max-width: 768px) {
  .charts {
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    padding: 0.75rem;
  }
}

/* Extra small phones: up to 450px */
@media (max-width: 450px) {
  .charts {
    gap: 2rem;
    padding: 0.5rem;
  }
}
</style>
