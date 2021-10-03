<template>
  <div class="home">
    <FileInput @filePicked="setFile($event)" />
    <Map :gpxFile="gpxFile" />
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
      gpxFile: null,
    };
  },
  components: {
    FileInput,
    Map,
  },
  methods: {
    setFile(file: any) {
      this.gpxFile = file;
    },
  },
});
</script>
