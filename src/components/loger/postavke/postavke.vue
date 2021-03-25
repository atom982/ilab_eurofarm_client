<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding minHeight">
      <vuestic-tabs :names="[ 'Pregled','Registracija']" :tab="'Pregled'" ref="tabs">
        <div :slot="'Registracija'">
          <div class="row minHeight">
            <div class="col-md-4">
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="ime"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Ime'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="lokacija"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Lokacija'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="opis"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Opis'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="slave_id"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Slave ID'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="mac"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'MAC adresa'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="refd"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Donja granična vrijednost'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="refg"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Gornja granična vrijednost'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="odgovoran_ime"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Ime odgovorne osobe'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="odgovoran_prezime"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Prezime odgovorne osobe'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="odgovoran_mail"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Email adresa'}}</label>
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
                    {{ ' SAČUVAJ'}}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :slot="'Pregled'">
          <div class="row minHeight">
            <div class="col-md-12">
              <div class="table-responsive">
                <table v-show="frizideri.length" class="table table-striped first-td-padding">
                  <thead>
                    <tr>
                      <td width="7%" align="center"></td>
                      <td width="8%">{{'ID'}}</td>
                      <td width="15%">{{'NAZIV'}}</td>
                      <td width="15%">{{'LOKACIJA'}}</td>
                      <td width="20%">{{'OPIS'}}</td>
                      <td width="10%">{{'Reference'}}</td>

                      <td width="15%" align="center">{{'KALIBRACIJA'}}</td>
                      <td width="10%" align="center">{{'AKCIJA'}}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in frizideri" :key="element._id">
                      <td>
                        <i
                          v-if="$store.state.access.level < 1"
                          @click="EditJson($event, element)"
                          v-bind:id="element._id"
                          style="font-size: 13px; color:#4ae387;"
                          class="vuestic-icon vuestic-icon-settings"
                        ></i>
                        <i
                          v-if="$store.state.access.level > 0"
                          v-bind:id="element._id"
                          style="font-size: 13px; color:#4ae387;"
                          class="vuestic-icon vuestic-icon-settings"
                        ></i>
                      </td>
                      <td>{{element.slave_id}}</td>
                      <td>{{element.ime}}</td>
                      <td>{{element.lokacija}}</td>
                      <td>{{element.opis}}</td>
                      <td>
                        {{element.opseg.refd}} - {{element.opseg.refg}}
                        <sup>&#8451;</sup>
                      </td>

                      <td align="center">
                        <i
                          @click="Calibrate($event, element)"
                          v-bind:id="element._id"
                          style="font-size: 14px; color:#f7cc36;"
                          class="fa fa-dot-circle-o"
                        ></i>
                      </td>

                      <td align="center">
                        <i
                          @dblclick="Delete($event, element)"
                          v-bind:id="element._id"
                          style="font-size: 14px; color:#4ae387;"
                          class="fa fa-trash-o"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

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

    <json-edit-frizider
      :show.sync="show"
      ref="staticModalJSONEdit"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #4ae387;">{{'JSON Editor'}}</span>
      </div>
    </json-edit-frizider>

    <kalibracija-modal :show.sync="show" ref="largeModal" :okText="potvrdi" :cancelText="odustani">
      <div slot="title">
        {{"Kalibracija uređaja: "}}
        <span style="color: #e34a4a;">{{calob.ime}} ({{calob.slave_id}})</span>
      </div>
      <div>
        <div class="col-md-12 info-widget-inner">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="tempcal"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Temperature difference +/-'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="humcal"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Humidity difference +/-'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="hertz"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Frequency in Hertz'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </kalibracija-modal>
  </div>
</template>

