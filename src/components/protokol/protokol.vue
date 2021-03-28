<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget
          headerText="Provjera nalaza - po broju protokola"
        >
          <div class="row">
            <div class="col-md-4">
              <vuestic-simple-select
                v-if="true"
                :label="'Izaberite kod protokola'"
                v-model="kod"
                name="kod"
                :required="true"
                title=" "
                ref="kod"
                v-bind:options="kodovi"
              ></vuestic-simple-select>
            </div>

            <div class="col-md-4">
              <div v-if="kod === ''" class="form-group">
                <div class="input-group">
                  <input
                    id="number-input-icon-left"
                    title=" "
                    name="number-input-icon-left"
                    disabled
                  />
                  <label class="control-label" for="number-input-icon-left">{{
                    "Unesite vrijednost varijable"
                  }}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div v-if="kod != ''" class="form-group with-icon-left">
                <div class="input-group">
                  <input
                   onpaste="return false;"
                                autocomplete="off"
                    id="number-input-icon-left"
                    title=" "
                    v-model="number"
                    name="number-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="number-input-icon-left">{{
                    "Unesite vrijednost varijable"
                  }}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>

           <div class="col-md-4">

              
              <vuestic-simple-select
                v-if="true"
                :label="'Izaberite godinu'"
                v-model="izbor"
                name="kod"
                :required="true"
                title=" "
                ref="kod"
                v-bind:options="['/21']"
              ></vuestic-simple-select>
        


              <!-- Izbor: /21 -->
              <vuestic-radio-button
                v-if="false"
                :label="'/21'"
                :id="'/21'"
                :value="'/21'"
                :name="'/21-radio'"
                :disabled="false"
                v-model="izbor"
              />
            </div>

            
              <!-- Izbor: /20 -->
              <vuestic-radio-button
                v-if="false"
                :label="'/20'"
                :id="'/20'"
                :value="'/20'"
                :name="'/20-radio'"
                :disabled="false"
                v-model="izbor"
              />
            
          </div>




          <div class="row" v-if="false">
            <div class="col-md-4">
              <button
                v-if="true"
                style="text-transform: none; color: #e34a4a"
                class="btn btn-secondary-warning btn-micro"
                @click.prevent="Check"
                :disabled="
                  kod === '' || number.trim() === '' || isNaN(number.trim())
                "
              >
                <i style="font-size: 16px" class="fa fa-check-square-o"></i>
                {{ " Provjeri nalaz" }}
              </button>
            </div>


          </div>






           <div class="row">
                <div class="col-md-12">
                  <div
                   
                    class="btn-container"
                  >
                    <button
                    @click.prevent="Check"
                :disabled="
                  kod === '' || number.trim() === '' || isNaN(number.trim())
                "
                    
                      style="text-transform: none; color: #e34a4a"
                      class="btn btn-sm btn-secondary-warning wizard-next pull-left"
                    >
                      <i class="fa fa-check-square-o"></i>
                      {{ " Provjeri nalaz" }}
                    </button>

                    
                  </div>
                </div>
              </div>
        </vuestic-widget>
      </div>
    </div>

    <div v-if="exists" class="row">
      <div class="col-md-12">
        <vuestic-widget
          :headerText="'Broj protokola: ' + protokol"
        >
          <div class="row">
            <div style="white-space: break-spaces" class="col-md-6">
              <span>&nbsp;{{ message }}</span
              ><br />
              <span>{{ nalaz.ime }}</span>
              <span>{{ nalaz.prezime }}</span
              ><br />
              <span>{{ nalaz.godiste }}</span
              ><br />
              <span>{{ nalaz.spol }}</span
              ><br />
            </div>

            <div style="white-space: break-spaces" class="col-md-6">
              
              <span>&nbsp;{{ nalaz.uzorkovan }}</span
              ><br />
              <span>{{ nalaz.reported }}</span
              ><br />
              <span>{{ nalaz.uzorak }}</span
              ><br />
              <span>{{ nalaz.analiza }}</span
              ><br />
              <span>{{ nalaz.rezultat }}</span
              ><br />
            </div>

            
          </div>
        </vuestic-widget>
      </div>
    </div>




























    <div v-if="!exists" class="row">
      <div class="col-md-12">
        <vuestic-widget
          :headerText="'Unesite broj protokola'"
        >
          <div class="row">
            <div style="white-space: break-spaces" class="col-md-6">
              <span>&nbsp;{{ "" }}</span
              ><br />
              <span>{{ "" }}</span>
              <span>{{ "" }}</span
              ><br />
              <span>{{ "" }}</span
              ><br />
              <span>{{ "" }}</span
              ><br />
            </div>

            <div style="white-space: break-spaces" class="col-md-6">
              
              <span>&nbsp;{{ "" }}</span
              ><br />
              <span>{{ "" }}</span
              ><br />
              <span>{{ "" }}</span
              ><br />
              <span>{{ "" }}</span
              ><br />
              <span>{{ "" }}</span
              ><br />
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
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

