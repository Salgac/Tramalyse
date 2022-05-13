import { createStore } from "vuex";

import { sliceByStops } from "@/library/gpxReader";
import stops from "@/assets/stops.json";

export default createStore({
  state: {
    gpxFiles: [] as {
      color: string;
      name: string;
      trackPoints: any; //TODO track point object
      info: any;
      trackSections: any;
    }[],
    fileCounter: 0,

    stsData: [] as {
      fileName: string;
      color: string;
      sections: any;
    }[],
  },
  mutations: {
    addGpxFile(state, file) {
      state.gpxFiles.push(file);
      state.fileCounter++;
    },
    removeGpxFile(state, name) {
      state.gpxFiles.splice(
        state.gpxFiles.findIndex((el) => el.name == name),
        1
      );
    },
    addSTSdata(state, data) {
      state.stsData.push(data);
    },
  },
  actions: {
    addGpxFile(context, file) {
      context.commit("addGpxFile", file);
      context.dispatch("addSTSdata", file);
    },
    async addSTSdata(context, file) {
      const sections = await sliceByStops(file.trackPoints, stops);
      context.commit("addSTSdata", {
        fileName: file.name,
        color: file.color,
        sections: sections,
      });
    },
  },
  getters: {
    getSTSdata: (state) => (name: string) => {
      return state.stsData.find((data) => data.fileName === name);
    },
    getUniqueHex(state) {
      const h = 35 + ((state.fileCounter * 65) % 360),
        s = 100,
        l = 50 / 100;

      //convert to hex
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
  modules: {},
});
