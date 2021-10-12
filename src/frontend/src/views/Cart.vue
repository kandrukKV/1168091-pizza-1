<template>
  <form @submit.prevent="submitHandler" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div v-if="isEmptyPizzaList" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <template v-else>
          <ul class="cart-list sheet">
            <CartPizzaItem
              v-for="pizza in pizzaList"
              :key="pizza.id"
              :pizza="pizza"
              @changePizza="editPizzaHandler"
              @changeCounter="changeCounterHandler"
            />
          </ul>

          <div class="cart__additional">
            <ul class="additional-list">
              <CartAdditionItem
                v-for="addition in additionalList"
                :key="addition.name"
                :item="addition"
                @changeAdditionCounter="changeAdditionCounterHandler"
              />
            </ul>
          </div>
          <div class="cart__form">
            <CardOrder :user="user" />
          </div>
        </template>
      </div>
    </main>
    <section v-if="!isEmptyPizzaList" class="footer">
      <div class="footer__more">
        <router-link
          :to="$options.Path.ROOT"
          class="button button--border button--arrow"
          >Хочу еще одну</router-link
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ getTotalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
    <CardPopup v-if="isOpenPopup" />
  </form>
</template>

<script>
import CartPizzaItem from "../modules/card/CartPizzaItem";
import CartAdditionItem from "../modules/card/CartAdditionItem";
import CardPopup from "../modules/card/CardPopup";
import CardOrder from "../modules/card/CardOrder";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import { Path } from "../common/constants";
import {
  SET_COUNT_OF_PIZZA,
  SET_COUNT_OF_ADDITION_PRODUCT,
  CLEAR_PIZZA_LIST,
} from "../store/mutations-types";

export default {
  name: "Cart",
  components: { CartPizzaItem, CartAdditionItem, CardOrder, CardPopup },
  Path,
  data() {
    return {
      isOpenPopup: false,
    };
  },
  computed: {
    ...mapState("cart", ["additionalList", "pizzaList"]),
    ...mapState(["user"]),
    ...mapGetters("cart", ["getTotalPrice"]),
    isEmptyPizzaList() {
      return this.pizzaList.length === 0;
    },
  },
  methods: {
    ...mapMutations("cart", {
      changeCounterHandler: SET_COUNT_OF_PIZZA,
      changeAdditionCounterHandler: SET_COUNT_OF_ADDITION_PRODUCT,
      clearPizzaList: CLEAR_PIZZA_LIST,
    }),
    ...mapActions("cart", ["fetchAllAdditionProducts"]),
    editPizzaHandler(id) {
      this.$router.push({ path: Path.ROOT, query: { id } });
    },
    submitHandler() {
      this.isOpenPopup = true;
      this.clearPizzaList();
      this.fetchAllAdditionProducts();
    },
  },
};
</script>
