<template>
  <div id="dashboard">
    <div class="content">
      <!-- <template v-if="loading">
        <div style="padding: 20px; text-align: center">
          <p>Loading Dashboard...</p>
          <img
            :src="loadingGif"
            alt="Loading..."
            style="margin-top: 10px; width: 500px; height: 500px"
          />
        </div>
      </template> -->

      <!-- <template v-else> -->
        <div class="chartscontainer">
          <ChartContainer v-if="chartData" :data="chartData" />
        </div>

        <div class="separator-line"></div>

        <TableData v-if="chartData?.projects" :projects="chartData.projects" />

        <div class="separator-line"></div>
      <!-- </template> -->
    </div>
  </div>
</template>

<script>
import ChartContainer from "@/components/ProjectManager/dashboard/ChartContainer.vue";
import TableData from "@/components/ProjectManager/dashboard/TableData.vue";
import loadingGif from "@/assets/loading-animation.gif";

export default {
  components: { ChartContainer, TableData },
  data() {
    return {
      chartData: null,
      loading: true,
      loadingGif,
    };
  },
  async created() {
    try {
      const baseURL = window.location.origin + "/ix-Contelo/plugin/de.elo.ix.plugin.proxy/wf/apps/app/elo.lte";
      const response = await fetch(`${baseURL}/data/projectmanagerdata.json`);
      const data = await response.json();
      this.chartData = data;

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error loading data.json:", error);
    } finally {
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.chartscontainer {
  margin-bottom: 20px;
}

.separator-line {
  height: 1px;
  background-color: var(--text);
  margin: 0px 20px;
  border-radius: 10px;
}
</style>
