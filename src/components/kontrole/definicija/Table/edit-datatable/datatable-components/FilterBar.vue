<template>
  <div class="form-group with-icon-left">
    <div class="input-group">
      <input
        onpaste="return false;"
        autocomplete="off"
        id="input-icon-left"
        name="input-icon-left"
        @keyup="doFilter()"
        v-model="filterText"
        required
      >
      <i class="glyphicon glyphicon-search icon-left input-icon search-icon"></i>
      <label class="control-label" for="input-icon-left">{{'Pretraga'}}</label>
      <i class="bar"></i>
    </div>
  </div>
</template>

<script>
import { bus } from "../../../../../../main";

export default {
  name: "filterBar",
  data() {
    return {
      filterText: ""
    };
  },
  mounted() {
    bus.$on("SetFilterFromLabAssay", data => {
      if (this.filterText != data) {
        this.filterText = data;
        this.doFilter(this.filterText);
      }
    });
  },
  beforeDestroy() {
    bus.$off("SetFilterFromLabAssay");
  },
  methods: {
    doFilter() {
      this.$emit("filter", this.filterText);
      bus.$emit("SetFilterFromAnaAssay", this.filterText);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-icon {
  transform: rotate(90deg);
}

.form-group {
  min-width: 7rem;
}

@media (max-width: 768px) {
  .form-group {
    width: 80%;
  }
}
</style>
