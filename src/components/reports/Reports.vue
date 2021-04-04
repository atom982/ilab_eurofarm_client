<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="izbor + ' za: ' + site">
          <div class="row" style="min-height: 350px">
            <div class="col-md-12">
              <div class="col-md-8">
                <fieldset>
                  <div class="tree-view-advanced-preview">
                    <vuestic-tree-root ref="treeView">
                      <vuestic-tree-category isOpen label="Izbornik">
                        <vuestic-tree-node>
                          <!-- Obrađeni uzorci -->
                          <a
                            v-if="true"
                            href="#"
                            :class="{
                              clicked: izbor === 'Obrađeni uzorci',
                              lnk: izbor != 'Obrađeni uzorci',
                            }"
                          >
                            <div @click="doSomethingOnClick('Obrađeni uzorci')">
                              {{ "Obrađeni uzorci: " + site }}
                            </div>
                          </a>

                          <!-- COVID 19 RT PCR Test -->
                          <!-- Međunarodni aerodrom Tuzla ne radi COVID 19 RT PCR Test -->
                          <!-- 5f9f70a1444e51a464db259a -->
                          <a
                            v-if="
                              true &&
                              $store.state.site != '5f9f70a1444e51a464db259a'
                            "
                            href="#"
                            :class="{
                              clicked: izbor === 'COVID 19 RT PCR Test',
                              lnk: izbor != 'COVID 19 RT PCR Test',
                            }"
                          >
                            <div
                              @click="
                                doSomethingOnClick('COVID 19 RT PCR Test')
                              "
                            >
                              {{ "COVID 19 RT PCR Test" }}
                            </div>
                          </a>

                          <a
                            v-if="
                              true &&
                              $store.state.site === '5f9f70a1444e51a464db259a'
                            "
                            href="#"
                            style="color: #acb5be"
                          >
                            <div>{{ "COVID 19 RT PCR Test" }}</div>
                          </a>

                          <!-- COVID 19 Antigen Test -->
                          <!-- Poliklinika Sunce - Zenica ne radi COVID 19 Antigen Test -->
                          <!-- 5fb81465900f08738c6985e7 -->
                          <!-- PZU HBL Laboratorija - Istočno Sarajevo ne radi COVID 19 Antigen Test -->
                          <!-- 60508f5ff0a3cf9c7860f5ad -->
                          <!-- HBL Laboratorija - Novo Sarajevo ne radi COVID 19 Antigen Test -->
                          <!-- 60508f95f0a3cf9c7860f5bd -->
                          <!-- HBL Laboratorija - Dobrinja ne radi COVID 19 Antigen Test -->
                          <!-- 60509039f0a3cf9c7860f5e1 -->
                          <a
                            v-if="
                              true &&
                              $store.state.site != '5fb81465900f08738c6985e7' &&
                              $store.state.site != '60508f5ff0a3cf9c7860f5ad' &&
                              $store.state.site != '60508f95f0a3cf9c7860f5bd' &&
                              $store.state.site != '60509039f0a3cf9c7860f5e1'
                            "
                            href="#"
                            :class="{
                              clicked: izbor === 'COVID 19 Antigen Test',
                              lnk: izbor != 'COVID 19 Antigen Test',
                            }"
                          >
                            <div
                              @click="
                                doSomethingOnClick('COVID 19 Antigen Test')
                              "
                            >
                              {{ "COVID 19 Antigen Test" }}
                            </div>
                          </a>

                          <a
                            v-if="
                              (true &&
                                $store.state.site ===
                                  '5fb81465900f08738c6985e7') ||
                              $store.state.site ===
                                '60508f5ff0a3cf9c7860f5ad' ||
                              $store.state.site ===
                                '60508f95f0a3cf9c7860f5bd' ||
                              $store.state.site === '60509039f0a3cf9c7860f5e1'
                            "
                            href="#"
                            style="color: #acb5be"
                          >
                            <div>{{ "COVID 19 Antigen Test" }}</div>
                          </a>
                        </vuestic-tree-node>
                      </vuestic-tree-category>
                    </vuestic-tree-root>
                    <div>
                      <br />
                    </div>
                  </div>
                </fieldset>
              </div>
              <div class="col-md-4">
                <fieldset>
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <vuestic-date-picker
                        style="min-width: 18rem"
                        id="date-picker-range"
                        :config="config"
                        :disabled="false"
                        v-model="datepicker.range"
                        @on-change="doSomethingOnChangeDateRange"
                      />
                      <i class="fa fa-calendar icon-left input-icon"></i>
                      <label class="control-label" for="date-picker-range">{{
                        "Unesite opseg datuma"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>

              <div class="col-md-4">
                <fieldset>
                  <button
                    v-show="!date_picked"
                    style="
                      text-transform: none;
                      border: 0px;
                      border-radius: 0px;
                    "
                    class="btn btn-secondary btn-sm"
                    :disabled="true"
                  >
                    <span class="fa fa-file-excel-o"></span>
                    {{ " XLSX Download" }}
                  </button>
                  <button
                    v-show="date_picked"
                    style="
                      text-transform: none;
                      border: 0px;
                      border-radius: 0px;
                    "
                    class="btn btn-secondary btn-sm"
                    @click.prevent="Download()"
                  >
                    <span class="fa fa-file-excel-o"></span>
                    {{ " XLSX Download" }}
                  </button>
                </fieldset>
              </div>
            </div>
          </div>
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
import { http } from "../../../config/config.js";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import router from "../../router";
import store from "vuex-store";
import utils from "services/utils";
import PDFObject from "pdfobject";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { server } from "../../../config/config.js";

export default {
  name: "reports",

  data() {
    return {
      show: false,

      izbor: "Obrađeni uzorci",
      izborText: "Obrađeni uzorci",
      date_picked: false,

      timestamp: "",

      site: "Poslovna jedinica Centralna laboratorija",
      opis: "PJC",

      datepicker: {
        range: null,
      },

      config: {
        mode: "range",
        minDate: new Date("2020.11.01"),
        maxDate: new Date(),
        altFormat: "F j, Y",
        dateFormat: "d.m.Y",
        locale: {
          firstDayOfWeek: 1,
          rangeSeparator: " do ",
          weekdays: {
            shorthand: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
            longhand: [
              "Nedjelja",
              "Ponedjeljak",
              "Utorak",
              "Srijeda",
              "Četvrtak",
              "Petak",
              "Subota",
            ],
          },
          months: {
            shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec",
            ],
            longhand: [
              "Januar‎",
              "Februar‎",
              "Mart‎",
              "April‎",
              "Maj‎",
              "Juni‎",
              "Juli‎",
              "August‎",
              "Septembar‎",
              "Oktobar‎",
              "Novembar‎",
              "Decembar‎",
            ],
          },
        },
      },

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

  watch: {},

  created() {},

  beforeMount() {
    switch (this.$store.state.site) {
      case "5c69f68c338fe912f99f833b":
        this.site = "Podružnica Centralna Laboratorija, Sarajevo";
        this.opis = "PJC";
        break;
      case "5f9f705e444e51a464db2543":
        this.site = "Međunarodni aerodrom Sarajevo";
        this.opis = "SJJ";
        break;
      case "5f9f70a1444e51a464db259a":
        this.site = "Međunarodni aerodrom Tuzla";
        this.opis = "TZL";
        break;
      case "5fb81465900f08738c6985e7":
        this.site = "Poliklinika Sunce - Zenica";
        this.opis = "PSZ";
        break;
      case "60508f5ff0a3cf9c7860f5ad":
        this.site = "PZU HBL Laboratorija - Istočno Sarajevo";
        this.opis = "HLI";
        break;
      case "60508f95f0a3cf9c7860f5bd":
        this.site = "HBL Laboratorija - Novo Sarajevo";
        this.opis = "HLN";
        break;
      case "60509039f0a3cf9c7860f5e1":
        this.site = "HBL Laboratorija - Dobrinja";
        this.opis = "HLD";
        break;
      case "6068b249f68be9eab36b4fdb":
        this.site = "Podružnica 1. Unitic, Sarajevo";
        this.opis = "PJU";
        break;
      case "6068b2d5f68be9eab36b5003":
        this.site = "Podružnica 2. IUS, Sarajevo";
        this.opis = "PJI";
        break;
      case "6068b346f68be9eab36b502f":
        this.site = "Podružnica Visoko";
        this.opis = "PJV";
        break;
      case "6068b3b3f68be9eab36b5088":
        this.site = "Podružnica Tuzla";
        this.opis = "PJT";
        break;
      case "6068b471f68be9eab36b50f5":
        this.site = "Podružnica Goražde";
        this.opis = "PJG";
        break;
      case "6068b4fcf68be9eab36b511d":
        this.site = "Podružnica Bugojno";
        this.opis = "PJB";
        break;
      case "6068b55df68be9eab36b5175":
        this.site = "Podružnica Trebinje";
        this.opis = "PJR";
        break;

      default:
        this.site = "";
        this.opis = "";
        break;
    }
  },

  mounted() {
    this.$refs.treeView.expand();
    this.timestamp = (
      new Date().getTime() -
      new Date().getTimezoneOffset() * 60000
    ).toString();
  },

  methods: {
    Download() {
      switch (this.izbor) {
        case "Obrađeni uzorci":
          // console.warn("U izradi...");
          this.isLoading = true;

          // setTimeout(() => {
          //   this.isLoading = false;
          // }, 2000);
          http
            .get(
              "obradjeno/xlsx/download?token=" +
                this.$store.state.token +
                "&timestamp=" +
                this.timestamp,
              { responseType: "blob" }
            )
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", this.timestamp + ".xlsx");
                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                  this.timestamp = (
                    new Date().getTime() -
                    new Date().getTimezoneOffset() * 60000
                  ).toString();
                  this.datepicker.range = null;
                  this.date_picked = false;
                  this.isLoading = false;
                }, 750);
              }
            });

          break;

        case "COVID 19 RT PCR Test":
          // console.warn("U izradi...");
          this.isLoading = true;

          // setTimeout(() => {
          //   this.isLoading = false;
          // }, 2000);
          http
            .get(
              "rt/xlsx/download?token=" +
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
                link.setAttribute("download", this.timestamp + ".xlsx");
                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                  this.timestamp = (
                    new Date().getTime() -
                    new Date().getTimezoneOffset() * 60000
                  ).toString();
                  this.datepicker.range = null;
                  this.date_picked = false;
                  this.isLoading = false;
                }, 750);
              }
            });

          break;

        case "COVID 19 Antigen Test":
          // console.warn("U izradi...");
          this.isLoading = true;

          // setTimeout(() => {
          //   this.isLoading = false;
          // }, 2000);
          http
            .get(
              "ag/xlsx/download?token=" +
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
                link.setAttribute("download", this.timestamp + ".xlsx");
                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                  this.timestamp = (
                    new Date().getTime() -
                    new Date().getTimezoneOffset() * 60000
                  ).toString();
                  this.datepicker.range = null;
                  this.date_picked = false;
                  this.isLoading = false;
                }, 750);
              }
            });

          break;

        default:
          console.log("Izbornik nije definisan.");

          break;
      }
    },
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    doSomethingOnClick(input) {
      this.timestamp = (
        new Date().getTime() -
        new Date().getTimezoneOffset() * 60000
      ).toString();
      this.datepicker.range = null;
      this.date_picked = false;
      this.izbor = input;
      this.izborText = input;
    },

    doSomethingOnChangeDateRange(input) {
      if (input[1] != undefined) {
        setTimeout(() => {
          this.generateReport();
        }, 500);
      }
    },

    generateReport() {
      var daterange = this.datepicker.range;
      var range = daterange.split("do");

      if (range.length === 2) {
        var from = range[0].trim();
        from =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        var to = range[1].trim();
        to = to.slice(6, 10) + "-" + to.slice(3, 5) + "-" + to.slice(0, 2);
        daterange = from + " do " + to;
      } else {
        var from = range[0].trim();
        from =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        var to = range[0].trim();
        to =
          from.slice(6, 10) + "-" + from.slice(3, 5) + "-" + from.slice(0, 2);
        daterange = from;
      }

      switch (this.izbor) {
        case "Obrađeni uzorci":
          this.isLoading = true;
          this.izborText = "Obrađeni uzorci";

          // setTimeout(() => {
          //   this.isLoading = false;
          // }, 2000);

          http
            .post("reports/xlsx/obradjeno", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.success) {
                this.isLoading = false;
                this.date_picked = true;
              } else {
                this.isLoading = false;
              }
            });

          break;

        case "COVID 19 RT PCR Test":
          this.isLoading = true;
          this.izborText = "COVID 19 RT PCR Test";

          // setTimeout(() => {
          //   this.isLoading = false;
          // }, 2000);

          http
            .post("reports/xlsx/rt", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.success) {
                this.isLoading = false;
                this.date_picked = true;
              } else {
                this.isLoading = false;
              }
            });

          break;

        case "COVID 19 Antigen Test":
          this.isLoading = true;
          this.izborText = "COVID 19 Antigen Test";

          // setTimeout(() => {
          //   this.isLoading = false;
          // }, 2000);

          http
            .post("reports/xlsx/ag", {
              timestamp: this.timestamp,
              range: daterange,
              token: this.$store.state.token,
              site: this.$store.state.site,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.success) {
                this.isLoading = false;
                this.date_picked = true;
              } else {
                this.isLoading = false;
              }
            });

          break;

        default:
          console.log("Izbornik nije definisan.");

          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/toasts";

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

.lnk {
  color: $dark-gray;
  text-decoration: none;
}

a:hover {
  color: $vue-green;
}

.clicked {
  color: $vue-green;
  text-transform: uppercase;
}

.empty {
  color: #acb5be;
}
</style>
