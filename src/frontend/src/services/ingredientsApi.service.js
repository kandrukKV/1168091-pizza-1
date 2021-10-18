import { ReadOnlyApiService } from "./api.service";

export class IngredientsApiService extends ReadOnlyApiService {
  constructor() {
    super("ingredients");
  }

  async getList(config = {}) {
    const ingredients = await super.getList(config);
    return ingredients.slice(0, 15);
  }
}
