<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'Group email'">
          <div class="row" style="min-height: 350px">
            <div class="col-md-12" v-show="lokacije.length > 0">
              <div class="row">
                <!--  -->
                <div class="col-md-6">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <vuestic-simple-select-bubble
                        :label="'Izbor naručioca analize'"
                        v-model="lokacija"
                        name="lokacija"
                        :required="true"
                        title=" "
                        ref="lokacija"
                        v-bind:options="lokacije"
                      ></vuestic-simple-select-bubble>
                    </div>
                  </div>
                </div>

                <!--  -->
                <div class="col-md-6">
                  <div class="btn-container">
                    <button
                      :disabled="email === '' || !uzorci.length"
                      @click="sendEmail"
                      class="btn btn-secondary btn-sm pull-right"
                    >
                      <span class="glyphicon glyphicon-send"></span>
                      {{ " pošalji" }}
                    </button>
                    <div class="form-group with-icon-left pull-right">
                      <div class="input-group">
                        <input
                          disabled
                          size="40"
                          id="input-icon-left"
                          name="input-icon-left"
                          title=" "
                          required
                        />
                        <i class="fa fa-envelope-o icon-left input-icon"></i>
                        <label class="control-label" for="input-icon-left">{{
                          email
                        }}</label>
                        <i class="bar"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <!--  -->

                <div class="col-md-12">
                  <div class="table-responsive">
                    <div class="col-md-12" v-show="!uzorci.length">
                      <div class="form-group with-icon-left">
                        <div class="input-group">
                          {{ "Nema podataka" }}
                        </div>
                      </div>
                    </div>
                    <table
                      v-show="uzorci.length"
                      class="table table-striped first-td-padding"
                    >
                      <thead>
                        <tr>
                          <!-- 40 -->
                          <td width="5%">{{ "BA" }}</td>
                          <td width="5%">{{ "EN" }}</td>
                          <td width="5%">{{ "DE" }}</td>

                          <td width="12.5%">{{ "Protokol" }}</td>
                          <td width="12.5%">{{ "Uzorak" }}</td>

                          <!-- 45 -->
                          <td width="15%">{{ "Ime" }}</td>
                          <td width="20%">{{ "Prezime" }}</td>
                          <td width="10%">{{ "Godište" }}</td>

                          <!-- 25 -->
                          <td width="10%">{{ "Datum" }}</td>
                          <td width="10%">{{ "Vrijeme" }}</td>
                          <td width="5%">{{ "" }}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="element in uzorci"
                          :key="element._id"
                          v-bind:class="{
                            'table-danger': false,
                            'table-success': element.nalaz.emailed,
                            'table-warning': false,
                          }"
                        >
                          <!-- BA -->

                          <td>
                            <div
                              class="form-check abc-checkbox abc-checkbox-primary"
                            >
                              <input
                                v-if="!element.izabran.ba"
                                @click="baActivate(element)"
                                class="form-check-input"
                                id="checkbox-normalan"
                                type="checkbox"
                                v-model="element.izabran.ba"
                              />
                              <input
                                v-if="element.izabran.ba"
                                @click="baDeactivate(element)"
                                class="form-check-input"
                                id="checkbox-hitan"
                                type="checkbox"
                                v-model="element.izabran.ba"
                              />
                              <label
                                class="form-check-label"
                                for="checkbox"
                              ></label>
                            </div>
                          </td>

                          <!-- EN -->

                          <td>
                            <div
                              class="form-check abc-checkbox abc-checkbox-primary"
                            >
                              <input
                                v-if="!element.izabran.en"
                                @click="enActivate(element)"
                                class="form-check-input"
                                id="checkbox-normalan"
                                type="checkbox"
                                v-model="element.izabran.en"
                              />
                              <input
                                v-if="element.izabran.en"
                                @click="enDeactivate(element)"
                                class="form-check-input"
                                id="checkbox-hitan"
                                type="checkbox"
                                v-model="element.izabran.en"
                              />
                              <label
                                class="form-check-label"
                                for="checkbox"
                              ></label>
                            </div>
                          </td>

                          <!-- DE -->

                          <td>
                            <div
                              class="form-check abc-checkbox abc-checkbox-primary"
                            >
                              <input
                                v-if="!element.izabran.de"
                                @click="deActivate(element)"
                                class="form-check-input"
                                id="checkbox-normalan"
                                type="checkbox"
                                v-model="element.izabran.de"
                              />
                              <input
                                v-if="element.izabran.de"
                                @click="deDeactivate(element)"
                                class="form-check-input"
                                id="checkbox-hitan"
                                type="checkbox"
                                v-model="element.izabran.de"
                              />
                              <label
                                class="form-check-label"
                                for="checkbox"
                              ></label>
                            </div>
                          </td>

                          <td>{{ element.protokol }}</td>
                          <td>{{ element.uzorak }}</td>

                          <td>{{ element.ime }}</td>
                          <td>{{ element.prezime }}</td>
                          <td>{{ element.godiste }}</td>

                          <td>{{ element.datum }}</td>
                          <td>{{ element.time }}</td>

                          <td v-if="element.prioritet === true" align="center">
                            <span
                              style="font-size: 12px; color: #e34a4a"
                              class="fa fa-star"
                            ></span>
                          </td>
                          <td v-if="element.prioritet === false" align="center">
                            <span
                              style="font-size: 12px; color: #d9d9d9"
                              class="fa fa-star-o"
                            ></span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
