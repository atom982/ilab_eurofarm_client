<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <!-- <vuestic-widget :headerText="'Referentne vrijednosti analiza'"> -->
        <vuestic-data-table-anaassays
          :apiMode="apiMode"
          :apiUrl="apiUrl"
          :data="tableData"
          :tableFields="tableFields"
          :itemsPerPage="itemsPerPage"
          :onEachSide="onEachSide"
          :sortFunctions="sortFunctions"
          :paginationPath="paginationPath"
          :token="token"
          :site="site"
        ></vuestic-data-table-anaassays>
        <!-- </vuestic-widget> -->

        <anaassay-delete
          :show.sync="show_delete"
          ref="staticModalAnaAssayDelete"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title" v-if="$store.state.access.level < 1">
            {{anaassay.test.naziv}}
            <span style="color: #e34a4a;">({{anaassay.test.analit}})</span>
          </div>

          <div v-if="$store.state.access.level < 1">
            <h5 style="color: #e34a4a;">{{ 'Jeste li sigurni da želite obrisati zapis?'}}</h5>
          </div>

          <div slot="title" v-if="$store.state.access.level > 0">
            {{''}}
            <span style="color: #e34a4a;">{{'401: Not Authorized'}}</span>
          </div>
          <div v-if="$store.state.access.level > 0">
            <h5>{{'Nemate odgovarajuće privilegije.'}}</h5>
          </div>
        </anaassay-delete>

        <anaassay-edit-modal
          :show.sync="show_edit"
          :large="true"
          ref="staticModalEditAnaAssay"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">
            {{anaassay.test.naziv}}
            <span style="color: #e34a4a;">({{anaassay.test.analit}})</span>
          </div>
          <div>
            <fieldset>
              <div class="row">
                <div class="col-md-3"></div>
                <div class="col-md-6">
                  <!-- Kod -->
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="anaassay.kod"
                        name="input-icon-left"
                        required
                        :disabled="$store.state.access.level > 0"
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label
                        v-if="$store.state.access.level > 0"
                        class="control-label"
                        for="input-icon-left"
                      >{{anaassay.kod}}</label>
                      <label
                        v-if="$store.state.access.level < 1"
                        class="control-label"
                        for="input-icon-left"
                      >{{'Kod analize'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <vuestic-simple-select
                    label="Analizator"
                    v-model="anaassay.aparat.ime"
                    name="analizator"
                    :required="true"
                    title=" "
                    ref="analizatorSelect"
                    v-bind:options="aparati"
                  ></vuestic-simple-select>

                  <vuestic-simple-select
                    v-if="!anaassay.test.multi"
                    label="Zaokruživanje"
                    v-model="anaassay.float"
                    name="country"
                    :required="true"
                    ref="hsCountrySelect"
                    v-bind:options="floats"
                  ></vuestic-simple-select>

                  <div class="form-group" v-if="anaassay.test.multi">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        name="input-icon-left"
                        required
                        disabled
                      />
                      <label class="control-label" for="input-icon-left">{{'Zaokruživanje'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        id="input-icon-left"
                        title=" "
                        v-model="anaassay.metoda"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Metoda'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </anaassay-edit-modal>

        <anaassay-ref-single
          :show.sync="show_single"
          ref="staticModalAnaAssayRefSingle"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">
            {{anaassay.test.naziv}}
            <span style="color: #e34a4a;">({{anaassay.test.analit}})</span>
          </div>

          <div>
            <div class="row">
              <div class="col-md-2">
                <br />
                <button
                  title=" "
                  class="btn btn-info btn-micro"
                  @click="AddRefSingle('DJECA', 'MUŠKI', '0', '18')"
                >
                  <span class="fa fa-mars"></span>
                  {{'DJECA'}}
                </button>
                <button
                  title=" "
                  class="btn btn-info btn-micro"
                  @click="AddRefSingle('ODRASLI', 'MUŠKI', '19', '130')"
                >
                  <span class="fa fa-mars"></span>
                  {{'ODRASLI'}}
                </button>
                <button
                  title=" "
                  class="btn btn-violet btn-micro"
                  @click="AddRefSingle('DJECA', 'ŽENSKI', '0', '18')"
                >
                  <span class="fa fa-venus"></span>
                  {{'DJECA'}}
                </button>
                <button
                  title=" "
                  class="btn btn-violet btn-micro"
                  @click="AddRefSingle('ODRASLI', 'ŽENSKI', '19', '130')"
                >
                  <span class="fa fa-venus"></span>
                  {{'ODRASLI'}}
                </button>
              </div>

              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-9" v-if="anaassay.reference.length && reload_single">
                    <div v-if="radioModel === null" class="form-group">
                      <div class="input-group">
                        <textarea type="text" id="simple-textarea" disabled></textarea>
                        <label
                          class="control-label"
                          for="simple-textarea"
                        >{{'Proširena interpretacija'}}</label>
                        <i class="bar"></i>
                      </div>
                    </div>

                    <div
                      v-for="(element, index) in anaassay.reference"
                      :key="index"
                      v-show="radioModel === element._id && element.interp === 'spec'"
                      class="form-group with-icon-left"
                    >
                      <div class="input-group">
                        <textarea
                          v-model="element.extend"
                          type="text"
                          id="simple-textarea"
                          required
                        ></textarea>
                        <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                        <label
                          class="control-label"
                          for="simple-textarea"
                        >{{'Specifična interpretacija rezultata'}}</label>
                        <i class="bar"></i>
                      </div>
                    </div>

                    <div
                      v-for="(element, index) in anaassay.reference"
                      :key="index"
                      v-show="radioModel === element._id && element.interp != 'spec'"
                      class="form-group with-icon-left"
                    >
                      <div class="input-group">
                        <textarea
                          v-model="element.extend"
                          type="text"
                          id="simple-textarea"
                          required
                        ></textarea>
                        <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                        <label
                          class="control-label"
                          for="simple-textarea"
                        >{{'Proširena interpretacija'}}</label>
                        <i class="bar"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table
                    v-if="anaassay.reference.length && reload_single"
                    class="table table-striped first-td-padding"
                  >
                    <thead>
                      <tr>
                        <td></td>
                        <td>{{"grupa"}}</td>
                        <td>{{"dref"}}</td>
                        <td>{{"gref"}}</td>
                        <td align="center">{{"jedinica"}}</td>
                        <td>{{"interp"}}</td>
                        <td>{{"ddob"}}</td>
                        <td>{{"gdob"}}</td>
                        <td>{{"spol"}}</td>
                        <td v-if="$store.state.access.level < 1">{{"akcija"}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(element, index) in anaassay.reference" :key="index">
                        <td>
                          <vuestic-radio-button
                            :label="''"
                            :id="element._id"
                            :value="element._id"
                            :name="'radio'"
                            v-model="radioModel"
                          />
                        </td>
                        <td>
                          <select class="table-info" v-model="element.grupa">
                            <option
                              v-for="(option, i) in grupe"
                              v-bind:value="option"
                              :key="i"
                            >{{ option }}</option>
                          </select>
                        </td>
                        <td>
                          <input
                            :class="{'numero': isNaN(element.refd)}"
                            style="width:40px;font-size: 12px; line-height: 7px;"
                            v-model="element.refd"
                          />
                        </td>
                        <!-- <td
                          :class="{'numero': isNaN(element.refd)}"
                          id="refd"
                          :contenteditable="true"
                          @keyup="KeyUp($event, element)"
                        >
                          <strong>{{element.refd}}</strong>
                        </td>-->
                        <td>
                          <input
                            :class="{'numero': isNaN(element.refg)}"
                            style="width:40px;font-size: 12px; line-height: 7px;"
                            v-model="element.refg"
                          />
                        </td>
                        <!-- <td
                          :class="{'numero': isNaN(element.refg)}"
                          id="refg"
                          :contenteditable="true"
                          @keyup="KeyUp($event, element)"
                        >
                          <strong>{{element.refg}}</strong>
                        </td>-->
                        <td align="center">{{anaassay.test.jedinica}}</td>
                        <td v-if="$store.state.access.level < 1">
                          <select class="table-info" v-model="element.interp">
                            <option
                              v-for="(option, i) in interpretacije"
                              v-bind:value="option"
                              :key="i"
                            >{{ option }}</option>
                          </select>
                        </td>
                        <td v-if="$store.state.access.level > 0">{{element.interp}}</td>
                        <td>
                          <input
                            :class="{'numero': isNaN(element.dDob)}"
                            style="width:40px;font-size: 12px; line-height: 7px;"
                            v-model="element.dDob"
                          />
                        </td>
                        <!-- <td
                          :class="{'numero': isNaN(element.dDob)}"
                          id="dDob"
                          :contenteditable="true"
                          @keyup="KeyUp($event, element)"
                        >{{element.dDob}}</td>-->
                        <td>
                          <input
                            :class="{'numero': isNaN(element.gDob)}"
                            style="width:40px;font-size: 12px; line-height: 7px;"
                            v-model="element.gDob"
                          />
                        </td>
                        <!-- <td
                          :class="{'numero': isNaN(element.gDob)}"
                          id="gDob"
                          :contenteditable="true"
                          @keyup="KeyUp($event, element)"
                        >{{element.gDob}}</td>-->
                        <td>
                          <select class="table-info" v-model="element.spol">
                            <option
                              v-for="(option, i) in spolovi"
                              v-bind:value="option"
                              :key="i"
                            >{{ option }}</option>
                          </select>
                        </td>
                        <td v-if="$store.state.access.level < 1">
                          <button
                            title=" "
                            v-bind:id="element._id"
                            class="btn btn-danger btn-micro"
                            @dblclick.prevent="DeleteReference(element)"
                          >
                            <span v-bind:id="element._id" class="fa fa-trash-o"></span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </anaassay-ref-single>

        <anaassay-ref-multi
          :show.sync="show_multi"
          ref="staticModalAnaAssayRefMulti"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">
            {{anaassay.test.naziv}}
            <span style="color: #e34a4a;">({{anaassay.test.analit}})</span>
          </div>

          <div>
            <div class="row">
              <div class="col-md-2">
                <br />

                <button
                  title=" "
                  class="btn btn-info btn-micro"
                  @click="AddRefMulti('DJECA', 'MUŠKI', '0', '18')"
                >
                  <span class="fa fa-mars"></span>
                  {{'DJECA'}}
                </button>
                <button
                  title=" "
                  class="btn btn-info btn-micro"
                  @click="AddRefMulti('ODRASLI', 'MUŠKI', '19', '130')"
                >
                  <span class="fa fa-mars"></span>
                  {{'ODRASLI'}}
                </button>
                <button
                  title=" "
                  class="btn btn-violet btn-micro"
                  @click="AddRefMulti('DJECA', 'ŽENSKI', '0', '18')"
                >
                  <span class="fa fa-venus"></span>
                  {{'DJECA'}}
                </button>
                <button
                  title=" "
                  class="btn btn-violet btn-micro"
                  @click="AddRefMulti('ODRASLI', 'ŽENSKI', '19', '130')"
                >
                  <span class="fa fa-venus"></span>
                  {{'ODRASLI'}}
                </button>
              </div>

              <div class="col-md-10">
                <div class="col-md-4">
                  <vuestic-simple-select
                    label="Parametar"
                    v-model="parametar_naziv"
                    name="analit"
                    :required="true"
                    title=" "
                    ref="analitSelect"
                    v-bind:options="analiti"
                  ></vuestic-simple-select>
                </div>

                <div class="table-responsive">
                  <table
                    v-if="anaassay.reference.length && reload_multi && render_multi"
                    class="table table-striped first-td-padding"
                  >
                    <thead>
                      <tr>
                        <td>{{"grupa"}}</td>
                        <td>{{"dref"}}</td>
                        <td>{{"gref"}}</td>
                        <td align="center">{{"jedinica"}}</td>
                        <td>{{"interp"}}</td>
                        <td>{{"ddob"}}</td>
                        <td>{{"gdob"}}</td>
                        <td>{{"spol"}}</td>
                        <td v-if="$store.state.access.level < 1">{{"akcija"}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(element, index) in anaassay.reference"
                        :key="index"
                        v-show="element.analit === parametar_id"
                      >
                        <td>
                          <select class="table-info" v-model="element.grupa">
                            <option
                              v-for="(option, i) in grupe"
                              v-bind:value="option"
                              :key="i"
                            >{{ option }}</option>
                          </select>
                        </td>
                        <td>
                          <input
                            :class="{'numero': isNaN(element.refd)}"
                            style="width:40px;font-size: 12px; line-height: 7px;"
                            v-model="element.refd"
                          />
                        </td>
                        <!--  <td
                          :class="{'numero': isNaN(element.refd)}"
                          id="refd"
                          :contenteditable="true"
                          @keyup="KeyUp($event, element)"
                        >
                          <strong>{{element.refd}}</strong>
                        </td>-->
                        <td>
                          <input
                            :class="{'numero': isNaN(element.refg)}"
                            style="width:40px;font-size: 12px; line-height: 7px;"
                            v-model="element.refg"
                          />
                        </td>
                        <!-- <td
                          :class="{'numero': isNaN(element.refg)}"
                          id="refg"
                          :contenteditable="true"
                          @keyup="KeyUp($event, element)"
                        >
                          <strong>{{element.refg}}</strong>
                        </td>-->
                        <td align="center">{{unit}}</td>
                        <td v-if="$store.state.access.level < 1">
                          <select class="table-info" v-model="element.interp">
                            <option
                              v-for="(option, i) in interpretacije"
                              v-bind:value="option"
                              :key="i"
                            >{{ option }}</option>
                          </select>
                        </td>
                        <td v-if="$store.state.access.level > 0">{{element.interp}}</td>
                        <td>
                          <input
                            :class="{'numero': isNaN(element.dDob)}"
                            style="width:40px;font-size: 12px; line-height: 7px;"
                            v-model="element.dDob"
                          />
                        </td>
                        <!-- <td
                          :class="{'numero': isNaN(element.dDob)}"
                          id="dDob"
                          :contenteditable="true"
                          @keyup="KeyUp($event, element)"
                        >{{element.dDob}}</td>-->
                        <td>
                          <input
                            :class="{'numero': isNaN(element.gDob)}"
                            style="width:40px;font-size: 12px; line-height: 7px;"
                            v-model="element.gDob"
                          />
                        </td>
                        <!--  <td
                          :class="{'numero': isNaN(element.gDob)}"
                          id="gDob"
                          :contenteditable="true"
                          @keyup="KeyUp($event, element)"
                        >{{element.gDob}}</td>-->
                        <td>
                          <select class="table-info" v-model="element.spol">
                            <option
                              v-for="(option, i) in spolovi"
                              v-bind:value="option"
                              :key="i"
                            >{{ option }}</option>
                          </select>
                        </td>
                        <td v-if="$store.state.access.level < 1">
                          <button
                            title=" "
                            v-bind:id="element._id"
                            class="btn btn-danger btn-micro"
                            @dblclick.prevent="DeleteReference(element)"
                          >
                            <span v-bind:id="element._id" class="fa fa-trash-o"></span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </anaassay-ref-multi>
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
          <button v-if="false" @click.prevent="Test">{{'Loading...'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import LocalData from "./vuestic-datatable/data/local-data";
import FieldsDef from "./fields-definition";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import { apiUrlAnaAssays } from "../../../config/config.js";
import { mapGetters, mapActions } from "vuex";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

Vue.component("badge-column", BadgeColumn);

export default {
  data() {
    return {
      show_edit: true,
      show_delete: false,
      show_single: false,
      show_multi: false,
      radioModel: null,
      apiUrl: apiUrlAnaAssays,
      apiMode: true,
      sortFunctions: FieldsDef.sortFunctions,
      tableData: LocalData.data,
      onEachSide: 1,
      tableFields: FieldsDef.tableFields,
      paginationPath: "",
      itemsPerPage: [
        {
          value: 5
        },
        {
          value: 6
        }
      ],
      token: this.$store.state.token,
      site: this.$store.state.site,
      reload_single: true,
      reload_multi: true,
      anaassay: {},
      analizatori: [],
      aparati: [],
      interpretacije: [
        "none",
        "A",
        "ogtt",
        "insul",
        "less",
        "lesseq",
        "lesspl",
        "infekc",
        "grt",
        "grtpl",
        "grtepl",
        "grtno",
        "grte",
        "neg",
        "nema",
        "urbl",
        "reakt",
        "e0x",
        "e02",
        "e04",
        "e05",
        "e07",
        "e08",
        "norm",
        "norma",
        "ured",
        "plus",
        "prisutno",
        "gljivice",
        "leuer",
        "morf",
        "titar",
        "tsh",
        "trag",
        "trg",
        "hol",
        "hdl",
        "ldl",
        "fpsa",
        "sediment",
        "bistar",
        "boja",
        "bojasp",
        "nesto",
        "exists",
        "blst",
        "leu",
        "spec"
      ],
      spolovi: ["MUŠKI", "ŽENSKI"],
      grupe: ["DJECA", "ODRASLI"],
      extended: "",
      extended_multi: "",
      multi: [],
      analiti: [],
      parametar_naziv: "",
      render_multi: false,
      parametar_id: "",
      unit: "",
      floats: ["", "0", "1", "2", "3", "4", "5"],

      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },

  name: "analize",

  components: {
    Loading
  },

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"])
  },

  created() {
    this.anaassay.aparat = {};
    this.anaassay.test = {};
    this.anaassay.reference = {};
    this.anaassay.aparat.ime = "";
    this.anaassay.test.naziv = "";
    this.anaassay.test.analit = "";

    http
      .get(
        "postavke/aparat/mount/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.success) {
          res.data.obj.aparat.forEach(element => {
            this.aparati.push(element.ime);
            this.analizatori.push(element);
          });

          this.aparati = this.aparati.sort(function(a, b) {
            return a.localeCompare(b, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        }
      });

    http
      .post("postavke/aptest/listall", {
        email: this.$store.state.userId,
        token: this.$store.state.token,
        site: this.$store.state.site
      })
      .then(res => {
        if (res.data.success) {
          res.data.aptests.forEach(element => {
            if (element.test.multi) {
              this.multi.push(element);
            }
            element.reference.forEach(ref => {
              if (
                !this.interpretacije.filter(interp => interp === ref.interp)
                  .length > 0
              ) {
                this.interpretacije.push(ref.interp);
              }
              if (!this.grupe.filter(grupa => grupa === ref.grupa).length > 0) {
                this.grupe.push(ref.grupa);
              }
            });
          });

          this.interpretacije = this.interpretacije.sort(function(a, b) {
            return a.localeCompare(b, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });

          this.grupe = this.grupe.sort(function(a, b) {
            return a.localeCompare(b, undefined, {
              numeric: true,
              sensitivity: "base"
            });
          });
        }
      });
  },

  mounted() {
    bus.$on("AnaAssayAkcija", data => {
      this.anaassay = data.anaassay;
      this.show_delete = true;
      this.$refs.staticModalAnaAssayDelete.open();
    });

    bus.$on("AnaAssayDelete", () => {
      this.Delete();
    });

    bus.$on("AnaAssayUredi", data => {
      this.anaassay = data.anaassay;
      this.show_edit = true;
      this.$refs.staticModalEditAnaAssay.open();
    });

    bus.$on("AnaAssayCancel", () => {
      bus.$emit("AnaAssayRefresh");
      this.radioModel = null;
    });

    bus.$on("AnaAssayEdit", () => {
      this.Edit(this.anaassay);
    });

    bus.$on("AnaAssayReference", data => {
      this.anaassay = data.anaassay;

      if (this.anaassay.test.multi) {
        if (this.anaassay.test.multiparam.length) {
          this.isLoading = true;
          http
            .post("postavke/aptest/listall", {
              email: this.$store.state.userId,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                this.multi = [];
                res.data.aptests.forEach(element => {
                  if (element.test.multi) {
                    this.multi.push(element);
                  }
                });

                this.parametar_naziv = this.anaassay.test.multiparam[0].opis;
                this.unit = this.anaassay.test.multiparam[0].jedinica;
                this.parametar_id = this.anaassay.test.multiparam[0]._id;

                this.analiti = [];

                this.multi.forEach(element => {
                  if (element._id === this.anaassay._id) {
                    element.test.multiparam.forEach(param => {
                      this.analiti.push(param.opis);
                    });
                  }
                });

                this.show_multi = true;
                this.isLoading = false;
                this.$refs.staticModalAnaAssayRefMulti.open();
              }
            });
        } else {
          // console.warn("Analiti nisu definisani.");
        }
      } else if (!this.anaassay.test.multi) {
        if (this.anaassay.reference.length) {
          this.extended = this.anaassay.reference[0].extend;
        }
        this.show_single = true;
        this.$refs.staticModalAnaAssayRefSingle.open();
      }
    });

    bus.$on("AnaAssayEditRefSingle", () => {
      this.SaveReference(this.anaassay, "single");
    });

    bus.$on("AnaAssayEditRefMulti", () => {
      this.SaveReference(this.anaassay, "multi");
    });
  },
  beforeDestroy() {
    bus.$off("AnaAssayAkcija");
    bus.$off("AnaAssayDelete");
    bus.$off("AnaAssayUredi");
    bus.$off("AnaAssayCancel");
    bus.$off("AnaAssayEdit");
    bus.$off("AnaAssayReference");
    bus.$off("AnaAssayEditRefSingle");
    bus.$off("AnaAssayEditRefMulti");
  },
  watch: {
    parametar_naziv: function() {
      this.render_multi = false;
      if (this.anaassay.reference.length || !this.anaassay.reference.length) {
        this.anaassay.test.multiparam.forEach(param => {
          if (param.opis === this.parametar_naziv) {
            this.parametar_naziv = param.opis;
            this.parametar_id = param._id;
            this.unit = param.jedinica;
          }
        });
      }
      if (this.anaassay.reference.length) {
        this.anaassay.reference.forEach(param => {
          if (param.analit === this.parametar_id) {
            this.render_multi = true;
          }
        });
      }
    },
    radioModel: function() {
      // console.log(this.radioModel);
    }
  },

  beforeRouteLeave(to, from, next) {
    this.toggleSidebar(true);
    next();
  },

  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),

    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Delete() {
      http
        .post("postavke/aptest/delete", {
          _id: this.anaassay._id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            bus.$emit("AnaAssayHide");
            bus.$emit("AnaAssayRefresh");
          }
        });
    },
    Edit(anaassay) {
      var analizator = "";
      var manual = true;
      var item = true;

      if (anaassay.kod.trim() === "" || anaassay.metoda.trim() === "") {
        item = false;
        bus.$emit("AnaAssayRefresh");
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

      if (item) {
        this.analizatori.forEach(element => {
          if (element.ime == anaassay.aparat.ime) {
            analizator = element._id;
            manual = element.manual;
          }
        });

        http
          .post("postavke/anatest/edit", {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site,
            _id: anaassay._id,
            kod: anaassay.kod.trim(),
            metoda: anaassay.metoda.trim(),
            float: anaassay.float,
            test: anaassay.test,
            manual: manual,
            analizator: analizator
          })
          .then(res => {
            bus.$emit("AnaAssayHide");
            bus.$emit("AnaAssayRefresh");
            bus.$emit("LabAssayRefresh");
          });
      }
    },
    KeyUp(event, element) {
      if (event != undefined) {
        this.anaassay.reference.forEach(ref => {
          if (ref._id == element._id) {
            switch (event.target.id) {
              case "refd":
                ref.refd = event.target.innerText.trim();
                break;
              case "refg":
                ref.refg = event.target.innerText.trim();
                break;
              case "dDob":
                ref.dDob = event.target.innerText.trim();
                break;
              case "gDob":
                ref.gDob = event.target.innerText.trim();
                break;

              default:
                break;
            }
          }
        });
      }
    },
    DeleteReference(element) {
      this.reload_single = false;
      this.reload_multi = false;
      this.render_multi = false;
      http
        .post("postavke/aptest/referentne/delete", {
          email: this.$store.state.userId,
          test: this.anaassay._id,
          id: element._id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            bus.$emit("AnaAssayRefresh");
            this.anaassay.reference = res.data.referentne;
            this.reload_single = true;
            this.reload_multi = true;

            if (this.anaassay.reference.length) {
              this.anaassay.reference.forEach(param => {
                if (param.analit === this.parametar_id) {
                  this.render_multi = true;
                }
              });
            }
          }
        });
    },
    AddRefSingle(grupa, spol, ddob, gdob) {
      this.reload_single = false;
      http
        .post("postavke/aptest/referentne/save", {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          test: this.anaassay._id,
          refGrupa: grupa,
          dRef: "0",
          gRef: "0",
          dDob: ddob,
          gDob: gdob,
          spol: spol
        })
        .then(res => {
          if (res.data.success) {
            bus.$emit("AnaAssayRefresh");
            this.anaassay.reference = res.data.referentne;
            this.reload_single = true;
          }
        });
    },

    AddRefMulti(grupa, spol, ddob, gdob) {
      this.reload_multi = false;

      http
        .post("postavke/aptest/analit/referentne/multi", {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          analit: this.parametar_id,
          test: this.anaassay._id,
          refGrupa: grupa,
          dRef: "0",
          gRef: "0",
          dDob: ddob,
          gDob: gdob,
          spol: spol
        })

        .then(res => {
          if (res.data.success) {
            bus.$emit("AnaAssayRefresh");
            this.anaassay.reference = res.data.referentne;
            this.reload_multi = true;
            this.render_multi = true;
          }
        });
    },

    SaveReference(anaassay, type) {
      /* if (type === "single") {
        if (this.anaassay.reference.length) {
          this.anaassay.reference.forEach(element => {
            element.extend = this.extended;
          });
        }
      } */

      this.anaassay.reference.forEach(element => {
        if (element.interp != "spec") {
          element.extend = element.extend.replace(/(\r\n|\n|\r)/gm, " ");
        }
      });

      var item = true;
      anaassay.reference.forEach(element => {
        if (
          isNaN(element.dDob) ||
          isNaN(element.gDob) ||
          isNaN(element.refd) ||
          isNaN(element.refg)
        ) {
          item = false;
        }
      });

      if (item) {
        http
          .post("postavke/aptest/reference/save", {
            email: this.$store.state.userId,
            site: this.$store.state.site,
            token: this.$store.state.token,
            anaassay: anaassay._id,
            referentne: anaassay.reference
          })
          .then(res => {
            if (res.data.success) {
              bus.$emit("AnaAssayHide");
              bus.$emit("AnaAssayRefresh");

              this.radioModel = null;

              setTimeout(() => {
                this.extended = "";
              }, 300);
            }
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/toasts";

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
.numero {
  color: #e34a4a;
}
</style>
