<template>
  <div class="login">
    <div v-if="true">
      <img :src="wellcome" style="width: auto" />
      <br />
    </div>

    <div v-if="true">
      <br />
      <form @submit.prevent="onSubmit" name="login">
        <div class="form-group">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              type="text"
              title=" "
              id="email"
              v-model="email"
              required="required"
              oninvalid="this.setCustomValidity('Unesite korisničko ime.')"
              oninput="setCustomValidity('')"
            />
            <label class="control-label" for="email">{{'Korisničko ime'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <input
              onpaste="return false;"
              autocomplete="off"
              type="password"
              title=" "
              id="password"
              v-model="password"
              required="required"
              oninvalid="this.setCustomValidity('Unesite šifru.')"
              oninput="setCustomValidity('')"
            />
            <label class="control-label" for="password">{{'Šifra'}}</label>
            <i class="bar"></i>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-between down-container">
          <button class="btn btn-primary" type="submit">
            <span class="vuestic-icon vuestic-icon-auth"></span>
            {{'Prijava'}}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { bus } from "../../../main";
import { http } from "../../../../config/config.js";

export default {
  data() {
    return {
      locale: "ba",
      email: "",
      password: "",
      wellcome: "/static/Wellcome.png",
      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },

  mounted() {
    this.locale = Vue.i18n.locale();

    bus.$on("UserLoginDB", data => {
      this.toastText = "Greška prilikom konekcije na DB!";
      this.toastIcon = "fa-remove";
      this.toastPosition = "top-right";
      this.className = "vuestic-toast-danger";

      this.showToast(this.toastText, {
        icon: this.toastIcon,
        position: this.toastPosition,
        duration: this.toastDuration,
        fullWidth: this.isToastFullWidth,
        className: this.className
      });
    });

    bus.$on("UserLoginFind", data => {
      this.toastText = "Korisnik nije pronađen.";
      this.toastIcon = "fa-warning";
      this.toastPosition = "top-right";
      this.className = "vuestic-toast-warning";

      this.showToast(this.toastText, {
        icon: this.toastIcon,
        position: this.toastPosition,
        duration: 2500,
        fullWidth: this.false,
        className: this.className
      });
    });

    bus.$on("UserLoginPass", data => {
      this.toastText = "Unijeli ste pogrešnu šifru.";
      this.toastIcon = "fa-warning";
      this.toastPosition = "top-right";
      this.className = "vuestic-toast-warning";

      this.showToast(this.toastText, {
        icon: this.toastIcon,
        position: this.toastPosition,
        duration: 2500,
        fullWidth: this.false,
        className: this.className
      });
    });

    bus.$on("AccountExpired", data => {
      this.toastText = "Vaš korisnički račun je onemogućen.";
      this.toastIcon = "fa-remove";
      this.toastPosition = "top-right";
      this.className = "vuestic-toast-danger";

      this.showToast(this.toastText, {
        icon: this.toastIcon,
        position: this.toastPosition,
        duration: 2500,
        fullWidth: this.false,
        className: this.className
      });
    });
  },
  beforeDestroy() {
    bus.$off("UserLoginFind");
    bus.$off("UserLoginDB");
    bus.$off("UserLoginPass");
    bus.$off("AccountExpired");
  },

  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../sass/variables";
@import "../../../sass/toasts";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";

.login {
  @include media-breakpoint-down(md) {
    width: 100%;
    padding-right: 2rem;
    padding-left: 2rem;
    .down-container {
      .link {
        margin-top: 2rem;
      }
    }
  }
  .centar {
    margin: 0 auto;
  }
  h2 {
    text-align: center;
  }
  width: 21.375rem;
  .down-container {
    margin-top: 3.125rem;
  }
}
</style>
