import { createStore } from "vuex";

export default createStore({
  state: {
    auth: null,
  },
  mutations: {
    initialiseAuth(state, payload) {
      state.auth = payload;
    },
  },
  actions: {},
  modules: {},
});
