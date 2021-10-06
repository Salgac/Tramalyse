<template>
  <div id="mapContainer">
    <div id="map">
      <GpxInfo :gpxLayers="gpxLayers" :gpx="gpx" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import GpxInfo from "@/components/GpxInfo.vue";

//TODO import * as d3 from "d3";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-providers";
import "leaflet-gpx";

export default defineComponent({
  name: "Map",
  props: ["gpx"],
  watch: {
    gpx: {
      immediate: true,
      deep: true,
      handler(val) {
        //handle file change
        if (Object.keys(val).length !== 0) {
          this.setGPX(val.at(-1).content, val.at(-1).color);
        }
      },
    },
  },
  data() {
    return {
      map: null,
      gpxLayers: [],
    };
  },
  mounted() {
    //load map
    this.setMap();
  },
  methods: {
    setMap() {
      this.map = L.map("map").setView([48.15, 17.11], 14);

      //tile layer with overlay
      const zoom = {
        maxZoom: 20,
        minZoom: 12,
      };
      L.tileLayer.provider("Stadia.AlidadeSmooth", zoom).addTo(this.map);
      //L.tileLayer.provider("OpenRailwayMap", zoom).addTo(this.map);
    },
    setGPX(gpxContent, color) {
      //generate new GPX layer
      var newGpx = new L.GPX(gpxContent, {
        async: true,
        marker_options: {
          startIconUrl: "",
          endIconUrl: "",
          shadowUrl: "",
        },
        polyline_options: {
          color: color,
        },
      });

      var layers = this.gpxLayers;
      var map = this.map;

      newGpx.on("loaded", function (e) {
        map.fitBounds(this.getBounds());

        //add popup with info after click
        var gpx = e.target,
          dst = gpx.get_distance().toFixed(2),
          eleGain = gpx.get_elevation_gain().toFixed(0),
          eleLoss = gpx.get_elevation_loss().toFixed(0);
        var info =
          "Name: " +
          gpx.get_name() +
          "</br>" +
          "Distance: " +
          dst +
          " m </br>" +
          "Elevation gain: " +
          (eleGain - eleLoss) +
          " m </br>";
        gpx.getLayers()[0].bindPopup(info);

        //add into layer array for props
        layers.push(this);
      });

      //add weight change on hover
      newGpx.on("mouseover", function () {
        this.setStyle({
          weight: 4,
        });
      });
      newGpx.on("mouseout", function () {
        this.setStyle({
          weight: 3,
        });
      });

      newGpx.addTo(this.map);
    },
  },
  components: {
    GpxInfo,
  },
});
</script>

<style scoped lang="scss">
#mapContainer {
  margin-top: 25px;
  margin-bottom: 25px;
  width: 100%;
  height: 90vh;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
}
</style>

