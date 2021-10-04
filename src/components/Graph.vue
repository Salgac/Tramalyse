<template>
  <div id="container">
    <h3>{{ heading }}</h3>
    <div :id="heading"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import * as d3 from "d3";

export default defineComponent({
  name: "Graph",
  props: ["data", "heading"],
  data() {
    return {
      containerId: null,
    };
  },
  mounted() {
    this.plotData();
  },
  methods: {
    plotData() {
      //get initial size data
      const element = document.getElementById(this.heading);
      var margin = { top: 10, right: 50, bottom: 25, left: 50 },
        width = element.offsetWidth - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

      //create svg element
      const svg = d3
        .select("#" + this.heading)
        .append("svg")
        .attr("width", width + 100)
        .attr("height", height + 100)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //calculate scale
      var yScale = this.getYScale(height);
      var xScale = this.getXScale(width);

      //add x and y axis into svg
      svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(2," + height + ")")
        .call(d3.axisBottom(xScale));

      //add axis description
      svg
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text(this.getYAxisText());
      svg
        .append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Distance (km)");

      //draw path
      var line = this.getLineGenerator(yScale, xScale);
      svg
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line(this.data));
    },
    getLineGenerator(yScale, xScale) {
      if (this.heading === "Speed") {
        return d3
          .line()
          .y(function (d) {
            return yScale(d.speed);
          })
          .x(function (d) {
            return xScale(d.dst * 0.001);
          });
      } else {
        return d3
          .line()
          .y(function (d) {
            return yScale(d.ele);
          })
          .x(function (d) {
            return xScale(d.dst * 0.001);
          });
      }
    },
    getYAxisText() {
      return this.heading === "Speed" ? "Speed (km/h)" : "Elevation (m)";
    },
    getYScale(height) {
      return this.heading === "Speed"
        ? d3.scaleLinear().domain([0, 50]).range([height, 0])
        : d3
            .scaleLinear()
            .domain(
              d3.extent(this.data, function (d) {
                return d.ele;
              })
            )
            .range([height, 0]);
    },
    getXScale(width) {
      return d3
        .scaleLinear()
        .domain(
          d3.extent(this.data, function (d) {
            return d.dst * 0.001;
          })
        )
        .range([0, width]);
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 450px;
}
#svgcontainer {
  height: 350px;
}
</style>

