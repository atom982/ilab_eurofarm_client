<template>
  <div class="form-elements">
    <vuestic-widget v-if="!Loaded" :headerText="'Temperature Data Logger'">
      <div class="row minHeight">
        <div class="col-sm-4 col-12">
          <div class="pb-container"></div>
        </div>
        <div class="col-sm-4 col-12">
          <div class="pb-container"></div>
        </div>
        <div class="col-sm-4 col-12">
          <div class="pb-container"></div>
        </div>

        <div class="col-sm-4 col-12">
          <div class="pb-container"></div>
        </div>
        <div class="col-sm-4 col-12">
          <div class="pb-container">
            <vuestic-progress-bar ref="hBasic"></vuestic-progress-bar>
          </div>
        </div>
        <div class="col-sm-4 col-12">
          <div class="pb-container"></div>
        </div>
      </div>
    </vuestic-widget>

    <vuestic-widget v-if="!temperatura.length && Loaded" :headerText="'Temperature Data Logger'">
      <div class="row minHeight">
        <div class="col-md-12">
          <div
            class="chart-widget"
            style="display:flex; flex-direction: row; justify-content: center; align-items: center;"
          >
            <span style="vertical-align:middle; ">
              <h6
                style="text-align: center; line-height: 240px; color: #e34a4a;"
              >{{"Nema podataka."}}</h6>
            </span>
          </div>
        </div>
      </div>
    </vuestic-widget>

    <vuestic-widget v-if="temperatura.length && Loaded" :headerText="'Temperature Data Logger'">
      <div class="row minHeight">
        <div class="col-md-12">
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <td width="5%">{{''}}</td>
                  <td width="7%" align="middle" style="text-transform: none;">{{'Graph'}}</td>
                  <td width="7%" align="middle" style="text-transform: none;">{{'Table'}}</td>
                  <td width="6%">{{'ID'}}</td>
                  <td width="13%" style="text-transform: none;">{{'Naziv'}}</td>
                  <td width="10%" align="middle" style="text-transform: none;">{{'Vlažnost'}}</td>
                  <td width="7%" align="middle" style="text-transform: none;">{{'Temperatura'}}</td>
                  <td width="13%" align="middle" style="text-transform: none;">{{'Reference'}}</td>
                  <td width="13%" style="text-transform: none;">{{'Datum'}}</td>
                  <td width="6%" style="text-transform: none;">{{'Vrijeme'}}</td>
                  <td width="7%" align="middle" style="text-transform: none;">{{'Report'}}</td>
                  <td width="6%" align="middle"></td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="device in temperatura"
                  :key="device.naziv"
                  v-bind:class="{'table-danger': Number(device.temperatura) < Number(device.frizider.opseg.refd) || Number(device.temperatura) > Number(device.frizider.opseg.refg), 
                    'table-success': Number(device.temperatura) > Number(device.frizider.opseg.refd) && Number(device.temperatura) < Number(device.frizider.opseg.refg), 
                    'table-warning': Number(device.temperatura) === Number(device.frizider.opseg.refd) || Number(device.temperatura) === Number(device.frizider.opseg.refg)}"
                >
                  <td v-if="device.active">
                    <i class="fa fa-link" style="color: #4ae387; font-size: 18px;"></i>
                  </td>
                  <td v-if="!device.active">
                    <span class="fa fa-unlink" style="color: #e34a4a; font-size: 18px;"></span>
                  </td>
                  <td align="middle">
                    <div
                      style="color: #4ab2e3; white-space: nowrap; background-color: Transparent; border: 0px; border-radius: 0px;"
                      v-bind:id="device._id"
                    >
                      <span
                        @click.prevent="Graf($event, device)"
                        style="font-size: 16px;"
                        class="vuestic-icon vuestic-icon-graph"
                      ></span>
                      <span style="text-transform: none;">{{''}}</span>
                    </div>
                  </td>
                  <td align="middle">
                    <div
                      style="color: #4ab2e3; white-space: nowrap; background-color: Transparent; border: 0px; border-radius: 0px;"
                      v-bind:id="device._id"
                    >
                      <span
                        @click.prevent="Table($event, device)"
                        style="font-size: 16px;"
                        class="vuestic-icon vuestic-icon-tables"
                      ></span>
                      <span style="text-transform: none;">{{''}}</span>
                    </div>
                  </td>
                  <td>
                    <span v-if="!device.active" style="color: #e34a4a;">{{device.frizider.slave_id}}</span>
                    <span v-if="device.active">{{device.frizider.slave_id}}</span>
                  </td>
                  <td>
                    <span v-if="!device.active" style="color: #e34a4a;">{{device.naziv}}</span>
                    <span v-if="device.active">{{device.naziv}}</span>
                  </td>
                  <td align="middle">
                    <span v-if="!device.active" style="color: #e34a4a;">{{device.vlaznost}}</span>
                    <span v-if="device.active">
                      {{device.vlaznost}}
                      <span v-if="device.active">%</span>
                    </span>
                  </td>
                  <td align="middle">
                    <span v-if="!device.active" style="color: #e34a4a;">{{device.temperatura}}</span>
                    <span v-if="device.active">
                      {{device.temperatura}}
                      <sup v-if="device.active">&#8451;</sup>
                    </span>
                  </td>
                  <td align="middle">
                    <span
                      v-if="!device.active"
                      style="color: #e34a4a;"
                    >{{device.frizider.opseg.refd}} - {{device.frizider.opseg.refg}}</span>
                    <span v-if="device.active">
                      {{device.frizider.opseg.refd}} - {{device.frizider.opseg.refg}}
                      <sup>&#8451;</sup>
                    </span>
                  </td>
                  <td v-if="!device.active">
                    <span>{{""}}</span>
                  </td>
                  <td v-if="device.active">
                    <span>{{JSON.stringify(new Date(new Date(device.time).getTime() - new Date(device.time).getTimezoneOffset() * 60000).toISOString()).slice(9, 11) + "." + JSON.stringify(new Date(new Date(device.time).getTime() - new Date(device.time).getTimezoneOffset() * 60000).toISOString()).slice(6, 8) + "." + JSON.stringify(new Date(new Date(device.time).getTime() - new Date(device.time).getTimezoneOffset() * 60000).toISOString()).slice(1, 5)}}</span>
                  </td>
                  <td v-if="!device.active">
                    <span>{{""}}</span>
                  </td>
                  <td v-if="device.active">
                    <span>{{JSON.stringify(new Date(new Date(device.time).getTime() - new Date(device.time).getTimezoneOffset() * 60000).toISOString()).slice(12, 17)}}</span>
                  </td>

                  <td align="middle">
                    <div
                      style="color: #4ab2e3; white-space: nowrap; background-color: Transparent; border: 0px; border-radius: 0px;"
                      v-bind:id="device._id"
                      @click.prevent="Izvjestaj($event, device)"
                    >
                      <span style="font-size: 16px;" class="vuestic-icon vuestic-icon-files"></span>
                      <span style="text-transform: none;">{{''}}</span>
                    </div>
                  </td>

                  <td align="middle">
                    <i
                      v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : 
                        Number(device.temperatura) < Number(device.frizider.opseg.refd) || Number(device.temperatura) > Number(device.frizider.opseg.refg)}"
                    ></i>
                    <i
                      v-bind:class="{'fa fa-check success-icon icon-right input-icon' : 
                        Number(device.temperatura) > Number(device.frizider.opseg.refd) && Number(device.temperatura) < Number(device.frizider.opseg.refg)}"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </vuestic-widget>

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

    <vuestic-modal-graph
      :show.sync="show"
      ref="staticModalGraph"
      cancelText="ZATVORI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #e34a4a;">{{"Grafički prikaz temperature"}}</span>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div v-if="loadedChart" class="chart-widget visina">
            <vuestic-chart
              :width="500"
              :height="300"
              :options="optionsLineChart"
              v-bind:data="lineChartData"
              type="line"
            ></vuestic-chart>
          </div>
          <div
            v-if="!loadedChart && !noData"
            class="chart-widget visina"
            style="display:flex; flex-direction: row; justify-content: center; align-items: center;"
          >
            <span style="vertical-align:middle; ">
              <atom-spinner
                style="opacity: 0.25;"
                :animation-duration="1000"
                :size="300"
                :color="'#4ae387'"
              />
            </span>
          </div>
          <div
            v-if="!loadedChart && noData"
            class="chart-widget visina"
            style="display:flex; flex-direction: row; justify-content: center; align-items: center;"
          >
            <span style="vertical-align:middle; ">
              <h6
                style="text-align: center; line-height: 380px; color: #e34a4a;"
              >{{"Nema podataka."}}</h6>
            </span>
          </div>
        </div>
      </div>
    </vuestic-modal-graph>

    <vuestic-modal-table
      :show.sync="show"
      ref="staticModalTable"
      cancelText="ZATVORI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #e34a4a;">{{"Tabelarni prikaz temperature"}}</span>
      </div>

      <div class="row">
        <div class="col-md-12" style="min-height: 480px;">
          <div v-if="logs.length" class="table-responsive">
            <table class="table table-striped table-sm color-icon-label-table">
              <thead>
                <tr align="middle">
                  <td width="18%" align="middle" style="text-transform: none;">{{'Vlažnost'}}</td>
                  <td width="18%" align="middle" style="text-transform: none;">{{'Temperatura'}}</td>
                  <td width="18%" align="middle" style="text-transform: none;">{{'Reference'}}</td>
                  <td width="18%" style="text-transform: none;">{{'Datum'}}</td>
                  <td width="18%" style="text-transform: none;">{{'Vrijeme'}}</td>
                  <td width="10%" align="middle"></td>
                </tr>
              </thead>
              <tbody>
                <!--  -->
                <tr
                  align="middle"
                  v-for="(device, index) in logs"
                  :key="index"
                  v-bind:class="{'table-danger': Number(device.temperatura) < Number(device.frizider.opseg.refd) || Number(device.temperatura) > Number(device.frizider.opseg.refg), 
                    'table-success': Number(device.temperatura) > Number(device.frizider.opseg.refd) && Number(device.temperatura) < Number(device.frizider.opseg.refg), 
                    'table-warning': Number(device.temperatura) === Number(device.frizider.opseg.refd) || Number(device.temperatura) === Number(device.frizider.opseg.refg)}"
                >
                  <td align="middle">{{device.vlaznost}}%</td>
                  <td align="middle">
                    {{device.temperatura}}
                    <sup>&#8451;</sup>
                  </td>
                  <td align="middle">
                    {{device.frizider.opseg.refd}} - {{device.frizider.opseg.refg}}
                    <sup>&#8451;</sup>
                  </td>
                  <td>{{JSON.stringify(new Date(new Date(device.datumVrijeme).getTime() - new Date(device.datumVrijeme).getTimezoneOffset() * 60000).toISOString()).slice(9, 11) + "." + JSON.stringify(new Date(new Date(device.datumVrijeme).getTime() - new Date(device.datumVrijeme).getTimezoneOffset() * 60000).toISOString()).slice(6, 8) + "." + JSON.stringify(new Date(new Date(device.datumVrijeme).getTime() - new Date(device.datumVrijeme).getTimezoneOffset() * 60000).toISOString()).slice(1, 5)}}</td>
                  <td>{{JSON.stringify(new Date(new Date(device.datumVrijeme).getTime() - new Date(device.datumVrijeme).getTimezoneOffset() * 60000).toISOString()).slice(12, 17)}}</td>

                  <td align="middle">
                    <i
                      v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : 
                        Number(device.temperatura) < Number(device.frizider.opseg.refd) || Number(device.temperatura) > Number(device.frizider.opseg.refg)}"
                    ></i>
                    <i
                      v-bind:class="{'fa fa-check success-icon icon-right input-icon' : 
                        Number(device.temperatura) > Number(device.frizider.opseg.refd) && Number(device.temperatura) < Number(device.frizider.opseg.refg)}"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style="text-align:center;">
              <span class="circle badge-info"></span>
              {{selected.naziv}}
            </div>
          </div>

          <div
            v-if="!noTableData && !logs.length"
            class="chart-widget visina"
            style="display:flex; flex-direction: row; justify-content: center; align-items: center;"
          >
            <span style="vertical-align:middle; ">
              <atom-spinner
                style="opacity: 0.25;"
                :animation-duration="1000"
                :size="300"
                :color="'#4ae387'"
              />
            </span>
          </div>
          <div
            v-if="noTableData && !logs.length"
            class="chart-widget visina"
            style="display:flex; flex-direction: row; justify-content: center; align-items: center;"
          >
            <span style="vertical-align:middle; ">
              <h6
                style="text-align: center; line-height: 380px; color: #e34a4a;"
              >{{"Nema podataka."}}</h6>
            </span>
          </div>
        </div>
      </div>
    </vuestic-modal-table>
  </div>
