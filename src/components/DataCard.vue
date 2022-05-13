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
            params: { name: gpx.name },
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
      this.$store.commit("removeGpxFile", this.gpx.name);
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
  height: auto;
  overflow-x: scroll;
  min-height: 500px;
  box-sizing: border-box;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  #header {
    width: 100%;
    min-height: 50px;
    position: relative;
    min-width: 500px;

    h1 {
      border-radius: 5px 5px 0 0;
      padding-top: 10px;
      padding-bottom: 10px;
      margin: 0px;
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
    h3 {
      text-align: left;
    }

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    min-height: 450px;
    min-width: 500px;
    margin: auto;
    box-sizing: border-box;

    @media only screen and (max-width: 800px) {
      flex-direction: column;
      height: auto;
    }

    & > div {
      flex: 1;

      @media only screen and (min-width: 800px) {
        border-left: solid lightgray 1px;
        border-right: solid lightgray 1px;
      }
    }

    .info {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      min-width: 500px;

      h3 {
        padding-left: 10px;
      }

      .detail {
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
        margin-bottom: 15px;
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
      margin: 0px;
      min-width: 500px;
      overflow-x: hidden;
    }
  }
}
</style>
