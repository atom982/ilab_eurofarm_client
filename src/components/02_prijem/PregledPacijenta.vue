<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-widget headerText="Prijem pacijenta">
        <pacijents-table
          :apiUrl="apiUrl"
          style="padding-right: 20px;padding-left: 20px;"
          class="no-v-padding minHeight3"
          :tableFields="tableFields"
          :sortFunctions="sortFunctions"
          :apiMode="apiMode"
          :token="token"
          :site="site"
          :paginationPath="paginationPath"
        ></pacijents-table>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import FieldsDef from "./data/fields-definition";
import { http } from "../../../config/config.js";
import { apiUrlPatients } from "../../../config/config.js";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "pacijenti",

  data() {
    return {
      apiUrl: apiUrlPatients,
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      sortFunctions: FieldsDef.sortFunctions,
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
