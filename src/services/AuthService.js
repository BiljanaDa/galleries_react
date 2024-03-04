import HttpService from "./HttpService";

class AuthService extends HttpService {
  register = async (userData) => {
    const { data } = await this.client.post("/register", userData);
    localStorage.setItem("token", data.token);
    return data;
  };
  login = async (credentials) => {
    const { data } = await this.client.post("/login", credentials);
    localStorage.setItem("token", data.token);
    return data;
  };
  logout = async () => {
    await this.client.post("/logout");
    localStorage.removeItem("token");
  };
  getActiveUser = async () => {
    const { data } = await this.client.get("/me");
    return data;
  };
  getAuthor = async (id) => {
    const { data } = await this.client.get(`/profile/${id}`);

    return data;
  };
}

export default new AuthService();
