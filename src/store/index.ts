import { createStore } from "vuex";

export default createStore({
  state: {
    gpxFiles: [] as
      {
        color: string,
        name: string,
        trackPoints: any, //TODO track point object
        info: any,
        trackSections: any,
      }[],
    fileCounter: 0,
  },
  mutations: {
    addGpxFile(state, file) {
      state.gpxFiles.push(file);
      state.fileCounter++;
    },
    removeGpxFile(state, name) {
      state.gpxFiles.splice(state.gpxFiles.findIndex(el => el.name == name), 1);
    },
  },
  actions: {
    addGpxFile(context, file) {
      context.commit('addGpxFile', file);
    }
  },
  getters: {
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
    }
  },
  modules: {},
});
