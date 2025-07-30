<template>
  <div v-if="project?.weekly_progress?.length" class="table-container">
    <div class="table-wrapper">
      <table class="document-table">
        <thead>
          <tr>
            <th></th>
            <th v-for="(week, index) in project.weekly_progress" :key="index">
              {{ week.week }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Plan</strong></td>
            <td v-for="(week, index) in project.weekly_progress" :key="'plan' + index">
              {{ week.plan }}
            </td>
          </tr>
          <tr>
            <td><strong>Actual</strong></td>
            <td v-for="(week, index) in project.weekly_progress" :key="'actual' + index">
              {{ week.actual }}
            </td>
          </tr>
          <tr>
            <td><strong>Summary</strong></td>
            <td v-for="(week, index) in project.weekly_progress" :key="'summary' + index">
              {{ week.summary }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div v-else style="padding: 20px;">No weekly progress data available.</div>
</template>

<script>
export default {
  name: "ProgressTable",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.table-container {
  background: var(--bg);
  padding: 20px;
  border-radius: 8px;
}

.table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.document-table {
  width: 100%;
  border-collapse: collapse;
}

.document-table thead {
  background: #f7f7f7;
  position: sticky;
  top: 0;
  z-index: 10;
}

.document-table th,
.document-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #e5e5e5;
  white-space: nowrap;
}

.document-table thead th {
  color: #1c4471;
  font-weight: bold;
}
</style>
