<template>
  <div class="sign-form">
    <router-link :to="$options.Path.ROOT" class="close close--white">
      <span class="visually-hidden">Закрыть форму авторизации</span>
    </router-link>
    <div class="sign-form__title">
      <h1 class="title title--small">Авторизуйтесь на сайте</h1>
    </div>
    <form @submit.prevent="submitHandler" method="post">
      <AppInput
        ref="email"
        label="E-mail"
        v-model="email"
        name="email"
        type="email"
        placeholder="example@mail.ru"
        :error-text="validations.email.error"
        :class="inputClass"
      />
      <AppInput
        label="Пароль"
        v-model="password"
        name="password"
        type="password"
        placeholder="***********"
        :error-text="validations.password.error"
        :class="inputClass"
      />
      <button type="submit" class="button">Авторизоваться</button>
    </form>
  </div>
</template>

<script>
import AppInput from "../common/components/AppInput";
import { Path } from "../common/constants";
import { mapActions } from "vuex";
import validator from "../common/mixins/validator";

export default {
  name: "Login",
  Path,
  mixins: [validator],
  components: {
    AppInput,
  },
  data() {
    return {
      email: "user@example.com",
      password: "user@example.com",
      isLoginError: false,
      validations: {
        email: {
          error: "",
          rules: ["required", "email"],
        },
        password: {
          error: "",
          rules: ["required"],
        },
      },
    };
  },
  computed: {
    inputClass() {
      return this.isLoginError ? "error" : "";
    },
  },
  watch: {
    email() {
      this.$clearValidationErrors();
      this.isLoginError = false;
    },
    password() {
      this.$clearValidationErrors();
      this.isLoginError = false;
    },
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async submitHandler() {
      if (
        !this.$validateFields(
          {
            email: this.email,
            password: this.password,
          },
          this.validations
        )
      ) {
        return;
      }
      try {
        await this.login({
          email: this.email,
          password: this.password,
        });
        await this.$router.push(Path.ROOT);
      } catch (e) {
        this.isLoginError = true;
      }
    },
  },
  mounted() {
    this.$refs.email.$refs.input.focus();
  },
};
</script>
