<template>
  <div class="form-elements">
    <div v-if="false" class="row">
      <div class="col-md-4">
        <div class="form-check abc-checkbox abc-checkbox-primary">
          <input
            class="form-check-input"
            id="checkbox1"
            type="checkbox"
            v-model="multi"
          />
          <label class="form-check-label" for="checkbox1">
            <span class="abc-label-text">{{ "Single kontrola" }}</span>
          </label>
        </div>
        <br />
      </div>
    </div>

    <div v-if="main" class="row">
      <div class="col-md-6">
        <div class="form-group">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              id="sifra"
              v-model="sifra"
              required
            />
            <label class="control-label" for="simple-input">{{
              "Šifra kontrole"
            }}</label>
            <i class="bar"></i>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <input id="maker" v-model="maker" required />

            <label class="control-label" for="simple-input">{{
              "Proizvođač kontrole"
            }}</label>
            <i class="bar"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input id="naziv" v-model="naziv" required />

            <label class="control-label" for="simple-input">{{
              "Naziv kontrole"
            }}</label>
            <i class="bar"></i>
          </div>
        </div>

        <div class="form-group">
          <div class="input-group">
            <input id="lot" v-model="lot" required />

            <label class="control-label" for="simple-input">{{
              "LOT kontrole"
            }}</label>
            <i class="bar"></i>
          </div>
        </div>

        <vuestic-multi-select
          label="Odobreni analizatori"
          v-model="aparati"
          title=" "
          v-bind:options="analysers"
        ></vuestic-multi-select>
      </div>

      <div class="col-md-1"></div>

      <div class="col-md-5">
        <div class="form-group">
          <div class="input-group">
            <vuestic-date-picker
              id="date-picker-basic"
              :config="{ inline: true }"
              v-model="rok"
            />
            <label class="control-label" for="date-picker-basic">{{
              "Rok važenja kontrole"
            }}</label>
          </div>
        </div>
      </div>
    </div>

    <div v-if="main" class="row">
      <div class="col-md-6"></div>

      <div class="col-md-6">
        <div class="btn-container">
          <button
            class="btn btn-sm btn-secondary pull-right"
            style="text-transform: none; border: 0px;"
            @click.prevent="Forward()"
          >
            <span class="fa fa-forward"></span>
            {{ "Naprijed" }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="!main" class="row">
      <div class="col-md-6">
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
                      <i style="color: #f7cc36;" class="bar" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-show="Assays.length"
              class="vuestic-page-not-found-search__wallpaper vuestic-page-not-found-search__not-found-wallpaper-list"
            >
              <div
                class="vuestic-page-not-found-search__wrapper"
                :style="{ 'grid-template-columns': 'repeat(1, 1fr)' }"
              >
                <ul
                  class="vuestic-page-not-found-search__list"
                  style="color: #f7cc36;"
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
                      >{{ item.test.naziv }} | {{ item.test.analit }}</a
                    >
                    &nbsp;
                    <span style="font-size: 12px; color: #e34a4a;">{{
                      item.aparat.ime
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div
          class="vuestic-page-not-found-search__wrapper"
          :style="{ 'grid-template-columns': 'repeat(1, 1fr)' }"
        >
          <ul
            class="vuestic-page-not-found-search__list"
            style="color: #4ae387;"
          >
            <li
              class="vuestic-page-not-found-search__list-element"
              v-for="(item, index) in controlTests"
              :key="index"
            >
              <a
                @click.prevent="Empty(item)"
                :class="{ 'unchosen-link': false, 'plain-link': true }"
                :id="item._id"
                href="#"
                >{{ item.test.naziv }} | {{ item.test.analit }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="!main" class="row">
      <div class="col-md-6"></div>

      <div class="col-md-6">
        <div class="btn-container">
          <button
            class="btn btn-sm btn-secondary pull-left"
            style="text-transform: none; border: 0px;"
            @click.prevent="Backward()"
          >
            <span class="fa fa-backward"></span>
            {{ "Povratak" }}
          </button>
        </div>
        <div class="btn-container">
          <button
            class="btn btn-sm btn-secondary pull-right"
            style="text-transform: none; border: 0px;"
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
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import * as _ from "lodash";

export default {
  name: "control-multi",

  computed: {
    filterItems() {
      var filtered = [];
      this.Assays.forEach((element) => {
        filtered.push(element);
      });
      if (this.inputValue.length >= 1) {
        return filtered.filter(
          (item) =>
            item.test.naziv
              .toUpperCase()
              .search(this.inputValue.toUpperCase()) !== -1 ||
            item.test.analit
              .toUpperCase()
              .search(this.inputValue.toUpperCase()) !== -1
        );
      } else {
        return filtered;
      }
    },
  },

  data() {
    return {
      main: true,
      inputValue: "",
      controlTests: [],

      // Schema Kontrole
      sifra: new Date().getTime().toString(),
      multi: false,
      naziv: "",
      maker: "",
      lot: "",
      rok: "",
      analysers: [],
      resAnalysers: [],
      aparati: [],
      Analizatori: [],
      analize: [],

      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",

      // Prerequisites
      anaassay: {},
      anaassays: [],
      Assays: [],
    };
  },

  created() {
    this.Datum();
    // Analysers
    http
      .get(
        "postavke/list/analysers?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        this.resAnalysers = res.data.analysers;
        res.data.analysers.forEach((element) => {
          if (!element.manual) {
            this.analysers.push(element.ime + " - " + element.make);
          }
        });
      });
    // AnaAssays
    http
      .get(
        "assays/ana/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        this.anaassays = res.data.anaassays;
      });
  },
  mounted() {
    bus.$on("Definicija", (data) => {
      this.Datum();
      this.Reset();
    });
  },
  watch: {
    aparati() {},
  },
  components: {
    Loading,
  },
  beforeDestroy() {
    bus.$off("Definicija");
  },
  methods: {
    Add(data) {
      if (this.controlTests.some((labassay) => labassay._id === data._id)) {
        // console.log("Object found inside the Array.");
      } else {
        this.controlTests.push(data);
      }
    },
    Empty(data) {
      this.controlTests = [];
    },
    Datum() {
      var d = new Date();
      d.setDate(d.getDate() + 61);
      var mjesec = d.getMonth() + 1;
      var dan = d.getUTCDate();
      if (dan < 10) {
        dan = "0" + dan;
      }
      if (mjesec < 10) {
        mjesec = "0" + mjesec;
      }
      var datum = d.getFullYear() + "-" + mjesec + "-" + dan;
      this.rok = datum;
      // console.log("Datum: " + new Date());
      // console.log("+ 61 dan");
    },
    Forward() {
      if (
        this.sifra.trim() === "" ||
        this.naziv.trim() === "" ||
        this.maker.trim() === "" ||
        this.lot.trim() === "" ||
        this.aparati.length < 1
      ) {
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
      } else {
        this.aparati.forEach((aparat) => {
          this.analysers.forEach((analyser) => {
            if (aparat == analyser) {
              this.resAnalysers.forEach((element) => {
                if (element.ime + " - " + element.make == aparat) {
                  this.Analizatori.push(element._id);
                  this.anaassays.forEach((assay) => {
                    if (element._id == assay.aparat._id) {
                      this.Assays.push(assay);
                    }
                  });
                }
              });
            }
          });
        });

        this.main = false;
      }
    },
    Backward() {
      this.inputValue = "";
      this.Analizatori = [];
      this.Assays = [];
      this.aparati = [];
      this.controlTests = [];
      this.analize = [];
      this.main = true;
    },
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    Reset() {
      this.Datum();
      (this.sifra = new Date().getTime().toString()),
        (this.multi = false),
        (this.naziv = ""),
        (this.maker = ""),
        (this.lot = ""),
        (this.aparati = []),
        (this.controlTests = []);
      this.analize = [];
      this.Analizatori = [];
      this.inputValue = "";
    },
    Check() {
      var uslov = true;

      if (
        this.sifra.trim() === "" ||
        this.naziv.trim() === "" ||
        this.maker.trim() === "" ||
        this.lot.trim() === "" ||
        this.aparati.length < 1 ||
        this.controlTests.length < 1
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
          className: this.className,
        });
      }
    },

    Save() {
      this.isLoading = true;
      var Testovi = [];
      var lab = {};
      var Analizatori = [];

      this.controlTests.forEach((element) => {
        lab = {
          Assay: element,
          labassay: element.test._id,
          anaassay: element._id,
        };

        Testovi.push(lab);

        Analizatori.indexOf(element.aparat._id) === -1
          ? Analizatori.push(element.aparat._id)
          : null;
      });

      var TestoviFiltered = _.uniqBy(Testovi, "labassay");
      var anaTestoviFiltered = _.uniqBy(Testovi, "anaassay");

      if (Testovi.length == 1) {
        // Single
        this.multi = false;
      } else {
        // Multi
        this.multi = true;
      }

      http
        .post("kontrole/definicija/save", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          sifra: this.sifra,
          multi: this.multi,
          naziv: this.naziv,
          maker: this.maker,
          lot: this.lot,
          rok: this.rok,
          controlTests: this.controlTests,
          aparati: Analizatori,
          analize: Testovi,
          analizeFiltered: TestoviFiltered,
          anaFiltered: anaTestoviFiltered,
        })
        .then((res) => {
          this.isLoading = false;
          // console.log(res.data.kontrola);

          bus.$emit("UređivanjeRefresh");

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
              className: this.className,
            });

            this.Reset();
            this.main = true;
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
@import "../../../sass/_variables.scss";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";

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

.unchosen-link {
  color: #f7cc36;
  text-decoration: none;
}
</style>
