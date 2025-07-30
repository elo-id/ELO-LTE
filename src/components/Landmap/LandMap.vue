<template>
  <div class="mc-container">
    <!-- Map fills remaining space -->
    <div id="map" class="map-container"></div>

    <!-- Draw Coordinates Modal -->
    <div v-if="drawMode && showDrawModal" class="draw-modal-overlay">
      <div class="draw-modal-content">
        <button class="close-button" @click="showDrawModal = false">×</button>
        <h3>Drawn Coordinates:</h3>
        <div class="coorndiates-wrapper">
          <div
            v-for="(coords, index) in reversedDrawnCoordinates"
            :key="index"
            class="coordinate-block"
          >
            <div class="coordinate-item">
              {{ coords }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
import AssetInfoModal from "@/components/Landmap/AssetInfoModal.vue";

export default {
  name: "LeafletMap",
  components: { AssetInfoModal },
  props: {
    locations: {
      type: Array,
      required: true,
    },
    drawMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      map: null,
      drawControl: null,
      drawnItems: null,
      drawnCoordinates: JSON.parse(
        localStorage.getItem("drawnCoordinates")
      ) || ["No Coordinates Drawn"],
      filteredLocations: [],
      selectedCity: "",
      showDrawModal: false,
    };
  },
  watch: {
    locations: {
      immediate: true,
      handler(newVal) {
        this.filteredLocations = [...newVal];
        if (this.map) this.renderPolygons();
      },
    },
    drawMode(newVal) {
      this.handleDrawMode(newVal);
    },
  },
  async mounted() {
    this.initMap();
    if (this.drawMode) {
      this.addDrawControl();
    }
    this.restoreDrawings();
  },
  computed: {
    uniqueCities() {
      return [...new Set(this.locations.map((loc) => loc.Region))];
    },
    reversedDrawnCoordinates() {
      return [...this.drawnCoordinates].reverse();
    },
  },
  methods: {
    initMap() {
      this.map = L.map("map", {
        zoomControl: false,
      }).setView([-6.1645, 106.8276], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 22,
      }).addTo(this.map);

      L.control.zoom({ position: "topleft" }).addTo(this.map);

      this.drawnItems = new L.FeatureGroup();
      this.map.addLayer(this.drawnItems);
    },

    renderPolygons() {
      this.drawnItems.clearLayers();

      this.filteredLocations.forEach((location) => {
        const color = location.Region === this.selectedCity ? "red" : "blue";
        const polygon = L.polygon(location.Coordinate, {
          color,
          weight: 2,
        }).addTo(this.drawnItems);
        polygon.bindPopup(`<b>${location.SiteId}</b><br>${location.SiteName}`);
      });
    },

    filterLocations() {
      console.log("Selected City:", this.selectedCity);
      console.log(
        "Available Cities:",
        this.locations.map((loc) => loc.Region)
      );
      this.filteredLocations = this.selectedCity
        ? this.locations.filter((loc) => loc.Region === this.selectedCity)
        : [...this.locations];
      console.log("Filtered Locations:", this.filteredLocations);
      this.renderPolygons();
    },

    goToLocation(longitude, latitude) {
      if (this.map) {
        this.map.setView([parseFloat(longitude), parseFloat(latitude)], 15, {
          animate: true,
        });
      }
    },

    handleDrawMode(newDrawMode) {
      this.drawMode = newDrawMode;
      localStorage.setItem("drawMode", JSON.stringify(this.drawMode));
      if (this.drawMode) {
        this.addDrawControl();
      } else {
        if (this.drawControl) {
          this.map.removeControl(this.drawControl);
        }
        this.clearDrawings();
        localStorage.removeItem("drawnCoordinates");
      }
    },

    addDrawControl() {
      if (this.drawControl) {
        this.map.removeControl(this.drawControl);
      }

      this.drawControl = new L.Control.Draw({
        edit: {
          featureGroup: this.drawnItems,
          remove: true,
        },
        draw: {
          polygon: {
            allowIntersection: false,
            showArea: true,
            shapeOptions: { color: "#007bff" },
          },
          polyline: true,
          rectangle: true,
          circle: true,
          marker: true,
        },
      });

      this.map.addControl(this.drawControl);

      this.map.off(L.Draw.Event.CREATED);

      this.map.on(L.Draw.Event.CREATED, (e) => {
        const layer = e.layer;
        this.drawnItems.addLayer(layer);
        this.saveCoordinates(layer);
      });
    },

    saveCoordinates(layer) {
      if (
        this.drawnCoordinates.length === 1 &&
        this.drawnCoordinates[0] === "No Coordinates Drawn"
      ) {
        this.drawnCoordinates = [];
      }

      let coordinates = [];
      if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
        const latLngs = layer.getLatLngs();
        const formattedCoords = Array.isArray(latLngs[0])
          ? latLngs[0]
              .map((latlng) => `[${latlng.lat}, ${latlng.lng}]`)
              .join(", ")
          : latLngs
              .map((latlng) => `[${latlng.lat}, ${latlng.lng}]`)
              .join(", ");
        coordinates = `"Coordinate": [${formattedCoords}]`;
      } else if (layer instanceof L.Marker) {
        const latlng = layer.getLatLng();
        coordinates = `"Center": [${latlng.lat}, ${latlng.lng}]`;
      } else if (layer instanceof L.Circle) {
        coordinates = {
          center: [layer.getLatLng().lat, layer.getLatLng().lng],
          radius: layer.getRadius(),
        };
      } else if (layer instanceof L.Rectangle) {
        coordinates = layer
          .getLatLngs()[0]
          .map((latlng) => [latlng.lat, latlng.lng]);
      }

      this.drawnCoordinates.push(coordinates);
      localStorage.setItem(
        "drawnCoordinates",
        JSON.stringify(this.drawnCoordinates)
      );
      this.showDrawModal = true;
    },

    clearDrawings() {
      this.drawnItems.eachLayer((layer) => {
        if (!layer.options.color || layer.options.color === "#007bff") {
          this.drawnItems.removeLayer(layer);
        }
      });
      this.drawnCoordinates = [];
      localStorage.removeItem("drawCoordinates");
    },

    restoreDrawings() {
      if (!this.drawMode) return;

      const savedCoordinates = JSON.parse(
        localStorage.getItem("drawnCoordinates")
      );
      if (savedCoordinates && savedCoordinates.length > 0) {
        this.drawnCoordinates = savedCoordinates;

        savedCoordinates.forEach((coords) => {
          let layer;
          try {
            coords = JSON.parse(`{${coords}}`);
          } catch (e) {
            console.warn("Invalid coordinate format:", coords);
            return;
          }
          // You can expand here for reconstructing polygons/markers/etc if needed
        });
      }
    },
  },
};
</script>

<style>
body,
html,
#app {
  height: 100%;
  margin: 0;
}

.mc-container {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.map-container {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  flex-grow: 1;
  height: calc(100vh - 68px);
}

.draw-modal-overlay {
  position: fixed;
  top: 80px;
  right: 10px;
  z-index: 999;
  background: rgb(252, 218, 85);
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-width: 400px;
  max-height: 604px;
  overflow-y: auto;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.25);
}

.draw-modal-content h3 {
  margin: 0 0 10px 0;
  color: black;
}

.close-button {
  background: none;
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 4px;
  font-size: 16px;
  float: right;
  cursor: pointer;
}

.close-button:hover {
  background: #dc3545;
  color: white;
  border: 1px solid #dc3545;
  border-radius: 4px;
  font-size: 16px;
  float: right;
  cursor: pointer;
}

.toggle-coords-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 99;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.coordinates-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.coordinate-block {
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 8px;
}

.coordinate-item {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2px;
  color: black;
}

@media (max-width: 500px) {
  .draw-modal-overlay {
    top: 290px;
    max-width: 325px;
    max-height: 200px;
  }
}
</style>
