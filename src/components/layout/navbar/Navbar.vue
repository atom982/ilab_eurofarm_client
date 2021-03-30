<template>
  <nav
    class="navbar app-navbar navbar-toggleable-md"
    v-show="$store.state.access != undefined"
  >
    <div
      class="navbar-brand-container d-flex align-items-center justify-content-start"
    >
      <atom-spinner :animation-duration="1000" :size="40" :color="'#4ae387'" />
      <a class="navbar-brand">
        <i class="i-vuestic"></i>
      </a>
    </div>

    <div class="row navbar-container">
      <div
        class="menu-icon-container d-flex align-items-center justify-content-center justify-content-lg-start col"
      >
        <a
          class="menu-icon i-menu-expanded"
          href="#"
          @click.prevent="toggleSidebar(false)"
          v-if="sidebarOpened && $store.state.default_route != '/registracija'"
        ></a>
        <a
          v-if="!sidebarOpened && $store.state.default_route != '/registracija'"
          class="menu-icon i-menu-collapsed"
          href="#"
          @click.prevent="toggleSidebar(true)"
        ></a>
      </div>

      <div class="offset-lg-6"></div>

      <site-dropdown
        style="flex-direction: row; display: flex; white-space: nowrap"
      />

      <div
        class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center"
      >
        <a
          class="nav-link dropdown-toggle d-flex align-items-center justify-content"
        >
          <span
            v-show="$store.state.default_route != '/registracija'"
            class="i-nav-messages"
          ></span>
        </a>
      </div>

      <div
        class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center"
      >
        <a
          class="nav-link dropdown-toggle d-flex align-items-center justify-content"
          href="#"
        >
          <span
            v-show="$store.state.default_route != '/registracija'"
            class="i-nav-notification"
          ></span>
        </a>
      </div>

      <div
        v-if="$store.state.default_route != '/registracija'"
        class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center"
        v-dropdown
      >
        <a
          class="nav-link dropdown-toggle d-flex align-items-center justify-content"
          href="#"
          @click.prevent="closeMenu"
        >
          <span v-if="reload" class="avatar-container" ref="close">
            <img :src="userImage + '?' + new Date().getTime()" />
          </span>
        </a>
        <div class="dropdown-menu last">
          <div class="dropdown-menu-content">
            <div class="dropdown-item plain-link-item">
              <a class="plain-link" @click="Password" href="#">{{
                "Promjena šifre"
              }}</a>
            </div>
            <div class="dropdown-item plain-link-item">
              <a class="plain-link" @click="Logout" href="#">{{ " Odjava" }}</a>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="$store.state.default_route === '/registracija'"
        class="col nav-item dropdown navbar-dropdown d-flex align-items-center justify-content-center"
      >
        <span v-if="reload" class="avatar-container" ref="close">
          <img :src="userImage + '?' + new Date().getTime()" />
        </span>
      </div>
    </div>
    <change-password
      :show.sync="show"
      ref="staticChangePassword"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #4ae387">
          <i class="fa fa-key" style="transform: rotate(90deg)"></i>
          <span style="color: #acb5be">{{ " | Promjena šifre" }}</span>
        </span>
      </div>
      <div>
        <form>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-10">
              <fieldset>
                <div class="form-group with-icon-right">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      id="oldPassword"
                      title=" "
                      type="password"
                      v-model="staraSifra"
                      name="oldPassword"
                      required
                    />
                    <label class="control-label" for="input-icon-right">{{
                      "Unesite trenutnu šifru"
                    }}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-right">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      id="newPassword"
                      title=" "
                      type="password"
                      v-model="novaSifra"
                      name="newPassword"
                      required
                    />
                    <label class="control-label" for="input-icon-right">{{
                      "Unesite novu šifru"
                    }}</label>
                    <i class="bar"></i>
                  </div>
                </div>
                <div class="form-group with-icon-right">
                  <div class="input-group">
                    <input
                      onpaste="return false;"
                      autocomplete="off"
                      id="confirmPassword"
                      title=" "
                      type="password"
                      v-model="potvrdaSifra"
                      name="confirmPassword"
                      required
                    />
                    <label class="control-label" for="input-icon-right">{{
                      "Potvrdite novu šifru"
                    }}</label>
                    <i class="bar"></i>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="col-md-3"></div>
          </div>
        </form>
      </div>
    </change-password>
  </nav>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import Dropdown from "directives/Dropdown";
