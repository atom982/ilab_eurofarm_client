<template>
  <div class="collapse-page">
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
          <button v-if="false" @click.prevent="Test">{{ "Loading..." }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import router from "../../../router";
import store from "vuex-store";
import { http } from "../../../../config/config.js";
import { barcode } from "../../../../config/config.js";
import BadgeColumn from "./BadgeColumn.vue";
import { bus } from "../../../main";
import { server } from "../../../../config/config.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { AtomSpinner } from "epic-spinners";
import PDFObject from "pdfobject";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "collapse-obrada-control",
  data() {
    return {
      show: true,

      // Overlay
      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
    };
  },
  components: {
    Loading,
  },
  mounted() {},
  beforeDestroy() {},
  created() {},
  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
  },
};
</script>

<style lang="scss" scoped>
.collapse-page {
  &__content {
    padding: 2rem;
    &__title {
      font-size: 1.375rem;
      font-weight: bold;
    }
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #4ae387;
}

i:hover {
  color: #4ae387 !important;
}

.circle {
  width: 1rem;
  opacity: 0.5;
  height: 1rem;
  border-radius: 50%;
  display: inline-block;
}
</style>
