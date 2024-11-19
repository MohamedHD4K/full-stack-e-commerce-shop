import axios from "axios";
import auth from "./auth";

axios.defaults.headers.common['Token'] = auth.getToken() || null;

const http = axios

export default http