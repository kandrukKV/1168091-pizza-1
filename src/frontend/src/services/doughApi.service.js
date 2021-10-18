import { ReadOnlyApiService } from "./api.service";

export class DoughApiService extends ReadOnlyApiService {
  constructor() {
    super("dough");
  }

  async getList(config = {}) {
    const dough = await super.getList(config);
    return dough.slice(0, 2);
  }
}
