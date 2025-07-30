<template>
  <div>
    <div class="table-label">Upcoming Board Meeting</div>
    <div class="event-table">
      <!-- Wrap the table in a container for scroll -->
      <div class="event-table__container">
        <table class="event-table__table">
          <thead>
            <tr class="event-table__header">
              <th class="event-table__cell">Meeting Title</th>
              <th class="event-table__cell">Start Date</th>
              <th class="event-table__cell">Actions</th>
              <!-- Action Column -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in events" :key="event.id">
              <td class="event-table__cell event-table__title">
                {{ event.title }}
              </td>
              <!-- Left-aligned Title -->
              <td class="event-table__cell">{{ formatDate(event.start) }}</td>
              <td class="event-table__cell">
                <button @click="openModal(event)" class="event-table__button">
                  View Details
                </button>
                <!-- Action Button -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- EventModal Component for Displaying Event Details -->
      <EventModal
        v-if="isModalVisible"
        :event="selectedEvent"
        @close="closeModal"
        @download="downloadCalendar"
      />
    </div>
  </div>
</template>

<script>
import EventModal from "@/components/MeetingBoard/EventModal.vue"; // Import the modal component

export default {
  components: { EventModal },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedEvent: null, // To store the selected event data for modal
      isModalVisible: false, // To control modal visibility
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    openModal(event) {
      this.selectedEvent = event; // Set the selected event
      this.isModalVisible = true; // Show the modal
    },
    closeModal() {
      this.isModalVisible = false; // Hide the modal
      this.selectedEvent = null; // Reset the selected event
    },
    downloadCalendar() {
      console.log("Download calendar functionality triggered"); // Handle download action here
    },
  },
};
</script>

<style scoped>
.table-label {
  width: 200px;
  height: 30px;
  background-color: #0064a0;
  border: 1px solid #ddd;
  color: white;
  font-weight: bold;
  padding: 6px;
  display: flex; /* Use flexbox for centering */
  justify-content: center; /* Horizontally center the content */
  align-items: center; /* Vertically center the content */
}

.event-table {
  border: 1px solid #ddd;
  background-color: var(--bg);
}

.event-table__container {
  max-height: 200px; /* Set your desired height */
  overflow-y: auto; /* Enable vertical scroll */
}

.event-table__table {
  width: 100%;
  border-collapse: collapse;
}

.event-table__header {
  color: white;
  background-color: #0064a0;
  position: sticky; /* Makes the header stick */
  top: 0; /* Sticks it to the top of the container */
  z-index: 1; /* Ensures the header stays on top of the table content */
}

.event-table__cell {
  padding: 10px;
  /* Removed border properties to eliminate the grid */
}

.event-table__title {
  text-align: left;
}

.event-table__button {
  background: #0064a0;
  border: 1px solid #000;
  border-radius: 8px;
  color: white;
  padding: 8px;
  cursor: pointer;
  font-size: 12px;
}

.event-table__button:hover {
  text-decoration: underline;
}

/* Modal Styles (for EventModal.vue) */
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
  padding: 20px 30px;
  border-radius: 8px;
  width: 300px;
  max-width: 90%;
  text-align: left;
}

.modal-title {
  color: #0064a0;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.modal-section {
  margin-bottom: 15px;
}

.agenda-list {
  padding-left: 20px;
}

.agenda-list li {
  margin-bottom: 5px;
}

.button-container {
  text-align: right;
}

.download-button {
  padding: 8px 12px;
  background-color: #f0c000;
  color: black;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

.download-button:hover {
  background-color: #f09101;
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
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
</style>
