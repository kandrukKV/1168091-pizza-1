import {
  getIngredientsWithNewCount,
  adaptIngredients,
} from "../../common/helpers";
import {
  SET_DEFAULT_CURRENT_PIZZA,
  SET_CURRENT_PIZZA,
  SET_CURRENT_PIZZA_NAME,
  SET_CURRENT_DOUGH_TYPE,
  SET_CURRENT_SAUCE,
  SET_CURRENT_SIZE,
  INC_INGREDIENT_COUNT_BY_ID,
  DEC_INGREDIENT_COUNT_BY_ID,
} from "../mutations-types";

const getDefaultPizzaParams = (pizza) => {
  return {
    id: null,
    pizzaName: "",
    doughType: pizza.dough[0].name,
    size: pizza.sizes[1].name,
    sauce: pizza.sauces[0].name,
    ingredients: adaptIngredients(pizza.ingredients.slice()),
    count: null,
  };
};

export default {
  namespaced: true,
  state: {
    currentPizzaParams: null,
  },
  actions: {
    setDefaultCurrentPizza({ commit }, pizzaParams) {
      commit(SET_DEFAULT_CURRENT_PIZZA, pizzaParams);
    },
  },
  mutations: {
    [SET_DEFAULT_CURRENT_PIZZA](state, pizzaParams) {
      state.currentPizzaParams = getDefaultPizzaParams(pizzaParams);
    },
    [SET_CURRENT_PIZZA](state, pizza) {
      state.currentPizzaParams = pizza;
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
};
