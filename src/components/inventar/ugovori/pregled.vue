<template>
  <div class="row">
    <div class="col-md-12">
   
        <UgovorTable
          :apiUrl="apiUrl"
          style="padding-right: 20px;padding-left: 20px;"
          class="no-v-padding minHeight3"
          :tableFields="tableFields"
          :itemsPerPage="itemsPerPage"
          :sortFunctions="sortFunctions"
          :apiMode="apiMode"
          :token="token"
          :site="site"
          :paginationPath="paginationPath"
        ></UgovorTable>
  
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./components/BadgeColumn.vue";
import FieldsDef from "./components/fields-definition";
import ItemsPerPageDef from "./components/items-per-page-definition";
import { http } from "../../../../config/config.js";
import { apiUrlUgovor } from "../../../../config/config.js";
import UgovorTable from './UgovorTable.vue';

Vue.component("badge-column", BadgeColumn);


export default {
  name: "UgovorPregled",
  components: {
    UgovorTable,
  },
  data() {
    return {
      apiUrl: apiUrlUgovor,
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      sortFunctions: FieldsDef.sortFunctions,
      itemsPerPage: JSON.parse(JSON.stringify(ItemsPerPageDef.itemsPerPage)),
      paginationPath: "",
      token: this.$store.state.token,
      site: this.$store.state.site
    };
  }
};
</script>

<style lang="scss">
.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.circle {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  display: inline-block;
}

.minHeight3 {
  min-height: 350px;
}
</style>
