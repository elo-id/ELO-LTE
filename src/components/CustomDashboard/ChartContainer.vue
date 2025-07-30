<template>
  <div>
    <div class="charts">
      <div
        v-for="(chartType, category) in selectedChartTypes"
        :key="category"
        class="chart-box"
      >
        <!-- Title: Capitalized Category + Distribution -->
        <h3 class="chart-title">{{ capitalize(category) }} Distribution</h3>

        <!-- Chart component -->
        <component
          :is="getChartComponent(chartType)"
          :chart-data="generateChartData(category)"
          :title="category"
          :hide-legend="true"
          @slice-click="handleChartClick(category, $event)"
        />

        <!-- Dropdown for chart type -->
        <select v-model="selectedChartTypes[category]" class="chart-type">
          <option value="doughnut">Doughnut Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "@/components/Chart/chartjs/DoughnutChart.vue";
import PieChart from "@/components/Chart/chartjs/PieChart.vue";
import BarChart from "@/components/Chart/chartjs/BarChart.vue";

export default {
  components: { DoughnutChart, PieChart, BarChart },
  props: {
    data: Array,
    columns: Array,
  },
  data() {
    return {
      selectedFilter: null, // Menyimpan filter aktif
      selectedCategory: null, // Menyimpan kategori yang difilter
      selectedChartTypes: {
        age: "bar",
        city: "pie",
        position: "doughnut",
      },
    };
  },
  methods: {
    capitalize(word) {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    getChartComponent(type) {
      return type === "bar"
        ? "BarChart"
        : type === "pie"
        ? "PieChart"
        : "DoughnutChart";
    },
    generateChartData(field) {
      const counts = this.data.reduce((acc, item) => {
        acc[item[field]] = (acc[item[field]] || 0) + 1;
        return acc;
      }, {});

      const generateColors = (count) => {
        const colors = [];
        for (let i = 0; i < count; i++) {
          colors.push(`hsl(${(i * 360) / count}, 70%, 50%)`);
        }
        return colors;
      };

      return {
        labels: Object.keys(counts),
        datasets: [
          {
            data: Object.values(counts),
            backgroundColor: generateColors(Object.keys(counts).length),
          },
        ],
      };
    },
    handleChartClick(category, value) {
      this.$emit("filter-change", { category, value });
    },
  },
};
</script>

<style>
.chart-title {
  font-size: 16px;
  font-weight: 600;
  margin: 16px 0 8px;
}

.charts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.chart-box {
  width: 100%;
  max-width: 480px;
  padding-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: var(--bg);
  box-shadow: 2px 2px 10px rgba(var(--text-rgb), 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-type {
  margin-top: 20px;
  padding: 5px;
  border-radius: 5px;
}
</style>
