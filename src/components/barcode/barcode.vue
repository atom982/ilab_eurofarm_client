<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'Prijem uzorka'">
          <div class="row" style="min-height: 350px">
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-8">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="fl-input-icon-left"
                        title=" "
                        name="fl-input-icon-left"
                        @keyup="doFilter($event)"
                        v-model="filterText"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-search icon-left input-icon search-icon"
                      ></i>
                      <label class="control-label" for="fl-input-icon-left">{{
                        "BROJ UZORKA"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-if="prihvati && filterText.trim().length === 10"
                class="row"
              >
                <div class="col-md-8">
                  <div class="form-check abc-checkbox abc-checkbox-primary">
                    <input
                      class="form-check-input"
                      id="checkbox1"
                      type="checkbox"
                      v-model="barcode"
                    />
                    <label class="form-check-label" for="checkbox1">
                      <span class="abc-label-text">{{
                        "Ispis naljepnice"
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="!prihvati && filterText.trim().length === 10"
              class="col-md-6"
            >
              <div class="row">
                <div class="col-md-12">
                  <span style="color: #e34a4a">{{ text }}</span>
                </div>
              </div>
            </div>

            <div
              class="col-md-6"
              v-if="prihvati && filterText.trim().length === 10"
            >
              <div class="row">
                <div class="col-md-12">
                  {{ "Pošiljaoc: " }}
                  <span style="color: #e34a4a">{{ uzorkovao }}</span>
                </div>
              </div>

              <div class="row" v-if="podruznica != ''">
                <div class="col-md-12">
                  {{ "Podružnica: " }}
                  <span style="color: #e34a4a">{{ podruznica }}</span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  {{ "Analiza: " }}
                  <span style="color: #e34a4a">{{ analiza }}</span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  {{ "Svrha testiranja: " }}
                  <span style="color: #e34a4a">{{ purpose }}</span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  {{ "Prioritet: " }}
                  <span style="color: #e34a4a">{{ prioritet }}</span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  {{ "Tip uzorka: " }}
                  <span style="color: #e34a4a">{{ tip }}</span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  {{ "Datum i vrijeme uzorkovanja: " }}
                  <span style="color: #e34a4a">{{ sampledTime }}</span>
                </div>
              </div>

              <div class="row">
                <div v-if="!simptomi" class="col-md-12">
                  {{ "Pacijent: " }}
                  <span style="color: #e34a4a">{{ ime + " " + prezime }}</span>
                  <!-- <span>{{" - pacijent bez simptoma"}} </span> -->
                </div>

                <div v-if="simptomi" class="col-md-12">
                  <span style="color: #e34a4a">{{ ime + " " + prezime }}</span>
                  <!-- <span>{{" - pacijent ima simptome"}} </span> -->
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  {{ "Datum rođenja: " }}
                  <span style="color: #e34a4a">{{ godiste }}</span>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  {{ "Spol: " }}
                  <span style="color: #e34a4a">{{ spol }}</span>
                </div>
              </div>

              <div class="row" v-show="godiste != ''">
                <div class="col-md-12">
                  <hr />
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div
                    v-if="prihvati && filterText.trim().length === 10"
                    class="btn-container"
                  >
                    <button
                      @click.prevent="NewPatient(false)"
                      style="text-transform: none; color: #e34a4a"
                      class="btn btn-sm btn-secondary-warning wizard-next pull-left"
                    >
                      <i class="fa fa-flask"></i>
                      {{ " Prihvati uzorak" }}
                    </button>

                    <button
                      v-show="false"
                      @click.prevent="NewPatient()"
                      style="text-transform: none; color: #e34a4a"
                      class="btn btn-sm btn-secondary-warning wizard-next pull-right"
                    >
                      <i class="fa fa-barcode"></i>
                      {{ " Prihvati uzorak" }}
                    </button>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

export default {
  name: "barcode",
  data() {
    return {
      barcode: true,
      filterText: "",
      site: "",
      uzorak: "",
      prihvati: false,
      text: "",

      isLoading: false,
      fullPage: true,

      statusUzorka: "ZAPRIMLJEN",

      sampled: false,
      sampled_by: null,

      // Podaci o uzorku

      posiljaoc: "",

      // Podaci o pacijentu
      ime: "",
      prezime: "",
      spol: "",
      godiste: "",
      uzorkovao: "",
      podruznica: "",
      simptomi: false,
      purpose: "",
      analiza: "",
      prioritet: "",
      sampledTime: "",
      tip: "",

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 1000,
      isToastFullWidth: false,
      className: "",
    };
  },

  components: {
    Loading,
  },

  watch: {
    filterText: function () {
      this.filterText = this.filterText.replace("y","Z").replace("Y","Z"); // Keyboard layout
      this.filterText = this.filterText.toUpperCase().trim();
      this.text = "";

      if (this.filterText.length > 10) {
        this.filterText = this.filterText.slice(0, 10);
      }
    },
  },

  created() {},

  mounted() {},

  beforeDestroy() {},

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {
      // "5c69f68c338fe912f99f833b":  PJC (A), Podružnica Centralna Laboratorija, Sarajevo
      // "5f9f705e444e51a464db2543":  SJJ (B), Međunarodni aerodrom Sarajevo
      // "5f9f70a1444e51a464db259a":  TZL (C), Međunarodni aerodrom Tuzla
      // "5fb81465900f08738c6985e7":  PSZ (D), Poliklinika Sunce - Zenica
      // "60508f5ff0a3cf9c7860f5ad":  HLI (E), PZU HBL Laboratorija - Istočno Sarajevo
      // "60508f95f0a3cf9c7860f5bd":  HLN (F), HBL Laboratorija - Novo Sarajevo
      // "60509039f0a3cf9c7860f5e1":  HLD (G), HBL Laboratorija - Dobrinja
      // "6068b249f68be9eab36b4fdb":  PJU (U), Podružnica 1. Unitic, Sarajevo
      // "6068b2d5f68be9eab36b5003":  PJI (Z), Podružnica 2. IUS, Sarajevo
      // "6068b346f68be9eab36b502f":  PJV (V), Podružnica Visoko
      // "6068b3b3f68be9eab36b5088":  PJT (T), Podružnica Tuzla
      // "6068b471f68be9eab36b50f5":  PJG (O), Podružnica Goražde
      // "6068b4fcf68be9eab36b511d":  PJB (P), Podružnica Bugojno
      // "6068b55df68be9eab36b5175":  PJR (R), Podružnica Trebinje
    },

    NewPatient() {
      // console.log(this.barcode)
      this.isLoading = true;

      // console.log("Uzorak: " + this.uzorak);

      http
        .post("/postavke/uzorak/barcodes", {
          token: this.$store.state.token,
          uzorak: this.uzorak,
          sampled: true,
          // PZU "EUROFARM-CENTAR POLIKLINIKA" Sarajevo
          // Podružnica Centralna Laboratorija, Sarajevo
          sampled_by: "5c69f68c338fe912f99f833b",
          statusUzorka: "U OBRADI",
        })
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data.uzorak);

            var godiste = res.data.uzorak.patient.jmbg.substring(4, 7);
            switch (godiste[0]) {
              case "9":
                godiste = "1" + godiste;
                break;
              case "0":
                godiste = "2" + godiste;
                break;
              default:
                break;
            }

            if (this.barcode === true) {
              printEPL(
                res.data.uzorak.patient.ime +
                  " " +
                  res.data.uzorak.patient.prezime,
                res.data.uzorak.id,
                res.data.uzorak.pid,
                godiste,
                res.data.uzorak.datum,
                res.data.link,
                res.data.uzorak.code,
                this.$store.state.site,
                res.data.uzorak.prioritet,
                res.data.uzorak.protokol,
                res.data.uzorak.patient.purpose,
                res.data.uzorak.patient.izdavanje
              );
            }

            this.prihvati = false;
            this.filterText = "";
            this.text = "";

            this.ime = "";
            this.purpose = "";
            this.simptomi = false;
            this.prezime = "";
            this.analiza = "";
            (this.prioritet = ""), (this.barcode = true);
            this.sampledTime = "";
            this.tip = "";
            this.spol = "";
            this.godiste = "";
            this.uzorkovao = "";
            this.podruznica = "";

            this.toastText = "Uzorak uspješno zaprimljen.";
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
            // console.log("Greška prilikom zaprimanja uzorka.");

            this.toastText =
              "Došlo je do greške, molimo Vas da ponovite prijem.";
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

            this.isLoading = false;
          }
        });
    },

    doFilter(event) {
      this.ime = "";
      this.purpose = "";
      this.simptomi = false;
      this.prezime = "";
      this.analiza = "";
      (this.prioritet = ""), (this.barcode = true);
      this.sampledTime = "";
      this.tip = "";
      this.spol = "";
      this.godiste = "";
      this.uzorkovao = "";
      this.podruznica = "";

      this.text = "";
      this.prihvati = false;

      this.site = "";
      this.uzorak = "";

      if (this.filterText.trim().length == 10) {
        // console.warn("Obrađujem Barcode...");
        // Barcode Scanner

        switch (this.filterText.trim()[4]) {
          case "A": // Podružnica Centralna Laboratorija, Sarajevo
            this.site = "5c69f68c338fe912f99f833b";
            break;
          case "B": // Međunarodni aerodrom Sarajevo
            this.site = "5f9f705e444e51a464db2543";
            break;
          case "C": // Međunarodni aerodrom Tuzla
            this.site = "5f9f70a1444e51a464db259a";
            break;
          case "D": // Poliklinika Sunce - Zenica
            this.site = "5fb81465900f08738c6985e7";
            break;
          case "E": // PZU HBL Laboratorija - Istočno Sarajevo
            this.site = "60508f5ff0a3cf9c7860f5ad";
            break;
          case "F": // HBL Laboratorija - Novo Sarajevo
            this.site = "60508f95f0a3cf9c7860f5bd";
            break;
          case "G": // HBL Laboratorija - Dobrinja
            this.site = "60509039f0a3cf9c7860f5e1";
            break;
          case "U": // Podružnica 1. Unitic, Sarajevo
            this.site = "6068b249f68be9eab36b4fdb";
            break;
          case "Z": // Podružnica 2. IUS, Sarajevo
            this.site = "6068b2d5f68be9eab36b5003";
            break;
          case "V": // Podružnica Visoko
            this.site = "6068b346f68be9eab36b502f";
            break;
          case "T": // Podružnica Tuzla
            this.site = "6068b3b3f68be9eab36b5088";
            break;
          case "O": // Podružnica Goražde
            this.site = "6068b471f68be9eab36b50f5";
            break;
          case "P": // Podružnica Bugojno
            this.site = "6068b4fcf68be9eab36b511d";
            break;
          case "R": // Podružnica Trebinje
            this.site = "6068b55df68be9eab36b5175";
            break;

          default:
            this.site = "";
            break;
        }

        this.isLoading = true;
        this.uzorak = this.filterText; // Uzorak ID za pretragu

        http
          .post("/postavke/sample/barcodes", {
            token: this.$store.state.token,
            uzorak: this.uzorak,
          })
          .then((res) => {
            if (res.data.success) {
              // Dohvati uzorak

              // console.log(res.data.uzorak);

              if (res.data.uzorak.sampled) {
                if (res.data.rezultat.verificiran) {
                  // console.warn("Uzorak je obrađen.");
                  this.text = "Uzorak je obrađen.";
                } else {
                  // console.warn("Uzorak u obradi.");
                  this.text = "Uzorak u obradi.";
                }
                this.isLoading = false;
              } else {
                var godiste = res.data.uzorak.patient.jmbg.substring(4, 7);
                switch (godiste[0]) {
                  case "9":
                    godiste = "1" + godiste + "";
                    break;
                  case "0":
                    godiste = "2" + godiste + "";
                    break;
                  default:
                    godiste = "";
                    break;
                }

                var datr =
                  res.data.uzorak.patient.jmbg.substring(0, 2) +
                  "." +
                  res.data.uzorak.patient.jmbg.substring(2, 4) +
                  "." +
                  godiste;

                this.ime = res.data.uzorak.patient.ime;
                this.purpose = res.data.uzorak.patient.purpose;
                if (res.data.uzorak.patient.symptoms.pacijentbezsimptoma) {
                  this.simptomi = false;
                } else {
                  this.simptomi = true;
                }
                this.prezime = res.data.uzorak.patient.prezime;
                this.analiza = res.data.uzorak.analysis;

                if (res.data.uzorak.prioritet === "NORMALAN") {
                  this.prioritet = "NORMALAN";
                } else if (res.data.uzorak.prioritet === "HITAN") {
                  this.prioritet = "HITAN";
                } else {
                  this.prioritet = "Nema podataka";
                }

                this.barcode = true;

                var uzorkovan = JSON.stringify(res.data.uzorak.datum)
                  .substring(1, 11)
                  .split("-");

                this.sampledTime =
                  uzorkovan[2] +
                  "." +
                  uzorkovan[1] +
                  "." +
                  uzorkovan[0] +
                  " " +
                  res.data.uzorak.datum.substring(11, 16);

                // Eurofarm Centar

                if (this.analiza === "COVID 19 RT PCR Test") {
                  this.tip = "Bris nazofarinksa i orofarinksa";
                } else if (this.analiza === "COVID 19 RT LAMP Test") {
                  this.tip = "Bris nazofarinksa";
                } else if (this.analiza === "COVID 19 Antigen Test") {
                  this.tip = "Bris nazofarinksa";
                } else if (this.analiza === "COVID 19 Antitijela Test") {
                  this.tip = "Serum";
                } else {
                  this.tip = "Nema podataka";
                }

                this.spol = res.data.uzorak.patient.spol;
                this.godiste = datr;

                if (res.data.uzorak.site.opis.includes("+")) {
                  var temp = res.data.uzorak.site.opis.split("+");

                  this.uzorkovao = temp[0];
                  this.podruznica = temp[1];
                } else {
                  this.uzorkovao = res.data.uzorak.site.opis;
                  this.podruznica = "";
                }

                this.prihvati = true;
                this.isLoading = false;
              }
            } else {
              this.text = "Uzorak nije pronađen.";
              this.isLoading = false;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.search-icon {
  transform: rotate(90deg);
}
</style>