<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-4">
        <div class="form-check abc-checkbox abc-checkbox-primary">
          <input class="form-check-input" id="checkbox1" type="checkbox" v-model="manual" />
          <label class="form-check-label" for="checkbox1">
            <span class="abc-label-text">{{'Analiza se radi ručno'}}</span>
          </label>
        </div>
        <div class="form-check abc-checkbox abc-checkbox-primary">
          <input class="form-check-input" id="checkbox2" type="checkbox" v-model="multi" />
          <label class="form-check-label" for="checkbox2">
            <span class="abc-label-text">{{'Analiza sadrži analite'}}</span>
          </label>
        </div>  
        <br>      
      </div>
      <div class="col-md-4">        
        <div class="form-check abc-checkbox abc-checkbox-primary">
          <input class="form-check-input" id="checkbox3" type="checkbox" v-model="mikrobiologija" />
          <label class="form-check-label" for="checkbox3">
            <span class="abc-label-text">{{'Mikrobiološka analiza'}}</span>
          </label>
        </div>
        <br>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="sifra"
              required
            />
            <label class="control-label" for="simple-input">{{'Šifra analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <input id="simple-input" v-model="naziv" required />
            <!--  <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="naziv"
              required
            >-->
            <label class="control-label" for="simple-input">{{'Naziv analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input id="simple-input" v-model="analit" required />
            <!-- <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="analit"
              required
            >-->
            <label class="control-label" for="simple-input">{{'Opis analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <vuestic-simple-select
          label="Izaberite sekciju"
          v-model="sekcija"
          name="sekcija"
          :required="true"
          ref="sekcijaSelect"
          v-bind:options="sekcije"
        ></vuestic-simple-select>

        <vuestic-simple-select
          label="Izaberite grupu"
          v-model="grupa"
          name="grupa"
          :required="true"
          ref="grupaSelect"
          v-bind:options="grupe"
        ></vuestic-simple-select>

        <vuestic-simple-select
          label="Izaberite tip uzorka"
          v-model="tip"
          name="tip"
          :required="true"
          ref="tipSelect"
          v-bind:options="tipovi"
        ></vuestic-simple-select>

        <vuestic-simple-select
          label="Izaberite jedinicu"
          v-model="jedinica"
          name="jedinica"
          :required="true"
          ref="jedinicaSelect"
          v-bind:options="jedinice"
        ></vuestic-simple-select>

        <vuestic-simple-select
          label="Izaberite kategoriju"
          v-model="kategorija"
          name="kategorija"
          :required="true"
          ref="kategorijaSelect"
          v-bind:options="kategorije"
        ></vuestic-simple-select>
      </div>

      <div class="col-md-4">
        <vuestic-simple-select
          label="Prikaz na prijemu"
          v-model="entryorder"
          name="entryorder"
          :required="true"
          ref="entryorderSelect"
          v-bind:options="entryorders"
        ></vuestic-simple-select>

        <vuestic-multi-select
          label="Prikaz na lokacijama"
          v-model="sites"
          title=" "
          v-bind:options="codes"
        ></vuestic-multi-select>

        <div class="form-group">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="grouporder"
              required
            />
            <label class="control-label" for="simple-input">{{'Redni broj'}}</label>
            <i class="bar"></i>
          </div>
        </div>

        <div class="form-group">
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

        <div class="form-group">
          <div class="input-group">
            <button
              class="btn btn-sm btn-secondary pull-right"
              style="text-transform: none;  border: 0px;"
              @click.prevent="Check()"
            >
              <span class="fa fa-save"></span>
              {{'SAČUVAJ'}}
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
  name: "assays-lab-assay",

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
      sekcije: [],
      grupe: [],
      tipovi: [],
      jedinice: [],
      kategorije: [],
      entryorders: [],
      codes: [],

      // Prerequisites
      labassay: {},
      labassays: [],

      // LabAssays
      manual: false,
      multi: false,
      mikrobiologija: false,
      test_type: "default",
      sifra: new Date().getTime().toString(),
      naziv: "",
      analit: "",
      sekcija: "",
      grupa: "",
      tip: "",
      jedinica: "",
      kategorija: "",
      entryorder: "",
      sites: [],
      grouporder: "0",
      price: "0",
      //
      multiparam: [],
      analyser: "Nema podataka",
      orderbyusage: 0,
      disabled: false,
      calculated: false,
      calculatedTests: [],
      calculatedFormula: [],
      bundle: false,
      bundledTests: []
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
      .then(res => {
        this.sekcije = [];
        this.tipovi = [];
        this.kategorije = [];

        res.data.settings[0].sekcije.forEach(element => {
          if (!element.toLowerCase().includes("mikrobiologija") || element.toLowerCase().trim() === "mikrobiologija") {
            this.sekcije.push(element);
          }
        });

        res.data.settings[0].lab_tipovi.forEach(element => {
          if (!element.toLowerCase().includes("mikrobiologija")) {
            this.tipovi.push(element);
          }
        });

        res.data.settings[0].kategorije.forEach(element => {
          if (!element.toLowerCase().includes("mikrobiologija") || element.toLowerCase().trim() === "mikrobiologija") {
            this.kategorije.push(element);
          }
        });

        this.grupe = res.data.settings[0].grupe;
        this.grupa = this.grupe[0];

        this.grupe = res.data.settings[0].grupe;

        this.jedinice = res.data.settings[0].jedinice;

        this.entryorders = res.data.settings[0].entryorders;

        this.grupa = this.grupe[0];
        this.entryorder = this.entryorders[0];
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
        res.data.sites.forEach(element => {
          this.codes.push(element.sifra);
        });

        this.sites = this.codes;
      });

    // LabAssays
    http
      .get(
        "assays/lab/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.labassays = res.data.labassays;
      });
  },
  mounted() {
    bus.$on("Analize analizatora", data => {
      // console.log(data);
      this.Reset();
    });
  },
  watch: {
    mikrobiologija: function() {
      this.sekcija = "";
      this.tip = "";
      this.kategorija = "";

      if (this.mikrobiologija === true) {
        this.test_type = "mikrobiologija";
        this.multi = false;
        this.manual = true;

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
            this.sekcije = [];
            this.tipovi = [];
            this.kategorije = [];

            res.data.settings[0].sekcije.forEach(element => {
              if (element.toLowerCase().includes("mikrobiologija") || element.toLowerCase().trim() === "mikrobiologija") {
                this.sekcije.push(element);
              }
            });

            res.data.settings[0].lab_tipovi.forEach(element => {
              if (element.toLowerCase().includes("mikrobiologija")) {
                this.tipovi.push(element);
              }
            });

            res.data.settings[0].kategorije.forEach(element => {
              if (element.toLowerCase().includes("mikrobiologija") || element.toLowerCase().trim() === "mikrobiologija") {
                this.kategorije.push(element);
              }
            });

            this.grupe = res.data.settings[0].grupe;
            this.grupa = this.grupe[0];
          });
      } else {
        this.test_type = "default";
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
            this.sekcije = [];
            this.tipovi = [];
            this.kategorije = [];

            res.data.settings[0].sekcije.forEach(element => {
              if (!element.toLowerCase().includes("mikrobiologija") || element.toLowerCase().trim() === "mikrobiologija") {
                this.sekcije.push(element);
              }
            });

            res.data.settings[0].lab_tipovi.forEach(element => {
              if (!element.toLowerCase().includes("mikrobiologija")) {
                this.tipovi.push(element);
              }
            });

            res.data.settings[0].kategorije.forEach(element => {
              if (!element.toLowerCase().includes("mikrobiologija") || element.toLowerCase().trim() === "mikrobiologija") {
                this.kategorije.push(element);
              }
            });

            this.grupe = res.data.settings[0].grupe;
            this.grupa = this.grupe[0];
          });
      }
    },
    multi: function() {
      if (this.multi === true) {
        this.mikrobiologija = false;
      } else {
      }
    },
    manual: function() {
      if (this.manual === false) {
        this.mikrobiologija = false;
      } else {
      }
    }
  },

  components: {
    Loading
  },

  beforeDestroy() {
    bus.$off("Analize analizatora");
  },

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    Reset() {
      this.manual = false;
      this.mikrobiologija = false;
      this.multi = false;
      this.sifra = new Date().getTime().toString();
      this.naziv = "";
      this.analit = "";
      this.sekcija = "";
      this.grupa = this.grupe[0];
      this.tip = "";
      this.jedinica = "";
      this.kategorija = "";
      this.test_type = "default";
      this.entryorder = this.entryorders[0];
      this.sites = this.codes;
      this.grouporder = "0";
      this.price = "0";
    },
    Check() {
      var uslov = true;

      if (
        this.sifra.trim() === "" ||
        this.naziv.trim() === "" ||
        this.analit.trim() === "" ||
        this.sekcija.trim() === "" ||
        this.grupa.trim() === "" ||
        this.tip.trim() === "" ||
        this.kategorija.trim() === "" ||
        this.entryorder.trim() === "" ||
        this.grouporder.trim() === "" ||
        this.price.trim() === ""
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
        .post("assays/lab/save", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          manual: this.manual,
          mikrobiologija: this.mikrobiologija,
          test_type: this.test_type,
          multi: this.multi,
          sifra: this.sifra,
          naziv: this.naziv,
          analit: this.analit,
          sekcija: this.sekcija,
          grupa: this.grupa,
          tip: this.tip,
          jedinica: this.jedinica,
          kategorija: this.kategorija,
          entryorder: this.entryorder,
          sites: this.sites,
          grouporder: this.grouporder,
          price: this.price,
          multiparam: this.multiparam,
          analyser: this.analyser,
          orderbyusage: this.orderbyusage,
          disabled: this.disabled,
          calculated: this.calculated,
          calculatedTests: this.calculatedTests,
          calculatedFormula: this.calculatedFormula,
          bundle: this.bundle,
          bundledTests: this.bundledTests
        })
        .then(res => {
          if (res.data.success) {
            this.labassays.push(res.data.labassay);
            this.isLoading = false;

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
</style>
