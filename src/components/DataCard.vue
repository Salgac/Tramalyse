<template>
  <div id="container">
    <div id="header">
      <h1 :style="{ background: gpx.color }">{{ gpx.file.name }}</h1>
      <a href="javascript:void(0)" v-on:click="deleteSelf()">&times;</a>
    </div>
    <div id="data">
      <div class="info">
        <h3>Detail</h3>
        <p>desctiption 1</p>
        <p>desctiption 2</p>
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
      //TODO
      console.log("delete");
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

    .info p {
      padding-left: 20px;
    }

    .graph {
      border-left: solid lightgray 1px;
    }
  }
}
</style>