<script>
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import vm from "./../../../main.js";
export default {
  name: "loger-postavke",

  data() {
    return {
      show: true,
      isLoading: false,
      fullPage: true,
      frizideri: [],

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",

      // Prerequisites
      selected_tab: "",
      potvrdi: "SAČUVAJ",
      odustani: "ODUSTANI",

      // Frizider
      lokacija: "", // "Sarajevo"
      opis: "", // "Paromlinska 25"
      ime: "", // "Kuhinja"
      slave_id: "", // "2"
      mac: "",
      refd: "", // opseg
      refg: "", // opseg
      odgovoran_ime: "",
      odgovoran_prezime: "",
      odgovoran_mail: "",

      // Kalibracija
      tempcal: "",
      humcal: "",
      hertz: "",
      calob: {},
      hcalob: {},
      fcalob: {}
    };
  },

  created() {
    this.selected_tab = "Pregled";

    // Frizideri
    http
      .get(
        "loger/list/frizideri?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.frizideri = res.data.frizideri;
        // console.log(res.data);
      });
  },
  mounted() {
    bus.$on("FriziderRefresh", data => {
      http
        .get(
          "loger/list/frizideri?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.frizideri = res.data.frizideri;
          // console.log(res.data);
        });
    });

    bus.$on("tabChanged", data => {
      this.selected_tab = data;
    });

    bus.$on("Kalibracija", data => {
      var uslov = true;

      if (
        this.tempcal.trim() === "" ||
        this.humcal.trim() === "" ||
        this.hertz.trim() === ""
      ) {
        uslov = false;
      }

      if (uslov) {
        bus.$emit("KalibracijaHide");

        var obj = {
          slave_id: this.calob.slave_id,
          tempcal: this.tempcal,
          humcal: this.humcal,
          hertzcal: this.hertz
        };

        // console.log(obj);

        // vm.$socket.emit("calibrate", obj);
        this.tempcal = "";
        this.humcal = "";
        this.hertz = "";
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
    });
  },

  components: {
    Loading
  },

  watch: {},
  beforeDestroy() {
    bus.$off("tabChanged");
    bus.$off("Kalibracija");
    bus.$off("FriziderRefresh");
  },

  methods: {
    Calibrate($event, element) {
      this.calob = element;
      this.$refs.largeModal.open();
    },
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    EditJson(event, element) {
      bus.$emit("JsonEditFriziderOpen", element);
    },
    Delete(event, element) {
      http
        .post("loger/frizider/delete", {
          frizider: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            http
              .get(
                "loger/list/frizideri?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then(res => {
                this.frizideri = res.data.frizideri;
                // console.log(res.data);
              });
          } else {
          }
        });
    },

    Check(data) {
      var uslov = true;

      if (
        this.lokacija.trim() === "" ||
        this.opis.trim() === "" ||
        this.ime.trim() === "" ||
        this.slave_id.trim() === "" ||
        this.mac.trim() === "" ||
        this.refd.trim() === "" ||
        this.refg.trim() === "" ||
        this.odgovoran_ime.trim() === "" ||
        this.odgovoran_prezime.trim() === "" ||
        this.odgovoran_mail.trim() === ""
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
        .post("loger/create", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          lokacija: this.lokacija,
          opis: this.opis,
          ime: this.ime,
          slave_id: this.slave_id,
          mac: this.mac.split(","),
          opseg: { refd: this.refd, refg: this.refg },
          odgovoran: {
            ime: this.odgovoran_ime,
            prezime: this.odgovoran_prezime,
            email: this.odgovoran_mail
          }
        })
        .then(res => {
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
              className: this.className
            });

            this.isLoading = false;

            this.lokacija = "";
            this.opis = "";
            this.ime = "";
            this.slave_id = "";
            this.mac = "";
            this.refd = "";
            this.refg = "";
            this.odgovoran_ime = "";
            this.odgovoran_prezime = "";
            this.odgovoran_mail = "";

            http
              .get(
                "loger/list/frizideri?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then(res => {
                this.frizideri = res.data.frizideri;
                // console.log(res.data);
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

.minHeight {
  min-height: 350px;
} 

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
