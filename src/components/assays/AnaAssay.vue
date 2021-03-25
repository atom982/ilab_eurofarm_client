<template>
  <div class="form-elements">
    <div class="row">
      <!-- Site -->
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
      <!--  -->
      <div class="col-md-4">
        <!-- Analyser -->
        <vuestic-simple-select
          label="Izbor analizatora"
          v-model="aparat"
          name="country"
          :required="true"
          ref="hsCountrySelect"
          v-bind:options="analysers_select"
        ></vuestic-simple-select>
        <!-- Analiza -->
        <div class="form-group" v-show="aparat == ''">
          <div class="input-group">
            <input id="input-icon-left" title=" " name="input-icon-left" disabled />

            <label class="control-label" for="input-icon-left">{{'Izbor analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <vuestic-simple-select-bubble
          v-show="aparat != ''"
          label="Izbor analize"
          v-model="test"
          v-bind:options="todo_select"
        />
        <!-- Tip uzorka -->
        <div class="form-group" v-show="aparat == ''">
          <div class="input-group">
            <input id="input-icon-left" title=" " name="input-icon-left" disabled />

            <label class="control-label" for="input-icon-left">{{'Podržani tipovi uzoraka'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <vuestic-multi-select
          v-show="aparat != ''"
          :label="'Podržani tipovi uzoraka'"
          v-model="tipoviUzorka"
          title=" "
          v-bind:options="tipovi"
        ></vuestic-multi-select>
        <!-- Metoda analize -->
        <div class="form-group" v-show="aparat == ''">
          <div class="input-group">
            <input id="input-icon-left" title=" " name="input-icon-left" disabled />

            <label class="control-label" for="input-icon-left">{{'Metoda analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <div class="form-group" v-show="aparat != ''">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="metoda"
              required
            />
            <label class="control-label" for="simple-input">{{'Metoda analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="col-md-4">
        <!-- Kod analize -->
        <div class="form-group" v-show="aparat == ''">
          <div class="input-group">
            <input id="input-icon-left" title=" " name="input-icon-left" disabled />

            <label class="control-label" for="input-icon-left">{{'Metoda analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <div class="form-group" v-show="aparat != ''">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="kod"
              required
            />
            <label class="control-label" for="simple-input">{{'Kod analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <!-- Zaokruživanje -->
        <div class="form-group" v-show="Multi || aparat == '' || test == ''">
          <div class="input-group">
            <input id="input-icon-left" title=" " name="input-icon-left" required disabled />

            <label class="control-label" for="input-icon-left">{{'Zaokruživanje'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <vuestic-simple-select
          v-show="!Multi && aparat != '' && test != ''"
          label="Zaokruživanje"
          v-model="float"
          name="country"
          :required="true"
          ref="hsCountrySelect"
          v-bind:options="floats"
        ></vuestic-simple-select>
        <!-- Cijena analize -->
        <div class="form-group" v-show="aparat == ''">
          <div class="input-group">
            <input id="input-icon-left" title=" " name="input-icon-left" required disabled />

            <label class="control-label" for="input-icon-left">{{'Cijena analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <div class="form-group" v-show="aparat != ''">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="price"
              required
            />
            <label class="control-label" for="simple-input">{{'Cijena analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>

        <!-- SAČUVAJ -->

        <div class="form-group">
          <div class="input-group">
            <button
              :disabled="aparat.trim() === '' || test.trim() === '' || kod.trim() === '' || price.trim() === '' || tipoviUzorka.length < 1"
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
import { http } from "../../../config/config.js";
import { bus } from "../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "assays-ana-assay",

  data() {
    return {
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
      codes: [],

      // Prerequisites
      Multi: false,
      radioModel: "",
      labassay: {},
      labassays: [],
      anaassay: {},
      anaassays: [],
      all_sites: [],
      selected_site: {},
      all_analysers: [],
      selected_analyser: {},
      analysers_select: [],
      todo: [],
      todo_select: [],
      reference: [],
      aparatID: "",

      // AnaAssays
      aparat: "",
      test: "",
      tipoviUzorka: [],
      metoda: "",
      kod: "",
      float: "",
      floats: ["", "0", "1", "2", "3", "4", "5"],
      price: "0",
    };
  },

  created() {
    // Settings

    http
      .get(
        "assays/settings?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        this.tipovi = res.data.settings[0].ana_tipovi;
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
      .then((res) => {
        this.all_sites = res.data.sites;

        this.all_sites.forEach((element) => {
          this.codes.push(element.sifra);
          if (element._id === this.$store.state.site) {
            this.selected_site = element;
            this.radioModel = element.naziv;
            // console.log(this.radioModel);
          }
        });

        // Analysers

        http
          .get(
            "assays/analyser?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site,
            {}
          )
          .then((res) => {
            this.all_analysers = res.data.analysers;

            this.all_analysers.forEach((element) => {
              if (element.site.naziv === this.radioModel) {
                this.analysers_select.push(element.ime);
              }
            });
          });
      });
  },

  // Mounting Hook

  mounted() {
    bus.$on("Konfiguracija", (data) => {
      this.aparat = ""; // options: this.analysers_select
      this.aparatID = "";
      this.test = ""; // options: this.todo_select
      this.tipoviUzorka = []; // options: this.tipovi
      this.metoda = "";
      this.kod = "";
      this.float = ""; // options: this.floats
      this.price = "0";
    });
  },

  components: {
    Loading,
  },

  watch: {
    // Analyser

    aparat: function () {
      if (this.aparat != "") {
        this.test = ""; // options: this.todo_select
        this.tipoviUzorka = []; // options: this.tipovi
        this.metoda = "";
        this.kod = "";
        this.float = ""; // options: this.floats
        this.price = "0";

        this.all_analysers.forEach((element) => {
          if (
            element.site._id === this.selected_site._id &&
            element.ime === this.aparat
          ) {
            this.selected_analyser = element;
            // console.log("Aparat izabran.");
            // console.log(this.selected_analyser);
          }
        });

        // Get Assays
        this.Assays();
      }
    },

    // Site

    radioModel: function () {
      this.aparat = ""; // options: this.analysers_select
      this.aparatID = "";
      this.test = ""; // options: this.todo_select
      this.tipoviUzorka = []; // options: this.tipovi
      this.metoda = "";
      this.kod = "";
      this.float = ""; // options: this.floats
      this.price = "0";

      this.analysers_select = [];

      this.all_analysers.forEach((element) => {
        if (element.site.naziv === this.radioModel) {
          this.analysers_select.push(element.ime);
        }
      });

      this.all_sites.forEach((element) => {
        if (element.naziv === this.radioModel) {
          this.selected_site = element;
        }
      });
    },

    // Analiza

    test: function () {
      if (this.test != "") {
        this.Multi = false;
        this.float = "";
        this.reference = [];

        this.labassays.forEach((element) => {
          if (element.naziv + " | " + element.analit === this.test) {
            if (element.multi) {
              this.Multi = true;
            }
          }

          if (
            element.naziv + " | " + element.analit === this.test &&
            element.test_type === "mikrobiologija"
          ) {
            this.reference = [
              {
                analit: null,
                interp: "none",
                extend: "",
                grupa: "DJECA",
                spol: "MUŠKI",
                dDob: "0",
                gDob: "18",
                refd: "0",
                refg: "0",
              },
              {
                analit: null,
                interp: "none",
                extend: "",
                grupa: "ODRASLI",
                spol: "MUŠKI",
                dDob: "19",
                gDob: "130",
                refd: "0",
                refg: "0",
              },
              {
                analit: null,
                interp: "none",
                extend: "",
                grupa: "DJECA",
                spol: "ŽENSKI",
                dDob: "0",
                gDob: "18",
                refd: "0",
                refg: "0",
              },
              {
                analit: null,
                interp: "none",
                extend: "",
                grupa: "ODRASLI",
                spol: "ŽENSKI",
                dDob: "19",
                gDob: "130",
                refd: "0",
                refg: "0",
              },
            ];
          } else {
            if (!this.Multi) {
              this.reference = [
                {
                  analit: null,
                  interp: "none",
                  extend: "",
                  grupa: "DJECA",
                  spol: "MUŠKI",
                  dDob: "0",
                  gDob: "18",
                  refd: "0",
                  refg: "0",
                },
                {
                  analit: null,
                  interp: "none",
                  extend: "",
                  grupa: "ODRASLI",
                  spol: "MUŠKI",
                  dDob: "19",
                  gDob: "130",
                  refd: "0",
                  refg: "0",
                },
                {
                  analit: null,
                  interp: "none",
                  extend: "",
                  grupa: "DJECA",
                  spol: "ŽENSKI",
                  dDob: "0",
                  gDob: "18",
                  refd: "0",
                  refg: "0",
                },
                {
                  analit: null,
                  interp: "none",
                  extend: "",
                  grupa: "ODRASLI",
                  spol: "ŽENSKI",
                  dDob: "19",
                  gDob: "130",
                  refd: "0",
                  refg: "0",
                },
              ];
            }
          }
        });
      }
    },
  },
  beforeDestroy() {
    bus.$off("Konfiguracija");
  },

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },

    onCancel() {},

    Check(data) {
      this.labassays.forEach((element) => {
        if (element.naziv + " | " + element.analit === this.test) {
          this.labassay = element;
        }
      });

      this.all_analysers.forEach((element) => {
        if (
          element.site._id === this.$store.state.site &&
          element.ime === this.aparat
        ) {
          this.selected_analyser = element;
        }
      });

      var uslov = true;

      if (
        this.aparat.trim() === "" ||
        this.test.trim() === "" ||
        this.kod.trim() === "" ||
        this.price.trim() === "" ||
        this.tipoviUzorka.length < 1
      ) {
        uslov = false;
      }

      if (uslov) {
        if (this.metoda.trim() === "") {
          this.metoda = "Nema podataka";
        }

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
          className: this.className,
        });
      }
    },
    Save() {
      this.isLoading = true;

      http
        .post("assays/ana/save", {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          aparat: this.selected_analyser._id,
          manual: this.selected_analyser.manual,
          test: this.labassay._id,
          disabled: this.labassay.disabled,
          sekcija: this.labassay.sekcija,
          grupa: this.labassay.grupa,
          kod: this.kod,
          metoda: this.metoda,
          reference: this.reference,
          tipoviUzorka: this.tipoviUzorka,
          site: this.selected_site._id,
          price: this.price,
          float: this.float,
        })
        .then((res) => {
          if (res.data.success) {
            this.aparat = ""; // options: this.analysers_select
            this.aparatID = "";
            this.test = ""; // options: this.todo_select
            this.tipoviUzorka = []; // options: this.tipovi
            this.metoda = "";
            this.kod = "";
            this.float = ""; // options: this.floats
            this.price = "0";

            this.Assays(true);

            this.toastText = "Unos uspješno obavljen.";
            this.toastIcon = "fa-check";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-primary";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className,
            });

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
              className: this.className,
            });

            this.isLoading = false;
          }
        });
    },
    Assays() {
      this.isLoading = true;

      this.todo = [];
      this.todo_select = [];

      // LabAssays
      http
        .get(
          "assays/lab/list?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then((res) => {
          this.labassays = res.data.labassays;

          // AnaAssays
          http
            .get(
              "assays/ana/list?token=" +
                this.$store.state.token +
                "&site=" +
                this.selected_site._id,
              {}
            )
            .then((res) => {
              this.anaassays = res.data.anaassays;

              this.labassays.forEach((labassay) => {
                var exists = false;

                this.anaassays.forEach((anaassay) => {
                  if (
                    labassay._id === anaassay.test._id &&
                    this.selected_analyser._id === anaassay.aparat._id
                  ) {
                    // console.log(labassay.naziv);
                    exists = true;
                  }
                });

                if (!labassay.bundle && !exists) {
                  if (
                    !this.todo.filter((todo) => todo._id === labassay._id)
                      .length > 0
                  ) {
                    this.todo.push(labassay);
                  }
                  if (
                    !this.todo_select.filter(
                      (todo) =>
                        todo === labassay.naziv + " | " + labassay.analit
                    ).length > 0
                  ) {
                    this.todo_select.push(
                      labassay.naziv + " | " + labassay.analit
                    );
                  }
                }
              });

              // console.log(this.todo_select.length);

              this.isLoading = false;
            });
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
</style>
