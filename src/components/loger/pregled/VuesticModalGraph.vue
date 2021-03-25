<template>
  <div class="vuestic-modal">
    <transition name="modal" :duration="duration">
      <div v-show="show" class="modal-container">
        <div class="modal" @click.self="clickMask">
          <div class="modal-dialog" :class="modalClass">
            <div class="modal-content">
              <!--Header-->
              <div style="padding-right: 40px;" class="modal-header">
                <slot name="header">
                  <div class="modal-title">
                    <slot name="title"></slot>
                  </div>

                  <div
                    v-if="window.width > 800"
                    style="position: relative; right: 0px; top: 20px;"
                    class="col-md-4"
                  >
                    <fieldset>
                      <div class="form-group">
                        <div class="input-group">
                          <vuestic-date-picker
                            @on-close="timeOdClosed($event)"
                            id="date-picker-time-od"
                            :config="configOd"
                            v-model="timeRange.timeOd"
                          />
                          <label class="control-label" for="date-picker-range">{{ 'Od' }}</label>
                          <i class="bar"></i>
                        </div>&nbsp;&nbsp;
                        <div class="input-group">
                          <vuestic-date-picker
                            @on-close="timeDoClosed($event)"
                            id="date-picker-time-do"
                            :config="configDo"
                            v-model="timeRange.timeDo"
                          />
                          <label class="control-label" for="date-picker-range">{{ 'Do' }}</label>
                          <i class="bar"></i>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </slot>
              </div>

              <div
                class="modal-header"
                style="position: relative; right: 0px; top: 20px;"
                v-if="window.width < 800"
              >
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <vuestic-date-picker
                        id="date-picker-basic"
                        :config="configBasics"
                        v-model="dateBasics"
                      />
                      <label class="control-label" for="date-picker-basic">{{ 'Izaberite datum' }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>
              <!--Container-->
              <div class="modal-body">
                <slot></slot>
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
                  <!-- <button
                    type="button"
                    v-if="!noButtons"
                    :class="okClass"
                    @click="ok"
                    :disabled="okDisabled"
                  >{{ okText }}</button>-->
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
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";

export default {
  name: "vuestic-modal-graph",
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
      window: {
        width: 0,
        height: 0
      },
      timeRange: {
        timeOd: "",
        timeDo: ""
      },
      configOd: {
        minDate: new Date("2019-09-01"),
        maxDate: new Date(),
        enableTime: true,
        minuteIncrement: 1,
        time_24hr: true,
        inline: false,
        locale: {
          firstDayOfWeek: 1,
          weekdays: {
            shorthand: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
            longhand: [
              "Nedjelja",
              "Ponedjeljak",
              "Utorak",
              "Srijeda",
              "Četvrtak",
              "Petak",
              "Subota"
            ]
          },
          months: {
            shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec"
            ],
            longhand: [
              "Januar‎",
              "Februar‎",
              "Mart‎",
              "April‎",
              "Maj‎",
              "Juni‎",
              "Juli‎",
              "August‎",
              "Septembar‎",
              "Oktobar‎",
              "Novembar‎",
              "Decembar‎"
            ]
          }
        }
      },
      configDo: {
        minDate: new Date("2019-09-01"),
        maxDate: new Date().fp_incr(1),
        enableTime: true,
        minuteIncrement: 1,
        time_24hr: true,
        inline: false,
        locale: {
          firstDayOfWeek: 1,
          weekdays: {
            shorthand: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
            longhand: [
              "Nedjelja",
              "Ponedjeljak",
              "Utorak",
              "Srijeda",
              "Četvrtak",
              "Petak",
              "Subota"
            ]
          },
          months: {
            shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec"
            ],
            longhand: [
              "Januar‎",
              "Februar‎",
              "Mart‎",
              "April‎",
              "Maj‎",
              "Juni‎",
              "Juli‎",
              "August‎",
              "Septembar‎",
              "Oktobar‎",
              "Novembar‎",
              "Decembar‎"
            ]
          }
        }
      },
      configBasics: {
        minDate: new Date("2019-09-01"),
        maxDate: new Date().fp_incr(1),
        locale: {
          firstDayOfWeek: 1,
          weekdays: {
            shorthand: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
            longhand: [
              "Nedjelja",
              "Ponedjeljak",
              "Utorak",
              "Srijeda",
              "Četvrtak",
              "Petak",
              "Subota"
            ]
          },
          months: {
            shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec"
            ],
            longhand: [
              "Januar‎",
              "Februar‎",
              "Mart‎",
              "April‎",
              "Maj‎",
              "Juni‎",
              "Juli‎",
              "August‎",
              "Septembar‎",
              "Oktobar‎",
              "Novembar‎",
              "Decembar‎"
            ]
          }
        }
      },
      dateBasics: "",
      mobile: false,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  computed: {
    modalClass() {
      return {
        "modal-lg": this.large,
        "modal-sm": this.small
      };
    }
  },
  mounted() {
    bus.$on("GraphSelected", () => {
      // console.log("Graph selected.");
    });
    bus.$on("GraphDateData", data => {
      this.timeRange.timeOd = JSON.stringify(
        data.from.slice(0, 10) + " " + data.from.slice(11, 16)
      );
      this.timeRange.timeDo = JSON.stringify(
        data.to.slice(0, 10) + " " + data.to.slice(11, 16)
      );

      // this.dateBasics = data.from.slice(0, 10)
    });
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    if (this.show) {
      document.body.className += " modal-open";
    }
  },
  beforeDestroy() {
    bus.$off("GraphSelected");
    bus.$off("GraphDateData");
    bus.$off("Switch");
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
    },
    dateBasics() {
      if (this.mobile) {
        var from = this.dateBasics + "T00:00:00.000Z";
        var to = this.dateBasics + "T23:59:59.000Z";
        var data = {
          data: "Date range changed.",
          from: from,
          to: to
        };
        bus.$emit("GraphDateRange", data);
      }
    }
  },
  methods: {
    timeOdClosed(event) {
      if (
        this.timeRange.timeOd != "" &&
        this.timeRange.timeDo != "" &&
        new Date(this.timeRange.timeOd) < new Date(this.timeRange.timeDo)
      ) {
        var from = this.timeRange.timeOd.replace(" ", "T").concat(":00.000Z");
        var to = this.timeRange.timeDo.replace(" ", "T").concat(":00.000Z");
        var data = {
          data: "Date range changed.",
          from: from,
          to: to
        };

        bus.$emit("GraphDateRange", data);
      } else {
        this.toastText = "Invalid date range.";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-left";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className
        });
      }
    },
    timeDoClosed(event) {
      if (
        this.timeRange.timeOd != "" &&
        this.timeRange.timeDo != "" &&
        new Date(this.timeRange.timeOd) < new Date(this.timeRange.timeDo)
      ) {
        var from = this.timeRange.timeOd.replace(" ", "T").concat(":00.000Z");
        var to = this.timeRange.timeDo.replace(" ", "T").concat(":00.000Z");
        var data = {
          data: "Date range changed.",
          from: from,
          to: to
        };
        bus.$emit("GraphDateRange", data);
      } else {
        this.toastText = "Invalid date range.";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-left";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className
        });
      }
    },
    Test(event) {
      bus.$emit("GraphDateRange", "Date range changed.");
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (this.window.width < 800) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    },
    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    cancel() {
      this.$emit("cancel");
      bus.$emit("GraphModalClosed");
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    clickMask() {
      if (!this.force) {
        this.cancel();
      }
    },
    open() {
      this.dateBasics = this.timeRange.timeOd.slice(1, 11);
      this.mobile = false;

      if (this.window.width < 800) {
        this.mobile = true;
      }

      this.show = true;
      window.addEventListener("keyup", this.listenKeyUp);
    },
    close() {
      this.show = false;
      window.removeEventListener("keyup", this.listenKeyUp);
    }
  }
};
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";

//Modals
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

  // .modal-dialog {
  //   box-shadow: $modal-content-box-shadow-sm-up;
  // }
}
</style>
