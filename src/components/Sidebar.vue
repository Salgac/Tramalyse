<template>
  <div
    id="sidebar"
    v-on:click="toggleSidebar()"
    :style="{ width: contentWidth + 'px' }"
  >
    <ul v-if="$store.state.gpxFiles.length != 0">
      <li
        class="layer"
        v-for="layer in $store.state.gpxFiles"
        v-bind:key="layer"
      >
        <h1 :style="'color: ' + layer.color">
          {{ layer.name }}
        </h1>
        <RouteInfo :route="layer" />
      </li>
    </ul>
    <h1 id="empty" v-else>No .gpx file loaded.</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import RouteInfo from "@/components/RouteInfo.vue";

export default defineComponent({
  name: "Sidebar",
  data() {
    return {
      contentWidth: 30,
    };
  },
  methods: {
    toggleSidebar() {
      if (this.contentWidth == 30) {
        this.contentWidth = 400;
      } else {
        this.contentWidth = 30;
      }
    },
  },
  components: {
    RouteInfo,
  },
});
</script>

<style lang="scss">
#sidebar {
  display: flex;
  position: relative;
  height: 100%;

  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 314159;
  top: 0;
  right: 0;

  background-color: #111;
  opacity: 0.8;

  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: 0.5s;

  ul {
    padding-left: 30px;
    height: fit-content;
  }

  .layer {
    list-style-type: none;
    margin: 0;
    margin-bottom: 10px;
    padding: 0;
    overflow: hidden;

    .detail {
      margin-left: -20px;
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

