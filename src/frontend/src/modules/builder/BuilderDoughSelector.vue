<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>
      <div class="sheet__content dough">
        <label
          v-for="{ id, name, description } in doughTypes"
          :key="id"
          class="dough__input"
          :class="`dough__input--${getDoughType(name)}`"
        >
          <input
            type="radio"
            name="dough"
            :value="name"
            class="visually-hidden"
            :checked="getDoughType(name) === getDoughType(currentDoughType)"
            @change="changeTypeHandler"
          />
          <b>{{ name }}</b>
          <span>{{ description }}</span>
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
  methods: {
    getDoughType(typeName) {
      return DOUGH_TYPE[typeName];
    },
    changeTypeHandler(evt) {
      this.$emit("setDoughType", evt.target.value);
    },
  },
};
</script>
