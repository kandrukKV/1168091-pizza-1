<template>
  <li class="additional-list__item sheet">
    <p class="additional-list__description">
      <img :src="item.image" width="39" height="60" :alt="item.name" />
      <span>{{ item.name }}</span>
    </p>

    <div class="additional-list__wrapper">
      <CartCounter
        class="additional-list__counter"
        :id="item.id"
        :count="item.count"
        @changeCounter="changeCounterHandler"
      />
      <div class="additional-list__price">
        <b>× {{ price }} ₽</b>
      </div>
    </div>
  </li>
</template>

<script>
import CartCounter from "./CartCounter";
export default {
  name: "CartAdditionItem",
  components: { CartCounter },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return this.item.count * this.item.price;
    },
  },
  methods: {
    changeCounterHandler(count) {
      this.$emit("changeAdditionCounter", count);
    },
  },
};
</script>
