import { apiProvider } from "./utilities/provider";

export const userApi = {
  userInfo: () => {
    return apiProvider.getAll("user");
  },
  getFriends: (type) => {
    return apiProvider.getAll(`friends/?type=${type}`);
  },
  acceptRequest: (data) => {
    return apiProvider.post(`friends`, data);
  },
  declineRequest: (data) => {
    return apiProvider.post(`friends`, data);
  },
};
