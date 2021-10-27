<template>
  <div class="sign-form__input">
    <label class="input">
      <span>{{ label }}</span>
      <input
        ref="input"
        :value="value"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :required="required"
        @input="$emit('input', $event.target.value)"
      />
    </label>
    <div v-if="showError" class="sign-form__error">{{ errorText }}</div>
  </div>
</template>

<script>
export default {
  name: "AppInput",
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorText: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showError() {
      return !!this.errorText;
    },
  },
};
</script>

<style scoped>
.sign-form__input {
  position: relative;
}
.sign-form__error {
  position: absolute;
  color: tomato;
  font-size: 10px;
}

.error input {
  border: 1px solid red;
}
</style>
