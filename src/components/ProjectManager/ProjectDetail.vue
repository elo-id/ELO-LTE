<template>
  <div class="content">
    <div class="back-button-container">
      <router-link to="/dashboard/project-manager" class="title"
        ><img
          src="@/assets/back-button.png"
          alt="Back"
          width="60px"
          height="60px"
          class="back-button"
        />
        Back</router-link
      >
    </div>

    <div class="project-details">
      <div v-if="loading" style="padding: 20px">Loading Data...</div>

      <div v-else-if="project" id="details">
        <MainCard :data="project" />
      </div>

      <div v-else>
        <p style="padding: 20px">Project not found.</p>
      </div>
    </div>

    <div class="chart" v-if="!loading && project">
      <ChartContainer :project="project" />
      <div class="separator-line"></div>
      <ProgressTable :project="project" />
    </div>

    <div
      class="table-container"
      v-if="!loading && project && project.weekly_progress"
    >
      <div v-for="(week, index) in project.weekly_progress" :key="index">
        <button @click="toggleWeek(index)" class="toggle-btn">
          Week {{ index + 1 }}
          <span
            :class="showTables[index] ? 'arrow-down' : 'arrow-right'"
          ></span>
        </button>
        <WeeklyTaskTable
          v-if="showTables[index]"
          :tasks="project.tasks"
          :weekId="week.week"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MainCard from "@/components/ProjectManager/detail/MainCard.vue";
import ChartContainer from "@/components/ProjectManager/detail/ChartContainer.vue";
import ProgressTable from "@/components/ProjectManager/detail/ProgressTable.vue";
import WeeklyTaskTable from "@/components/ProjectManager/detail/WeeklyTaskTable.vue";

export default {
  components: { MainCard, ChartContainer, ProgressTable, WeeklyTaskTable },
  data() {
    return {
      project: null,
      showTables: [],
      loading: true, // new loading flag
    };
  },
  methods: {
    toggleWeek(index) {
      this.$set(this.showTables, index, !this.showTables[index]);
    },
    initializeToggles() {
      if (this.project && this.project.weekly_progress) {
        this.showTables = this.project.weekly_progress.map(() => false);
      }
    },
  },
  async created() {
    const nameParam = this.$route.params.name;

    try {
      const response = await fetch("/data/projectmanagerV2data.json");
      const data = await response.json();

      this.project = data.projects.find((p) => p.name === nameParam);
      this.initializeToggles();
    } catch (error) {
      console.error("Error loading data.json:", error);
    } finally {
      this.loading = false; // stop loading regardless of outcome
    }
  },
};
</script>

<style scoped>
#details {
  padding: 0 20px 0 20px;
}

.back-button-container {
  padding: 20px 0 0 20px;
  text-align: left;
}

.back-button-container .title {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
  color: var(--sidebar-active);
  transition: color 0.2s ease;
}

.back-button-container .title:hover {
  color: #003559;
}

.back-button {
  width: 36px;
  height: 36px;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.dark .back-button {
  background-color: white;
  border-radius: 100px;
}

.back-button-container .title:hover .back-button {
  transform: scale(1.1);
}

.separator-line {
  height: 10px;
  background-color: #1c4471;
  margin: 20px 0;
  border-radius: 10px;
  margin: 10px 20px;
}

.table-container {
  padding: 10px 20px;
}

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
  justify-content: space-between;
  color: black;
  border-radius: 10px;
  margin: 10px 0;
}

.arrow-right::before {
  content: "▷";
}

.arrow-down::before {
  content: "▽";
}
</style>
