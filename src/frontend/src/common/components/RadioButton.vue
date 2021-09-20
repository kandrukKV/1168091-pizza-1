<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isBtnMinusDisabled"
      @click="decCountHandler"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      :value="count"
      disabled
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="isBtnPlusDisabled"
      @click="incCountHandler"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { IngredientCount } from "../constants";
export default {
  name: `RadioButton`,
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isBtnPlusDisabled() {
      return this.count >= IngredientCount.MAX;
    },
    isBtnMinusDisabled() {
      return this.count <= IngredientCount.MIN;
    },
  },
  methods: {
    incCountHandler() {
      this.$emit("incCount");
    },
    decCountHandler() {
      this.$emit("decCount");
    },
  },
};
</script>

<style scoped></style>
