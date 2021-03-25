<template>
  <div class="dashboard" v-show="$store.state.access != undefined">
    <div class="row" v-if="loadedData">
      <div class="col-md-6 col-xl-3" v-for="(data,index) in Data" :key="index">
        <vuestic-widget :headerText="data.site.sifra + ' | ' + data.site.naziv" class="info-widget" style="border-top-color: #4ae387;">
          <div class="info-widget-inner">
            Zaprimljeno uzoraka: {{data.ZaprimljenoUzoraka + data.KompletiranoUzoraka}}
            <br />
            Kompletirano uzoraka: {{data.KompletiranoUzoraka}}
            <br />
            Ukupno testova: {{data.UkupnoTestova}}
            <br />
            Kompletirano testova: {{data.KompletiranoTestova}} ({{data.Procenat}}%)
            <br />
            Ukupno pacijenata: {{data.UkupnoPacijenata}}
            <br />
          </div>
        </vuestic-widget>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

export default {
  name: "dashboard",

  data() {
    return {
      show: true,
      loadedData: false,

      site: {},
      sites: [],

      Data: [],

      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  components: {
    Loading
  },
  watch: {
    show: function() {}
  },

  created() {
    this.isLoading = true;
    // console.log(this.$store.state.sites);

    http
      .get(
        "postavke/list/sites?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        var obj = {
          site: null,
          ZaprimljenoUzoraka: 0,
          KompletiranoUzoraka: 0,
          UkupnoTestova: 0,          
          KompletiranoTestova: 0,
          Procenat: 0,
          UkupnoPacijenata: 0
        };

        this.$store.state.sites.forEach(site => {
          res.data.sites.forEach(element => {
            if (this.$store.state.site == element._id) {
              this.site = element;
            }
            if (site == element._id) {
              this.sites.push(element);

              obj = {
                site: element,
                ZaprimljenoUzoraka: 0,
                KompletiranoUzoraka: 0,
                UkupnoTestova: 0,
                KompletiranoTestova: 0,
                Procenat: 0,
                UkupnoPacijenata: 0
              };

              this.Data.push(obj);

              obj = {
                site: null,
                ZaprimljenoUzoraka: 0,
                KompletiranoUzoraka: 0,
                UkupnoTestova: 0,
                KompletiranoTestova: 0,
                Procenat: 0,
                UkupnoPacijenata: 0
              };
            }
          });
        });

        http
          .get(
            "/dashboard/data?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site,
            { params: { sites: this.$store.state.sites } }
          )
          .then(res => {
            // console.log(res.data);

            var counter = 0;
            var Zaprimljen = 0;
            var Odobren = 0;
            var perCompleted = 0;

            this.Data.forEach(element => {
              counter = 0;
              Zaprimljen = 0;
              Odobren = 0;
              res.data.Samples.forEach(sample => {
                counter++;

                if (element.site._id == sample.site) {
                  if (sample.status == "Odobren") {
                    Odobren++;
                  } else {
                    Zaprimljen++;
                  }
                  element.UkupnoTestova += sample.tests.Ukupno;
                  element.KompletiranoTestova += sample.tests.Realizovano;
                }

                if (counter === res.data.Samples.length) {
                  element.ZaprimljenoUzoraka = Zaprimljen;
                  element.KompletiranoUzoraka = Odobren;

                  perCompleted = 0;
                  if (element.UkupnoTestova > 0) {
                    perCompleted =
                      element.KompletiranoTestova / element.UkupnoTestova;
                  }

                  element.Procenat = (perCompleted * 100).toFixed(2);
                  if (element.Procenat % 1 == 0)
                    element.Procenat = parseInt(element.Procenat, 10);
                }
              });

              res.data.Patients.forEach(patient => {
                if (element.site._id == patient.site) {
                  element.UkupnoPacijenata++;
                }
              });
            });

            // console.log(this.Data);

            this.loadedData = true;
            this.isLoading = false;
          });
      });
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {}
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
.stats-number,
.stats-title {
  line-height: 1;
}

.info-widget-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  &.has-chart {
    justify-content: space-between;
  }
  .stats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
}

.stats-number {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 2.625rem;
  margin-bottom: 0.5rem;
  .stats-icon {
    font-size: 1.5625rem;
    position: absolute;
    top: 0.625rem;
    left: -1.25rem;
    &.icon-wide {
      left: -1.875rem;
    }
  }
}
</style>
