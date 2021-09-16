<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="(sauce, idx) in sauces"
            :key="sauce.name"
            class="radio ingredients__input"
          >
            <input
              type="radio"
              name="sauce"
              :value="SAUCE[sauce.name]"
              :checked="idx === 0"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <span
                class="filling"
                :class="`filling--${INGREDIENT[ingredient.name]}`"
              >
                {{ ingredient.name }}
              </span>
              <RadioButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { INGREDIENT, SAUCE } from "../../common/constants";
import RadioButton from "../../common/components/RadioButton";
export default {
  name: `BuilderIngredientSelector`,
  components: {
    RadioButton,
  },
  props: {
    sauces: {
      type: Array,
      require: true,
    },
    ingredients: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      INGREDIENT,
      SAUCE,
    };
  },
};
</script>

<style scoped></style>
