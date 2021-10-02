<template>
  <div>
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
//TODO import * as d3 from "d3";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-providers";
import "leaflet-gpx";

export default defineComponent({
  name: "Map",
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    //load map
    console.log("Map loading...");
    this.setMap();

    this.setGPX();
  },
  methods: {
    setMap() {
      this.map = L.map("mapContainer").setView([48.15, 17.11], 14);

      //tile layer with overlay
      const zoom = {
        maxZoom: 19,
        minZoom: 12,
      };
      L.tileLayer.provider("Stadia.AlidadeSmooth", zoom).addTo(this.map);
      //L.tileLayer.provider("OpenRailwayMap", zoom).addTo(this.map);
    },
    setGPX() {
      var gpx = //TODO load from input
        "https://dl.dropboxusercontent.com/s/y4t6t05gvm6lhmd/2021-04-17_20-18-09_gps.gpx?dl=1";
      new L.GPX(gpx, {
        async: true,
        marker_options: {
          startIconUrl: "",
          endIconUrl: "",
          shadowUrl: "",
        },
      })
        .on("loaded", function (e) {
          //this.map.fitBounds(e.target.getBounds());
        })
        .addTo(this.map);
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
#mapContainer {
  width: 100vw;
  height: 90vh;
}
</style>

