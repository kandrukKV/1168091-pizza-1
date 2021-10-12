<template>
  <header class="header">
    <div class="header__logo">
      <router-link :to="$options.Path.ROOT" custom class="logo">
        <img
          src="../assets/img/logo.svg"
          alt="V!U!E! Pizza logo"
          width="90"
          height="40"
        />
      </router-link>
    </div>
    <div class="header__cart">
      <router-link :to="$options.Path.CART">0 ₽</router-link>
    </div>
    <div class="header__user">
      <router-link
        v-if="user === null"
        :to="$options.Path.LOGIN"
        class="header__login"
        ><span>Войти</span></router-link
      >
      <template v-else>
        <div class="header__user">
          <router-link :to="$options.Path.PROFILE">
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
          </router-link>
          <a href="#" class="header__logout"><span>Выйти</span></a>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
import { Path } from "../common/constants";
import { mapState } from "vuex";

export default {
  name: `AppLayoutHeader`,
  Path,
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped></style>
