import resources from "./enums/resources";
import { DoughApiService } from "../services/doughApi.service";
import { IngredientsApiService } from "../services/ingredientsApi.service";
import { MiscApiService } from "../services/miscApi.service";
import { SaucesApiService } from "../services/saucesApi.service";
import { SizesApiService } from "../services/sizesApi.service";
import { AuthApiService } from "../services/authApi.service";

export const createResources = () => {
  return {
    [resources.DOUGH]: new DoughApiService(resources.DOUGH),
    [resources.INGREDIENTS]: new IngredientsApiService(resources.INGREDIENTS),
    [resources.MISC]: new MiscApiService(resources.MISC),
    [resources.SAUCES]: new SaucesApiService(resources.SAUCES),
    [resources.SIZES]: new SizesApiService(resources.SIZES),
    [resources.AUTH]: new AuthApiService(),
  };
};

export const adaptIngredients = (stuffing) => {
  return stuffing.map((item) => {
    return {
      ...item,
      count: 0,
    };
  });
};

export const getIngredientsWithNewCount = (ingredients, idx, count) => {
  const oldItem = ingredients[idx];
  const newItem = {
    ...oldItem,
    count,
  };
  return [...ingredients.slice(0, idx), newItem, ...ingredients.slice(idx + 1)];
};

export const capitalize = (string) =>
  `${string.charAt(0).toUpperCase()}${string.slice(1)}`;

export const getView = (view) => {
  return () => import(`../views/${view}.vue`);
};
