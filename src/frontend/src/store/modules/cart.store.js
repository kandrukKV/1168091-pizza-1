import allAdditionJson from "../../static/misc.json";
import {
  SET_ALL_ADDITION_PRODUCTS,
  ADD_PIZZA_TO_PIZZA_LIST,
} from "../mutations-types";

export default {
  namespaced: true,
  state: {
    pizzaList: [],
    currentAdditionalList: [],
  },
  mutations: {
    [SET_ALL_ADDITION_PRODUCTS](state, products) {
      state.currentAdditionalList = products;
    },
    [ADD_PIZZA_TO_PIZZA_LIST](state, newPizza) {
      state.pizzaList.push(newPizza);
    },
  },
  actions: {
    async fetchAllAdditionProducts({ commit }) {
      const allAdditionProducts = allAdditionJson;
      commit(SET_ALL_ADDITION_PRODUCTS, allAdditionProducts);
    },
  },
};
