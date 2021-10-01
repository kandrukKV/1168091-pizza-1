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
          <li>{{ currentPizza.size }}, на тонком тесте</li>
          <li>Соус: {{ sauce }}</li>
          <li>Начинка: {{ ingredients }}</li>
        </ul>
      </div>
    </div>

    <div class="counter cart-list__counter">
      <button type="button" class="counter__button counter__button--minus">
        <span class="visually-hidden">Меньше</span>
      </button>
      <input
        type="text"
        name="counter"
        class="counter__input"
        :value="pizza.count"
      />
      <button
        type="button"
        class="counter__button counter__button--plus counter__button--orange"
      >
        <span class="visually-hidden">Больше</span>
      </button>
    </div>

    <div class="cart-list__price">
      <b>{{ pizza.totalPrice }} ₽</b>
    </div>

    <div class="cart-list__button">
      <button
        type="button"
        class="cart-list__edit"
        @click="clickChangeBtnHandler(pizza.id)"
      >
        Изменить
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "CartPizzaItem",
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
    ingredients() {
      const { ingredients } = this.currentPizza;
      const filteredIngredient = ingredients.filter((item) => item.count > 0);
      return filteredIngredient
        .map((item) => {
          return item.name.toLowerCase();
        })
        .join(", ");
    },
  },
  methods: {
    clickChangeBtnHandler(id) {
      this.$emit("changePizza", id);
    },
  },
};
</script>
