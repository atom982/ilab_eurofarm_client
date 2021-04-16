/* eslint-disable */
<template>
  <div class="row">
    <div class="col-md-12">
      <vuestic-tabs v-if="sekcije.length" :names="sekcije" ref="tabs" :tab="section">
        <div v-for="sekcija in sekcije" :key="sekcija" :slot="sekcija">
          <vuestic-data-table
            v-if="sve"
            :apiUrl="apiUrl"
            style="padding-right: 20px;padding-left: 20px;"
            class="no-v-padding minHeight"
            :tableFields="tableFields"
            :itemsPerPage="itemsPerPage"
            :sortFunctions="sortFunctions"
            :apiMode="apiMode"
            :sekcija="sekcija"
            :site="site"
            :token="token"
            :paginationPath="paginationPath"
          ></vuestic-data-table>
        </div>
      </vuestic-tabs>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { http } from "../../../config/config.js";
import BadgeColumn from "./BadgeColumn.vue";
import FieldsDef from "./table-definitions/fields-definition";
import ItemsPerPageDef from "./table-definitions/items-per-page-definition";
import { apiUrlObradaPregled_ag } from "../../../config/config.js";

export default {
  name: "rTable",

  data() {
    return {
      apiUrl: apiUrlObradaPregled_ag,
      apiMode: true,
      tableFields: FieldsDef.tableFields,
      tableFields: FieldsDef.tableFields,
      itemsPerPage: JSON.parse(JSON.stringify(ItemsPerPageDef.itemsPerPage)),
      sortFunctions: FieldsDef.sortFunctions,
      paginationPath: "",
      sekcije: [],
      section: "",
      token: this.$store.state.token,
      site: this.$store.state.site,
      sve: true
    };
  },
  created() {

   
    if(this.$store.state.mikrobioloski){

      var obj = {value: "Mikrobiologija"}

      var index = this.itemsPerPage.findIndex(x => x.value == "Mikrobiologija")

      if (index === -1){
          this.itemsPerPage.splice(3, 0, obj)
      }
      
    }

   /*  this.itemsPerPage.forEach(element => {
      // console.log(element)
    }); */

    if (this.$route.query.sekcija) {
      this.section = this.$route.query.sekcija;
    }

    http
      .get(
        "/uzorci/sekcije/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.sekcije.push("Obrada uzoraka: COVID 19 Antigen Test");
        if (!this.section.length) {
          this.section = this.sekcije[0];
        } else {
          if (this.section === "Obrada uzoraka: COVID 19 Antigen Test") {
            this.sve = true;
          } else {
            this.sve = false;
          }
        }
      });
  }
};
</script>

<style lang="scss">
.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.minHeight {
  min-height: 350px;
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
</style>
