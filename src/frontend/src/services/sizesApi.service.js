import { ReadOnlyApiService } from "./api.service";

export class SizesApiService extends ReadOnlyApiService {
  constructor() {
    super("sizes");
  }

  async getList(config = {}) {
    const sizes = await super.getList(config);
    return sizes.slice(3, 6);
  }
}
