<template>
  <div>
    <span
      class="filling"
      :class="`filling--${getIngredientClass(ingredient.name)}`"
    >
      {{ ingredient.name }}
    </span>
    <RadioButton
      :count="ingredient.count"
      @incCount="incIngredientCountHandler(ingredient.id)"
      @decCount="decIngredientCountHandler(ingredient.id)"
    />
  </div>
</template>

<script>
import RadioButton from "../../common/components/RadioButton";
import { INGREDIENT } from "../../common/constants";
export default {
  name: `BuilderStuffingSelector`,
  components: {
    RadioButton,
  },
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getIngredientClass(ingredientName) {
      return INGREDIENT[ingredientName];
    },
    incIngredientCountHandler(id) {
      this.$emit("incIngredientCount", id);
    },
    decIngredientCountHandler(id) {
      this.$emit("decIngredientCount", id);
    },
  },
};
</script>
