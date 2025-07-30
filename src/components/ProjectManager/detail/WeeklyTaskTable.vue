<template>
  <div>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="🔍︎ Search tasks..."
      class="search-input"
    />

    <div v-if="filteredTasks.length" class="table-wrapper">
      <table class="document-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Stage</th>
            <th>Due Date</th>
            <th>Main PIC</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in filteredTasks" :key="index">
            <td>{{ task.taskName }}</td>
            <td>{{ task.projectStage }}</td>
            <td>{{ task.dueDate }}</td>
            <td>{{ task.mainPIC }}</td>
            <td>{{ task.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else style="padding: 10px;">No tasks available for this week.</div>
  </div>
</template>

<script>
export default {
  name: "TableData",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    weekId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchTerm: "",
    };
  },
  computed: {
    weekTasks() {
      return this.tasks.filter((task) => task.weekId === this.weekId);
    },
    filteredTasks() {
      if (!this.searchTerm.trim()) return this.weekTasks;

      const term = this.searchTerm.toLowerCase();
      return this.weekTasks.filter((task) =>
        Object.values(task).some((value) =>
          String(value).toLowerCase().includes(term)
        )
      );
    },
  },
};
</script>

<style scoped>
.search-input {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  margin-bottom: 2px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 10px;
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

.document-table thead th {
  color: #f0f0f0;
  font-weight: bold;
}
</style>
