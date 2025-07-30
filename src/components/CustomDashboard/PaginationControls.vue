<template>
  <div class="pagination">
    <button @click="$emit('prev')" :disabled="currentPage === 1">Previous</button>
    <span>{{ "Page", { current: currentPage, total: totalPages } }}</span>
    <button @click="$emit('next')" :disabled="currentPage === totalPages">Next</button>
    
    <select :value="itemsPerPage" @change="updateItems" class="items-page">
      <option :value="5">5</option>
      <option :value="10">10</option>
      <option :value="20">20</option>
      <option :value="30">30</option>
      <option :value="filteredDataLength">All</option>
    </select>
  </div>
</template>

<script>
export default {
  props: ["currentPage", "totalPages", "itemsPerPage", "filteredDataLength"],
  methods: {
    updateItems(event) {
      const newValue = Number(event.target.value);
      this.$emit("update-items", newValue); // Emit ke parent dengan nilai baru
    },
  },
};
</script>


<style>
.pagination {
  text-align: center;
}

.pagination button {
  padding: 8px 12px;
  border: none;
  background-color: #c1c1c1;
  color: black;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:hover {
  background-color: rgb(158, 158, 158);
}

.pagination span {
  margin: 0 10px;
}

.items-page {
  margin-left: 10px;
  padding: 8px 4px;
  border: none;
  border-radius: 5px;
  background-color: #c1c1c1;
}

.items-page:hover {
  background-color: rgb(158, 158, 158);
}
</style>
