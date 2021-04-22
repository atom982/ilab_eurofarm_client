<template>
  <div class="table-responsive">
    <div
      class="d-flex flex-md-row flex-column justify-content-md-between align-items-center"
    >
      <filter-bar @filter="onFilterSet"></filter-bar>
      <new-certificate @new-certificate="unosPacijenta"></new-certificate>
    </div>
    <vuetable
      ref="vuetable"
      :apiUrl="apiUrl"
      :apiMode="apiMode"
      :fields="tableFields"
      :data="tableData"
      :dataTotal="dataCount"
      :dataManager="dataManager"
      :css="css.table"
      data-path="data"
      v-bind:paginationPath="paginationPath"
      :appendParams="moreParams"
      :perPage="brStr"
      :datum="perPage"
      :token="token"
      :site="site"
      v-on:vuetable:cell-clicked="(...args) => this.prikaziDetalje([args])"
      @vuetable:pagination-data="onPaginationData"
    ></vuetable>

    <div class="d-flex justify-content-center mb-4">
      <vuetable-pagination
        ref="pagination"
        :css="css.pagination"
        :onEachSide="onEachSide"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>

    <!-- Modal -->
    <certificates-patient-entry
      :show.sync="show"
      v-bind:medium="true"
      ref="largeModalPatient"
      :okText="potvrdi"
      :cancelText="odustani"
    >
      <div slot="title">{{ "NOVA POTVRDA" }}</div>
      <div class="form-elements">
        <div class="row">
          <div class="col-md-12"></div>
        </div>
      </div>
    </certificates-patient-entry>

    <certificates-patient-edit
      :show.sync="show"
      v-bind:medium="true"
      ref="modalPatientEdit"
      :okText="potvrdi"
      :timestamp="timestamp"
      :cancelText="odustani"
      :patient="patient_data"
    >
      <div slot="title">
        {{ "UREĐIVANJE PODATAKA" }}
        <!-- <span style="color: #4ae387"
          >{{ patient_data.ime }} {{ patient_data.prezime }}</span
        > -->
      </div>
      <div class="form-elements">
        <div class="row">
          <div class="col-md-12"></div>
        </div>
      </div>
    </certificates-patient-edit>

    <vuestic-modal-error
      :show.sync="show"
      ref="staticModalNotAuthorizedEntry"
      cancelText="ZATVORI"
      okText="POTVRDI"
    >
      <div slot="title">
        {{ "" }}
        <span style="color: #e34a4a">{{ "401: Not Authorized" }}</span>
      </div>
      <div>
        <strong>{{ "Nemate odgovarajuće privilegije." }}</strong>
      </div>
    </vuestic-modal-error>

    <vuestic-modal-error
      :show.sync="show"
      ref="staticModalNotAuthorizedEdit"
      cancelText="ZATVORI"
      okText="POTVRDI"
    >
      <div slot="title">
        {{ "" }}
        <span style="color: #e34a4a">{{ "401: Not Authorized" }}</span>
      </div>
      <div>
        <strong>{{ "Nemate odgovarajuće privilegije." }}</strong>
      </div>
    </vuestic-modal-error>

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
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import LocalData from "./data/local-data";
import DataTableStyles from "./data/data-table-styles";
import FilterBar from "./datatable-components/FilterBar.vue";
import NewCertificate from "./datatable-components/NewCertificate.vue";
import router from "../../router";
import { http } from "../../../config/config.js";
import { bus } from "../../../src/main.js";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const originalData = LocalData.data;

