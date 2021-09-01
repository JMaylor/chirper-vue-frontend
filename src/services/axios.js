import axios from 'axios';
import store from "../store";

const instance = axios.create({
  baseURL: '/api/',
  timeout: 30000
})

instance.interceptors.request.use(async config => {
  const token = await store.state.auth.getTokenSilently();
  config.headers.Authorization = `Bearer ${token}`
  return config
})

export default instance