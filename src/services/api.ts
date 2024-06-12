import axios from "axios";

const api = axios.create({
  baseURL: "https://pocketpdm.ocdev.debug.app.br",
});

export default api;
