<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group with-icon-left">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  name="input-icon-left"
                  v-model="text"
                  required
                />
                <i class="glyphicon glyphicon-search icon-left input-icon search-icon"></i>
                <label class="control-label" for="input-icon-left">{{'Pretraga'}}</label>
                <i class="bar"></i>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="table-responsive" v-if="analize.length">
              <table class="table table-striped first-td-padding">
                <thead>
                  <tr>
                    <td width="5%" style="text-transform: none;">{{''}}</td>
                    <td width="15%" style="text-transform: none;">{{'Šifra'}}</td>
                    <td width="15%" style="text-transform: none;">{{'Naziv'}}</td>
                    <td width="17.5%" style="text-transform: none;">{{'Opis'}}</td>
                    <td width="17.5%" style="text-transform: none;">{{'Grupa'}}</td>
                    <!-- <td align="center" width="10%" style="text-transform: none;">{{'Neg.'}}</td> -->
                    <td align="center" width="10%" style="text-transform: none;">{{'Def.'}}</td>
                    <td align="center" width="10%" style="text-transform: none;">{{'Uredi'}}</td>
                    <td align="center" width="10%" style="text-transform: none;">{{'Akcija'}}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="element in filtered" :key="element._id">
                    <td>
                      <span
                        v-if="!element.bakterije.length"
                        style="font-size: 16px; color:#e34a4a;"
                        class="fa fa-bug"
                      ></span>
                      <span
                        v-if="element.bakterije.length"
                        style="font-size: 16px; color:#4ae387;"
                        class="fa fa-bug"
                      ></span>
                    </td>
                    <td>{{element.sifra}}</td>
                    <td>{{element.naziv}}</td>
                    <td>{{element.analit}}</td>
                    <td>{{element.sekcija}}</td>

                    <!-- <td align="center">
                      <i
                        v-if="element.neg_description.length < 2"
                        @dblclick.prevent="DescriptionNeg($event, element)"
                        v-bind:id="element._id"
                        style="font-size: 16px; color:#4ae387;"
                        class="fa fa-minus"
                      ></i>
                      <i
                        v-if="element.neg_description.length > 1"
                        @dblclick.prevent="DescriptionNeg($event, element)"
                        v-bind:id="element._id"
                        style="font-size: 16px; color:#4ae387;"
                        class="fa fa-minus"
                      ></i>
                    </td> -->

                    <td align="center">
                      <i
                        v-if="element.pos_description.length < 2"
                        @dblclick.prevent="DescriptionPos($event, element)"
                        v-bind:id="element._id"
                        style="font-size: 14px; color:#4ae387;"
                        class="glyphicon glyphicon-text-size"
                      ></i>
                      <i
                        v-if="element.pos_description.length > 1"
                        @dblclick.prevent="DescriptionPos($event, element)"
                        v-bind:id="element._id"
                        style="font-size: 14px; color:#4ae387;"
                        class="glyphicon glyphicon-text-size"
                      ></i>
                    </td>

                    <td align="center">
                      <i
                        @dblclick.prevent="Edit($event, element)"
                        v-bind:id="element._id"
                        style="font-size: 16px; color:#4ae387;"
                        class="glyphicon glyphicon-edit"
                      ></i>
                    </td>

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
      </div>
    </div>

    <mikrobiologija-edit-modal
      :show.sync="show"
      :edit_data="'analiza'"
      :large="true"
      :closeable="true"
      ref="staticModalEditMikrobiologijaAnalize"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #e34a4a;">{{header.opis}}</span>
      </div>
      <div>
        <fieldset>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.sifra"
                    name="input-icon-left"
                    required
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label class="control-label" for="input-icon-left">{{'Šifra analize'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.naziv"
                    name="input-icon-left"
                    required
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label class="control-label" for="input-icon-left">{{'Naziv analize'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div v-if="analiza.multi" class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.analit"
                    name="input-icon-left"
                    required
                    :disabled="$store.state.access.level > 0"
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label
                    v-if="$store.state.access.level > 0"
                    class="control-label"
                    for="input-icon-left"
                  >{{analiza.analit}}</label>
                  <label
                    v-if="$store.state.access.level < 1"
                    class="control-label"
                    for="input-icon-left"
                  >{{'Opis analize'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div v-if="!analiza.multi" class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.analit"
                    name="input-icon-left"
                    required
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label class="control-label" for="input-icon-left">{{'Opis analize'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <vuestic-simple-select
                class="form-group with-icon-left"
                label="Vrsta analize"
                v-model="analiza.test_type"
                title=" "
                v-bind:options="test_types"
              ></vuestic-simple-select>

              <vuestic-simple-select
                class="form-group with-icon-left"
                label="Jedinica"
                v-model="analiza.jedinica"
                title=" "
                v-bind:options="jedinice"
              ></vuestic-simple-select>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.grouporder"
                    name="input-icon-left"
                    required
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label class="control-label" for="input-icon-left">{{'Redni broj na nalazu'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div v-if="$store.state.access.level < 1" class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.code"
                    name="input-icon-left"
                    required
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label class="control-label" for="input-icon-left">{{'Code 128'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.price"
                    name="input-icon-left"
                    required
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label class="control-label" for="input-icon-left">{{'Cijena'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <vuestic-simple-select
                class="form-group with-icon-left"
                label="Sekcija"
                v-model="analiza.sekcija"
                title=" "
                v-bind:options="sekcije"
              ></vuestic-simple-select>

              <vuestic-simple-select
                class="form-group with-icon-left"
                label="Grupa"
                v-model="analiza.grupa"
                title=" "
                v-bind:options="grupe"
              ></vuestic-simple-select>

              <vuestic-simple-select
                class="form-group with-icon-left"
                label="Kategorija"
                v-model="analiza.kategorija"
                title=" "
                v-bind:options="kategorije"
              ></vuestic-simple-select>

              <vuestic-simple-select
                class="form-group with-icon-left"
                label="Tip uzorka"
                v-model="analiza.tip"
                title=" "
                v-bind:options="uzorci"
              ></vuestic-simple-select>

              <vuestic-multi-select
                label="Izbor bakterija"
                v-model="izabrane_bakterije"
                title=" "
                v-bind:options="izbornik_bakterija"
              ></vuestic-multi-select>

              <vuestic-simple-select
                class="form-group with-icon-left"
                label="Prikaz na unosu"
                v-model="analiza.entryorder"
                title=" "
                v-bind:options="entryorders"
              ></vuestic-simple-select>

              <vuestic-multi-select
                label="Prikaz na lokaciji"
                v-model="analiza.sites"
                title=" "
                v-bind:options="sajtovi"
              ></vuestic-multi-select>
            </div>
          </div>
        </fieldset>
      </div>
    </mikrobiologija-edit-modal>

    <mikrobiologija-edit-modal
      :show.sync="show"
      :edit_data="'analiza'"
      :large="true"
      :closeable="false"
      ref="staticModalEditMikrobiologijaAnalizeValues"
      cancelText="ZATVORI"
      okText="SAČUVAJ"
    >
      <div slot="title">
        <span style="color: #acb5be;">Predefinisani rezultati |</span>
        <span style="color: #e34a4a;">{{header.opis}}</span>
      </div>
      <div>
        <fieldset>
          <div class="row">
            <div class="col-md-6">
              <h6 style="color:#4ae387;">{{"Rezultat negativan"}}</h6>
              <br>
              <div
                class="form-group with-icon-left"
                v-for="(desc, index) in analiza.neg_description"
                :key="index"
              >
                
                <div class="input-group">
                  <input
                    style="color:#4ae387;"
                    
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.neg_description[index]"
                    name="input-icon-left"
                    required
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label class="control-label" for="input-icon-left">{{index + 1}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <h6 style="color:#e34a4a;">{{"Rezultat pozitivan"}}</h6>
              <br>
              <div
                class="form-group with-icon-left"
                v-for="(desc, index) in analiza.pos_description"
                :key="index"
              >
                
                <div class="input-group">
                  <input
                    style="color:#e34a4a;"
                   
                    autocomplete="off"
                    id="input-icon-left"
                    title=" "
                    v-model="analiza.pos_description[index]"
                    name="input-icon-left"
                    required
                  />
                  <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                  <label class="control-label" for="input-icon-left">{{index + 1}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
          </div>
        </fieldset>
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
  name: "mikrobioloske-analize",

  components: {
    Loading
  },

  data() {
    return {
      show: true,
      isLoading: false,
      fullPage: true,

      bakterije: [],
      izabrane_bakterije: [],
      izbornik_bakterija: [],
      analize: [],
      filtered: [],
      analiza: {},
      header: { naziv: "", opis: "" },
      text: "",
      test_types: ["default", "mikrobiologija"],
      neg_descriptions: [""], // "",
      pos_descriptions: [""], // "",

      jedinice: [],
      sekcije: [],
      grupe: [],
      entryorders: [],
      uzorci: [],
      kategorije: [],
      sajtovi: [],

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
    // Sites
    http
      .get(
        "assays/site?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.sajtovi = [];
        res.data.sites.forEach(element => {
          this.sajtovi.push(element.sifra);
        });
      });

    // Settings
    http
      .get(
        "assays/settings?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.sekcije = [];
        this.uzorci = [];
        this.kategorije = [];

        res.data.settings[0].sekcije.forEach(element => {
          if (element.toLowerCase().includes("mikrobiologija")) {
            this.sekcije.push(element);
          }
        });

        res.data.settings[0].lab_tipovi.forEach(element => {
          if (element.toLowerCase().includes("mikrobiologija")) {
            this.uzorci.push(element);
          }
        });

        res.data.settings[0].kategorije.forEach(element => {
          if (element.toLowerCase().includes("mikrobiologija")) {
            this.kategorije.push(element);
          }
        });

        this.jedinice = res.data.settings[0].jedinice;
        this.entryorders = res.data.settings[0].entryorders;
        this.grupe = res.data.settings[0].grupe;
      });

    http
      .get(
        "mikrobiologija/analize/get?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        // console.log(res.data.analize);

        this.analize = res.data.analize;
        this.filtered = res.data.analize;
        this.text = "";
      });

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

        this.izbornik_bakterija = [];

        res.data.bakterije.forEach(element => {
          this.izbornik_bakterija.push(element.opis);
        });
      });
  },
  mounted() {
    bus.$on("AnalizeRefresh", () => {
      http
        .get(
          "mikrobiologija/analize/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          // console.log(res.data.analize);

          this.analize = res.data.analize;
          this.filtered = res.data.analize;
          this.text = "";
        });

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

          this.izbornik_bakterija = [];

          res.data.bakterije.forEach(element => {
            this.izbornik_bakterija.push(element.opis);
          });
        });
    });
    bus.$on("MikrobiologijaModalCancelAnalize", () => {
      http
        .get(
          "mikrobiologija/analize/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          // console.log(res.data.analize);

          this.analize = res.data.analize;
          this.filtered = res.data.analize;
          this.text = "";
        });
    });
    bus.$on("MikrobiologijaModalEditAnalize", data => {      
      this.EditLabAssay(this.analiza, this.izabrane_bakterije, !data);
    });
  },
  beforeDestroy() {
    bus.$off("AnalizeRefresh");
    bus.$off("MikrobiologijaModalCancelAnalize");
    bus.$off("MikrobiologijaModalEditAnalize");
  },
  watch: {
    text: function() {
      this.filtered = [];
      this.analize.forEach(element => {
        if (
          element.naziv.toLowerCase().includes(this.text.toLowerCase()) ||
          element.analit.toLowerCase().includes(this.text.toLowerCase())
        ) {
          this.filtered.push(element);
        }
      });
    }
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
      this.isLoading = true;
      http
        .post("mikrobiologija/analize/remove", {
          _id: data._id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.isLoading = false;
            // console.log(res.data);
            http
              .get(
                "mikrobiologija/analize/get?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then(res => {
                // console.log(res.data.analize);

                this.analize = res.data.analize;
                this.filtered = res.data.analize;
                this.text = "";
              });
          } else {
            this.isLoading = false;
            // console.warn("Greška prilikom brisanja podataka.");
          }
        });
    },
    Edit(event, data) {
      this.analiza = data;

      this.izabrane_bakterije = [];

      data.bakterije.forEach(element => {
        this.izabrane_bakterije.push(element.opis);
      });

      this.header.naziv = data.naziv;
      this.header.opis = data.analit;
      this.$refs.staticModalEditMikrobiologijaAnalize.open();
    },

    DescriptionNeg(event, data) {
      this.analiza = data;

      this.izabrane_bakterije = [];

      data.bakterije.forEach(element => {
        this.izabrane_bakterije.push(element.opis);
      });

      this.header.naziv = data.naziv;
      this.header.opis = data.analit;
      this.$refs.staticModalEditMikrobiologijaAnalizeValues.open();
    },
    DescriptionPos(event, data) {
      this.analiza = data;

      this.izabrane_bakterije = [];

      data.bakterije.forEach(element => {
        this.izabrane_bakterije.push(element.opis);
      });

      this.header.naziv = data.naziv;
      this.header.opis = data.analit;
      this.$refs.staticModalEditMikrobiologijaAnalizeValues.open();
    },
    EditLabAssay(labassay, bakterije, close) {
      var selected = [];
      var desc = [];
      var pos = [];

      labassay.neg_description.forEach(element => {
        if (element === "") {
        } else {
          desc.push(element);
        }
      });

      desc.push("");

      labassay.pos_description.forEach(element => {
        if (element === "") {
        } else {
          pos.push(element);
        }
      });

      pos.push("");

      labassay.neg_description = desc;
      labassay.pos_description = pos;

      this.bakterije.forEach(element => {
        bakterije.forEach(bakterija => {
          if (bakterija === element.opis) {
            selected.push(element._id);
          }
        });
      });

      var item = true;

      if (true) {
        if (
          labassay.sifra.trim() === "" ||
          labassay.naziv.trim() === "" ||
          labassay.analit.trim() === "" ||
          labassay.sekcija.trim() === "" ||
          labassay.grupa.trim() === "" ||
          labassay.entryorder.trim() === ""
        ) {
          item = false;

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

        if (isNaN(labassay.grouporder) || isNaN(labassay.price)) {
          item = false;
          this.toastText = "Sva polja nisu validirana.";
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
      }

      if (item) {
        http
          .post("mikrobiologija/analize/edit", {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site,
            labassay: labassay,
            bakterije: selected
          })
          .then(res => {
            if (res.data.success) {
              if(close){
                bus.$emit("MikrobiologijaModalHide");
              }              
              http
                .get(
                  "mikrobiologija/analize/get?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  // console.log(res.data.analize);

                  this.analize = res.data.analize;
                  this.filtered = res.data.analize;
                  this.text = "";
                });
            } else {
              // console.warn("Greška prilikom izmjene podataka.");
            }
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";

.ui-grid {
  .row {
    div[class^="col"] {
      padding: 0;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        margin: 0.5rem 0.25rem;
        min-height: 3rem;
        color: $white;
        background-color: $brand-primary;
        border-radius: 0.5rem;
      }
    }
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
