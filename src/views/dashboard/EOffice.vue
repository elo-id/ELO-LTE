<template>
  <div class="content">
    <div class="chartdoc-container">
      <ChartContainer v-if="chartData.length" :data="chartData" />
      <DocumentCard v-if="chartData.length" :documents="chartData[0]" />
    </div>

    <div class="table-container">
      <!-- Button untuk toggle TableData -->
      <button @click="showTable1 = !showTable1" class="toggle-btn">
        <span :class="showTable1 ? 'arrow-down' : 'arrow-right'"></span> Outgoing Document
      </button>
      <TableData v-if="showTable1 && chartData.length" :documents="chartData[0].documents" />
  
      <!-- Button untuk toggle TableData2 -->
      <button @click="showTable2 = !showTable2" class="toggle-btn">
        <span :class="showTable2 ? 'arrow-down' : 'arrow-right'"></span> Incoming Document
      </button>
      <TableData2 v-if="showTable2 && chartData.length" :documents2="chartData[0].documents2" />
    </div>
  </div>
</template>

<script>
import ChartContainer from '@/components/EOffice/ChartContainer.vue';
import DocumentCard from '@/components/EOffice/DocumentCard.vue';
import TableData from '@/components/EOffice/TableData.vue';
import TableData2 from '@/components/EOffice/TableData2.vue';

export default {
  name: 'Dashboard',
  components: { ChartContainer, DocumentCard, TableData, TableData2 },
  data() {
    return {
      chartData: [],
      showTable1: true, // Default: TableData ditampilkan
      showTable2: true, // Default: TableData2 ditampilkan
    };
  },
  async created() {
    try {
      const baseURL = window.location.origin + "/ix-Contelo/plugin/de.elo.ix.plugin.proxy/wf/apps/app/elo.lte";
      const response = await fetch(`${baseURL}/data/eofficedata.json`);
      const data = await response.json();
      this.chartData = data;
    } catch (error) {
      console.error('Error loading data.json:', error);
    }
  }
};
</script>

<style scoped>
.chartdoc-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  margin: 30px auto 40px auto; /* ✅ centers content */
  padding: 0 16px; /* ✅ consistent horizontal spacing on small screens */
  box-sizing: border-box;
}

.chartdoc-container > * {
  flex: 0 1 50%;
}

/* .table-container {
  margin-top: 40px;
} */

.toggle-btn {
  width: 100%;
  background: rgb(225, 225, 225);
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  color: #2182eb;
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
