<template>
  <!-- <div
    id="app"
    class="app"
    @click="sessionExpiration($event)"
    @mousemove="sessionExpiration($event)"
  >-->
  <div id="app" class="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <layout v-else></layout>
  </div>
</template>

<script>
import Layout from "components/layout/Layout";
import AuthLayout from "./components/layout/AuthLayout";
import VuesticPreLoader from "./components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue";

export default {
  name: "app",
  data() {
    return {
      logout: setTimeout(() => {
        this.$store.dispatch("setLogoutTimer", 0);
      }, this.$store.state.idleTime),
      messageStr: ""
    };
  },
  onIdle() {
    this.messageStr = "Sign out";
    this.$store.dispatch("logout");
  },
  onActive() {
    this.messageStr = "Active";
    this.sessionExpiration();
  },
  components: {
    VuesticPreLoader,
    AuthLayout,
    Layout
  },
  computed: {
    isAuth() {
      return this.$route.path.match("auth");
    }
  },
  beforeCreate() {
    if (this.$store.state.access === undefined) {
      this.$store.dispatch("logout");
    } else {
      if (this.$store.state.access.level === null) {
        // console.warn("System access level not defined.");
        this.$store.dispatch("logout");
      }
    }
  },
  created() {
    this.$store.dispatch("autoLogin");
  },
  mounted() {
    window.addEventListener(
      "beforeunload",
      () => {
        // this.clearLocalStorage();
      },
      false
    );
  },
  methods: {
    clearLocalStorage(event) {
      if (event.currentTarget.performance.navigation.type == 0 || event.currentTarget.performance.navigation.type == 1) {
        this.$store.dispatch("logout");
      }
    },
    sessionExpiration(event) {
      if (this.$store.state.idleTime != null) {
        if (!this.$route.path.includes("auth")) {
          localStorage.setItem("idleTime", this.$store.state.idleTime);
          clearTimeout(this.logout);
          this.logout = setTimeout(() => {
            this.$store.dispatch("setLogoutTimer", 0);
          }, this.$store.state.idleTime);
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "sass/main";
body {
  height: 100%;
  .app {
    height: 100%;
  }
}
</style>
