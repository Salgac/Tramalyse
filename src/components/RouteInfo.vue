<template>
  <div class="detail">
    <ul>
      <li>
        <label> Start time: </label>
        <span> {{ i.timeStart.toLocaleString("de-ch") }} </span>
      </li>
      <li>
        <label>End time: </label>
        <span>{{ i.timeEnd.toLocaleString("de-ch") }}</span>
      </li>
      <li>
        <label>Duration: </label>
        <span>{{ getDuration(i.timeStart, i.timeEnd) }}</span>
      </li>
      <li>
        <label>Distance: </label>
        <span>{{ i.distance.toFixed(2) }} m</span>
      </li>
      <li>
        <label>Max elevation: </label>
        <span>{{ i.elevationMax.toFixed(2) }} m</span>
      </li>
      <li>
        <label>Min elevation: </label>
        <span>{{ i.elevationMin.toFixed(2) }} m</span>
      </li>
      <li>
        <label>Climb: </label>
        <span>
          {{ Math.abs(i.elevationMin - i.elevationMax).toFixed(2) }} m
        </span>
      </li>
      <li>
        <label>Average speed: </label>
        <span>{{ i.speedAvg.toFixed(2) }} km/h</span>
      </li>
      <li>
        <label>Maximum speed: </label>
        <span>{{ i.speedMax.toFixed(2) }} km/h</span>
      </li>
      <li v-if="!isNaN(i.haccMin)">
        <label>Worst accuracy: </label>
        <span>{{ i.haccMin.toFixed(2) }} cm</span>
      </li>
      <li v-if="!isNaN(i.haccAvg)">
        <label>Average accuracy: </label>
        <span>{{ i.haccAvg.toFixed(2) }} cm</span>
      </li>
      <li v-if="!isNaN(i.haccMax)">
        <label>Best accuracy: </label>
        <span>{{ i.haccMax.toFixed(2) }} cm</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RouteInfo",
  props: ["route"],
  data() {
    return {
      i: this.route.info,
    };
  },
  methods: {
    getDuration(from: string, to: string): string {
      var d1 = new Date(from),
        d2 = new Date(to);
      var mil = Math.abs(d2.getTime() - d1.getTime());

      return (
        Math.floor(mil / (1000 * 60)) +
        " min, " +
        Math.floor((mil / 1000) % 60) +
        " sec"
      );
    },
  },
  components: {},
});
</script>
