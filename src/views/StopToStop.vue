<template>
  <div>
    <div class="sts">
      <div id="header">
        <h1 :style="{ background: data.color }">
          {{ name }}
        </h1>
      </div>
      <div id="data" v-for="section in data.sections" v-bind:key="section">
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
          :marker="focusedPoint"
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
          @focus="updateFocus($event)"
        />
        <StopInfo
          class="stopInfoContainer"
          :title="section.end"
          :point="section.points.at(-1)"
        />
      </div>
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
  props: ["name"],
  data() {
    return {
      focusedPoint: null,
      data: this.$store.getters.getSTSdata(this.name),
    };
  },
  created() {
    document.title = this.name;
  },
  components: {
    Graph,
    StopInfo,
    Map,
  },
  methods: {
    updateFocus(data: any) {
      this.focusedPoint = data;
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

  overflow-x: scroll;

  #header {
    min-width: 1400px;
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
    min-width: 1400px;
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
      overflow: hidden;
    }

    .stopInfoContainer {
      width: 30%;
    }

    .mapContainer {
      width: 680px;
      height: 380px;
    }

    .graph {
      padding: 0;
      margin: 0;
      margin-top: -20px;
    }
  }
}
</style>