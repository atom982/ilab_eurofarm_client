<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div>
          <div class="btn-container">
            <button
              v-if="true"
              class="btn btn-secondary btn-sm"
              @click.prevent="vratiPregled"
            >
              <span class="fa fa-step-backward"></span>
              {{ " NAZAD" }}
            </button>
          </div>
          <hr v-if="true" />
          <embed
            src
            id="pdf"
            style="width: 100%; height: 800px; visibility: hidden"
            type="application/pdf"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import router from "../../router";
import { server } from "../../../config/config.js";

Vue.component("badge-column", BadgeColumn);

export default {
  name: "certificate-pdf",
  props: ["id"],

  data() {
    return {};
  },

  mounted() {
    if (this.$router.currentRoute.path.includes("certificates/pdf/ba/")) {
      document.getElementById("pdf").style.visibility = "visible";
      document.getElementById("pdf").src =
        server + "/nalazi/certificates/ba/" + this.$route.params.id + ".pdf";
    } else if (
      this.$router.currentRoute.path.includes("certificates/pdf/en/")
    ) {
      document.getElementById("pdf").style.visibility = "visible";
      document.getElementById("pdf").src =
        server + "/nalazi/certificates/en/" + this.$route.params.id + ".pdf";
    } else {
      document.getElementById("pdf").style.visibility = "visible";
      document.getElementById("pdf").src =
        server + "/nalazi/certificates/de/" + this.$route.params.id + ".pdf";
    }
  },

  methods: {
    onCancel() {},

    vratiPregled: function () {
      router.push("/certificates/pregled");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
@import "../../sass/_toasts";

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
  font-size: 1.7rem;
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

.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.brand-danger {
  background-color: #db76df;
  color: $white;
  box-shadow: $widget-danger-shadow;
}

.info-widget {
  border-top: $info-widget-border;
  &.brand-info {
    border-top-color: $brand-info;
  }
  &.brand-danger {
    border-top-color: #db76df;
  }
}
</style>

