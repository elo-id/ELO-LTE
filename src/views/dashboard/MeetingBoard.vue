<template>
  <div class="home">
    <div class="tables-container">
      <UpcomingTable :events="upcomingEvents" />
      <PreviousTable :events="previousEvents" />
    </div>
    <div class="calendar">
      <CalendarBoard :events="events" />
    </div>
  </div>
</template>

<script>
import UpcomingTable from "@/components/MeetingBoard/UpcomingTable.vue";
import PreviousTable from "@/components/MeetingBoard/PreviousTable.vue";
import CalendarBoard from "@/components/MeetingBoard/CalendarBoard.vue";

export default {
  components: { UpcomingTable, PreviousTable, CalendarBoard },
  data() {
    return {
      events: [],
      upcomingEvents: [],  // For upcoming events
      previousEvents: [],  // For previous events
    };
  },
  async created() {
    try {
      const baseURL = window.location.origin + "/ix-Contelo/plugin/de.elo.ix.plugin.proxy/wf/apps/app/elo.lte";
      const res = await fetch(`${baseURL}/data/meetingboarddata.json`);
      const data = await res.json();
      console.log("Fetch response status:", res.status);
      this.events = data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));

      // Filter the events based on today’s date
      const today = new Date();

      this.upcomingEvents = this.events.filter(event => event.start > today);
      this.previousEvents = this.events.filter(event => event.start < today);

    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  },
};
</script>

<style scoped>
.tables-container {
  display: flex;
  justify-content: space-between;
  margin: 30px;
  gap: 30px;
}

.tables-container > * {
  flex: 1; /* Make both tables take available space */
}

.tables-container > :first-child {
  flex: 7; /* Upcoming table takes 70% width */
}

.tables-container > :nth-child(2) {
  flex: 3; /* Previous table takes 30% width */
}

.calendar {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px;
}

@media (max-width: 768px) {
  .tables-container {
    flex-direction: column;
    margin: 15px;
    gap: 20px;
  }

  .tables-container > :first-child,
  .tables-container > :nth-child(2) {
    flex: unset; /* Remove custom flex ratios */
    width: 100%; /* Full width on smaller screens */
  }

  .calendar {
    margin: 15px;
    flex-direction: column;
  }
}
</style>
