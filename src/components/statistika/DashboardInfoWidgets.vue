<template>
  <div class="row dashboard-info-widgets">
    <!-- Poliklinika Eurofarm Centar - Poslovna jedinica Centralna laboratorija -->
    <div
      v-show="
        $store.state.dashboard != undefined && $store.state.dashboard.PJC
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '5c69f68c338fe912f99f833b',
          'blue-widget': $store.state.site != '5c69f68c338fe912f99f833b',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "PJC" }}
            </div>
            <!-- Data Loaded -->
            <div v-if="(PJC.rt > 0 || PJC.ag) && loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJC.rt > 0" style="color: #e34a4a">{{
                PJC.rt
              }}</span>
              <span v-show="PJC.rt === 0" style="color: #4ae387">{{
                PJC.rt
              }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span v-show="PJC.ag > 0" style="color: #e34a4a">{{
                PJC.ag
              }}</span>
              <span v-show="PJC.ag === 0" style="color: #4ae387">{{
                PJC.ag
              }}</span>
            </div>
            <!-- No Data Found -->
            <div
              v-if="PJC.rt === 0 && PJC.ag === 0 && loaded"
              class="stats-number"
            >
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span style="color: #4ae387">{{ PJC.rt }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span style="color: #4ae387">{{ PJC.ag }}</span>
            </div>
            <!-- Data Not Loaded -->
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Međunarodni aerodrom Sarajevo -->
    <div
      v-show="
        $store.state.dashboard != undefined && $store.state.dashboard.SJJ
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '5f9f705e444e51a464db2543',
          'blue-widget': $store.state.site != '5f9f705e444e51a464db2543',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "SJJ" }}
            </div>
            <!-- Data Loaded -->
            <div v-if="(SJJ.rt > 0 || SJJ.ag) && loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="SJJ.rt > 0" style="color: #e34a4a">{{
                SJJ.rt
              }}</span>
              <span v-show="SJJ.rt === 0" style="color: #4ae387">{{
                SJJ.rt
              }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span v-show="SJJ.ag > 0" style="color: #e34a4a">{{
                SJJ.ag
              }}</span>
              <span v-show="SJJ.ag === 0" style="color: #4ae387">{{
                SJJ.ag
              }}</span>
            </div>
            <!-- No Data Found -->
            <div
              v-if="SJJ.rt === 0 && SJJ.ag === 0 && loaded"
              class="stats-number"
            >
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span style="color: #4ae387">{{ SJJ.rt }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span style="color: #4ae387">{{ SJJ.ag }}</span>
            </div>
            <!-- Data Not Loaded -->
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Međunarodni aerodrom Sarajevo -->
    <div
      v-show="
        $store.state.dashboard != undefined && $store.state.dashboard.PJC && $store.state.userId != 'Administrator'
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="danger-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "SJJ" }}
            </div>
            <!-- Data Loaded -->
            <div v-if="(SJJ.rt > 0 || SJJ.ag) && loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="SJJ.rt > 0" style="color: #e34a4a">{{
                SJJ.rt
              }}</span>
              <span v-show="SJJ.rt === 0" style="color: #4ae387">{{
                SJJ.rt
              }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span v-show="SJJ.ag > 0" style="color: #e34a4a">{{
                SJJ.ag
              }}</span>
              <span v-show="SJJ.ag === 0" style="color: #4ae387">{{
                SJJ.ag
              }}</span>
            </div>
            <!-- No Data Found -->
            <div
              v-if="SJJ.rt === 0 && SJJ.ag === 0 && loaded"
              class="stats-number"
            >
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span style="color: #4ae387">{{ SJJ.rt }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span style="color: #4ae387">{{ SJJ.ag }}</span>
            </div>
            <!-- Data Not Loaded -->
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Međunarodni aerodrom Tuzla -->
    <div
      v-show="
        $store.state.dashboard != undefined && $store.state.dashboard.TZL
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '5f9f70a1444e51a464db259a',
          'blue-widget': $store.state.site != '5f9f70a1444e51a464db259a',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "TZL" }}
            </div>
            <!-- Data Loaded -->
            <div v-if="(TZL.rt > 0 || TZL.ag) && loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="TZL.rt > 0" style="color: #e34a4a">{{
                TZL.rt
              }}</span>
              <span v-show="TZL.rt === 0" style="color: #4ae387">{{
                TZL.rt
              }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span v-show="TZL.ag > 0" style="color: #e34a4a">{{
                TZL.ag
              }}</span>
              <span v-show="TZL.ag === 0" style="color: #4ae387">{{
                TZL.ag
              }}</span>
            </div>
            <!-- No Data Found -->
            <div
              v-if="TZL.rt === 0 && TZL.ag === 0 && loaded"
              class="stats-number"
            >
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span style="color: #4ae387">{{ TZL.rt }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span style="color: #4ae387">{{ TZL.ag }}</span>
            </div>
            <!-- Data Not Loaded -->
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Poliklinika Sunce - Zenica -->
    <div
      v-show="
        $store.state.dashboard != undefined && $store.state.dashboard.PSZ
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '5fb81465900f08738c6985e7',
          'blue-widget': $store.state.site != '5fb81465900f08738c6985e7',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "PSZ" }}
            </div>
            <!-- Data Loaded -->
            <div v-if="(PSZ.rt > 0 || PSZ.ag) && loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PSZ.rt > 0" style="color: #e34a4a">{{
                PSZ.rt
              }}</span>
              <span v-show="PSZ.rt === 0" style="color: #4ae387">{{
                PSZ.rt
              }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span v-show="PSZ.ag > 0" style="color: #e34a4a">{{
                PSZ.ag
              }}</span>
              <span v-show="PSZ.ag === 0" style="color: #4ae387">{{
                PSZ.ag
              }}</span>
            </div>
            <!-- No Data Found -->
            <div
              v-if="PSZ.rt === 0 && PSZ.ag === 0 && loaded"
              class="stats-number"
            >
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span style="color: #4ae387">{{ PSZ.rt }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span style="color: #4ae387">{{ PSZ.ag }}</span>
            </div>
            <!-- Data Not Loaded -->
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- PZU HBL Laboratorija - Istočno Sarajevo -->
    <div
      v-show="
        $store.state.dashboard != undefined && $store.state.dashboard.HLI
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '60508f5ff0a3cf9c7860f5ad',
          'blue-widget': $store.state.site != '60508f5ff0a3cf9c7860f5ad',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "HLI" }}
            </div>
            <!-- Data Loaded -->
            <div v-if="(HLI.rt > 0 || HLI.ag) && loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLI.rt > 0" style="color: #e34a4a">{{
                HLI.rt
              }}</span>
              <span v-show="HLI.rt === 0" style="color: #4ae387">{{
                HLI.rt
              }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span v-show="HLI.ag > 0" style="color: #e34a4a">{{
                HLI.ag
              }}</span>
              <span v-show="HLI.ag === 0" style="color: #4ae387">{{
                HLI.ag
              }}</span>
            </div>
            <!-- No Data Found -->
            <div
              v-if="HLI.rt === 0 && HLI.ag === 0 && loaded"
              class="stats-number"
            >
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span style="color: #4ae387">{{ HLI.rt }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span style="color: #4ae387">{{ HLI.ag }}</span>
            </div>
            <!-- Data Not Loaded -->
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- HBL Laboratorija - Novo Sarajevo -->
    <div
      v-show="
        $store.state.dashboard != undefined && $store.state.dashboard.HLN
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '60508f95f0a3cf9c7860f5bd',
          'blue-widget': $store.state.site != '60508f95f0a3cf9c7860f5bd',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "HLN" }}
            </div>
            <!-- Data Loaded -->
            <div v-if="(HLN.rt > 0 || HLN.ag) && loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLN.rt > 0" style="color: #e34a4a">{{
                HLN.rt
              }}</span>
              <span v-show="HLN.rt === 0" style="color: #4ae387">{{
                HLN.rt
              }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span v-show="HLN.ag > 0" style="color: #e34a4a">{{
                HLN.ag
              }}</span>
              <span v-show="HLN.ag === 0" style="color: #4ae387">{{
                HLN.ag
              }}</span>
            </div>
            <!-- No Data Found -->
            <div
              v-if="HLN.rt === 0 && HLN.ag === 0 && loaded"
              class="stats-number"
            >
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span style="color: #4ae387">{{ HLN.rt }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span style="color: #4ae387">{{ HLN.ag }}</span>
            </div>
            <!-- Data Not Loaded -->
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- HBL Laboratorija - Dobrinja -->
    <div
      v-show="
        $store.state.dashboard != undefined && $store.state.dashboard.HLD
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '60509039f0a3cf9c7860f5e1',
          'blue-widget': $store.state.site != '60509039f0a3cf9c7860f5e1',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "HLD" }}
            </div>
            <!-- Data Loaded -->
            <div v-if="(HLD.rt > 0 || HLD.ag) && loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLD.rt > 0" style="color: #e34a4a">{{
                HLD.rt
              }}</span>
              <span v-show="HLD.rt === 0" style="color: #4ae387">{{
                HLD.rt
              }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span v-show="HLD.ag > 0" style="color: #e34a4a">{{
                HLD.ag
              }}</span>
              <span v-show="HLD.ag === 0" style="color: #4ae387">{{
                HLD.ag
              }}</span>
            </div>
            <!-- No Data Found -->
            <div
              v-if="HLD.rt === 0 && HLD.ag === 0 && loaded"
              class="stats-number"
            >
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span style="color: #4ae387">{{ HLD.rt }}</span>
              <span style="color: #282828; font-size: 22px">{{ " | " }}</span>
              <span style="color: #4ae387">{{ HLD.ag }}</span>
            </div>
            <!-- Data Not Loaded -->
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Podrška korisnicima -->

    <div v-show="true" class="col-md-6 col-xl-4">
      <vuestic-widget class="danger-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <strong
                >&nbsp;<span style="font-size: 20px; color: #e34a4a">{{
                  "atom.podrska@gmail.com"
                }}</span></strong
              >
            </div>
            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              &nbsp;<span style="font-size: 18px">{{
                "Podrška korisnicima"
              }}</span>
            </div>
            <div v-if="!loaded" style="color: #c0c0c0" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>
            <div class="stats-title">{{ " " }}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
import { http } from "../../../config/config.js";

export default {
  name: "dashboard-info-widgets",

  data() {
    return {
      show: true,
      loaded: false,
      PJC: 0,
      SJJ: 0,
      TZL: 0,
      PSZ: 0,
      HLI: 0,
      HLN: 0,
      HLD: 0,
    };
  },

  beforeMount() {
    http
      .get(
        "/statistika/data" +
          "?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        // console.log(res.data.data);
        this.PJC = res.data.data.PJC;
        this.SJJ = res.data.data.SJJ;
        this.TZL = res.data.data.TZL;
        this.PSZ = res.data.data.PSZ;
        this.HLI = res.data.data.HLI;
        this.HLN = res.data.data.HLN;
        this.HLD = res.data.data.HLD;
        this.loaded = true;
      });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
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
