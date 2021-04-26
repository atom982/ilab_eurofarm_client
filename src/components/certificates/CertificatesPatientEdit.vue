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
                                id="udrp-input-icon-left"
                                title=" "
                                v-model="datumrodjenja"
                                name="udrp-input-icon-left"
                                required
                              />
                              <i
                                class="glyphicon glyphicon-pencil icon-left input-icon"
                              ></i>
                              <label
                                style="color: #e34a4a"
                                class="control-label"
                                for="udrp-input-icon-left"
                                >{{ "DDMMGGGG" }}</label
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

                         <div class="row">
                          <div class="col-md-12">

                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              style="color: #e34a4a"
                              onpaste="return false;"
                              autocomplete="off"
                              id="ime-input-icon-left"
                              title=" "
                              v-model="patient.ime"
                              name="ime-input-icon-left"
                              required
                            />
                            <i
                              class="glyphicon glyphicon-pencil icon-left input-icon"
                            ></i>
                            <label
                              style="color: #e34a4a"
                              class="control-label"
                              for="ime-input-icon-left"
                              >{{ "IME" }}</label
                            >
                            <i class="bar"></i>
                          </div>
                        </div> </div> </div>

                        <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              style="color: #e34a4a"
                              onpaste="return false;"
                              autocomplete="off"
                              id="prp-input-icon-left"
                              title=" "
                              v-model="patient.prezime"
                              name="prp-input-icon-left"
                              required
                            />
                            <i
                              class="glyphicon glyphicon-pencil icon-left input-icon"
                            ></i>
                            <label
                              style="color: #e34a4a"
                              class="control-label"
                              for="prp-input-icon-left"
                              >{{ "PREZIME" }}</label
                            >
                            <i class="bar"></i>
                          </div>
                        </div>

                        <vuestic-simple-select
                          :color="'red'"
                          :label="'SPOL'"
                          v-model="patient.spol"
                          name="spol"
                          :required="true"
                          title=" "
                          ref="spolSelect"
                          v-bind:options="spolovi"
                        ></vuestic-simple-select>

                        <vuestic-simple-select
                          :color="'red'"
                          :label="'VRSTA POTVRDE'"
                          v-model="patient.purpose"
                          name="purpose"
                          :required="true"
                          title=" "
                          ref="purposeSelect"
                          v-bind:options="purposes"
                        ></vuestic-simple-select>

                        <!--  <vuestic-simple-select
                          :color="'red'"
                          :label="'NALAZ IZDATI'"
                          v-model="patient.izdavanje"
                          name="izdavanje"
                          :required="false"
                          title=" "
                          ref="izdavanjeSelect"
                          v-bind:options="izdavanja"
                        ></vuestic-simple-select> -->
                      </fieldset>
                    </div>

                    <div class="col-md-5">
                      <div class="row">
                        <div class="col-md-12">
                          <!--  <vuestic-simple-select
                      v-show="false"
                        :label="'Izaberite željenu analizu'"
                        v-model="patient.analysis"
                        name="analysis"
                        :required="false"
                        title=" "
                        ref="analysisSelect"
                        v-bind:options="analyses"
                      ></vuestic-simple-select> -->

                          <!--  <div class="form-group">
                            <div class="input-group">
                              <input
                              onpaste="return false;"
                                autocomplete="off"
                                id="np-input-icon-left"
                                title=" "
                                name="np-input-icon-left"
                                disabled
                              />
                              <label
                                v-if="patient.analysis != undefined && patient.analysis != ''"
                                class="control-label"
                                for="np-input-icon-left"
                                >{{ "Željena analiza: " + patient.analysis }}</label
                              >
                              <label
                                v-if="patient.analysis === undefined || patient.analysis === ''"
                                class="control-label"
                                for="np-input-icon-left"
                                >{{ "Željena analiza: " + "Nema podataka" }}</label
                              >
                              <i class="bar"></i>
                            </div>
                          </div> -->

                          <!--  <div class="form-group">
                            <div class="input-group">
                              <input
                              onpaste="return false;"
                                autocomplete="off"
                                id="np-input-icon-left"
                                title=" "
                                name="np-input-icon-left"
                                disabled
                              />
                              <label
                              style="color: #e34a4a"
                                class="control-label"
                                for="np-input-icon-left"
                                >{{ "Svrha testiranja: " + patient.purpose }}</label
                              >
                              <i class="bar"></i>
                            </div>
                          </div>

                          
 -->

                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                style="color: #e34a4a"
                                id="poz-input-icon-left"
                                title=" "
                                v-model="patient.datum"
                                name="poz-input-icon-left"
                                :required="true"
                              />
                              <i
                                class="glyphicon glyphicon-pencil icon-left input-icon"
                              ></i>
                              <label
                                style="color: #e34a4a"
                                class="control-label"
                                for="poz-input-icon-left"
                                >{{ "DATUM POZITIVNOG REZULTATA" }}</label
                              >
                              <i class="bar"></i>
                            </div>
                          </div>





                          <div class="row">
                          <div class="col-md-6">
                            <vuestic-simple-select  
                            :color="'red'"                     
                            :label="'ANALIZA'"
                            v-model="patient.analysis"
                            style="color: #e34a4a"
                            name="analysis"
                            :required="false"
                            title=" "
                            ref="analysisSelect"
                            v-bind:options="analyses"
                          ></vuestic-simple-select>
                          </div>
                          <div class="col-md-6">
                             <div class="form-group with-icon-left">
                        <div class="input-group">
                          <input
                            onpaste="return false;"
                            autocomplete="off"
                            style="color: #e34a4a"
                            id="nalaz-input-icon-left"
                            title=" "
                            v-model="patient.nalaz"
                            name="nalaz-input-icon-left"
                            :required="true"
                          />
                          <i
                            class="glyphicon glyphicon-pencil icon-left input-icon"
                          ></i>
                          <label
                            style="color: #e34a4a"
                            class="control-label"
                            for="nalaz-input-icon-left"
                            >{{ "BROJ PROTOKOLA" }}</label
                          >
                          <i class="bar"></i>
                        </div>
                      </div>
                          </div>
                          </div>




                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                style="color: #e34a4a"
                                id="id-input-icon-left"
                                title=" "
                                v-model="patient.passport"
                                name="id-input-icon-left"
                                required
                              />
                              <i
                                class="glyphicon glyphicon-pencil icon-left input-icon"
                              ></i>
                              <label
                               style="color: #e34a4a"
                                class="control-label"
                                for="id-input-icon-left"
                                >{{ "IDENTIFIKACIJSKI DOKUMENT" }}</label
                              >
                              <i class="bar"></i>
                            </div>
                          </div>

                          <!--  <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                id="imp-input-icon-left"
                                title=" "
                                v-model="patient.adresa"
                                name="imp-input-icon-left"
                                required
                              />
                              <i
                                class="glyphicon glyphicon-pencil icon-left input-icon"
                              ></i>
                              <label
                                class="control-label"
                                for="imp-input-icon-left"
                                >{{ "ADRESA STANOVANJA" }}</label
                              >
                              <i class="bar"></i>
                            </div>
                          </div> -->

                          <!-- <vuestic-simple-select
                          label="Mjesto stanovanja"
                          v-model="patient.adresa"
                          name="adresa"
                          :required="true"
                          title=" "
                          ref="adresaSelect"
                          v-bind:options="cities"
                        ></vuestic-simple-select> -->
                          <div class="form-group with-icon-left">
                            <div class="input-group">
                              <input
                                onpaste="return false;"
                                autocomplete="off"
                                id="tlp-input-icon-left"
                                title=" "
                                v-model="patient.telefon"
                                name="tlp-input-icon-left"
                                required
                              />
                              <i
                                class="glyphicon glyphicon-pencil icon-left input-icon"
                              ></i>
                              <label
                                class="control-label"
                                for="tlp-input-icon-left"
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
                                id="emp-input-icon-left"
                                title=" "
                                v-model="patient.email"
                                name="emp-input-icon-left"
                                required
                              />
                              <i
                                class="glyphicon glyphicon-pencil icon-left input-icon"
                              ></i>
                              <label
                                class="control-label"
                                for="emp-input-icon-left"
                                >{{ "KONTAKT E-MAIL" }}</label
                              >
                              <i class="bar"></i>
                            </div>
                          </div>

                          <!--   <vuestic-multi-select
                            :label="'JEZIK NALAZA'"
                            v-model="patient.language"
                            name="spol"
                            :required="true"
                            title=" "
                            ref="languageSelect"
                            v-bind:options="languages"
                          ></vuestic-multi-select> -->
                        </div>
                      </div>

                      <!--     <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="pacijentbezsimptoma"
                  type="checkbox"
                  v-model="patient.symptoms.pacijentbezsimptoma"
                  
                >
                <label class="form-check-label" for="pacijentbezsimptoma">
                  <span style="color: #4ae387;" class="abc-label-text">{{'pacijent bez simptoma'}}</span>
                </label>
              </div>





               <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="povišenatjelesnatemperatura"
                  type="checkbox"
                  v-model="patient.symptoms.povišenatjelesnatemperatura"
                  
                  
                >
                <label class="form-check-label" for="povišenatjelesnatemperatura">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'povišena tjelesna temperatura'}}</span>
                </label>
              </div>



               <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="suhikašalj"
                  type="checkbox"
                  v-model="patient.symptoms.suhikašalj"
                
                >
                <label class="form-check-label" for="suhikašalj">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'suhi kašalj'}}</span>
                </label>
              </div>



               <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="umor"
                  type="checkbox"
                  v-model="patient.symptoms.umor"
                
                >
                <label class="form-check-label" for="umor">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'umor'}}</span>
                </label>
              </div>



               <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="bolovi"
                  type="checkbox"
                  v-model="patient.symptoms.bolovi"
                
                >
                <label class="form-check-label" for="bolovi">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'bolovi'}}</span>
                </label>
              </div>

