import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"

export default createStore({
  state: {
    gpxFiles: [] as
      {
        color: string,
        file: any,
        mapLayer: null,
        content: string,
        trackPoints: any, //TODO track point object
        info: any,
        trackSections: any,
      }[],
  },
  mutations: {
    addGpxFile(state, file) {
      console.log();

      state.gpxFiles.push(file);
    }
  },
  actions: {
    addGpxFile(context, file) {
      context.commit('addGpxFile', file);
    }
  },
  modules: {},
  //plugins: [createPersistedState()], // TODO optimise gpxFiles to contain less characters
});
