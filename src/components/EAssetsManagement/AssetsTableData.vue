<template>
  <div>
    <div class="table-wrapper">
      <table class="document-table">
        <thead>
          <tr>
            <th>Asset Tag</th>
            <th>Asset Name</th>
            <th>Model Name</th>
            <th>Location Name</th>
            <th>Warranty</th>
            <th>Purchase Date</th>
            <th>Supplier Name</th>
            <th>Purchase Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(log, i) in assets"
            :key="i"
            @click="$emit('select-asset', log.coordinate)"
            style="cursor: pointer"
          >
            <td>{{ log.assetTag }}</td>
            <td>{{ log.assetName }}</td>
            <td>{{ log.modelName }}</td>
            <td>{{ log.locationName }}</td>
            <td>{{ log.warranty }}</td>
            <td>{{ log.purchaseDate }}</td>
            <td>{{ log.supplierName }}</td>
            <td>{{ log.purchaseCost }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    assets: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.table-title {
  color: #fff;
  margin: 0;
}

.table-wrapper {
  width: 100%;
  max-width: 100vw;
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin: 0 auto;
}

.document-table {
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
  table-layout: auto;
}

.document-table thead {
  position: sticky;
  top: 0;
  background: #0064a0;
  z-index: 10;
}

.document-table th,
.document-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #e5e5e5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
}

.document-table thead th {
  color: #fff;
  font-weight: bold;
}

@media (max-width: 450px) {
  .table-actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>