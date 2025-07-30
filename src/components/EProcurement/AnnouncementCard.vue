<template>
  <div class="announcement-card">
    <div class="announcement-header">{{ title }}</div>
    <div class="filters">
      <select v-model="filterRegion">
        <option value="">--- Semua Wilayah ---</option>
        <option v-for="region in uniqueRegions" :key="region">{{ region }}</option>
      </select>

      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />

      <div class="filter-buttons">
        <button @click="applyFilter">🔍</button>
        <button @click="resetFilter">⟳</button>
      </div>
    </div>

    <div class="list-card">
      <div class="list-header">📋 List {{ title }}</div>

      <div class="list-body">
        <table v-if="filteredData.length > 0">
          <thead>
            <tr>
              <th>#</th>
              <th>Tanggal</th>
              <th>Judul</th>
              <th>Unit</th>
              <th>UPT</th>
              <th>Kategori</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in paginatedData" :key="item.id">
              <td>{{ index + 1 + (currentPage - 1) * itemsPerPage }}</td>
              <td>{{ formatDate(item.datetime) }}</td>
              <td><router-link :to="`/announcement/${item.id}`">{{ item.title }}</router-link></td>
              <td>{{ item.unit }}</td>
              <td>{{ item.upt }}</td>
              <td>{{ item.category }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else class="no-data">Menampilkan 0 dari 0 entri</div>
      </div>

      <div class="list-footer">
        <button :disabled="currentPage === 1" @click="currentPage--">Previous</button>
        <button :disabled="!hasNextPage" @click="currentPage++">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'type', 'data'],
  data() {
    return {
      filterRegion: '',
      startDate: '',
      endDate: '',
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    filteredAnnouncements() {
      return this.data.filter(item => item.type === this.type);
    },
    uniqueRegions() {
      const regions = this.filteredAnnouncements.map(a => a.region);
      return [...new Set(regions)];
    },
    filteredData() {
      return this.filteredAnnouncements.filter(item => {
        const inRegion = !this.filterRegion || item.region === this.filterRegion;
        const inDate = (!this.startDate || new Date(item.datetime) >= new Date(this.startDate)) &&
                       (!this.endDate || new Date(item.datetime) <= new Date(this.endDate));
        return inRegion && inDate;
      });
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredData.slice(start, start + this.itemsPerPage);
    },
    hasNextPage() {
      return this.currentPage * this.itemsPerPage < this.filteredData.length;
    }
  },
  methods: {
    formatDate(datetime) {
      const d = new Date(datetime);
      return d.toLocaleDateString('id-ID');
    },
    applyFilter() {
      this.currentPage = 1;
    },
    resetFilter() {
      this.filterRegion = '';
      this.startDate = '';
      this.endDate = '';
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
.announcement-card {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1.5rem;
  background-color: #f9f9f9;
  color: black;
}

.announcement-header {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.filters select,
.filters input[type="date"] {
  padding: 0.4rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1 1 150px;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-buttons button {
  padding: 0.45rem 0.7rem;
  font-size: 1rem;
  cursor: pointer;
}

.list-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  overflow: hidden;
}

.list-header {
  background: #eee;
  padding: 0.8rem 1rem;
  font-weight: bold;
  font-size: 1.05rem;
}

.list-body {
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.no-data {
  text-align: center;
  color: #888;
  padding: 1rem;
  font-style: italic;
}

.list-footer {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: #f3f3f3;
}

.list-footer button {
  padding: 0.4rem 0.8rem;
  font-size: 0.85rem;
  cursor: pointer;
}

.list-footer button[disabled] {
  background: #ddd;
  cursor: not-allowed;
}
</style>
