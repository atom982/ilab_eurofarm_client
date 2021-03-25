<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget class="widget-height" :headerText="'Unos kontrole'">
          <div class="row">
            <div class="col-md-6">
              <vuestic-control-accordion
                v-for="uzorak in uzorciItems"
                :key="uzorak.naziv"
              >
                <vuestic-control-collapse :naziv="uzorak.naziv">
                  <span :id="uzorak.naziv" slot="header">{{
                    uzorak.naziv
                  }}</span>
                  <div slot="body">
                    <div class="va-row">
                      <div class="flex md12">
                        <div
                          class="collapse-page__content"
                          style="padding: 5px;"
                        >
                          <div>
                            <vuestic-tag-group
                              :uzorak="uzorak.naziv"
                              v-model="uzorak.Tags"
                              removable
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </vuestic-control-collapse>
                <div style="min-height: 8px;"></div>
              </vuestic-control-accordion>
            </div>
            <div class="col-md-6">
              <div class="vuestic-page-not-found-search">
                <div class="vuestic-page-not-found-search__content">
                  <div
                    class="vuestic-page-not-found-search__wallpaper flex md12"
                  >
                    <div class="va-row vuestic-page-not-found-search__message">
                      &nbsp;
                    </div>
                  </div>
                  <div class="vuestic-page-not-found-search__wallpaper">
                    <div class="form-group">
                      <div
                        class="input-group vuestic-page-not-found-search__input"
                      >
                        <input
                          placeholder="Pretraga"
                          style="color: white;"
                          v-model="inputValue"
                        />
                        <i class="bar" :style="'width: ' + 310 + 'px'" />
                      </div>
                    </div>
                  </div>
                  <div
                    class="vuestic-page-not-found-search__wallpaper vuestic-page-not-found-search__not-found-wallpaper-list"
                  >
                    <div class="vuestic-page-not-found-search__wrapper">
                      <ul
                        class="vuestic-page-not-found-search__list"
                        v-for="(category, index) in filterItems"
                        :key="index"
                        style="color: #f7cc36;"
                      >
                        {{
                          category.categoryName
                        }}
                        <li
                          class="vuestic-page-not-found-search__list-element"
                          v-for="(item, index) in category.items"
                          v-show="index < 20"
                          :key="index"
                        >
                          <a
                            @click.prevent="addEvent($event, category, item)"
                            :class="{
                              'unchosen-link': !item.izabran,
                              'plain-link': item.izabran,
                              unclickable: !item.clickable,
                            }"
                            href="#"
                            >{{ item.itemName }}</a
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div style="position: sticky; margin-bottom: 10px;" class="row">
                <div class="col-md-5"></div>
                <div class="col-md-3 pull-left" style="margin-top: 25px;">
                  <button
                    @click.prevent="Discard()"
                    class="btn btn-warning btn-micro"
                  >
                    {{ "ODUSTANI" }}
                  </button>
                </div>
                <div class="col-md-4 pull-right" style="margin-top: 25px;">
                  <button
                    @click="Save()"
                    class="btn btn-secondary btn-micro"
                    :disabled="!uzorciItems.length && !isLoading"
                  >
                    {{ "SAČUVAJ" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </vuestic-widget>
      </div>
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
          <button v-if="false" @click.prevent="Test">{{ "Loading..." }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { http } from "../../../../config/config.js";
import router from "../../../router";
import { bus } from "../../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import * as _ from "lodash";

export default {
  name: "kontrole-unos",

  components: {
    Loading,
  },

  data() {
    return {
      categories: [],
      inputValue: "",
      uzorciItems: [],

      isLoading: false,
      fullPage: true,

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",
    };
  },
  mounted() {
    bus.$on("ControlEntryRemove", (data) => {
      this.uzorciItems = _.reject(this.uzorciItems, function (el) {
        return el.naziv === data;
      });

      this.categories.forEach((element) => {
        element.items.forEach((el) => {
          if (el.itemName === data) {
            el.izabran = false;
          }
        });
      });
    });

    bus.$on("ControlTestRemove", (test, kontrola) => {
      this.uzorciItems.forEach((element) => {
        element.data.testovi.forEach((el) => {
          if (
            el.labassay.naziv === test &&
            element.data.itemName === kontrola
          ) {
            el.testIzabran = false;
          }
        });
      });
    });
  },
  beforeDestroy() {
    bus.$off("ControlEntryRemove");
    bus.$off("ControlTestRemove");
  },
  created() {
    this.toggleSidebar(false);

    http
      .get(
        "kontrole/list/all?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        // console.log(res.data.kontrole);

        var DataInactive = {
          categoryName: "Istekle kontrole",
          items: [],
        };

        var DataActive = {
          categoryName: "Aktivne kontrole",
          items: [],
        };

        res.data.kontrole.forEach((element) => {
          element.analize.forEach((analiza) => {
            analiza.testIzabran = true;
          });

          if (new Date(Date.now()) > new Date(element.rok)) {
            var items = {
              kontrola: element,
              itemName: element.naziv + " | LOT: " + element.lot,
              itemLink: "#",
              clickable: false,
              izabran: false,
              testovi: element.analize,
            };
            DataInactive.items.push(items);
          } else {
            var items = {
              kontrola: element,
              itemName: element.naziv + " | LOT: " + element.lot,
              itemLink: "#",
              clickable: true,
              izabran: false,
              testovi: element.analize,
            };
            DataActive.items.push(items);
          }
        });

        this.categories.push(DataActive);
        this.categories.push(DataInactive);
      });
  },
  beforeRouteLeave(to, from, next) {
    this.toggleSidebar(true);
    next();
  },
  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"]),
    filterItems() {
      if (this.inputValue.length >= 1) {
        return this.categories
          .map((category) => {
            return {
              categoryName: category.categoryName,
              items: category.items.filter(
                (item) =>
                  item.itemName
                    .toUpperCase()
                    .search(this.inputValue.toUpperCase()) !== -1
              ),
            };
          })
          .filter((category) => category.items.length >= 1);
      } else {
        return this.categories;
      }
    },
  },
  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),
    addEvent(event, category, item) {
      // console.log(item);

      var Analize = [];
      var obj = {};

      item.testovi.forEach((analiza) => {
        Analize.push(analiza.labassay.naziv);
      });
      var obj = {
        data: item,
        naziv: item.itemName,
        Tags: Analize,
        Refs: [],
      };

      if (item.clickable && !item.izabran) {
        this.uzorciItems.push(obj);

        this.categories.forEach((element) => {
          element.items.forEach((el) => {
            if (el.itemName === item.itemName) {
              el.izabran = true;
            }
          });
        });
      }
    },
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},
    Discard() {
      this.uzorciItems = [];
      router.push("/statistika");
    },
    Save() {
      this.isLoading = true;
      var counter = 0;

      this.uzorciItems.forEach((element) => {
        http
          .post("kreference/list/all", {
            token: this.$store.state.token,
            site: this.$store.state.site,
            kontrola: element.data.kontrola._id,
          })
          .then((res) => {
            counter++;
            // console.log(res.data.kreference);

            res.data.kreference.forEach((resData) => {
              element.Refs.push(resData);
            });

            if (this.uzorciItems.length === counter) {
              var Kontrole = [];
              var obj = {};

              this.uzorciItems.forEach((element) => {
                obj = {};

                element.data.testovi = _.reject(element.data.testovi, function (
                  el
                ) {
                  return el.testIzabran === false;
                });

                obj = {
                  kontrola: element.data.kontrola,
                  analize: element.data.testovi,
                  reference: element.Refs,
                };

                Kontrole.push(obj);
              });

              var ControlSamples = [];
              var Control = {};
              var Tests = [];
              var test = {};

              Kontrole.forEach((element) => {

                Tests = [];
                Control = {};

                Control.kontrola = element.kontrola;
                Control.tests = [];

                element.analize.forEach((analiza) => {
                  
                  element.reference.forEach((reference) => {
                    reference.reference.forEach((kref) => {
                      if (JSON.stringify(analiza.labassay._id) === JSON.stringify(kref.labassay) && 
                      JSON.stringify(element.kontrola._id) === JSON.stringify(reference.kontrola._id)) {


                        test = {};
                        // console.log(reference.aparat.ime + " | " + analiza.labassay.naziv);

                        test.aparat = reference.aparat._id;
                        test.labassay = kref.labassay;
                        test.anaassay = kref.anaassay;
                        test.status = "ZAPRIMLJEN";
                        test.retest = false;
                        test.rezultat = [
                          {
                            sn: "",
                            vrijeme_prijenosa: "",
                            vrijeme_rezultata: "",
                            dilucija: "",
                            ref_d: kref.refd,
                            ref_g: kref.refg,
                            interpretacija: kref.interpretacija,
                            module_sn: "",
                            reagens_lot: "",
                            reagens_sn: "",
                            rezultat_f: "",
                            jedinice_f: kref.jedinica,
                            rezultat_p: "",
                            jedinice_p: "",
                            rezultat_i: "",
                          },
                        ];

                        Tests.push(test);
                      }
                    });
                  });
                });

                Control.tests = Tests;

                ControlSamples.push(Control);
              });

              http
                .post("kontrole/unos/save", {
                  token: this.$store.state.token,
                  site: this.$store.state.site,
                  Kontrole: ControlSamples,
                })
                .then((res) => {
                  this.isLoading = false;

                  // console.log(res.data);

                  this.InitData();

                  if (res.data.success) {
                    this.toastText = "Unos uspješno obavljen.";
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
                  } else {
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
                });
            }
          });
      });
    },
    InitData() {
      this.uzorciItems = [];
      this.categories = [];

      http
        .get(
          "kontrole/list/all?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then((res) => {
          // console.log(res.data.kontrole);

          var DataInactive = {
            categoryName: "Istekle kontrole",
            items: [],
          };

          var DataActive = {
            categoryName: "Aktivne kontrole",
            items: [],
          };

          res.data.kontrole.forEach((element) => {
            element.analize.forEach((analiza) => {
              analiza.testIzabran = true;
            });

            if (new Date(Date.now()) > new Date(element.rok)) {
              var items = {
                kontrola: element,
                itemName: element.naziv + " | LOT: " + element.lot,
                itemLink: "#",
                clickable: false,
                izabran: false,
                testovi: element.analize,
              };
              DataInactive.items.push(items);
            } else {
              var items = {
                kontrola: element,
                itemName: element.naziv + " | LOT: " + element.lot,
                itemLink: "#",
                clickable: true,
                izabran: false,
                testovi: element.analize,
              };
              DataActive.items.push(items);
            }
          });

          this.categories = [];

          this.categories.push(DataActive);
          this.categories.push(DataInactive);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables.scss";

.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.widget-height {
  min-height: 830px;
}
.vuestic-page-not-found-search {
  min-height: 655px;
  padding-bottom: 35px;
  background-color: $top-nav-bg;
  &__text {
    padding-top: 50px;
    color: white;
  }
  &__text-small {
    font-size: $font-size-root;
    line-height: 1.5;
    text-align: center;
    color: white;
    font-weight: normal;
  }
  &__i-vuestic {
    margin-top: 100px;
  }
  &__list {
    color: white;
  }
  &__input {
    width: 310px;
  }
  &__wallpaper {
    max-height: 40%;
    display: flex;
    justify-content: center;
    a {
      margin-top: 2rem;
    }
  }
  &__i-vuestic {
    z-index: 2;
    height: $auth-wallpaper-ivuestic-h;
    width: 100%;
  }
  &__message {
    justify-content: center;
  }
  &__wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
.unchosen-link {
  color: $white;
  text-decoration: none;
}

.unclickable {
  color: #e34a4a;
  text-decoration: none;
}
</style>
