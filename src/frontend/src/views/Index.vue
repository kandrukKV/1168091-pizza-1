<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector
          :dough-types="pizza.dough"
          :currentDoughType="currentPizzaParams.doughType"
          @setDoughType="setCurrentDoughType"
        />

        <BuilderSizeSelector
          :sizes="pizza.sizes"
          :current-size="currentPizzaParams.size"
          @setSize="setCurrentSize"
        />

        <BuilderIngredientsSelector
          :sauces="pizza.sauces"
          :current-sauce="currentPizzaParams.sauce"
          :current-ingredients="currentPizzaParams.ingredients"
          @changeCurrentSauce="setCurrentSauce"
          @incIngredientCount="incIngredientCount"
          @decIngredientCount="decIngredientCount"
        />
        <BuilderPizzaView
          :current-pizza-params="currentPizzaParams"
          :totalPrice="totalPrice"
          :pizzaName="currentPizzaParams.pizzaName"
          :isDisabledPrepareBtn="isDisabledPrepareBtn"
          @changePizzaValue="changePizzaValue"
          @addIngredient="incIngredientCount"
        />
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "../static/pizza.json";
import BuilderDoughSelector from "../modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/BuilderPizzaView";
import { mapActions, mapState, mapMutations } from "vuex";
import {
  SET_CURRENT_DOUGH_TYPE,
  SET_CURRENT_PIZZA_NAME,
  SET_CURRENT_SAUCE,
  SET_CURRENT_SIZE,
  INC_INGREDIENT_COUNT_BY_ID,
  DEC_INGREDIENT_COUNT_BY_ID,
} from "../store/mutations-types";

export default {
  name: `IndexHome`,
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  async created() {
    await this.fetchPizzaParams();
  },
  computed: {
    ...mapState("builder", ["pizza", "currentPizzaParams"]),
    ingredientsPrice() {
      return this.currentPizzaParams.ingredients.reduce((acc, val) => {
        return acc + val.count * val.price;
      }, 0);
    },
    totalPrice() {
      const { doughType, size, sauce } = this.currentPizzaParams;
      const { multiplier } = pizza.sizes.find((item) => item.name === size);
      const { price: doughPrice } = pizza.dough.find(
        (item) => item.name === doughType
      );
      const { price: saucePrice } = pizza.sauces.find(
        (item) => item.name === sauce
      );

      return multiplier * (doughPrice + saucePrice + this.ingredientsPrice);
    },
    isDisabledPrepareBtn() {
      return (
        this.ingredientsPrice === 0 || this.currentPizzaParams.pizzaName === ""
      );
    },
  },
  methods: {
    ...mapActions("builder", ["fetchPizzaParams"]),
    ...mapMutations("builder", [
      SET_CURRENT_DOUGH_TYPE,
      SET_CURRENT_SAUCE,
      SET_CURRENT_SIZE,
      SET_CURRENT_PIZZA_NAME,
      INC_INGREDIENT_COUNT_BY_ID,
      DEC_INGREDIENT_COUNT_BY_ID,
    ]),
    setCurrentDoughType(doughType) {
      this.SET_CURRENT_DOUGH_TYPE(doughType);
    },
    setCurrentSauce(sauceName) {
      this.SET_CURRENT_SAUCE(sauceName);
    },
    setCurrentSize(size) {
      this.SET_CURRENT_SIZE(size);
    },
    incIngredientCount(id) {
      this.INC_INGREDIENT_COUNT_BY_ID(id);
    },
    decIngredientCount(id) {
      this.DEC_INGREDIENT_COUNT_BY_ID(id);
    },
    changePizzaValue(pizzaName) {
      this.SET_CURRENT_PIZZA_NAME(pizzaName);
    },
  },
};
</script>
