<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="type in doughTypes"
          :key="type.id"
          class="dough__input"
          :class="`dough__input--${DOUGH_TYPE[type.name]}`"
        >
          <input
            type="radio"
            name="dought"
            :value="type.name"
            class="visually-hidden"
            :checked="DOUGH_TYPE[type.name] === DOUGH_TYPE[currentDoughType]"
            @change="changeTypeHandler"
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
      required: true,
    },
    currentDoughType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      DOUGH_TYPE,
    };
  },
  methods: {
    changeTypeHandler(evt) {
      this.$emit("setDoughType", evt.target.value);
    },
  },
};
</script>
