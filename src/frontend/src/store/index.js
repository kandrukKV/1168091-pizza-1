import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";
import pizzaJson from "../static/pizza.json";
import { SET_PIZZA_PARAMS } from "./mutations-types";

Vue.use(Vuex);

const state = {
  pizza: null,
};

const actions = {
  async initialApp({ dispatch }) {
    const pizzaParams = await dispatch("fetchPizzaParams");
    dispatch("builder/setDefaultCurrentPizza", pizzaParams);
  },
  async fetchPizzaParams({ commit }) {
    const pizzaParams = await pizzaJson;
    commit(SET_PIZZA_PARAMS, pizzaParams);
    return await pizzaJson;
  },
};

const mutations = {
  [SET_PIZZA_PARAMS](state, params) {
    state.pizza = params;
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules,
});