</template>

<script>
import { http } from "../../../../config/config.js";
import BadgeColumn from "./BadgeColumn.vue";
// import VueSocketIO from "vue-socket.io";
import { bus } from "../../../main";
import Loading from "vue-loading-overlay";
import { AtomSpinner } from "epic-spinners";
import "vue-loading-overlay/dist/vue-loading.css";

import Vue from "vue";
import store from "vuex-store";
import VerticalBarChart from "../../vuestic-components/vuestic-chart/chart-types/VerticalBarChart";
import LineChart from "../../vuestic-components/vuestic-chart/chart-types/LineChart";
import utils from "services/utils";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "loger-table",

  data() {
    return {
      show: true,
      isLoading: false,
      fullPage: true,
      valueAnimationInterval: 2500,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",

      // socketTemperature: "",
      temperatura: [],
      loadedChart: false,
      LineChartOptions: {},
      lineChartDataTemp: {},
      optionsLineChart: {},
      selected: {},
      range_min: "",
      range_max: "",
      logs: [],
      timeOd: "",
      timeDo: "",
      noData: false,
      noTableData: false,
      graphModalOpened: false,
      tableModalOpened: false,

      Frizideri: [],
      Offline: [],
      polling: null,
      Loaded: false,
      window: {
        width: 0,
        height: 0
      }
    };
  },
  components: {
    Loading,
    AtomSpinner,
    VerticalBarChart,
    LineChart
  },
  beforeMount() {
    // Frizideri
    http
      .get(
        "loger/list/frizideri?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.Frizideri = res.data.frizideri;
      });
  },

  mounted() {
    bus.$on("GraphDateRange", data => {
      this.timeOd = data.from;
      this.timeDo = data.to;

      var date_data = {
        from: data.from,
        to: data.to
      };

      bus.$emit("GraphDateData", date_data);

      this.pripremiPodatkeLineChart(this.selected);
    });
    bus.$on("Loaded", () => {
      this.Loaded = true;
    });
    bus.$on("GraphModalClosed", () => {
      this.graphModalOpened = false;
    });
    bus.$on("TableDateRange", data => {
      this.timeOd = data.from;
      this.timeDo = data.to;

      var date_data = {
        from: data.from,
        to: data.to
      };

      bus.$emit("TableDateData", date_data);

      this.noTableData = false;
      this.logs = [];

      http
        .post("loger/graph", {
          data: this.selected,
          from: this.timeOd,
          to: this.timeDo,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            var dates = [];

            res.data.graphdata.vrijeme.forEach(element => {
              dates.push(
                JSON.stringify(
                  new Date(
                    new Date(element).getTime() -
                      new Date(element).getTimezoneOffset() * 60000
                  ).toISOString()
                ).slice(9, 11) +
                  "." +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(6, 8) +
                  "." +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(1, 5) +
                  " " +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(12, 17)
              );
            });

            this.range_min = dates[0];
            this.range_max = dates[dates.length - 1];

            bus.$emit("TableSelected");

            this.logs = res.data.logs;
          } else {
            this.noTableData = true;
          }
        });
    });
    bus.$on("TableModalClosed", () => {
      this.tableModalOpened = false;
    });

    let delay = 0;
    for (let ref in this.$refs) {
      this.$refs[
        ref
      ].$data.valueAnimationInterval = this.valueAnimationInterval;
      let timeout = setTimeout(() => {
        if (!this.$refs[ref]) {
          clearTimeout(timeout);
          return;
        }
        this.$refs[ref].$data.value = 100;
      }, delay);
      delay += this.valueAnimationInterval;
    }

    setTimeout(() => {
      this.DeviceStatus();
    }, 2500);
  },
  computed: {
    lineChartData: function() {
      return this.lineChartDataTemp;
    }
  },
  watch: {
    "$store.state.counter": function() {
      if (this.$store.state.counter % 10 === 0) {
        this.DeviceStatus();
      }
    },
    lineChartDataTemp: function() {
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.loadedChart = true;
    }
  },
  beforeDestroy() {
    bus.$off("GraphDateRange");
    bus.$off("GraphModalClosed");
    bus.$off("TableDateRange");
    bus.$off("TableModalClosed");
    bus.$off("Loaded");
    clearInterval(this.polling);
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
    // Simulation using sockets
    // this.pollData();
  },

  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    pollData() {
      this.polling = setInterval(() => {
        // Simulation using sockets
        this.$store.dispatch("RETRIEVE_DATA_FROM_STORE");
      }, 1000);
    },
    Graf(event, device) {
      this.selected = device;
      this.temperatura.forEach(element => {
        this.Frizideri.forEach(fridge => {
          if (
            JSON.stringify(fridge._id) === JSON.stringify(element.frizider._id)
          ) {
          } else {
          }
        });
      });
      bus.$emit("GraphSelected"); // No action.

      this.timeOd =
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(1, 5) +
        "-" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(6, 8) +
        "-" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(9, 11) +
        "T00:00:00.000Z";
      this.timeDo =
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(1, 5) +
        "-" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(6, 8) +
        "-" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(9, 11) +
        "T" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(12, 17) +
        ":00.000Z";

      this.pripremiPodatkeLineChart(device);
    },
    Table(event, device) {
      this.timeOd =
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(1, 5) +
        "-" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(6, 8) +
        "-" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(9, 11) +
        "T00:00:00.000Z";
      this.timeDo =
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(1, 5) +
        "-" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(6, 8) +
        "-" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(9, 11) +
        "T" +
        JSON.stringify(
          new Date(
            new Date(Date.now()).getTime() -
              new Date(Date.now()).getTimezoneOffset() * 60000
          ).toISOString()
        ).slice(12, 17) +
        ":00.000Z";

      var date_data = {
        from: this.timeOd,
        to: this.timeDo
      };

      bus.$emit("TableDateData", date_data);

      this.selected = device;

      this.noTableData = false;
      this.logs = [];

      http
        .post("loger/graph", {
          data: device,
          from: this.timeOd,
          to: this.timeDo,
          origin: "test",
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            var dates = [];

            res.data.graphdata.vrijeme.forEach(element => {
              dates.push(
                JSON.stringify(
                  new Date(
                    new Date(element).getTime() -
                      new Date(element).getTimezoneOffset() * 60000
                  ).toISOString()
                ).slice(9, 11) +
                  "." +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(6, 8) +
                  "." +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(1, 5) +
                  " " +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(12, 17)
              );
            });

            this.range_min = dates[0];
            this.range_max = dates[dates.length - 1];

            bus.$emit("TableSelected");

            this.logs = res.data.logs;
            if (!this.tableModalOpened) {
              this.tableModalOpened = true;
              this.$refs.staticModalTable.open();
            }
          } else {
            this.noTableData = true;
            if (!this.tableModalOpened) {
              this.tableModalOpened = true;
              this.$refs.staticModalTable.open();
            }
          }
        });
    },
    Izvjestaj($event, device) {
      // console.warn("Report.");
    },
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    pripremiPodatkeLineChart: function(data) {
      var date_data = {
        from: this.timeOd,
        to: this.timeDo
      };

      bus.$emit("GraphDateData", date_data);

      this.selected = data;
      this.isLoading = true;
      this.loadedChart = false;
      this.noData = false;

      http
        .post("loger/graph", {
          data: data,
          from: this.timeOd,
          to: this.timeDo,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            let palette = store.getters.palette;

            this.optionsLineChart = {
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: ""
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    gridLines: {
                      display: true,
                      color: "#eee"
                    }
                  }
                ],
                yAxes: [
                  {
                    display: true,
                    ticks: {
                      beginAtZero: false
                    },
                    gridLines: {
                      display: true,
                      color: "#eee"
                    },

                    scaleLabel: {
                      display: true,
                      labelString: "Temperatura ( °C )"
                    }
                  }
                ]
              },
              annotation: {
                annotations: [
                  {
                    type: "line",
                    mode: "horizontal",
                    scaleID: "y-axis-0",
                    borderColor: palette.danger,
                    value: res.data.graphdata.refd[0],
                    label: {
                      content: "Donja granična vrijednost",
                      enabled: false
                    }
                  },
                  {
                    type: "line",
                    mode: "horizontal",
                    scaleID: "y-axis-0",
                    borderColor: palette.danger,
                    value: res.data.graphdata.refg[0],
                    label: {
                      content: "Gornja granična vrijednost",
                      enabled: false
                    }
                  }
                ]
              }
            };

            var kontrola = [];

            res.data.graphdata.temperatura.forEach(element => {
              if (
                Number(element) < Number(res.data.graphdata.refd[0]) ||
                Number(element) > Number(res.data.graphdata.refg[0])
              ) {
                kontrola.push(palette.danger);
              } else if (
                Number(element) > Number(res.data.graphdata.refd[0]) &&
                Number(element) < Number(res.data.graphdata.refg[0])
              ) {
                kontrola.push(palette.primary);
              } else {
                kontrola.push(palette.warning);
              }
            });

            var dates = [];

            res.data.graphdata.vrijeme.forEach(element => {
              dates.push(
                JSON.stringify(
                  new Date(
                    new Date(element).getTime() -
                      new Date(element).getTimezoneOffset() * 60000
                  ).toISOString()
                ).slice(9, 11) +
                  "." +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(6, 8) +
                  "." +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(1, 5) +
                  " " +
                  JSON.stringify(
                    new Date(
                      new Date(element).getTime() -
                        new Date(element).getTimezoneOffset() * 60000
                    ).toISOString()
                  ).slice(12, 17)
              );
            });

            this.range_min = dates[0];
            this.range_max = dates[dates.length - 1];

            this.lineChartDataTemp = {
              labels: dates,
              datasets: [
                {
                  label: this.selected.naziv,
                  backgroundColor: utils.hex2rgb(palette.primary, 0.4).css,
                  pointBorderColor: kontrola,
                  pointBackgroundColor: kontrola,
                  borderColor: palette.transparent,
                  data: res.data.graphdata.temperatura
                }
              ]
            };

            if (!this.graphModalOpened && !this.tableModalOpened) {
              this.graphModalOpened = true;
              this.$refs.staticModalGraph.open();
            }

            setTimeout(() => {
              this.isLoading = false;
            }, 300);

            return this.lineChartDataTemp;
          } else {
            this.noData = true;

            if (!this.graphModalOpened && !this.tableModalOpened) {
              this.graphModalOpened = true;
              this.$refs.staticModalGraph.open();
            }

            setTimeout(() => {
              this.isLoading = false;
            }, 300);
          }
        });
    },
    DeviceStatus() {
      var offline = {};
      var found = false;
      var counter = 0;
      this.temperatura = [];
      this.Offline = [];

      if (this.$store.state.temperatura.length) {
        this.Frizideri.forEach(fridge => {
          counter = 0;
          found = false;
          this.$store.state.temperatura.forEach(element => {
            counter++;
            if (
              JSON.stringify(fridge._id) ===
              JSON.stringify(element.frizider._id)
            ) {
              found = true;
              this.temperatura.push(element);
            }

            if (!found && counter === this.$store.state.temperatura.length) {
              offline = {
                slave_id: fridge.slave_id,
                active: false,
                temperatura: "-",
                vlaznost: "-",
                naziv: fridge.ime,
                _id: fridge._id,
                frizider: fridge
              };
              this.Offline.push(offline);
              this.temperatura.push(offline);
              offline = {};
            }
          });
        });
      } else {
        this.Frizideri.forEach(fridge => {
          offline = {
            slave_id: fridge.slave_id,
            active: false,
            temperatura: "-",
            vlaznost: "-",
            naziv: fridge.ime,
            _id: fridge._id,
            frizider: fridge
          };
          this.Offline.push(offline);
          offline = {};
        });
        this.temperatura = this.Offline;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables.scss";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";

.progress-bars {
  .vuestic-progress-bar {
    .progress.thick {
      margin-top: calc(#{$progress-bar-width-thick} / 2 - 0.125rem);
    }
    .progress.thin {
      margin-top: 0.125rem;
    }
  }

  .vertical,
  .circle {
    margin-top: 1.25rem;
    margin-left: 0.125rem;
  }
}

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

.widget.simple-vertical-wizard-widget {
  .widget-body {
    padding: 0 $widget-padding;
    @include media-breakpoint-down(sm) {
      padding: $widget-padding 0;
    }
  }
}

.form-wizard-page {
  .form-group {
    min-width: 200px;
    max-width: 360px;
    width: 80%;
  }
}

.minHeight {
  min-height: 350px;
}

/* .maxHeight {
  max-height: 650px;
} */

.visina {
  height: 480px;
  line-height: 480px;
}

.chart-container {
  padding: 0 2rem;
  height: 24rem;
}

span:hover {
  color: #e34a4a !important;
}

.circle {
  width: 1rem;
  opacity: 0.5;
  height: 1rem;
  border-radius: 50%;
  display: inline-block;
}
</style>
