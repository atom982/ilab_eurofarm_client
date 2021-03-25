<template>
  <div class="form-group with-icon-left">
    <div class="input-group" v-show="true">
      <vuestic-date-picker
        style="min-width: 18rem;"
        id="date-picker-range"
        :config="config"
        v-model="datepicker.range"
        @on-change="doSomethingOnChangeDateRange"
      />
      <i class="fa fa-calendar icon-left input-icon"></i>
      <label class="control-label" for="date-picker-range">{{ 'Unesite opseg datuma' }}</label>
      <i class="bar"></i>
    </div>
  </div>
</template>



<script>
import { bus } from "../../../../main";
export default {
  name: "dateRange",
  data() {
    return {
      datepicker: {
        range: null
      },
      config: {
        mode: "range",
        minDate: new Date("2020-11-01"),
        maxDate: new Date(),
        altFormat: "F j, Y",
        dateFormat: "d.m.Y",
        locale: {
          firstDayOfWeek: 1,
          rangeSeparator: " do ",
          weekdays: {
            shorthand: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su"],
            longhand: [
              "Nedjelja",
              "Ponedjeljak",
              "Utorak",
              "Srijeda",
              "Četvrtak",
              "Petak",
              "Subota"
            ]
          },
          months: {
            shorthand: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "Maj",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Okt",
              "Nov",
              "Dec"
            ],
            longhand: [
              "Januar‎",
              "Februar‎",
              "Mart‎",
              "April‎",
              "Maj‎",
              "Juni‎",
              "Juli‎",
              "August‎",
              "Septembar‎",
              "Oktobar‎",
              "Novembar‎",
              "Decembar‎"
            ]
          }
        }
      }
    };
  },
  mounted() {
    bus.$on("setDateRange", data => {
      // console.log("BUS (DateRange): ");
      // console.log(data)
      this.datepicker.range = [];
      this.datepicker.range = [data.from[1], data.to[1]];
    });

    bus.$on("selectedItemsPerPage", () => {
      this.datepicker = {
        range: null
      };
    });
  },
  beforeDestroy() {
    bus.$off("setDateRange");
    bus.$off("selectedItemsPerPage");

    this.$emit("date-range", "", "");
  },

  methods: {
    doSomethingOnChangeDateRange(input) {
      if (input[1] != undefined) {
        var godina1 = input[0].toString().substring(11, 15);
        var mjesec1 = input[0].toString().substring(4, 7);
        var dan1 = input[0].toString().substring(8, 10);

        var godina2 = input[1].toString().substring(11, 15);
        var mjesec2 = input[1].toString().substring(4, 7);
        var dan2 = input[1].toString().substring(8, 10);

        switch (mjesec1) {
          case "Jan":
            mjesec1 = "01";
            break;
          case "Feb":
            mjesec1 = "02";
            break;
          case "Mar":
            mjesec1 = "03";
            break;
          case "Apr":
            mjesec1 = "04";
            break;
          case "May":
            mjesec1 = "05";
            break;
          case "Jun":
            mjesec1 = "06";
            break;
          case "Jul":
            mjesec1 = "07";
            break;
          case "Aug":
            mjesec1 = "08";
            break;
          case "Sep":
            mjesec1 = "09";
            break;
          case "Oct":
            mjesec1 = "10";
            break;
          case "Nov":
            mjesec1 = "11";
            break;
          case "Dec":
            mjesec1 = "12";
            break;
          default:
            mjesec1 = "00";
            break;
        }

        switch (mjesec2) {
          case "Jan":
            mjesec2 = "01";
            break;
          case "Feb":
            mjesec2 = "02";
            break;
          case "Mar":
            mjesec2 = "03";
            break;
          case "Apr":
            mjesec2 = "04";
            break;
          case "May":
            mjesec2 = "05";
            break;
          case "Jun":
            mjesec2 = "06";
            break;
          case "Jul":
            mjesec2 = "07";
            break;
          case "Aug":
            mjesec2 = "08";
            break;
          case "Sep":
            mjesec2 = "09";
            break;
          case "Oct":
            mjesec2 = "10";
            break;
          case "Nov":
            mjesec2 = "11";
            break;
          case "Dec":
            mjesec2 = "12";
            break;
          default:
            mjesec2 = "00";
            break;
        }

        var datum1 = godina1 + "-" + mjesec1 + "-" + dan1;
        var datum2 = godina2 + "-" + mjesec2 + "-" + dan2;

        this.$emit("date-range", datum1, datum2);

        var data = {
          od: datum1,
          do: datum2,
          from: input[0],
          to: input[1]
        };

        bus.$emit("DateRange", data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.search-icon {
  transform: rotate(90deg);
}

.form-group {
  min-width: 7rem;
}

@media (max-width: 768px) {
  .form-group {
    width: 80%;
  }
}
</style>
