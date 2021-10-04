<template>
  <div class="home">
    <FileInput @filePicked="setFile($event)" />
    <Map :gpxFile="newestFile" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileInput from "@/components/FileInput.vue";
import Map from "@/components/Map.vue";

export default defineComponent({
  name: "Home",
  data() {
    return {
      gpxFiles: [] as any,
      newestFile: {},
    };
  },
  components: {
    FileInput,
    Map,
  },
  methods: {
    setFile(file: any) {
      this.gpxFiles.push(file);
      this.newestFile = file;
    },
  },
});
</script>
