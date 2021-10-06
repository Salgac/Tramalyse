<template>
  <div>
    <input type="file" ref="fileInput" @change="onFilePicked" accept="'.gpx'" />
  </div>
</template>

<script lang="ts">
import { readGpx } from "@/library/gpxReader";
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

        var gpx = {
          color: color,
          file: file,
          content: content,
          trackPoints: readGpx(content),
        };

        //emit gpx object
        this.$emit("filePicked", gpx);
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

