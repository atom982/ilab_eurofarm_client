<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding minHeight">
      <vuestic-tabs :names="[ 'Definicija', 'Uređivanje']" :tab="Tab" ref="tabs">
        <div :slot="'Definicija'">
          <div class="row" style="min-height: 350px;">
            <div class="col-md-12">
              <ControlMulti></ControlMulti>
            </div>
          </div>
        </div>

        <div :slot="'Uređivanje'">
          <div class="row" style="min-height: 350px;">
            <div class="col-md-12">
              <ControlEdit></ControlEdit>
            </div>
          </div>
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
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";
import ControlMulti from "./Multi.vue";
import ControlEdit from "./Edit.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import vm from "./../../../main.js";
export default {
  name: "kontrole-definicija",

  data() {
    return {
      show: true,
      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",

      // Prerequisites
      Tab: "Definicija"
    };
  },

  created() {
    // console.log(this.Tab);
  },

  mounted() {
    bus.$on("tabChanged", data => {
      this.Tab = data;
      // console.log("Inside main.vue: " + this.Tab);

      switch (data) {
        case "Definicija":
          bus.$emit("Definicija", data);
          break;
        case "Uređivanje":
          bus.$emit("Uređivanje", data);
          break;

        default:
          break;
      }
    });
  },

  components: {
    Loading,
    ControlMulti,
    ControlEdit
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
    onCancel() {},

    Save() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    }
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

.chart-container {
  padding: 0 2rem;
  height: 24rem;
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #e34a4a;
}

i:hover {
  color: #e34a4a !important;
}
</style>