<template>
  <div class="chart-component-content">
    <div class="charts">
      <div
        v-for="(chartType, category) in selectedChartTypes"
        :key="category"
        class="chart-box"
      >
        <h3 class="chart-title">{{ capitalize(category) }} Distribution</h3>

        <component
          :is="getChartComponent(chartType)"
          :chart-data="generateChartData(category)"
          :title="category"
          :hide-legend="true"
        />
        <select v-model="selectedChartTypes[category]" class="chart-type">
          <option value="doughnut">Doughnut Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="pie">Pie Chart</option>
          <option value="polar">Polar Area Chart</option>
          <option value="radar">Radar Chart</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from "@/components/Chart/chartjs/DoughnutChart.vue";
import PieChart from "@/components/Chart/chartjs/PieChart.vue";
import BarChart from "@/components/Chart/chartjs/BarChart.vue";
import PolarAreaChart from "@/components/Chart/chartjs/PolarAreaChart.vue";
import RadarChart from "@/components/Chart/chartjs/RadarChart.vue";

export default {
  name: "ChartPage",
  components: {
    DoughnutChart,
    PieChart,
    BarChart,
    PolarAreaChart,
    RadarChart,
  },
  data() {
    return {
      data: [],
      selectedChartTypes: {
        "Compliance Type": "polar",
        "PIC Department": "doughnut",
        Status: "pie",
        "Total Companies": "radar",
        "Completed %": "bar",
        "In Progress %": "radar",
        "Pending %": "polar",
        "Department Spread": "doughnut",
      },
    };
  },
  async created() {
    try {
      const response = await fetch("/data/component_chartsdata.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      this.data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
  methods: {
    getChartComponent(type) {
      const chartMap = {
        bar: "BarChart",
        pie: "PieChart",
        doughnut: "DoughnutChart",
        line: "LineChart",
        polar: "PolarAreaChart",
        radar: "RadarChart",
      };
      return chartMap[type] || "DoughnutChart";
    },
    generateChartData(field) {
      if (!this.data || this.data.length === 0) {
        return {
          labels: [],
          datasets: [],
        };
      }
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
            label: this.capitalize(field), // ✅ This fixes the undefined legend
            data: Object.values(counts),
            backgroundColor: generateColors(Object.keys(counts).length),
          },
        ],
      };
    },
    handleChartClick(category, event) {
      console.log("Slice clicked in", category, event);
    },
    capitalize(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped>
.chart-component-content {
  margin-top: 20px;
}

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
