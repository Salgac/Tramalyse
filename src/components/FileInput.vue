<template>
  <div>
    <input type="file" ref="fileInput" @change="onFilePicked" accept="'.gpx'" />
  </div>
</template>

<script lang="ts">
import { readGpx } from "@/library/gpxReader";
import { generateInfo } from "@/library/gpxReader";
import { sliceByStops } from "@/library/gpxReader";

import { default as stops } from "@/assets/stops.json";

import { defineComponent } from "vue";

export default defineComponent({
  name: "FileInput",
  data() {
    return {
      colorOffset: 0,
    };
  },
  methods: {
    onFilePicked(event: any) {
      const file = event?.target.files[0];
      var fr = new FileReader();

      fr.onload = (e) => {
        //fill in gpx data
        var content = fr.result as string;
        var color = this.generateUniqueColor();
        var points = readGpx(content);

        //TODO create a GPX class
        var gpx = {
          color: color,
          name: file.name,
          content: content,
          trackPoints: points,
          info: generateInfo(points),
          trackSections: sliceByStops(points, stops),
        };

        //add file to store array
        this.$store.dispatch("addGpxFile", gpx);
      };
      fr.readAsText(file);
    },
    generateUniqueColor(): string {
      var h = 35 + this.colorOffset,
        s = 100,
        l = 50;
      this.colorOffset += 65;
      this.colorOffset %= 360;

      //convet to hex
      l /= 100;
      const a = (s * Math.min(l, 1 - l)) / 100;
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, "0"); // convert to Hex and prefix "0" if needed
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
</style>

