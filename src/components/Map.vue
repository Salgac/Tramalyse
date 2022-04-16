<template>
  <div id="mapContainer">
    <div class="map" :id="mId">
      <GpxInfo v-if="info" />
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
import "leaflet-hotline";

export default defineComponent({
  name: "Map",
  props: ["gpx", "info", "mId", "section", "marker"],
  watch: {
    gpx: {
      immediate: true,
      deep: true,
      handler(val) {
        //handle file change
        if (val != null && Object.keys(val).length !== 0) {
          this.setGPX(val.at(-1), val.at(-1).color);
          this.setHeatmap(val.at(-1));
        }
      },
    },
    marker: {
      handler() {
        this.setDot();
      },
    },
  },
  data() {
    return {
      map: null,
      layerControl: null,
      mapLayers: [],
      circleMarker: null,
    };
  },
  mounted() {
    //load map
    this.setMap();
    if (this.section != null) {
      this.setSection();
    }
  },
  methods: {
    setMap() {
      //tile layers setup
      const zoom = {
        maxZoom: 20,
        minZoom: 12,
      };

      let grayscale = L.tileLayer.provider("Stadia.AlidadeSmooth", zoom),
        normal = L.tileLayer.provider("OpenStreetMap.Mapnik", zoom),
        satellite = L.tileLayer.provider("Esri.WorldImagery", zoom);

      var baseMaps = {
        Grayscale: grayscale,
        Streets: normal,
        Satellite: satellite,
      };

      //add layers into map
      this.map = L.map(this.mId, { layers: [grayscale], zoomControl: false });
      this.map.setView([48.15, 17.11], 14);

      //layer and zoom control
      this.layerControl = L.control.layers(baseMaps).addTo(this.map);
      L.control.zoom({ position: "topright" }).addTo(this.map);
    },
    setGPX(gpx, color) {
      //generate new GPX layer
      var newGpx = new L.GPX(gpx.content, {
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

      //add layer into map
      newGpx.addTo(this.map);
      this.layerControl.addOverlay(newGpx, gpx.file.name);

      //temp vars
      var that;
      that = this;

      newGpx.on("loaded", function (e) {
        that.map.fitBounds(this.getBounds());

        var gpx = e.target,
          dst = gpx.get_distance().toFixed(2),
          eleGain = gpx.get_elevation_gain().toFixed(0),
          eleLoss = gpx.get_elevation_loss().toFixed(0);

        //add popup with info after click
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

        //add into layer
        gpx.mapLayer = this;
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
    },
    setHeatmap(gpx) {
      // prepare data into a separate array
      var data = [];
      var haccMin = Infinity,
        haccMax = 0;
      gpx.trackPoints.forEach((point) => {
        var hacc = point.hacc * 10000; // accuracy in cm
        haccMin = hacc < haccMin ? hacc : haccMin;
        haccMax = hacc > haccMax ? hacc : haccMax;
        data.push([point.lat, point.lon, hacc]);
      });

      //create layer
      var hotline = L.hotline(data, {
        min: haccMin,
        max: haccMax,
        palette: {
          0.0: "#008800",
          0.5: "#ffff00",
          1.0: "#ff0000",
        },
        weight: 8,
        outlineWidth: 0,
      });

      // add into layer control for toggle
      this.layerControl.addOverlay(hotline, gpx.file.name + " acc.");
    },
    setSection() {
      // prepare data into a separate array
      var points = [];
      this.section.points.forEach((point) => {
        points.push([point.lat, point.lon]);
      });

      // plot into map
      var line = L.polyline(points);
      this.map.fitBounds(line.getBounds());
      line.addTo(this.map);

      //plot points
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      });
      L.marker(points.at(0), {
        title: this.section.start,
        alt: this.section.start,
      }).addTo(this.map);
      L.marker(points.at(-1), {
        title: this.section.end,
        alt: this.section.end,
      }).addTo(this.map);
    },
    setDot() {
      var point = this.marker;
      if (point !== null && point != undefined) {
        if (this.circleMarker == null) {
          this.circleMarker = L.circleMarker([point.lat, point.lon], {
            radius: 5,
            fillOpacity: 0.7,
            color: "#FF0000",
          }).addTo(this.map);
        } else {
          this.circleMarker.setLatLng(new L.LatLng(point.lat, point.lon));
        }
      } else {
        if (this.circleMarker !== null) {
          this.map.removeLayer(this.circleMarker);
          this.circleMarker = null;
        }
      }
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
  text-align: left !important;
}

.map {
  width: 100%;
  height: 100%;
}
</style>

