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
        <BuilderPizzaView :current-pizza-params="currentPizzaParams" />
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
        doughType: `light`,
        size: `normal`,
        sauce: `tomato`,
        ingredients: adaptIngredients(pizza.ingredients),
      },
    };
  },
  computed: {},
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
  },
};
</script>
