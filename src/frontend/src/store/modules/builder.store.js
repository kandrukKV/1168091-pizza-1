import pizzaJson from "../../static/pizza.json";
import { getIngredientsWithNewCount } from "../../common/helpers";
import {
  SET_PIZZA_PARAMS,
  SET_CURRENT_PIZZA_NAME,
  SET_CURRENT_DOUGH_TYPE,
  SET_CURRENT_SAUCE,
  SET_CURRENT_SIZE,
  INC_INGREDIENT_COUNT_BY_ID,
  DEC_INGREDIENT_COUNT_BY_ID,
} from "../mutations-types";
import { adaptIngredients } from "../../common/helpers";

// const entity = "builder";
// const module = capitalize(entity);
// const namespace = { entity, module };

export default {
  namespaced: true,
  state: {
    pizza: null,
    currentPizzaParams: {
      pizzaName: "",
      doughType: null,
      size: null,
      sauce: null,
      ingredients: null,
    },
  },
  mutations: {
    [SET_PIZZA_PARAMS](state, pizzaParams) {
      state.pizza = pizzaParams;
      state.currentPizzaParams = {
        pizzaName: "",
        doughType: pizzaParams.dough[0].name,
        size: pizzaParams.sizes[1].name,
        sauce: pizzaParams.sauces[0].name,
        ingredients: adaptIngredients(pizzaParams.ingredients.slice()),
      };
    },
    [SET_CURRENT_PIZZA_NAME](state, name) {
      state.currentPizzaParams.pizzaName = name;
    },
    [SET_CURRENT_DOUGH_TYPE](state, doughType) {
      state.currentPizzaParams.doughType = doughType;
    },
    [SET_CURRENT_SAUCE](state, sauce) {
      state.currentPizzaParams.sauce = sauce;
    },
    [SET_CURRENT_SIZE](state, size) {
      state.currentPizzaParams.size = size;
    },
    [INC_INGREDIENT_COUNT_BY_ID](state, id) {
      const { ingredients } = state.currentPizzaParams;
      const idx = ingredients.findIndex((item) => item.id === id);
      const count = ingredients[idx].count + 1;
      state.currentPizzaParams.ingredients = getIngredientsWithNewCount(
        ingredients,
        idx,
        count
      );
    },
    [DEC_INGREDIENT_COUNT_BY_ID](state, id) {
      const { ingredients } = state.currentPizzaParams;
      const idx = ingredients.findIndex((item) => item.id === id);
      const count = ingredients[idx].count - 1;
      state.currentPizzaParams.ingredients = getIngredientsWithNewCount(
        ingredients,
        idx,
        count
      );
    },
  },
  actions: {
    async fetchPizzaParams({ commit }) {
      const pizzaParams = pizzaJson;
      commit(SET_PIZZA_PARAMS, pizzaParams);
    },
  },
};