import BadgeColumn from "./BadgeColumn.vue";
import { http } from "../../../config/config.js";
import { server } from "../../../config/config.js";
import { bus } from "../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "naljepnice",

  components: {
    Loading,
  },

  data() {
    return {
      show: true,
      isLoading: false,
      fullPage: true,

      lokacije: [],
      lokacijeInit: [],
      lokacija: "",
      email: "",

      uzorci: [],
      uzorciInit: [],
      attachments: [],

      // Toasts

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
    };
  },

  created() {
    this.isLoading = true;
    // Dohvati validne lokacije
    http
      .get(
        "/uzorci/lokacije/list?token=" +
          this.$store.state.token +
          "&site=" +
          "5c69f68c338fe912f99f833b",
        {}
      )
      .then((res) => {
        if (res.data.lokacije.length > 1) {
          // Ako ih ima, prvu postavi kao zadanu

          this.lokacije = [];
          res.data.lokacije.forEach((element) => {
            if (
              element.sendEmail === false &&
              element._id != "5c713f63cfe109792dfbdc9b"
            ) {
              // console.log(element.email);
              this.lokacije.push(element.lokacija);
              this.lokacijeInit.push(element);
            }
          });

          this.lokacije.sort(function (a, b) {
            return a.localeCompare(b, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          });

          this.lokacija = this.lokacije[0];
          this.email = this.lokacijeInit[0].email;

          // Pronađi današnje uzorke, za zadanu lokaciju

          http
            .get(
              "postavke/list/nalazi?token=" +
                this.$store.state.token +
                "&site=" +
                "5c69f68c338fe912f99f833b",
              {}
            )
            .then((response) => {
              if (response.data.success) {
                if (response.data.uzorci.length > 0) {
                  response.data.uzorci.forEach((uzorak) => {
                    this.uzorciInit.push(uzorak);
                    if (uzorak.lokacija.lokacija === this.lokacija) {
                      uzorak.izabran = {
                        ba: false,
                        en: false,
                        de: false,
                      };
                      this.uzorci.push(uzorak);
                    }
                  });

                  this.isLoading = false;
                } else {
                  console.warn("Nema obrađenih uzoraka.");
                }
              } else {
                this.isLoading = false;
              }
            });
        } else {
          this.isLoading = false;
          console.warn("Lokacije nisu definisane.");
        }
      });
  },

  mounted() {},

  watch: {
    lokacija: function () {
      this.uzorci = [];
      this.attachments = [];

      if (this.lokacija === "") {
        this.email = "";
      } else {
        this.lokacijeInit.forEach((element) => {
          if (element.lokacija === this.lokacija) {
            this.email = element.email;
          }
        });

        this.uzorciInit.forEach((uzorak) => {
          if (uzorak.lokacija.lokacija === this.lokacija) {
            uzorak.izabran = {
              ba: false,
              en: false,
              de: false,
            };
            this.uzorci.push(uzorak);
          }
        });
      }
    },
  },

  beforeDestroy() {},

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    baActivate(element) {
      // this.uzorci.forEach((uzorak) => {
      //   if (element.uzorak == uzorak.uzorak) {
      //     this.attachments.push(uzorak);
      //   }
      // });
    },

    baDeactivate(element) {
      // for (var i = this.attachments.length - 1; i >= 0; i--) {
      //   if (
      //     this.attachments[i] &&
      //     this.attachments[i].uzorak === element.uzorak
      //   ) {
      //     this.attachments.splice(i, 1);
      //   }
      // }
    },

    enActivate(element) {
      // this.uzorci.forEach((uzorak) => {
      //   if (element.uzorak == uzorak.uzorak) {
      //     this.attachments.push(uzorak);
      //   }
      // });
    },

    enDeactivate(element) {
      // for (var i = this.attachments.length - 1; i >= 0; i--) {
      //   if (
      //     this.attachments[i] &&
      //     this.attachments[i].uzorak === element.uzorak
      //   ) {
      //     this.attachments.splice(i, 1);
      //   }
      // }
    },

    deActivate(element) {
      // this.uzorci.forEach((uzorak) => {
      //   if (element.uzorak == uzorak.uzorak) {
      //     this.attachments.push(uzorak);
      //   }
      // });
    },

    deDeactivate(element) {
      // for (var i = this.attachments.length - 1; i >= 0; i--) {
      //   if (
      //     this.attachments[i] &&
      //     this.attachments[i].uzorak === element.uzorak
      //   ) {
      //     this.attachments.splice(i, 1);
      //   }
      // }
    },

    prepareEmail() {},

    sendEmail() {
      // console.log(this.lokacija);
      // console.log(this.email);

      console.log("Priprema uzoraka za slanje...");

      this.uzorci.forEach((uzorak) => {
        if (uzorak.izabran.ba || uzorak.izabran.en || uzorak.izabran.de) {
          this.attachments.push(uzorak);
        }
      });

      // if (this.attachments.length > 0) {
      //   this.isLoading = true;

      //   setTimeout(() => {
      //     this.uzorci = [];
      //     this.attachments = [];
      //     this.uzorciInit.forEach((uzorak) => {
      //       if (uzorak.lokacija.lokacija === this.lokacija) {
      //         uzorak.izabran = {
      //           ba: false,
      //           en: false,
      //           de: false,
      //         };
      //         this.uzorci.push(uzorak);
      //       }
      //     });
      //     this.isLoading = false;
      //     this.toastText = "Nalazi uspješno poslani.";
      //     this.toastIcon = "fa-check";
      //     this.toastPosition = "top-right";
      //     this.className = "vuestic-toast-primary";

      //     this.showToast(this.toastText, {
      //       icon: this.toastIcon,
      //       position: this.toastPosition,
      //       duration: 1000,
      //       fullWidth: this.false,
      //       className: this.className,
      //     });
      //   }, 2000);
      // } else {
      //   this.toastText = "Nema podataka za slanje.";
      //   this.toastIcon = "fa-remove";
      //   this.toastPosition = "top-right";
      //   this.className = "vuestic-toast-warning";

      //   this.showToast(this.toastText, {
      //     icon: this.toastIcon,
      //     position: this.toastPosition,
      //     duration: 1000,
      //     fullWidth: this.false,
      //     className: this.className,
      //   });
      // }

      if (this.attachments.length > 0) {
        // console.log(this.attachments);
        this.isLoading = true;
        http
          .post("postavke/nalazi/email", {
            attachments: this.attachments,
            email: this.email,
            site: "5c69f68c338fe912f99f833b",
            token: this.$store.state.token,
          })
          .then((res) => {
            if (res.data.success) {
              // console.log(res.data);

              this.uzorci = [];
              this.uzorciInit = [];
              this.attachments = [];

              // Pronađi današnje uzorke, za zadanu lokaciju

              http
                .get(
                  "postavke/list/nalazi?token=" +
                    this.$store.state.token +
                    "&site=" +
                    "5c69f68c338fe912f99f833b",
                  {}
                )
                .then((response) => {
                  if (response.data.success) {
                    if (response.data.uzorci.length > 0) {
                      response.data.uzorci.forEach((uzorak) => {
                        this.uzorciInit.push(uzorak);
                        if (uzorak.lokacija.lokacija === this.lokacija) {
                          uzorak.izabran = {
                            ba: false,
                            en: false,
                            de: false,
                          };
                          this.uzorci.push(uzorak);
                        }
                      });

                      this.isLoading = false;
                      this.toastText = "Nalazi uspješno poslani.";
                      this.toastIcon = "fa-check";
                      this.toastPosition = "top-right";
                      this.className = "vuestic-toast-primary";

                      this.showToast(this.toastText, {
                        icon: this.toastIcon,
                        position: this.toastPosition,
                        duration: 1000,
                        fullWidth: this.false,
                        className: this.className,
                      });
                    } else {
                      console.warn("Nema obrađenih uzoraka.");
                    }
                  } else {
                    this.isLoading = false;
                  }
                });
            } else {
              // console.log(res.data);
              this.isLoading = false;
              this.toastText = "Greška prilikom slanja nalaza!";
              this.toastIcon = "fa-remove";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-danger";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: 1000,
                fullWidth: this.false,
                className: this.className,
              });
              this.uzorci.forEach((uzorak) => {
                uzorak.izabran = {
                  ba: false,
                  en: false,
                  de: false,
                };
              });
            }
          });
      } else {
        this.toastText = "Nema podataka za slanje.";
        this.toastIcon = "fa-remove";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: 1000,
          fullWidth: this.false,
          className: this.className,
        });
      }
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
.chart-container {
  padding: 0 2rem;
  height: 24rem;
}

.circle {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  display: inline-block;
}

.icon-bar a:hover {
  color: #4ae387;
}
</style>
