<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select
        class="select"
        :value="currentDeliveryType"
        @change="deliveryChangeHandler"
      >
        <option v-for="option in deliveryOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </label>

    <label class="input input--big-label">
      <span>Контактный телефон:</span>
      <input type="text" name="tel" placeholder="+7 999-999-99-99" />
    </label>

    <div v-if="showAddress" class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <label class="input">
          <span>Улица*</span>
          <input
            type="text"
            name="street"
            :disabled="isExistingAddress"
            v-model="userAddress.street"
          />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Дом*</span>
          <input
            type="text"
            name="house"
            :disabled="isExistingAddress"
            v-model="userAddress.house"
          />
        </label>
      </div>

      <div class="cart-form__input cart-form__input--small">
        <label class="input">
          <span>Квартира</span>
          <input
            type="text"
            name="apartment"
            :disabled="isExistingAddress"
            v-model="userAddress.apartment"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DeliveryLogInAddressOption,
  DeliveryLogOutAddressOption,
  TypeOfDelivery,
} from "../../common/constants";
import { mapMutations, mapState } from "vuex";
import { SET_CURRENT_DELIVERY_TYPE } from "../../store/mutations-types";
export default {
  name: `CartOrder`,
  data() {
    return {
      userAddress: {
        street: "",
        house: "",
        apartment: "",
      },
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapState("cart", ["currentDeliveryType"]),
    deliveryOptions() {
      return this.user
        ? DeliveryLogInAddressOption
        : DeliveryLogOutAddressOption;
    },
    isExistingAddress() {
      return this.currentDeliveryType === TypeOfDelivery.EXISTING_ADDRESS;
    },
    isNewAddress() {
      return this.currentDeliveryType === TypeOfDelivery.NEW_ADDRESS;
    },
    showAddress() {
      return this.isExistingAddress || this.isNewAddress;
    },
  },
  methods: {
    ...mapMutations("cart", {
      setCurrentDeliveryType: SET_CURRENT_DELIVERY_TYPE,
    }),
    deliveryChangeHandler(evt) {
      this.setCurrentDeliveryType(evt.target.value);
    },
  },
  watch: {
    currentDeliveryType() {
      if (this.currentDeliveryType === TypeOfDelivery.EXISTING_ADDRESS) {
        this.userAddress = this.user.address;
      } else {
        this.userAddress = {
          street: "",
          house: "",
          apartment: "",
        };
      }
    },
  },
};
</script>
