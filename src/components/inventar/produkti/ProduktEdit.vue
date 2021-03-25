<template>
  <div class="vuestic-modal">
    <transition name="modal" :duration="duration">
      <div v-show="show" class="modal-container">
        <div class="modal" @click.self="clickMask">
          <div class="modal-dialog" :class="modalClass">
            <div class="modal-content">
              <!--Header-->
              <div class="modal-header">
                <slot name="header">
                  <div class="modal-title">
                    <slot name="title"></slot>
                  </div>
                  <i
                    class="ion ion-md-close close-modal"
                    v-if="closeIconShown"
                    @click.prevent="cancel"
                  />
                </slot>
              </div>

              <!--Container-->

              <div class="modal-body">
                <slot></slot>
                <form>
                  <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">
                      <fieldset>
                        <div v-if="izbor === 'jmbg'">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                id="jmbg-input-icon-left"
                                title=" "
                                v-model="patient.jmbg"
                                name="jmbg-input-icon-left"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label
                                class="control-label"
                                for="jmbg-input-icon-left"
                              >{{'DD MM GGG RR BBB K'}}</label>
                              <i class="bar"></i>
                            </div>
                          </div>
                        </div>
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="ime-input-icon-left"
                              title=" "
                              v-model="patient.ime"
                              name="ime-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="ime-input-icon-left"
                            >{{'Unesite ime pacijenta'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="prezime-input-icon-left"
                              title=" "
                              v-model="patient.prezime"
                              name="prezime-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="prezime-input-icon-left"
                            >{{'Unesite prezime pacijenta'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <vuestic-simple-select
                          :label="'Izaberite spol pacijenta'"
                          v-model="patient.spol"
                          name="spol"
                          :required="true"
                          title=" "
                          ref="spolSelect"
                          v-bind:options="spolovi"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          label="Mjesto stanovanja"
                          v-model="patient.adresa"
                          name="adresa"
                          :required="true"
                          title=" "
                          ref="adresaSelect"
                          v-bind:options="cities"
                        ></vuestic-simple-select>
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="tel-input-icon-left"
                              title=" "
                              v-model="patient.telefon"
                              name="tel-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="tel-input-icon-left"
                            >{{'Unesite kontakt telefon'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="email-input-icon-left"
                              title=" "
                              v-model="patient.email"
                              name="email-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="email-input-icon-left"
                            >{{'Unesite Email adresu'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>

              <!--Footer-->
              <div class="modal-footer">
                <slot name="footer">
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="cancelClass"
                    @click="cancel"
                    :disabled="cancelDisabled"
                  >{{ cancelText }}</button>
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="okClass"
                    @click="ok"
                    :disabled="!validateJMBG(patient.jmbg)"
                  >{{ okText }}</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { bus } from "../../../main";
import router from "../../../router";
import { http } from "../../../../config/config.js";

export default {
  name: "patient-edit",
  props: {
    transition: {
      type: String,
      default: "modal"
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    force: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: "CONFIRM"
    },
    cancelText: {
      type: String,
      default: "CANCEL"
    },
    okClass: {
      type: String,
      default: "btn btn-primary btn-sm"
    },
    cancelClass: {
      type: String,
      default: "btn btn-warning btn-sm"
    },
    closeIconShown: {
      type: Boolean,
      default: false
    },
    okDisabled: {
      type: Boolean,
      default: false
    },
    cancelDisabled: {
      type: Boolean,
      default: false
    },
    noButtons: {
      type: Boolean,
      default: false
    },
    patient: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      show: false,
      duration: 500,
      izbor: "jmbg",
      ime: "",
      prezime: "",
      spol: "",
      spolovi: ["MUŠKI", "ŽENSKI"],
      adresa: "",
      cities: [],
      telefon: "",
      email: "",
      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  computed: {
    modalClass() {
      return {
        "modal-lg": this.large,
        "modal-sm": this.small
      };
    }
  },
  created() {
    if (this.show) {
      document.body.className += " modal-open";
    }
  },
  mounted() {
    http
      .post("/postavke/sajtovi/" + this.$store.state.site, {
        token: this.$store.state.token
      })
      .then(res => {
        if (res.data.sajt.mjesta != undefined) {
          res.data.sajt.mjesta.forEach(element => {
            this.cities.push(element);
          });
        }
      })
      .then(res => {
        this.cities.sort(function(a, b) {
          return a.toLowerCase() == b.toLowerCase() ? 0 : +(a.toLowerCase() > b.toLowerCase()) || -1;
        });
      });
  },
  beforeDestroy() {
    document.body.className = document.body.className.replace(
      /\s?modal-open/,
      ""
    );
  },
  watch: {
    show: function(value) {
      if (value) {
        document.body.className += " modal-open";
      } else {
        window.setTimeout(() => {
          document.body.className = document.body.className.replace(
            /\s?modal-open/,
            ""
          );
        }, this.duration);
      }
    }
  },
  methods: {
    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");
      this.Save();
    },
    cancel() {
      this.$emit("cancel");
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    clickMask() {
      if (!this.force) {
        this.cancel();
      }
    },
    open() {
      this.show = true;
      window.addEventListener("keyup", this.listenKeyUp);
    },
    close() {
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    validateJMBG(jmbg) {
      return (
        /^\d{4}[9,0]{1}\d{8}$/.test(String(jmbg)) ||
        /^\d{4}[9,0]{1}\d{7}[P]{1}$/.test(String(jmbg))
      );
    },
    Save() {

      this.jmbg = this.patient.jmbg;
      this.ime = this.patient.ime;
      this.prezime = this.patient.prezime;
      this.spol = this.patient.spol;
      this.adresa = this.patient.adresa;
      this.telefon = this.patient.telefon;
      this.email = this.patient.email;

      if (this.ime.trim() === "" || this.prezime.trim() === "" || this.spol.trim() === "") {
        this.toastText = "Unesite obavezna polja.";
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
      } else {
        if (this.validateJMBG(this.jmbg)) {

          var item = true;

          http.post("pacijenti/unos/find", {
              jmbg: this.jmbg,
              token: this.$store.state.token,
              site: this.$store.state.site
            })            
            .then(res => {

              if (this.adresa.trim() === "") {
                this.adresa = "";
              }
              if (this.telefon.trim() === "") {
                this.telefon = "";
              }
              if (this.email.trim() === "") {
                this.email = "";
              }

              if (item) {
                http
                  .post("pacijenti/detalji/update/" + this.patient._id, {
                    id: this.patient._id,
                    jmbg: this.jmbg.trim(),
                    ime: this.ime.toUpperCase().trim(),
                    prezime: this.prezime.toUpperCase().trim(),
                    spol: this.spol.toUpperCase().trim(),
                    adresa: this.adresa.trim(),
                    duhan: "",
                    dijabetes: "",
                    telefon: this.telefon.trim(),
                    email: this.email.trim(),
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    if (res.data.success) {                     
                      bus.$emit("Set", this.patient);
                      this.show = false;
                      window.removeEventListener("keyup", this.listenKeyUp);
                    }                   
                  });
              }
            });
        } 
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";

//Modals
$modal-header-padding-x: $widget-padding;
$modal-header-padding-y: 0;
$modal-header-height: $widget-header-height;
$modal-header-border: $widget-header-border;
$modal-content-border-width: 0;
$modal-content-border-radius: 0;
$modal-inner-padding: 25px;
$modal-footer-btns-padding-bottom: 20px;
$modal-footer-btns-margin-x: 10px;
$modal-md: 650px;
$modal-lg: 850px;

.vuestic-modal {
  height: 0;
  width: 0;

  // For Transitioning
  .modal {
    display: block;
  }

  .modal-dialog,
  .modal-backdrop {
    transition: all 0.5s ease;
  }

  .modal-enter .modal-dialog,
  .modal-leave-active .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }

  .modal-enter .modal-backdrop,
  .modal-leave-active .modal-backdrop {
    opacity: 0;
  }

  .modal-backdrop {
    opacity: 0.5;
  }

  //Modal styles

  .modal-header {
    height: $modal-header-height;
    padding: $modal-header-padding-y $modal-header-padding-x;
    border-bottom: $modal-header-border;
    font-size: $font-size-larger;
    display: flex;
    align-items: center;
  }

  .close-modal {
    margin-left: 1rem;
    font-size: $font-size-large;
    line-height: $font-size-large;
    cursor: pointer;
  }

  .modal-content {
    border-radius: $modal-content-border-radius;
  }

  .modal-footer {
    justify-content: center;
    padding: 0 $modal-inner-padding;
    padding-bottom: calc(
      #{$modal-inner-padding} - #{$modal-footer-btns-padding-bottom}
    );
    flex-wrap: wrap;
    .btn {
      margin: 0 $modal-footer-btns-margin-x $modal-footer-btns-padding-bottom
        $modal-footer-btns-margin-x;
    }
  }

  // .modal-dialog {
  //   box-shadow: $modal-content-box-shadow-sm-up;
  // }
}
</style>
