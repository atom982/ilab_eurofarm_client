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
                    <div class="col-md-1"></div>

                    <div class="col-md-5">
                      <fieldset>
                        <!-- Izbor: Datum rođenja -->
                        <div v-if="izbor === 'datr'">
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                style="color: #e34a4a"
                                onpaste="return false;"
                                autocomplete="off"
                                id="edrp-input-icon-left"
                                title=" "
                                v-model="datumrodjenja"
                                name="edrp-input-icon-left"
                                required
                              />
                              <i
                                class="glyphicon glyphicon-pencil icon-left input-icon"
                              ></i>
                              <label
                                style="color: #e34a4a"
                                class="control-label"
                                for="edrp-input-icon-left"
                                >{{ "DD.MM.GGGG" }}</label
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
                                >{{ "GGGG" }}</label
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
                              >{{ "IME" }}</label
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
                              >{{ "PREZIME" }}</label
                            >
                            <i class="bar"></i>
                          </div>
                        </div>

                        <vuestic-simple-select
                          :color="'red'"
                          :label="'SPOL'"
                          v-model="spol"
                          name="spol"
                          :required="true"
                          title=" "
                          ref="spolSelect"
                          v-bind:options="spolovi"
                        ></vuestic-simple-select>

                        <vuestic-simple-select
                          :color="'red'"
                          :label="'SVRHA TESTIRANJA'"
                          v-model="purpose"
                          name="purpose"
                          :required="true"
                          title=" "
                          ref="purposeSelect"
                          v-bind:options="purposes"
                        ></vuestic-simple-select>

                        <vuestic-simple-select
                          :color="'red'"
                          :label="'NALAZ IZDATI'"
                          v-model="izdavanje"
                          name="izdavanje"
                          :required="false"
                          title=" "
                          ref="izdavanjeSelect"
                          v-bind:options="izdavanja"
                        ></vuestic-simple-select>
                      </fieldset>
                    </div>

                    <div class="col-md-5">
                      <div v-if="false" class="row">
                        <div class="col-md-12">
                          <div class="col-md-1"></div>
                          <div class="col-md-11">
                            <div style="min-height: 14px"></div>
                            <fieldset>
                              <!-- Izbor: Datum rođenja -->
                              <postavke-radio-button
                                :label="'DATUM ROĐENJA'"
                                :id="'datr'"
                                :value="'datr'"
                                :name="'disabled-radio'"
                                :disabled="false"
                                v-model="izbor"
                              />

                              <!-- Izbor: Godište -->
                              <postavke-radio-button
                                :label="'GODINA ROĐENJA'"
                                :id="'god'"
                                :value="'god'"
                                :name="'disabled-radio'"
                                :disabled="true"
                                v-model="izbor"
                              />
                            </fieldset>
                          </div>
                        </div>
                      </div>

                      <!-- 
                      <hr />
                      <div style="min-height: 8px"></div> -->

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
                            >{{ "IDENTIFIKACIJSKI DOKUMENT" }}</label
                          >
                          <i class="bar"></i>
                        </div>
                      </div>

                      <vuestic-simple-select
                        v-show="$store.state.default_route === '/registracija'"
                        :label="'Željena analiza'"
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
                          <label
                            class="control-label"
                            for="prezp-input-icon-left"
                            >{{ "ADRESA STANOVANJA" }}</label
                          >
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
                          <label
                            class="control-label"
                            for="telep-input-icon-left"
                            >{{ "KONTAKT TELEFON (3876xxxxxxx)" }}</label
                          >
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
                          <label
                            class="control-label"
                            for="emep-input-icon-left"
                            >{{ "KONTAKT E-MAIL" }}</label
                          >
                          <i class="bar"></i>
                        </div>
                      </div>

                      <vuestic-multi-select
                        :label="'JEZIK NALAZA'"
                        v-model="language"
                        name="language"
                        :required="true"
                        title=" "
                        ref="languageSelect"
                        v-bind:options="languages"
                      ></vuestic-multi-select>

                      <!--                       <div
                        v-show="false"
                        class="form-check abc-checkbox abc-checkbox-primary"
                      >
                        <input
                          class="form-check-input"
                          id="pacijentbezsimptoma"
                          type="checkbox"
                          v-model="pacijentbezsimptoma"
                        />
                        <label
                          class="form-check-label"
                          for="pacijentbezsimptoma"
                        >
                          <span style="color: #4ae387" class="abc-label-text">{{
                            "pacijent bez simptoma"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="povišenatjelesnatemperatura"
                          type="checkbox"
                          v-model="povišenatjelesnatemperatura"
                        />
                        <label
                          class="form-check-label"
                          for="povišenatjelesnatemperatura"
                        >
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "povišena tjelesna temperatura"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="suhikašalj"
                          type="checkbox"
                          v-model="suhikašalj"
                        />
                        <label class="form-check-label" for="suhikašalj">
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "suhi kašalj"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="umor"
                          type="checkbox"
                          v-model="umor"
                        />
                        <label class="form-check-label" for="umor">
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "umor"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="bolovi"
                          type="checkbox"
                          v-model="bolovi"
                        />
                        <label class="form-check-label" for="bolovi">
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "bolovi"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="grlobolja"
                          type="checkbox"
                          v-model="grlobolja"
                        />
                        <label class="form-check-label" for="grlobolja">
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "grlobolja"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="proljev"
                          type="checkbox"
                          v-model="proljev"
                        />
                        <label class="form-check-label" for="proljev">
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "proljev"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="gubitakosjetaokusailimirisa"
                          type="checkbox"
                          v-model="gubitakosjetaokusailimirisa"
                        />
                        <label
                          class="form-check-label"
                          for="gubitakosjetaokusailimirisa"
                        >
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "gubitak osjeta okusa ili mirisa"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="otežanodisanjeiligubitakdaha"
                          type="checkbox"
                          v-model="otežanodisanjeiligubitakdaha"
                        />
                        <label
                          class="form-check-label"
                          for="otežanodisanjeiligubitakdaha"
                        >
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "otežano disanje ili gubitak daha"
                          }}</span>
                        </label>
                      </div>

                      <div v-show="false" class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="pacijentbezsimptoma"
                          class="form-check-input"
                          id="bolilipritisakuprsima"
                          type="checkbox"
                          v-model="bolilipritisakuprsima"
                        />
                        <label
                          class="form-check-label"
                          for="bolilipritisakuprsima"
                        >
                          <span style="color: #e34a4a" class="abc-label-text">{{
                            "bol ili pritisak u prsima"
                          }}</span>
                        </label>
                      </div> -->
                    </div>
                  </div>
                </form>

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
                      <button v-if="false" @click.prevent="Test">
                        {{ "Loading..." }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!--Footer-->
              <div class="modal-footer">
                <slot name="footer">
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="cancelClass"
                    @click="cancel"
                    :disabled="isLoading"
                  >
                    {{ cancelText }}
                  </button>

                  <button
                    type="button"
                    v-if="!noButtons && invalid"
                    :class="okClass"
                    @click.once="ok"
                    :disabled="true"
                  >
                    {{ okText }}
                  </button>

                  <button
                    type="button"
                    v-if="!noButtons && !invalid"
                    :class="okClass"
                    @click.once="ok"
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
                      purpose.trim() == '' ||
                      izdavanje.trim() == '' 
                    "
                  >
                    {{ okText }}
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
import { bus } from "../../main";
import router from "../../router";
import { http } from "../../../config/config.js";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "vuestic-modal-patient",
  props: {
    transition: {
      type: String,
      default: "modal",
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: true,
    },
    force: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
      default: "CONFIRM",
    },
    cancelText: {
      type: String,
      default: "CANCEL",
    },
    okClass: {
      type: String,
      default: "btn btn-primary btn-sm",
    },
    cancelClass: {
      type: String,
      default: "btn btn-warning btn-sm",
    },
    closeIconShown: {
      type: Boolean,
      default: false,
    },
    okDisabled: {
      type: Boolean,
      default: false,
    },
    cancelDisabled: {
      type: Boolean,
      default: false,
    },
    noButtons: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // Eurofarm Centar

      purpose: "",
      purposes: [
        "Putovanje",
        "Procjena zdravstvenog stanja",
        "Kontakt sa zaraženom osobom",
      ],
      analysis: "",
      analyses: ["", "COVID-19 RT-PCR Test", "COVID-19 Antigen Test"],

      izdavanje: "",
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
      languages: ["Bosanski jezik", "Engleski jezik", "Njemački jezik"],

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
      spolovi: ["MUŠKI", "ŽENSKI"],
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
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
    };
  },
  components: {
    Loading,
  },

  computed: {
    modalClass() {
      return {
        "modal-lg": this.large,
        "modal-sm": this.small,
      };
    },
  },
  created() {
    if (this.show) {
      document.body.className += " modal-open";
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
  beforeDestroy() {
    document.body.className = document.body.className.replace(
      /\s?modal-open/,
      ""
    );
  },
  watch: {
    purpose: function () {
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

    show: function (value) {
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

      if (
        !isNaN(this.datumrodjenja.substring(0, 2)) &&
        this.datumrodjenja.length === 2
      ) {
        this.datumrodjenja =
          this.datumrodjenja.substring(0, 2).replace(".", "") + ".";
      }

      if (
        this.datumrodjenja.length === 4 &&
        !isNaN(
          this.datumrodjenja.slice(2, 4) && this.datumrodjenja.includes(".")
        )
      ) {
        var dot1 = this.datumrodjenja.split(".");
        var ldot1 = dot1.length;

        if (ldot1 > 1) {
          var qdate1 = this.datumrodjenja.split(".");

          if (qdate1[1].length === 2) {
            this.datumrodjenja = qdate1[0] + "." + qdate1[1] + ".";
          }
        }
      }

      if (
        this.datumrodjenja.length === 5 &&
        !isNaN(
          this.datumrodjenja.slice(3, 5) && this.datumrodjenja.includes(".")
        )
      ) {
        var dot2 = this.datumrodjenja.split(".");
        var ldot2 = dot2.length;

        if (ldot2 > 1) {
          var qdate2 = this.datumrodjenja.split(".");

          if (qdate2[1].length === 2) {
            this.datumrodjenja = qdate2[0] + "." + qdate2[1] + ".";
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

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

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

                // console.log("Saving Patient data...");

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

                // console.log("Unosim novog pacijenta...")

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
                    language: this.language,
                    telefon: this.telefon.trim(),
                    email: this.email.trim(),
                    adresa: this.chosenAdress.trim(),
                    site: this.$store.state.site,
                    token: this.$store.state.token,
                  })
                  .then((res) => {
                    if (res.data.success === false) {
                      this.isLoading = false;

                      this.toastText = "Greška prilikom upisa!";
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

                      this.jmbg = "";
                      this.dateofb = "";
                      this.datumrodjenja = "";
                      this.godiste = "";
                      this.ime = "";
                      this.purpose = "";
                      this.analysis = "";
                      this.izdavanje = "";
                      this.prezime = "";
                      this.spol = "";
                      this.chosenAdress = "";
                      this.telefon = "";
                      this.email = "";
                      this.invalid = true;

                      this.show = false;

                      window.removeEventListener("keyup", this.listenKeyUp);

                      router.push("/samples/" + res.data.pacijent._id);
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
