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
                    <div class="col-md-6">
                      <fieldset>
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                id="pln-input-icon-left"
                                title=" "
                                v-model="LN"
                                name="pln-input-icon-left"
                                ref="lnInput"
                                required
                              >
                              <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                              <label
                                class="control-label"
                                for="pln-input-icon-left"
                              >{{'LN'}}</label>
                              <i class="bar"></i>
                            </div>
                          </div>
                          <div v-if="postoji && !invalid">
                            <h5>{{'Uneseni LN je već registriran!'}}</h5>
                            <h5>
                              {{'Produkt:'}}
                              <span style="color: #e34a4a;">{{produkt_data}}</span>
                            </h5>
                            <br>
                          </div>

                          <div v-if="invalid">
                            <h5>
                              <span style="color: #e34a4a;">{{error_msg}}</span>
                            </h5>
                            <br>
                          </div>

                        <!-- 
                        -->
                        <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="popis-input-icon-left"
                              title=" "
                              v-model="opis"
                              name="popis-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="popis-input-icon-left"
                            >{{'Unesite opis produkta'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>

                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          :label="'Unesite jedinicu mjere'"
                          v-model="jedinica"
                          name="jedinica"
                          :required="true"
                          title=" "
                          ref="jedinicaSelect"
                          v-bind:options="jedinice"
                        ></vuestic-simple-select>
                    <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="psadrzaj-input-icon-left"
                              title=" "
                              v-model="sadrzaj"
                              name="psadrzaj-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="psadrzaj-input-icon-left"
                            >{{'Unesite sadržaj pakovanja'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="pnivo-input-icon-left"
                              title=" "
                              v-model="nivo"
                              name="pnivo-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="pnivo-input-icon-left"
                            >{{'Unesite nivo za upozorenje'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="pdanadoroka-input-icon-left"
                              title=" "
                              v-model="danadoroka"
                              name="pdanadoroka-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="pdanadoroka-input-icon-left"
                            >{{'Unesite upozorenje do roka'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                        <div v-if="!postoji && !invalid" class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="pzasnaziv-input-icon-left"
                              title=" "
                              v-model="zasnaziv"
                              name="pzasnaziv-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="pzasnaziv-input-icon-left"
                            >{{'Unesite zaštićeni naziv produkta'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                          </fieldset>
                        </div>
                        <div class="col-md-6">
                          <fieldset>
                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          label="Proizvođač"
                          v-model="chosenProizvodjac"
                          name="proizvodjac"
                          :required="true"
                          title=" "
                          ref="proizvodjacSelect"
                          v-bind:options="backProizvodjaci"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          label="Zemlja porijekla"
                          v-model="chosenZemlja"
                          name="zemlja"
                          :required="true"
                          title=" "
                          ref="zemljaSelect"
                          v-bind:options="zemlje"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          label="Klasa"
                          v-model="chosenKlasa"
                          name="klasa"
                          :required="true"
                          title=" "
                          ref="klasaSelect"
                          v-bind:options="klase"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          label="Program"
                          v-model="chosenProgram"
                          name="program"
                          :required="true"
                          title=" "
                          ref="programSelect"
                          v-bind:options="programi"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          label="Platforma"
                          v-model="chosenPlatforma"
                          name="platforma"
                          :required="true"
                          title=" "
                          ref="platformaSelect"
                          v-bind:options="platforme"
                        ></vuestic-simple-select>
                        <vuestic-simple-select
                          v-if="!postoji && !invalid"
                          label="OJ"
                          v-model="chosenOJ"
                          name="oj"
                          :required="true"
                          title=" "
                          ref="ojSelect"
                          v-bind:options="OJs"
                        ></vuestic-simple-select>
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
                    v-if="!noButtons && !postoji && !invalid"
                    :class="okClass"
                    @click="ok"
                    :disabled="(izbor === 'LN' && LN.length < 3) || (izbor === 'opis' && opis.length < 3)"
                  >{{ okText }}</button>
                  <button
                    type="button"
                    v-if="!noButtons && postoji"
                    class="btn btn-secondary-info btn-sm"
                    @click="Prijem()"
                  >
                    <span class="fa fa-flask"></span>
                    {{'Prijem'}}
                  </button>
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
  name: "vuestic-modal-produkt",
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
      default: true
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
    }
  },
  data() {
    return {
      show: false,
      duration: 500,

      izbor: "LN",
      jmbg: "",
      dateofb: "",
      godiste: "",

      ime: "",
      prezime: "",
      spol: "",
      
      chosenAdress: "",
      cities: [],
      telefon: "",
      email: "",

      postoji: false,
      invalid: false,
      patient_id: "",
      patient_data: "",
      error_msg: "",

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      LN:"",
      opis:"",
      jedinica:"",
      jedinice: ["test","mL", "L","kom","g","kg"],
      nivo:"",
      danadoroka:"",
      sadrzaj:"",
      zasnaziv:"",
      zemlja:"",
      chosenZemlja:"",
      chosenKlasa:"",
      chosenProgram:"",
      chosenPlatforma:"",
      chosenOJ:"",
      programi:[],
      klase:[],
      platforme:[],
      OJs:[],
      backKlase:[],
      backProgrami:[],
      backPlatforme:[],
      backOJs:[],
      produkt_data:"",
      zemlje:["NJEMAČKA","IRSKA","SAD","POLJSKA","ŠVICARSKA","JAPAN"],
      chosenProizvodjac:"",
      proizvodjaci:[],
      backProizvodjaci:[],
      produkt:{
          LN:"",
          opis:"",
          zasticeni_naziv:"",
          zemlja_porijekla:"",
          jedinica_mjere:"",
          pakovanje:"",
          upozorenje:"",
          klasa:"",
          program:"",
          platforma:"",
          proizvodjac:"",
          oj:""
      }
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

  http.get(
              "inventar/listklasa?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                 this.backKlase = res.data.klase
              res.data.klase.forEach(element => {
                  this.klase.push(element.naziv)
                });
              if(this.klase.length===1){
                  this.chosenKlasa=this.klase[0]
                }
              }
            });

  http.get(
              "inventar/listprogram?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                 this.backProgrami =res.data.programi 
              res.data.programi.forEach(element => {
                  this.programi.push(element.naziv)
                });
              if(this.programi.length===1){
                  this.chosenProgram=this.programi[0]
                }
              }
            });

  http.get(
              "inventar/listplatforma?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                  this.backPlatforme =res.data.platforme
                  res.data.platforme.forEach(element => {
                  this.platforme.push(element.naziv)
                });
                if(this.platforme.length===1){
                  this.chosenPlatforma=this.platforme[0]
                }
              }
            });

  http.get("inventar/listoj?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                 this.backOJs = res.data.list
                res.data.list.forEach(element => {
                  this.OJs.push(element.naziv)
                });
                if(this.OJs.length===1){
                  this.chosenOJ=this.OJs[0]
                }
              }
            });
  http.get("inventar/listproizvodjac?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                 this.proizvodjaci = res.data.proizvodjaci
                res.data.proizvodjaci.forEach(element => {
                  this.backProizvodjaci.push(element.naziv)
                });
                if(this.OJs.length===1){
                  this.chosenOJ=this.OJs[0]
                }
              }
            });
    //
    http
      .post("/postavke/sajtovi/" + this.$store.state.site, {
        token: this.$store.state.token
      })
      .then(res => {
        if (res.data.sajt.mjesta != undefined) {
          res.data.sajt.mjesta.forEach(element => {
            if (element != "") {
              this.cities.push(element);
            }
          });
        }
      })
      .then(res => {
        this.cities.sort(function(a, b) {
          return a.toLowerCase() == b.toLowerCase()
            ? 0
            : +(a.toLowerCase() > b.toLowerCase()) || -1;
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
    },
    izbor: function() {
      switch (this.izbor) {
        case "LN":

          break;
        case "opis":

          break;

      }
    },
    LN: function() {

  
          if (this.LN.length>3) {
            http
              .post("/inventar/readprodukt", {
                LN: this.LN,
                token: this.$store.state.token,
                site: this.$store.state.site
              })
              .then(res => {
                if (res.data.success) {
                  this.postoji = true;
                  this.produkt_data = res.data.produkt.opis+" "+res.data.produkt.pakovanje+" "+res.data.produkt.jedinica_mjere
                  // console.log(res.data.produkt)
                } else {
                  this.postoji = false;

                }
              });
          } 
        
    },

  },
  methods: {
        setFocus: function()
    {

      this.$refs.search.focus();
    },
    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");
      this.Save();
    },
    Prijem() {
      router.push("/samples/" + this.patient_id);
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
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      //The maximum is exclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min)) + min;
    },
    validateEmail: function(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      } else {
        return false;
      }
    },
    validateJMBG(jmbg) {
      return (
        /^\d{4}[9,0]{1}\d{8}$/.test(String(jmbg)) ||
        /^\d{4}[9,0]{1}\d{7}[P]{1}$/.test(String(jmbg))
      );
    },
    validateYear(year) {
      var text = /^[0-9]+$/;
      if (year != 0) {
        if (year != "" && !text.test(year)) {
          return false;
        }

        if (year.length != 4) {
          return false;
        }
        var current_year = new Date().getFullYear();
        if (year < 1921 || year > current_year) {
          return false;
        }
        return true;
      }
    },
    validateDate(inputText) {

      return true;
    },

    validateDateOfBirth(inputText) {
      var godiste = inputText[4] + inputText[5] + inputText[6] + inputText[7];
      inputText =
        inputText[0] +
        inputText[1] +
        "-" +
        inputText[2] +
        inputText[3] +
        "-" +
        godiste;

      if (!this.validateYear(godiste)) {
        return false;
      }

      var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
      // Match the date format through regular expression
      if (inputText.match(dateformat)) {
        //Test which seperator is used '/' or '-'
        var opera1 = inputText.split("/");
        var opera2 = inputText.split("-");
        var lopera1 = opera1.length;
        var lopera2 = opera2.length;
        // Extract the string into month, date and year
        if (lopera1 > 1) {
          var pdate = inputText.split("/");
        } else if (lopera2 > 1) {
          var pdate = inputText.split("-");
        }
        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
          if (dd > ListofDays[mm - 1]) {
            return false;
          }
        }
        if (mm == 2) {
          var lyear = false;
          if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
            lyear = true;
          }
          if (lyear == false && dd >= 29) {
            return false;
          }
          if (lyear == true && dd > 29) {
            return false;
          }
        }
      } else {
        return false;
      }
      return true;
    },
    Save() {
      if (
        this.LN.trim() === "" ||
        this.opis.trim() === "" ||
        this.sadrzaj.trim() === ""||
        this.jedinica.trim() === ""
      ) {
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

        if (this.nivo.trim() === "") {
          this.nivo = "0";
        }
        if (this.danadoroka.trim() === "") {
          this.danadoroka = "30";
        }
        if (this.zasnaziv.trim() === "") {
          this.zasnaziv = "";
        }
        if (this.zemlja.trim() === "") {
          this.zemlja = "";
        }
        if (this.chosenZemlja.trim() === "") {
          this.chosenZemlja = "";
        }
        if (this.chosenKlasa.trim() === "") {
          this.chosenKlasa = "";
        }
         if (this.chosenProgram.trim() === "") {
          this.chosenProgram = "";
        }    
         if (this.chosenPlatforma.trim() === "") {
          this.chosenPlatforma = "";
        }    
         if (this.chosenOJ.trim() === "") {
          this.chosenOJ = this.$store.state.site;
        }  
  
      this.produkt.LN = this.LN
      this.produkt.opis = this.opis
      this.produkt.zasticeni_naziv = this.zasnaziv
      this.produkt.jedinica_mjere = this.jedinica
      this.produkt.zemlja_porijekla = this.chosenZemlja
      this.produkt.pakovanje=this.sadrzaj
      this.produkt.upozorenje = this.nivo
      this.produkt.danadoroka = this.danadoroka
      this.backKlase.forEach(element => {
          if(element.naziv ===this.chosenKlasa){
               this.produkt.klasa = element._id
          }
      });
      this.backProgrami.forEach(element => {
            if(element.naziv ===this.chosenProgram){
               this.produkt.program = element._id
          }
      });
      this.backPlatforme.forEach(element => {
            if(element.naziv ===this.chosenPlatforma){
               this.produkt.platforma = element._id
          } 
      });
      this.backOJs.forEach(element => {
            if(element.naziv ===this.chosenOJ){
               this.produkt.oj = element._id
          }   
      });
      this.proizvodjaci.forEach(element => {
            if(element.naziv ===this.chosenProizvodjac){
               this.produkt.proizvodjac = element._id
          }   
      });
                http
                  .post("inventar/createprodukt", {
                    produkt:this.produkt,
                    token: this.$store.state.token,
                    site: this.$store.state.site
                  })
                  .then(res => {
                    if (res.data.success === false) {
                      this.toastText = "Greška prilikom upisa!";
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
                    } else {
                      this.LN="" 
                      this.opis = "" 
                      this.sadrzaj = ""
                      this.jedinica = ""
                      this.postoji = false;
                      this.invalid = false;
                      this.error_msg = "";

                      this.show = false;
                      window.removeEventListener("keyup", this.listenKeyUp);

                      router.push("/inventar/produkti");
                    }
                  });
              
            
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";

.vuestic-modal {
  height: 0;
  width: 0;

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
}
</style>
