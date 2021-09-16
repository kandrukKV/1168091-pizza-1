<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="(size, idx) in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${PIZZA_SIZE[size.name]}`"
        >
          <input
            type="radio"
            name="diameter"
            value="small"
            class="visually-hidden"
            :checked="idx === 1"
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
      require: true,
    },
  },
  data() {
    return {
      PIZZA_SIZE,
    };
  },
};
</script>
