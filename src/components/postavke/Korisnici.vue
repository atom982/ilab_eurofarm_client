<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-2">
        <a @click="$refs.staticModalUserRegistration.open();" style="color:#4ae387;">
          <strong>{{'Novi unos'}}</strong>
        </a>
      </div>
      <div class="col-md-10">
        <postavke-accordion>
          <postavke-collapse
            :level="user.postavke.access.level"
            v-for="(user,index) in users"
            :key="index"
          >
            <span
              style="text-transform: none;"
              slot="header"
            >{{user.email + " | " + user.ime + " " + user.prezime}}</span>
            <div slot="body">
              <div style="padding: 10px;">
                <button
                  style="text-transform: none;  border: 0px; border-radius: 0px; width: 50%;"
                  class="btn btn-secondary btn-sm pull-left"
                  @click.prevent="EditJson($event, user)"
                >
                  <span style="font-size: 18px;" class="fa fa-gear"></span>
                  {{ ' Uređivanje'}}
                </button>
                <button
                  style="text-transform: none;  border: 0px; border-radius: 0px; width: 50%;"
                  class="btn btn-secondary-danger btn-sm pull-right"
                  @click.prevent="Delete(user)"
                >
                  <span style="font-size: 18px;" class="fa fa-trash"></span>
                  {{ ' Brisanje'}}
                </button>

                <div style="min-height: 50px;">&nbsp;</div>
                <p>
                  {{'Ime: '}}
                  <strong>{{user.ime}}</strong>
                </p>
                <p>
                  {{'Prezime: '}}
                  <strong>{{user.prezime}}</strong>
                </p>
                <p>
                  {{'Korisničko ime: '}}
                  <strong>{{user.email}}</strong>
                </p>
                <p>
                  {{'Nivo pristupa: '}}
                  <strong>{{user.postavke.access.level}}</strong>
                </p>
                <p>
                  {{'Jezik: '}}
                  <strong v-if="user.postavke.language === 'ba'">{{'Bosanski'}}</strong>
                  <strong v-if="user.postavke.language != 'ba'">{{'Nema podataka'}}</strong>
                </p>
              </div>
            </div>
          </postavke-collapse>
        </postavke-accordion>
      </div>
    </div>

    <postavke-delete-users
      :show.sync="show"
      ref="staticModalPostavkeDeleteUsers"
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
    </postavke-delete-users>

    <user-registration
      :show.sync="show"
      ref="staticModalUserRegistration"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #4ae387;">{{'Korisnici'}}</span>
        <span style="color: #acb5be;">|{{' Novi unos'}}</span>
      </div>
      <div class="row">
        <div class="col-md-1"></div>
        <div class="col-md-10">
          <fieldset>
            <div class="form-group">
              <div class="input-group">
                <input id="input-icon-left" title=" " v-model="ime" name="input-icon-left" required>
                <label class="control-label" for="input-icon-left">{{'Unesite ime'}}</label>
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  id="input-icon-left"
                  title=" "
                  v-model="prezime"
                  name="input-icon-left"
                  required
                >
                <label class="control-label" for="input-icon-left">{{'Unesite prezime'}}</label>
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
                <label class="control-label" for="input-icon-left">{{'Unesite korisničko ime'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <div class="form-group with-icon-right">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="password"
                  title=" "
                  type="text"
                  v-model="password"
                  name="password"
                  required
                >
                <label class="control-label" for="input-icon-right">{{'Unesite šifru'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <!-- Izaberite sajtove -->
            <vuestic-multi-select
              :label="'Izaberite sajtove'"
              v-model="user_sites_tmp"
              title=" "
              v-bind:options="sites_display"
            ></vuestic-multi-select>
            <div v-if="sites_tmp.length">
              <!-- Sajt korisnika -->
              <vuestic-simple-select
                :label="'Sajt korisnika'"
                v-model="user_site_tmp"
                name="sajt"
                :required="true"
                title=" "
                ref="Sajt"
                v-bind:options="sites_tmp"
              ></vuestic-simple-select>
            </div>
            <div v-if="!sites_tmp.length">
              <div class="form-group">
                <div class="input-group">
                  <input disabled id="input-icon-left" title=" " v-model="user_site_tmp" required>
                  <!-- Sajt korisnika -->
                  <label class="control-label" for="sajt">{{'Sajt korisnika'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </user-registration>

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
  name: "korisnici",

  components: {
    Loading
  },

  data() {
    return {
      show: true,
      hidden: true,

      isLoading: false,
      fullPage: true,

      users: [],
      sites: [],
      selected: {},
      text: "",

      // User

      ime: "",
      prezime: "",
      email: "",
      password: "",
      token: "TKTokenInit",
      role: "Administrator",
      user_site: "",
      user_site_tmp: "",
      user_sites: [],
      user_sites_tmp: [],
      sites_display: [],
      sites_tmp: [],
      levels: [0, 1, 2, 3],
      postavke: {
        card_view: false,
        pid_bcode: false,
        language: "ba",
        idleTime: 28800000,
        access: {
          level: 1
        },
        display: {
          list: "15",
          show: "20",
          columns: "7",
          rows: "1"
        }
      }
    };
  },
  created() {},
  mounted() {
    bus.$on("UserRegistrationInsert", () => {
      this.user_sites = [];
      this.user_site = "";

      this.sites.forEach(element => {
        this.user_sites_tmp.forEach(tmp => {
          if (element.sifra + " | " + element.naziv === tmp) {
            this.user_sites.push(element._id);
          }
        });

        if (element.sifra + " | " + element.naziv === this.user_site_tmp) {
          this.user_site = element._id;
        }
      });

      var uslov = true;
      var exists = false;

      this.users.forEach(element => {
        if (this.email.trim() === element.email) {
          exists = true;
        }
      });

      if (exists) {
        // console.warn("Already exists.");
      }

      if (
        this.ime.trim() === "" ||
        this.prezime.trim() === "" ||
        this.email.trim() === "" ||
        this.password.trim() === "" ||
        this.user_site.trim() === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        http
          .post("postavke/users/insert", {
            ime: this.ime.trim(),
            prezime: this.prezime.trim(),
            email: this.email.trim(),
            password: this.password.trim(),
            user_token: this.user_token,
            role: this.role,
            user_site: this.user_site,
            sites: this.user_sites,
            postavke: this.postavke,

            token: this.$store.state.token,
            site: this.user_site
          })
          .then(res => {
            if (res.data.success) {
              http
                .get(
                  "postavke/list/users?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  // console.log(res.data);
                  this.users = res.data.users;
                  this.sites = res.data.sites;

                  this.sites_display = [];

                  this.sites.forEach(element => {
                    this.sites_display.push(
                      element.sifra + " | " + element.naziv
                    );
                  });

                  bus.$emit("UserRegistrationHide");

                  this.ime = "";
                  this.prezime = "";
                  this.email = "";
                  this.password = "";
                  // this.token = "TKTokenInit";
                  // this.role = "Administrator";
                  this.user_site = "";
                  this.user_site_tmp = "";
                  this.user_sites = [];
                  this.user_sites_tmp = [];
                  this.postavke = {
                    card_view: false,
                    pid_bcode: false,
                    language: "ba",
                    idleTime: 28800000,
                    access: {
                      level: 1
                    },
                    display: {
                      // grid-template-columns: repeat(7, 1fr)
                      list: "15",
                      show: "20",
                      columns: "7",
                      rows: "1"
                    }
                  };
                });
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    });
    bus.$on("UserRegistrationCancel", () => {
      this.ime = "";
      this.prezime = "";
      this.email = "";
      this.password = "";
      // this.token = "TKTokenInit";
      // this.role = "Administrator";
      this.user_site = "";
      this.user_site_tmp = "";
      this.user_sites = [];
      this.user_sites_tmp = [];
      this.postavke = {
        card_view: false,
        pid_bcode: false,
        language: "ba",
        idleTime: 28800000,
        access: {
          level: 1
        },
        display: {
          // grid-template-columns: repeat(7, 1fr)
          list: "15",
          show: "20",
          columns: "7",
          rows: "1"
        }
      };
    });
    bus.$on("KorisniciRefresh", () => {
      http
        .get(
          "postavke/list/users?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          // console.log(res.data);
          this.users = res.data.users;
          this.sites = res.data.sites;

          this.sites_display = [];

          this.sites.forEach(element => {
            this.sites_display.push(element.sifra + " | " + element.naziv);
          });
        });
    });
    bus.$on("okDeleteUser", () => {
      http
        .post("postavke/users/remove", {
          user: this.selected,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.users = res.data.users;
            this.sites = res.data.sites;
            bus.$emit("deleteUsersClose");
          }
        });
    });
  },
  watch: {
    user_sites_tmp: function() {
      this.sites_tmp = this.user_sites_tmp;
      if (!this.user_sites_tmp.includes(this.user_site_tmp)) {
        this.user_site_tmp = "";
      }
      if (this.user_sites_tmp.length < 1) {
        this.user_site_tmp = "";
      }
    }
  },
  beforeDestroy() {
    bus.$off("UserRegistrationInsert");
    bus.$off("UserRegistrationCancel");
    bus.$off("KorisniciRefresh");
    bus.$off("okDeleteUser");
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
      this.text = element.email + " | " + element.ime + " " + element.prezime;
      this.$refs.staticModalPostavkeDeleteUsers.open();
    },
    EditJson(event, element) {
      var obj = {};
      obj.element = element;
      obj.tab = "Korisnici";
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
