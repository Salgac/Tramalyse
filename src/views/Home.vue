<template>
  <div class="home">
    <FileInput @filePicked="setFile($event)" />
    <Map :gpx="gpxFiles" />
    <DataCard
      v-for="file in gpxFiles"
      v-bind:key="file"
      :gpx="file"
      @removed="deleteFile(index)"
    />
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
    },
    deleteFile(index: number) {
      this.gpxFiles.splice(index, 1);
    },
  },
});
</script>
