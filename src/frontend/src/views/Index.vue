<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <template v-if="showBuilder">
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
            :totalPrice="getTotalPizzaPrice"
            :pizzaName="currentPizzaParams.pizzaName"
            :isDisabledPrepareBtn="isDisabledPrepareBtn"
            @changePizzaValue="changePizzaValue"
            @dropIngredient="incIngredientCount"
            @clickBtnMakePizza="addPizzaToCard"
          />
        </template>
        <h5 v-else>Loading...</h5>
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
        this.setCurrentPizza(currentPizza.params);
        return;
      }
    }
    if (this.pizza) {
      this.setDefaultCurrentPizza(this.pizza);
    }
  },
  computed: {
    ...mapState("builder", ["currentPizzaParams"]),
    ...mapState(["pizza"]),
    ...mapGetters("cart", ["getPizzaById"]),
    ...mapGetters("builder", ["getIngredientsPrice", "getTotalPizzaPrice"]),
    isDisabledPrepareBtn() {
      return (
        this.getIngredientsPrice === 0 ||
        this.currentPizzaParams.pizzaName === ""
      );
    },
    showBuilder() {
      return this.pizza && this.currentPizzaParams;
    },
  },
  methods: {
    ...mapMutations("builder", {
      setCurrentPizza: SET_CURRENT_PIZZA,
      setDefaultCurrentPizza: SET_DEFAULT_CURRENT_PIZZA,
      setCurrentDoughType: SET_CURRENT_DOUGH_TYPE,
      setCurrentSauce: SET_CURRENT_SAUCE,
      setCurrentSize: SET_CURRENT_SIZE,
      incIngredientCount: INC_INGREDIENT_COUNT_BY_ID,
      decIngredientCount: DEC_INGREDIENT_COUNT_BY_ID,
      changePizzaValue: SET_CURRENT_PIZZA_NAME,
    }),
    ...mapMutations("cart", {
      addPizzaToPizzaList: ADD_PIZZA_TO_PIZZA_LIST,
    }),
    addPizzaToCard() {
      if (!this.currentPizzaParams.id) {
        this.currentPizzaParams.id = uniqueId();
        this.currentPizzaParams.count = 1;
      }
      this.addPizzaToPizzaList({
        params: this.currentPizzaParams,
        totalPrice: this.getTotalPizzaPrice,
      });
      this.setDefaultCurrentPizza(this.pizza);
    },
  },
};
</script>
