import axios from 'axios';
import store from "../store";

axios.interceptors.request.use(async config => {
  const token = await store.state.auth.getTokenSilently();
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default axios