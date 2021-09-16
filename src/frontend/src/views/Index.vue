<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <BuilderDoughSelector :dough-types="pizza.dough" />

        <BuilderSizeSelector :sizes="pizza.sizes" />

        <BuilderIngredientsSelector
          :ingredients="pizza.ingredients"
          :sauces="pizza.sauces"
        />
        <BuilderPizzaView />
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "../static/pizza.json";
import BuilderDoughSelector from "../modules/builder/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/BuilderIngredientsSelector";
import BuilderPizzaView from "../modules/builder/BuilderPizzaView";

export default {
  name: `IndexHome`,
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderPizzaView,
  },
  data() {
    return {
      pizza,
    };
  },
};
</script>

<style></style>
