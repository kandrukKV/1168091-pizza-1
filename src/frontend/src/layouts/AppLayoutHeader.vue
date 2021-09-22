<template>
  <header class="header">
    <div class="header__logo">
      <a href="#" class="logo">
        <img
          src="../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </a>
    </div>
    <div class="header__cart">
      <a href="#">0 ₽</a>
    </div>
    <div v-if="user === null" class="header__user">
      <a href="#" class="header__login"><span>Войти</span></a>
    </div>
    <div v-else class="header__user">
      <a href="#">
        <picture>
          <source
            type="image/webp"
            srcset="
              ../assets/img/users/user5.webp    1x,
              ../assets/img/users/user5@2x.webp 2x
            "
          />
          <img
            src="../assets/img/users/user5.jpg"
            srcset="../assets/img/users/user5@2x.jpg"
            :alt="user.name"
            width="32"
            height="32"
          />
        </picture>
        <span>{{ user.name }}</span>
      </a>
      <a href="#" class="header__logout"><span>Выйти</span></a>
    </div>
  </header>
</template>

<script>
export default {
  name: `AppLayoutHeader`,
  props: {
    user: {
      type: [Object, null],
      default: null,
    },
  },
};
</script>

<style scoped></style>
