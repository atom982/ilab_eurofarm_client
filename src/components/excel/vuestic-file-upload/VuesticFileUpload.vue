<template>
  <div class="vuestic-file-upload" :class="{'vuestic-file-upload--dropzone': dropzone}">
    <vuestic-file-upload-container
      :type="type"
      :fileTypes="fileTypes"
      :dropzone="dropzone"
      @upload="uploadFile"
    >
      <vuestic-file-upload-list
        v-if="files.length"
        :type="type"
        :files="files"
        @remove="removeFile"
        @remove-single="removeSingleFile"
      />
      <vuestic-modal-error ref="mediumModal" :no-buttons="false" cancelText="ZATVORI">
        <div slot="title">
          {{''}}
          <span style="color: #e34a4a;">{{'415: Unsupported Format'}}</span>
        </div>
        <div>
          <h5>{{'Format nije podržan.'}}</h5>
        </div>
      </vuestic-modal-error>
    </vuestic-file-upload-container>
  </div>
</template>

<script>
import VuesticFileUploadList from "./VuesticFileUploadList";
import VuesticFileUploadContainer from "./VuesticFileUploadContainer";
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";

export default {
  name: "vuestic-excel-file-upload",
  components: {
    VuesticFileUploadList: VuesticFileUploadList,
    VuesticFileUploadContainer: VuesticFileUploadContainer
  },
  props: {
    type: {
      type: String,
      default: "list",
      validator: function(value) {
        return ["list", "gallery", "single"].indexOf(value) !== -1;
      }
    },
    fileTypes: {
      type: String,
      default: ""
    },
    dropzone: {
      type: Boolean,
      default: false
    },
    value: {
      default: () => []
    }
  },
  methods: {
    uploadFile(e) {
      let files = e.target.files || e.dataTransfer.files;

      // type validation
      if (this.fileTypes) {
        files = this.validateFileTypes(files);
      }
      this.files = [...this.files, ...files];

      bus.$emit("Excel", e);
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    removeSingleFile() {
      this.files = [];
    },
    validateFileTypes(files) {
      return [...files].filter(file => {
        const fileName = file.name;
        const extn = fileName
          .substring(fileName.lastIndexOf(".") + 1)
          .toLowerCase();
        if (this.fileTypes.indexOf(extn) === -1) {
          // console.warn("Format nije podržan.");
          this.$refs.mediumModal.open();
        }
        return this.fileTypes.indexOf(extn) !== -1;
      });
    }
  },
  computed: {
    files: {
      get() {
        return this.value;
      },
      set(files) {
        this.$emit("input", files);
      }
    }
  }
};
</script>

<style lang='scss'>
@import "../../../sass/_variables.scss";

// Colors //
$gray-light: #acb5be !default;
$light-gray: #eeeeee;
$lighter-gray: #dddddd;
$charcoal: #555555;
$darkest-gray: #333333;
$almost-black: #161616;
$hover-black: #222222;
$vue-green: #4ae387;
$vue-light-green: #dbf9e8;
$light-green: #c8f9c5;
$lighter-green: #e9fde8;
$light-blue: #dcf1ff;
$light-yellow: #fff1c8;
$light-pink: #ffcece;
$vue-darkest-blue: #34495e;
$vue-turquoise: #dbf9e7;
$white: #ffffff;
$theme-red: #e34a4a;
$theme-orange: #f7cc36;
$theme-blue: #4ab2e3;
$theme-violet: #db76df;
$theme-pale: #d9d9d9;
$brand-primary: $vue-green !default;
$brand-danger: $theme-red;
$brand-warning: $theme-orange;
$brand-info: $theme-blue;
$brand-success: $vue-green;
$light-gray2: #eff4f5;
$dark-gray: #282828;
$gray: #adb3b9;
$violet: #db76df;
$dark-blue: #0045b6;
$text-gray: #b4b4b4;

.vuestic-file-upload {
  &--dropzone {
    background-color: $lighter-green;
    padding: 0 2rem;
    overflow: hidden;
  }
}

// Maybe we should create new component for text button
.btn-text {
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  padding: 0;

  & + & {
    margin-left: 1.5rem;
  }

  &--primary {
    color: $vue-green;

    &:hover {
      opacity: 0.6;
    }
  }

  &--secondary {
    color: $white;
  }
}

@media (max-width: 576px) {
  .vuestic-file-upload {
    &--dropzone {
      padding: 0 1rem;
    }
  }
}
</style>
