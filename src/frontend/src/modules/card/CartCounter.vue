<template>
  <div class="counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isDecCountBtnDisabled"
      @click="decCounterHandler"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input type="text" name="counter" class="counter__input" :value="count" />
    <button
      type="button"
      class="counter__button counter__button--plus counter__button--orange"
      @click="incCounterHandler"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "CartCounter",
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    isDecCountBtnDisabled() {
      return this.count <= 0;
    },
  },
  methods: {
    incCounterHandler() {
      this.$emit("changeCounter", {
        id: this.id,
        count: this.count + 1,
      });
    },
    decCounterHandler() {
      this.$emit("changeCounter", {
        id: this.id,
        count: this.count - 1,
      });
    },
  },
};
</script>
