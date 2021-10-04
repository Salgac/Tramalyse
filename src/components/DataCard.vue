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
      <Graph class="graph" :data="speedData" :heading="'Speed'" />
      <Graph class="graph" :data="elevationData" :heading="'Elevation'" />
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
    return {
      points: [] as any,
      speedData: [] as any,
      elevationData: [] as any,
    };
  },
  created() {
    //parse file data
    this.parseFile().then((data) => {
      //
    });
  },
  methods: {
    deleteSelf() {
      //TODO
      console.log("delete");
    },
    async parseFile() {
      var content = this.gpx.content;
      var parser = new DOMParser();
      var document = parser.parseFromString(content, "text/xml");

      var trackPoints = Array.from(document.getElementsByTagName("trkpt"));
      trackPoints.forEach((point) => {
        var pt = {
          lat: point.getAttribute("lat"),
          lon: point.getAttribute("lon"),
          time: point.getElementsByTagName("time")[0].innerHTML,
          ele: point.getElementsByTagName("ele")[0].innerHTML,
          speed: point.getElementsByTagName("speed")[0].innerHTML,
          course: point.getElementsByTagName("course")[0].innerHTML,
          hacc: point.getElementsByTagName("hacc")[0].innerHTML,
        };
        this.points.push(pt);
      });

      //when done calculate datasets and info as well
      this.calculateDataSets();
      this.calculateInfo();
    },
    async calculateDataSets() {
      //fill data arrays for speed and elevation
      var previousPoint = this.points[0];
      var previousDst = 0;

      this.points.forEach((point: any) => {
        var sp = {
          speed: point.speed,
          dst: previousDst + this.getDistance(previousPoint, point),
        };
        var ep = {
          ele: point.ele,
          dst: sp.dst,
        };

        previousPoint = point;
        previousDst = sp.dst;

        this.speedData.push(sp);
        this.elevationData.push(ep);
      });
    },
    calculateInfo() {
      //TODO
    },
    getDistance(point1: any, point2: any) {
      // calculate the distance between point 1 and 2 in metres
      let R = 6378137;
      let dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
      let dLong = ((point2.lon - point1.lon) * Math.PI) / 180;
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((point1.lat * Math.PI) / 180) *
          Math.cos((point1.lat * Math.PI) / 180) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);

      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
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