export default {
  name: "certificates-table",

  components: {
    FilterBar,
    NewCertificate,
    Vuetable,
    VuetablePagination,
    Loading,
  },
  props: {
    site: {
      type: String,
    },
    token: {
      type: String,
    },
    sekcija: {
      type: String,
    },
    apiUrl: {
      type: String,
    },
    tableFields: {
      type: Array,
      required: true,
    },
    onEachSide: {
      type: Number,
      default() {
        return 2;
      },
    },
    apiMode: {
      type: Boolean,
      default() {
        return true;
      },
    },
    data: {
      type: Array,
    },
    sortFunctions: {
      type: Object,
    },
    paginationPath: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      tableData: LocalData,
      perPage: "",
      brStr: 10,
      colorClasses: {},
      moreParams: {},
      dataCount: 0,
      css: DataTableStyles,
      pacijent: {},
      show: true,
      potvrdi: "SAČUVAJ",
      odustani: "ZATVORI",
      patient_data: {
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
      },

      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
      timestamp: "",
    };
  },
  mounted() {
    this.onFilterSet(this.$store.state.filter);
    bus.$on("SetCert", (data) => {
      // console.log("SetCert")
      this.onFilterSet(data.ime + " " + data.prezime);
    });
  },
  beforeDestroy() {
    bus.$off("SetCert");
  },
  watch: {},
  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    unosPacijenta() {
      if (
        this.$store.state.main === true &&
        this.$store.state.site != "5c69f68c338fe912f99f833b"
      ) {
        this.$refs.staticModalNotAuthorizedEntry.open();
      } else {
        this.$refs.largeModalPatient.open();
      }
    },
    prikaziDetalje: function (args) {
      var niz = args[0];

      if (
        args[0][2].srcElement.cellIndex === undefined &&
        !args[0][2].srcElement.classList.contains("disabled")
      ) {
        if (niz[1].name === "detalji") {
          this.pacijent = niz[0].id;
          this.patient_data = niz[0].patient;

          if (
            this.$store.state.main === true &&
            this.$store.state.site != "5c69f68c338fe912f99f833b"
          ) {
            this.$refs.staticModalNotAuthorizedEdit.open();
          } else {
            this.isLoading = true;
            setTimeout(() => {
              this.isLoading = false;
              this.timestamp = (
                new Date().getTime() -
                new Date().getTimezoneOffset() * 60000
              ).toString();
              this.$refs.modalPatientEdit.open();
            }, 500);
          }
        }

        if (niz[1].name === "ba") {
          router.push("/certificates/pdf/ba/" + args[0][0].id);
        }

        if (niz[1].name === "en") {
          router.push("/certificates/pdf/en/" + args[0][0].id);
        }

        if (niz[1].name === "de") {
          router.push("/certificates/pdf/de/" + args[0][0].id);
        }
      }
    },
    onFilterSet(filterText, event) {
      this.filterString = "";

      this.filterString = filterText;

      if (event != undefined && filterText.trim() != "") {
        if (event.keyCode == 13) {
          if (this.apiMode) {
            this.moreParams = {
              filter: filterText,
            };
          } else {
            const txt = new RegExp(filterText, "i");
            this.tableData.data = originalData.filter(function (item) {
              return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
            });
          }

          Vue.nextTick(() => this.$refs.vuetable.refresh());
        } else {
          // console.warn('Waiting for Enter...')
        }
      } else {
        if (this.apiMode) {
          this.moreParams = {
            filter: filterText,
          };
        } else {
          const txt = new RegExp(filterText, "i");
          this.tableData.data = originalData.filter(function (item) {
            return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
          });
        }
        Vue.nextTick(() => this.$refs.vuetable.refresh());
      }
    },
    onPaginationData(paginationData) {
      this.$refs.pagination.setPaginationData(paginationData);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    dataManager(sortOrder, pagination) {
      let data = this.tableData.data;
      let sortFunctions = this.sortFunctions;

      if (sortOrder.length > 0) {
        data.sort(function (item1, item2) {
          const sortField = sortOrder[0].sortField;
          let fn = sortFunctions[sortField];
          if (fn) {
            return fn(item1[sortField], item2[sortField]);
          }
        });

        if (sortOrder[0].direction === "desc") {
          data.reverse();
        }
      }

      pagination = this.$refs.vuetable.makePagination(data.length);

      return {
        pagination: pagination,
        data: data.slice(pagination.from - 1, pagination.to),
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../sass/variables";
@import "../../sass/toasts";

@media (max-width: 1258px) {
  .pagination-link-btn:first-child,
  .pagination-link-btn:last-child {
    display: none;
  }
  .pagination-link-btn:nth-child(2) {
    border-top-left-radius: $btn-border-radius !important;
    border-bottom-left-radius: $btn-border-radius !important;
  }
  .pagination-link-btn:nth-last-child(2) {
    border-top-right-radius: $btn-border-radius !important;
    border-bottom-right-radius: $btn-border-radius !important;
  }
}

@media (max-width: 576px) {
  .hide-not-focused-btn:not(.focus) {
    display: none;
  }
}

.btn.btn-info {
  text-transform: none;
}
</style>
