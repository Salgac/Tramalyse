<template>
  <div id="container">
    <h3>{{ heading }}</h3>
    <div :id="gId"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

import * as d3 from "d3";

export default defineComponent({
  name: "Graph",
  props: ["data", "heading", "gId"],
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
      const element = document.getElementById(this.gId);
      var margin = { top: 10, right: 50, bottom: 25, left: 50 },
        width = element.offsetWidth - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

      //create svg element
      const svg = d3
        .select("#" + this.gId)
        .append("svg")
        .attr("width", width + 100)
        .attr("height", height + 100)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //calculate scale
      var yScale = this.getYScale(height, this.heading);
      var xScale = this.getXScale(width);
      var accScale = this.getYScale(height, "Hacc");

      //add x and y axis into svg
      svg.append("g").attr("class", "y axis").call(d3.axisLeft(yScale));
      svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(2," + height + ")")
        .call(d3.axisBottom(xScale));
      this.data[0].hacc != undefined &&
        svg
          .append("g")
          .attr("class", "y axis")
          .call(d3.axisRight(accScale))
          .attr("transform", "translate(" + width + ",0)");

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
      this.data[0].hacc != undefined &&
        svg
          .append("text")
          .attr("class", "y label")
          .attr("text-anchor", "end")
          .attr("y", width - 20)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("Accuracy (cm)");

      //draw paths
      var line = this.getLineGenerator(yScale, xScale, this.heading);
      var tramSpeedLine = this.getLineGenerator(yScale, xScale, "tramSpeed");
      var accLine = this.getLineGenerator(accScale, xScale, "Accuracy");

      svg
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line(this.data));

      //speed from tram
      this.heading === "Speed" &&
        svg
          .append("path")
          .attr("fill", "none")
          .attr("stroke", "orange")
          .attr("stroke-width", 2)
          .attr("d", tramSpeedLine(this.data));
      //accuracy
      this.data[0].hacc != undefined &&
        svg
          .append("path")
          .attr("fill", "none")
          .attr("stroke", "green")
          .attr("stroke-width", 2)
          .attr("d", accLine(this.data));

      // focus elements
      var focus = svg
        .append("g")
        .append("circle")
        .style("fill", "steelblue")
        .attr("r", 6)
        .style("opacity", 0);
      var focusText = svg
        .append("g")
        .append("text")
        .style("opacity", 0)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("x", width / 2)
        .attr("y", height + 35);

      //utility for mouse events
      svg
        .append("rect")
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", mouseover)
        .on("mousemove", (e) => mousemove(e))
        .on("mouseout", mouseout);

      var bisect = d3.bisector((d) => xScale(d.dst * 0.001)).left;

      function mouseover() {
        focus.style("opacity", 1);
        focusText.style("opacity", 1);
      }

      var data = this.data;
      var handleFocus = this.handleFocus;
      var handleEmit = this.handleEmit;
      function mousemove(event) {
        var x0 = d3.pointer(event, focus.node())[0];
        var i = bisect(data, x0, 1);

        var selectedData = data[i];
        if (selectedData != null) {
          handleFocus(selectedData, focus, focusText, xScale, yScale);
          handleEmit(selectedData);
        }
      }

      function mouseout() {
        focus.style("opacity", 0);
        focusText.style("opacity", 0);
        handleEmit(null);
      }
    },
    getLineGenerator(yScale, xScale, heading) {
      switch (heading) {
        case "Speed":
          return d3
            .line()
            .y(function (d) {
              return yScale(d.speed);
            })
            .x(function (d) {
              return xScale(d.dst * 0.001);
            });
        case "tramSpeed":
          return d3
            .line()
            .y(function (d) {
              return yScale(d.tramSpeed);
            })
            .x(function (d) {
              return xScale(d.dst * 0.001);
            });
        case "Elevation":
          return d3
            .line()
            .y(function (d) {
              return yScale(d.ele);
            })
            .x(function (d) {
              return xScale(d.dst * 0.001);
            });
        case "Accuracy":
          return d3
            .line()
            .y(function (d) {
              return yScale(d.hacc * 10000);
            })
            .x(function (d) {
              return xScale(d.dst * 0.001);
            });
      }
    },
    getYAxisText() {
      return this.heading === "Speed" ? "Speed (km/h)" : "Elevation (m)";
    },
    getYScale(height, type) {
      return type === "Speed" || type === "Hacc"
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
    handleFocus(selectedData, focus, focusText, xScale, yScale) {
      var tram = !isNaN(selectedData.tramSpeed)
        ? " (" + parseFloat(selectedData.tramSpeed).toFixed(2) + ")"
        : "";
      var text =
        this.heading === "Speed"
          ? "Speed: " +
            parseFloat(selectedData.speed).toFixed(2) +
            "km/h" +
            tram
          : "Elevation: " + parseFloat(selectedData.ele).toFixed(2) + "m";
      text += !isNaN(selectedData.hacc)
        ? ", Accuracy: " + (selectedData.hacc * 10000).toFixed(2) + "cm"
        : "";
      text += ", " + (selectedData.dst * 0.001).toFixed(3) + "km";
      text +=
        ", " +
        new Date(selectedData.time).toLocaleString("de-ch", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

      focusText.html(text);

      focus
        .attr("cx", xScale(selectedData.dst * 0.001))
        .attr(
          "cy",
          yScale(
            this.heading === "Speed" ? selectedData.speed : selectedData.ele
          )
        );
    },
    handleEmit(data) {
      this.$emit("focus", data);
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
#container {
  width: 100%;
  height: 450px;

  padding-left: 10px;
  padding-right: 10px;
}
#svgcontainer {
  height: 350px;
}
</style>

