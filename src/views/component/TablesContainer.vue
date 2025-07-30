<template>
  <div>
    <div class="table-container">
      <!-- Button untuk toggle TableData -->
      <button @click="showTable1 = !showTable1" class="toggle-btn">
        <span :class="showTable1 ? 'arrow-down' : 'arrow-right'"></span>
        Common Table
      </button>
      <TableData
        v-if="showTable1 && chartData.length"
        :documents="chartData[0].documents"
      />

      <!-- Button untuk toggle TableData2 -->
      <button @click="showTable2 = !showTable2" class="toggle-btn">
        <span :class="showTable2 ? 'arrow-down' : 'arrow-right'"></span> Nested
        Table (Click on Selected Row)
      </button>
      <TableData2
        v-if="showTable2 && chartData.length"
        :documents2="chartData[0].documents2"
      />
    </div>
  </div>
</template>

<script>
import TableData from "@/components/Table/TableData.vue";
import TableData2 from "@/components/Table/TableData2.vue";

export default {
  components: { TableData, TableData2 },
  data() {
    return {
      chartData: [],
      showTable1: true,
      showTable2: true,
    };
  },
  async created() {
    try {
      const baseURL = window.location.origin + "/ix-Contelo/plugin/de.elo.ix.plugin.proxy/wf/apps/app/elo.lte";
      const response = await fetch(`${baseURL}/data/component_tablesdata.json`);
      const data = await response.json();
      this.chartData = data;
    } catch (error) {
      console.error("Error loading data.json:", error);
    }
  },
};
</script>

<style scoped>
.table-container {
  margin: 20px;
}

.toggle-btn {
  width: 100%;
  background: rgb(225, 225, 225);
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  color: #2182eb;
  margin-bottom: 10px;
}

.arrow-right::before {
  content: "▷";
  margin-right: 8px;
}

.arrow-down::before {
  content: "▽";
  margin-right: 8px;
}

@media (max-width: 1500px) {
  .chartdoc-container {
    flex-direction: column;
    margin: 0 auto;
    padding: 0 16px;
  }
}

@media (max-width: 1024px) {
  .chartdoc-container {
    flex-direction: column;
    margin: 0 auto;
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  .chartdoc-container {
    flex-direction: column;
    margin: 0 auto;
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  .chartdoc-container > * {
    width: 100%;
  }
}
</style>
