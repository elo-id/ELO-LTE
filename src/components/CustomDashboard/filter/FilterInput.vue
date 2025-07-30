<template>
  <div class="input-container">
    <h3>Filter Data</h3>
    <input v-model="filterText" placeholder="Type to filter..." />
  </div>
</template>

<script>
export default {
  props: ["value"],
  computed: {
    filterText: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style>
.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
