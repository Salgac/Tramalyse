<template>
  <div class="info">
    <h1>{{ title }}</h1>
    <ul>
      <li>
        <label>Lat:</label>
        <span>{{ point.lat }}</span>
      </li>
      <li>
        <label>Lon:</label>
        <span>{{ point.lon }}</span>
      </li>
      <li>
        <label>Time:</label>
        <span>{{ getTime(point.time) }}</span>
      </li>
      <li>
        <label>Distance:</label>
        <span>{{ point.dst.toFixed(2) }} m</span>
      </li>
      <li>
        <label>Elevation:</label>
        <span>{{ point.ele }} m</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "StopInfo",
  props: ["title", "point"],
  data() {
    return {};
  },
  methods: {
    getTime(time: string): string {
      return new Date(time).toLocaleString("de-ch");
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
.info {
  list-style-type: none;
  margin: 0;
  padding: 7px;
  overflow: hidden;

  ul {
    margin-left: -25px;

    li {
      display: table-row;
      color: black;
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
    font-size: 27px;
    margin-top: 5px;
  }
}
</style>
