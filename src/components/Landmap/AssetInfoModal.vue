<template>
  <div v-if="visible" class="modal-box">
    <div class="modal-header">
      <strong>Asset Information ({{ assets.length }})</strong>
      <div class="modal-actions">
        <button @click="toggleExpand" class="action-btn">
          {{ isExpanded ? 'Collapse' : 'Expand' }}
        </button>
        <button @click="$emit('close')" class="action-btn close-btn">✖</button>
      </div>
    </div>

    <div v-show="isExpanded" class="modal-content">
      <template v-if="assets.length">
        <div
          v-for="(asset, index) in assets"
          :key="asset.SiteId || index"
          class="asset-block"
        >
          <div class="modal-row title-row">
            <strong>{{ asset.SiteName || 'Unnamed Site' }}</strong>
          </div>
          <div class="modal-row">
            <strong>Site ID:</strong> <span>{{ asset.SiteId || '-' }}</span>
          </div>
          <div class="modal-row">
            <strong>Region:</strong> <span>{{ asset.Region || '-' }}</span>
          </div>
          <div class="modal-row">
            <strong>Latitude:</strong> <span>{{ asset.Latitude || '-' }}</span>
          </div>
          <div class="modal-row">
            <strong>Longitude:</strong> <span>{{ asset.Longitude || '-' }}</span>
          </div>
          <hr v-if="index < assets.length - 1" />
        </div>
      </template>
      <template v-else>
        <div class="no-data">No assets selected.</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssetInfoModal",
  props: {
    assets: {
      type: Array,
      required: true,
      default: () => [],
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: true,
    };
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<style scoped>
.modal-box {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 400px;
  max-width: 90vw; /* prevent overflow on very small screens */
  background: var(--bg);
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  z-index: 998;
  padding: 12px;
  font-size: 14px;
  max-height: calc(100vh - 126px);
  overflow-y: auto;
}

.modal-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: 1px solid #007bff;
  color: #007bff;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  user-select: none;
  transition: background-color 0.2s ease;
}

.action-btn:hover {
  background-color: #007bff;
  color: white;
}

.close-btn {
  border-color: #dc3545;
  color: #dc3545;
}

.close-btn:hover {
  background-color: #dc3545;
  color: white;
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.asset-block {
  padding: 8px;
  background-color: #eeeeee;
  border-radius: 4px;
}

.title-row {
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 4px;
}

.modal-row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2px;
  color: black;
}

hr {
  margin: 10px 0;
  border: none;
  border-top: 1px solid #ddd;
}

.no-data {
  color: #777;
  font-style: italic;
  text-align: center;
}

@media (max-width: 500px) {
  .modal-box {
    width: 80vw;
    height: 20vh;
    right: 10px;
    top: 10px;
    padding: 10px;
  }
}
</style>
