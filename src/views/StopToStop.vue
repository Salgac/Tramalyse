<template>
  <div class="sts">
    <div id="header">
      <h1 :style="{ background: gpxParsed.color }">
        {{ name }}
      </h1>
    </div>
    <div
      id="data"
      v-for="section in gpxParsed.trackSections"
      v-bind:key="section"
    >
      <div class="info">
        <h1>{{ section.start }}</h1>
        <h4>
          [{{ section.points.at(0).lat }}, {{ section.points.at(0).lon }}]
        </h4>
        <h4>Time: {{ getTime(section.points.at(0).time) }}</h4>
        <h4>
          Distance from start: {{ section.points.at(0).dst.toFixed(2) }} m
        </h4>
        <h4>Elevation: {{ section.points.at(0).ele }} m</h4>
      </div>
      <Graph
        class="graph"
        :data="section.points"
        :heading="'Speed'"
        :gId="
          (section.start + 'to' + section.end)
            .replaceAll('.', '')
            .replaceAll(' ', '_')
        "
      />
      <div class="info">
        <h1>{{ section.end }}</h1>
        <h4>
          [{{ section.points.at(-1).lat }}, {{ section.points.at(-1).lon }}]
        </h4>
        <h4>Time: {{ getTime(section.points.at(-1).time) }}</h4>
        <h4>
          Distance from start: {{ section.points.at(-1).dst.toFixed(2) }} m
        </h4>
        <h4>Elevation: {{ section.points.at(-1).ele }} m</h4>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Graph from "@/components/Graph.vue";

export default defineComponent({
  name: "StS",
  props: ["gpx", "name"],
  data() {
    return {
      gpxParsed: null,
    };
  },
  created() {
    this.gpxParsed = JSON.parse(this.gpx);
  },
  components: {
    Graph,
  },
  methods: {
    getTime(time: string): string {
      return new Date(time).toLocaleString("de-ch");
    },
  },
});
</script>

<style scoped lang="scss">
.sts {
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  #header {
    width: 100%;
    height: 50px;
    position: relative;

    h1 {
      border-radius: 5px 5px 0 0;
      padding-top: 10px;
      padding-bottom: 10px;
    }
  }

  #data {
    text-align: left;
    display: flex;
    height: 450px;
    overflow: hidden;
    border-bottom: solid lightgray 1px;

    & > div {
      flex: 1 1 auto;
      padding-left: 10px;
      padding-right: 10px;
    }

    .info {
      width: 25%;
    }
  }
}
</style>