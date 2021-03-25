/* eslint-disable */
<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-widget headerText="Pregled nalaza: PDF dokumenti">
        <vuestic-data-table
          :apiUrl="apiUrl"
          style="padding-right: 20px;padding-left: 20px;"
          class="no-v-padding minHeight"
          :tableFields="tableFields"
          :itemsPerPage="itemsPerPage"
          :sortFunctions="sortFunctions"
          :apiMode="apiMode"
          :token="token"
          :site="site"
          :biljeska="biljeska"
          :paginationPath="paginationPath"
        ></vuestic-data-table>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import FieldsDef from "./fields-definition";
import ItemsPerPageDef from "./items-per-page-definition";
import { apiUrlNalaziPregled } from "../../../../config/config.js";
import { http } from "../../../../config/config.js";
Vue.component("badge-column", BadgeColumn);

export default {
  name: "rpTable",

  data() {
    return {
      apiUrl: apiUrlNalaziPregled,
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      itemsPerPage: ItemsPerPageDef.itemsPerPage,
      sortFunctions: FieldsDef.sortFunctions,
      paginationPath: "",
      token: this.$store.state.token,
      site: this.$store.state.site,
      biljeska: this.$store.state.note
    };
  },
  mounted() {
   
  }
};
</script>

<style lang="scss">
.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #4ae387;
}

i:hover {
  color: #4ae387 !important;
}

.minHeight {
  min-height: 350px;
}
</style>
