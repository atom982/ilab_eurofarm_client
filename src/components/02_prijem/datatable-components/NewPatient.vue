<template>
  <div class="form-group">
    <button
      style="text-transform: none; color: #e34a4a;"
      class="btn btn-secondary-warning btn-micro"
      @click.prevent="NewPatient"
    >
      <i style="font-size: 16px;" class="fa fa-user"></i>
      {{' Novi pacijent'}}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },

  methods: {
    NewPatient() {
      this.$emit("new-patient");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";

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
