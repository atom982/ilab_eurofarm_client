<template>
  <div class="form-elements">
    <div class="row" v-show="screen_one">
      <div class="col-md-4">
        <div class="form-check abc-checkbox abc-checkbox-primary">
          <input class="form-check-input" id="checkbox1" type="checkbox" v-model="manual">
          <label class="form-check-label" for="checkbox1">
            <span class="abc-label-text">{{'Analiza se radi ručno'}}</span>
          </label>
        </div>
        <div class="form-check abc-checkbox abc-checkbox-primary">
          <input class="form-check-input" id="checkbox2" type="checkbox" v-model="multi" disabled>
          <label class="form-check-label" for="checkbox2">
            <span class="abc-label-text">{{'Analiza sadrži analite'}}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="row" v-show="screen_one">
      <div class="col-md-4">
        <div class="form-group">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="sifra"
              required
            >
            <label class="control-label" for="simple-input">{{'Šifra analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <input id="simple-input" v-model="naziv" required>
            <!-- <input
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
            <input id="simple-input" v-model="analit" required>
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

        <div v-show="false" class="form-group">
          <div class="input-group">
            <input id="simple-input" disabled>
            <label class="control-label" for="simple-input">{{'Izaberite kategoriju'}}</label>
            <i class="bar"></i>
          </div>
        </div>

        <vuestic-simple-select
          label="Izaberite kategoriju"
          value="Specifične"
          name="kategorija"
          :required="true"
          ref="kategorijaSelect"
          v-bind:options="['Specifične']"
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
            >
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
            >
            <label class="control-label" for="simple-input">{{'Cijena analize'}}</label>
            <i class="bar"></i>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <button
              class="btn btn-sm btn-secondary pull-right"
              style="text-transform: none;  border: 0px;"
              @click.prevent="Next()"
            >
              <span class="fa fa-forward"></span>
              {{'Naprijed'}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-show="screen_two">
      <div class="col-md-12">
        <div style="border-bottom: 5px solid #f7cc36;" class="info-widget">
          <div class="info-widget-inner">
            <div class="stats">
              <div class="stats-number">
                <i class="ion ion-arrow-down-c text-danger stats-icon"></i>
                <div @click.prevent="FormulaReset()">
                  <span style="color: #f7cc36;">
                    &fnof;
                    {{"("}}
                  </span>
                  <span style="color: #4ae387;">{{formula_string.trim()}}</span>
                  <span style="color: #f7cc36;">{{")"}}</span>
                </div>
              </div>
            </div>
          </div>
          <br>
        </div>
      </div>
    </div>

    <div class="row" v-show="screen_two">
      <div class="col-md-4">
        <div class="vuestic-page-not-found-search">
          <div class="vuestic-page-not-found-search__content">
            <div class="vuestic-page-not-found-search__wallpaper col-md-12">
              <div class="row vuestic-page-not-found-search__message">&nbsp;</div>
            </div>

            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-6">
                <div class="vuestic-page-not-found-search__wallpaper">
                  <div class="form-group">
                    <div class="input-group vuestic-page-not-found-search__input">
                      <input placeholder="Pretraga" v-model="inputValue">
                      <i style="color: #f7cc36;" class="bar"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-show="labassays.length"
              class="vuestic-page-not-found-search__wallpaper vuestic-page-not-found-search__not-found-wallpaper-list"
            >
              <div
                class="vuestic-page-not-found-search__wrapper"
                :style="{'grid-template-columns': 'repeat(1, 1fr)'}"
              >
                <ul class="vuestic-page-not-found-search__list" style="color: #f7cc36;">
                  <li
                    class="vuestic-page-not-found-search__list-element"
                    v-for="(item, index) in filterItems"
                    :key="index"
                    v-show="index < 8"
                  >
                    <a
                      @click.prevent="Formula(item)"
                      :class="{'unchosen-link': true, 'plain-link': false}"
                      :id="item._id"
                      href="#"
                    >{{item.naziv}} | {{item.analit}}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-1">
        <div class="vuestic-page-not-found-search__wallpaper col-md-12">
          <div class="row vuestic-page-not-found-search__message">&nbsp;</div>
        </div>

        <br>
        <br>
        <div v-for="i in operations" class="col" :key="i">
          <div>
            <button
              @click="Operations(i)"
              style="text-transform: none;  border: 0px; border-radius: 0px; width: 50px;"
              class="btn btn-secondary btn-micro"
            >{{i}}</button>
          </div>
        </div>
      </div>

      <div class="col-md-1">
        <div class="vuestic-page-not-found-search__wallpaper col-md-12">
          <div class="row vuestic-page-not-found-search__message">&nbsp;</div>
        </div>

        <br>
        <br>
        <div v-for="i in numbers" class="col" :key="i">
          <div>
            <button
              @click="Operations(i)"
              style="text-transform: none;  border: 0px; border-radius: 0px; width: 50px;"
              class="btn btn-secondary btn-micro"
            >{{i}}</button>
          </div>
        </div>
      </div>

      <div class="col-md-2">
        <div class="vuestic-page-not-found-search__wallpaper col-md-12">
          <div class="row vuestic-page-not-found-search__message">&nbsp;</div>
        </div>

        <br>
        <br>
        <div v-for="(i, index) in functions" class="col" :key="index" v-show="index < 6">
          <div>
            <button
              @click="Operations(i)"
              style="text-transform: none;  border: 0px; border-radius: 0px; width: 150px;"
              class="btn btn-secondary-danger btn-micro"
            >{{i}}</button>
          </div>
        </div>
      </div>

      <div class="col-md-2">
        <div class="vuestic-page-not-found-search__wallpaper col-md-12">
          <div class="row vuestic-page-not-found-search__message">&nbsp;</div>
        </div>

        <br>
        <br>
        <div
          v-for="(i, index) in functions"
          class="col"
          :key="index"
          v-show="index > 5 && index < 12"
        >
          <div>
            <button
              @click="Operations(i)"
              style="text-transform: none;  border: 0px; border-radius: 0px; width: 150px;"
              class="btn btn-secondary-danger btn-micro"
            >{{i}}</button>
          </div>
        </div>
      </div>

      <div class="col-md-2">
        <div class="vuestic-page-not-found-search__wallpaper col-md-12">
          <div class="row vuestic-page-not-found-search__message">&nbsp;</div>
        </div>

        <br>
        <br>
        <div
          v-for="(i, index) in functions"
          class="col"
          :key="index"
          v-show="index > 11 && index < 20"
        >
          <div>
            <button
              @click="Operations(i)"
              style="text-transform: none;  border: 0px; border-radius: 0px; width: 150px;"
              class="btn btn-secondary-danger btn-micro"
            >{{i}}</button>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-show="screen_two">
      <div class="col-md-6"></div>

      <div class="col-md-6">
        <div class="btn-container">
          <button
            class="btn btn-sm btn-secondary pull-left"
            style="text-transform: none;  border: 0px;"
            @click.prevent="Previous()"
          >
            <span class="fa fa-backward"></span>
            {{'Nazad'}}
          </button>
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
  name: "assays-calculated",

  computed: {
    filterItems() {
      var filtered = [];
      this.labassays.forEach(element => {
        if (!element.multi && !element.calculated && element.specific != null) {
          filtered.push(element);
        }
      });
      if (this.inputValue.length >= 1) {
        return filtered.filter(
          item =>
            item.naziv.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1 ||
            item.analit.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1
        );
      } else {
        return filtered;
      }
    }
  },
  data() {
    return {
      inputValue: "",
      formula_string: "",
      formula_eval: "",
      screen_one: true,
      screen_two: false,
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
      operations: ["+", "-", "/", "*", "(", ")", "."],
      numbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      functions: [
        "Math.abs",
        "Math.acos",
        "Math.asin",
        "Math.atan",
        "Math.atan2",
        "Math.ceil",
        "Math.cos",
        "Math.exp",
        "Math.floor",
        "Math.log",
        "Math.max",
        "Math.min",
        "Math.pow",
        "Math.random",
        "Math.round",
        "Math.sin",
        "Math.sqrt",
        "Math.tan"
      ],

      // Prerequisites
      labassay: {},
      labassays: [],
      specific: false,

      // LabAssays
      manual: false,
      multi: false,
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
      calculated: true,
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
        this.sekcije = res.data.settings[0].sekcije;
        this.grupe = res.data.settings[0].grupe;
        this.tipovi = res.data.settings[0].lab_tipovi;
        this.jedinice = res.data.settings[0].jedinice;
        this.kategorije = res.data.settings[0].kategorije;
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
  },
  mounted() {
    bus.$on("Kalkulisane analize", data => {
      // console.log(data)
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
      this.Reset();
      this.screen_one = true;
      this.screen_two = false;
    });
  },

  components: {
    Loading
  },

  beforeDestroy() {
    bus.$off("Kalkulisane analize");
  },

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    RandomFloat() {
      var min = 0.02;
      var max = 9.56;
      return Math.random() * (max - min) + min;
    },

    Next() {
      var uslov = true;

      if (
        this.sifra.trim() === "" ||
        this.naziv.trim() === "" ||
        this.analit.trim() === "" ||
        this.sekcija.trim() === "" ||
        this.grupa.trim() === "" ||
        this.tip.trim() === "" ||
        this.entryorder.trim() === "" ||
        this.grouporder.trim() === "" ||
        this.price.trim() === ""
      ) {
        uslov = false;
      }

      if (uslov) {
        this.screen_one = false;
        this.screen_two = true;
        this.kategorija =
          "Specifične | " + this.naziv.trim() + " | " + this.analit.trim();
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

    Previous() {
      this.screen_one = true;
      this.screen_two = false;
    },

    Reset() {
      this.screen_one = true;
      this.screen_two = false;
      this.inputValue = "";
      this.formula_string = "";
      this.formula_eval = "";

      this.manual = false;
      this.multi = false;
      this.sifra = new Date().getTime().toString();
      this.naziv = "";
      this.analit = "";
      this.sekcija = "";
      this.grupa = this.grupe[0];
      this.tip = "";
      this.jedinica = "";
      this.kategorija = "";
      this.entryorder = this.entryorders[0];
      this.sites = this.codes;
      this.grouporder = "0";
      this.price = "0";
      this.calculated = true;
      this.specific = false;
      this.calculatedTests = [];
      this.calculatedFormula = [];
      this.bundledTests = [];
    },

    Formula(data) {
      var klasa = "primary";

      if (data.manual) {
        klasa = "pale";
      }

      var calc = {
        labassay: data._id,
        ime_testa: data.naziv,
        analit: data.analit,
        manual: data.manual,
        itemName: data.naziv,
        opis: data.analit,
        uzorak: data.tip,
        cijena: data.price,
        code: data.code,
        izabran: false,
        klasa: klasa
      };

      var bundle = {
        labassay: data._id,
        itemName: data.naziv,
        opis: data.analit,
        manual: data.manual,
        uzorak: data.tip,
        cijena: data.price,
        code: data.code,
        izabran: false,
        klasa: klasa
      };

      this.formula_string += data.naziv + " ";
      this.formula_eval += this.RandomFloat().toFixed(2) + " ";
      this.calculatedFormula.push(data._id);
      this.calculatedTests.push(calc);
      this.bundledTests.push(bundle);
    },

    Operations(data) {
      this.formula_string += data + " ";
      this.formula_eval += data + " ";
      this.calculatedFormula.push(data);
    },

    FormulaReset() {
      this.formula_string = "";
      this.formula_eval = "";
      this.calculatedFormula = [];
      this.calculatedTests = [];
      this.bundledTests = [];
    },

    Check(data) {
      this.kategorija =
        "Specifične | " + this.naziv.trim() + " | " + this.analit.trim();

      var greska = false;

      try {
        eval(this.formula_eval);
      } catch (err) {
        greska = true;
      } finally {
        if (!greska && !isNaN(eval(this.formula_eval))) {
          if (
            this.calculatedFormula.length === 1 &&
            this.calculatedFormula[0].length === 24
          ) {
            // console.warn("Specifična analiza...");
            this.specific = true;
            this.bundledTests.forEach(element => {
              element.uzorak = this.tip.trim();
            });
            this.calculatedTests.forEach(element => {
              element.uzorak = this.tip.trim();
            });
          } else {
            this.specific = false;
          }

          var klasa = "warning";

          var init = {
            labassay: "",
            itemName: this.naziv.trim(),
            opis: this.analit.trim(),
            manual: this.manual,
            uzorak: this.tip.trim(),
            cijena: this.price.trim(),
            code: "",
            izabran: false,
            klasa: klasa
          };

          this.bundledTests.unshift(init);
          this.Save();
        } else {
          this.toastText = "Formula nije validna.";
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
      }
    },

    Save() {
      // Logika...

      this.isLoading = true;
      http
        .post("assays/lab/save", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          sifra: this.sifra,
          naziv: this.naziv,
          multi: false,
          multiparam: this.multiparam,
          specific: this.specific,
          analit: this.analit,
          sekcija: this.sekcija,
          grupa: this.grupa,
          grouporder: this.grouporder,
          entryorder: this.entryorder,
          analyser: this.analyser,
          sites: this.sites,
          jedinica: this.jedinica,
          tip: this.tip,
          bundle: this.bundle,
          bundledTests: this.bundledTests,
          kategorija: this.kategorija,
          orderbyusage: this.orderbyusage,
          manual: this.manual,
          disabled: this.disabled,
          calculated: true,
          calculatedTests: this.calculatedTests,
          calculatedFormula: this.calculatedFormula,
          price: this.price
        })
        .then(res => {
          if (res.data.success) {
            http
              .post("assays/lab/calc/edit", {
                token: this.$store.state.token,
                site: this.$store.state.site,
                labassay: res.data.labassay
              })
              .then(res => {
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
              });
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

.stats-number,
.stats-title {
  line-height: 1;
}

.info-widget-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;

  &.has-chart {
    justify-content: space-between;
  }

  .stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.stats-number {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 2.625rem;
  margin-bottom: 0.5rem;

  .stats-icon {
    font-size: 1.5625rem;
    position: absolute;
    top: 0.625rem;
    left: -1.25rem;

    &.icon-wide {
      left: -1.875rem;
    }
  }
}

.unchosen-link {
  color: #f7cc36;
  text-decoration: none;
}
</style>
