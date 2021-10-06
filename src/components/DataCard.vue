<template>
  <div id="container">
    <div id="header">
      <h1 :style="{ background: gpx.color }">{{ gpx.file.name }}</h1>
      <a href="javascript:void(0)" v-on:click="deleteSelf()">&times;</a>
    </div>
    <div id="data">
      <div class="info">
        <h3>Detail</h3>
        <ul>
          <li>
            <label> Start time: </label>
            <span> {{ gpx.info.timeStart }} </span>
          </li>
          <li>
            <label>End time: </label>
            <span>{{ gpx.info.timeEnd }}</span>
          </li>
          <li>
            <label>Distance: </label>
            <span>{{ gpx.info.distance.toFixed(2) }} m</span>
          </li>
          <li>
            <label>Max elevation: </label>
            <span>{{ gpx.info.elevationMax.toFixed(2) }} m</span>
          </li>
          <li>
            <label>Min elevation: </label>
            <span>{{ gpx.info.elevationMin.toFixed(2) }} m</span>
          </li>
          <li>
            <label>Average speed: </label>
            <span>{{ gpx.info.speedAvg.toFixed(2) }} km/h</span>
          </li>
          <li>
            <label>Maximum speed: </label>
            <span>{{ gpx.info.speedMax.toFixed(2) }} km/h</span>
          </li>
        </ul>
      </div>
      <Graph
        class="graph"
        :data="gpx.trackPoints"
        :heading="'Speed'"
        :gId="'s' + gpx.file.name.replaceAll('.', '').replaceAll(' ', '_')"
      />
      <Graph
        class="graph"
        :data="gpx.trackPoints"
        :heading="'Elevation'"
        :gId="'e' + gpx.file.name.replaceAll('.', '').replaceAll(' ', '_')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Graph from "@/components/Graph.vue";

export default defineComponent({
  name: "DataCard",
  props: ["gpx"],
  data() {
    return {};
  },
  created() {
    //
  },
  methods: {
    deleteSelf() {
      this.$emit("removed", "");
    },
  },
  components: {
    Graph,
  },
});
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 500px;
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

    a {
      text-decoration: none;
      font-size: 40px;
      color: whitesmoke;
      position: absolute;
      top: 8px;
      right: 20px;
      transition: 0.3s;

      &:hover {
        color: red;
      }
    }
  }

  #data {
    text-align: left;
    display: flex;
    height: 450px;
    overflow: hidden;

    & > div {
      flex: 1;
      padding-left: 10px;
      padding-right: 10px;
    }

    .info {
      list-style-type: none;

      li {
        display: table-row;
        font-size: 18px;

        label {
          display: table-cell;
          text-align: left;
        }
        span {
          display: table-cell;
          text-align: right;
          width: 65%;
        }
      }

      &:p {
        padding-left: 20px;
      }
    }

    .graph {
      border-left: solid lightgray 1px;
    }
  }
}
</style>

