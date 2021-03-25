<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding minHeight">
      <vuestic-tabs
        :names="['Analize','Bakterije', 'Antibiogrami', 'Antibiotici']"
        :tab="'Bakterije'"
        ref="tabs"
      >
        <div :slot="'Analize'">
          <mikrobioloske-analize></mikrobioloske-analize>
        </div>
        <div :slot="'Bakterije'">
          <bakterije></bakterije>
        </div>
        <div :slot="'Antibiogrami'">
          <antibiogrami></antibiogrami>
        </div>
        <div :slot="'Antibiotici'">
          <antibiotici></antibiotici>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

    <div class="row">
      <div class="col-md-12">
        <div class="col-md-6">
          <loading
            :active.sync="isLoading"
            :can-cancel="false"
            :on-cancel="onCancel"
            color="#4ae387"
            :is-full-page="fullPage"
          ></loading>
        </div>
        <div class="col-md-6">
          <button v-if="false" @click.prevent="Test">{{'Loading...'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { http } from "../../../config/config.js";
import { bus } from "../../main";
import Analize from "./Analize.vue";
import Bakterije from "./Bakterije.vue";
import Antibiogrami from "./Antibiogrami.vue";
import Antibiotici from "./Antibiotici.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("mikrobioloske-analize", Analize);
Vue.component("bakterije", Bakterije);
Vue.component("antibiogrami", Antibiogrami);
Vue.component("antibiotici", Antibiotici);

export default {
  name: "mikrobiologija",

  computed: {},

  data() {
    return {
      show: true,
      selected_tab: "Bakterije",
      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },

  created() {},
  mounted() {
    bus.$on("tabChanged", data => {
      this.selected_tab = data;

      switch (this.selected_tab) {
        case "Analize":
          bus.$emit("AnalizeRefresh");
          break;

        case "Bakterije":
          bus.$emit("BakterijeRefresh");
          break;

        case "Antibiogrami":
          bus.$emit("AntibiogramiRefresh");
          break;

        case "Antibiotici":
          bus.$emit("AntibioticiRefresh");
          break;

        default:
          break;
      }
    });
  },

  components: {
    Loading
  },

  watch: {},
  beforeDestroy() {
    bus.$off("tabChanged");
  },

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },

    onCancel() {}
  }
};
</script>





<style lang="scss" scoped>
@import "../../sass/_variables.scss";
@import "../../../node_modules/bootstrap/scss/functions";
@import "../../../node_modules/bootstrap/scss/variables";
@import "../../../node_modules/bootstrap/scss/mixins/breakpoints";

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

.minHeight {
  min-height: 650px;
}
</style>
