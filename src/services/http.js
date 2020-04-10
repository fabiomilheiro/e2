import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  if (error.response && error.response.status >= 500) {
    toast.error("An error occurred.", error);
  } else if (!error.response) {
    toast.error(
      `Could not reach the server on the address ${error.config.url}.`
    );
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
};
