import { apiProvider } from "./provider";

// Base class for API calls
export class ApiCore {
  constructor(options) {
    this.url = options.url;
    if (options.getAll) {
      this.getAll = () => {
        return apiProvider.getAll(options.url);
      };
    }

    if (options.getSingle) {
      this.getSingle = (id) => {
        return apiProvider.getSingle(options.url, id);
      };
    }

    if (options.post) {
      this.post = (data) => {
        return apiProvider.post(this.url, data);
      };
    }

    if (options.put) {
      this.put = (data) => {
        return apiProvider.put(options.url, data);
      };
    }

    if (options.remove) {
      this.remove = (id) => {
        return apiProvider.remove(options.url, id);
      };
    }
  }
}
