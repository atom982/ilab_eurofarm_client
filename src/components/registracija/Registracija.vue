<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget
          style="min-height: 350px; color: #e34a4a"
          :headerText="text"
        >
          <div class="row">

            
            <div class="col-md-3">
              




               <div class="col-md-12">
                <div class="col-md-11">
                  <fieldset>
                    <postavke-radio-button
                      :label="datr"
                      :id="'datr'"
                      :value="'datr'"
                      :name="'disabled-radio'"
                      :disabled="true"
                      v-model="izbor"
                    />

                    <!-- Izbor: Godište -->
                    <postavke-radio-button
                      v-if="false"
                      :label="god"
                      :id="'god'"
                      :value="'god'"
                      :name="'disabled-radio'"
                      :disabled="false"
                      v-model="izbor"
                    />
                  </fieldset>
                </div>
              </div>

              <hr />



              <div class="col-md-12">
                <div class="col-md-11">
                  <fieldset>
                    <postavke-radio-button
                      :color="'red'"
                      :label="ba"
                      :id="'ba'"
                      :value="'ba'"
                      :name="'radio'"
                      v-model="radioModel"
                    />
                    <postavke-radio-button
                      :color="'red'"
                      :label="en"
                      :id="'en'"
                      :value="'en'"
                      :name="'radio'"
                      v-model="radioModel"
                    />
                    <postavke-radio-button
                      :color="'red'"
                      :label="de"
                      :id="'de'"
                      :value="'de'"
                      :name="'radio'"
                      v-model="radioModel"
                    />
                  </fieldset>
                </div>
              </div>
             
            </div>

          

            <div class="col-md-4">
              <fieldset>
                <!-- Izbor: Datum rođenja -->
                <div v-if="izbor === 'datr'">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        style="color: #e34a4a"
                        onpaste="return false;"
                        autocomplete="off"
                        id="rdrp-input-icon-left"
                        title=" "
                        v-model="datumrodjenja"
                        name="rdrp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label
                        style="color: #e34a4a"
                        class="control-label"
                        for="rdrp-input-icon-left"
                        >{{ ldateofb }}</label
                      >
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <!-- Izbor: Godište -->
                <div v-if="izbor === 'god'">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        style="color: #e34a4a"
                        onpaste="return false;"
                        autocomplete="off"
                        id="godp-input-icon-left"
                        title=" "
                        v-model="godiste"
                        name="godp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label
                        style="color: #e34a4a"
                        class="control-label"
                        for="godp-input-icon-left"
                        >{{ lgodiste }}</label
                      >
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      style="color: #e34a4a"
                      id="imep-input-icon-left"
                      title=" "
                      v-model="ime"
                      name="imep-input-icon-left"
                      :required="true"
                    />
                    <i
                      class="glyphicon glyphicon-pencil icon-left input-icon"
                    ></i>
                    <label
                      style="color: #e34a4a"
                      class="control-label"
                      for="imep-input-icon-left"
                      >{{ lime }}</label
                    >
                    <i class="bar"></i>
                  </div>
                </div>

                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      style="color: #e34a4a"
                      id="prezime-input-icon-left"
                      title=" "
                      v-model="prezime"
                      name="prezime-input-icon-left"
                      :required="true"
                    />
                    <i
                      class="glyphicon glyphicon-pencil icon-left input-icon"
                    ></i>
                    <label
                      style="color: #e34a4a"
                      class="control-label"
                      for="prezime-input-icon-left"
                      >{{ lprezime }}</label
                    >
                    <i class="bar"></i>
                  </div>
                </div>

                <vuestic-simple-select
                  v-if="lspol === 'SPOL'"
                  :color="'red'"
                  :label="lspol"
                  v-model="spol"
                  name="spol"
                  :required="true"
                  title=" "
                  ref="spolSelect"
                  v-bind:options="spolovi_ba"
                ></vuestic-simple-select>

                <vuestic-simple-select
                  v-if="lspol === 'SEX'"
                  :color="'red'"
                  :label="lspol"
                  v-model="spol"
                  name="spol"
                  :required="true"
                  title=" "
                  ref="spolSelect"
                  v-bind:options="spolovi_en"
                ></vuestic-simple-select>

                <vuestic-simple-select
                  v-if="lspol === 'SEX '"
                  :color="'red'"
                  :label="lspol"
                  v-model="spol"
                  name="spol"
                  :required="true"
                  title=" "
                  ref="spolSelect"
                  v-bind:options="spolovi_de"
                ></vuestic-simple-select>

                <vuestic-simple-select
                  v-if="lpurpose === 'SVRHA TESTIRANJA'"
                  :color="'red'"
                  :label="lpurpose"
                  v-model="purpose"
                  name="purpose"
                  :required="true"
                  title=" "
                  ref="purposeSelect"
                  v-bind:options="purposes_ba"
                ></vuestic-simple-select>

                <vuestic-simple-select
                  v-if="lpurpose === 'TEST PURPOSE'"
                  :color="'red'"
                  :label="lpurpose"
                  v-model="purpose"
                  name="purpose"
                  :required="true"
                  title=" "
                  ref="purposeSelect"
                  v-bind:options="purposes_en"
                ></vuestic-simple-select>

                <vuestic-simple-select
                  v-if="lpurpose === 'ZWECK DES TESTS'"
                  :color="'red'"
                  :label="lpurpose"
                  v-model="purpose"
                  name="purpose"
                  :required="true"
                  title=" "
                  ref="purposeSelect"
                  v-bind:options="purposes_de"
                ></vuestic-simple-select>

                <div class="form-group with-icon-left">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      id="passport-input-icon-left"
                      title=" "
                      v-model="passport"
                      name="passport-input-icon-left"
                      required
                    />
                    <i
                      class="glyphicon glyphicon-pencil icon-left input-icon"
                    ></i>

                    <label
                      class="control-label"
                      for="passport-input-icon-left"
                      >{{ lpassport }}</label
                    >
                    <i class="bar"></i>
                  </div>
                </div>
              </fieldset>
            </div>

            <div class="col-md-5">
              <vuestic-simple-select
                v-show="$store.state.default_route === '/registracija'"
                :label="lanalysis"
                v-model="analysis"
                name="analysis"
                :required="false"
                title=" "
                ref="analysisSelect"
                v-bind:options="analyses"
              ></vuestic-simple-select>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="prezp-input-icon-left"
                    title=" "
                    v-model="chosenAdress"
                    name="prezp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="prezp-input-icon-left">{{
                    lchosenAdress
                  }}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="telep-input-icon-left"
                    title=" "
                    v-model="telefon"
                    name="telep-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="telep-input-icon-left">{{
                    ltelefon
                  }}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    onpaste="return false;"
                    autocomplete="off"
                    id="emep-input-icon-left"
                    title=" "
                    v-model="email"
                    name="emep-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="emep-input-icon-left">{{
                    lemail
                  }}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <vuestic-multi-select
                v-if="llanguage === 'JEZIK NALAZA'"
                :label="llanguage"
                v-model="language"
                name="language"
                :required="true"
                title=" "
                ref="languageSelect"
                v-bind:options="languages_ba"
              ></vuestic-multi-select>

              <vuestic-multi-select
                v-if="llanguage === 'LANGUAGE OF MEDICAL REPORT'"
                :label="llanguage"
                v-model="language"
                name="language"
                :required="true"
                title=" "
                ref="languageSelect"
                v-bind:options="languages_en"
              ></vuestic-multi-select>

              <vuestic-multi-select
                v-if="llanguage === 'SPRACHE DES BERICHTS'"
                :label="llanguage"
                v-model="language"
                name="language"
                :required="true"
                title=" "
                ref="languageSelect"
                v-bind:options="languages_de"
              ></vuestic-multi-select>
            </div>
          </div>

          <hr />

          <div class="row">
            <div class="col-md-6"></div>
            <div class="col-md-6">
              <div class="wizard-body-actions">
                <div class="btn-container">
                  <button
                    style="width: 200px"
                    class="btn btn-sm btn-secondary-danger wizard-back pull-left"
                    @click="Clear()"
                  >
                    {{ clear }}
                  </button>
                </div>

                <div v-if="invalid" class="btn-container">
                  <button
                    :disabled="true"
                    style="width: 200px"
                    class="btn btn-sm btn-danger wizard-next pull-right"
                  >
                    {{ save }}
                  </button>
                </div>

                <div v-if="!invalid" class="btn-container">
                  <button
                    style="width: 200px"
                    class="btn btn-sm btn-danger wizard-next pull-right"
                    @click="Save()"
                    :disabled="
                      (pacijentbezsimptoma == false &&
                        povišenatjelesnatemperatura == false &&
                        suhikašalj == false &&
                        umor == false &&
                        bolovi == false &&
                        grlobolja == false &&
                        proljev == false &&
                        konjunktivitis == false &&
                        glavobolja == false &&
                        gubitakosjetaokusailimirisa == false &&
                        osipilipromjenabojeprstijunarukamailinogama == false &&
                        otežanodisanjeiligubitakdaha == false &&
                        bolilipritisakuprsima == false &&
                        gubitaksposobnostigovorailikretanja == false) ||
                      (!Number.isInteger(dateofb) &&
                        dateofb.length != 8 &&
                        izbor === 'datr') ||
                      (!Number.isInteger(godiste) &&
                        godiste.length != 4 &&
                        izbor === 'god') ||
                      ime.trim() == '' ||
                      prezime.trim() == '' ||
                      spol.trim() == '' ||
                      purpose.trim() == ''
                    "
                  >
                    {{ save }}
                  </button>
                </div>
              </div>
            </div>
          </div>
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
import router from "../../router";

