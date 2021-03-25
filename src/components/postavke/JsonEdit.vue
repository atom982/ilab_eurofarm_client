<template>
  <div class="vuestic-modal">
    <transition name="modal" :duration="duration">
      <div v-show="show" class="modal-container">
        <div class="modal" @click.self="clickMask">
          <div class="modal-dialog" :class="modalClass">
            <div class="modal-content">
              <!--Header-->
              <div class="modal-header">
                <slot name="header">
                  <div class="modal-title">
                    <slot name="title"></slot>
                  </div>

                  <i
                    class="ion ion-md-close close-modal"
                    v-if="closeIconShown"
                    @click.prevent="cancel"
                  />
                </slot>
              </div>
              <!--Container-->
              <div class="modal-body">
                <slot></slot>
                <vue-json-editor v-model="jsonData" :show-btns="false" @json-change="onJsonChange"></vue-json-editor>
              </div>
              <!--Footer-->
              <div class="modal-footer">
                <slot name="footer">
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="cancelClass"
                    @click="cancel"
                    :disabled="cancelDisabled"
                  >{{ cancelText }}</button>
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="okClass"
                    @click="ok"
                    :disabled="okDisabled"
                  >{{ okText }}</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import vueJsonEditor from "vue-json-editor";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

export default {
  name: "json-edit-postavke",
  components: {
    vueJsonEditor
  },
  props: {
    transition: {
      type: String,
      default: "modal"
    },
    small: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: true
    },
    force: {
      type: Boolean,
      default: true
    },
    okText: {
      type: String,
      default: "CONFIRM"
    },
    cancelText: {
      type: String,
      default: "CANCEL"
    },
    okClass: {
      type: String,
      default: "btn btn-primary btn-sm"
    },
    cancelClass: {
      type: String,
      default: "btn btn-warning btn-sm"
    },
    closeIconShown: {
      type: Boolean,
      default: false
    },
    okDisabled: {
      type: Boolean,
      default: false
    },
    cancelDisabled: {
      type: Boolean,
      default: false
    },
    noButtons: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      duration: 500,
      jsonData: {},
      tab: "",
      obj: {}
    };
  },
  mounted() {
    bus.$on("JsonEditPostavke", data => {
      this.jsonData = data.element;
      this.obj = data.element;
      this.tab = data.tab;
      this.show = true;
    });
  },
  beforeDestroy() {
    bus.$off("JsonEditPostavke");
  },
  computed: {
    modalClass() {
      return {
        "modal-lg": this.large,
        "modal-sm": this.small
      };
    }
  },
  created() {
    if (this.show) {
      document.body.className += " modal-open";
    }
  },
  beforeDestroy() {
    document.body.className = document.body.className.replace(
      /\s?modal-open/,
      ""
    );
  },
  watch: {
    show(value) {
      if (value) {
        document.body.className += " modal-open";
      } else {
        window.setTimeout(() => {
          document.body.className = document.body.className.replace(
            /\s?modal-open/,
            ""
          );
        }, this.duration);
      }
    }
  },
  methods: {
    onJsonChange(value) {
      this.obj = value;
    },
    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");
      this.EditJson();
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    cancel() {
      this.$emit("cancel");
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    clickMask() {
      if (!this.force) {
        this.cancel();
      }
    },
    open() {
      this.show = true;
      window.addEventListener("keyup", this.listenKeyUp);
    },
    close() {
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    EditJson() {
      switch (this.tab) {
        case "Sites":
          http
            .post("postavke/sites/edit", {
              element: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("SitesRefresh");
                this.show = false;
              }
            });

          break;
        case "Korisnici":
          http
            .post("postavke/users/edit", {
              element: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("KorisniciRefresh");
                this.show = false;
              }
            });
          break;

        case "Lokacije":
          http
            .post("postavke/lokacije/edit", {
              lokacija: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Doktori":
          http
            .post("postavke/doktori/edit", {
              doktor: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Mjesta":
          break;

        case "Sekcije":
          http
            .post("postavke/sekcije/edit", {
              sekcija: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Grupe testova":
          http
            .post("postavke/grupe/edit", {
              grupa: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Referentne grupe":
          http
            .post("postavke/refgr/edit", {
              ref_grupa: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Mjerne jedinice":
          http
            .post("postavke/jedinice/edit", {
              jedinica: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Tehnologije analizatora":
          http
            .post("postavke/tehnologije/edit", {
              tehnologija: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Tipovi analizatora":
          http
            .post("postavke/tipovi/edit", {
              tip: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Uzorci":
          http
            .post("postavke/uzorak/def/edit", {
              uzorak: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        case "Tipovi uzoraka":
          http
            .post("postavke/uzorak/edit", {
              uzorak: this.obj,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              if (res.data.success) {
                bus.$emit("Refresh", this.tab);
                this.show = false;
              }
            });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";

// Modals
$modal-header-padding-x: $widget-padding;
$modal-header-padding-y: 0;
$modal-header-height: $widget-header-height;
$modal-header-border: $widget-header-border;
$modal-content-border-width: 0;
$modal-content-border-radius: 0;
$modal-inner-padding: 25px;
$modal-footer-btns-padding-bottom: 20px;
$modal-footer-btns-margin-x: 10px;
$modal-md: 650px;
$modal-lg: 850px;

.vuestic-modal {
  height: 0;
  width: 0;

  // For Transitioning
  .modal {
    display: block;
  }

  .modal-dialog,
  .modal-backdrop {
    transition: all 0.5s ease;
  }

  .modal-enter .modal-dialog,
  .modal-leave-active .modal-dialog {
    opacity: 0;
    transform: translateY(-30%);
  }

  .modal-enter .modal-backdrop,
  .modal-leave-active .modal-backdrop {
    opacity: 0;
  }

  .modal-backdrop {
    opacity: 0.5;
  }

  //Modal styles

  .modal-header {
    height: $modal-header-height;
    padding: $modal-header-padding-y $modal-header-padding-x;
    border-bottom: $modal-header-border;
    font-size: $font-size-larger;
    display: flex;
    align-items: center;
  }

  .close-modal {
    margin-left: 1rem;
    font-size: $font-size-large;
    line-height: $font-size-large;
    cursor: pointer;
  }

  .modal-content {
    border-radius: $modal-content-border-radius;
  }

  .modal-footer {
    justify-content: center;
    padding: 0 $modal-inner-padding;
    padding-bottom: calc(
      #{$modal-inner-padding} - #{$modal-footer-btns-padding-bottom}
    );
    flex-wrap: wrap;
    .btn {
      margin: 0 $modal-footer-btns-margin-x $modal-footer-btns-padding-bottom
        $modal-footer-btns-margin-x;
    }
  }
}
</style>
