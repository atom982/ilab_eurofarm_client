<template>
  <div class="table-responsive">
    <div class="d-flex flex-md-row flex-column justify-content-md-between align-items-center">
      <filter-bar @filter="onFilterSet"></filter-bar>
      <items-per-page
        :options="itemsPerPage"
        v-show="false"
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
      :perPage="perPage"
      @vuetable:pagination-data="onPaginationData"
      v-on:vuetable:cell-clicked="(...args)=>this.Akcija([args])"
      v-on:vuetable:cell-dblclicked="(...args)=>this.Double([args])"
      :token="token"
      :site="site"
    ></vuetable>
    <div class="d-flex justify-content-center mb-4">
      <vuetable-pagination
        ref="pagination"
        :css="css.pagination"
        :onEachSide="onEachSide"
        @vuetable-pagination:change-page="onChangePage"
      ></vuetable-pagination>
    </div>
  </div>
</template>

<script>
import Vuetable from "vuetable-2/src/components/Vuetable";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FilterBar from "./datatable-components/FilterBar.vue";
import ItemsPerPage from "./datatable-components/ItemsPerPage.vue";
import Vue from "vue";
import LocalData from "./data/local-data";
import DataTableStyles from "../../vuestic-components/vuestic-datatable/data/data-table-styles";
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";

const originalData = LocalData.data;

export default {
  name: "vuestic-data-table-labassays",
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
      tableData: LocalData,
      perPage: 10,
      colorClasses: {},
      moreParams: { access: this.$store.state.access.level },
      dataCount: 0,
      css: DataTableStyles
    };
  },
  mounted() {
    bus.$on("LabAssayRefresh", () => {
      Vue.nextTick(() => this.$refs.vuetable.refresh());
    });
  },
  beforeDestroy() {
    bus.$off("LabAssayRefresh");
  },
  methods: {
    Double: function(args) {
      // var niz = args[0];

      // if (niz[1].name === "naziv" || niz[1].name === "analit") {        
      //   bus.$emit("LabAssayInterpretacija", niz[0]);
      // } else {
      // }
    },

    Akcija: function(args) {
      var niz = args[0];

      if (
        args[0][2].srcElement.cellIndex === undefined &&
        !args[0][2].srcElement.classList.contains("disabled")
      ) {
        if (niz[1].name === "multi") {
          bus.$emit("LabAssayMulti", niz[0]);
        } else if (niz[1].name === "uredi") {
          bus.$emit("LabAssayUredi", niz[0]);
        } else if (niz[1].name === "akcija") {
          bus.$emit("LabAssayAkcija", niz[0]);
        } else if (niz[1].name === "icon") {
          if (this.$store.state.access.level < 1) {
            bus.$emit("EditJSON", niz[0].labassay);
          }
        } else {
        }
      }
    },

    onFilterSet(filterText) {
      if (this.apiMode) {
        this.moreParams = {
          filter: filterText,
          access: this.$store.state.access.level
        };
      } else {
        const txt = new RegExp(filterText, "i");
        this.tableData.data = originalData.filter(function(item) {
          return item.name.search(txt) >= 0 || item.email.search(txt) >= 0;
        });
      }
      Vue.nextTick(() => this.$refs.vuetable.refresh());
    },
    onItemsPerPage(itemsPerPageValue) {
      this.perPage = itemsPerPageValue;
      Vue.nextTick(() => this.$refs.vuetable.refresh());
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
</style>
