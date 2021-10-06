<template>
  <div
    id="sidebar"
    v-on:click="toggleSidebar()"
    :style="{ width: contentWidth + 'px' }"
  >
    <ul v-if="currentLayers.length != 0">
      <li class="layer" v-for="layer in gpx" v-bind:key="layer">
        <h1 :style="'color: ' + layer.color">
          {{ layer.file.name }}
        </h1>
        <ul>
          <li>
            <label> Start time: </label>
            <span> {{ layer.info.timeStart }} </span>
          </li>
          <li>
            <label>End time: </label>
            <span>{{ layer.info.timeEnd }}</span>
          </li>
          <li>
            <label>Distance: </label>
            <span>{{ layer.info.distance.toFixed(2) }} m</span>
          </li>
          <li>
            <label>Max elevation: </label>
            <span>{{ layer.info.elevationMax.toFixed(2) }} m</span>
          </li>
          <li>
            <label>Min elevation: </label>
            <span>{{ layer.info.elevationMin.toFixed(2) }} m</span>
          </li>
          <li>
            <label>Average speed: </label>
            <span>{{ layer.info.speedAvg.toFixed(2) }} km/h</span>
          </li>
          <li>
            <label>Maximum speed: </label>
            <span>{{ layer.info.speedMax.toFixed(2) }} km/h</span>
          </li>
        </ul>
      </li>
    </ul>
    <h1 id="empty" v-else>No .gpx file loaded.</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GpxInfo",
  props: ["gpxLayers", "gpx"],
  watch: {
    gpxLayers: {
      immediate: true,
      handler(layers) {
        this.currentLayers = layers;
      },
    },
  },
  data() {
    return {
      contentWidth: 25,
      currentLayers: [],
    };
  },
  methods: {
    toggleSidebar() {
      if (this.contentWidth == 25) {
        this.contentWidth = 350;
      } else {
        this.contentWidth = 25;
      }
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
#sidebar {
  display: flex;
  position: absolute;
  height: inherit;

  padding-top: 30px;
  z-index: 314159;
  top: 0;
  right: 0;

  background-color: #111;
  opacity: 0.8;

  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.5s;

  .layer {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;

    li {
      display: table-row;
      color: white;
      font-size: 15px;

      label {
        display: table-cell;
        text-align: left;
      }
      span {
        display: table-cell;
        text-align: right;
        width: 50%;
      }
    }
  }

  h1 {
    font-size: 20px;
    color: whitesmoke;
  }
  #empty {
    margin-left: 40px;
    margin-top: 40px;
  }
}
</style>

