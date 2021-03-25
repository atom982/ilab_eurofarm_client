<template>
  <div class="form-group with-icon-left">
    <div class="input-group">
      <input
        onpaste="return false;"
        autocomplete="off"
        id="fl-input-icon-left"
        title=" "
        name="fl-input-icon-left"
        @keyup="doFilter($event)"
        v-model="filterText"
        required
      >
      <i class="glyphicon glyphicon-search icon-left input-icon search-icon"></i>
      <label class="control-label" for="fl-input-icon-left">{{'Pretraga'}}</label>
      <i class="bar"></i>
    </div>
  </div>
</template>

<script>
import { bus } from "../../../main";
export default {
  name: "filterBar",
  data() {
    return {
      filterText: ""
    };
  },
  mounted() {
    bus.$on("Filter", data => {
      this.filterText = data;
    });
  },
  beforeDestroy() {
    bus.$off("Filter");
  },
  methods: {
    doFilter(event) {
      this.$emit("filter", this.filterText, event);
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
