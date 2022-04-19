<template>
  <div class="inputContainer">
    <button v-for="i in files.length" v-bind:key="i" @click="onFileClicked(i)">
      Preset file {{ i }}
    </button>

    <input
      type="file"
      id="input"
      class="inputfile"
      @change="onFilePicked"
      ref="inputref"
      accept="'.gpx'"
      hidden
    />
    <label for="input">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="17"
        viewBox="0 0 20 17"
      >
        <path
          d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"
        />
      </svg>
      <span>Upload a file&hellip;</span>
    </label>
  </div>
</template>

<script lang="ts">
import { readGpx } from "@/library/gpxReader";
import { generateInfo } from "@/library/gpxReader";

import { defineComponent } from "vue";

import file1 from "!raw-loader!@/assets/gpx/2021-04-17_11-00-22_gps.gpx";
import file2 from "!raw-loader!@/assets/gpx/2021-04-18_11-10-26_gps.gpx";
import file3 from "!raw-loader!@/assets/gpx/2021-04-18_19-41-07_gps.gpx";
import file4 from "!raw-loader!@/assets/gpx/2021-04-17_20-18-09_gps.gpx";

export default defineComponent({
  name: "FileInput",
  data() {
    return {
      files: [
        { content: file1, name: "Úrad vlády SR - STU" },
        { content: file2, name: "Nám. Ľ. Štúra - Hlavná Stanica" },
        { content: file3, name: "Hlavná Stanica - Hlavná Stanica" },
        { content: file4, name: "Hlavná Stanica - Depo Jurajov dvor" },
      ],
    };
  },
  methods: {
    onFileClicked(index: number) {
      //load file from preset files
      let f = this.files[index - 1];
      this.loadFile(f.content, f.name);
    },

    onFilePicked(event: any) {
      //load file from input
      const file = event?.target.files[0];

      //did user pick a file?
      if (file == undefined) {
        return;
      }

      var fr = new FileReader();
      fr.onload = (e) => {
        //fill in gpx data
        var content = fr.result as string;
        this.loadFile(content, file.name);
      };
      fr.readAsText(file);

      //reset file input
      (this.$refs.inputref as any).value = "";
    },

    loadFile(content: string, fileName: string) {
      //test if file is already loaded
      const loaded = this.$store.state.gpxFiles.find((file: any) => {
        return file.name == fileName;
      });
      if (loaded) {
        alert("File '" + fileName + "' is already loaded.");
        return;
      }

      //prepare object
      var color = this.$store.getters.getUniqueHex;
      var points = readGpx(content);

      var gpx = {
        color: color,
        name: fileName,
        trackPoints: points,
        info: generateInfo(points),
      };

      //add file to store array
      this.$store.dispatch("addGpxFile", gpx);
    },
  },
  components: {},
});
</script>

<style scoped lang="scss">
.inputContainer {
  //background: pink;
  height: 50px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

button,
.inputfile + label {
  background-color: whitesmoke;
  color: #2c3e50;
  border: 2px solid currentColor;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

  max-width: 25%;
  font-size: 1.2rem;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  display: inline-block;
  vertical-align: top;
  padding: 0.6rem 1rem;
  transition: 0.3s;

  &:hover {
    color: #42b983;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
  }
}
</style>

