<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-2">
        <a @click="$refs.staticModalSiteRegistration.open();" style="color:#4ae387;">
          <strong>{{'Novi unos'}}</strong>
        </a>
      </div>
      <div v-if="sites.length" class="col-md-10">
        <postavke-accordion>
          <postavke-collapse v-for="(site,index) in sites" :key="index">
            <span style="text-transform: none;" slot="header">{{site.sifra + " | " + site.naziv}}</span>
            <div slot="body">
              <div style="padding: 10px;">
                <button
                  style="text-transform: none;  border: 0px; border-radius: 0px; width: 50%;"
                  class="btn btn-secondary btn-sm pull-left"
                  @click.prevent="EditJson($event, site)"
                >
                  <span style="font-size: 18px;" class="fa fa-gear"></span>
                  {{ ' Uređivanje'}}
                </button>
                <button
                  style="text-transform: none;  border: 0px; border-radius: 0px; width: 50%;"
                  class="btn btn-secondary-danger btn-sm pull-right"
                  @click.prevent="Delete(site)"
                >
                  <span style="font-size: 18px;" class="fa fa-trash"></span>
                  {{ ' Brisanje'}}
                </button>
                <div style="min-height: 50px;">&nbsp;</div>
                <p>
                  {{'Šifra: '}}
                  <strong>{{site.sifra}}</strong>
                </p>
                <p>
                  {{'Naziv: '}}
                  <strong>{{site.naziv}}</strong>
                </p>
                <p>
                  {{'Opis: '}}
                  <strong>{{site.opis}}</strong>
                </p>
                <p>
                  {{'Adresa: '}}
                  <strong>{{site.adresa}}</strong>
                </p>
                <p>
                  {{'Odgovorna osoba: '}}
                  <strong>{{site.odgovornoLice}}</strong>
                </p>
                <p>
                  {{'Telefon: '}}
                  <strong>{{site.telefon}}</strong>
                </p>
                <p>
                  {{'Email adresa: '}}
                  <strong>{{site.email}}</strong>
                </p>
                <p>
                  {{'Web adresa: '}}
                  <strong>{{site.web}}</strong>
                </p>
              </div>
            </div>
          </postavke-collapse>
        </postavke-accordion>
      </div>
    </div>

    <postavke-delete-sites
      :show.sync="show"
      ref="staticModalPostavkeDeleteSites"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #e34a4a;">{{''}}</span>
        <span style="color: #4ae387;">{{text}}</span>
      </div>
      <div>
        <h5 style="color: #e34a4a;">{{ 'Jeste li sigurni da želite obrisati zapis?'}}</h5>
      </div>
    </postavke-delete-sites>

    <site-registration
      :show.sync="show"
      ref="staticModalSiteRegistration"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #4ae387;">{{'Sites'}}</span>
        <span style="color: #acb5be;">|{{' Novi unos'}}</span>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <fieldset>
            <vuestic-simple-select
              label="Izaberite šifru"
              v-model="sifra"
              name="sifra"
              :required="true"
              title=" "
              ref="sifraSelect"
              v-bind:options="sifre"
            ></vuestic-simple-select>
            <div class="form-group">
              <div class="input-group">
                <input
                  id="input-icon-left"
                  title=" "
                  v-model="naziv"
                  name="input-icon-left"
                  required
                >
                <label class="control-label" for="input-icon-left">{{'Unesite naziv'}}</label>
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  id="input-icon-left"
                  title=" "
                  v-model="opis"
                  name="input-icon-left"
                  required
                >
                <label class="control-label" for="input-icon-left">{{'Unesite opis'}}</label>
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  id="input-icon-left"
                  title=" "
                  v-model="adresa"
                  name="input-icon-left"
                  required
                >
                <label class="control-label" for="input-icon-left">{{'Adresa'}}</label>
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  id="input-icon-left"
                  title=" "
                  v-model="odgovornoLice"
                  name="input-icon-left"
                  required
                >
                <label class="control-label" for="input-icon-left">{{'Odgovorna osoba'}}</label>
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  id="input-icon-left"
                  title=" "
                  v-model="telefon"
                  name="input-icon-left"
                  required
                >
                <label class="control-label" for="input-icon-left">{{'Telefon'}}</label>
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  id="input-icon-left"
                  title=" "
                  v-model="email"
                  name="input-icon-left"
                  required
                >
                <label class="control-label" for="input-icon-left">{{'Email adresa'}}</label>
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input id="input-icon-left" title=" " v-model="web" name="input-icon-left" required>
                <label class="control-label" for="input-icon-left">{{'Web adresa'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <div class="form-group">
              <div class="form-check abc-checkbox abc-checkbox-primary">
                <input
                  class="form-check-input"
                  id="checkbox1"
                  type="checkbox"
                  v-model="postavke.nalazLegenda"
                >
                <label class="form-check-label" for="checkbox1">
                  <span class="abc-label-text">{{'Ispis Legende (na nalazu)'}}</span>
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </site-registration>

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
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "sites",

  components: {
    Loading
  },

  data() {
    return {
      show: true,

      isLoading: false,
      fullPage: true,

      sifra: "",
      sifre: [],
      sifre_sve: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ],
      naziv: "",
      opis: "",
      adresa: "",
      odgovornoLice: "",
      telefon: "",
      email: "",
      mjesta: [""],
      web: "",
      postavke: {
        nalazLegenda: false,
        nalazMemorandum: false,
        mailToLokacija: false
      },

      sites: [],
      selected: {},
      text: ""
    };
  },
  created() {},
  mounted() {
    bus.$on("SiteRegistrationInsert", () => {
      var uslov = true;
      var exists = false;

      this.sites.forEach(element => {
        if (
          this.sifra === element.sifra ||
          this.naziv.trim() === element.naziv.trim() ||
          this.opis.trim() === element.opis.trim() ||
          this.adresa.trim() === element.adresa.trim()
        ) {
          exists = true;
        }
      });

      if (exists) {
        // console.warn("Already exists.");
      }

      if (
        this.sifra === "" ||
        this.naziv.trim() === "" ||
        this.opis.trim() === "" ||
        this.adresa.trim() === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        http
          .post("postavke/sites/insert", {
            sifra: this.sifra,
            naziv: this.naziv.trim(),
            opis: this.opis.trim(),
            adresa: this.adresa.trim(),
            odgovornoLice: this.odgovornoLice.trim(),
            telefon: this.telefon.trim(),
            email: this.email.trim(),
            mjesta: [""],
            web: this.web.trim(),
            postavke: this.postavke,

            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.sites = res.data.sites;

              var tmp = [];
              this.sifre = [...this.sifre_sve];

              if (this.sites != undefined) {
                this.sites.forEach(element => {
                  tmp.push(element.sifra);
                });

                tmp.forEach(element => {
                  for (var i = 0; i < this.sifre.length; i++) {
                    if (this.sifre[i] === element) {
                      this.sifre.splice(i, 1);
                      break;
                    }
                  }
                });
              }

              bus.$emit("SiteRegistrationHide");

              this.sifra = "";
              this.naziv = "";
              this.opis = "";
              this.adresa = "";
              this.odgovornoLice = "";
              this.telefon = "";
              this.email = "";
              this.mjesta = [""];
              this.web = "";
              this.postavke = {
                nalazLegenda: false,
                nalazMemorandum: false,
                mailToLokacija: false
              };
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    });

    bus.$on("SiteRegistrationCancel", () => {
      this.sifra = "";
      this.naziv = "";
      this.opis = "";
      this.adresa = "";
      this.odgovornoLice = "";
      this.telefon = "";
      this.email = "";
      this.mjesta = [""];
      this.web = "";
      this.postavke = {
        nalazLegenda: false,
        nalazMemorandum: false,
        mailToLokacija: false
      };
    });

    bus.$on("SitesRefresh", () => {
      http
        .get(
          "postavke/list/sites?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.sites = res.data.sites;

          var tmp = [];
          this.sifre = [...this.sifre_sve];

          if (this.sites != undefined) {
            this.sites.forEach(element => {
              tmp.push(element.sifra);
            });

            tmp.forEach(element => {
              for (var i = 0; i < this.sifre.length; i++) {
                if (this.sifre[i] === element) {
                  this.sifre.splice(i, 1);
                  break;
                }
              }
            });
          }
        });
    });
    bus.$on("okDeleteSite", () => {
      http
        .post("postavke/sites/remove", {
          _id: this.selected._id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.sites = res.data.sites;

            var tmp = [];
            this.sifre = [...this.sifre_sve];

            if (this.sites != undefined) {
              this.sites.forEach(element => {
                tmp.push(element.sifra);
              });

              tmp.forEach(element => {
                for (var i = 0; i < this.sifre.length; i++) {
                  if (this.sifre[i] === element) {
                    this.sifre.splice(i, 1);
                    break;
                  }
                }
              });
            }
            bus.$emit("deleteSitesClose");
          }
        });
    });
  },
  watch: {},
  beforeDestroy() {
    bus.$off("SiteRegistrationInsert");
    bus.$off("SiteRegistrationCancel");
    bus.$off("SitesRefresh");
    bus.$off("okDeleteSite");
  },
  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    Delete(element) {
      this.selected = element;
      this.text = element.sifra + " | " + element.naziv;
      this.$refs.staticModalPostavkeDeleteSites.open();
    },
    EditJson(event, element) {
      var obj = {};
      obj.element = element;
      obj.tab = "Sites";
      bus.$emit("JsonEditPostavke", obj);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
@import "../../../node_modules/bootstrap/scss/functions";
@import "../../../node_modules/bootstrap/scss/variables";
@import "../../../node_modules/bootstrap/scss/mixins/breakpoints";

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
