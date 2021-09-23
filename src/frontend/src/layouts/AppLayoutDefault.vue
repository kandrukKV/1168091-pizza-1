<template>
  <div class="app-layout">
    <AppLayoutHeader :user="user" />
    <slot />
  </div>
</template>

<script>
import AppLayoutHeader from "../layouts/AppLayoutHeader";
import user from "../static/user.json";
export default {
  name: "AppLayout",
  components: { AppLayoutHeader },
  data() {
    return {
      user,
    };
  },
};
</script>
