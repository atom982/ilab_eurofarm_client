<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'Transportni list - COVID 19 RT PCR Test'">
          <div class="row" style="min-height: 350px">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="table-responsive" v-if="uzorci.length">
                    <table class="table table-striped first-td-padding">
                      <thead>
                        <tr>
                          <!-- 50 -->
                          <td width="8%">{{ "Active" }}</td>
                          <td width="12%">{{ "Uzorak" }}</td>
                          <td width="20%">{{ "tip Uzorka" }}</td>
                          <td width="10%">{{ "svrha" }}</td>
                          <!-- 50 -->
                          <td width="11%">{{ "Ime" }}</td>
                          <td width="17%">{{ "Prezime" }}</td>
                          <td width="10%">{{ "Godište" }}</td>
                          <td width="12%">{{ "uzorkovano" }}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="element in uzorci"
                          :key="element._id"
                          v-bind:class="{
                            'table-danger': element.prioritet === true,
                            'table-success': false,
                            'table-warning': false,
                          }"
                        >
                          <td>
                            <div
                              class="
                                form-check
                                abc-checkbox abc-checkbox-primary
                              "
                            >
                              <input
                                class="form-check-input"
                                id="checkbox-reject"
                                type="checkbox"
                                v-model="element.include"
                              />

                              <label
                                class="form-check-label"
                                for="checkbox"
                              ></label>
                            </div>
                          </td>

                          <td>{{ element.barcode }}</td>
                          <td>{{ "Bris nazofarinksa i orofarinksa" }}</td>
                          <td>{{ element.svrha }}</td>
                          <!-- 25 -->

                          <td>{{ element.ime }}</td>
                          <!-- 25 -->
                          <td>{{ element.prezime }}</td>
                          <td>{{ element.godiste }}</td>

                          <td>{{ element.uzorkovano }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="col-md-12">
                      <fieldset>
                        <button
                          v-show="!uzorci.length"
                          style="
                            text-transform: none;
                            border: 0px;
                            border-radius: 0px;
                          "
                          class="btn btn-secondary-danger btn-sm"
                          :disabled="true"
                        >
                          <span
                            style="color: #e34a4a"
                            class="fa fa-file-pdf-o"
                          ></span>
                          {{ " Transportni List - Nema podataka" }}
                        </button>
                        <button
                          v-show="uzorci.length"
                          style="
                            text-transform: none;
                            border: 0px;
                            border-radius: 0px;
                          "
                          class="btn btn-secondary-danger btn-sm"
                          @click.prevent="Download()"
                        >
                          <span
                            style="color: #e34a4a"
                            class="fa fa-file-pdf-o"
                          ></span>
                          {{ " Transportni List - Download" }}
                        </button>
                      </fieldset>
                    </div>
                  </div>
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
      uzorci: [],
      timestamp: "",

      isLoading: false,
      fullPage: true,
    };
  },

  created() {
    this.isLoading = true;

    http
      .get(
        "transport/list/get?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        if (res.data.success) {
          this.uzorci = res.data.uzorci;

          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
  },

  beforeMount() {},

  mounted() {
    this.timestamp = (
      new Date().getTime() -
      new Date().getTimezoneOffset() * 60000
    ).toString();
  },

  watch: {},

  beforeDestroy() {},

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    Download() {
      // http
      //   .post("transport/list/print", {
      //     token: this.$store.state.token,
      //     site: this.$store.state.site,
      //     uzorci: this.uzorci,
      //   })
      //   .then((res) => {
      //     if (res.data.success) {
      //     }
      //   });

      this.isLoading = true;

      http
        .get(
          "transport/list/download?token=" +
            this.$store.state.token +
            "&timestamp=" +
            this.timestamp,
          { responseType: "blob" }
        )
        .then((res) => {
          if (res.status == 200) {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "PDF File" + ".pdf");
            document.body.appendChild(link);
            link.click();

            setTimeout(() => {
              this.timestamp = (
                new Date().getTime() -
                new Date().getTimezoneOffset() * 60000
              ).toString();

              this.isLoading = false;
            }, 750);
          } else {
            this.isLoading = false;
          }
        });
    },
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
