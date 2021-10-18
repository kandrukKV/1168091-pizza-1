import { ReadOnlyApiService } from "./api.service";

export class SaucesApiService extends ReadOnlyApiService {
  constructor() {
    super("sauces");
  }

  async getList(config = {}) {
    const sauces = await super.getList(config);
    return sauces.slice(0, 2);
  }
}
