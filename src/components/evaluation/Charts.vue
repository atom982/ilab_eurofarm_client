<template>
  <div class="charts-page">
    <div v-show="!report_pdf" class="row">
      <div class="col-md-12">
        <vuestic-widget-bubble
          :patient="patient"
          :datum_rodjenja="datum_rodjenja"
          :headerText="header"
          style="min-height: 420px;"
        >
          <div class="row">
            <div class="col-md-4">
              <vuestic-simple-select-bubble
                v-if="labassays.length"
                label="Izbor analize"
                v-model="labassay"
                v-bind:options="labassays"
              />
              <span v-if="!labassays.length" style="color: #e34a4a;">{{nodata}}</span>
              <!-- <div
                style="display:flex; flex-direction: row; justify-content: center; align-items: center"
                v-if="!labassays.length "
              >
                <div style="float:left;"></div>
                <span style="vertical-align:middle; ">
                  <hollow-dots-spinner
                    style="opacity: 0.25;"
                    :animation-duration="1000"
                    :size="370"
                    :color="'#4ae387'"
                  />
                </span>
                <div style="float:right;"></div>
              </div>-->
            </div>
            <div class="col-md-8">
              <button
                v-if="$store.state.access.level < 1 && show_pdf"
                style="text-transform: none; border: 0px; border-radius: 0px;"
                :disabled="!labassay.length || !Results.length"
                class="btn btn-secondary btn-sm"
                @click.prevent="PdfReport()"
              >
                <span class="fa fa-file-pdf-o"></span>
                {{ ' PDF Izvještaj'}}&nbsp;&nbsp;
              </button>
            </div>
          </div>

          <div class="row" v-if="labassay.length && Results.length">
            <div class="col-md-12">
              <div class="table-responsive">
                <table class="table table-striped table-sm color-icon-label-table">
                  <thead>
                    <tr align="middle">
                      <td width="20%">{{'REZULTAT'}}</td>
                      <td width="20%">{{'JEDINICA'}}</td>
                      <td width="20%">{{'REFERENCE'}}</td>
                      <td width="20%">{{'DATUM'}}</td>
                      <td width="15%">{{'VRIJEME'}}</td>
                      <td width="5%" align="middle"></td>
                    </tr>
                  </thead>
                  <tbody>
                    <!--  -->
                    <tr
                      align="middle"
                      v-for="(element, index) in Results"
                      :key="index"
                      v-bind:class="{
                          'table-danger': Interpretacija(element.analit, element.rezultat, element.jedinica, element.refd, element.refg, $store.state.site, element.interp, element.extend, spec)[5] === 'Red', 
                          'table-success': Interpretacija(element.analit, element.rezultat, element.jedinica, element.refd, element.refg, $store.state.site, element.interp, element.extend, spec)[5] === 'Green',
                          'table-warning': Interpretacija(element.analit, element.rezultat, element.jedinica, element.refd, element.refg, $store.state.site, element.interp, element.extend, spec)[5] === 'Yellow'
                        }"
                    >
                      <td width="19%">{{element.rezultat}}</td>
                      <td width="19%">{{element.jedinica}}</td>
                      <td
                        width="19%"
                      >{{Interpretacija(element.analit, element.rezultat, element.jedinica, element.refd, element.refg, $store.state.site, element.interp, element.extend, spec)[4]}}</td>
                      <td width="19%">{{element.datum}}</td>
                      <td width="15%">{{element.vrijeme}}</td>
                      <td width="9%" align="middle">
                        <i
                          v-bind:class="{'fa fa-exclamation-triangle icon-right input-icon error-icon' : Interpretacija(element.analit, element.rezultat, element.jedinica, element.refd, element.refg, $store.state.site, element.interp, element.extend, spec)[5] === 'Red'}"
                        ></i>
                        <i
                          v-bind:class="{'fa fa-check success-icon icon-right input-icon' : Interpretacija(element.analit, element.rezultat, element.jedinica, element.refd, element.refg, $store.state.site, element.interp, element.extend, spec)[5] === 'Green'}"
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="row" v-if="showLineChart">
            <div class="col-md-12">
              <hr>
            </div>
          </div>

          <div class="row" v-if="showLineChart">
            <div class="col-md-12">
              <line-chart :options="optionsLineChart" :data="dataLineChart" type="line"></line-chart>
            </div>
          </div>
        </vuestic-widget-bubble>
      </div>
    </div>

    <div v-show="report_pdf" class="row">
      <div class="col-md-12">
        <div class="btn-container">
          <button class="btn btn-secondary btn-sm" @click.prevent="Nazad">
            <span class="fa fa-step-backward"></span>
            {{ ' NAZAD'}}
          </button>
          <span class="blockquote">
            <!-- {{ labassay }} -->
          </span>
        </div>
        <hr>

        <div id="pdf-container"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { AtomSpinner } from "epic-spinners";
