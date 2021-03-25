<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <div class="col-md-1"></div>

        <div class="col-md-10">
          <fieldset>
            <div class="form-group">
              <div class="input-group">
                <input
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  v-model="naziv"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Naziv antibiograma'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <div class="form-group">
              <div class="input-group">
                <input
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  v-model="opis"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Opis antibiograma'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <vuestic-multi-select
              label="Izbor antibiotika"
              v-model="antibiotici"
              title=" "
              v-bind:options="izbornik"
            ></vuestic-multi-select>

            <div class="form-group">
              <div class="input-group">
                <button
                  class="btn btn-micro btn-secondary-warning pull-right"
                  @click.prevent="Check()"
                >
                  <span class="fa fa-save"></span>
                  {{ ' SAČUVAJ'}}
                </button>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="col-md-6">
        <div v-if="antibiogrami.length" class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td style="text-transform: none;" width="10%">{{''}}</td>
                <td style="text-transform: none;" width="20%">{{'Naziv'}}</td>
                <td style="text-transform: none;" width="40%">{{'Opis'}}</td>
                <td align="center" style="text-transform: none;" width="20%">{{'Antibiotika'}}</td>
                <td align="center" style="text-transform: none;" width="10%">{{'Akcija'}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="element in antibiogrami" :key="element.naziv">
                <td align="center">
                  <i
                    @dblclick.prevent="Edit($event, element)"
                    v-bind:id="element._id"
                    style="font-size: 16px; color:#4ae387;"
                    class="glyphicon glyphicon-edit"
                  ></i>
                </td>
                <td>{{element.naziv}}</td>
                <td>{{element.opis}}</td>
                <td align="center">{{element.antibiotici.length}}</td>
                <td align="center">
                  <i
                    @dblclick.prevent="Delete($event, element)"
                    v-bind:id="element._id"
                    style="font-size: 18px; color:#4ae387;"
                    class="fa fa-trash-o"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <mikrobiologija-edit-modal
      :show.sync="show"
      :edit_data="'antibiogram'"
      :large="false"
      ref="staticModalEditMikrobiologijaAntibiogrami"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #e34a4a;">{{header.opis}}</span>
      </div>
      <div>
        <div class="col-md-1"></div>

        <div class="col-md-10">
          <fieldset>
            <div class="form-group">
              <div class="input-group">
                <input
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  v-model="antibiogram.naziv"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Naziv antibiograma'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <div class="form-group">
              <div class="input-group">
                <input
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  v-model="antibiogram.opis"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Opis antibiograma'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <vuestic-multi-select
              label="Izbor antibiotika"
              v-model="antibiotici_s"
              title=" "
              v-bind:options="izbornik"
            ></vuestic-multi-select>
          </fieldset>
        </div>
      </div>
    </mikrobiologija-edit-modal>

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
import { http } from "../../../config/config.js";
import { bus } from "../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import MikrobiologijaEdit from "./MikrobiologijaEdit.vue";

Vue.component("mikrobiologija-edit-modal", MikrobiologijaEdit);

export default {
  name: "antibiogrami",

  components: {
    Loading
  },

  data() {
    return {
      show: true,
      isLoading: false,
      fullPage: true,

      naziv: "",
      opis: "",
      antibiotici: [],
      antibiotici_i: [],
      antibiotici_s: [],
      izbornik: [],
      antibiogrami: [],
      antibiogram: [],

      header: { naziv: "", opis: "" },
      antibiogram: { naziv: "", opis: "", antibiotici: [] },

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  created() {
    http
      .get(
        "mikrobiologija/antibiotici/get?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        res.data.antibiotici.sort(function(a, b) {
          return a.rbr_a.localeCompare(b.rbr_a, undefined, {
            numeric: true,
            sensitivity: "base"
          });
        });

        this.antibiotici_i = [];
        this.izbornik = [];

        this.antibiotici_i = res.data.antibiotici;

        res.data.antibiotici.forEach(element => {
          this.izbornik.push(element.naziv);
        });
      });

    http
      .get(
        "mikrobiologija/antibiogrami/get?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.antibiogrami = res.data.antibiogrami;

        this.antibiogrami.sort(function(a, b) {
          return a.naziv.localeCompare(b.naziv, undefined, {
            numeric: true,
            sensitivity: "base"
          });
        });
      });
  },
  mounted() {
    bus.$on("AntibiogramiRefresh", () => {
      this.naziv = "";
      this.opis = "";
      this.antibiotici = [];
      http
        .get(
          "mikrobiologija/antibiotici/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          res.data.antibiotici.sort(function(a, b) {
            return a.rbr_a.localeCompare(b.rbr_a, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });

          this.antibiotici_i = [];
          this.izbornik = [];

          this.antibiotici_i = res.data.antibiotici;

          res.data.antibiotici.forEach(element => {
            this.izbornik.push(element.naziv);
          });
        });

      http
        .get(
          "mikrobiologija/antibiogrami/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.antibiogrami = res.data.antibiogrami;

          this.antibiogrami.sort(function(a, b) {
            return a.naziv.localeCompare(b.naziv, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        });
    });

    bus.$on("MikrobiologijaModalCancelAntibiogrami", () => {
      // console.log("Antibiogrami: CANCEL");
      this.naziv = "";
      this.opis = "";
      this.antibiotici = [];
      http
        .get(
          "mikrobiologija/antibiotici/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          res.data.antibiotici.sort(function(a, b) {
            return a.rbr_a.localeCompare(b.rbr_a, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });

          this.antibiotici_i = [];
          this.izbornik = [];

          this.antibiotici_i = res.data.antibiotici;

          res.data.antibiotici.forEach(element => {
            this.izbornik.push(element.naziv);
          });
        });

      http
        .get(
          "mikrobiologija/antibiogrami/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.antibiogrami = res.data.antibiogrami;

          this.antibiogrami.sort(function(a, b) {
            return a.naziv.localeCompare(b.naziv, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        });
    });
    bus.$on("MikrobiologijaModalEditAntibiogrami", () => {
      // console.log("Antibiogrami: CONFIRM");

      // console.log(this.antibiotici_s)

      var selected = [];

      this.antibiotici_s.forEach(element => {
        this.antibiotici_i.forEach(izbor => {
          if (izbor.naziv === element) {
            selected.push(izbor._id);
          }
        });
      });

      var uslov = true;

      if (
        this.antibiogram.naziv.trim() === "" ||
        this.antibiogram.opis.trim() === ""
      ) {
        uslov = false;
      }

      if (uslov) {
        http
          .post("mikrobiologija/antibiogrami/edit", {
            element: this.antibiogram,
            antibiotici: selected,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              // console.log(res.data);
              bus.$emit("MikrobiologijaModalHide");
              this.naziv = "";
              this.opis = "";
              this.antibiotici = [];
              http
                .get(
                  "mikrobiologija/antibiogrami/get?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  this.antibiogrami = res.data.antibiogrami;

                  this.antibiogrami.sort(function(a, b) {
                    return a.naziv.localeCompare(b.naziv, undefined, {
                      numeric: true,
                      sensitivity: "base"
                    });
                  });
                });
            } else {
              // console.log("Greška prilikom izmjene podataka.");
            }
          });
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

  beforeDestroy() {
    bus.$off("AntibiogramiRefresh");
    bus.$off("MikrobiologijaModalCancelAntibiogrami");
    bus.$off("MikrobiologijaModalEditAntibiogrami");
  },
  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    Delete(event, data) {
      this.antibiogram = data;
      http
        .post("mikrobiologija/antibiogrami/remove", {
          _id: this.antibiogram._id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            bus.$emit("MikrobiologijaModalHide");
            this.naziv = "";
            this.opis = "";
            this.antibiotici = [];

            this.antibiogrami = res.data.antibiogrami;

            this.antibiogrami.sort(function(a, b) {
              return a.naziv.localeCompare(b.naziv, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });
          } else {
            if (this.$store.state.access.level < 1) {
              // console.log(res.data);
            }
            // console.warn("Greška prilikom brisanja podataka.");
            this.toastText = "Dependency found.";
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
    Edit(event, data) {
      this.antibiotici_s = [];

      data.antibiotici.forEach(element => {
        this.antibiotici_i.forEach(izbor => {
          if (JSON.stringify(izbor._id) === JSON.stringify(element._id)) {
            this.antibiotici_s.push(izbor.naziv);
          }
        });
      });

      this.naziv = "";
      this.opis = "";
      this.antibiotici = [];
      this.antibiogram = data;
      this.header.naziv = data.naziv;
      this.header.opis = data.opis;
      this.$refs.staticModalEditMikrobiologijaAntibiogrami.open();
    },
    Check() {
      var uslov = true;

      if (this.naziv.trim() === "" || this.opis.trim() === "") {
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

      var selected = [];

      this.antibiotici.forEach(element => {
        this.antibiotici_i.forEach(izbor => {
          if (izbor.naziv === element) {
            selected.push(izbor._id);
          }
        });
      });

      http
        .post("mikrobiologija/antibiogrami/insert", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          naziv: this.naziv,
          opis: this.opis,
          antibiotici: selected
        })
        .then(res => {
          if (res.data.success) {
            this.antibiogrami = res.data.antibiogrami;
            this.antibiogrami.sort(function(a, b) {
              return a.naziv.localeCompare(b.naziv, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });

            this.isLoading = false;

            this.naziv = "";
            this.opis = "";
            this.antibiotici = [];
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
.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #f7cc36;
}

i:hover {
  color: #f7cc36 !important;
}
</style>