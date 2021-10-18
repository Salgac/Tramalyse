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
      <Map
        class="mapContainer"
        :info="false"
        :mId="
          'm' +
          (section.start + 'to' + section.end)
            .replaceAll('.', '')
            .replaceAll(' ', '_')
        "
        :section="section"
      />
      <StopInfo
        class="stopInfoContainer"
        :title="section.start"
        :point="section.points.at(0)"
      />
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
      <StopInfo
        class="stopInfoContainer"
        :title="section.end"
        :point="section.points.at(-1)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Graph from "@/components/Graph.vue";
import StopInfo from "@/components/StopInfo.vue";
import Map from "@/components/Map.vue";

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
    StopInfo,
    Map,
  },
  methods: {},
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
    height: 400px;
    overflow: hidden;
    border-bottom: solid lightgray 1px;
    padding: 15px;

    & > div {
      flex: 1 1 auto;
      padding-left: 10px;
      padding-right: 10px;
    }

    .stopInfoContainer {
      width: 30%;
    }

    .mapContainer {
      width: 680px;
      height: 380px;
    }
  }
}
</style>