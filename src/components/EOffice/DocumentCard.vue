<template>
  <div class="grid-container">
    <!-- Display only the first 4 filtered documents -->
    <div v-for="(doc, index) in limitedDocuments" :key="index" class="card">
      <h3>{{ formatTitle(index) }}</h3>
      <div class="info-container">
        <div v-for="(value, label) in doc" :key="label" class="info">
          <span class="icon" :class="getIconClass(label)">
            {{ getIcon(label) }}
          </span>
          <span class="label">{{ formatLabel(label) }}</span>
          <span class="count">{{ value }}</span>
        </div>
      </div>
    </div>

    <!-- Display exactly 1 signed document spanning 2 columns -->
    <div v-if="signedDocument" class="card signed">
      <h3>{{ formatTitle("signed_document") }}</h3>
      <div class="info-container">
        <div v-for="(value, label) in signedDocument" :key="label" class="info">
          <span class="icon" :class="getIconClass(label)">
            {{ getIcon(label) }}
          </span>
          <span class="label">{{ formatLabel(label) }}</span>
          <span class="count">{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentCard",
  props: {
    documents: Object,
  },
  computed: {
    limitedDocuments() {
      // Extract only the first 4 non-summary and non-signed_document entries
      return Object.fromEntries(
        Object.entries(this.documents)
          .filter(([key]) => key !== "summary" && key !== "signed_document")
          .slice(0, 2)
      );
    },
    signedDocument() {
      // Return only the signed document if available
      return this.documents.signed_document || null;
    },
  },
  methods: {
    formatTitle(key) {
      return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    },
    formatLabel(label) {
      return label
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    },
    getIcon(label) {
      const icons = {
        unprocessed: "⏱︎",
        processed: "⟳",
        unread: "✉︎",
        pending_action: "ⴵ",
        unsigned: "ᝰ.ᐟ",
        not_sent: "➣",
        cancelled: "⨂",
      };
      return icons[label] || "📄";
    },
    getIconClass(label) {
      const statusColors = {
        unprocessed: "yellow-orange",
        processed: "toska",
        unread: "yellow-orange",
        pending_action: "red",
        unsigned: "gray",
        not_sent: "yellow-orange",
        cancelled: "red",
      };
      return statusColors[label] || "default";
    },
  },
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  padding: 20px;
  justify-content: center;
  box-sizing: border-box;
}

/* Signed document spans 2 columns */
.card.signed {
  grid-column: span 2;
}

/* Card Styles */
.card {
  background: var(--bg);
  padding: 16px;
  border-radius: 30px;
  box-shadow: 0 4px 10px rgba(var(--text-rgb), 0.3);
  text-align: center;
  width: 100%;
  max-width: 100%;
  min-width: 300px; /* ✅ Prevent overflow on small screens */
  box-sizing: border-box;
}

/* Card Header */
h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

/* Info Section */
.info-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg);
  padding: 10px;
  border-radius: 20px;
  box-shadow: inset 0 1px 3px rgba(var(--text-rgb), 0.3);
}

/* Icon Styles */
.icon {
  font-size: 20px;
  padding: 6px;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon.yellow-orange {
  background: #f09101; /* Warna kuning-oranye */
  color: white;
}

.icon.toska {
  background: #00a0dc; /* Warna toska */
  color: white;
}

.icon.red {
  background: #ff0000; /* Warna merah */
  color: white;
}

.icon.gray {
  background: #575757; /* Warna abu-abu */
  color: white;
}

/* Label & Count */
.label {
  flex-grow: 1;
  text-align: left;
  font-weight: 500;
  margin-left: 10px;
  position: relative;
}

.label::after {
  content: "";
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  height: 40px;
  width: 2px;
  background-color: #ddd; /* Warna garis */
}

.count {
  font-weight: bold;
  font-size: 16px;
  margin-right: 20px;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr; /* ✅ stack cards */
    gap: 30px;
    padding: 16px;
    margin: 0 auto;
  }

  .card.signed {
    grid-column: span 1; /* ✅ prevent layout break */
  }
}

@media (max-width: 450px) {
  .grid-container {
    display: flex; /* ❌ Breaks grid layout */
    flex-direction: column;
    margin-right: 30px;
    margin-bottom: 20px;
    margin-top: 0;
  }
}
</style>
