import JwtService from "./jwt.service";
import axios from "../plugins/axios";

export class AuthApiService {
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  async getCurrentUser() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}
