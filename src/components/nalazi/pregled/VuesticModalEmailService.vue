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
              
                <div v-show="!emailData.valid">
                  <strong>{{ "E-mail adresa nije validna." }}</strong>
                </div>
                <div v-show="emailData.valid">
                  <strong>{{ "E-mail adresa:" }}&nbsp;&nbsp;
                    
                    
                    <span style="color: #4ab2e3"
                      >{{ emailData.email }}</span
                    >
                                
                    
                    
                    
                    
                    </strong>
                  <div style="min-height: 12px"></div>





 <div
               
                class="row"
              >
              <div class="col-md-1"></div>
                <div class="col-md-8">
                  <div class="form-check abc-checkbox abc-checkbox-primary">
                    <input
                      class="form-check-input"
                      id="ba"
                      type="checkbox"
                      v-model="ba"
                      disabled
                    />
                    <label class="form-check-label" for="ba">
                      <span class="abc-label-text">{{
                        "Bosanski jezik"
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>



              <div
               
                class="row"
              >
              <div class="col-md-1"></div>
                <div class="col-md-8">
                  <div class="form-check abc-checkbox abc-checkbox-primary">
                    <input
                      class="form-check-input"
                      id="en"
                      type="checkbox"
                      v-model="en"
                      disabled
                    />
                    <label class="form-check-label" for="en">
                      <span class="abc-label-text">{{
                        "Engleski jezik"
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>




               <div
               
                class="row"
              >
              <div class="col-md-1"></div>
                <div class="col-md-8">
                  <div class="form-check abc-checkbox abc-checkbox-primary">
                    <input
                      class="form-check-input"
                      id="de"
                      type="checkbox"
                      v-model="de"
                      disabled
                    />
                    <label class="form-check-label" for="de">
                      <span class="abc-label-text">{{
                        "Njemački jezik"
                      }}</span>
                    </label>
                  </div>
                </div>
              </div>










                  
                </div>
              </div>
              <!--Footer-->
              <div class="modal-footer">
                <slot name="footer">
                  <button
                    type="button"
                    v-if="!noButtons && !emailData.valid"
                    :class="cancelClass"
                    @click="cancel"
                    :disabled="cancelDisabled"
                  >{{ "ZATVORI" }}</button>
                  <button
                    type="button"
                    v-if="!noButtons && emailData.valid"
                    :class="cancelClass"
                    @click="cancel"
                    :disabled="cancelDisabled"
                  >{{ cancelText }}</button>
                  <button
                    type="button"
                    v-if="!noButtons"
                    :class="okClass"
                    @click="ok"
                    :disabled="okDisabled || !emailData.valid || isLoading || (!ba && !en && !de)"
                  >{{ okText }}</button>
                </slot>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-backdrop"></div>
      </div>
    </transition>

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
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";
import Vue from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "vuestic-modal-email-service",
  props: {
    emailData: {
      type: Object,
      default: () => ({
        timestamp: "",
        uzorak: "",
        email: "",
        valid: false,
        protokol: "",
        ime: "",
        prezime: "",
        godiste: "",
        spol: "",
      })
    },
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
      default: false
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
      isLoading: false,
      fullPage: true,

      ba: true,
      en: true,
      de: true,

      // Toasts

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
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
  components: {
    Loading,
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


    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    listenKeyUp(event) {
      if (event.key === "Escape") {
        this.cancel();
      }
    },
    ok() {
      this.$emit("ok");

      this.isLoading = true
      // Email Service
      console.log(this.emailData)




      http
        .post("nalazi/mail", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          email: this.emailData.email,
          timestamp: this.emailData.timestamp,
          location: "/",
          naziv: this.emailData.timestamp,
        })
        .then((res) => {
          // Vue Loading Overlay Component

          this.show = false;
          this.isLoading = false
          window.removeEventListener("keyup", this.listenKeyUp);

          if (res.data.success) {
            this.toastText = "Nalaz uspješno poslan.";
            this.toastIcon = "fa-check";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-primary";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: 1500,
              fullWidth: this.false,
              className: this.className,
            });

           
          } else {
            this.toastText = "Greška prilikom slanja nalaza!";
            this.toastIcon = "fa-remove";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-danger";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: 1500,
              fullWidth: this.false,
              className: this.className,
            });
          }
        });


      
      


      
      
    },
    cancel() {
      this.$emit("cancel");
      bus.$emit("Error");
      this.show = false;
      this.isLoading = false
      window.removeEventListener("keyup", this.listenKeyUp);
    },
    clickMask() {
      if (!this.force) {
        this.cancel();
      }
    },
    open() {
      this.ba = true
      this.en = true
      this.de = true
      this.show = true;
      // console.log(this.emailData)
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
