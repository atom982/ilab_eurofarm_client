<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-data-table-control-edit
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
        ></vuestic-data-table-control-edit>

        <control-delete-modal
          :show.sync="show"
          ref="staticModalControlDelete"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title" v-if="$store.state.access.level < 1">
            {{ control.naziv }}
            <span style="color: #e34a4a;">({{ control.lot }})</span>
          </div>

          <div v-if="$store.state.access.level < 1">
            <h5 style="color: #e34a4a;">
              {{ "Jeste li sigurni da želite obrisati zapis?" }}
            </h5>
          </div>

          <div slot="title" v-if="$store.state.access.level > 0">
            {{ "" }}
            <span style="color: #e34a4a;">{{ "401: Not Authorized" }}</span>
          </div>
          <div v-if="$store.state.access.level > 0">
            <h5>{{ "Nemate odgovarajuće privilegije." }}</h5>
          </div>
        </control-delete-modal>

        <vuestic-modal-control-aparati
          :show.sync="show"
          ref="staticModalControlAparati"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">
            {{ control.naziv }}
            <span style="color: #e34a4a;">({{ control.lot }})</span>
          </div>
          <div>
            <vuestic-accordion-control-aparati>
              <vuestic-collapse-control-aparati
                v-for="element in aparati"
                :key="element._id"
                :analyser="element"
              >
                <span slot="header">
                  {{ element.ime + ", " + element.make }}
                </span>
                <div slot="body">
                  <div class="va-row"></div>
                </div>
              </vuestic-collapse-control-aparati>
            </vuestic-accordion-control-aparati>
          </div>
        </vuestic-modal-control-aparati>

        <control-edit-modal
          :show.sync="show"
          :large="true"
          ref="staticModalEditControl"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">
            {{ control.naziv }}
            <span style="color: #e34a4a;">({{ control.lot }})</span>
          </div>
          <div>
            <fieldset>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        onpaste="return false;"
                        autocomplete="off"
                        id="esifra"
                        v-model="control.sifra"
                        required
                      />
                      <label class="control-label" for="simple-input">{{
                        "Šifra kontrole"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input id="emaker" v-model="control.maker" required />

                      <label class="control-label" for="simple-input">{{
                        "Proizvođač kontrole"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="enaziv" v-model="control.naziv" required />

                      <label class="control-label" for="simple-input">{{
                        "Naziv kontrole"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input id="elot" v-model="control.lot" required />

                      <label class="control-label" for="simple-input">{{
                        "LOT kontrole"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="col-md-1"></div>

                <div class="col-md-5">
                  <div class="form-group">
                    <div class="input-group">
                      <vuestic-date-picker
                        id="edate-picker-basic"
                        :config="{ inline: true }"
                        v-model="control.rok"
                      />
                      <label class="control-label" for="date-picker-basic">{{
                        "Rok važenja kontrole"
                      }}</label>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </control-edit-modal>

        <control-ref-modal
          :show.sync="show"
          ref="staticModalControlReference"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">
            {{ control.naziv }}
            <span style="color: #e34a4a;">({{ control.lot }})</span>
          </div>

          <div>
            <div class="row">
              <div class="col-md-3">
                <br />

                <button
                  v-for="(element, index) in refAparatiData"
                  :key="index"
                  title=" "
                  :class="{
                    'btn btn-primary btn-micro':
                      element.ime + ', ' + element.make === refSelectedAnalyser,
                    'btn btn-warning btn-micro':
                      element.ime + ', ' + element.make != refSelectedAnalyser,
                  }"
                  @click="SelectAnalyser(element)"
                >
                  <span class="glyphicon glyphicon-object-align-bottom"></span>
                  {{ element.ime }}
                </button>
              </div>

              <div class="col-md-9">
                <div class="table-responsive">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="20%">{{ "Analiza" }}</td>
                        <td width="20%">{{ "Jedinica" }}</td>
                        <td width="20%">{{ "Interp" }}</td>
                        <td width="20%">{{ "dRef" }}</td>
                        <td width="20%">{{ "gRef" }}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(data, index) in refAnalize"
                        :key="index"
                        v-show="refSelectedAnalyserID === data.aparat"
                      >
                        <td>{{ data.naziv }}</td>

                        <td>
                          <select class="table-info" v-model="data.jedinica">
                            <option
                              v-for="(option, i) in jedinice"
                              v-bind:value="option"
                              :key="i"
                              >{{ option }}</option
                            >
                          </select>
                        </td>

                        <td>
                          <select
                            class="table-info"
                            v-model="data.interpretacija"
                          >
                            <option
                              v-for="(option, i) in interpretacije"
                              v-bind:value="option"
                              :key="i"
                              >{{ option }}</option
                            >
                          </select>
                        </td>

                        <td>
                          <input
                            :class="{ numero: isNaN(data.refd) }"
                            style="
                              width: 40px;
                              font-size: 12px;
                              line-height: 7px;
                            "
                            v-model="data.refd"
                          />
                        </td>

                        <td>
                          <input
                            :class="{ numero: isNaN(data.refg) }"
                            style="
                              width: 40px;
                              font-size: 12px;
                              line-height: 7px;
                            "
                            v-model="data.refg"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </control-ref-modal>
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
import Vue from "vue";
import BadgeColumn from "./Table/BadgeColumn.vue";
import LocalData from "./Table/edit-datatable/data/local-data";
import FieldsDef from "./Table/edit-datatable/fields-definition";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { apiUrlControlEdit } from "../../../../config/config.js";
import { mapGetters, mapActions } from "vuex";
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";

Vue.component("badge-column", BadgeColumn);

export default {
  data() {
    return {
      show: false,
      control: {},
      aparati: [],
      apiUrl: apiUrlControlEdit,
      apiMode: true,
      sortFunctions: FieldsDef.sortFunctions,
      tableData: LocalData.data,
      onEachSide: 1,
      tableFields: FieldsDef.tableFields,
      paginationPath: "",
      itemsPerPage: [
        {
          value: 5,
        },
        {
          value: 6,
        },
      ],
      interpretacije: ["-", "<", "≤", ">", "≥", "none", "neg"],
      jedinice: [],
      token: this.$store.state.token,
      site: this.$store.state.site,
      refAparatiData: [],
      refSelectedAnalyser: "",
      refSelectedAnalyserID: "",
      refAnalize: [],

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

  name: "control-edit",

  components: {
    Loading,
  },

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"]),
  },

  mounted() {
    // Settings
    http
      .get(
        "assays/settings?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        this.jedinice = [];
        this.jedinice = res.data.settings[0].jedinice;
      });

    bus.$on("Uređivanje", (data) => {
      // console.log("Inside Edit.vue: " + data);
    });

    bus.$on("KontroleAkcija", (data) => {
      this.control = {};
      this.control = data.control;
      this.$refs.staticModalControlDelete.open();
    });

    bus.$on("ControlDelete", () => {
      http
        .post("kontrole/definicija/delete", {
          _id: this.control._id,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          if (res.data.success) {
            bus.$emit("ControlDeleteModalHide");
            bus.$emit("UređivanjeRefresh");
          }
        });
    });

    bus.$on("KontroleAnalizator", (data) => {
      this.control = {};
      this.control = data.control;
      this.aparati = [];
      this.aparati = data.analizatorDATA;
      this.$refs.staticModalControlAparati.open();
    });

    bus.$on("KontroleUredi", (data) => {
      this.control = {};
      this.control = data.control;
      this.$refs.staticModalEditControl.open();
    });

    bus.$on("KontroleUrediConfirm", () => {
      http
        .post("kontrole/definicija/edit", {
          _id: this.control._id,
          control: this.control,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          if (res.data.success) {
            bus.$emit("ControlEditModalHide");
            bus.$emit("UređivanjeRefresh");
          }
        });
    });
    /*     





















    */
    bus.$on("KontroleReference", (data) => {
      this.control = {};
      this.control = data.control;
      this.refAparatiData = [];
      this.refSelectedAnalyser = "";
      this.refSelectedAnalyserID = "";
      this.refAnalize = [];

      this.isLoading = true;

      http
        .post("kontrole/definicija/get", {
          control: this.control,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data.references)

            this.refSelectedAnalyser =
              res.data.references[0].aparat.ime +
              ", " +
              res.data.references[0].aparat.make;
            this.refSelectedAnalyserID = res.data.references[0].aparat._id;

            res.data.references.forEach((element) => {
              this.refAparatiData.push(element.aparat);

              element.reference.forEach((ref) => {
                this.refAnalize.push({
                  aparat: element.aparat._id,
                  naziv: ref.labassay.naziv,
                  labassay: ref.labassay._id,
                  refd: ref.refd,
                  refg: ref.refg,
                  interpretacija: ref.interpretacija,
                  jedinica: ref.jedinica,
                });
              });
            });
            this.isLoading = false;

            this.$refs.staticModalControlReference.open();
          }
        });
    });

    bus.$on("ControlReferencesModalConfirm", () => {
      // console.log(this.refAnalize);

      http
        .post("kontrole/definicija/reference", {
          _id: this.control._id,
          control: this.control,
          reference: this.refAnalize,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          if (res.data.success) {
            bus.$emit("ControlReferencesModalHide");
            bus.$emit("UređivanjeRefresh");
          }
        });
    });
  },
  beforeDestroy() {
    bus.$off("Uređivanje");
    bus.$off("KontroleAkcija");
    bus.$off("ControlDelete");
    bus.$off("KontroleAnalizator");
    bus.$off("KontroleUredi");
    bus.$off("KontroleUrediConfirm");
    bus.$off("KontroleReference");
    bus.$off("ControlReferencesModalConfirm");
  },
  watch: {},

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

    SelectAnalyser(data) {
      // console.log(data)
      this.refSelectedAnalyser = data.ime + ", " + data.make;
      this.refSelectedAnalyserID = data._id;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../../sass/variables";
@import "../../../sass/toasts";

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

.circle {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  display: inline-block;
}
</style>
