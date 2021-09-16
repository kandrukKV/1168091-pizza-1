<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="(type, idx) in doughTypes"
          :key="type.id"
          class="dough__input"
          :class="`dough__input--${DOUGH_TYPE[type.name]}`"
        >
          <input
            type="radio"
            name="dought"
            value="light"
            class="visually-hidden"
            :checked="idx === 0"
          />
          <b>{{ type.name }}</b>
          <span>{{ type.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { DOUGH_TYPE } from "../../common/constants";

export default {
  name: `BuilderDoughSelector`,
  props: {
    doughTypes: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      DOUGH_TYPE,
    };
  },
};
</script>
