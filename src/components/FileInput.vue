<template>
  <div>
    <input type="file" ref="fileInput" @change="onFilePicked" accept="'.gpx'" />
  </div>
</template>

<script lang="ts">
import { readGpx } from "@/library/gpxReader";
import { generateInfo } from "@/library/gpxReader";

import { defineComponent } from "vue";

export default defineComponent({
  name: "FileInput",
  data() {
    return {};
  },
  methods: {
    onFilePicked(event: any) {
      const file = event?.target.files[0];
      var fr = new FileReader();

      fr.onload = (e) => {
        //fill in gpx data
        var content = fr.result as string;
        var color = this.$store.getters.getUniqueHex;
        var points = readGpx(content);

        //TODO create a GPX class
        var gpx = {
          color: color,
          name: file.name,
          content: content,
          trackPoints: points,
          info: generateInfo(points),
        };

        //add file to store array
        this.$store.dispatch("addGpxFile", gpx);
      };
      fr.readAsText(file);
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
</style>