<div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="grlobolja"
                  type="checkbox"
                  v-model="patient.symptoms.grlobolja"
                
                >
                <label class="form-check-label" for="grlobolja">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'grlobolja'}}</span>
                </label>
              </div>

              <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="proljev"
                  type="checkbox"
                  v-model="patient.symptoms.proljev"
                
                >
                <label class="form-check-label" for="proljev">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'proljev'}}</span>
                </label>
              </div>


                <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="gubitakosjetaokusailimirisa"
                  type="checkbox"
                  v-model="patient.symptoms.gubitakosjetaokusailimirisa"
                
                >
                <label class="form-check-label" for="gubitakosjetaokusailimirisa">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'gubitak osjeta okusa ili mirisa'}}</span>
                </label>
              </div>


              <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="otežanodisanjeiligubitakdaha"
                  type="checkbox"
                  v-model="patient.symptoms.otežanodisanjeiligubitakdaha"
                
                >
                <label class="form-check-label" for="otežanodisanjeiligubitakdaha">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'otežano disanje ili gubitak daha'}}</span>
                </label>
              </div>

              <div v-show="patient.purpose != 'Putovanje'" class="form-check abc-checkbox abc-checkbox-primary">
                <input
                :disabled="pacijentbezsimptoma"
                  class="form-check-input"
                  id="bolilipritisakuprsima"
                  type="checkbox"
                  v-model="patient.symptoms.bolilipritisakuprsima"
                
                >
                <label class="form-check-label" for="bolilipritisakuprsima">
                  <span style="color: #e34a4a;" class="abc-label-text">{{'bol ili pritisak u prsima'}}</span>
                </label>
              </div>
 -->
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
                    :disabled="cancelDisabled"
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
                    @click="ok"
                    :disabled="
                      (pacijentbezsimptoma == false &&
                        patient.symptoms.povišenatjelesnatemperatura == false &&
                        patient.symptoms.suhikašalj == false &&
                        patient.symptoms.umor == false &&
                        patient.symptoms.bolovi == false &&
                        patient.symptoms.grlobolja == false &&
                        patient.symptoms.proljev == false &&
                        patient.symptoms.konjunktivitis == false &&
                        patient.symptoms.glavobolja == false &&
                        patient.symptoms.gubitakosjetaokusailimirisa == false &&
                        patient.symptoms
                          .osipilipromjenabojeprstijunarukamailinogama ==
                          false &&
                        patient.symptoms.otežanodisanjeiligubitakdaha ==
                          false &&
                        patient.symptoms.bolilipritisakuprsima == false &&
                        patient.symptoms.gubitaksposobnostigovorailikretanja ==
                          false) ||
                      (!Number.isInteger(dateofb) &&
                        dateofb.length != 8 &&
                        izbor === 'datr') ||
                      (!Number.isInteger(godiste) &&
                        godiste.length != 4 &&
                        izbor === 'god') ||
                      (patient.ime != undefined && patient.ime.trim() == '') ||
                      (patient.nalaz != undefined &&
                        patient.nalaz.trim() == '') ||
                      (patient.datum != undefined &&
                        patient.datum.trim() == '') ||
                      (patient.prezime != undefined &&
                        patient.prezime.trim() == '') ||
                      (patient.spol != undefined &&
                        patient.spol.trim() == '') ||
                      (patient.purpose != undefined &&
                        patient.purpose.trim() == '') ||
                      (patient.izdavanje != undefined &&
                        patient.izdavanje.trim() == '') ||
                      (patient.passport != undefined &&
                        patient.passport.trim() == '') ||
                      (patient.analysis != undefined &&
                        patient.analysis.trim() == '')
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
  name: "certificates-patient-edit",
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
    timestamp: {
      type: String,
      default: "",
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
    patient: {
      type: Object,
      default: () => ({
        _id: "",
        entry_disabled: false,
        izdavanje: "",
        duhan: "",
        dijabetes: "",
        symptoms: {
          pacijentbezsimptoma: true,
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
        purpose: "",

        protokol: "",
        nalaz: "",
        datum: "",

        analysis: "",
        referenca: "",
        note: "",
        passport: "",
        language: [""],
        telefon: "",
        email: "",
        adresa: "",
        created_at: null,
        updated_at: null,
        created_by: "",
        updated_by: "",
        jmbg: "",
        ime: "",
        prezime: "",
        spol: "",
        site: "",
        __v: 0,
      }),
    },
  },
  data() {
    return {
      show: false,
      duration: 500,
      izbor: "datr",
      jmbg: "",
      dateofb: "",
      datumrodjenja: "",
      godiste: "",
      languages: ["Bosanski jezik", "Engleski jezik", "Njemački jezik"],

      // Eurofarm Centar

      purpose: "",

      purposes: ["Potvrda o prebolovanoj infekciji"],
      analysis: "",
      analyses: ["CoV2 RT PCR", "CoV2 Antigen"],

      izdavanje: "",
      izdavanja: ["DANAS", "SUTRA"],

      ime: "",
      prezime: "",
      spol: "",
      spolovi: ["MUŠKI", "ŽENSKI"],
      adresa: "",
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
      pacijentbezsimptoma: true,
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
            this.cities.push(element);
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
    // pacijentbezsimptoma: function() {

    //   if(this.pacijentbezsimptoma == true){

    //     this.patient.symptoms.povišenatjelesnatemperatura = false
    //     this.patient.symptoms.suhikašalj = false
    //     this.patient.symptoms.umor = false
    //     this.patient.symptoms.bolovi = false
    //     this.patient.symptoms.grlobolja = false
    //     this.patient.symptoms.proljev = false
    //     this.patient.symptoms.konjunktivitis = false
    //     this.patient.symptoms.glavobolja = false
    //     this.patient.symptoms.gubitakosjetaokusailimirisa = false
    //     this.patient.symptoms.osipilipromjenabojeprstijunarukamailinogama = false
    //     this.patient.symptoms.otežanodisanjeiligubitakdaha = false
    //     this.patient.symptoms.bolilipritisakuprsima = false
    //     this.patient.symptoms.gubitaksposobnostigovorailikretanja = false

    //   }

    // },

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
            // Do nothing.
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
      this.jmbg = this.patient.jmbg;

      this.godiste = this.patient.jmbg.substring(4, 7);
      switch (this.godiste[0]) {
        case "9":
          this.godiste = "1" + this.godiste;
          break;
        case "0":
          this.godiste = "2" + this.godiste;
          break;
        default:
          break;
      }

      this.datumrodjenja =
        this.patient.jmbg.substring(0, 2) +
        "." +
        this.patient.jmbg.substring(2, 4) +
        "." +
        this.godiste;

      this.dateofb = this.patient.jmbg.substring(0, 4) + this.godiste;

      this.show = true;

      window.addEventListener("keyup", this.listenKeyUp);
    },
    close() {
      this.show = false;
      // this.pacijentbezsimptoma = false
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
      switch (this.izbor) {
        case "god":
          this.jmbg =
            "0000" +
            this.godiste.substring(this.godiste.length - 3) +
            this.patient.jmbg.substring(this.patient.jmbg.length - 6);

          break;
        case "datr":
          this.jmbg =
            this.dateofb.substring(0, 4) +
            this.dateofb.substring(this.dateofb.length - 3) +
            this.patient.jmbg.substring(this.patient.jmbg.length - 6);

          break;
        default:
          break;
      }

      // this.jmbg = this.patient.jmbg;
      this.ime = this.patient.ime;
      this.prezime = this.patient.prezime;
      this.spol = this.patient.spol;

      this.protokol = "ECL";
      this.nalaz = this.patient.nalaz;
      this.datum = this.patient.datum;
      this.passport = this.patient.passport;
      this.analysis = this.patient.analysis;
      this.adresa = this.patient.adresa;
      this.telefon = this.patient.telefon;
      this.email = this.patient.email;
      this.purpose = this.patient.purpose;
      this.izdavanje = this.patient.izdavanje;

      if (
        this.ime.trim() === "" ||
        this.nalaz.trim() === "" ||
        this.datum.trim() === "" ||
        this.prezime.trim() === "" ||
        this.spol.trim() === "" ||
        this.purpose.trim() === "" ||
        this.passport.trim() === "" ||
        this.analysis.trim() === ""
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
        // Insert HERE

        if (this.adresa.trim() === "") {
          this.adresa = "";
        }
        if (this.telefon.trim() === "") {
          this.telefon = "";
        }
        if (this.email.trim() === "") {
          this.email = "";
        }

        if (this.validateJMBG(this.jmbg)) {
          var item = true;

          this.isLoading = true;

          // console.log("Editing Patient data...");

          if (this.adresa.trim() === "") {
            this.adresa = "";
          }
          if (this.telefon.trim() === "") {
            this.telefon = "";
          }
          if (this.email.trim() === "") {
            this.email = "";
          }

          // this.patient.symptoms.pacijentbezsimptoma = this.pacijentbezsimptoma

          // console.log("Spašavam izmjene...");
          // console.log("Timestamp: " + this.timestamp);
          if (item) {
            // console.log('.post("certificates/detalji/update/');
            http
              .post("certificates/detalji/update/" + this.patient._id, {
                id: this.patient._id,
                timestamp: this.timestamp,
                jmbg: this.jmbg.trim(),
                ime: this.ime.toUpperCase().trim(),
                prezime: this.prezime.toUpperCase().trim(),
                // entry_disabled
                spol: this.spol.toUpperCase().trim(),
                duhan: "",
                dijabetes: "",
                symptoms: this.patient.symptoms,

                // Eurofarm Centar

                purpose: this.purpose,
                analysis: this.analysis,
                izdavanje: this.izdavanje,

                nalaz: this.nalaz,
                datum: this.datum,

                note: this.patient.note,
                passport: this.patient.passport.trim(),
                language: this.patient.language,
                // lokacija = pacijent.lokacija
                telefon: this.telefon.trim(),
                email: this.email.trim(),
                adresa: this.adresa.trim(),
                site: this.$store.state.site,
                token: this.$store.state.token,
              })
              .then((res) => {
                if (res.data.success) {
                  this.isLoading = false;
                  bus.$emit("SetCert", this.patient);
                  this.show = false;
                  window.removeEventListener("keyup", this.listenKeyUp);
                } else {
                  this.isLoading = false;
                }
              });
          }
        } else {
          this.jmbg = this.patient.jmbg;

          if (this.patient.jmbg.slice(0, 4) === "0000") {
            this.godiste = "";

            this.godiste = this.patient.jmbg.substring(4, 7);
            switch (this.godiste[0]) {
              case "9":
                this.godiste = "1" + this.godiste;
                break;
              case "0":
                this.godiste = "2" + this.godiste;
                break;
              default:
                break;
            }

            this.izbor = "god";
          } else {
            this.godiste = "";

            this.godiste = this.patient.jmbg.substring(4, 7);
            switch (this.godiste[0]) {
              case "9":
                this.godiste = "1" + this.godiste;
                break;
              case "0":
                this.godiste = "2" + this.godiste;
                break;
              default:
                break;
            }

            this.datumrodjenja =
              this.patient.jmbg.substring(0, 2) +
              "." +
              this.patient.jmbg.substring(2, 4) +
              "." +
              this.godiste;

            this.dateofb = this.patient.jmbg.substring(0, 4) + this.godiste;

            this.izbor = "datr";
          }
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

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
