<template>
  <div id="mapContainer">
    <div id="map">
      <GpxInfo :gpxLayers="gpxLayers" />
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
  props: ["gpxFile"],
  watch: {
    gpxFile: {
      immediate: true,
      handler(val) {
        //handle file change
        if (val != null) {
          var fr = new FileReader();
          var setGPX = this.setGPX;

          fr.onload = function () {
            setGPX(fr.result);
          };
          fr.readAsText(val);
        }
      },
    },
  },
  data() {
    return {
      map: null,
      gpxLayers: [],
      colorOffset: 0,
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
        maxZoom: 19,
        minZoom: 12,
      };
      L.tileLayer.provider("Stadia.AlidadeSmooth", zoom).addTo(this.map);
      //L.tileLayer.provider("OpenRailwayMap", zoom).addTo(this.map);
    },
    setGPX(gpxContent) {
      //generate new GPX layer
      var newGpx = new L.GPX(gpxContent, {
        async: true,
        marker_options: {
          startIconUrl: "",
          endIconUrl: "",
          shadowUrl: "",
        },
        polyline_options: {
          color: this.generateUniqueColor(),
        },
      });

      //add popup with info after click
      newGpx.on("loaded", function (e) {
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
      this.gpxLayers.push(newGpx);
    },
    generateUniqueColor() {
      var h = 35 + this.colorOffset,
        s = 100,
        l = 50;
      this.colorOffset += 65;
      this.colorOffset %= 360;

      //convet to hex
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, "0"); // convert to Hex and prefix "0" if needed
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    },
  },
  components: {
    GpxInfo,
  },
});
</script>

<style scoped lang="scss">
#mapContainer {
  margin: 25px;
  width: 98%;
  height: 90vh;
  position: relative;
}

#map {
  width: 100%;
  height: 100%;
}
</style>