import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

export default {
  name: "provjera-nalaza",
  data() {
    return {
      save: "SAČUVAJ",
      clear: "PONIŠTI",
      text: "Registracija putnika",
      radioModel: "ba",
      ba: "Bosanski jezik",
      en: "Engleski jezik",
      de: "Njemački jezik",

      datr: "DATUM ROĐENJA",
      god: "GODINA ROĐENJA",
      lanalysis: "ANALIZA",
      ldateofb: "DD.MM.GGGG",
      lgodiste: "GGGG",
      lime: "IME",
      lprezime: "PREZIME",
      lspol: "SPOL",
      lpurpose: "SVRHA TESTIRANJA",
      lpassport: "IDENTIFIKACIJSKI DOKUMENT",
      llanguage: "JEZIK NALAZA",
      lchosenAdress: "ADRESA STANOVANJA",
      ltelefon: "KONTAKT TELEFON (3876xxxxxxx)",
      lemail: "KONTAKT E-MAIL",

      // Eurofarm Centar

      purpose: "",
      purposes_ba: ["Putovanje", "Procjena zdravstvenog stanja", "Kontakt sa zaraženom osobom"],
      purposes_en: ["Traveling", "Health Assessment", "Contact with infected person"],
      purposes_de: ["Reisen", "Gesundheitsbewertung", "Kontakt mit einer angesteckten Person"],
      analysis: "",
      analyses: ["", "COVID 19 RT PCR Test", "COVID 19 Antigen Test"],

      izdavanje: "DANAS",
      izdavanja: ["DANAS", "SUTRA"],

      pacijentbezsimptoma: false,
      povišenatjelesnatemperatura: false,
      suhikašalj: false,
      umor: false,
      bolovi: false,
      grlobolja: false,
      proljev: false,
      konjunktivitis: false,
      glavobolja: false,
      gubitakosjetaokusailimirisa: false,
      osipilipromjenabojeprstijunarukamailinogama: false,
      otežanodisanjeiligubitakdaha: false,
      bolilipritisakuprsima: false,
      gubitaksposobnostigovorailikretanja: false,

      symptoms: {
        pacijentbezsimptoma: false,
        povišenatjelesnatemperatura: false,
        suhikašalj: false,
        umor: false,
        bolovi: false,
        grlobolja: false,
        proljev: false,
        konjunktivitis: false,
        glavobolja: false,
        gubitakosjetaokusailimirisa: false,
        osipilipromjenabojeprstijunarukamailinogama: false,
        otežanodisanjeiligubitakdaha: false,
        bolilipritisakuprsima: false,
        gubitaksposobnostigovorailikretanja: false,
      },
      passport: "",
      language: [],
      languages_ba: ["Bosanski jezik", "Engleski jezik", "Njemački jezik"],
      languages_en: ["Bosnian language", "English language", "German language"],
      languages_de: [
        "Bosnische Sprache",
        "Englische Sprache",
        "Deutsche Sprache",
      ],

      show: false,
      duration: 500,

      izbor: "datr",
      jmbg: "",
      dateofb: "",
      datumrodjenja: "",
      godiste: "",

      ime: "",
      prezime: "",
      spol: "",
      spolovi_ba: ["MUŠKI", "ŽENSKI"],
      spolovi_en: ["MALE", "FEMALE"],
      spolovi_de: ["MÄNNLICH", "WEIBLICH"],
      chosenAdress: "",
      cities: [],
      telefon: "",
      email: "",

      invalid: true,

      // Vue Loading
      isLoading: false,
      fullPage: true,
      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 1000,
      isToastFullWidth: false,
      className: "",
    };
  },

  components: {
    Loading,
  },

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"]),
  },

  watch: {
    radioModel: function () {
      // console.log(this.radioModel)
      switch (this.radioModel) {
        case "ba":
          this.Clear();

          this.save = "SAČUVAJ";
          this.clear = "PONIŠTI";

          this.text = "Registracija putnika";

          this.ba = "Bosanski jezik";
          this.en = "Engleski jezik";
          this.de = "Njemački jezik";

          this.datr = "DATUM ROĐENJA";
          this.god = "GODINA ROĐENJA";

          this.lanalysis = "ANALIZA";
          this.ldateofb = "DD.MM.GGGG";
          this.lgodiste = "GGGG";
          this.lime = "IME";
          this.lprezime = "PREZIME";
          this.lspol = "SPOL";
          this.lpurpose = "SVRHA TESTIRANJA";
          this.lpassport = "IDENTIFIKACIJSKI DOKUMENT";
          this.llanguage = "JEZIK NALAZA";
          this.lchosenAdress = "ADRESA STANOVANJA";
          this.ltelefon = "KONTAKT TELEFON (3876xxxxxxx)";
          this.lemail = "KONTAKT E-MAIL";

          break;

        case "en":
          this.Clear();

          this.save = "SAVE";
          this.clear = "CANCEL";

          this.text = "Passenger registration";

          this.ba = "Bosnian language";
          this.en = "English language";
          this.de = "German language";

          this.datr = "DATE OF BIRTH";
          this.god = "YEAR OF BIRTH";

          this.lanalysis = "ANALYSIS";
          this.ldateofb = "DD.MM.YYYY";
          this.lgodiste = "YYYY";
          this.lime = "NAME";
          this.lprezime = "SURNAME";
          this.lspol = "SEX";
          this.lpurpose = "TEST PURPOSE";
          this.lpassport = "IDENTIFICATION DOCUMENT";
          this.llanguage = "LANGUAGE OF MEDICAL REPORT";
          this.lchosenAdress = "RESIDENTIAL ADDRESS";
          this.ltelefon = "TELEPHONE NUMBER (3876xxxxxxx)";
          this.lemail = "E-MAIL ADDRESS";

          break;

        case "de":
          this.Clear();

          this.save = "SPEICHERN";
          this.clear = "ABBRECHEN";

          this.text = "Passagierregistrierung";

          this.ba = "Bosnische Sprache";
          this.en = "Englische Sprache";
          this.de = "Deutsche Sprache";

          this.datr = "GEBURTSDATUM";
          this.god = "GEBURTSJAHR";

          this.lanalysis = "ANALYSE";
          this.ldateofb = "DD.MM.JJJJ";
          this.lgodiste = "JJJJ";
          this.lime = "NAME";
          this.lprezime = "NACHNAME";
          this.lspol = "SEX ";
          this.lpurpose = "ZWECK DES TESTS";
          this.lpassport = "AUSWEISDOKUMENT";
          this.llanguage = "SPRACHE DES BERICHTS";
          this.lchosenAdress = "WOHNADRESSE";
          this.ltelefon = "TELEFONNUMMER (3876xxxxxxx)";
          this.lemail = "E-MAIL ADRESSE";

          break;

        default:
          break;
      }
    },

    purpose: function () {
      // "Kontakt sa zaraženom osobom"
      if (
        this.purpose === "Putovanje" ||
        this.purpose === "Procjena zdravstvenog stanja" ||
        this.purpose === "Kontakt sa zaraženom osobom" ||
        this.purpose != ""
      ) {
        this.pacijentbezsimptoma = true;

        if (this.pacijentbezsimptoma === true) {
          this.povišenatjelesnatemperatura = false;
          this.suhikašalj = false;
          this.umor = false;
          this.bolovi = false;
          this.grlobolja = false;
          this.proljev = false;
          this.konjunktivitis = false;
          this.glavobolja = false;
          this.gubitakosjetaokusailimirisa = false;
          this.osipilipromjenabojeprstijunarukamailinogama = false;
          this.otežanodisanjeiligubitakdaha = false;
          this.bolilipritisakuprsima = false;
          this.gubitaksposobnostigovorailikretanja = false;
        }
      } else {
        this.pacijentbezsimptoma = false;
        this.povišenatjelesnatemperatura = false;
        this.suhikašalj = false;
        this.umor = false;
        this.bolovi = false;
        this.grlobolja = false;
        this.proljev = false;
        this.konjunktivitis = false;
        this.glavobolja = false;
        this.gubitakosjetaokusailimirisa = false;
        this.osipilipromjenabojeprstijunarukamailinogama = false;
        this.otežanodisanjeiligubitakdaha = false;
        this.bolilipritisakuprsima = false;
        this.gubitaksposobnostigovorailikretanja = false;
      }
    },

    pacijentbezsimptoma: function () {
      if (this.pacijentbezsimptoma === true) {
        this.povišenatjelesnatemperatura = false;
        this.suhikašalj = false;
        this.umor = false;
        this.bolovi = false;
        this.grlobolja = false;
        this.proljev = false;
        this.konjunktivitis = false;
        this.glavobolja = false;
        this.gubitakosjetaokusailimirisa = false;
        this.osipilipromjenabojeprstijunarukamailinogama = false;
        this.otežanodisanjeiligubitakdaha = false;
        this.bolilipritisakuprsima = false;
        this.gubitaksposobnostigovorailikretanja = false;
      }
    },

    izbor: function () {
      switch (this.izbor) {
        case "jmbg":
          this.jmbg = "";
          this.dateofb = "";
          this.datumrodjenja = "";
          this.godiste = "";

          break;

        case "datr":
          this.jmbg = "";
          this.dateofb = "";
          this.datumrodjenja = "";
          this.godiste = "";

          break;

        case "god":
          this.jmbg = "";
          this.dateofb = "";
          this.datumrodjenja = "";
          this.godiste = "";

          break;

        case "nodata":
          this.jmbg = "0101920" + this.getRandomInt(100000, 999999);
          this.dateofb = "";
          this.datumrodjenja = "";
          this.godiste = "";

          break;
      }
    },

    jmbg: function () {
      if (this.jmbg.length < 13) { 
        //
      } else if (this.jmbg.length === 13) {
        if (this.izbor === "jmbg" && !this.validateDate(this.jmbg)) {
          // Matični broj nije validan.
        } else if (this.izbor === "datr" && !this.validateDate(this.jmbg)) {
          // Datum rođenja nije validan.
        } else if (this.izbor === "god" && !this.validateYear(this.godiste)) {
          // Godište nije validno.
        } else if (this.izbor === "nodata" && !this.validateJMBG(this.jmbg)) {
          // Godište nije validno.
        } else {
          if (true) {
            http
              .post("/uzorci/patient", {
                jmbg: this.jmbg,
                token: this.$store.state.token,
                site: this.$store.state.site,
              })
              .then((res) => {
                // Do nothing.
              });
          } 
        }
      } else if (this.jmbg.length > 13) {
        this.jmbg = this.jmbg.slice(0, 13);
      }
    },
    datumrodjenja: function () {
      this.datumrodjenja = this.datumrodjenja.replace(" ", "");
      this.datumrodjenja = this.datumrodjenja.replace("..", ".");

      if(!isNaN(this.datumrodjenja.substring(0,2)) 
      && this.datumrodjenja.length === 2
      ){
        this.datumrodjenja = this.datumrodjenja.substring(0,2).replace(".","") + "."
      }

      if(this.datumrodjenja.length === 4 && 
        !isNaN(this.datumrodjenja.slice(2,4) 
        && this.datumrodjenja.includes("."))){
        var dot1 = this.datumrodjenja.split(".");
        var ldot1 = dot1.length;

        if (ldot1 > 1) {
          var qdate1 = this.datumrodjenja.split(".");

          if (qdate1[1].length === 2) {
            this.datumrodjenja = qdate1[0] + "." + qdate1[1] + "."
          }
        }

      }

      if(this.datumrodjenja.length === 5 && 
        !isNaN(this.datumrodjenja.slice(3,5) 
        && this.datumrodjenja.includes("."))){
        var dot2 = this.datumrodjenja.split(".");
        var ldot2 = dot2.length;

        if (ldot2 > 1) {
          var qdate2 = this.datumrodjenja.split(".");

          if (qdate2[1].length === 2) {
            this.datumrodjenja = qdate2[0] + "." + qdate2[1] + "."
          }
        }

      }

      // console.log(this.datumrodjenja);

      if (this.datumrodjenjadatumrodjenja != "") {
        var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\.](0?[1-9]|1[012])[\.]\d{4}$/;
      }

      // Match the date format through regular expression
      if (this.datumrodjenja.match(dateformat)) {
        // Test seperator used '.'
        var opera1 = this.datumrodjenja.split(".");
        var lopera1 = opera1.length;

        // Extract the string into month, date and year
        if (lopera1 > 1) {
          var pdate = this.datumrodjenja.split(".");
        }

        if (pdate[0].length === 1) {
          pdate[0] = "0" + pdate[0];
        }

        if (pdate[1].length === 1) {
          pdate[1] = "0" + pdate[1];
        }

        // console.log(pdate);

        this.dateofb = pdate[0] + pdate[1] + pdate[2];

        // console.log("DATE OF BIRTH: " + this.dateofb);

        var dd = parseInt(pdate[0]);
        var mm = parseInt(pdate[1]);
        var yy = parseInt(pdate[2]);
        // Create list of days of a month [assume there is no leap year by default]
        var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (mm == 1 || mm > 2) {
          if (dd > ListofDays[mm - 1]) {
            // console.log("Invalid date format!");
            this.dateofb = "";
            return false;
          }
        }
        if (mm == 2) {
          var lyear = false;
          if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
            lyear = true;
          }
          if (lyear == false && dd >= 29) {
            // console.log("Invalid date format!");
            this.dateofb = "";
            return false;
          }
          if (lyear == true && dd > 29) {
            // console.log("Invalid date format!");
            this.dateofb = "";
            return false;
          }
        }
        if (this.validateYear(yy)) {
          // console.log("Invalid date format!");
          this.dateofb = "";
          return false;
        }
      } else {
        // console.log("Invalid date format!");
        this.dateofb = "";
        return false;
      }
    },

    dateofb: function () {
      // console.log("Watching: DATE OF BIRTH");
      // console.log(this.dateofb);
      if (this.dateofb.length < 8) {

      } else if (this.dateofb.length == 8) {
        //
        if (!this.validateDateOfBirth(this.dateofb)) {
          this.invalid = true;
          // Datum rođenja nije validan.
        } else {
          this.jmbg =
            this.dateofb.slice(0, 4) +
            this.dateofb.slice(5, 8) +
            this.getRandomInt(100000, 999999);

          // console.log("JMBG: " + this.jmbg);
          this.invalid = false;
        }
      } else if (this.dateofb.length > 8) {
        this.dateofb = this.dateofb.slice(0, 8);
      }
    },
  godiste: function () {
      if (this.godiste.length < 4) {
        //
      } else if (this.godiste.length == 4) {
        if (this.validateYear(this.godiste)) {
          this.jmbg =
            "0000" +
            this.godiste.slice(1, 4) +
            this.getRandomInt(100000, 999999);
        } else {
          // Godište nije validno.
        }
      } else if (this.godiste.length > 4) {
        this.godiste = this.godiste.slice(0, 4);
      }
    },

    invalid: function () {
      // console.log(this.invalid)
    },
  },

  created() {
    this.toggleSidebar(false);
  },

  beforeMount() {
    // Međunarodni aerodrom Tuzla
    if (this.$store.state.site === "5f9f70a1444e51a464db259a") {
      this.analyses = ["", "COVID 19 Antigen Test"];
    } else {
      // Do nothing.
    }
  },

  mounted() {
    http
      .post("/postavke/sajtovi/" + this.$store.state.site, {
        token: this.$store.state.token,
      })
      .then((res) => {
        if (res.data.sajt.mjesta != undefined) {
          res.data.sajt.mjesta.forEach((element) => {
            if (element != "") {
              this.cities.push(element);
            }
          });
        }
      })
      .then((res) => {
        this.cities.sort(function (a, b) {
          return a.toLowerCase() == b.toLowerCase()
            ? 0
            : +(a.toLowerCase() > b.toLowerCase()) || -1;
        });
      });
  },
  beforeDestroy() {},

  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Clear() {
      this.jmbg = "";
      this.dateofb = "";
      this.datumrodjenja = "";
      this.godiste = "";
      this.ime = "";
      this.prezime = "";
      this.spol = "";
      this.passport = "";
      this.purpose = "";
      this.analysis = "";
      this.chosenAdress = "";
      this.telefon = "";
      this.email = "";
      this.language = [];
      this.invalid = true;
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      //The maximum is exclusive and the minimum is inclusive
      return Math.floor(Math.random() * (max - min)) + min;
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
      if (inputText[4] === "9") {
        var control = "1";
      } else if (inputText[4] === "0") {
        var control = "2";
      } else {
        return false;
      }

      if (
        !this.validateYear(control + inputText[4] + inputText[5] + inputText[6])
      ) {
        return false;
      }

      inputText =
        inputText[0] +
        inputText[1] +
        "-" +
        inputText[2] +
        inputText[3] +
        "-" +
        control +
        inputText[4] +
        inputText[5] +
        inputText[6];

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
      // console.log("Save")

      if (
        this.ime.trim() === "" ||
        this.prezime.trim() === "" ||
        this.spol.trim() === "" ||
        this.purpose.trim() === ""
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
          className: this.className,
        });
      } else {
        if (this.chosenAdress.trim() === "") {
          this.chosenAdress = "";
        }
        if (this.telefon.trim() === "") {
          this.telefon = "";
        }
        if (this.email.trim() === "") {
          this.email = "";
        }

        console.log(this.jmbg);

        if (this.validateJMBG(this.jmbg)) {
          var jmbgPost = this.jmbg;
          var item = true;

          http
            .post("pacijenti/unos/find", {
              jmbg: this.jmbg,
              token: this.$store.state.token,
              site: this.$store.state.site,
            })
            .then((res) => {
              // Do nothing.
            })
            .then((res) => {
              if (item) {
                this.isLoading = true;

                console.log("Saving Patient data...");

                this.symptoms = {
                  pacijentbezsimptoma: this.pacijentbezsimptoma,
                  povišenatjelesnatemperatura: this.povišenatjelesnatemperatura,
                  suhikašalj: this.suhikašalj,
                  umor: this.umor,
                  bolovi: this.bolovi,
                  grlobolja: this.grlobolja,
                  proljev: this.proljev,
                  konjunktivitis: this.konjunktivitis,
                  glavobolja: this.glavobolja,
                  gubitakosjetaokusailimirisa: this.gubitakosjetaokusailimirisa,
                  osipilipromjenabojeprstijunarukamailinogama: this
                    .osipilipromjenabojeprstijunarukamailinogama,
                  otežanodisanjeiligubitakdaha: this
                    .otežanodisanjeiligubitakdaha,
                  bolilipritisakuprsima: this.bolilipritisakuprsima,
                  gubitaksposobnostigovorailikretanja: this
                    .gubitaksposobnostigovorailikretanja,
                };

                // spolovi_ba: ["MUŠKI", "ŽENSKI"],
                // spolovi_en: ["MALE", "FEMALE"],
                // spolovi_de: ["MÄNNLICH", "WEIBLICH"],

                if (this.spol === "MALE" || this.spol === "MÄNNLICH") {
                  this.spol = "MUŠKI";
                } else {
                }

                if (this.spol === "FEMALE" || this.spol === "WEIBLICH") {
                  this.spol = "ŽENSKI";
                } else {
                }

                // purposes_ba: ["Putovanje", "Procjena zdravstvenog stanja", "Kontakt sa zaraženom osobom"],
                // purposes_en: ["Traveling", "Health Assessment", "Contact with infected person"],
                // purposes_de: ["Reisen", "Gesundheitsbewertung", "Kontakt mit einer angesteckten Person"],

                if (this.purpose === "Traveling" || this.purpose === "Reisen") {
                  this.purpose = "Putovanje";
                } else {
                }

                if (
                  this.purpose === "Health Assessment" ||
                  this.purpose === "Gesundheitsbewertung"
                ) {
                  this.purpose = "Procjena zdravstvenog stanja";
                } else {
                }

                if (
                  this.purpose === "Contact with infected person" ||
                  this.purpose === "Kontakt mit einer angesteckten Person"
                ) {
                  this.purpose = "Kontakt sa zaraženom osobom";
                } else {
                }

                // language: [],
                // languages_ba: ["Bosanski jezik", "Engleski jezik", "Njemački jezik"],
                // languages_en: ["Bosnian language", "English language", "German language"],
                // languages_de: ["Bosnische Sprache", "Englische Sprache", "Deutsche Sprache"],

                var arr = [];

                this.language.forEach((item) => {
                  if (
                    item == "Bosanski jezik" ||
                    item == "Bosnian language" ||
                    item == "Bosnische Sprache"
                  ) {
                    arr.push("Bosanski jezik");
                  }
                  if (
                    item == "Engleski jezik" ||
                    item == "English language" ||
                    item == "Englische Sprache"
                  ) {
                    arr.push("Engleski jezik");
                  }
                  if (
                    item == "Njemački jezik" ||
                    item == "German language" ||
                    item == "Deutsche Sprache"
                  ) {
                    arr.push("Njemački jezik");
                  }
                });

                // console.log(this.spol)
                // console.log(this.purpose)
                // console.log(arr)

                http
                  .post("pacijenti/unos/save", {
                    jmbg: jmbgPost,
                    ime: this.ime.toUpperCase().trim(),
                    prezime: this.prezime.toUpperCase().trim(),
                    // entry_disabled
                    spol: this.spol.trim(),
                    duhan: "",
                    dijabetes: "",

                    // Eurofarm Centar
                    purpose: this.purpose,
                    analysis: this.analysis,
                    izdavanje: this.izdavanje,
                    referenca: (
                      new Date().getTime() -
                      new Date().getTimezoneOffset() * 60000
                    ).toString(),

                    symptoms: this.symptoms,
                    note: "",
                    passport: this.passport.trim(),
                    language: arr,
                    telefon: this.telefon.trim(),
                    email: this.email.trim(),
                    adresa: this.chosenAdress.trim(),
                    site: this.$store.state.site,
                    token: this.$store.state.token,
                  })
                  .then((res) => {
                    if (res.data.success === false) {
                      this.isLoading = false;

                      this.toastText = "Greška prilikom unosa.";
                      this.toastIcon = "fa-remove";
                      this.toastPosition = "top-right";
                      this.className = "vuestic-toast-danger";

                      this.showToast(this.toastText, {
                        icon: this.toastIcon,
                        position: this.toastPosition,
                        duration: this.toastDuration,
                        fullWidth: this.isToastFullWidth,
                        className: this.className,
                      });
                    } else {
                      this.isLoading = false;

                      switch (this.radioModel) {
                        case "ba":
                          this.toastText = "Registracija uspješno obavljena.";

                          break;

                        case "en":
                          this.toastText =
                            "Registration successfully completed.";
                          break;

                        case "de":
                          this.toastText =
                            "Registrierung erfolgreich abgeschlossen.";

                          break;

                        default:
                          this.toastText = "Registracija uspješno obavljena.";
                          break;
                      }

                      this.toastIcon = "fa-check";
                      this.toastPosition = "top-right";
                      this.className = "vuestic-toast-primary";

                      this.showToast(this.toastText, {
                        icon: this.toastIcon,
                        position: this.toastPosition,
                        duration: this.toastDuration,
                        fullWidth: this.isToastFullWidth,
                        className: this.className,
                      });

                      this.jmbg = "";
                      this.dateofb = "";
                      this.godiste = "";
                      this.ime = "";
                      this.purpose = "";
                      this.analysis = "";
                      this.passport = "";
                      this.prezime = "";
                      this.spol = "";
                      this.chosenAdress = "";
                      this.telefon = "";
                      this.email = "";
                      this.invalid = true;
                      this.language = [];

                      this.show = false;
                    }
                  });
              }
            });
        } else {
        }
      }
    },
  },
};
</script>

<style lang="scss">
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
</style>
