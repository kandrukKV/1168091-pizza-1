<template>
  <div id="app">
    <AppLayout>
      <router-view />
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
export default {
  name: "App",
  components: { AppLayout },
  created() {
    this.$store.dispatch("initialApp");
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app";
</style>
