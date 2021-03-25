<template>
  <div class="form-group">
    <button
      style="text-transform: none; color: #e34a4a;"
      class="btn btn-secondary-warning btn-micro"
      @click.prevent="NewProdukt"
    >
      <i style="font-size: 16px;" class="fa fa-user"></i>
      {{' Novi produkt'}}
    </button>
  </div>
</template>

<script>
import { bus } from "../../../../main";
export default {
  name: "novi-produkt",
  data() {
    return {
      show: true
    };
  },

  methods: {
    NewProdukt() {
      bus.$emit("novi-produkt");//new-patient
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../sass/variables";

.btn.dropdown-toggle,
.dropdown-menu {
  min-width: 13rem;
  max-width: 13rem;
}

.dropdown-item,
.dropdown-toggle {
  text-transform: uppercase;
}
</style>
