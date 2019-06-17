import axios from "axios";
import { API_SERVER_DOMAIN } from "../config/server";

export default axios.create({
  baseURL: API_SERVER_DOMAIN + "/api/",
});
