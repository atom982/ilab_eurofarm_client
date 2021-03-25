<template>
  <div class="table-responsive">
    <div class="d-flex flex-md-row flex-column justify-content-md-between align-items-center">
      <filter-bar @filter="onFilterSet"></filter-bar>
      <items-per-page
        :options="itemsPerPage"
        :defaultPerPage="perPage"
        @items-per-page="onItemsPerPage"
      ></items-per-page>
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
      v-on:vuetable:cell-clicked="(...args)=>this.prikaziDetalje([args])"
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
    <vuestic-modal-produkt
      :show.sync="show"
      v-bind:medium="true"
      ref="largeModalProdukt"
      :okText="potvrdi"
      :cancelText="odustani"
    >
      <div slot="title">{{'Unos produkta'}}</div>
      <div class="form-elements">
        <div class="row">
          <div class="col-md-12"></div>
        </div>
      </div>
    </vuestic-modal-produkt>

    <patient-edit
      :show.sync="show"
      v-bind:medium="true"
      ref="modalProduktEdit"
      :okText="potvrdi"
      :cancelText="odustani"
      :patient="patient_data"
    >
      <div slot="title">
        {{'Pacijent: '}}
        <span style="color: #4ae387;">{{patient_data.ime}} {{patient_data.prezime}}</span>
      </div>
      <div class="form-elements">
        <div class="row">
          <div class="col-md-12"></div>
        </div>
      </div>
    </patient-edit>
  </div>
</template>

<script>
import Vue from "vue";
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import ItemsPerPage from "./narudzbenica/ItemsPerPage.vue";
import DataTableStyles from "./narudzbenica/data-table-styles";
import FilterBar from "./narudzbenica/FilterBar.vue";
import router from "../../../router";
import { http } from "../../../../config/config.js";
import { bus } from "../../../../src/main.js";



export default {
  name: "stanje-table",

  components: {
    FilterBar,
    Vuetable,
    VuetablePagination,
    ItemsPerPage
  },
  props: {
    site: {
      type: String
    },
    token: {
      type: String
    },
    sekcija: {
      type: String
    },
    apiUrl: {
      type: String
    },
    tableFields: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Array,
      required: true
    },
    onEachSide: {
      type: Number,
      default() {
        return 2;
      }
    },
    apiMode: {
      type: Boolean,
      default() {
        return true;
      }
    },
    data: {
      type: Array
    },
    sortFunctions: {
      type: Object
    },
    paginationPath: {
      type: String,
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      tableData: {},
      perPage: "NARUČENO",
      brStr: 10,
      colorClasses: {},
      moreParams: {},
      dataCount: 0,
      css: DataTableStyles,
      pacijent: {},
      show: true,
      potvrdi: "SAČUVAJ",
      odustani: "ZATVORI",
      patient_data: {},
      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  mounted() {
    this.onFilterSet(this.$store.state.filter);
    bus.$on("Set", data => {
      this.onFilterSet(data.ime + " " + data.prezime);
    });
    bus.$on("novi-produkt", data => {
      this.$refs.largeModalProdukt.open();
    });
  },
  beforeDestroy() {
    bus.$off("Set");
    bus.$off("novi-produkt");
  },
  watch: {},
  methods: {
    unosProdukta() {
      
      //this.$refs.largeModalProdukt.open();
    },
    prikaziDetalje: function(args) {
      var niz = args[0];

      if (
        args[0][2].srcElement.cellIndex === undefined &&
        !args[0][2].srcElement.classList.contains("disabled")
      ) {
        if (niz[1].name === "detalji") {
          this.pacijent = niz[0].id;
          this.Patient();
        }
        if (niz[1].name === "prijem") {
          router.push("/samples/" + args[0][0].id);
        }
        if (niz[1].name === "icon") {
          if(this.$store.state.access.level < 1){
            router.push("/evaluation/" + args[0][0].id);
          }           
        }
      }
    },
    Patient() {
      http
        .get(
          "pacijenti/detalji/" +
            this.pacijent +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          if (res.data.pacijent.jmbg != undefined) {
            this.patient_data = res.data.pacijent;
            this.$refs.modalProduktEdit.open();
          }
        });
    },
    onFilterSet(filterText, event) { 

      this.filterString = ""

      this.filterString = filterText
      
      if(event != undefined && filterText.trim() != ''){
    

          if (this.apiMode) {
            this.moreParams = {
              filter: filterText
            };
          } else {
            const txt = new RegExp(filterText, "i");
            this.tableData.data = originalData.filter(function(item) {
              return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
            });
          }
          
          Vue.nextTick(() => this.$refs.vuetable.refresh());



      }else{

        if (this.apiMode) {
          this.moreParams = {
            filter: filterText
          };
        } else {
          const txt = new RegExp(filterText, "i");
          this.tableData.data = originalData.filter(function(item) {
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
    onItemsPerPage(itemsPerPageValue) {
      this.perPage = itemsPerPageValue;
      Vue.nextTick(() => this.$refs.vuetable.refresh());      
    },
    dataManager(sortOrder, pagination) {
      let data = this.tableData.data;
      let sortFunctions = this.sortFunctions;

      if (sortOrder.length > 0) {
        data.sort(function(item1, item2) {
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
        data: data.slice(pagination.from - 1, pagination.to)
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";
@import "../../../sass/toasts";

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