import { HollowDotsSpinner } from "epic-spinners";
import BubbleChart from "../vuestic-components/vuestic-chart/chart-types/BubbleChart";
import LineChart from "../vuestic-components/vuestic-chart/chart-types/LineChart";
import { Interpretation } from "../obrada/functions/reference.js";
import { http } from "../../../config/config.js";
import store from "vuex-store";
import utils from "services/utils";
import router from "../../router";
import { bus } from "../../main";
import PDFObject from "pdfobject";
import { server } from "../../../config/config.js";

export default {
  name: "evaluation",
  components: {
    AtomSpinner,
    HollowDotsSpinner,
    LineChart
  },
  data() {
    return {
      header: "",
      nodata: "",
      labassays: [],
      testovi: [],
      labassay: "",
      test: "",
      patient: {},
      datum_rodjenja: "",
      createdResults: [],
      Results: [],
      spec: "*",
      showLineChart: false,
      optionsLineChart: {},
      dataLineChart: {},

      picked: false,
      report_pdf: false,
      show_pdf: false
    };
  },
  beforeCreate() {
    http
      .get(
        "pacijenti/detalji/" +
          this.$route.params.id +
          "?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        var datum =
          res.data.pacijent.jmbg.substring(0, 2) +
          "." +
          res.data.pacijent.jmbg.substring(2, 4) +
          ".";
        var godiste = res.data.pacijent.jmbg.substring(4, 7);

        switch (godiste[0]) {
          case "9":
            godiste = "1" + godiste;
            break;
          case "0":
            godiste = "2" + godiste;
            break;

          default:
            break;
        }

        if (datum.includes("01.01") && godiste == "1920") {
          this.datum_rodjenja = "Nema podataka.";
          this.header = res.data.pacijent.ime + " " + res.data.pacijent.prezime;
        } else if (datum.includes("00.00")) {
          this.datum_rodjenja = godiste;
          this.header = res.data.pacijent.ime + " " + res.data.pacijent.prezime;
        } else {
          this.datum_rodjenja = datum + godiste;
          this.header = res.data.pacijent.ime + " " + res.data.pacijent.prezime;
        }

        this.patient = res.data.pacijent;
      });
  },
  created() {
    http
      .get(
        "postavke/labtest/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.testovi = res.data.testovi;

        http
          .get(
            "/evaluation/bubble" +
              "?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site +
              "&patient=" +
              this.$route.params.id,
            {}
          )
          .then(response => {
            if (response.data.Results.length) {
              this.createdResults = response.data.Results;
              var obj = {};
              var Niz = [];

              response.data.Results.forEach(element => {
                element.rezultati.forEach(rez => {
                  if (
                    !Niz.filter(labassay => labassay === rez.labassay).length >
                    0
                  ) {
                    Niz.push(rez.labassay);
                  }
                });
              });

              this.testovi.forEach(element => {
                var naziv = element.naziv + " | " + element.analit;
                Niz.forEach(test => {
                  if (
                    test === element._id &&
                    !element.multi &&
                    !element.calculated
                  ) {
                    if (
                      !this.labassays.filter(labassay => labassay === naziv)
                        .length > 0
                    ) {
                      this.labassays.push(
                        element.naziv + " | " + element.analit
                      );
                    }
                  }
                });
              });

              if (this.labassays.length) {
                this.labassays = this.labassays.sort(function(a, b) {
                  return a.localeCompare(b, undefined, {
                    numeric: true,
                    sensitivity: "base"
                  });
                });
              } else {
                this.nodata = "Nema podataka.";
              }
            } else {
              this.nodata = "Nema podataka.";
            }

            if (this.nodata != "Nema podataka.") {
              this.show_pdf = true;
            }
          });
      });
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    labassay() {
      this.showLineChart = false;
      let palette = store.getters.palette;

      this.testovi.forEach(element => {
        if (element.naziv === this.labassay.split("|")[0].trim()) {
          this.test = element._id;
          this.Results = [];
          var obj = {};
          var count = 0;
          this.createdResults.forEach(element => {
            count++;

            element.rezultati.forEach(rez => {
              if (
                rez.labassay === this.test &&
                element.verificiran &&
                rez.rezultat[rez.rezultat.length - 1].rezultat_f.trim() != ""
              ) {
                obj.rezultat = rez.rezultat[rez.rezultat.length - 1].rezultat_f;
                obj.jedinica = rez.rezultat[rez.rezultat.length - 1].jedinice_f;
                obj.analit = "";
                obj.interp = rez.interp;
                obj.extend = rez.extend;
                obj.refd = rez.refd;
                obj.refg = rez.refg;
                obj.sid = element.id;
                obj.updated_at =
                  rez.rezultat[rez.rezultat.length - 1].updated_at;

                var datum =
                  JSON.stringify(
                    rez.rezultat[rez.rezultat.length - 1].updated_at
                  ).slice(9, 11) +
                  "." +
                  JSON.stringify(
                    rez.rezultat[rez.rezultat.length - 1].updated_at
                  ).slice(6, 8) +
                  "." +
                  JSON.stringify(
                    rez.rezultat[rez.rezultat.length - 1].updated_at
                  ).slice(1, 5);
                var time = JSON.stringify(
                  new Date(
                    new Date(
                      rez.rezultat[rez.rezultat.length - 1].updated_at
                    ).getTime() -
                      new Date(
                        rez.rezultat[rez.rezultat.length - 1].updated_at
                      ).getTimezoneOffset() *
                        60000
                  ).toISOString()
                ).substring(12, 17);

                obj.datum = datum;
                obj.vrijeme = time;
                obj.kontrola = this.Interpretacija(
                  "",
                  obj.rezultat,
                  obj.jedinica,
                  obj.refd,
                  obj.refg,
                  this.$store.state.site,
                  obj.interp,
                  obj.extend,
                  this.spec
                )[5];

                this.Results.push(obj);
                obj = {};
              }
            });

            if (count == this.createdResults.length) {
              this.Results.sort(function(a, b) {
                return Date.parse(a.updated_at) == Date.parse(b.updated_at)
                  ? 0
                  : +(Date.parse(a.updated_at) > Date.parse(b.updated_at)) ||
                      -1;
              });
              // Line Chart

              if (this.Results.length) {
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
                        gridLines: {
                          display: true,
                          color: "#eee"
                        }
                      }
                    ]
                  }
                };

                var labels = [];
                var kontrola = [];
                var data = [];
                var temp = "";

                this.Results.forEach(element => {
                  if (!isNaN(element.rezultat.trim())) {
                    switch (element.kontrola) {
                      case "Red":
                        kontrola.push(palette.danger);
                        break;
                      case "Green":
                        kontrola.push(palette.primary);
                        break;
                      case "Yellow":
                        kontrola.push(palette.warning);
                        break;

                      default:
                        kontrola.push(palette.info);
                        break;
                    }

                    labels.push(element.datum);
                    data.push(element.rezultat);
                  }
                });

                this.dataLineChart = {
                  labels: labels,
                  datasets: [
                    {
                      label: this.labassay.split("|")[1].trim(),
                      backgroundColor: utils.hex2rgb(palette.info, 0.5).css,
                      pointBorderColor: kontrola,
                      pointBackgroundColor: kontrola,
                      borderColor: palette.transparent,
                      data: data
                    }
                  ]
                };

                if (data.length) {
                  this.showLineChart = true;
                }
              }
            }
          });
        }
      });
    }
  },

  methods: {
    Povratak() {
      router.push("/prijem");
    },
    Nazad: function() {
      this.report_pdf = false;
    },
    PdfReport() {
      this.report_pdf = true;
      var options = {
        width: "100%",
        height: "800px"
      };

      var url = server + "evaluation/" + "pdf_sample.pdf";

      PDFObject.embed(url, "#pdf-container", options);
    },
    LabAssays: function() {},

    /* Interpretacija: function(test, rezultat, jedinica, refd, refg, site, interp, extend, spec) {
      return Interpretation(test, rezultat, jedinica, refd, refg, site, interp, extend, spec);
    }, */

    Interpretacija: function(
      test,
      rezultat,
      jedinica,
      refd,
      refg,
      site,
      interp,
      extend,
      spec
    ) {
      return Interpretation(
        test,
        rezultat,
        jedinica,
        refd,
        refg,
        site,
        interp,
        extend,
        spec
      );
    }
  }
};
</script>

<style lang='scss'>
@import "../../sass/_variables.scss";

.vuestic-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    height: 100%;
    width: 100%;
  }

  canvas {
    width: 100%;
    height: auto;
  }
}

.widget.chart-widget {
  .widget-body {
    height: 550px;
  }
}
</style>
