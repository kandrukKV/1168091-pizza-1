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
              />
            </ul>
          </div>

          <div class="cart__form">
            <div class="cart-form">
              <label class="cart-form__select">
                <span class="cart-form__label">Получение заказа:</span>

                <select class="select">
                  <option value="1">Заберу сам</option>
                  <option value="2">Новый адрес</option>
                  <option value="3">Дом</option>
                </select>
              </label>

              <label class="input input--big-label">
                <span>Контактный телефон:</span>
                <input type="text" name="tel" placeholder="+7 999-999-99-99" />
              </label>

              <div class="cart-form__address">
                <span class="cart-form__label">Новый адрес:</span>

                <div class="cart-form__input">
                  <label class="input">
                    <span>Улица*</span>
                    <input type="text" name="street" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Дом*</span>
                    <input type="text" name="house" />
                  </label>
                </div>

                <div class="cart-form__input cart-form__input--small">
                  <label class="input">
                    <span>Квартира</span>
                    <input type="text" name="apartment" />
                  </label>
                </div>
              </div>
            </div>
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
        <b>Итого: 2 228 ₽</b>
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
import { mapActions, mapMutations, mapState } from "vuex";
import { Path } from "../common/constants";
import { SET_COUNT_OF_PIZZA } from "../store/mutations-types";

export default {
  name: "Cart",
  components: { CartPizzaItem, CartAdditionItem },
  async created() {
    await this.fetchAllAdditionProducts();
  },
  computed: {
    ...mapState("cart", ["additionalList", "pizzaList"]),
    isEmptyPizzaList() {
      return this.pizzaList.length === 0;
    },
  },
  methods: {
    ...mapMutations("cart", [SET_COUNT_OF_PIZZA]),
    ...mapActions("cart", ["fetchAllAdditionProducts"]),
    editPizzaHandler(id) {
      this.$router.push({ path: Path.ROOT, query: { id } });
    },
    changeCounterHandler(newCount) {
      this.SET_COUNT_OF_PIZZA(newCount);
    },
  },
};
</script>
