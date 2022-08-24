import { apiProvider } from "./utilities/provider";

export const authApi = {
  login: (credential) => {
    return apiProvider.post("login", credential);
  },
  register: (data) => {
    return apiProvider.post("register", data);
  },
};