import { AtomSpinner } from "epic-spinners";
import router from "../../../router";
import { http } from "../../../../config/config.js";
// import VueSocketIO from "vue-socket.io";
import { bus } from "../../../main";
import SiteDropdown from "../../vuestic-components/vuestic-site/SiteDropdown.vue";

export default {
  data() {
    return {
      show: true,
      hidden_old: true,
      hidden_new: true,
      hidden_confirm: true,
      userImage: "",
      isRole: "",
      // socketConnected: false,
      reload: true,
      // Change Password
      staraSifra: "",
      novaSifra: "",
      potvrdaSifra: "",
      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
    };
  },
  name: "navbar",

  directives: {
    dropdown: Dropdown,
  },

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"]),
    currentLanguage() {},
  },
  components: {
    AtomSpinner,
    SiteDropdown,
  },

  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),
    Logout() {
      this.$store.dispatch("logout");
    },
    Dashboard(e) {
      // if (this.$store.state.access.level < 1) {
      //   e.preventDefault();
      //   router.push("/dashboard");
      // }
    },
    setSite(site) {
      this.$refs.languageModal.cancel();
    },
    Password: function () {
      this.$refs.staticChangePassword.open();
      this.$refs.close.click();
    },
    ShowPassword: function () {
      let passwordField_old = null;
      let passwordField_new = null;
      let passwordField_confirm = null;

      passwordField_old = document.querySelector("#oldPassword");
      this.hidden_old = false;
      passwordField_new = document.querySelector("#newPassword");
      this.hidden_new = false;
      passwordField_confirm = document.querySelector("#confirmPassword");
      this.hidden_confirm = false;

      passwordField_old.setAttribute("type", "text");
      passwordField_new.setAttribute("type", "text");
      passwordField_confirm.setAttribute("type", "text");
    },
    HidePassword: function () {
      let passwordField_old = null;
      let passwordField_new = null;
      let passwordField_confirm = null;

      passwordField_old = document.querySelector("#oldPassword");
      this.hidden_old = true;
      passwordField_new = document.querySelector("#newPassword");
      this.hidden_new = true;
      passwordField_confirm = document.querySelector("#confirmPassword");
      this.hidden_confirm = true;

      passwordField_old.setAttribute("type", "password");
      passwordField_new.setAttribute("type", "password");
      passwordField_confirm.setAttribute("type", "password");
    },
    izmjeniSifru: function () {
      var item = true;
      if (
        this.novaSifra.trim() === "" ||
        this.potvrdaSifra.trim() === "" ||
        this.staraSifra === ""
      ) {
        item = false;
        this.toastText = "Sva polja su obavezna.";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className,
        });
      } else if (this.novaSifra.length < 6) {
        item = false;
        this.toastText = "Šifra nije validna.";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className,
        });
        return;
      } else if (this.novaSifra != this.potvrdaSifra) {
        item = false;
        this.toastText = "Nova šifra nije validirana.";
        this.toastIcon = "fa-warning";
        this.toastPosition = "top-right";
        this.className = "vuestic-toast-warning";

        this.showToast(this.toastText, {
          icon: this.toastIcon,
          position: this.toastPosition,
          duration: this.toastDuration,
          fullWidth: this.isToastFullWidth,
          className: this.className,
        });
        return;
      } else {
        
        // min 8 letter password,
        // with at least a symbol,
        // upper and lower case letters
        // and a number

        /* var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        item = re.test(this.novaSifra);

        if (!item) {
          this.toastText = "Nova šifra ne zadovoljava kriterij.";
          this.toastIcon = "fa-warning";
          this.toastPosition = "top-right";
          this.className = "vuestic-toast-warning";

          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className,
          });
        } */
        
      }


      if (item) {
        http
          .post("users/sifra", {
            email: this.$store.state.userId,
            password: this.staraSifra,
            novaSifra: this.novaSifra,
            potvrdaSifra: this.potvrdaSifra,
            token: this.$store.state.token,
            site: this.$store.state.site,
          })
          .then((res) => {
            if (res.data.message === "Greška na mongodb.") {
              this.toastText = "Greška prilikom upisa.";
              this.toastIcon = "fa-remove";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-danger";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              });
            }
            if (res.data.message === "Info") {
              this.toastText = "Trenutna šifra nije ispravna.";
              this.toastIcon = "fa-warning";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-warning";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              });
            }

            if (res.data.message === "Ok") {
              this.novaSifra = "";
              this.potvrdaSifra = "";
              this.staraSifra = "";
              this.toastText = "Izmjena uspješno obavljena.";
              this.toastIcon = "fa-check";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-primary";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className,
              });
              /* setTimeout(() => {
                this.$router.push(
                  "/statistika?token=" + this.$store.state.token
                );
              }, 3000); */
              bus.$emit("ChangePasswordModalHide");
              this.HidePassword("oldPassword");
              this.HidePassword("newPassword");
              this.HidePassword("confirmPassword");
            }
          });
      }
    },
  },
  mounted: function () {

    // console.log(this.$store.state.expired);
    if (this.$store.state.expired) {
      setTimeout(() => {
        this.$refs.staticChangePassword.open();
      }, 1000);
    }

    bus.$on("ChangePassword", () => {
      this.izmjeniSifru();
    });

    bus.$on("_HidePassword", () => {
      this.HidePassword();
    });

    bus.$on("_ShowPassword", () => {
      this.ShowPassword();
    });

    bus.$on("ChangePasswordCancel", () => {
      this.staraSifra = "";
      this.novaSifra = "";
      this.potvrdaSifra = "";
      this.HidePassword();
    });

    var link = this.$store.state.userId;
    var token = this.$store.state.token;

    if (token != null) {
      if (!this.$store.state.userId.includes("@")) {
        link = link + "@";
      }
      var index = link.indexOf("@");
      link = link.substring(0, index);

      http
        .post("users/" + link, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          this.userImage = res.data.data.link;
          this.isRole = res.data.data.role;
        });
    }
  },
  beforeDestroy() {
    bus.$off("ChangePassword");
    bus.$off("ChangePasswordCancel");
    bus.$off("_HidePassword");
    bus.$off("_ShowPassword");
  },
  watch: {},
};
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";

