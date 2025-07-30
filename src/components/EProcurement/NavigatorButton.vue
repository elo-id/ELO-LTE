<template>
  <div class="button-group">
    <button
      v-for="form in forms"
      :key="form.name"
      class="nav-button"
      :class="{ active: current === form.name }"
      @click="$emit('select-form', form.name)"
    >
      {{ form.name }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'NavigatorButton',
  props: {
    current: String
  },
  data() {
    return {
      forms: [
        { name: 'Annoucement News' },
        { name: 'Tender' }
      ]
    };
  }
};
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 20px 0 0 0;
  flex-wrap: wrap;
}

.nav-button {
  padding: 20px 40px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  display: inline-block;
}

.nav-button:hover {
  background-color: #e0e0e0;
  transform: translateY(-2px);
}

.nav-button.active {
  background-color: #5c6bc0;
  color: white;
  font-weight: 600;
}
</style>
