<template>
  <div id="container">
    <div id="header">
      <h1 :style="{ background: gpx.color }">{{ gpx.name }}</h1>
      <a href="javascript:void(0)" v-on:click="deleteSelf()">&times;</a>
    </div>
    <div id="data">
      <div class="info">
        <h3>Detail</h3>
        <RouteInfo :route="gpx" />
        <router-link
          :to="{
            name: 'Stop-to-Stop',
            params: { gpx: JSON.stringify(gpx), name: gpx.name },
          }"
        >
          Open stop-to-stop analysis
        </router-link>
      </div>
      <Graph
        class="graph"
        :data="gpx.trackPoints"
        :heading="'Speed'"
        :gId="'s' + gpx.name.replaceAll('.', '').replaceAll(' ', '_')"
      />
      <Graph
        class="graph"
        :data="gpx.trackPoints"
        :heading="'Elevation'"
        :gId="'e' + gpx.name.replaceAll('.', '').replaceAll(' ', '_')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Graph from "@/components/Graph.vue";
import RouteInfo from "./RouteInfo.vue";

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
      //TODO
      //this.$emit("removed", "");
    },
  },
  components: {
    Graph,
    RouteInfo,
  },
});
</script>

<style lang="scss">
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
      }

      &:p {
        padding-left: 20px;
      }

      a {
        text-align: center;
        text-decoration: none;
        margin: auto;
        display: block;
        width: 50%;
        padding: 15px 32px;
        font-size: 18px;
        color: black;
        background-color: rgb(233, 233, 233);
        transition: 0.3s;

        &:hover {
          box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.1),
            0 15px 23px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }

    .graph {
      border-left: solid lightgray 1px;
    }
  }
}
</style>

