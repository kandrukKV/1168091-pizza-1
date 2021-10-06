<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size in sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.name}`"
        >
          <input
            type="radio"
            name="diameter"
            :value="size.name"
            class="visually-hidden"
            :checked="currentSize === size.name"
            @change="changeSizeHandler"
          />

          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
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
  methods: {
    changeSizeHandler(env) {
      this.$emit("setSize", env.target.value);
    },
  },
};
</script>
