import createAuth0Client from "@auth0/auth0-spa-js";
import { computed, reactive, watchEffect } from "vue";
import axios from "axios";
import store from "@/store/index.js";

let client;
const state = reactive({
  loading: true,
  isAuthenticated: false,
  user: {},
  popupOpen: false,
  error: null,
});

async function loginWithPopup() {
  state.popupOpen = true;

  try {
    await client.loginWithPopup(0);
  } catch (e) {
    console.error(e);
  } finally {
    state.popupOpen = false;
  }

  state.user = await client.getUser();
  state.isAuthenticated = true;
}

async function handleRedirectCallback() {
  state.loading = true;

  try {
    await client.handleRedirectCallback();
    state.user = await client.getUser();
    state.isAuthenticated = true;
  } catch (e) {
    state.error = e;
  } finally {
    state.loading = false;
  }
}

function loginWithRedirect(o) {
  return client.loginWithRedirect(o);
}

function getIdTokenClaims(o) {
  return client.getIdTokenClaims(o);
}

function getTokenSilently(o) {
  return client.getTokenSilently(o);
}

function getTokenWithPopup(o) {
  return client.getTokenWithPopup(o);
}

function logout(o) {
  return client.logout(o);
}

export const authPlugin = {
  isAuthenticated: computed(() => state.isAuthenticated),
  loading: computed(() => state.loading),
  user: computed(() => state.user),
  getIdTokenClaims,
  getTokenSilently,
  getTokenWithPopup,
  handleRedirectCallback,
  loginWithRedirect,
  loginWithPopup,
  logout,
};

export const routeGuard = (to, from, next) => {
  const { isAuthenticated, loading, loginWithRedirect, getTokenSilently } =
    authPlugin;

  const verify = async () => {
    /*
      Situations are:
      1. user is not logged into google - in this case we always redirect to landing page.
      2. user is logged into google but has not yet signed up - in which case we send them to signup.
      3. user is logged into google and has account. let them continue, only they can't go to signup or landing.
    */

    // is the user logged in?
    if (!isAuthenticated.value) {
      if (to.name == "Landing") {
        return next();
      }
      return next({ name: "Landing" });
    } else {
      // user is logged in to google.
      // check if they have an account

      try {
        if (!store.state.user) {
          const token = await getTokenSilently();
          const { data } = await axios.get("/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          store.commit("setUser", data);
        }
        // if they have an account, then this try will exit
        // so if we've made it here, they do have an account.
        // redirect them to Home if they are trying to go to Landing or Signup
        if (to.name == "Landing" || to.name == "SignUp") {
          return next({ name: "Home" });
        } else {
          return next();
        }
      } catch (err) {
        if (to.name == "SignUp") {
          return next();
        }
        // if we had an error retreiving their account - send to signup page.
        return next({ name: "SignUp" });
      }
    }

    /*
    if (to.name == "Landing") {
      if (isAuthenticated.value) {
        return next({ name: "Home" });
      }
      return next();
    }

    // If the user is authenticated, continue with the route
    if (isAuthenticated.value) {
      return next();
    }

    // Otherwise, log in
    loginWithRedirect({ appState: { targetUrl: to.fullPath } });
    */
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!loading.value) {
    return verify();
  }

  // Watch for the loading property to change before we check isAuthenticated
  watchEffect(() => {
    if (loading.value === false) {
      return verify();
    }
  });
};

export const setupAuth = async (options, callbackRedirect) => {
  client = await createAuth0Client({
    ...options,
  });

  try {
    // If the user is returning to the app after authentication

    if (
      window.location.search.includes("code=") &&
      window.location.search.includes("state=")
    ) {
      // handle the redirect and retrieve tokens
      const { appState } = await client.handleRedirectCallback();
      state.error = null;

      // Notify subscribers that the redirect callback has happened, passing the appState
      // (useful for retrieving any pre-authentication state)
      callbackRedirect(appState);
    }
  } catch (e) {
    state.error = e;
  } finally {
    // Initialize our internal authentication state
    state.isAuthenticated = await client.isAuthenticated();
    state.user = await client.getUser();

    // if (state.user)
    //   try {
    //     await axios.post("/api/createUser", state.user);
    //   } catch (error) {
    //     console.log(error.response.data.message);
    //   }
    state.loading = false;
  }

  return {
    authPlugin,
    install: (app) => {
      app.config.globalProperties.$auth = authPlugin;
    },
  };
};
