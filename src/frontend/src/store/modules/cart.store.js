import allAdditionJson from "../../static/misc.json";
import {
  SET_ALL_ADDITION_PRODUCTS,
  ADD_PIZZA_TO_PIZZA_LIST,
  SET_COUNT_OF_PIZZA,
  SET_COUNT_OF_ADDITION_PRODUCT,
  SET_CURRENT_DELIVERY_TYPE,
  CLEAR_PIZZA_LIST,
} from "../mutations-types";
import { cloneDeep } from "lodash";
import { TypeOfDelivery } from "../../common/constants";

export default {
  namespaced: true,
  state: {
    pizzaList: [],
    additionalList: [],
    currentDeliveryType: TypeOfDelivery.GET_IT_MYSELF,
  },
  getters: {
    getPizzaById: (state) => (id) => {
      return state.pizzaList.find((item) => item.params.id === id);
    },
    getTotalPrice: (state) => {
      const pizzaPrice = state.pizzaList.reduce((acc, item) => {
        return acc + item.totalPrice * item.params.count;
      }, 0);
      const additionPrice = state.additionalList.reduce((acc, item) => {
        return acc + item.count * item.price;
      }, 0);
      return pizzaPrice + additionPrice;
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
    [SET_COUNT_OF_ADDITION_PRODUCT](state, payload) {
      const { additionalList } = state;
      const { id, count } = payload;
      const idx = additionalList.findIndex((item) => item.id === id);
      const newPizzaItem = cloneDeep(additionalList[idx]);
      newPizzaItem.count = count;
      state.additionalList = [
        ...additionalList.slice(0, idx),
        newPizzaItem,
        ...additionalList.slice(idx + 1),
      ];
    },
    [SET_CURRENT_DELIVERY_TYPE](state, payload) {
      state.currentDeliveryType = payload;
    },
    [CLEAR_PIZZA_LIST](state) {
      state.pizzaList = [];
    },
  },
  actions: {
    fetchAllAdditionProducts({ commit }) {
      const allAdditionProducts = allAdditionJson;
      const adaptAllAdditionProducts = allAdditionProducts.map((item) => {
        return {
          ...item,
          image: require(`../../assets/img/${item.image.substr(12)}`),
          count: 0,
        };
      });
      commit(SET_ALL_ADDITION_PRODUCTS, adaptAllAdditionProducts);
    },
  },
};