export default {
  name: "provjera-nalaza",
  data() {
    return {
      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 1000,
      isToastFullWidth: false,
      className: "",

      // Provjera nalaza
      nalaz: {
        // BioLab Cazin
        // HARIS KAJTAZOVIĆ
        // Godište: 1990
        // Spol: MUŠKI
        lokacija: "",
        ime: "",
        prezime: "",
        godiste: "",
        spol: "",
        uzorkovan: "",
        reported: "",
        analiza: "",
        uzorak: "",
        rezultat: "",
      },
      exists: false,
      message: "",
      number: "",
      izbor: "/21",
      protokol: "",
      kod: "",
      kodovi: [
        "",
        "PJC",
        "SJJ",
        "TZL",
        "PSZ",
        "HLI",
        "HLN",
        "HLD",
      ],
    };
  },

  components: {
    Loading,
  },

  watch: {
    kod: function () {
      if (this.kod === "") {
        // this.protokol = "";
        this.number = "";
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
    onCancel() {},

    

    Check() {
      this.protokol = this.kod + this.number.trim() + this.izbor;

      this.isLoading = true;

      http
        .post("/protokol/get/data/", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          protokol: this.protokol,
        })
        .then((res) => {
          if (res.data.success) {
            this.exists = true;
            this.message = res.data.nalaz.lokacija.lokacija;

            var godiste = res.data.nalaz.patient.jmbg.substring(4, 7);
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

            var uzorkovan = JSON.stringify(res.data.nalaz.uzorkovano)
              .substring(1, 11)
              .split("-");
            var kreirano = JSON.stringify(res.data.nalaz.updated_at)
              .substring(1, 11)
              .split("-");

            this.nalaz.lokacija = res.data.nalaz.lokacija.lokacija;
            this.nalaz.ime = "Ime i prezime: " + res.data.nalaz.patient.ime;
            this.nalaz.prezime = res.data.nalaz.patient.prezime;
            this.nalaz.godiste = "Godište: " + godiste;
            this.nalaz.spol = "Spol: " + res.data.nalaz.patient.spol;

            this.nalaz.uzorkovan =
              "Datum i vrijeme uzimanja brisa: " +
              uzorkovan[2] +
              "." +
              uzorkovan[1] +
              "." +
              uzorkovan[0] +
              " " +
              res.data.nalaz.uzorkovano.substring(11, 16);
            this.nalaz.reported =
              "Datum i vrijeme izdavanja nalaza: " +
              kreirano[2] +
              "." +
              kreirano[1] +
              "." +
              kreirano[0] +
              " " +
              res.data.nalaz.updated_at.substring(11, 16);

              // console.log(res.data.nalaz)

              this.nalaz.analiza = "Analiza: " + res.data.nalaz.analysis

              switch (res.data.nalaz.analysis) {
                case "COVID 19 RT PCR Test":
                  this.nalaz.uzorak = "Tip uzorka: Bris nazofarinksa i orofarinksa";
                  
                  break;

                case "COVID 19 Antigen Test":
                  this.nalaz.uzorak = "Tip uzorka: Bris nazofarinksa";
                  
                  break;
              
                default:
                  this.nalaz.uzorak = "Nema podataka";
                  break;
              }
            
            this.nalaz.rezultat =
              "Rezultat: " + res.data.nalaz.rezultat.toUpperCase();

            this.isLoading = false;

            // console.log(res.data.nalaz);
            // console.log(this.protokol);

            // this.protokol = "";
            this.number = "";
            this.kod = "";
            this.izbor = "/21";
          } else {
            this.exists = true;
            this.message = "Nema dostupnih podataka.";

            this.nalaz.lokacija = "";
            this.nalaz.ime = "";
            this.nalaz.prezime = "";
            this.nalaz.godiste = "";
            this.nalaz.spol = "";
            this.nalaz.analiza = "";
            this.nalaz.uzorkovan = "";
            this.nalaz.reported = "";
            this.nalaz.uzorak = "";
            this.nalaz.rezultat = "";

            this.isLoading = false;

            // this.protokol = "";
            this.number = "";
            this.kod = "";
            this.izbor = "/21";
          }
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

.ui-grid {
  .row {
    div[class^="col"] {
      padding: 0;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 0.5rem 0.25rem;
        min-height: 3rem;
        color: $white;
        background-color: $brand-primary;
        border-radius: 0.5rem;
      }
    }
  }
}
</style>
