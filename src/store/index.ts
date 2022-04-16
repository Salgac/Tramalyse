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
  },
  mutations: {
    addGpxFile(state, file) {
      state.gpxFiles.push(file);
    }
  },
  actions: {
    addGpxFile(context, file) {
      context.commit('addGpxFile', file);
    }
  },
  modules: {},
});
