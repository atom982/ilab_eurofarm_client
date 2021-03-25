<template>
  <div class="vuestic-collapse">
    <div
      class="vuestic-collapse__header"
      :class="{'vuestic-collapse__header--no-header': noHeader}"
      @click="emitHeader($event)"
    >
      <template v-if="noHeader">
        <slot name="header"/>
      </template>

      <button
        v-else
        style="text-transform: none;"
        :class="{'vuestic-collapse__header__button btn btn-primary' : analyser.selected, 
        'vuestic-collapse__header__button btn btn-secondary' : !analyser.selected}"
      >
        <slot name="header"/>
      </button>
    </div>

    <div class="vuestic-collapse__body" ref="collapseBody">
      <slot name="body"/>
    </div>
  </div>
</template>

<script>
import { bus } from "../../../main";

export default {
  name: "vuestic-collapse-aparati",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    analyser: {
      type: Object,
      default: () => ({})
    },
    noHeader: Boolean
  },
  inject: {
    accordion: {
      default: () => ({
        onChildChange: () => {}
      })
    }
  },
  data() {
    return {
      show: this.value,
      clientHeight: ""
    };
  },
  watch: {
    show(show) {
      if (show) {
        this.expand();
      } else {
        this.collapse();
      }
    },
    clientHeight() {}
  },
  methods: {
    expand() {
      const bodyContent = this.$refs.collapseBody;
      bodyContent.style.height = this.clientHeight;
      this.show = true;
    },
    collapse() {
      const bodyContent = this.$refs.collapseBody;
      bodyContent.style.height = 0;
      this.show = false;
    },
    emitHeader(event) {
      bus.$emit("Analyser", this.analyser);
    },
    onHeaderClick() {
      // this.toggle();
      // this.accordion.onChildChange(this, this.show);
    },
    toggle() {
      this.show ? this.collapse() : this.expand();
    }
  }
};
</script>

<style lang="scss">
.vuestic-collapse {
  & + & {
    margin-top: 8px;
  }
  &__body {
    height: 0;
    transition: height 0s;
    margin-top: 20px;
    background: #ffff;
    overflow: hidden;
  }
  &__header {
    &__button {
      width: 100%;
      padding-left: 1.5rem;
      border-radius: 0;
      text-align: left;
    }
    &--no-header {
      margin-bottom: 1rem;
    }
  }
  .vuestic-collapse__body {
    margin-top: 0;
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #4ae387;
}
</style>
