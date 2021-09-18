<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${PIZZA_SIZE[size.name]}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="PIZZA_SIZE[size.name]"
            class="visually-hidden"
            :checked="currentSize === PIZZA_SIZE[size.name]"
            @change="changeSizeHandler"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { PIZZA_SIZE } from "../../common/constants";

export default {
  name: `BuilderSizeSelectors`,
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    currentSize: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      PIZZA_SIZE,
    };
  },
  methods: {
    changeSizeHandler(env) {
      this.$emit("setSize", env.target.value);
    },
  },
};
</script>
