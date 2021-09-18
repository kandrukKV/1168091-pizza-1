<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__filling">
          <BuilderSauceSelector
            :current-sauce="currentSauce"
            :sauces="sauces"
            @setSauce="setSauceHandler"
          />
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <BuilderOneIngredientSelector
              v-for="item in currentIngredients"
              :key="item.id"
              :ingredient="item"
              @incIngredientCount="incIngredientCount"
              @decIngredientCount="decIngredientCount"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSauceSelector from "./BuilderSauceSelector";
import BuilderOneIngredientSelector from "./BuilderOneIngredientSelector";
export default {
  name: `BuilderIngredientSelector`,
  components: {
    BuilderSauceSelector,
    BuilderOneIngredientSelector,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    currentSauce: {
      type: String,
      required: true,
    },
    currentIngredients: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    setSauceHandler(sauceName) {
      this.$emit("changeCurrentSauce", sauceName);
    },
    incIngredientCount(id) {
      this.$emit("incIngredientCount", id);
    },
    decIngredientCount(id) {
      this.$emit("decIngredientCount", id);
    },
  },
};
</script>
