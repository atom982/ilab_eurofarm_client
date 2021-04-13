




<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'Change Log'">
          <div class="row" style="min-height: 350px">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        onpaste="return false;"
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        name="input-icon-left"
                        v-model="text"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-search icon-left input-icon search-icon"
                      ></i>
                      <label class="control-label" for="input-icon-left">{{
                        "Pretraga"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="table-responsive" v-if="changes.length">
                    <table class="table table-striped first-td-padding">
                      <thead>
                        <tr>
                          <td width="50%">{{ "Lokacija" }}</td>
                          <td width="25%">{{ "Protokol" }}</td>
                          <td width="25%">{{ "Uzorak" }}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="element in filtered"
                          :key="element._id"
                          v-bind:class="{
                            'table-danger': false,
                            'table-success': false,
                            'table-warning': false,
                          }"
                        >
                          <td>{{ element.lokacija }}</td>
                          <td>{{ element.protokol }}</td>
                          <td>{{ element.sample }}</td>
                        </tr>
                      </tbody>
                    </table>
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
  name: "changelog",

  components: {
    Loading,
  },

  data() {
    return {
      show: true,

      isLoading: false,
      fullPage: true,

      changes: [],

      filtered: [],
      uzorak: {},
      text: "",
    };
  },

  created() {
    this.isLoading = true;
    http
      .get(
        "postavke/list/changes?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.changes);

          this.changes = [];

          res.data.changes.forEach((element) => {
            if (element.site.opis.includes("+")) {
              var temp = element.site.opis.split("+");
              var lokacija = temp[1];
            } else {
              var lokacija = element.site.opis;
            }

            this.changes.push({
              sample: element.sample,
              protokol: element.protokol,
              lokacija: lokacija,
              element: element,
            });
          });

          this.filtered = [];
          this.changes.forEach((element) => {
            if (
              element.protokol
                .toLowerCase()
                .includes(this.text.toLowerCase()) ||
              element.sample.toLowerCase().includes(this.text.toLowerCase())
            ) {
              this.filtered.push(element);
            }
          });

          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
  },

  beforeMount() {},

  mounted() {},

  watch: {
    text: function () {
      this.filtered = [];
      this.changes.forEach((element) => {
        if (
          element.protokol.toLowerCase().includes(this.text.toLowerCase()) ||
          element.sample.toLowerCase().includes(this.text.toLowerCase())
        ) {
          this.filtered.push(element);
        }
      });
    },
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
