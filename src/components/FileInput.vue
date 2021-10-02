<template>
  <div>
    <input type="file" ref="fileInput" @change="onFilePicked" accept="'.gpx'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FileInput",
  data() {
    return {
      file: null,
      filename: null,
      content: null,
    };
  },
  methods: {
    onFilePicked(event: any) {
      const file = event?.target.files[0];
      this.file = file;
      this.filename = file.name;

      console.log(this.filename);

      //TODO load content into map
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
</style>

