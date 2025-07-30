<template>
  <div class="table-container">
    <!-- Filter Section -->
    <div class="filter-section">
      <input v-model="filters.projectName" type="text" placeholder="🔍︎ Search" />
      <select v-model="filters.status">
        <option value="">All Statuses</option>
        <option value="Not-Yet-Started">Not-Yet-Started</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <input v-model="filters.minDate" type="date" />
      <input v-model="filters.maxDate" type="date" />
    </div>

    <!-- Table Section -->
    <div class="table-wrapper">
      <table class="document-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Progress</th>
            <th class="action-header">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, index) in filteredProjects" :key="index">
            <td>{{ project.name }}</td>
            <td>{{ project.status }}</td>
            <td>{{ project.startDate }}</td>
            <td>{{ project.endDate }}</td>
            <td>{{ project.percentage }}</td>
            <td>
              <router-link :to="`/dashboard/project-manager/details/${project.name}`" class="action-button">See Details</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableData',
  props: {
    projects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      filters: {
        projectName: '',
        status: '',
        minDate: '',
        maxDate: '',
      },
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => {
        const projectNameMatch = project.name.toLowerCase().includes(this.filters.projectName.toLowerCase());
        const statusMatch = this.filters.status ? project.status === this.filters.status : true;

        const parseDate = (str) => {
          const [day, month, year] = str.split(' ');
          const months = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
            Jul: 6, Agu: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11
          };
          return new Date(year, months[month], day);
        };

        const projectStart = parseDate(project.startDate);
        const min = this.filters.minDate ? new Date(this.filters.minDate) : null;
        const max = this.filters.maxDate ? new Date(this.filters.maxDate) : null;

        const minMatch = min ? projectStart >= min : true;
        const maxMatch = max ? projectStart <= max : true;

        return projectNameMatch && statusMatch && minMatch && maxMatch;
      });
    },
  },
};
</script>

<style scoped>
.filter-section {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.filter-section input,
.filter-section select {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.table-container {
  background: var(--bg);
  padding: 20px;
  border-radius: 8px;
}

.table-wrapper {
  max-width: 100%;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.document-table {
  width: 100%;
  border-collapse: collapse;
}

.document-table thead {
  background: #1c4471;
  position: sticky;
  top: 0;
  z-index: 10;
}

.document-table th,
.document-table td {
  padding: 10px;
  text-align: center; /* Center text horizontally */
  vertical-align: middle; /* Center content vertically */
  border: 1px solid #e5e5e5;
  white-space: nowrap;
}

.document-table td .action-button {
  display: inline-block; /* Ensures the button doesn't stretch */
  vertical-align: middle;
  margin: auto;
}

.document-table thead th {
  color: #f0f0f0;
  font-weight: bold;
}

.action-button {
  padding: 6px 12px;
  font-size: 0.875rem;
  color: white;
  border: 1px solid #1c4471;
  border-radius: 20px;
  background: #1c4471;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
}

.action-button:hover {
  background-color: #e6f0ff;
  color: black;
}
</style>
