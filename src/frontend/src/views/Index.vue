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
          @clickBtnMakePizza="addPizzaToCard"
        />
      </div>
    </form>
  </main>
</template>

<script>
import { uniqueId } from "lodash";
import BuilderDoughSelector from "../modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/BuilderPizzaView";
import { mapState, mapMutations, mapGetters } from "vuex";
import {
  SET_DEFAULT_CURRENT_PIZZA,
  SET_CURRENT_PIZZA,
  SET_CURRENT_DOUGH_TYPE,
  SET_CURRENT_PIZZA_NAME,
  SET_CURRENT_SAUCE,
  SET_CURRENT_SIZE,
  INC_INGREDIENT_COUNT_BY_ID,
  DEC_INGREDIENT_COUNT_BY_ID,
  ADD_PIZZA_TO_PIZZA_LIST,
} from "../store/mutations-types";

export default {
  name: `IndexHome`,
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  created() {
    const { id } = this.$route.query;
    if (id) {
      const currentPizza = this.getPizzaById(id);
      if (currentPizza) {
        this.SET_CURRENT_PIZZA(currentPizza.params);
        return;
      }
    }
    this.SET_DEFAULT_CURRENT_PIZZA(this.pizza);
  },
  computed: {
    ...mapState("builder", ["currentPizzaParams"]),
    ...mapState(["pizza"]),
    ...mapGetters("cart", ["getPizzaById"]),
    ingredientsPrice() {
      return this.currentPizzaParams.ingredients.reduce((acc, val) => {
        return acc + val.count * val.price;
      }, 0);
    },
    totalPrice() {
      const { doughType, size, sauce } = this.currentPizzaParams;
      const { multiplier } = this.pizza.sizes.find(
        (item) => item.name === size
      );
      const { price: doughPrice } = this.pizza.dough.find(
        (item) => item.name === doughType
      );
      const { price: saucePrice } = this.pizza.sauces.find(
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
    ...mapMutations("builder", [
      SET_DEFAULT_CURRENT_PIZZA,
      SET_CURRENT_PIZZA,
      SET_CURRENT_DOUGH_TYPE,
      SET_CURRENT_SAUCE,
      SET_CURRENT_SIZE,
      SET_CURRENT_PIZZA_NAME,
      INC_INGREDIENT_COUNT_BY_ID,
      DEC_INGREDIENT_COUNT_BY_ID,
    ]),
    ...mapMutations("cart", [ADD_PIZZA_TO_PIZZA_LIST]),
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
    addPizzaToCard() {
      if (!this.currentPizzaParams.id) {
        this.currentPizzaParams.id = uniqueId();
        this.currentPizzaParams.count = 1;
      }
      this.ADD_PIZZA_TO_PIZZA_LIST({
        params: this.currentPizzaParams,
        totalPrice: this.totalPrice,
      });
      this.SET_DEFAULT_CURRENT_PIZZA(this.pizza);
    },
  },
};
</script>
