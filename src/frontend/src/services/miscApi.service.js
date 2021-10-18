import { ReadOnlyApiService } from "./api.service";

export class MiscApiService extends ReadOnlyApiService {
  constructor() {
    super("misc");
  }

  async getList(config = {}) {
    const misc = await super.getList(config);
    return misc.slice(0, 3);
  }
}
