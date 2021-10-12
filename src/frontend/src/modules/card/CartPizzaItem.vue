<template>
  <li class="cart-list__item">
    <div class="product cart-list__product">
      <img
        src="../../assets/img/product.svg"
        class="product__img"
        width="56"
        height="56"
        :alt="currentPizza.pizzaName"
      />
      <div class="product__text">
        <h2>{{ currentPizza.pizzaName }}</h2>
        <ul>
          <li>{{ currentPizza.size }}, на {{ dough }} тесте</li>
          <li>Соус: {{ sauce }}</li>
          <li>Начинка: {{ ingredients }}</li>
        </ul>
      </div>
    </div>

    <CartCounter
      class="cart-list__counter"
      :count="currentPizza.count"
      :id="currentPizza.id"
      @changeCounter="changeCounterHandler"
    />

    <div class="cart-list__price">
      <b>{{ price }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="clickChangeBtnHandler(currentPizza.id)"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
import { DOUGH_NAME_FOR_CART } from "../../common/constants";
import CartCounter from "./CartCounter";

export default {
  name: "CartPizzaItem",
  components: { CartCounter },
  props: {
    pizza: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentPizza() {
      return this.pizza.params;
    },
    sauce() {
      return this.currentPizza.sauce.toLowerCase();
    },
    dough() {
      return DOUGH_NAME_FOR_CART[this.currentPizza.doughType];
    },
    ingredients() {
      const { ingredients } = this.currentPizza;
      const filteredIngredient = ingredients.filter(({ count }) => count > 0);
      return filteredIngredient
        .map(({ name }) => name.toLowerCase())
        .join(", ");
    },
    price() {
      return this.pizza.totalPrice * this.currentPizza.count;
    },
  },
  methods: {
    clickChangeBtnHandler(id) {
      this.$emit("changePizza", id);
    },
    changeCounterHandler(newValue) {
      this.$emit("changeCounter", newValue);
    },
  },
};
</script>
