<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
      v-for="{ name } in sauces"
      :key="name"
      class="radio ingredients__input"
    >
      <input
        type="radio"
        name="sauce"
        :value="name"
        :checked="currentSauce === name"
        @change="changeSauceHandler"
      />
      <span>{{ name }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: `BuilderSauceSelector`,
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    currentSauce: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeSauceHandler(evt) {
      this.$emit("setSauce", evt.target.value);
    },
  },
};
</script>
