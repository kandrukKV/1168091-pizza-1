<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <IndexHome />
  </div>
</template>

<script>
import AppLayoutHeader from "@/layouts/AppLayoutHeader";
import IndexHome from "@/views/Index.vue";
export default {
  name: "AppLayout",
  components: { IndexHome, AppLayoutHeader },
};
</script>

<style scoped></style>
