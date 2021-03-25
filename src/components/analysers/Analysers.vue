<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding minHeight">
      <vuestic-tabs :names="['Registracija', 'Pregled']" :tab="'Registracija'" ref="tabs">
        <div :slot="'Registracija'">
          <div class="row">
            <div class="col-md-4">
              <div class="col-md-12">
                <fieldset>
                  <div v-for="element in all_sites" :key="element._id">
                    <vuestic-radio-button
                      :label="element.naziv + ' | ' + element.adresa"
                      :id="element.naziv"
                      :value="element.naziv"
                      :name="'radio'"
                      v-model="radioModel"
                    />
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="col-md-4">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-check abc-checkbox abc-checkbox-primary">
                    <input class="form-check-input" id="checkbox1" type="checkbox" v-model="rucno">
                    <label class="form-check-label" for="checkbox1">
                      <span class="abc-label-text">{{'Ručna metoda'}}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="ime"
                    required
                  >
                  <label class="control-label" for="simple-input">{{'Naziv analizatora'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="sn"
                    required
                  >
                  <label class="control-label" for="simple-input">{{'Serijski broj'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="make"
                    required
                  >
                  <label class="control-label" for="simple-input">{{'Proizvođač'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <vuestic-simple-select
                label="Tip analizatora"
                v-model="tip"
                name="tip"
                :required="true"
                ref="tipSelect"
                v-bind:options="tipovi"
              ></vuestic-simple-select>

              <vuestic-simple-select
                label="Izbor tehnologije"
                v-model="tehnologija"
                name="tehnologija"
                :required="true"
                ref="tehnologijaSelect"
                v-bind:options="tehnologije"
              ></vuestic-simple-select>

              <vuestic-simple-select
                label="Izbor sekcije"
                v-model="sekcija"
                name="sekcija"
                :required="true"
                ref="sekcijaSelect"
                v-bind:options="sekcije"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <button
                    class="btn btn-sm btn-secondary pull-right"
                    style="text-transform: none;  border: 0px;"
                    @click.prevent="Check()"
                  >
                    <span class="fa fa-save"></span>
                    {{ ' SAČUVAJ'}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :slot="'Pregled'">
          <div class="row">
            <div class="col-md-4">
              <div class="col-md-12">
                <fieldset>
                  <vuestic-radio-button
                    :label="selected_site.naziv + ' | ' + selected_site.adresa"
                    :id="selected_site.naziv"
                    :value="selected_site.naziv"
                    :name="'selected_site'"
                    disabled
                    v-model="selected_site.naziv"
                  />
                </fieldset>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table v-show="analysers.length" class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td width="15%">{{'Naziv'}}</td>
                      <td width="15%">{{'Serijski broj'}}</td>
                      <td width="15%">{{'Proizvođač'}}</td>
                      <td width="15%">{{'Tip'}}</td>
                      <td width="15%">{{'Tehnologija'}}</td>
                      <td width="8%">{{'Manual'}}</td>
                      <td width="9%" align="center">{{'Uredi'}}</td>
                      <td width="8%" align="center">{{'Akcija'}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in analysers" :key="element._id">
                      <td>{{element.ime}}</td>
                      <td>{{element.sn}}</td>
                      <td>{{element.make}}</td>
                      <td>{{element.tip}}</td>
                      <td>{{element.tehnologija[0]}}</td>
                      <td>
                        <div class="form-check abc-checkbox abc-checkbox-primary">
                          <input
                            class="form-check-input"
                            :id="element._id"
                            type="checkbox"
                            v-model="element.manual"
                            disabled
                          >
                          <label class="form-check-label"></label>
                        </div>
                      </td>
                      <td align="center">
                        <button
                          @click.prevent="EditJson($event, element)"
                          class="btn btn-primary btn-micro"
                        >
                          <span class="fa fa-edit"></span>
                        </button>
                      </td>
                      <td align="center">
                        <button
                          @dblclick.prevent="Delete($event, element)"
                          class="btn btn-danger btn-micro"
                        >
                          <span class="fa fa-trash-o"></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

    <json-edit-analysers
      :show.sync="show"
      ref="staticModalJSONEdit"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #4ae387;">{{'JSON Editor'}}</span>
      </div>
    </json-edit-analysers>
  </div>
</template>

<script>
import { http } from "../../../config/config.js";
import { bus } from "../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "assays-ana-assay",

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

      // Const
      tipovi: [],
      tehnologije: [],
      sekcije: [],

      // Prerequisites
      radioModel: "",
      all_sites: [],
      selected_site: {},
      all_analysers: [],
      analysers: [],
      selected_tab: "",
      rucno: false,

      // Analyser
      ime: "",
      sn: "",
      make: "",
      manual: false,
      tip: "",
      tehnologija: "",
      sekcija: ""
    };
  },

  created() {
    this.selected_tab = "Registracija";
    // Settings
    http
      .get(
        "assays/settings?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.tipovi = res.data.settings[0].analyser_tipovi;
        this.tehnologije = res.data.settings[0].analyser_tehnologije;
        if (this.tehnologije.length < 2) {
          this.tehnologija = "Nema podataka";
        }
        this.sekcije = res.data.settings[0].sekcije;
      });

    // Sites
    http
      .get(
        "assays/site?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.all_sites = res.data.sites;

        this.all_sites.forEach(element => {
          if (element._id === this.$store.state.site) {
            this.selected_site = element;
            this.radioModel = element.naziv;
          }
        });

        // Analysers
        http
          .get(
            "postavke/list/analysers?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site,
            {}
          )
          .then(res => {
            this.all_analysers = res.data.analysers;

            this.analysers = [];

            this.all_analysers.forEach(element => {
              if (element.site.naziv === this.radioModel) {
                this.analysers.push(element);
              }
            });
          });
      });
  },
  mounted() {
    bus.$on("tabChanged", data => {
      this.selected_tab = data;
    });
    bus.$on("AnalysersRefresh", () => {
      // Analysers
      http
        .get(
          "postavke/list/analysers?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.all_analysers = res.data.analysers;

          this.analysers = [];

          this.all_analysers.forEach(element => {
            if (element.site.naziv === this.radioModel) {
              this.analysers.push(element);
            }
          });
        });
    });
  },

  components: {
    Loading
  },

  watch: {
    radioModel: function() {
      this.rucno = false;
      this.all_sites.forEach(element => {
        if (element.naziv === this.radioModel) {
          this.selected_site = element;
        }
      });

      this.analysers = [];

      this.all_analysers.forEach(element => {
        if (element.site.naziv === this.radioModel) {
          this.analysers.push(element);
        }
      });
    },
    rucno: function() {
      if (this.selected_tab === "Registracija") {
        this.manual = this.rucno;
        if (this.manual) {
          this.ime = "Ručna metoda";
          this.sn = new Date().getTime().toString();
          this.make = "Nema podataka";
          this.tip = "Nema podataka";
          this.manual = true;
          this.tehnologija = "Nema podataka";
          this.sekcija = "Nema podataka";
        } else {
          this.Reset();
        }
      }
    }
  },
  beforeDestroy() {
    bus.$off("AnalysersRefresh");
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
    EditJson(event, element) {
      bus.$emit("JsonEditAnalysersOpen", element);
    },
    Delete(event, element) {
      http
        .post("postavke/analysers/remove", {
          analyser: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            // Analysers
            http
              .get(
                "postavke/list/analysers?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then(res => {
                this.all_analysers = res.data.analysers;

                this.analysers = [];

                this.all_analysers.forEach(element => {
                  if (element.site.naziv === this.radioModel) {
                    this.analysers.push(element);
                  }
                });
              });
          } else {
          }
        });
    },
    Reset() {
      this.ime = "";
      this.sn = "";
      this.make = "";
      this.manual = false;
      this.tip = "";
      this.tehnologija = "";
      if (this.tehnologije.length < 2) {
        this.tehnologija = "Nema podataka";
      }
      this.sekcija = "";

      // Analysers
      http
        .get(
          "postavke/list/analysers?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.all_analysers = res.data.analysers;

          this.analysers = [];

          this.all_analysers.forEach(element => {
            if (element.site.naziv === this.radioModel) {
              this.analysers.push(element);
            }
          });
        });
    },
    Check(data) {
      var uslov = true;

      if (
        this.ime.trim() === "" ||
        this.sn.trim() === "" ||
        this.make.trim() === "" ||
        this.tip.trim() === "" ||
        this.tehnologija.trim() === "" ||
        this.sekcija.trim() === ""
      ) {
        uslov = false;
      }

      if (uslov) {
        this.Save();
      } else {
        this.toastText = "Sva polja su obavezna.";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className
        });
      }
    },
    Save() {
      this.isLoading = true;

      http
        .post("postavke/analysers/insert", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          selected_site: this.selected_site,
          ime: this.ime,
          sn: this.sn,
          make: this.make,
          manual: this.manual,
          tip: this.tip,
          tehnologija: this.tehnologija,
          sekcija: this.sekcija
        })
        .then(res => {
          if (res.data.success) {
            this.toastText = "Unos uspješno obavljen.";
            this.toastIcon = "fa-check";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-primary";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className
            });
            this.Reset();
            this.isLoading = false;
          } else {
            this.toastText = "Greška prilikom upisa.";
            this.toastIcon = "fa-remove";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-danger";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className
            });
          }
        });
    }
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
