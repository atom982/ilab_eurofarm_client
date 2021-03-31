




<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'Statusi uzoraka'">
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

                <vuestic-simple-select
                  :label="'ANALIZA'"
                  v-model="analiza"
                  name="analiza"
                  :required="true"
                  title=" "
                  ref="analizaSelect"
                  v-bind:options="analize"
                ></vuestic-simple-select>

                <div class="col-md-12">
                  <div class="table-responsive" v-if="uzorci.length">
                    <table class="table table-striped first-td-padding">
                      <thead>
                        <tr>
                          <!-- 30 -->
                          <td width="7%">{{ "Cito" }}</td>
                          <td align="center" width="7%">{{ "" }}</td>
                          <td width="12%">{{ "Uzorak" }}</td>
                          <td width="11%">{{ "svrha" }}</td>
                          <!-- 35 -->
                          <td width="10%">{{ "Ime" }}</td>
                          <td width="14%">{{ "Prezime" }}</td>
                          <td width="9%">{{ "Godište" }}</td>
                          <td width="9%">{{ "Datum" }}</td>
                          <td width="7%">{{ "Vrijeme" }}</td>
                          <td width="4%">{{ "" }}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="element in filtered"
                          :key="element._id"
                          v-bind:class="{
                            'table-danger': element.prioritet === true,
                            'table-success': false,
                            'table-warning': false,
                          }"
                        >
                          <td>
                            <div
                              class="form-check abc-checkbox abc-checkbox-primary"
                            >
                              <input
                                :disabled="
                                  element.status === 'VERIFICIRAN' ||
                                  element.status === 'REALIZOVAN' ||
                                  (element.site != element.sampled_by &&
                                    element.sampled_by != null)
                                "
                                v-if="!element.prioritet"
                                @click="Activate(element)"
                                class="form-check-input"
                                id="checkbox-normalan"
                                type="checkbox"
                                v-model="element.prioritet"
                              />
                              <input
                                :disabled="
                                  element.status === 'VERIFICIRAN' ||
                                  element.status === 'REALIZOVAN' ||
                                  (element.site != element.sampled_by &&
                                    element.sampled_by != null)
                                "
                                v-if="element.prioritet"
                                @click="Deactivate(element)"
                                class="form-check-input"
                                id="checkbox-hitan"
                                type="checkbox"
                                v-model="element.prioritet"
                              />
                              <label
                                class="form-check-label"
                                for="checkbox"
                              ></label>
                            </div>
                          </td>

                          <td align="left">
                            <i
                              v-if="element.status === 'ZAPRIMLJEN'"
                              @click.prevent="Naljepnica(element)"
                              style="font-size: 14px; transform: scale(3, 1.5)"
                              class="fa fa-barcode"
                            ></i>

                            <i
                              v-if="
                                element.status === 'U OBRADI' &&
                                element.site === element.sampled_by &&
                                element.sampled_by != null
                              "
                              @click.prevent="Naljepnica(element)"
                              style="font-size: 14px; transform: scale(3, 1.5)"
                              class="fa fa-barcode"
                            ></i>

                            <i
                              v-if="
                                element.status === 'U OBRADI' &&
                                element.site != element.sampled_by &&
                                element.sampled_by != null
                              "
                              style="
                                color: #adb3b9;
                                font-size: 14px;
                                transform: scale(3, 1.5);
                              "
                              class="fa fa-barcode"
                            ></i>

                            <a
                              v-if="
                                element.status === 'VERIFICIRAN' ||
                                element.status === 'REALIZOVAN'
                              "
                              style="
                                color: #adb3b9;
                                font-size: 14px;
                                transform: scale(3, 1.5);
                              "
                              class="fa fa-barcode"
                            ></a>
                          </td>
                          <td>{{ element.barcode }}</td>
                          <td>{{ element.svrha }}</td>
                          <!-- 25 -->

                          <td>{{ element.ime }}</td>
                          <!-- 25 -->
                          <td>{{ element.prezime }}</td>
                          <td>{{ element.godiste }}</td>

                          <td>{{ element.datum }}</td>
                          <td>{{ element.time }}</td>
                          <td
                            v-if="element.status === 'ZAPRIMLJEN'"
                            align="center"
                          >
                            <span class="circle badge-danger"></span>
                          </td>
                          <td
                            v-if="element.status === 'U OBRADI'"
                            align="center"
                          >
                            <span class="circle badge-warning"></span>
                          </td>
                          <td
                            v-if="element.status === 'VERIFICIRAN'"
                            align="center"
                          >
                            <span class="circle badge-primary"></span>
                          </td>
                          <td
                            v-if="element.status === 'REALIZOVAN'"
                            align="center"
                          >
                            <span class="circle badge-info"></span>
                          </td>
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
  name: "naljepnice",

  components: {
    Loading,
  },

  data() {
    return {
      show: true,

      isLoading: false,
      fullPage: true,

      uzorci: [],
      analiza: "CoV2 RT PCR",
      analize: ["CoV2 RT PCR", "CoV2 Antigen"],
      filtered: [],
      uzorak: {},
      text: "",
    };
  },

  created() {
    this.isLoading = true;
    http
      .get(
        "postavke/list/uzorci?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        if (res.data.success) {
          // console.log(res.data.uzorci);
          this.uzorci = res.data.uzorci;

          this.filtered = [];
          this.uzorci.forEach((element) => {
            // console.log(element.site + "/" + element.sampled_by);
            if (
              element.analiza.toLowerCase() === this.analiza.toLowerCase() &&
              (element.ime.toLowerCase().includes(this.text.toLowerCase()) ||
                element.prezime
                  .toLowerCase()
                  .includes(this.text.toLowerCase()) ||
                element.barcode
                  .toLowerCase()
                  .includes(this.text.toLowerCase()) ||
                element.analiza.toLowerCase().includes(this.text.toLowerCase()))
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

  beforeMount() {
    // Međunarodni aerodrom Tuzla
    switch (this.$store.state.site) {
      // Poliklinika Eurofarm Centar - Poslovna jedinica Centralna laboratorija
      case "5c69f68c338fe912f99f833b":
        this.analize = ["CoV2 RT PCR", "CoV2 Antigen"];
        this.analiza = "CoV2 RT PCR";
        break;

      case "5f9f705e444e51a464db2543": // Međunarodni aerodrom Sarajevo
        this.analize = ["CoV2 RT PCR", "CoV2 Antigen"];
        this.analiza = "CoV2 RT PCR";
        break;

      case "5f9f70a1444e51a464db259a": // Međunarodni aerodrom Tuzla
        this.analize = ["CoV2 Antigen"];
        this.analiza = "CoV2 Antigen";
        break;

      case "5fb81465900f08738c6985e7": // Poliklinika Sunce - Zenica
        this.analize = ["CoV2 RT PCR"];
        this.analiza = "CoV2 RT PCR";
        break;

      // PZU HBL Laboratorija - Istočno Sarajevo
      case "60508f5ff0a3cf9c7860f5ad":
        this.analize = ["CoV2 RT PCR"];
        this.analiza = "CoV2 RT PCR";
        break;

      case "60508f95f0a3cf9c7860f5bd": // HBL Laboratorija - Novo Sarajevo
        this.analize = ["CoV2 RT PCR"];
        this.analiza = "CoV2 RT PCR";
        break;

      case "60509039f0a3cf9c7860f5e1": // HBL Laboratorija - Dobrinja
        this.analize = ["CoV2 RT PCR"];
        this.analiza = "CoV2 RT PCR";
        break;

      default:
        this.analize = ["CoV2 RT PCR", "CoV2 Antigen"];
        this.analiza = "CoV2 RT PCR";
        break;
    }
  },

  mounted() {},

  watch: {
    text: function () {
      this.filtered = [];
      this.uzorci.forEach((element) => {
        if (
          element.analiza.toLowerCase() === this.analiza.toLowerCase() &&
          (element.ime.toLowerCase().includes(this.text.toLowerCase()) ||
            element.prezime.toLowerCase().includes(this.text.toLowerCase()) ||
            element.svrha.toLowerCase().includes(this.text.toLowerCase()) ||
            element.barcode.toLowerCase().includes(this.text.toLowerCase()) ||
            element.analiza.toLowerCase().includes(this.text.toLowerCase()))
        ) {
          this.filtered.push(element);
        }
      });
    },
    analiza: function () {
      this.filtered = [];
      this.uzorci.forEach((element) => {
        if (
          element.analiza.toLowerCase() === this.analiza.toLowerCase() &&
          (element.ime.toLowerCase().includes(this.text.toLowerCase()) ||
            element.prezime.toLowerCase().includes(this.text.toLowerCase()) ||
            element.svrha.toLowerCase().includes(this.text.toLowerCase()) ||
            element.barcode.toLowerCase().includes(this.text.toLowerCase()) ||
            element.analiza.toLowerCase().includes(this.text.toLowerCase()))
        ) {
          this.filtered.push(element);
        }
      });
    },
  },

  beforeDestroy() {},

  methods: {
    Activate(element) {
      this.isLoading = true;
      http
        .post("postavke/uzorak/hitan", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          id: element.rezultat.id,
        })
        .then((res) => {
          http
            .get(
              "postavke/list/uzorci?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then((response) => {
              if (response.data.success) {
                // console.log(response.data.uzorci);
                this.filtered = [];
                this.uzorci = response.data.uzorci;

                this.uzorci.forEach((element) => {
                  if (
                    element.analiza.toLowerCase() ===
                      this.analiza.toLowerCase() &&
                    (element.ime
                      .toLowerCase()
                      .includes(this.text.toLowerCase()) ||
                      element.prezime
                        .toLowerCase()
                        .includes(this.text.toLowerCase()) ||
                      element.barcode
                        .toLowerCase()
                        .includes(this.text.toLowerCase()) ||
                      element.analiza
                        .toLowerCase()
                        .includes(this.text.toLowerCase()))
                  ) {
                    this.filtered.push(element);
                  }
                });
                this.isLoading = false;
              } else {
                this.isLoading = false;
              }
            });
        });
    },

    Deactivate(element) {
      this.isLoading = true;
      http
        .post("postavke/uzorak/normalan", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          id: element.rezultat.id,
        })
        .then((res) => {
          http
            .get(
              "postavke/list/uzorci?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then((response) => {
              if (response.data.success) {
                // console.log(response.data.uzorci);
                this.filtered = [];
                this.uzorci = response.data.uzorci;

                this.uzorci.forEach((element) => {
                  if (
                    element.analiza.toLowerCase() ===
                      this.analiza.toLowerCase() &&
                    (element.ime
                      .toLowerCase()
                      .includes(this.text.toLowerCase()) ||
                      element.prezime
                        .toLowerCase()
                        .includes(this.text.toLowerCase()) ||
                      element.barcode
                        .toLowerCase()
                        .includes(this.text.toLowerCase()) ||
                      element.analiza
                        .toLowerCase()
                        .includes(this.text.toLowerCase()))
                  ) {
                    this.filtered.push(element);
                  }
                });
                this.isLoading = false;
              } else {
                this.isLoading = false;
              }
            });
        });
    },

    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Naljepnica(data) {

      console.log(data)

      var prioritet = "NORMALAN";

      if (data.prioritet === true) {
        prioritet = "HITAN";
      }

      var link = server + "images/barcodes/" + data.barcode + ".png";

      printEPL(
        data.ime + " " + data.prezime,
        data.barcode,
        data.rezultat.sample.pid,
        data.godiste,
        data.rezultat.sample.datum,
        link,
        data.rezultat.sample.code,
        this.$store.state.site,
        prioritet,
        data.rezultat.sample.protokol,
        data.svrha
      );
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
