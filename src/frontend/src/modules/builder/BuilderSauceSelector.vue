<template>
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
</template>

<script>
import { SAUCE } from "../../common/constants";
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
  data() {
    return {
      SAUCE,
    };
  },
};
</script>
