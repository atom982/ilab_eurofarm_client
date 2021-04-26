




<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget :headerText="'Change Log'">
          <div class="row" style="min-height: 350px">
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
                      <i
                        class="glyphicon glyphicon-search icon-left input-icon search-icon"
                      ></i>
                      <label class="control-label" for="input-icon-left">{{
                        "Pretraga"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="table-responsive" v-if="changes.length">
                    <table class="table table-striped first-td-padding">
                      <thead>
                        <tr>
                          <td width="10%">{{ "CDC" }}</td>
                          <td width="25%">{{ "Lokacija" }}</td>
                          <td width="15%">{{ "Protokol" }}</td>
                          <td width="15%">{{ "Uzorak" }}</td>
                          <td width="15%">{{ "Datum" }}</td>
                          <td width="10%">{{ "Vrijeme" }}</td>
                          <td width="10%">{{ "korisnik" }}</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="element in filtered"
                          :key="element._id"
                          v-bind:class="{
                            'table-danger': false,
                            'table-success': false,
                            'table-warning': false,
                          }"
                        >
                          <td>
                            <i
                              style="font-size: 18px; color: #4ab2e3"
                              class="glyphicon glyphicon-erase"
                              @click.prevent="ShowData(element)"
                            ></i>
                          </td>
                          <td>
                            {{ element.lokacija }}
                          </td>
                          <td>{{ element.protokol }}</td>
                          <td>{{ element.sample }}</td>
                          <td>{{ element.datum }}</td>
                          <td>{{ element.vrijeme }}</td>
                          <td>{{ element.user }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--  -->
        </vuestic-widget>
      </div>
    </div>

    <vuestic-modal-error
      :show.sync="show"
      ref="staticModalChanges"
      cancelText="ZATVORI"
      okText="POTVRDI"
    >
      <div slot="title">
        {{ "" }}
       
        <span style="color: #4ab2e3">{{ protokol}}</span>
         <span style="color: #e34a4a">{{ " - Change Data Capture" }}</span>
      </div>
      <div>
        <div class="row">
          <div class="col-md-6">
            <span style="color: #e34a4a">{{ "Old Data Capture" }}</span>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #e34a4a"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ oldData.ime }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #e34a4a"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ oldData.prezime }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #e34a4a"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ oldData.spol }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #e34a4a"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ oldData.datRodjenja }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #e34a4a"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ "ID: " + oldData.passport }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <!-- {{ oldData }} -->
          </div>

          <div class="col-md-6">
            <span style="color: #4ab2e3">{{ "New Data Capture" }}</span>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #4ab2e3"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ newData.ime }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #4ab2e3"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ newData.prezime }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #4ab2e3"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ newData.spol }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #4ab2e3"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ newData.datRodjenja }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <input
                  onpaste="return false;"
                  autocomplete="off"
                  id="np-input-icon-left"
                  title=" "
                  name="np-input-icon-left"
                  disabled
                />
                <label
                  style="color: #4ab2e3"
                  class="control-label"
                  for="np-input-icon-left"
                  >{{ "ID: " + newData.passport }}</label
                >
                <i class="bar"></i>
              </div>
            </div>
            <!-- {{ newData }} -->
          </div>
        </div>
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
import BadgeColumn from "./BadgeColumn.vue";
import { http } from "../../../config/config.js";
import { server } from "../../../config/config.js";
import { bus } from "../../main";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "changelog",

  components: {
    Loading,
  },

  data() {
    return {
      show: true,

      isLoading: false,
      fullPage: true,

      changes: [],

      protokol: "",

      oldData: {
        jmbg: "",
        ime: "",
        prezime: "",
        spol: "",
        passport: "",
        datRodjenja: "",
      },

      newData: {
        jmbg: "",
        ime: "",
        prezime: "",
        spol: "",
        passport: "",
        datRodjenja: "",
      },

      filtered: [],
      uzorak: {},
      text: "",
    };
  },

  created() {
    this.isLoading = true;
    http
      .get(
        "postavke/list/changes?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        if (res.data.success) {
          this.changes = [];

          res.data.changes.forEach((element) => {
            if (element.site.opis.includes("+")) {
              var temp = element.site.opis.split("+");
              var lokacija = temp[1];
            } else {
              var lokacija = element.site.opis;
            }

            var godisteOld = element.oldData.jmbg.substring(4, 7);
            switch (godisteOld[0]) {
              case "9":
                godisteOld = "1" + godisteOld + "";
                break;
              case "0":
                godisteOld = "2" + godisteOld + "";
                break;
              default:
                godisteOld = "";
                break;
            }

            var godisteNew = element.newData.jmbg.substring(4, 7);
            switch (godisteNew[0]) {
              case "9":
                godisteNew = "1" + godisteNew + "";
                break;
              case "0":
                godisteNew = "2" + godisteNew + "";
                break;
              default:
                godisteNew = "";
                break;
            }

            this.changes.push({
              datum:
                JSON.stringify(
                  JSON.stringify(element.time).substring(1, 11)
                ).slice(9, 11) +
                "." +
                JSON.stringify(
                  JSON.stringify(element.time).substring(1, 11)
                ).slice(6, 8) +
                "." +
                JSON.stringify(
                  JSON.stringify(element.time).substring(1, 11)
                ).slice(1, 5),
              vrijeme: JSON.stringify(element.time).substring(12, 17),
              datRodjenjaOld:
                element.oldData.jmbg.substring(0, 2) +
                "." +
                element.oldData.jmbg.substring(2, 4) +
                "." +
                godisteOld,
              datRodjenjaNew:
                element.newData.jmbg.substring(0, 2) +
                "." +
                element.newData.jmbg.substring(2, 4) +
                "." +
                godisteNew,
              new: element.newData,
              old: element.oldData,
              user: element.user,
              sample: element.sample,
              protokol: element.protokol,
              lokacija: lokacija,
              element: element,
            });
          });

          // console.log(this.changes);

          this.filtered = [];
          this.changes.forEach((element) => {
            if (
              element.protokol
                .toLowerCase()
                .includes(this.text.toLowerCase()) ||
              element.sample.toLowerCase().includes(this.text.toLowerCase())
            ) {
              this.filtered.push(element);
            }
          });

          this.isLoading = false;
        } else {
          this.isLoading = false;
        }
      });
  },

  beforeMount() {},

  mounted() {},

  watch: {
    text: function () {
      this.filtered = [];
      this.changes.forEach((element) => {
        if (
          element.protokol.toLowerCase().includes(this.text.toLowerCase()) ||
          element.sample.toLowerCase().includes(this.text.toLowerCase())
        ) {
          this.filtered.push(element);
        }
      });
    },
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
    ShowData(element) {
      this.protokol = element.protokol;
      this.oldData = element.old;
      this.oldData.datRodjenja = element.datRodjenjaOld;
      this.newData = element.new;
      this.newData.datRodjenja = element.datRodjenjaNew;
      this.$refs.staticModalChanges.open();
    },
  },
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

.circle {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  display: inline-block;
}

.icon-bar a:hover {
  color: #adb3b9 !important;
}

i:hover {
  color: #4ae387;
}
</style>
