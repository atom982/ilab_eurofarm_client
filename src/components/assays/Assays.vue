<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding">
      <vuestic-tabs
        :names="['Analize analizatora', 'Kalkulisane analize', 'Specifične analize', 'Paneli analiza', 'Konfiguracija']"
        :tab="selected_tab"
        ref="tabs"
      >
        <div :slot="'Analize analizatora'">
          <assays-lab-assay></assays-lab-assay>
        </div>

        <div :slot="'Kalkulisane analize'">
          <assays-calculated></assays-calculated>
        </div>

        <div :slot="'Specifične analize'">
          <assays-specif></assays-specif>
        </div>

        <div :slot="'Paneli analiza'">
          <assays-panel></assays-panel>
        </div>

        <div :slot="'Konfiguracija'">
          <assays-ana-assay></assays-ana-assay>
        </div>
      </vuestic-tabs>
    </vuestic-widget>
  </div>
</template>

<script>
import Vue from "vue";
import { bus } from "../../main";
import LabAssay from "./LabAssay.vue";
import Calculated from "./Calculated.vue";
import Specif from "./Specif.vue";
import Panel from "./Panel.vue";
import AnaAssay from "./AnaAssay.vue";

Vue.component("assays-lab-assay", LabAssay);
Vue.component("assays-calculated", Calculated);
Vue.component("assays-specif", Specif);
Vue.component("assays-panel", Panel);
Vue.component("assays-ana-assay", AnaAssay);

export default {
  name: "assays",

  data() {
    return {
      selected_tab: ""
    };
  },

  created() {
    this.selected_tab = "Analize analizatora";
  },

  mounted() {
    bus.$on("tabChanged", data => {
      this.selected_tab = data;
      switch (data) {
        case "Analize analizatora":
          bus.$emit("Analize analizatora", data);
          break;
        case "Kalkulisane analize":
          bus.$emit("Kalkulisane analize", data);
          break;
        case "Specifične analize":
          bus.$emit("Specifične analize", data);
          break;
        case "Paneli analiza":
          bus.$emit("Paneli analiza", data);
          break;
        case "Konfiguracija":
          bus.$emit("Konfiguracija", data);
          break;
        default:
          break;
      }
    });
  },

  beforeDestroy() {
    bus.$off("tabChanged");
  }
};
</script>

<style lang="scss" scoped>
.minHeight {
  min-height: 650px;
}
</style>
