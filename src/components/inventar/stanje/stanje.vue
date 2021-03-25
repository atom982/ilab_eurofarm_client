<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs
        :names="['Stanje', 'Nova narudzbenica', 'Pregled narudzbenica']"
        :tab="'Stanje'"
        ref="tabs"
      >
        <div :slot="'Stanje'">
          <div class="row">
            <div class="col-md-12">
              <StanjePregled></StanjePregled>
            </div>
          </div>
        </div>

        <div :slot="'Nova narudzbenica'">
          <div class="row">
            <div class="col-md-12">
              <StanjeNarudzbenica></StanjeNarudzbenica>
            </div>
          </div>
        </div>

        <div :slot="'Pregled narudzbenica'">
          <div class="row">
            <div class="col-md-12">
              <PregledNarudzbenica></PregledNarudzbenica>
            </div>
          </div>
        </div>
      </vuestic-tabs>
    </vuestic-widget>
  </div>
</template>

<script>
import StanjePregled from "../stanje/pregled.vue";
import StanjeNarudzbenica from "../stanje/narudzbenica.vue";
import PregledNarudzbenica from "../stanje/preglednarudzbenica.vue";
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";
export default {
  name: "stanje",

  components: {
    StanjePregled,
    StanjeNarudzbenica,
    PregledNarudzbenica
  },

  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {

  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables.scss";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
.abc-checkbox,
.abc-radio {
  display: flex !important;
  justify-content: flex-start;
}

input[type="checkbox"]:disabled + label,
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled,
input[type="radio"]:disabled {
  cursor: not-allowed;
}

.widget.simple-vertical-wizard-widget {
  .widget-body {
    padding: 0 $widget-padding;
    @include media-breakpoint-down(sm) {
      padding: $widget-padding 0;
    }
  }
}

.form-wizard-page {
  .form-group {
    min-width: 200px;
    max-width: 360px;
    width: 80%;
  }
}
</style>
