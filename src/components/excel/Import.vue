<template>
  <div class="file-upload-page">
    <div class="flex md12">
      <vuestic-widget :headerText="'Import from Excel Document'">
        <vuestic-excel-file-upload dropzone v-model="Files" :file-types="'.xlsx, .xls'" />
      </vuestic-widget>
    </div>

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
          <button v-if="false" @click.prevent="Test">{{'Loading...'}}</button>
        </div>
      </div>
    </div>

    <vuestic-modal-error ref="mediumModalParse" :no-buttons="false" cancelText="ZATVORI">
      <div slot="title">
        {{''}}
        <span style="color: #e34a4a;">{{'409: Template parse error'}}</span>
      </div>
      <div>
        <h5>{{'Unexpected data.'}}</h5>
      </div>
    </vuestic-modal-error>
  </div>
</template>

<script>
import XLSX from "xlsx";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

export default {
  props: {
    beforeUpload: Function,
    onSuccess: Function
  },
  data() {
    return {
      Files: [],
      type: "xlsx_sample",

      isLoading: false,
      fullPage: true,

      excelData: {
        header: null,
        results: null
      },
      Sheet: "",

      // Data
      Sekcije: [],

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },
  components: {
    Loading
  },
  watch: {
    Files: function() {
      if (this.Files.length > 1) {
        this.Files.splice(0, this.Files.length - 1);
      }
    },
    Sheet: function() {
      if (this.Sheet != "") {
        // console.warn("Sheet Name: " + this.Sheet);

        switch (this.Sheet) {
          case "Sekcija":
            if (this.excelData.header[0] === "SEKCIJA" && this.excelData.header[1] === "Redni broj") {
              var check = true;
              var obj = {
                order: "",
                sekcija: ""
              };
              this.Sekcije = [];

              this.excelData.results.forEach(element => {
                obj = {
                  order: JSON.stringify(element["Redni broj"]),
                  sekcija: element["SEKCIJA"]
                };

                this.Sekcije.push(obj);

                obj = {
                  order: "",
                  sekcija: ""
                };
              });

              this.Sekcije.forEach(element => {
                if (element.order === undefined || element.sekcija === undefined || element.order === "" || element.sekcija === "" || isNaN(element.order)) {
                  check = false;
                }
              });
              if (check) {
                if (this.Sekcije.length) {
                  this.Sekcije.forEach(element => {
                    element.order = element.order.trim();
                    element.sekcija = element.sekcija.trim();
                  });
                  // console.log("Successfully parsed.");
                  // console.log(this.Sekcije);

                  http
                    .post("import/xlsx/sekcije", {
                      Sekcije: this.Sekcije,
                      token: this.$store.state.token,
                      site: this.$store.state.site
                    })
                    .then(res => {
                      // console.log(res.data);
                      if (res.data.success) {
                      }
                    });
                } else {
                  // console.log("No data.");
                }
              } else {
                // console.warn("Template parse error: Unexpected data.");
                this.$refs.mediumModalParse.open();
              }
            } else {
              // console.warn("Template parse error: Unexpected data.");
              this.$refs.mediumModalParse.open();
            }
            this.Sheet = "";

            break;

          default:
            break;
        }
      }
    }
  },

  created() {},

  mounted() {
    bus.$on("Excel", data => {
      this.handleClick(data);
    });
    bus.$on("FileUploadError", () => {
      this.isLoading = false;
    });
  },

  beforeDestroy() {
    bus.$off("Excel");
    bus.$off("FileUploadError");
  },

  methods: {
    Parse() {
      switch (this.Sheet) {
        case "Sekcija":
          break;

        default:
          break;
      }
    },
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Download(type) {
      switch (type) {
        case "xlsx_sample":
          this.type = "xlsx_sample";
          // console.warn("Download not initialized...");
          break;

        default:
          this.type = "xlsx_sample";
          http
            .get(
              "fetch/templates?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&type=" +
                this.type,
              {
                responseType: "arraybuffer"
              }
            )
            .then(res => {
              const url = window.URL.createObjectURL(new Blob([res.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", this.type + ".xlsx");
              document.body.appendChild(link);
              link.click();
            });
          break;
      }
    },

    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
      this.isLoading = false;
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (false) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleClick(e) {
      this.isLoading = true;
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);

          this.Sheet = firstSheetName;

          this.generateData({ header, results });
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    }
  }
};
</script>

<style scoped>
</style>