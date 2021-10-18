import Vue from "vue";
import Vuex from "vuex";
import VuexPlugins from "../plugins/vuexPlugins";

import modules from "./modules";
import { SET_PIZZA_PARAMS } from "./mutations-types";
import user from "../static/user.json";

Vue.use(Vuex);

const state = {
  pizza: null,
  user,
};

const actions = {
  async initialApp({ dispatch, state }) {
    await dispatch("fetchPizzaParams");
    await dispatch("builder/setDefaultCurrentPizza", state.pizza);
    await dispatch("cart/fetchAllAdditionProducts");
  },
  async fetchPizzaParams({ commit }) {
    Promise.all([
      await this.$api.dough.getList(),
      await this.$api.ingredients.getList(),
      await this.$api.sauces.getList(),
      await this.$api.sizes.getList(),
    ])
      .then(([dough, ingredients, sauces, sizes]) => {
        commit(SET_PIZZA_PARAMS, {
          dough,
          ingredients,
          sauces,
          sizes,
        });
      })
      .catch(() => {
        console.log("Ошибка при инициализации приложения");
      });

    // const misc = await this.$api.misc.getList();
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
  plugins: [VuexPlugins],
  modules,
});
