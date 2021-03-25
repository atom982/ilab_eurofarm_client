<template>
  <div class="form-elements">
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
            <label class="control-label" for="simple-input">{{
              "Šifra panela"
            }}</label>
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
            <label class="control-label" for="simple-input">{{
              "Naziv panela"
            }}</label>
            <i class="bar"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input id="simple-input" v-model="analit" required />
            <!--  <input
              onpaste="return false;"
              autocomplete="off"
              id="simple-input"
              v-model="analit"
              required
            >-->
            <label class="control-label" for="simple-input">{{
              "Opis panela"
            }}</label>
            <i class="bar"></i>
          </div>
        </div>

        <vuestic-multi-select
          label="Prikaz na lokacijama"
          v-model="sites"
          title=" "
          v-bind:options="codes"
        ></vuestic-multi-select>
      </div>

      <div class="col-md-4">
        <div class="vuestic-page-not-found-search">
          <div class="vuestic-page-not-found-search__content">
            <div
              class="vuestic-page-not-found-search__wallpaper col-md-12"
            ></div>

            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-6">
                <div class="vuestic-page-not-found-search__wallpaper">
                  <div class="form-group">
                    <div
                      class="input-group vuestic-page-not-found-search__input"
                    >
                      <input placeholder="Pretraga" v-model="inputValue" />
                      <i style="color: #f7cc36" class="bar" />
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
                :style="{ 'grid-template-columns': 'repeat(1, 1fr)' }"
              >
                <ul
                  class="vuestic-page-not-found-search__list"
                  style="color: #f7cc36"
                >
                  <li
                    class="vuestic-page-not-found-search__list-element"
                    v-for="(item, index) in filterItems"
                    :key="index"
                    v-show="index < 8"
                  >
                    <a
                      @click.prevent="Add(item)"
                      :class="{ 'unchosen-link': true, 'plain-link': false }"
                      :id="item._id"
                      href="#"
                      >{{ item.naziv }} | {{ item.analit }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div
          class="vuestic-page-not-found-search__wrapper"
          :style="{ 'grid-template-columns': 'repeat(1, 1fr)' }"
        >
          <ul
            class="vuestic-page-not-found-search__list"
            style="color: #4ae387"
          >
            <li
              class="vuestic-page-not-found-search__list-element"
              v-for="(item, index) in bundledTests"
              :key="index"
            >
              <a
                @click.prevent="Empty(item)"
                :class="{ 'unchosen-link': false, 'plain-link': true }"
                :id="item._id"
                href="#"
                >{{ item.itemName }} | {{ item.opis }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6"></div>

      <div class="col-md-6">
        <div class="btn-container">
          <button
            class="btn btn-sm btn-secondary pull-right"
            style="text-transform: none; border: 0px"
            @click.prevent="Check()"
          >
            <span class="fa fa-save"></span>
            {{ "SAČUVAJ" }}
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
          <button v-if="false" @click.prevent="Test">{{ "Loading..." }}</button>
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
      this.labassays.forEach((element) => {
        if (element.specific != null) {
          filtered.push(element);
        }
      });
      if (this.inputValue.length >= 1) {
        return filtered.filter(
          (item) =>
            item.naziv.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1 ||
            item.analit.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1
        );
      } else {
        return filtered;
      }
    },
  },
  data() {
    return {
      inputValue: "",
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
      disabled: true,
      calculated: false,
      calculatedTests: [],
      calculatedFormula: [],
      bundle: true,
      bundledTests: [],
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
        this.sekcije = res.data.settings[0].sekcije;
        this.grupe = res.data.settings[0].grupe;
        this.tipovi = res.data.settings[0].lab_tipovi;
        this.jedinice = res.data.settings[0].jedinice;
        this.kategorije = res.data.settings[0].kategorije;
        this.entryorders = res.data.settings[0].entryorders;
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
        res.data.sites.forEach((element) => {
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
      .then((res) => {
        this.labassays = res.data.labassays;
      });
  },
  mounted() {
    bus.$on("Paneli analiza", (data) => {
      this.Reset();
    });
  },

  components: {
    Loading,
  },

  beforeDestroy() {
    bus.$off("Paneli analiza");
  },

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Check() {
      var uslov = true;

      if (
        this.sifra.trim() === "" ||
        this.naziv.trim() === "" ||
        this.analit.trim() === "" ||
        this.bundledTests.length < 1
      ) {
        uslov = false;
      }

      if (uslov) {
        this.kategorija = "Paneli | " + this.naziv.trim();
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

    Reset() {
      this.inputValue = "";

      this.sifra = new Date().getTime().toString();
      this.naziv = "";
      this.analit = "";
      this.sites = this.codes;
      this.bundledTests = [];
    },

    Add(data) {
      if (!data.kategorija.includes("Specifične")) {
        var klasa = "primary";

        if (data.manual) {
          klasa = "pale";
        }

        var bundle = {
          labassay: data._id,
          itemName: data.naziv,
          opis: data.analit,
          manual: data.manual,
          uzorak: data.tip,
          cijena: data.price,
          code: data.code,
          izabran: false,
          klasa: klasa,
        };

        this.bundledTests.push(bundle);
      } else {
        if (data.bundledTests.length) {
          data.bundledTests.forEach((element) => {
            this.bundledTests.push(element);
          });
        } else {
          // console.warn("Exception...");
        }
      }
    },

    Empty() {
      this.bundledTests = [];
    },

    Save() {
      this.isLoading = true;
      http
        .post("assays/lab/save", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          sifra: this.sifra,
          naziv: this.naziv,
          multi: false,
          multiparam: [],
          analit: this.analit,
          sekcija: "Nema podataka",
          grupa: "Nema podataka",
          grouporder: "Nema podataka",
          entryorder: "Nema podataka",
          analyser: "Nema podataka",
          sites: this.sites,
          jedinica: "Nema podataka",
          tip: "Nema podataka",
          bundle: true,
          bundledTests: this.bundledTests,
          kategorija: this.kategorija,
          orderbyusage: 0,
          manual: false,
          disabled: true,
          calculated: false,
          specific: null,
          calculatedTests: [],
          calculatedFormula: [],
          price: "Nema podataka",
        })
        .then((res) => {
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
              className: this.className,
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
              className: this.className,
            });
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
