<template>
  <div class="dashboard">
    <div class="content">
      <div class="charts-container">
        <ChartContainer
          :data="chartFilteredData"
          :columns="columns"
          @filter-change="handleChartFilter"
        />
      </div>

      <div class="table-container">
        <div class="buttons">
          <div class="button-group-a">
            <ExportButtons :data="filteredData" :columns="visibleColumns" />
            <ColumnVisibility :columns="columns" v-model="columnVisibility" />
          </div>
          <FilterInput v-model="filterText" />
        </div>

        <div class="table-datas">
          <DataTable
            :columns="visibleColumns"
            :data="paginatedSortedFilteredData"
          />
        </div>

        <div class="pagein-controls">
          <PaginationControls
            :current-page="currentPage"
            :total-pages="totalPages"
            :items-per-page="itemsPerPage"
            :filtered-data-length="filteredData.length"
            @prev="prevPage"
            @next="nextPage"
            @update-items="updateItemsPerPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartContainer from "@/components/CustomDashboard/ChartContainer.vue";
import ColumnVisibility from "@/components/CustomDashboard/filter/ColumnVisibility.vue";
import FilterInput from "@/components/CustomDashboard/filter/FilterInput.vue";
import ExportButtons from "@/components/CustomDashboard/filter/ExportButtons.vue";
import DataTable from "@/components/CustomDashboard/DataTable.vue";
import PaginationControls from "@/components/CustomDashboard/PaginationControls.vue";

export default {
  name: "DashboardPage",
  components: {
    ChartContainer,
    ColumnVisibility,
    FilterInput,
    ExportButtons,
    DataTable,
    PaginationControls,
  },
  data() {
    return {
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      filterText: "",
      selectedFilter: null,
      selectedCategory: null,
      columns: [
        "id",
        "name",
        "email",
        "age",
        "city",
        "phone",
        "address",
        "company",
        "position",
        "website",
        "hobby",
      ],
      columnVisibility: JSON.parse(
        localStorage.getItem("columnVisibility")
      ) || {
        id: true,
        name: true,
        email: true,
        age: true,
        city: true,
        phone: true,
        address: true,
        company: true,
        position: true,
        website: true,
        hobby: true,
      },
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage);
    },
    chartFilteredData() {
      let data = this.data;

      // Jika ada filter dari chart, terapkan ke data
      if (this.selectedFilter && this.selectedCategory) {
        data = data.filter(
          (item) =>
            String(item[this.selectedCategory]) === String(this.selectedFilter)
        );
      }

      // Terapkan juga search filter ke chart
      if (this.filterText) {
        const search = this.filterText.toLowerCase();
        data = data.filter((item) =>
          this.columns.some((col) =>
            String(item[col]).toLowerCase().includes(search)
          )
        );
      }

      return data;
    },
    filteredData() {
      return this.chartFilteredData; // Gunakan chartFilteredData agar seragam
    },
    paginatedSortedFilteredData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },
    visibleColumns() {
      return this.columns.filter((column) => this.columnVisibility[column]);
    },
  },
  watch: {
    columnVisibility: {
      handler(newVal) {
        localStorage.setItem("columnVisibility", JSON.stringify(newVal));
      },
      deep: true,
    },
  },
  methods: {
    handleChartFilter({ category, value }) {
      if (this.selectedCategory === category && this.selectedFilter === value) {
        this.selectedFilter = null;
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
        this.selectedFilter = value;
      }
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    updateItemsPerPage(value) {
      this.itemsPerPage = value;
      this.currentPage = 1;
    },
  },
  mounted() {
    fetch("/data/customdashboarddata.json")
      .then((response) => response.json())
      .then((json) => (this.data = json))
      .catch((error) => console.error("Error fetching data:", error));
  },
};
</script>

<style scoped>
.charts-container {
  margin-top: 10px;
  margin-bottom: 10px;
}

.table-container {
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: 2px 2px 10px rgba(var(--text-rgb), 0.3);
  margin: 0 10px 0 10px;
  overflow-x: auto;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px 10px 10px;
}

.button-group-a {
  display: flex;
  gap: 10px;
}

.pagein-controls {
  margin: 10px 0 10px 0;
}

@media (max-width: 600px) {
  .buttons {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .button-group-a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
