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
                <label class="control-label" for="input-icon-left">{{'Naziv antibiotika'}}</label>
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
                <label class="control-label" for="input-icon-left">{{'Opis antibiotika'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <div class="form-group">
              <div class="input-group">
                <input
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  v-model="rbr_a"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Redni broj antibiotika'}}</label>
                <i class="bar"></i>
              </div>
            </div>

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
        <div v-if="antibiotici.length" class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td style="text-transform: none;" width="10%">{{''}}</td>
                <td align="center" style="text-transform: none;" width="15%">{{'Rbr.'}}</td>
                <td style="text-transform: none;" width="20%">{{'Naziv'}}</td>
                <td style="text-transform: none;" width="45%">{{'Opis'}}</td>
                <td align="center" style="text-transform: none;" width="10%">{{'Akcija'}}</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="element in antibiotici" :key="element.naziv">
                <td align="center">
                  <i
                    @dblclick.prevent="Edit($event, element)"
                    v-bind:id="element._id"
                    style="font-size: 16px; color:#4ae387;"
                    class="glyphicon glyphicon-edit"
                  ></i>
                </td>
                <td align="center">{{element.rbr_a}}</td>
                <td>{{element.naziv}}</td>
                <td>{{element.opis}}</td>

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
      :edit_data="'antibiotik'"
      :large="false"
      ref="staticModalEditMikrobiologijaAntibiotici"
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
                  v-model="antibiotik.naziv"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Naziv antibiotika'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <div class="form-group">
              <div class="input-group">
                <input
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  v-model="antibiotik.opis"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Opis antibiotika'}}</label>
                <i class="bar"></i>
              </div>
            </div>

            <div class="form-group">
              <div class="input-group">
                <input
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  v-model="antibiotik.rbr_a"
                  name="input-icon-left"
                  required
                />
                <label class="control-label" for="input-icon-left">{{'Redni broj antibiotika'}}</label>
                <i class="bar"></i>
              </div>
            </div>
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
  name: "antibiotici",

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
      rbr_a: "",
      antibiotici: [],
      header: { naziv: "", opis: "" },
      antibiotik: { naziv: "", opis: "", rbr_a: "" },

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
        this.antibiotici = res.data.antibiotici;

        this.antibiotici.sort(function(a, b) {
          return a.rbr_a.localeCompare(b.rbr_a, undefined, {
            numeric: true,
            sensitivity: "base"
          });
        });
      });
  },
  mounted() {
    bus.$on("AntibioticiRefresh", () => {
      this.naziv = "";
      this.opis = "";
      this.rbr_a = "";

      http
        .get(
          "mikrobiologija/antibiotici/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.antibiotici = res.data.antibiotici;
          this.antibiotici.sort(function(a, b) {
            return a.rbr_a.localeCompare(b.rbr_a, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        });
    });
    bus.$on("MikrobiologijaModalCancelAntibiotici", () => {
      // console.log("Antibiotici: CANCEL");

      this.naziv = "";
      this.opis = "";
      this.rbr_a = "";

      http
        .get(
          "mikrobiologija/antibiotici/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          this.antibiotici = res.data.antibiotici;
          this.antibiotici.sort(function(a, b) {
            return a.rbr_a.localeCompare(b.rbr_a, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        });
    });
    bus.$on("MikrobiologijaModalEditAntibiotici", () => {
      // console.log("Antibiotici: CONFIRM");

      var uslov = true;

      if (
        this.antibiotik.naziv.trim() === "" ||
        this.antibiotik.opis.trim() === "" ||
        isNaN(this.antibiotik.rbr_a) ||
        this.antibiotik.rbr_a === ""
      ) {
        uslov = false;
      }

      if (uslov) {
        http
          .post("mikrobiologija/antibiotici/edit", {
            element: this.antibiotik,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              // console.log(res.data);
              bus.$emit("MikrobiologijaModalHide");
              this.naziv = "";
              this.opis = "";
              this.rbr_a = "";
              http
                .get(
                  "mikrobiologija/antibiotici/get?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  this.antibiotici = res.data.antibiotici;
                  this.antibiotici.sort(function(a, b) {
                    return a.rbr_a.localeCompare(b.rbr_a, undefined, {
                      numeric: true,
                      sensitivity: "base"
                    });
                  });
                });
            } else {
              // console.warn("Greška prilikom izmjene podataka.");
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
    bus.$off("AntibioticiRefresh");
    bus.$off("MikrobiologijaModalCancelAntibiotici");
    bus.$off("MikrobiologijaModalEditAntibiotici");
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
      this.antibiotik = data;
      http
        .post("mikrobiologija/antibiotici/remove", {
          _id: this.antibiotik._id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            // console.log(res.data);
            bus.$emit("MikrobiologijaModalHide");
            this.naziv = "";
            this.opis = "";
            this.rbr_a = "";
            this.antibiotici = res.data.antibiotici;
            this.antibiotici.sort(function(a, b) {
              return a.rbr_a.localeCompare(b.rbr_a, undefined, {
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
      this.naziv = "";
      this.opis = "";
      this.rbr_a = "";
      this.antibiotik = data;
      this.header.naziv = data.naziv;
      this.header.opis = data.opis;
      this.$refs.staticModalEditMikrobiologijaAntibiotici.open();
    },
    Check() {
      var uslov = true;

      if (
        this.naziv.trim() === "" ||
        this.opis.trim() === "" ||
        isNaN(this.rbr_a) ||
        this.rbr_a === ""
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
        .post("mikrobiologija/antibiotici/insert", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          naziv: this.naziv,
          opis: this.opis,
          rbr_a: this.rbr_a
        })
        .then(res => {
          if (res.data.success) {
            this.antibiotici = res.data.antibiotici;
            this.antibiotici.sort(function(a, b) {
              return a.rbr_a.localeCompare(b.rbr_a, undefined, {
                numeric: true,
                sensitivity: "base"
              });
            });

            this.isLoading = false;

            this.naziv = "";
            this.opis = "";
            this.rbr_a = "";
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


