<template>
  <div
    class="vuestic-radio-button form-check radio abc-radio"
    :class="additionalClasses"
  >
    <input
      class="form-check-input"
      type="radio"
      :name="name"
      :id="id"
      :value="value"
      :checked="checkState"
      @change="onChange"
      :disabled="disabled"
    />
    <label class="form-check-label" :for="id">
      <span v-if="!checkState" class="abc-label-text" style="color: #333">{{
        label
      }}</span>
      <span
        v-if="
          checkState &&
          
          label != 'MATIČNI BROJ' &&
          label != 'DATUM ROĐENJA' &&
          label != 'GODINA ROĐENJA' &&
          label != 'DATE OF BIRTH' &&
          label != 'YEAR OF BIRTH' &&
          label != 'GEBURTSDATUM' &&
          label != 'GEBURTSJAHR' &&
          label != 'Bosanski jezik' &&
          label != 'Engleski jezik' &&
          label != 'Njemački jezik' &&
          label != 'Bosnian language' &&
          label != 'English language' &&
          label != 'German language' &&
          label != 'Bosnische Sprache' &&
          label != 'Englische Sprache' &&
          label != 'Deutsche Sprache'
        "
        class="abc-label-text"
        style="color: #4ae387"
      >
        {{ label }}
      </span>
      <span
        v-if="
          checkState &&
          (label === 'MATIČNI BROJ' ||
            label === 'DATUM ROĐENJA' ||
            label === 'GODINA ROĐENJA' ||
            label === 'DATE OF BIRTH' ||
            label === 'YEAR OF BIRTH' ||
            label === 'GEBURTSDATUM' ||
            label === 'GEBURTSJAHR' ||
            label === 'Bosanski jezik' ||
            label === 'Engleski jezik' ||
            label === 'Njemački jezik' ||
            label === 'Bosnian language' ||
            label === 'English language' ||
            label === 'German language' ||
            label === 'Bosnische Sprache' ||
            label === 'Englische Sprache' ||
            label === 'Deutsche Sprache')
        "
        class="abc-label-text"
        style="color: #e34a4a"
      >
        {{ label }}
      </span>
    </label>
  </div>
</template>





<script>
import { bus } from "../../main";

export default {
  name: "postavke-radio-button",
  props: {
    label: String,
    value: {
      type: String,
      default: "",
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      default: undefined,
    },
    brandColor: {
      type: String,
      default: "danger",
      validator: (value) => {
        return (
          [
            "primary",
            "secondary",
            "success",
            "info",
            "warning",
            "danger",
          ].indexOf(value) >= 0
        );
      },
    },
  },
  model: {
    prop: "modelValue",
    event: "input",
  },
  mounted() {
    if (this.checked && !this.checkState) {
      this.toggle();
    }
  },
  methods: {
    NewEntry() {
      bus.$emit("OpstePostavkeNoviUnos");
    },
    onChange() {
      this.toggle();
    },
    toggle() {
      this.$emit("input", this.checkState ? "" : this.value);
    },
  },
  computed: {
    checkState() {
      if (this.modelValue === undefined) {
        return this.checked;
      }
      return this.modelValue === this.value;
    },
    additionalClasses() {
      if (
        this.label === "MATIČNI BROJ" ||
        this.label === "DATUM ROĐENJA" ||
        this.label === "GODINA ROĐENJA" ||
        this.label === "DATE OF BIRTH" ||
        this.label === "YEAR OF BIRTH" ||
        this.label === "GEBURTSDATUM" ||
        this.label === "GEBURTSJAHR" ||
        this.label === "Bosanski jezik" ||
        this.label === "Engleski jezik" ||
        this.label === "Njemački jezik" ||
        this.label === "Bosnian language" ||
        this.label === "English language" ||
        this.label === "German language" ||
        this.label === "Bosnische Sprache" ||
        this.label === "Englische Sprache" ||
        this.label === "Deutsche Sprache"
      ) {
        return ["abc-radio-" + this.brandColor];
      }
    },
  },
  watch: {
    checked(newValue) {
      if (newValue !== this.checkState) {
        this.toggle();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
