<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>

    <div class="content__constructor">
      <div class="pizza pizza--foundation--small-tomato">
        <div class="pizza__wrapper">
          <div
            v-for="item in ingredients"
            :key="item"
            class="pizza__filling"
            :class="`pizza__filling--${item}`"
          />
        </div>
      </div>
    </div>

    <div class="content__result">
      <p>Итого: {{ total }} ₽</p>
      <button type="button" class="button" disabled>Готовьте!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: `BuilderPizzaView`,
  props: {
    ingredients: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    total() {
      return 0;
    },
  },
};
</script>
