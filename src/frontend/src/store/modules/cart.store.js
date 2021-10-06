import allAdditionJson from "../../static/misc.json";
import { cloneDeep } from "lodash";
import {
  SET_ALL_ADDITION_PRODUCTS,
  ADD_PIZZA_TO_PIZZA_LIST,
  SET_COUNT_OF_PIZZA,
} from "../mutations-types";

export default {
  namespaced: true,
  state: {
    pizzaList: [],
    additionalList: [],
  },
  getters: {
    getPizzaById: (state) => (id) => {
      return state.pizzaList.find((item) => item.params.id === id);
    },
  },
  mutations: {
    [SET_ALL_ADDITION_PRODUCTS](state, products) {
      state.additionalList = products;
    },
    [ADD_PIZZA_TO_PIZZA_LIST](state, newPizza) {
      const { id } = newPizza.params;
      const idx = state.pizzaList.findIndex((item) => item.params.id === id);
      if (idx > -1) {
        state.pizzaList = [
          ...state.pizzaList.slice(0, idx),
          newPizza,
          ...state.pizzaList.slice(idx + 1),
        ];
      } else {
        state.pizzaList.push(newPizza);
      }
    },
    [SET_COUNT_OF_PIZZA](state, payload) {
      const { pizzaList } = state;
      const { id, count } = payload;
      const idx = pizzaList.findIndex((item) => item.params.id === id);
      const newPizzaItem = cloneDeep(pizzaList[idx]);
      newPizzaItem.params.count = count;
      state.pizzaList = [
        ...pizzaList.slice(0, idx),
        newPizzaItem,
        ...pizzaList.slice(idx + 1),
      ];
    },
  },
  actions: {
    async fetchAllAdditionProducts({ commit }) {
      const allAdditionProducts = await allAdditionJson;

      commit(SET_ALL_ADDITION_PRODUCTS, allAdditionProducts);
    },
  },
};
