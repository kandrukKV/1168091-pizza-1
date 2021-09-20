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
            <li
              v-for="item in currentIngredients"
              :key="item.id"
              class="ingredients__item"
            >
              <AppDrag
                :draggable="item.count < IngredientCount.MAX"
                :transfer-data="item"
              >
                <BuilderOneIngredientSelector
                  :ingredient="item"
                  @incIngredientCount="incIngredientCount"
                  @decIngredientCount="decIngredientCount"
                />
              </AppDrag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BuilderSauceSelector from "./BuilderSauceSelector";
import BuilderOneIngredientSelector from "./BuilderOneIngredientSelector";
import AppDrag from "../../common/components/AppDrag";
import { IngredientCount } from "../../common/constants";
export default {
  name: `BuilderIngredientSelector`,
  components: {
    BuilderSauceSelector,
    BuilderOneIngredientSelector,
    AppDrag,
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
    return {
      IngredientCount,
    };
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
