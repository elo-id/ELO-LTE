<template>
  <div class="dashboard">
    <div class="map-content-container">
      <div class="top-left-function">
        <button
          @click="toggleDrawMode"
          :class="drawMode ? 'toggle-button disable' : 'toggle-button enable'"
        >
          {{ drawMode ? "Disable Draw Mode" : "Enable Draw Mode" }}
        </button>
        <div class="search-box">
          <select class="dropdown">
            <option>▲</option>
          </select>
          <input
            type="text"
            placeholder="Cari Berdasarkan Peta"
            class="search-input"
          />
          <button class="search-btn">🔍</button>
        </div>
      </div>

      <LandMap
        :locations="locations"
        :draw-mode="drawMode"
        @asset-clicked="handleAssetClick"
      />

      <AssetInfoModal
        :assets="selectedAssets"
        :visible="showModal"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script>
import LandMap from "@/components/Landmap/LandMap.vue";
import AssetInfoModal from "@/components/Landmap/AssetInfoModal.vue";

export default {
  name: "LandmapV2",
  components: { LandMap, AssetInfoModal },
  data() {
    return {
      locations: [],
      drawMode: JSON.parse(localStorage.getItem("drawMode")) || false,
      selectedAsset: [],
      showModal: true,
    };
  },
  async mounted() {
    await this.loadLocations();
    this.role = localStorage.getItem("role") || "user";
    this.username = localStorage.getItem("username") || "";
  },
  methods: {
    async loadLocations() {
      try {
        const response = await fetch("/data/landdata.json");
        if (!response.ok) throw new Error("Failed to load data");
        const data = await response.json();
        this.locations = data;
        // Set semua lokasi ke selectedAssets supaya modal selalu tampil semua asset
        this.selectedAssets = data;
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    },
    toggleDrawMode() {
      this.drawMode = !this.drawMode;
      localStorage.setItem("drawMode", JSON.stringify(this.drawMode));
      this.$emit("toggle-draw-mode", this.drawMode); // Emit event ke parent (LeafletMap)
    },
    // Jika kamu ingin tetap handle klik, bisa simpan tapi tidak wajib untuk modal selalu tampil semua
    handleAssetClick(assetData) {
      // Kalau modal selalu menampilkan semua, ini bisa diabaikan atau dipakai buat highlight
      console.log("Asset clicked:", assetData);
    },
  },
};
</script>

<style scoped>
.dashboard {
  text-align: center;
  overflow: hidden;
}

.map-content-container {
  position: relative;
  display: block;
  width: 100%;
}

.top-left-function {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-box {
  display: flex;
  border: 1px solid #ccc;
  padding: 2px 4px;
  border-radius: 4px;
  overflow: hidden;
  background-color: white;
}

.dropdown {
  appearance: none;
  background: white;
  border: none;
  padding: 2px 6px;
  font-size: 14px;
  cursor: pointer;
}

.search-input {
  border: none;
  padding: 6px;
  width: 160px;
  font-size: 14px;
}

.search-btn {
  background: white;
  border: none;
  padding: 6px 10px;
  cursor: pointer;
}

.toggle-button {
  width: 160px;
  padding: 9.5px 17px;
  color: black;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}

.toggle-button.enable {
  color: white;
  background-color: #0064a0;
}

.toggle-button.enable:hover {
  color: white;
  background-color: #009dff;
}

.toggle-button.disable {
  color: white;
  background-color: #a82d39;
}

.toggle-button.disable:hover {
  background-color: #ff0019;
}

@media (max-width: 500px) {
  .toggle-button {
    width: 140px;
    padding: 9.5px 10px;
  }

  .search-box {
    padding: 2px 0;
  }
}
</style>
