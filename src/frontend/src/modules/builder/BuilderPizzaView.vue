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
              v-for="{ id, name, count } in ingredients"
              :key="id"
              class="pizza__filling"
              :class="getAdditionClass({ count, name })"
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
    getAdditionClass({ count, name }) {
      let countClass = "";

      if (count === 2) {
        countClass = `pizza__filling--second`;
      }
      if (count === 3) {
        countClass = `pizza__filling--third`;
      }
      return `pizza__filling--${INGREDIENT[name]} ${countClass}`;
    },
    changePizzaNameHandler(evt) {
      this.$emit("changePizzaValue", evt.target.value);
    },
    dropIngredientHandler({ id }) {
      this.$emit("dropIngredient", id);
    },
    clickBtnMakePizzaHandler() {
      this.$emit("clickBtnMakePizza");
    },
  },
};
</script>
