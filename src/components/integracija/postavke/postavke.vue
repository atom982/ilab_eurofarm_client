<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding minHeight">
      <vuestic-tabs :names="[ 'Pregled','Registracija']" :tab="'Pregled'" ref="tabs">
        <div :slot="'Registracija'">
          <div class="row minHeight">
            <div class="col-md-4">
              <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-6">
                  <div class="vuestic-page-not-found-search__wallpaper">
                    <div class="form-group">
                      <div class="input-group vuestic-page-not-found-search__input">
                        <input placeholder="Pretraga" v-model="inputValue" />
                        <i style="color: #f7cc36;" class="bar" />
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
                  :style="{'grid-template-columns': 'repeat(1, 1fr)'}"
                >
                  <ul class="vuestic-page-not-found-search__list" style="color: #f7cc36;">
                    <li
                      class="vuestic-page-not-found-search__list-element"
                      v-for="(item, index) in filterItems"
                      :key="index"
                      v-show="index < 8"
                    >
                      <a
                        @click.prevent="Add_t(item)"
                        :class="{'unchosen-link': true, 'plain-link': false}"
                        :id="item._id"
                        href="#"
                      >{{item.naziv}} | {{item.analit}}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <label class="control-label" for="simple-input">{{"Odabrani test/analit"}}</label>
              <hr />
              <ul
                v-if="selected.multi && !selected_mno"
                class="vuestic-page-not-found-search__list"
                style="color: #f7cc36;"
              >
                <li
                  class="vuestic-page-not-found-search__list-element"
                  v-for="(item, index) in selectedmulti"
                  :key="index"
                  v-show="index"
                >
                  <a
                    @click.prevent="Add_a(item)"
                    :class="{'unchosen-link': true, 'plain-link': false}"
                    :id="item._id"
                    href="#"
                  >{{item.naziv}}</a>
                </li>
              </ul>
              <label
                v-if="!selected.multi"
                class="control-label"
                for="simple-input"
              >{{selected.naziv}}</label>
              <label
                v-if="selected_mno"
                class="control-label"
                for="simple-input"
              >{{selected_m.naziv}}</label>
              <hr />
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="simple-input"
                    v-model="integration.remote_id"
                    required
                  />
                  <label class="control-label" for="simple-input">{{'Eksternal ID'}}</label>
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
              <div class="table-responsive"></div>
                   <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td style="text-transform: none;" width="20%">{{'Test'}}</td>
                        <td style="text-transform: none;" width="30%">{{'Multianalit'}}</td>
                        <td style="text-transform: none;" width="25%">{{'Remote id'}}</td>
                        <td style="text-transform: none;" align="center" width="12.5%">{{'Uredi'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in lista" :key="element._id">
                        <td>{{element.local_id.analit}}</td>
                        <td>{{element.multianalit}}</td>
                        <td>{{element.remote_id}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Uzorci', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
  </div>
</template>

<script>
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "integracija-postavke",
  computed: {
    filterItems() {
      var filtered = [];
      this.labassays.forEach(element => {
        //if (element.specific) {
        filtered.push(element);
        // }
      });
      if (this.inputValue.length >= 1) {
        return filtered.filter(
          item =>
            item.naziv.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1 ||
            item.analit.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1
        );
      } else {
        return filtered;
      }
    }
  },
  data() {
    return {
      show: true,
      isLoading: false,
      fullPage: true,
      inputValue: "",
      frizideri: [],
      labassays: [],
      selected: {},
      selectedmulti: [],
      selected_m: {},
      selected_mno: false,
      multirequired:false,
      integration: {
        remote_id: "",
        local_id: "",
        multiparam: {
          type: false,
          id: null
        }
      },
      lista:[],
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
        "postavke/labtest/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.labassays = res.data.testovi;
      });
        http
      .get(
        "api/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        
        res.data.list.forEach(element => {
          if(element.multiparam.type){     
              element.local_id.multiparam.forEach(multi => {
                if(multi._id ===element.multiparam.id){
                  element.multianalit=multi.naziv
                }
              });   
          }else{
            element.multianalit=''
          }
        });
        this.lista=res.data.list
        // console.log(res.data.list)
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
    Add_t(data) {
      this.selected = data;
      this.integration.local_id = data._id;
      this.selected_mno = false;
      this.integration.multiparam.id = null;
      this.integration.multiparam.type = false;
      if (data.multi) {
        this.selectedmulti = data.multiparam;
        this.multirequired=true
      }
    },
    Add_a(data) {
      this.integration.multiparam.id = data._id;
      this.integration.multiparam.type = true;
      this.selected_m = data;
      this.selected_mno = true;
      this.multirequired=false
    },
        EditJson(tab, element) {
      var obj = {};
      obj.element = element;
      obj.tab = tab;
      bus.$emit("JsonEditPostavke", obj);
    },
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
      // console.log('this.integration object')
      // console.log(this.integration)
      // console.log(this.multirequired)
      if (
        this.integration.local_id.trim() === "" ||
        this.integration.remote_id.trim() === "" ||
        this.multirequired
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
        .post("api/bind", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          integration: this.integration,

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
            this.integration.local_id = "" 
            this.integration.remote_id= ""
            this.selectedmulti= []
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
