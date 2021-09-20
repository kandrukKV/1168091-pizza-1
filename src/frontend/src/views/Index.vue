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
import { adaptIngredients, setIngredientCount } from "../common/helpers";

export default {
  name: `IndexHome`,
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      pizza,
      currentPizzaParams: {
        pizzaName: "",
        doughType: pizza.dough[0].name,
        size: pizza.sizes[1].name,
        sauce: pizza.sauces[0].name,
        ingredients: adaptIngredients(pizza.ingredients),
      },
    };
  },
  computed: {
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
      const total =
        multiplier * (doughPrice + saucePrice + this.ingredientsPrice);

      return total;
    },
    isDisabledPrepareBtn() {
      return (
        this.ingredientsPrice === 0 || this.currentPizzaParams.pizzaName === ""
      );
    },
  },
  methods: {
    setCurrentDoughType(doughType) {
      this.currentPizzaParams.doughType = doughType;
    },
    setCurrentSauce(sauceName) {
      this.currentPizzaParams.sauce = sauceName;
    },
    setCurrentSize(size) {
      this.currentPizzaParams.size = size;
    },
    incIngredientCount(id) {
      const { ingredients } = this.currentPizzaParams;
      const idx = this.currentPizzaParams.ingredients.findIndex(
        (item) => item.id === id
      );
      const count = ingredients[idx].count + 1;
      this.currentPizzaParams.ingredients = setIngredientCount(
        ingredients,
        idx,
        count
      );
    },
    decIngredientCount(id) {
      const { ingredients } = this.currentPizzaParams;
      const idx = this.currentPizzaParams.ingredients.findIndex(
        (item) => item.id === id
      );
      const count = ingredients[idx].count - 1;
      this.currentPizzaParams.ingredients = setIngredientCount(
        ingredients,
        idx,
        count
      );
    },
    changePizzaValue(pizzaName) {
      this.currentPizzaParams.pizzaName = pizzaName;
    },
  },
};
</script>