.navbar.app-navbar {
  .navbar-container {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  height: $top-nav-height;
  padding-left: $nav-padding-left;
  padding-right: $nav-padding-right;
  background-color: $top-nav-bg;
  .avatar-container {
    display: inline-block;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    border: 2px solid $lighter-gray;
    overflow: hidden;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .menu-icon-container {
    padding: 0;
    font-size: $font-size-base;
  }
  .navbar-brand-container {
    position: absolute;
    z-index: 3;
    height: 100%;
    left: $navbar-brand-container-left;
    top: 0;
  }
  .nav-item {
    padding: 0;
    height: 100%;
  }
  .dropdown.navbar-dropdown {
    .dropdown-toggle {
      padding: 0;
      &:after {
        display: none;
      }
    }
    &.show {
      @include media-breakpoint-up(lg) {
        .dropdown-menu {
          left: auto;
          right: 0;
        }
      }
      &:after {
        position: absolute;
        bottom: -$dropdown-show-b;
        right: calc(50% - 10px);
        width: 0;
        height: 0;
        display: block;
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid $darkest-gray;
      }
    }
    .dropdown-menu {
      min-width: 10rem;
      max-width: 15rem;
      margin-top: $dropdown-show-b;
      padding-top: 0;
      width: 100%;
    }
    .dropdown-item {
      height: $navbar-dd-item-height;
      cursor: pointer;
      font-size: $font-size-base;
      &:hover,
      &:active,
      &:focus,
      &.active {
        outline: none;
      }
      &.plain-link-item {
        color: $brand-primary;
        &:hover,
        &:active,
        &:focus {
          background: $dropdown-background;
        }
        .plain-link {
          text-decoration: none;
        }
      }
    }
  }
  .notify {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: -6px;
      top: -6px;
      background-color: $brand-primary;
      height: 12px;
      width: 12px;
      border-radius: 50%;
    }
  }
  .i-nav-notification.notify::after {
    right: -4px;
    top: 0;
  }
  @include media-breakpoint-down(md) {
    height: $top-mobile-nav-height;
    padding: $nav-mobile-pt $nav-mobile-padding-h $nav-mobile-pb
      $nav-mobile-padding-h;
    .navbar-brand-container {
      width: $nav-mobile-brand-width;
      top: $nav-mobile-brand-top;
      left: $nav-mobile-brand-left;
      height: auto;
      .navbar-brand {
        height: $font-size-smaller;
        padding: 0;
        font-size: $font-size-smaller;
      }
    }
    .dropdown.navbar-dropdown {
      &.show {
        display: flex;
        &:after {
          bottom: -$dropdown-mobile-show-b;
          z-index: 2;
        }
        .dropdown-menu {
          margin-top: $dropdown-mobile-show-b;
          left: auto;
          &.last {
            right: 0;
          }
        }
      }
    }
  }
}
</style>
