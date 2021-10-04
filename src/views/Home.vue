<template>
  <div class="home">
    <FileInput @filePicked="setFile($event)" />
    <Map :gpxFile="newestFile" />
    <DataCard v-for="file in gpxFiles" v-bind:key="file" :gpx="file" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileInput from "@/components/FileInput.vue";
import Map from "@/components/Map.vue";
import DataCard from "@/components/DataCard.vue";

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
    DataCard,
  },
  methods: {
    setFile(file: any) {
      this.gpxFiles.push(file);
      this.newestFile = file;
    },
  },
});
</script>
