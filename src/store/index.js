import { createStore } from "vuex";
// import { authPlugin } from "@/auth";
// console.log(authPlugin);

// Create a new store instance.
const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  getters: {},
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {},
});

export default store;
