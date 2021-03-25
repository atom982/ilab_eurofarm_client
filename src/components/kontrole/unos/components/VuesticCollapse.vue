<template>
  <div class="vuestic-collapse">
    <div
      class="vuestic-collapse__header"
      :class="{'vuestic-collapse__header--no-header': noHeader}"
      @click.prevent="onHeaderClick($event)"
    >
      <template v-if="noHeader">
        <slot name="header" />
      </template>
      <button
        v-else
        class="vuestic-collapse__header__button btn btn-warning"
        style="height: 40px; padding-top: 0.6rem; text-transform: none;"
      >
        <slot name="header" />

        <div class="col-md-7 icon-bar pull-right">
          <a href="#">
            <i class="fa fa-remove" id="remove"></i>
          </a>
        </div>
      </button>
    </div>

    <div class="vuestic-collapse__body" ref="collapseBody">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
import { bus } from "../../../../main";

export default {
  name: "vuestic-control-collapse",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    noHeader: Boolean,
    naziv: {
      type: String,
      default: ""
    }
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
      hitan: false
    };
  },
  watch: {
    show(show) {
      if (show) {
        this.expand();
      } else {
        this.collapse();
      }
    }
  },
  mounted() {
    this.toggle();
    this.accordion.onChildChange(this, this.show);
  },
  methods: {
    expand() {
      const bodyContent = this.$refs.collapseBody;
      bodyContent.style.height = this.$slots.body[0].elm.clientHeight + "px";

      this.show = true;
    },
    collapse() {
      const bodyContent = this.$refs.collapseBody;
      bodyContent.style.height = 0;

      this.show = false;
    },
    onHeaderClick(event) {
      switch (event.target.id) {
        case "remove":
          bus.$emit("ControlEntryRemove", this.naziv);
          break;
        case "":
          break;
        default:
          this.toggle();
          this.accordion.onChildChange(this, this.show);
          break;
      }
    },
    // Public
    toggle() {
      this.show ? this.collapse() : this.expand();
    }
  }
};
</script>

<style lang="scss">
@import "../../../../sass/_variables.scss";

.vuestic-collapse {
  & + & {
    margin-top: 8px;
  }

  &__body {
    height: 0;
    transition: height 0.3s;
    margin-top: 20px;
    background: $white;
    overflow: hidden;
  }

  &__header {
    &__button {
      width: 100%;
      padding-left: 1.5rem;
      padding-right: 0;
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

.icon-bar {
  width: 100%;
  overflow: auto;
}

.icon-bar a {
  float: right;
  width: 20%;
  text-align: center;
  transition: all 0.3s ease;
  color: $white;
}

.icon-bar a:hover {
  color: #e34a4a;
}
</style>
