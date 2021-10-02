<template>
  <div class="home">
    <FileInput />
    <Map />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileInput from "@/components/FileInput.vue";
import Map from "@/components/Map.vue";

export default defineComponent({
  name: "Home",
  components: {
    FileInput,
    Map,
  },
});
</script>
