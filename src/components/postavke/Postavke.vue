<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding minHeight">
      <vuestic-tabs
        :names="['Opšte postavke']"
        :tab="'Opšte postavke'"
        ref="tabs"
      >
        <div :slot="'Sites'">
          <sites></sites>
        </div>
        <div :slot="'Korisnici'">
          <korisnici></korisnici>
        </div>
        <div :slot="'Opšte postavke'">
          <opste-postavke></opste-postavke>
        </div>
        <div :slot="'Analize'">
          <laboratorijske-analize></laboratorijske-analize>
        </div>
        <div :slot="'Sites'"></div>
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

    <json-edit-postavke
      :show.sync="show"
      ref="staticModalJSONEdit"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #4ae387;">{{'JSON Editor'}}</span>
      </div>
    </json-edit-postavke>
  </div>
</template>

<script>
import Vue from "vue";
import { http } from "../../../config/config.js";
import { bus } from "../../main";
import Sites from "./Sites.vue";
import Korisnici from "./Korisnici.vue";
import OpstePostavke from "./OpstePostavke.vue";
import LaboratorijskeAnalize from "./LaboratorijskeAnalize.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("sites", Sites);
Vue.component("korisnici", Korisnici);
Vue.component("opste-postavke", OpstePostavke);
Vue.component("laboratorijske-analize", LaboratorijskeAnalize);

export default {
  name: "postavke",

  computed: {},

  data() {
    return {
      show: true,
      selected_tab: "Opšte postavke",
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
        case "Sites":
          bus.$emit("SitesRefresh");
          bus.$emit("CollapseAllUsers");
          break;

        case "Korisnici":
          bus.$emit("KorisniciRefresh");
          bus.$emit("CollapseAllSites");
          break;

        case "Opšte postavke":
          bus.$emit("CollapseAllUsers");
          bus.$emit("CollapseAllSites");
          break;

        case "Analize":
          bus.$emit("CollapseAllUsers");
          bus.$emit("CollapseAllSites");
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
