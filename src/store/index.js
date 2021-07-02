import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      auth: null,
      user: null,
    };
  },
  getters: {},
  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
});

export default store;
