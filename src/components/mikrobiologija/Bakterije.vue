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
                <label class="control-label" for="input-icon-left">{{'Naziv bakterije'}}</label>
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
                <label class="control-label" for="input-icon-left">{{'Opis bakterije'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <vuestic-simple-select
              label="Izbor antibiograma"
              v-model="antibiogram"
              name="entryorder"
              :required="true"
              ref="entryorderSelect"
              v-bind:options="izbornik"
            ></vuestic-simple-select>

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
        <div v-if="bakterije.length" class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td style="text-transform: none;" width="10%">{{''}}</td>
                <td style="text-transform: none;" width="20%">{{'Naziv'}}</td>
                <td style="text-transform: none;" width="40%">{{'Opis'}}</td>
                <td style="text-transform: none;" width="20%">{{'Antibiogram'}}</td>
                <td align="center" style="text-transform: none;" width="10%">{{'Akcija'}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="element in bakterije" :key="element.naziv">
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
                <td>{{element.antibiogram.naziv}}</td>
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
      :edit_data="'bakterija'"
      :large="false"
      ref="staticModalEditMikrobiologijaBakterije"
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
                  v-model="bakterija.naziv"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Naziv bakterije'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <div class="form-group">
              <div class="input-group">
                <input
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  v-model="bakterija.opis"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Opis bakterije'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <vuestic-simple-select
              label="Izbor antibiograma"
              v-model="antibiogram_s"
              name="entryorder"
              :required="true"
              ref="entryorderSelect"
              v-bind:options="izbornik"
            ></vuestic-simple-select>
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
  name: "bakterije",

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
      bakterije: [],

      izbornik: [],
      antibiogrami: [],
      antibiogram: null,
      bakterija: { naziv: "", opis: "", antibiogram: {} },
      antibiogram_s: "",
      header: { naziv: "", opis: "" },

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
        "mikrobiologija/bakterije/get?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        // console.log(res.data);
        this.bakterije = res.data.bakterije;
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

        this.izbornik = [];

        res.data.antibiogrami.forEach(element => {
          this.izbornik.push(element.naziv);
        });
      });
  },
  mounted() {
    bus.$on("BakterijeRefresh", () => {
      this.naziv = "";
      this.opis = "";
      this.antibiogram = null;

      http
        .get(
          "mikrobiologija/bakterije/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          // console.log(res.data);
          this.bakterije = res.data.bakterije;
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

          this.izbornik = [];

          res.data.antibiogrami.forEach(element => {
            this.izbornik.push(element.naziv);
          });
        });
    });

    bus.$on("MikrobiologijaModalEditBakterije", () => {
      var selected = "";

      this.antibiogrami.forEach(element => {
        if (this.antibiogram_s === element.naziv) {
          selected = element._id;
          // console.log(element);
        }
      });

      var uslov = true;

      if (
        this.bakterija.naziv.trim() === "" ||
        this.bakterija.opis.trim() === ""
      ) {
        uslov = false;
      }

      if (uslov) {
        http
          .post("mikrobiologija/bakterije/edit", {
            element: this.bakterija,
            antibiogram: selected,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              // console.log(res.data);
              bus.$emit("MikrobiologijaModalHide");
              this.naziv = "";
              this.opis = "";
              this.antibiogram = null;
              http
                .get(
                  "mikrobiologija/bakterije/get?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  // console.log(res.data);
                  this.bakterije = res.data.bakterije;
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

    bus.$on("MikrobiologijaModalCancelBakterije", () => {
      this.naziv = "";
      this.opis = "";
      this.antibiogram = null;

      http
        .get(
          "mikrobiologija/bakterije/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          // console.log(res.data);
          this.bakterije = res.data.bakterije;
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

          this.izbornik = [];

          res.data.antibiogrami.forEach(element => {
            this.izbornik.push(element.naziv);
          });
        });
    });
  },
  beforeDestroy() {
    bus.$off("BakterijeRefresh");
    bus.$off("MikrobiologijaModalEditBakterije");
    bus.$off("MikrobiologijaModalCancelBakterije");
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
      this.bakterija = data;
      http
        .post("mikrobiologija/bakterije/remove", {
          _id: this.bakterija._id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            bus.$emit("MikrobiologijaModalHide");
            this.naziv = "";
            this.opis = "";
            this.antibiogram = null;

            http
              .get(
                "mikrobiologija/bakterije/get?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then(res => {
                // console.log(res.data);
                this.bakterije = res.data.bakterije;
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

                this.izbornik = [];

                res.data.antibiogrami.forEach(element => {
                  this.izbornik.push(element.naziv);
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
      this.antibiogram_s = "";

      this.antibiogrami.forEach(element => {
        if (data.antibiogram.naziv === element.naziv) {
          this.antibiogram_s = data.antibiogram.naziv;
        }
      });

      this.naziv = "";
      this.opis = "";
      this.antibiogram = null;
      this.bakterija = data;
      this.header.naziv = data.naziv;
      this.header.opis = data.opis;
      this.$refs.staticModalEditMikrobiologijaBakterije.open();
    },
    Check() {
      var uslov = true;

      if (
        this.naziv.trim() === "" ||
        this.opis.trim() === "" ||
        this.antibiogram === null
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

      var selected = "";

      this.antibiogrami.forEach(element => {
        if (this.antibiogram === element.naziv) {
          selected = element;
        }
      });

      http
        .post("mikrobiologija/bakterije/insert", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          naziv: this.naziv,
          opis: this.opis,
          antibiogram: selected
        })
        .then(res => {
          if (res.data.success) {
            // console.log(res.data);
            this.bakterije = res.data.bakterije;
            this.bakterije.sort(function(a, b) {
              return a.naziv.localeCompare(b.naziv, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });

            this.isLoading = false;

            this.naziv = "";
            this.opis = "";
            this.antibiogram = null;
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
