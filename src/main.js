import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

// core
const app = createApp(App).use(router).use(store);

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

// primevue
import PrimeVue from "primevue/config";
import AutoComplete from "primevue/autocomplete";
app.use(PrimeVue);
app.component("AutoComplete", AutoComplete);

import LoadingIcon from "@/components/LoadingIcon.vue";
app.component("LoadingIcon", LoadingIcon);

import FeedChirp from "./components/feed/FeedChirp.vue";
app.component("FeedChirp", FeedChirp);

// auth0
const authConfig = {
  domain: import.meta.env.VITE_DOMAIN,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_REDIRECT_URI,
  audience: import.meta.env.VITE_AUDIENCE,
};
import { setupAuth } from "./auth";
function callbackRedirect(appState) {
  router.push(appState && appState.targetUrl ? appState.targetUrl : "/");
}

setupAuth(authConfig, callbackRedirect).then((auth) => {
  app.use(auth).mount("#app");
});
