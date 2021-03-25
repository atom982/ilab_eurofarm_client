<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-3">
            <div class="form-group with-icon-left">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="input-icon-left"
                  title=" "
                  name="input-icon-left"
                  v-model="text"
                  required
                />
                <i class="glyphicon glyphicon-search icon-left input-icon search-icon"></i>
                <label class="control-label" for="input-icon-left">{{'Pretraga'}}</label>
                <i class="bar"></i>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <div class="table-responsive" v-if="analize.length">
              <table class="table table-striped first-td-padding">
                <thead>
                  <tr>
                    <td width="10%">{{'Status'}}</td>
                    <td width="15%">{{'Šifra'}}</td>
                    <td width="20%">{{'Naziv'}}</td>
                    <td width="25%">{{'Opis'}}</td>
                    <td width="30%">{{'Grupa'}}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="element in filtered"
                    :key="element._id"
                    v-bind:class="{
                          'table-danger': false, 
                          'table-success': element.active,
                          'table-warning': !element.active
                        }"
                  >
                    <td>
                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          :disabled="element.kategorija.includes('Specifične') || element.kategorija.includes('Paneli')"
                          v-if="!element.active"
                          @click="Activate($event, element)"
                          class="form-check-input"
                          id="checkbox1"
                          type="checkbox"
                          v-model="element.active"
                        />
                        <input
                          :disabled="element.kategorija.includes('Specifične') || element.kategorija.includes('Paneli')"
                          v-if="element.active"
                          @click="Deactivate($event, element)"
                          class="form-check-input"
                          id="checkbox1"
                          type="checkbox"
                          v-model="element.active"
                        />
                        <label class="form-check-label" for="checkbox1"></label>
                      </div>
                    </td>
                    <td>{{element.sifra}}</td>
                    <td>{{element.naziv}}</td>
                    <td>{{element.analit}}</td>
                    <td>{{element.sekcija}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
import { http } from "../../../config/config.js";
import { bus } from "../../main";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "laboratorijske-analize",

  components: {
    Loading
  },

  data() {
    return {
      show: true,

      isLoading: false,
      fullPage: true,

      analize: [],
      filtered: [],
      analiza: {},
      text: ""
    };
  },

  created() {
    http
      .get(
        "postavke/list/analize?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.analize);
          this.analize = res.data.analize;
          this.filtered = res.data.analize;
        }
      });
  },

  mounted() {},

  watch: {
    text: function() {
      this.filtered = [];
      this.analize.forEach(element => {
        if (
          element.naziv.toLowerCase().includes(this.text.toLowerCase()) ||
          element.analit.toLowerCase().includes(this.text.toLowerCase())
        ) {
          this.filtered.push(element);
        }
      });
    }
  },

  beforeDestroy() {},

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    Deactivate(event, test) {
      this.isLoading = true;
      http
        .post("postavke/analiza/edit", {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          _id: test._id,
          status: false
        })
        .then(res => {
          this.isLoading = false;
          if (res.data.success) {
            // console.log(res.data);
          } else {
            // console.warn("Greška prilikom izmjene podataka.");
          }
        });
    },
    Activate(event, test) {
      this.isLoading = true;
      http
        .post("postavke/analiza/edit", {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          _id: test._id,
          status: true
        })
        .then(res => {
          this.isLoading = false;
          if (res.data.success) {
            // console.log(res.data);
          } else {
            // console.warn("Greška prilikom izmjene podataka.");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
@import "../../../node_modules/bootstrap/scss/functions";
@import "../../../node_modules/bootstrap/scss/variables";
@import "../../../node_modules/bootstrap/scss/mixins/breakpoints";

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
.chart-container {
  padding: 0 2rem;
  height: 24rem;
}
</style>
