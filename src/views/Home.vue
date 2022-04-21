<template>
  <div class="home">
    <FileInput />
    <Map :mId="'map'" :info="true" />
    <DataCard
      v-for="file in $store.state.gpxFiles"
      v-bind:key="file.name"
      :gpx="file"
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
  components: {
    FileInput,
    Map,
    DataCard,
  },
  created() {
    document.title = "Tramalyse";
  },
  methods: {},
});
</script>
