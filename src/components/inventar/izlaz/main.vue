<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs
        :names="['Pregled izlaza', 'Novi izlaz']"
        :tab="'Pregled izlaza'"
        ref="tabs"
      >
        <div :slot="'Pregled izlaza'">
          <div class="row">
            <div class="col-md-12">
              <PregledIzlaz></PregledIzlaz>
            </div>
          </div>
        </div>

        <div :slot="'Novi izlaz'">
          <div class="row">
            <div class="col-md-12">
              <NoviIzlaz></NoviIzlaz>
            </div>
          </div>
        </div>
      </vuestic-tabs>
    </vuestic-widget>
  </div>
</template>

<script>
import NoviIzlaz from "../izlaz/izlaz.vue";
import PregledIzlaz from "../izlaz/pregled.vue";
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";
export default {
  name: "stanje",

  components: {
     NoviIzlaz,
     PregledIzlaz,
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
