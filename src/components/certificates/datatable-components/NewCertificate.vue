<template>
  <div class="form-group">
    <button
      style="text-transform: none; color: #e34a4a;"
      class="btn btn-secondary-warning btn-micro"
      @click.prevent="NewCertificate"
    >
      <i style="font-size: 16px;" class="fa fa-certificate"></i>
      {{' Nova potvrda'}}
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
    NewCertificate() {
      // console.log('this.$emit("new-certificate");')
      this.$emit("new-certificate");
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
