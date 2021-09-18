<template>
  <li class="ingredients__item">
    <span class="filling" :class="`filling--${STUFFING[stuffing.name]}`">
      {{ stuffing.name }}
    </span>
    <RadioButton :count="stuffing.count" />
  </li>
</template>

<script>
import RadioButton from "../../common/components/RadioButton";
import { STUFFING } from "../../common/constants";
export default {
  name: `BuilderStuffingSelector`,
  components: {
    RadioButton,
  },
  props: {
    stuffing: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      STUFFING,
    };
  },
};
</script>
