<template>
  <form action="" method="post" class="layout-form">
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
        <a href="#" class="button button--border button--arrow"
          >Хочу еще одну</a
        >
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
  </form>
</template>

<script>
import CartPizzaItem from "../modules/card/CartPizzaItem";
import CartAdditionItem from "../modules/card/CartAdditionItem";
import CardOrder from "../modules/card/CardOrder";
import { mapMutations, mapState } from "vuex";
import { Path } from "../common/constants";
import {
  SET_COUNT_OF_PIZZA,
  SET_COUNT_OF_ADDITION_PRODUCT,
} from "../store/mutations-types";

export default {
  name: "Cart",
  components: { CartPizzaItem, CartAdditionItem, CardOrder },
  computed: {
    ...mapState("cart", ["additionalList", "pizzaList"]),
    ...mapState(["user"]),
    isEmptyPizzaList() {
      return this.pizzaList.length === 0;
    },
    totalPrice() {
      const pizzaPrice = this.pizzaList.reduce((acc, item) => {
        return acc + item.totalPrice * item.params.count;
      }, 0);
      const additionPrice = this.additionalList.reduce((acc, item) => {
        return acc + item.count * item.price;
      }, 0);
      return pizzaPrice + additionPrice;
    },
  },
  methods: {
    ...mapMutations("cart", [
      SET_COUNT_OF_PIZZA,
      SET_COUNT_OF_ADDITION_PRODUCT,
    ]),
    editPizzaHandler(id) {
      this.$router.push({ path: Path.ROOT, query: { id } });
    },
    changeCounterHandler(newCount) {
      this.SET_COUNT_OF_PIZZA(newCount);
    },
    changeAdditionCounterHandler(newCount) {
      this.SET_COUNT_OF_ADDITION_PRODUCT(newCount);
    },
  },
};
</script>
