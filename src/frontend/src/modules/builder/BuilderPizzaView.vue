<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="pizzaName"
        @input="changePizzaNameHandler"
      />
    </label>

    <AppDrop @drop="dropIngredientHandler">
      <div class="content__constructor">
        <div
          class="pizza"
          :class="`pizza--foundation--${doughTypeClass}-${sauceClass}`"
        >
          <div class="pizza__wrapper">
            <div
              v-for="item in ingredients"
              :key="item.id"
              class="pizza__filling"
              :class="`pizza__filling--${
                INGREDIENT[item.name]
              }${getAdditionClass(item.count)}`"
            />
          </div>
        </div>
      </div>
    </AppDrop>

    <div class="content__result">
      <p>Итого: {{ totalPrice }} ₽</p>
      <button
        type="button"
        class="button"
        :disabled="isDisabledPrepareBtn"
        @click="clickBtnMakePizzaHandler"
      >
        Готовьте!
      </button>
    </div>
  </div>
</template>

<script>
import AppDrop from "../../common/components/AppDrop";
import {
  DOUGH_SIZE,
  INGREDIENT,
  DOUGH_TYPE,
  SAUCE,
} from "../../common/constants";
export default {
  name: `BuilderPizzaView`,
  components: {
    AppDrop,
  },
  props: {
    currentPizzaParams: {
      type: Object,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    pizzaName: {
      type: String,
      default: "",
    },
    isDisabledPrepareBtn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      INGREDIENT,
    };
  },
  computed: {
    ingredients() {
      const { ingredients } = this.currentPizzaParams;
      return ingredients.filter((item) => item.count > 0);
    },
    doughTypeClass() {
      const doughType = DOUGH_TYPE[this.currentPizzaParams.doughType];
      return DOUGH_SIZE[doughType];
    },
    sauceClass() {
      return SAUCE[this.currentPizzaParams.sauce];
    },
  },
  methods: {
    getAdditionClass(count) {
      if (count === 2) {
        return ` pizza__filling--second`;
      }
      if (count === 3) {
        return ` pizza__filling--third`;
      }
      return ``;
    },
    changePizzaNameHandler(evt) {
      this.$emit("changePizzaValue", evt.target.value);
    },
    dropIngredientHandler(ingredient) {
      this.$emit("addIngredient", ingredient.id);
    },
    clickBtnMakePizzaHandler() {
      this.$emit("clickBtnMakePizza");
    },
  },
};
</script>
