import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import dayjs from "dayjs";

// core
const app = createApp(App).use(store).use(router);

// fontawesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faDog,
  faWalking,
  faSearch,
  faCog,
  faSignOutAlt,
  faExchangeAlt,
  faCrow,
  faShareAlt,
  faRetweet,
  faFeatherAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";

library.add(
  faHome,
  faDog,
  faWalking,
  faSearch,
  faCog,
  faSignOutAlt,
  faExchangeAlt,
  faCrow,
  faComment,
  faHeart,
  faShareAlt,
  faRetweet,
  faFeatherAlt
);
app.component("font-awesome-icon", FontAwesomeIcon);

// auth0
import authConfig from "../auth_config.json";
import { setupAuth } from "./auth";
function callbackRedirect(appState) {
  router.push(appState && appState.targetUrl ? appState.targetUrl : "/");
}

// mixin
app.mixin({
  methods: {
    dateFromObjectId(objectId) {
      return dayjs(parseInt(objectId.substring(0, 8), 16) * 1000);
    },
  },
});

setupAuth(authConfig, callbackRedirect).then((auth) => {
  app.use(auth).mount("#app");
});
