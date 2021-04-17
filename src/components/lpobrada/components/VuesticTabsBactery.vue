<template>
  <div class="vuestic-tabs">
    <div class="d-none d-md-block dm-lg-block dm-xl-block">
      <nav class="nav nav-pills row">
        <div
          class="nav-item col"
          v-on:click="setActive(name)"
          :class="{active: name === currentActive}"
          v-for="name in names"
          :key="name"
        >
          <span v-if="name === currentActive" class="nav-link">
            <h6>
              <span>{{name}}</span>&nbsp;&nbsp;
              <i
                style="color:#4ae387;"
                class="fa fa-font"
                v-show="prikazi"
                @click.prevent="Antibiotik()"
              />
              <span style="color:#acb5be;" class="fa fa-font" v-show="!prikazi"></span>
            </h6>
          </span>
          <span v-if="name != currentActive" class="nav-link">
            <h6>{{name}}</h6>
          </span>
        </div>
      </nav>
      <div class="track">
        <div :class="underscoreClass"></div>
      </div>
    </div>
    <vuestic-simple-select
      class="d-flex d-md-none d-lg-none d-xl-none simple-select"
      v-bind:options="names"
      v-model="currentActive"
    ></vuestic-simple-select>
    <div class="tab-content">
      <div
        class="tab-pane"
        :class="{active: name === currentActive}"
        v-for="name in names"
        :key="name"
      >
        <slot :name="name"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { bus } from "../../../main";
import { http } from "../../../../config/config.js";

export default {
  name: "vuestic-tabs-bactery",
  props: ["names", "tab", "prikazi"],
  computed: {
    underscoreClass() {
      return (
        "underscore-" +
        this.names.length +
        "-" +
        this.names.indexOf(this.currentActive)
      );
    }
  },
  created() {},
  watch: {
    currentActive() {
      if (this.currentActive != "name") {
        bus.$emit("tabChanged", this.currentActive);
      } else {
      }
    }
  },
  methods: {
    Antibiotik() {
      bus.$emit("Antibiotik", this.currentActive);
    },
    setActive(name) {
      this.currentActive = name;
    }
  },
  data() {
    return {
      currentActive: this.tab
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/variables";

.vuestic-tabs {
  background-color: white;
  .simple-select {
    padding-top: 1.5rem;
  }
  .nav {
    margin: 0;
    padding-top: 0.85rem;
    .nav-item {
      flex-grow: 1;
      text-align: center;
      padding: 0;
      .nav-link {
        padding: 0;
        color: $gray;
        transition: all 0.3s ease;
      }
      &:hover {
        cursor: pointer;
        .nav-link {
          color: $vue-darkest-blue;
        }
      }
      &.active {
        .nav-link {
          color: $vue-darkest-blue;
        }
      }
    }
  }
  .track {
    overflow: hidden;
    width: 100%;
    height: 0.125rem;
    position: relative;
    div[class^="underscore-"] {
      background-color: $brand-primary;
      height: 0.125rem;
      position: absolute;
    }
    $koeff: 0.8;
    @for $all from 1 through 10 {
      $width: 1 / $all;
      div[class^="underscore-#{$all}"] {
        width: $width * $koeff * 100%;
        transition: left 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      @for $place from 0 through $all {
        .underscore-#{$all}-#{$place} {
          left: ($place + (1 - $koeff)/2) * $width * 100%;
        }
      }
    }
  }
  .tab-content {
    padding-bottom: $tab-content-pb;
    padding-top: $tab-content-pt;
    > .tab-pane {
      width: 100%;
    }
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #f7cc36;
}

i:hover {
  color: #f7cc36 !important;
}
</style>
