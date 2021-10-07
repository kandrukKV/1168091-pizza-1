<template>
  <div class="popup">
    <router-link :to="Path.ROOT" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link :to="Path.ROOT" class="button">Отлично, я жду!</router-link>
    </div>
  </div>
</template>

<script>
import { Path } from "../../common/constants";

export default {
  name: "CardPopup",
  data() {
    return {
      Path,
    };
  },
};
</script>
