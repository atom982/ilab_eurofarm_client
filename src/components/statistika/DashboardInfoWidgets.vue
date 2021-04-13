<template>
  <div class="row dashboard-info-widgets">
    <!-- Podružnica Centralna Laboratorija, Sarajevo -->

    <div
      v-show="
        $store.state.site === '5c69f68c338fe912f99f833b' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJC
      "
      class="col-md-6 col-xl-12"
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
              {{ "Podružnica Centralna Laboratorija, Sarajevo" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5c69f68c338fe912f99f833b' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJC
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJC.rt > 0" style="color: #e34a4a">{{
                PJC.rt
              }}</span>
              <span v-show="PJC.rt === 0" style="color: #4ae387">{{
                PJC.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5c69f68c338fe912f99f833b' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJC
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJC.ag > 0" style="color: #e34a4a">{{
                PJC.ag
              }}</span>
              <span v-show="PJC.ag === 0" style="color: #4ae387">{{
                PJC.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5c69f68c338fe912f99f833b' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJC
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJC.at > 0" style="color: #e34a4a">{{
                PJC.at
              }}</span>
              <span v-show="PJC.at === 0" style="color: #4ae387">{{
                PJC.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Međunarodni aerodrom Sarajevo -->

    <div
      v-show="
        $store.state.site === '5f9f705e444e51a464db2543' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.SJJ
      "
      class="col-md-6 col-xl-12"
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
              {{ "Međunarodni aerodrom Sarajevo" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5f9f705e444e51a464db2543' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.SJJ
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="SJJ.rt > 0" style="color: #e34a4a">{{
                SJJ.rt
              }}</span>
              <span v-show="SJJ.rt === 0" style="color: #4ae387">{{
                SJJ.rt
              }}</span>

              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5f9f705e444e51a464db2543' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.SJJ
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="SJJ.ag > 0" style="color: #e34a4a">{{
                SJJ.ag
              }}</span>
              <span v-show="SJJ.ag === 0" style="color: #4ae387">{{
                SJJ.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5f9f705e444e51a464db2543' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.SJJ
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="SJJ.at > 0" style="color: #e34a4a">{{
                SJJ.at
              }}</span>
              <span v-show="SJJ.at === 0" style="color: #4ae387">{{
                SJJ.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Međunarodni aerodrom Tuzla -->

    <div
      v-show="
        $store.state.site === '5f9f70a1444e51a464db259a' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.TZL
      "
      class="col-md-6 col-xl-12"
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
              {{ "Međunarodni aerodrom Tuzla" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5f9f70a1444e51a464db259a' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.TZL
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="TZL.rt > 0" style="color: #e34a4a">{{
                TZL.rt
              }}</span>
              <span v-show="TZL.rt === 0" style="color: #4ae387">{{
                TZL.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5f9f70a1444e51a464db259a' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.TZL
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="TZL.ag > 0" style="color: #e34a4a">{{
                TZL.ag
              }}</span>
              <span v-show="TZL.ag === 0" style="color: #4ae387">{{
                TZL.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5f9f70a1444e51a464db259a' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.TZL
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="TZL.at > 0" style="color: #e34a4a">{{
                TZL.at
              }}</span>
              <span v-show="TZL.at === 0" style="color: #4ae387">{{
                TZL.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Poliklinika Sunce - Zenica -->

    <div
      v-show="
        $store.state.site === '5fb81465900f08738c6985e7' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PSZ
      "
      class="col-md-6 col-xl-12"
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
              {{ "Poliklinika Sunce - Zenica" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5fb81465900f08738c6985e7' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PSZ
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PSZ.rt > 0" style="color: #e34a4a">{{
                PSZ.rt
              }}</span>
              <span v-show="PSZ.rt === 0" style="color: #4ae387">{{
                PSZ.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5fb81465900f08738c6985e7' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PSZ
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PSZ.ag > 0" style="color: #e34a4a">{{
                PSZ.ag
              }}</span>
              <span v-show="PSZ.ag === 0" style="color: #4ae387">{{
                PSZ.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '5fb81465900f08738c6985e7' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PSZ
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PSZ.at > 0" style="color: #e34a4a">{{
                PSZ.at
              }}</span>
              <span v-show="PSZ.at === 0" style="color: #4ae387">{{
                PSZ.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!--

    -->

    <!-- PZU HBL Laboratorija - Istočno Sarajevo -->

    <div
      v-show="
        $store.state.site === '60508f5ff0a3cf9c7860f5ad' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLI
      "
      class="col-md-6 col-xl-12"
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
              {{ "PZU HBL Laboratorija - Istočno Sarajevo" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60508f5ff0a3cf9c7860f5ad' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLI
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLI.rt > 0" style="color: #e34a4a">{{
                HLI.rt
              }}</span>
              <span v-show="HLI.rt === 0" style="color: #4ae387">{{
                HLI.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60508f5ff0a3cf9c7860f5ad' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLI
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLI.ag > 0" style="color: #e34a4a">{{
                HLI.ag
              }}</span>
              <span v-show="HLI.ag === 0" style="color: #4ae387">{{
                HLI.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60508f5ff0a3cf9c7860f5ad' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLI
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLI.at > 0" style="color: #e34a4a">{{
                HLI.at
              }}</span>
              <span v-show="HLI.at === 0" style="color: #4ae387">{{
                HLI.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!--
      
    -->

    <!-- HBL Laboratorija - Novo Sarajevo -->

    <div
      v-show="
        $store.state.site === '60508f95f0a3cf9c7860f5bd' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLN
      "
      class="col-md-6 col-xl-12"
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
              {{ "HBL Laboratorija - Novo Sarajevo" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60508f95f0a3cf9c7860f5bd' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLN
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLN.rt > 0" style="color: #e34a4a">{{
                HLN.rt
              }}</span>
              <span v-show="HLN.rt === 0" style="color: #4ae387">{{
                HLN.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60508f95f0a3cf9c7860f5bd' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLN
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLN.ag > 0" style="color: #e34a4a">{{
                HLN.ag
              }}</span>
              <span v-show="HLN.ag === 0" style="color: #4ae387">{{
                HLN.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60508f95f0a3cf9c7860f5bd' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLN
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLN.at > 0" style="color: #e34a4a">{{
                HLN.at
              }}</span>
              <span v-show="HLN.at === 0" style="color: #4ae387">{{
                HLN.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!--
      
    -->

    <!-- HBL Laboratorija - Dobrinja -->

    <div
      v-show="
        $store.state.site === '60509039f0a3cf9c7860f5e1' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLD
      "
      class="col-md-6 col-xl-12"
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
              {{ "HBL Laboratorija - Dobrinja" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60509039f0a3cf9c7860f5e1' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLD
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLD.rt > 0" style="color: #e34a4a">{{
                HLD.rt
              }}</span>
              <span v-show="HLD.rt === 0" style="color: #4ae387">{{
                HLD.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60509039f0a3cf9c7860f5e1' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLD
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLD.ag > 0" style="color: #e34a4a">{{
                HLD.ag
              }}</span>
              <span v-show="HLD.ag === 0" style="color: #4ae387">{{
                HLD.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '60509039f0a3cf9c7860f5e1' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.HLD
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="HLD.at > 0" style="color: #e34a4a">{{
                HLD.at
              }}</span>
              <span v-show="HLD.at === 0" style="color: #4ae387">{{
                HLD.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!--
      
    -->

    <!-- Podružnica 1. Unitic, Sarajevo -->

    <div
      v-show="
        $store.state.site === '6068b249f68be9eab36b4fdb' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJU
      "
      class="col-md-6 col-xl-12"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '6068b249f68be9eab36b4fdb',
          'blue-widget': $store.state.site != '6068b249f68be9eab36b4fdb',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "Podružnica 1. Unitic, Sarajevo" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b249f68be9eab36b4fdb' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJU
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJU.rt > 0" style="color: #e34a4a">{{
                PJU.rt
              }}</span>
              <span v-show="PJU.rt === 0" style="color: #4ae387">{{
                PJU.rt
              }}</span>

              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b249f68be9eab36b4fdb' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJU
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJU.ag > 0" style="color: #e34a4a">{{
                PJU.ag
              }}</span>
              <span v-show="PJU.ag === 0" style="color: #4ae387">{{
                PJU.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b249f68be9eab36b4fdb' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJU
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJU.at > 0" style="color: #e34a4a">{{
                PJU.at
              }}</span>
              <span v-show="PJU.at === 0" style="color: #4ae387">{{
                PJU.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Podružnica 2. IUS, Sarajevo -->

    <div
      v-show="
        $store.state.site === '6068b2d5f68be9eab36b5003' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJI
      "
      class="col-md-6 col-xl-12"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '6068b2d5f68be9eab36b5003',
          'blue-widget': $store.state.site != '6068b2d5f68be9eab36b5003',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "Podružnica 2. IUS, Sarajevo" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b2d5f68be9eab36b5003' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJI
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJI.rt > 0" style="color: #e34a4a">{{
                PJI.rt
              }}</span>
              <span v-show="PJI.rt === 0" style="color: #4ae387">{{
                PJI.rt
              }}</span>

              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b2d5f68be9eab36b5003' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJI
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJI.ag > 0" style="color: #e34a4a">{{
                PJI.ag
              }}</span>
              <span v-show="PJI.ag === 0" style="color: #4ae387">{{
                PJI.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b2d5f68be9eab36b5003' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJI
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJI.at > 0" style="color: #e34a4a">{{
                PJI.at
              }}</span>
              <span v-show="PJI.at === 0" style="color: #4ae387">{{
                PJI.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Podružnica Visoko -->

    <div
      v-show="
        $store.state.site === '6068b346f68be9eab36b502f' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJV
      "
      class="col-md-6 col-xl-12"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '6068b346f68be9eab36b502f',
          'blue-widget': $store.state.site != '6068b346f68be9eab36b502f',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "Podružnica Visoko" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b346f68be9eab36b502f' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJV
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJV.rt > 0" style="color: #e34a4a">{{
                PJV.rt
              }}</span>
              <span v-show="PJV.rt === 0" style="color: #4ae387">{{
                PJV.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b346f68be9eab36b502f' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJV
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJV.ag > 0" style="color: #e34a4a">{{
                PJV.ag
              }}</span>
              <span v-show="PJV.ag === 0" style="color: #4ae387">{{
                PJV.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b346f68be9eab36b502f' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJV
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJV.at > 0" style="color: #e34a4a">{{
                PJV.at
              }}</span>
              <span v-show="PJV.at === 0" style="color: #4ae387">{{
                PJV.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Podružnica Tuzla -->

    <div
      v-show="
        $store.state.site === '6068b3b3f68be9eab36b5088' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJT
      "
      class="col-md-6 col-xl-12"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '6068b3b3f68be9eab36b5088',
          'blue-widget': $store.state.site != '6068b3b3f68be9eab36b5088',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "Podružnica Tuzla" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b3b3f68be9eab36b5088' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJT
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJT.rt > 0" style="color: #e34a4a">{{
                PJT.rt
              }}</span>
              <span v-show="PJT.rt === 0" style="color: #4ae387">{{
                PJT.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b3b3f68be9eab36b5088' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJT
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJT.ag > 0" style="color: #e34a4a">{{
                PJT.ag
              }}</span>
              <span v-show="PJT.ag === 0" style="color: #4ae387">{{
                PJT.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b3b3f68be9eab36b5088' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJT
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJT.at > 0" style="color: #e34a4a">{{
                PJT.at
              }}</span>
              <span v-show="PJT.at === 0" style="color: #4ae387">{{
                PJT.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Podružnica Goražde -->

    <div
      v-show="
        $store.state.site === '6068b471f68be9eab36b50f5' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJG
      "
      class="col-md-6 col-xl-12"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '6068b471f68be9eab36b50f5',
          'blue-widget': $store.state.site != '6068b471f68be9eab36b50f5',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "Podružnica Goražde" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b471f68be9eab36b50f5' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJG
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJG.rt > 0" style="color: #e34a4a">{{
                PJG.rt
              }}</span>
              <span v-show="PJG.rt === 0" style="color: #4ae387">{{
                PJG.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b471f68be9eab36b50f5' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJG
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJG.ag > 0" style="color: #e34a4a">{{
                PJG.ag
              }}</span>
              <span v-show="PJG.ag === 0" style="color: #4ae387">{{
                PJG.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b471f68be9eab36b50f5' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJG
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJG.at > 0" style="color: #e34a4a">{{
                PJG.at
              }}</span>
              <span v-show="PJG.at === 0" style="color: #4ae387">{{
                PJG.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Podružnica Bugojno -->

    <div
      v-show="
        $store.state.site === '6068b4fcf68be9eab36b511d' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJB
      "
      class="col-md-6 col-xl-12"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '6068b4fcf68be9eab36b511d',
          'blue-widget': $store.state.site != '6068b4fcf68be9eab36b511d',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "Podružnica Bugojno" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!--   <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b4fcf68be9eab36b511d' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJB
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJB.rt > 0" style="color: #e34a4a">{{
                PJB.rt
              }}</span>
              <span v-show="PJB.rt === 0" style="color: #4ae387">{{
                PJB.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b4fcf68be9eab36b511d' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJB
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJB.ag > 0" style="color: #e34a4a">{{
                PJB.ag
              }}</span>
              <span v-show="PJB.ag === 0" style="color: #4ae387">{{
                PJB.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b4fcf68be9eab36b511d' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJB
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJB.at > 0" style="color: #e34a4a">{{
                PJB.at
              }}</span>
              <span v-show="PJB.at === 0" style="color: #4ae387">{{
                PJB.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- Podružnica Trebinje -->

    <div
      v-show="
        $store.state.site === '6068b55df68be9eab36b5175' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJR
      "
      class="col-md-6 col-xl-12"
    >
      <vuestic-widget
        :class="{
          'info-widget': $store.state.site === '6068b55df68be9eab36b5175',
          'blue-widget': $store.state.site != '6068b55df68be9eab36b5175',
        }"
      >
        <div class="info-widget-inner">
          <div class="stats">
            <div v-if="true" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "Podružnica Trebinje" }}
            </div>

            <div v-if="!loaded" class="stats-number">
              <!--  <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>

            <div v-if="loaded" class="stats-number">
              <!-- <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="true"> &nbsp; </span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b55df68be9eab36b5175' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJR
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 RT PCR" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJR.rt > 0" style="color: #e34a4a">{{
                PJR.rt
              }}</span>
              <span v-show="PJR.rt === 0" style="color: #4ae387">{{
                PJR.rt
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b55df68be9eab36b5175' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJR
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antigen" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJR.ag > 0" style="color: #e34a4a">{{
                PJR.ag
              }}</span>
              <span v-show="PJR.ag === 0" style="color: #4ae387">{{
                PJR.ag
              }}</span>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <div
      v-show="
        $store.state.site === '6068b55df68be9eab36b5175' &&
        $store.state.dashboard != undefined &&
        $store.state.dashboard.PJR
      "
      class="col-md-6 col-xl-4"
    >
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
            <div class="stats-number">{{ "CoV2 Antitijela" }}</div>

            <div v-if="!loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              {{ "..." }}
            </div>

            <div v-if="loaded" class="stats-number">
              <i class="ion ion-arrow-up-c text-primary stats-icon"></i>
              <span v-show="PJR.at > 0" style="color: #e34a4a">{{
                PJR.at
              }}</span>
              <span v-show="PJR.at === 0" style="color: #4ae387">{{
                PJR.at
              }}</span>
              <!-- <span v-show="true" style="color: #e34a4a; font-size: 42px;"> {{ "∅" }}</span> -->
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>

    <!-- 








































































    -->

    <div
      v-show="
        $store.state.sites.length > 1 && $store.state.dashboard != undefined
      "
      class="col-md-6 col-xl-12"
    >
      <vuestic-widget class="blue-widget">
        <div class="table-responsive">
          <table class="table table-striped table-sm color-icon-label-table">
            <thead>
              <tr>
                <td style="text-transform: none; color: #4ab2e3;" width="7%">{{ "KOD" }}</td>
                <td style="text-transform: none; color: #4ab2e3;" width="33%">{{ "Naziv" }}</td>
                <td style="text-transform: none; color: #4ab2e3;" width="20%" align="middle">
                  {{ "CoV2 RT PCR" }}
                </td>
                <td style="text-transform: none; color: #4ab2e3;" width="20%" align="middle">
                  {{ "CoV2 Antigen" }}
                </td>
                <td style="text-transform: none; color: #4ab2e3;" width="20%" align="middle">
                  {{ "CoV2 Antitijela" }}
                </td>
              </tr>
            </thead>
            <tbody>
              
              <tr>
                <td>
                  <strong>{{ "PJC" }}</strong>
                </td>
                <td>
                  <strong>{{
                    "Podružnica Centralna Laboratorija, Sarajevo"
                  }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PJC.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PJC.rt }}</strong></span
                  >
                  <span v-show="PJC.rt === 0" style="color: #4ae387"
                    ><strong>{{ PJC.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJC.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PJC.ag }}</strong></span
                  >
                  <span v-show="PJC.ag === 0" style="color: #4ae387"
                    ><strong>{{ PJC.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJC.at > 0" style="color: #e34a4a"
                    ><strong>{{ PJC.at }}</strong></span
                  >
                  <span v-show="PJC.at === 0" style="color: #4ae387"
                    ><strong>{{ PJC.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "SJJ" }}</strong>
                </td>
                <td>
                  <strong>{{ "Međunarodni aerodrom Sarajevo" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="SJJ.rt > 0" style="color: #e34a4a"
                    ><strong>{{ SJJ.rt }}</strong></span
                  >
                  <span v-show="SJJ.rt === 0" style="color: #4ae387"
                    ><strong>{{ SJJ.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="SJJ.ag > 0" style="color: #e34a4a"
                    ><strong>{{ SJJ.ag }}</strong></span
                  >
                  <span v-show="SJJ.ag === 0" style="color: #4ae387"
                    ><strong>{{ SJJ.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="SJJ.at > 0" style="color: #e34a4a"
                    ><strong>{{ SJJ.at }}</strong></span
                  >
                  <span v-show="SJJ.at === 0" style="color: #4ae387"
                    ><strong>{{ SJJ.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "TZL" }}</strong>
                </td>
                <td>
                  <strong>{{ "Međunarodni aerodrom Tuzla" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="TZL.rt > 0" style="color: #e34a4a"
                    ><strong>{{ TZL.rt }}</strong></span
                  >
                  <span v-show="TZL.rt === 0" style="color: #4ae387"
                    ><strong>{{ TZL.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="TZL.ag > 0" style="color: #e34a4a"
                    ><strong>{{ TZL.ag }}</strong></span
                  >
                  <span v-show="TZL.ag === 0" style="color: #4ae387"
                    ><strong>{{ TZL.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="TZL.at > 0" style="color: #e34a4a"
                    ><strong>{{ TZL.at }}</strong></span
                  >
                  <span v-show="TZL.at === 0" style="color: #4ae387"
                    ><strong>{{ TZL.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "PSZ" }}</strong>
                </td>
                <td>
                  <strong>{{ "Poliklinika Sunce - Zenica" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PSZ.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PSZ.rt }}</strong></span
                  >
                  <span v-show="PSZ.rt === 0" style="color: #4ae387"
                    ><strong>{{ PSZ.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PSZ.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PSZ.ag }}</strong></span
                  >
                  <span v-show="PSZ.ag === 0" style="color: #4ae387"
                    ><strong>{{ PSZ.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PSZ.at > 0" style="color: #e34a4a"
                    ><strong>{{ PSZ.at }}</strong></span
                  >
                  <span v-show="PSZ.at === 0" style="color: #4ae387"
                    ><strong>{{ PSZ.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "HLI" }}</strong>
                </td>
                <td>
                  <strong>{{
                    "PZU HBL Laboratorija - Istočno Sarajevo"
                  }}</strong>
                </td>
                <td align="middle">
                  <span v-show="HLI.rt > 0" style="color: #e34a4a"
                    ><strong>{{ HLI.rt }}</strong></span
                  >
                  <span v-show="HLI.rt === 0" style="color: #4ae387"
                    ><strong>{{ HLI.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="HLI.ag > 0" style="color: #e34a4a"
                    ><strong>{{ HLI.ag }}</strong></span
                  >
                  <span v-show="HLI.ag === 0" style="color: #4ae387"
                    ><strong>{{ HLI.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="HLI.at > 0" style="color: #e34a4a"
                    ><strong>{{ HLI.at }}</strong></span
                  >
                  <span v-show="HLI.at === 0" style="color: #4ae387"
                    ><strong>{{ HLI.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "HLN" }}</strong>
                </td>
                <td>
                  <strong>{{ "HBL Laboratorija - Novo Sarajevo" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="HLN.rt > 0" style="color: #e34a4a"
                    ><strong>{{ HLN.rt }}</strong></span
                  >
                  <span v-show="HLN.rt === 0" style="color: #4ae387"
                    ><strong>{{ HLN.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="HLN.ag > 0" style="color: #e34a4a"
                    ><strong>{{ HLN.ag }}</strong></span
                  >
                  <span v-show="HLN.ag === 0" style="color: #4ae387"
                    ><strong>{{ HLN.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="HLN.at > 0" style="color: #e34a4a"
                    ><strong>{{ HLN.at }}</strong></span
                  >
                  <span v-show="HLN.at === 0" style="color: #4ae387"
                    ><strong>{{ HLN.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "HLD" }}</strong>
                </td>
                <td>
                  <strong>{{ "HBL Laboratorija - Dobrinja" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="HLD.rt > 0" style="color: #e34a4a"
                    ><strong>{{ HLD.rt }}</strong></span
                  >
                  <span v-show="HLD.rt === 0" style="color: #4ae387"
                    ><strong>{{ HLD.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="HLD.ag > 0" style="color: #e34a4a"
                    ><strong>{{ HLD.ag }}</strong></span
                  >
                  <span v-show="HLD.ag === 0" style="color: #4ae387"
                    ><strong>{{ HLD.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="HLD.at > 0" style="color: #e34a4a"
                    ><strong>{{ HLD.at }}</strong></span
                  >
                  <span v-show="HLD.at === 0" style="color: #4ae387"
                    ><strong>{{ HLD.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "PJU" }}</strong>
                </td>
                <td>
                  <strong>{{ "Podružnica 1. Unitic, Sarajevo" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PJU.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PJU.rt }}</strong></span
                  >
                  <span v-show="PJU.rt === 0" style="color: #4ae387"
                    ><strong>{{ PJU.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJU.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PJU.ag }}</strong></span
                  >
                  <span v-show="PJU.ag === 0" style="color: #4ae387"
                    ><strong>{{ PJU.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJU.at > 0" style="color: #e34a4a"
                    ><strong>{{ PJU.at }}</strong></span
                  >
                  <span v-show="PJU.at === 0" style="color: #4ae387"
                    ><strong>{{ PJU.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "PJI" }}</strong>
                </td>
                <td>
                  <strong>{{ "Podružnica 2. IUS, Sarajevo" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PJI.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PJI.rt }}</strong></span
                  >
                  <span v-show="PJI.rt === 0" style="color: #4ae387"
                    ><strong>{{ PJI.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJI.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PJI.ag }}</strong></span
                  >
                  <span v-show="PJI.ag === 0" style="color: #4ae387"
                    ><strong>{{ PJI.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJI.at > 0" style="color: #e34a4a"
                    ><strong>{{ PJI.at }}</strong></span
                  >
                  <span v-show="PJI.at === 0" style="color: #4ae387"
                    ><strong>{{ PJI.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "PJV" }}</strong>
                </td>
                <td>
                  <strong>{{ "Podružnica Visoko" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PJV.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PJV.rt }}</strong></span
                  >
                  <span v-show="PJV.rt === 0" style="color: #4ae387"
                    ><strong>{{ PJV.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJV.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PJV.ag }}</strong></span
                  >
                  <span v-show="PJV.ag === 0" style="color: #4ae387"
                    ><strong>{{ PJV.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJV.at > 0" style="color: #e34a4a"
                    ><strong>{{ PJV.at }}</strong></span
                  >
                  <span v-show="PJV.at === 0" style="color: #4ae387"
                    ><strong>{{ PJV.at }}</strong></span
                  >
                </td>
              </tr>

               <tr>
                <td>
                  <strong>{{ "PJT" }}</strong>
                </td>
                <td>
                  <strong>{{ "Podružnica Tuzla" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PJT.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PJT.rt }}</strong></span
                  >
                  <span v-show="PJT.rt === 0" style="color: #4ae387"
                    ><strong>{{ PJT.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJT.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PJT.ag }}</strong></span
                  >
                  <span v-show="PJT.ag === 0" style="color: #4ae387"
                    ><strong>{{ PJT.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJT.at > 0" style="color: #e34a4a"
                    ><strong>{{ PJT.at }}</strong></span
                  >
                  <span v-show="PJT.at === 0" style="color: #4ae387"
                    ><strong>{{ PJT.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "PJG" }}</strong>
                </td>
                <td>
                  <strong>{{ "Podružnica Goražde" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PJG.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PJG.rt }}</strong></span
                  >
                  <span v-show="PJG.rt === 0" style="color: #4ae387"
                    ><strong>{{ PJG.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJG.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PJG.ag }}</strong></span
                  >
                  <span v-show="PJG.ag === 0" style="color: #4ae387"
                    ><strong>{{ PJG.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJG.at > 0" style="color: #e34a4a"
                    ><strong>{{ PJG.at }}</strong></span
                  >
                  <span v-show="PJG.at === 0" style="color: #4ae387"
                    ><strong>{{ PJG.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "PJB" }}</strong>
                </td>
                <td>
                  <strong>{{ "Podružnica Bugojno" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PJB.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PJB.rt }}</strong></span
                  >
                  <span v-show="PJB.rt === 0" style="color: #4ae387"
                    ><strong>{{ PJB.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJB.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PJB.ag }}</strong></span
                  >
                  <span v-show="PJB.ag === 0" style="color: #4ae387"
                    ><strong>{{ PJB.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJB.at > 0" style="color: #e34a4a"
                    ><strong>{{ PJB.at }}</strong></span
                  >
                  <span v-show="PJB.at === 0" style="color: #4ae387"
                    ><strong>{{ PJB.at }}</strong></span
                  >
                </td>
              </tr>

              <tr>
                <td>
                  <strong>{{ "PJR" }}</strong>
                </td>
                <td>
                  <strong>{{ "Podružnica Trebinje" }}</strong>
                </td>
                <td align="middle">
                  <span v-show="PJR.rt > 0" style="color: #e34a4a"
                    ><strong>{{ PJR.rt }}</strong></span
                  >
                  <span v-show="PJR.rt === 0" style="color: #4ae387"
                    ><strong>{{ PJR.rt }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJR.ag > 0" style="color: #e34a4a"
                    ><strong>{{ PJR.ag }}</strong></span
                  >
                  <span v-show="PJR.ag === 0" style="color: #4ae387"
                    ><strong>{{ PJR.ag }}</strong></span
                  >
                </td>
                <td align="middle">
                  <span v-show="PJR.at > 0" style="color: #e34a4a"
                    ><strong>{{ PJR.at }}</strong></span
                  >
                  <span v-show="PJR.at === 0" style="color: #4ae387"
                    ><strong>{{ PJR.at }}</strong></span
                  >
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </vuestic-widget>
    </div>

    <!-- Podrška korisnicima -->

    <div v-show="true" class="col-md-6 col-xl-12">
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
      PJU: 0,
      PJI: 0,
      PJV: 0,
      PJT: 0,
      PJG: 0,
      PJB: 0,
      PJR: 0,
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
        this.PJC = res.data.data.PJC;
        this.SJJ = res.data.data.SJJ;
        this.TZL = res.data.data.TZL;
        this.PSZ = res.data.data.PSZ;
        this.HLI = res.data.data.HLI;
        this.HLN = res.data.data.HLN;
        this.HLD = res.data.data.HLD;
        this.PJU = res.data.data.PJU;
        this.PJI = res.data.data.PJI;
        this.PJV = res.data.data.PJV;
        this.PJT = res.data.data.PJT;
        this.PJG = res.data.data.PJG;
        this.PJB = res.data.data.PJB;
        this.PJR = res.data.data.PJR;

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
