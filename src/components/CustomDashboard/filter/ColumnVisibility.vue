<template>
  <div class="dropdown">
    <button class="button-visibility" @click="toggleDropdown">
      Column Visibility ▼
    </button>
    <div v-if="showDropdown" class="dropdown-menu">
      <label v-for="column in columns" :key="column" class="dropdown-item">
        <input
          type="checkbox"
          :checked="selected[column]"
          @change="toggleColumn(column)"
        />
        {{ column }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columns: Array,
    value: Object, // Gunakan v-model untuk sinkronisasi dengan parent
  },
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    selected() {
      return this.value; // `value` adalah `columnVisibility` dari parent
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    toggleColumn(column) {
      const updatedVisibility = {
        ...this.selected,
        [column]: !this.selected[column],
      };

      // Prevent all columns from being unchecked
      const anyColumnVisible = Object.values(updatedVisibility).some((v) => v);

      if (!anyColumnVisible) {
        // Optional: show a warning or toast here
        return;
      }

      this.$emit("input", updatedVisibility);
    },
    closeDropdown(event) {
      if (!this.$el.contains(event.target)) {
        this.showDropdown = false;
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.button-visibility {
  margin-right: 10px;
  padding: 8px 12px;
  border: none;
  background-color: #c1c1c1;
  cursor: pointer;
  border-radius: 5px;
}

.button-visibility:hover {
  background-color: rgb(158, 158, 158);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px;
  min-width: 150px;
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  cursor: pointer;
}
</style>
