




<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'Transportni list'">
          <div class="row" style="min-height: 350px">
            <div class="col-md-12">
              <div class="row">
               
                <div class="col-md-12">
                 {{"U izradi..."}}
                </div>
              </div>
            </div>
          </div>

          <!--  -->
        </vuestic-widget>
      </div>
    </div>

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
import BadgeColumn from "./BadgeColumn.vue";
import { http } from "../../../config/config.js";
import { server } from "../../../config/config.js";
import { bus } from "../../main";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "transport",

  components: {
    Loading,
  },

  data() {
    return {
      show: true,

      isLoading: false,
      fullPage: true,

     
    };
  },

  created() {
    
  },

  beforeMount() {},

  mounted() {},

  watch: {
    
  },

  beforeDestroy() {},

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
.chart-container {
  padding: 0 2rem;
  height: 24rem;
}

.circle {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  display: inline-block;
}

.icon-bar a:hover {
  color: #adb3b9 !important;
}

i:hover {
  color: #4ae387;
}
</style>
