<template>
  <transition name="modal">
    <div v-if="event" class="modal-overlay background-blur" @click.self="$emit('close')">
      <div class="modal-content">
        <h2 class="modal-title">General Information</h2>

        <div class="modal-section">
          <p><strong>Title:</strong> {{ event.title }}</p>
        </div>

        <div class="modal-section">
          <p>
            <strong>Date:</strong> {{ formatDate(event.start) }} -
            {{ formatDate(event.end) }} ({{ event.time }})
          </p>
        </div>

        <div class="modal-section">
          <p><strong>Agenda:</strong></p>
          <ol class="agenda-list">
            <li v-for="(agenda, index) in event.agenda" :key="index">{{ agenda }}</li>
          </ol>
        </div>

        <div class="modal-section button-container">
          <button class="download-button" @click="$emit('download')">
            Download Calendar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EventModal",
  props: {
    event: {
      type: Object,
      default: null,
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: #fff;
  padding: 30px 40px; /* Increase padding to make the content inside more spacious */
  border-radius: 8px;
  width: 500px;  /* Set a fixed width */
  max-width: 90%;
  height: 400px;  /* Set a fixed height */
  max-height: 90%;
  text-align: left; /* Ensure text is left-aligned */
  color: black;
}

.modal-title {
  color: #0064A0;
  font-size: 24px;  /* Increase font size for title */
  font-weight: bold;
  margin-bottom: 15px;  /* Increase margin to give space below title */
}

.modal-section {
  margin-bottom: 20px;  /* Increase margin between sections */
  font-size: 16px;  /* Increase font size for the content */
  line-height: 1.6;  /* Increase line height for better readability */
}

.agenda-list {
  padding-left: 20px; /* Add indentation for the agenda list */
  font-size: 16px;  /* Increase font size for the agenda items */
  line-height: 1.6;  /* Increase line height for better readability */
}

.agenda-list li {
  margin-bottom: 10px;  /* Increase spacing between items */
}

.button-container {
  text-align: right; /* Align the button to the right */
}

.download-button {
  padding: 12px 20px;  /* Increase padding to make the button larger */
  background-color: #f0c000;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;  /* Increase font size for the button */
  margin-top: 20px;  /* Add more space between button and content */
}

.download-button:hover {
  background-color: #F09101;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}

.background-blur {
  backdrop-filter: blur(5px); /* Adjust the blur level as needed */
  -webkit-backdrop-filter: blur(5px); /* For Safari */
}
</style>
