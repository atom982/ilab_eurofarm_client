<template>
  <div>
    <div class="col-md-12">
      <!--  -->
      <vuestic-widget class="widget-height" headerText="Prijem">
        <div class="row">
          <div class="col-md-4">
            <vuestic-accordion-patient-info>
              <vuestic-collapse-patient-info>
                <span v-show="patient.ime != ''" slot="header">{{
                  patient.ime + " " + patient.prezime
                }}</span>
                <div slot="body">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="collapse-page__content" style="padding: 10px">
                        <div v-show="true"></div>
                        <div style="min-height: 8px"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </vuestic-collapse-patient-info>
              <div style="min-height: 8px"></div>
            </vuestic-accordion-patient-info>

            <div class="col-md-12" v-show="patient.analysis != ''">
              &nbsp;&nbsp;&nbsp;<span>{{ " " }}</span
              ><strong style="color: #e34a4a">{{
                " " + patient.analysis
              }}</strong>
            </div>

            <div class="col-md-12" v-show="patient.analysis === ''">
              &nbsp;&nbsp;&nbsp;<span>{{ " " }}</span
              ><span style="color: #e34a4a">{{ " " }}</span>
            </div>

            <div style="min-height: 5px"></div>

            <div v-show="lokacije.length > 1" style="min-height: 5px"></div>

            <div class="col-md-12">
              <vuestic-simple-select
                v-show="lokacije.length > 1"
                :label="'Izaberite pošiljaoca pacijenta'"
                v-model="lokacija"
                name="lokacija"
                :required="true"
                title=" "
                ref="lokacijaSelect"
                v-bind:options="lokacije"
              ></vuestic-simple-select>
            </div>

            <vuestic-accordion-samples-entry
              v-for="uzorak in uzorciItems"
              :key="uzorak.tip"
            >
              <vuestic-collapse-samples-entry
                :uzorak="uzorak.tip"
                :komentar="uzorak.komentar"
                :vrijeme="uzorak.time"
                :tags="uzorak.testoviTag"
              >
                <span :id="uzorak.tip" slot="header">{{ uzorak.opis }}</span>
                <div slot="body">
                  <div class="vrow">
                    <div class="col-md-12" style="padding-top: 0px">
                      <div class="collapse-page__content" style="padding: 5px">
                        <div>
                          <div style="min-height: 15px"></div>
                          <vuestic-tag-group
                            :uzorak="uzorak.tip"
                            v-model="uzorak.testoviTag"
                            removable
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </vuestic-collapse-samples-entry>
              <div style="min-height: 8px"></div>
            </vuestic-accordion-samples-entry>
          </div>

          <!--  -->
          <div class="col-md-8">
            <div class="vuestic-page-not-found-search">
              <div class="vuestic-page-not-found-search__content">
                <div class="vuestic-page-not-found-search__wallpaper col-md-12">
                  <div class="row vuestic-page-not-found-search__message">
                    &nbsp;
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-6">
                    <div class="vuestic-page-not-found-search__wallpaper">
                      <div class="form-group">
                        <div
                          class="input-group vuestic-page-not-found-search__input"
                        >
                          <input
                            placeholder="Pretraga"
                            style="color: white"
                            v-model="inputValue"
                          />
                          <i class="bar" :style="'width: ' + 310 + 'px'" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="
                      kategorijeL.length >
                        $store.state.display.rows *
                          $store.state.display.columns && inputValue.length < 1
                    "
                    class="col-md-3"
                  >
                    <br />
                  </div>
                </div>

                <div
                  class="vuestic-page-not-found-search__wallpaper vuestic-page-not-found-search__not-found-wallpaper-list"
                >
                  <div
                    class="vuestic-page-not-found-search__wrapper"
                    :style="{ 'grid-template-columns': colrows }"
                  >
                    <ul
                      class="vuestic-page-not-found-search__list"
                      v-for="(category, index) in filterItems"
                      v-show="
                        index <
                          $store.state.display.rows *
                            $store.state.display.columns &&
                        category.categoryName != 'Ostalo'
                      "
                      :key="index"
                      style="color: #f7cc36"
                    >
                      {{
                        category.categoryName
                      }}
                      <li
                        class="vuestic-page-not-found-search__list-element"
                        v-for="(item, index) in category.items"
                        v-show="index < $store.state.display.show"
                        :key="index"
                      >
                        <a
                          @click.prevent="
                            testEvent($event, category, item, item.cijena)
                          "
                          :id="item.itemName"
                          :class="{
                            disabled:
                              uzorciItems.length > 0 ||
                              (category.categoryName ===
                                'Molekularna mikrobiologija' && item.itemName === 'CoV2 RT PCR' &&
                                !$store.state.configuration.unos.rt) ||
                              (category.categoryName ===
                                'Molekularna mikrobiologija' && item.itemName === 'CoV2 RT LAMP' &&
                                !$store.state.configuration.unos.lp) ||
                              (category.categoryName ===
                                'Rapid Diagnostic Tests' && item.itemName === 'CoV2 Antigen' &&
                                !$store.state.configuration.unos.ag) ||
                              (category.categoryName ===
                                'Serološka dijagnostika' && (item.itemName === 'CoV2 IgM Ab' || item.itemName === 'CoV2 IgG Ab') &&
                                !$store.state.configuration.unos.at),

                            'unchosen-link': !item.izabran,
                            'plain-link': item.izabran,
                            'disabled-link':
                              (category.categoryName ===
                                'Molekularna mikrobiologija' && item.itemName === 'CoV2 RT PCR' &&
                                !$store.state.configuration.unos.rt) ||
                              (category.categoryName ===
                                'Molekularna mikrobiologija' && item.itemName === 'CoV2 RT LAMP' &&
                                !$store.state.configuration.unos.lp) ||
                              (category.categoryName ===
                                'Rapid Diagnostic Tests' && item.itemName === 'CoV2 Antigen' &&
                                !$store.state.configuration.unos.ag) ||
                              (category.categoryName ===
                                'Serološka dijagnostika' && (item.itemName === 'CoV2 IgM Ab' || item.itemName === 'CoV2 IgG Ab') &&
                                !$store.state.configuration.unos.at),
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

            <div
              style="position: sticky; margin-bottom: 10px"
              class="row"
              v-if="loaded"
            >
              <div class="col-md-5"></div>
              <div class="col-md-3 pull-left" style="margin-top: 25px">
                <button
                  @click.prevent="Discard()"
                  class="btn btn-warning btn-micro"
                >
                  {{ "ODUSTANI" }}
                </button>
              </div>
              <div class="col-md-4 pull-right" style="margin-top: 25px">
                <button
                  @click.once="Save()"
                  class="btn btn-secondary btn-micro"
                  :disabled="save || lokacija == ''"
                >
                  {{ "SAČUVAJ" }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </vuestic-widget>

      <modal-calendar
        :show.sync="showCalendar"
        :sample="sample"
        :vrijeme="vrijeme"
        ref="staticModalSamplesEntryCalendar"
      >
        <div slot="title">{{ "Vrijeme uzorkovanja" }}</div>
      </modal-calendar>
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
          <button v-if="false" @click.prevent="Test">
            {{ "Loading..." }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { http } from "../../../config/config.js";
import router from "../../router";
import { bus } from "../../main";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "samples-entry",

  data() {
    return {
      show: true,
      colrows: "repeat(7, 1fr)",
      page: 1,
      kategorijeL: [],
      uniqueArray: [],
      timestamp: "",
      pid: "",
      pids: [],
      complete: [],
      patient: {
        ime: "",
        prezime: "",
        analysis: "",
      },
      spol: "",
      drstanje: "",
      anticoag: "",
      potvrdi: "SAČUVAJ",
      odustani: "ODUSTANI",
      lokacije: [],
      lokacijeInit: [],
      lokacija: "",
      categories: [],
      inputValue: "",
      sample: "",
      komentar: "",
      vrijeme: "",
      siteCode: "",

      uzorciList: [
        {
          ime: "Bris",
          code: ["CoV2 RT PCR"],
          tip: "CoV2 RT PCR",
          opis: "CoV2 RT PCR",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: JSON.stringify(
            new Date(
              new Date().getTime() - new Date().getTimezoneOffset() * 60000
            )
          )
            .slice(1, -9)
            .replace("T", " "),
          komentar: "",
        },
        {
          ime: "Bris",
          code: ["CoV2 RT LAMP"],
          tip: "CoV2 RT LAMP",
          opis: "CoV2 RT LAMP",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: JSON.stringify(
            new Date(
              new Date().getTime() - new Date().getTimezoneOffset() * 60000
            )
          )
            .slice(1, -9)
            .replace("T", " "),
          komentar: "",
        },
        {
          ime: "Bris",
          code: ["CoV2 Antigen"],
          tip: "CoV2 Antigen",
          opis: "CoV2 Antigen",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: JSON.stringify(
            new Date(
              new Date().getTime() - new Date().getTimezoneOffset() * 60000
            )
          )
            .slice(1, -9)
            .replace("T", " "),
          komentar: "",
        },
        {
          ime: "Serum",
          code: ["CoV2 Antitijela"],
          tip: "CoV2 Antitijela",
          opis: "CoV2 Antitijela",
          patient: {},
          testovi: [],
          testoviTag: [],
          hitno: false,
          time: JSON.stringify(
            new Date(
              new Date().getTime() - new Date().getTimezoneOffset() * 60000
            )
          )
            .slice(1, -9)
            .replace("T", " "),
          komentar: "",
        },
      ],

      showCalendar: true,
      prioritet: "NORMALAN",
      uzorciListLoaded: false,
      initiatedEntry: false,
      oldUzorciList: [],
      save: true,
      loaded: false,

      sampled: false,
      sampled_by: null,
      BrojProtokola: "",
      statusUzorka: "ZAPRIMLJEN",

      // Vue Loading
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

  components: {
    Loading,
  },

  computed: {
    ...mapGetters(["sidebarOpened", "toggleWithoutAnimation"]),

    filterItems() {
      if (this.inputValue.length >= 1) {
        return this.categories
          .map((category) => {
            return {
              categoryName: category.categoryName,
              bundle: category.bundle,
              items: category.items.filter(
                (item) =>
                  item.itemName
                    .toUpperCase()
                    .search(this.inputValue.toUpperCase()) !== -1 ||
                  item.opis
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

    uzorciItems: function () {
      return this.uzorciList.filter(
        (i) =>
          i.testoviTag.length && this.uzorciListLoaded && this.initiatedEntry
      );
    },
  },

  watch: {
    uzorciList: {
      handler: function (after, before) {
        if (this.uzorciListLoaded && this.initiatedEntry) {
          // console.log("Watching: uzorciList");
          var vm = this;

          let changed = after.filter(function (p, idx) {
            return Object.keys(p).some(function (prop) {
              return p[prop] !== vm.$data.oldUzorciList[idx][prop];
            });
          });

          vm.setValue();

          var condition = false;
          this.uzorciList.forEach((element) => {
            if (element.testovi.length) {
              condition = true;
            }
          });

          if (condition) {
            this.save = false;
            // console.log("Save enabled.");
          } else {
            this.save = true;
            // console.log("Save disabled.");
          }
        }
      },
      deep: true,
    },
  },

  beforeRouteLeave(to, from, next) {
    this.toggleSidebar(true);
    next();
  },

  beforeCreate() {
    http
      .get(
        "postavke/list/def/uzorak?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        if (res.data.success) {
          if (res.data.uzorci.length) {
            this.uzorciListLoaded = true;
            // JSON.parse(JSON.stringify(res.data.uzorci))
            this.setValue();
            // console.log(this.uzorciList);
            http
              .get(
                "pacijenti/detalji/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then((res) => {
                this.uzorciList.forEach((element) => {
                  element.patient = res.data.pacijent;
                  this.patient = res.data.pacijent;
                });
              })
              .then((res) => {
                this.spol = this.patient.spol;
                http
                  .get(
                    "get/pid/today/?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site +
                      "&patient=" +
                      this.patient._id,
                    {}
                  )
                  .then((res) => {
                    this.pids = res.data.pids;
                    this.complete = res.data.complete;
                    this.pid = this.pids[0];
                  });
              });
          } else {
            // console.warn("Lista uzoraka je prazna.");

            this.uzorciListLoaded = true;
            this.setValue();

            http
              .get(
                "pacijenti/detalji/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site,
                {}
              )
              .then((res) => {
                this.uzorciList.forEach((element) => {
                  element.patient = res.data.pacijent;
                  this.patient = res.data.pacijent;
                });
              })
              .then((res) => {
                this.spol = this.patient.spol;
                http
                  .get(
                    "get/pid/today/?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site +
                      "&patient=" +
                      this.patient._id,
                    {}
                  )
                  .then((res) => {
                    this.pids = res.data.pids;
                    this.complete = res.data.complete;
                    this.pid = this.pids[0];
                  });
              });
          }
        } else {
          // console.warn("Greška prilikom dohvaćanja liste uzoraka.");
        }
      });
  },

  created() {
    this.colrows =
      "repeat(" +
      this.$store.state.display.columns +
      "," +
      this.$store.state.display.rows +
      "fr)";

    this.toggleSidebar(false);

    bus.$on("removeTest", (data, uzorak) => {
      if (!data.bundle) {
        this.uzorciList.forEach((element) => {
          if (element.tip === uzorak) {
            for (var i = 0; i < element.testovi.length; i++) {
              if (element.testovi[i].itemName === data.name) {
                element.testovi.splice(i, 1);

                break;
              }
            }
          }
        });

        this.categories.forEach((element) => {
          element.items.forEach((item) => {
            if (item.itemName === data.name) {
              item.izabran = false;
            }
          });
        });
      } else {
        this.uzorciList.forEach((element) => {
          if (element.tip === uzorak) {
            for (var i = 0; i < element.testovi.length; i++) {
              if (element.testovi[i].itemName === data.name) {
                element.testovi.splice(i, 1);

                break;
              }
            }
          }
        });

        var uslov = true;

        this.categories.forEach((element) => {
          element.items.forEach((item) => {
            if (element.bundle) {
              item.testovi.forEach((test) => {
                if (test.itemName === data.name) {
                  if (uslov) {
                    uslov = false;
                  }

                  item.izabran = false;
                  test.izabran = false;
                }
              });
            }
          });
        });

        this.categories.forEach((cat) => {
          cat.items.forEach((it) => {
            if (it.itemName === data.name) {
              it.izabran = false;
            }
          });
        });
      }
    });

    bus.$on("SamplesEntryCalendar", (data, vrijeme) => {
      this.sample = data;
      this.vrijeme = vrijeme;

      this.$refs.staticModalSamplesEntryCalendar.open();
    });

    bus.$on("setCalendar", (data, time) => {
      // "2021-03-11 06:41"
      // ISODate("2021-03-11T06:41:34.718Z")

      // console.log(time)

      // var date = time.replace(" ", "T") + ":00.000Z"

      // date = JSON.stringify(
      //       new Date(
      //         new Date(date).getTime() - new Date(date).getTimezoneOffset() * 60000
      //       )
      //     )
      //       .slice(1, -9)
      //       .replace("T", " ")

      // console.log(date)

      this.uzorciList.forEach((element) => {
        if (element.tip === data) {
          element.time = time;
        }
      });
    });

    bus.$on("SamplesEntryRemove", (data) => {
      this.uzorciList.forEach((element) => {
        if (element.tip === data) {
          element.testovi.forEach((tst) => {
            this.categories.forEach((ctgelement) => {
              ctgelement.items.forEach((item) => {});
            });
          });

          element.testovi = [];
          element.code = [];
          element.testoviTag = [];
          element.hitno = false;
        }
      });

      this.categories.forEach((element) => {
        element.items.forEach((item) => {
          if (item.uzorak === data) {
            item.izabran = false;
          }

          if (item.testovi != undefined) {
            item.testovi.forEach((test) => {
              if (test.uzorak === data) {
                item.izabran = false;
                test.izabran = false;
              }
            });
          }
        });
      });
    });

    bus.$on("SamplesEntryUrgent", (data) => {
      this.uzorciList.forEach((element) => {
        if (element.tip === data) {
          element.hitno = true;
          this.prioritet = "HITAN";
        }
      });
    });

    bus.$on("SamplesEntryRemoveUrgent", (data) => {
      this.uzorciList.forEach((element) => {
        if (element.tip === data) {
          element.hitno = false;
          this.prioritet = "NORMALAN";
        }
      });
    });

    http
      .post("/postavke/sajtovi/" + this.$store.state.site, {
        token: this.$store.state.token,
      })
      .then((res) => {
        this.siteCode = res.data.sajt.sifra;
      });
  },

  mounted() {
    http
      .get(
        "/uzorci/lokacije/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        if (res.data.lokacije.length != 0) {

          if (this.$store.state.configuration.unos.rt === false) {
            
            this.lokacije = [];

            this.lokacije.push(res.data.lokacije[0].lokacija);
            this.lokacijeInit.push(res.data.lokacije[0]);

          } else {

            this.lokacije = [];

            res.data.lokacije.forEach((element) => {
              this.lokacije.push(element.lokacija);
              this.lokacijeInit.push(element);
            });
          }

        }

        // this.lokacije.sort(function (a, b) {
        //   return a.localeCompare(b, undefined, {
        //     numeric: true,
        //     sensitivity: "base",
        //   });
        // });

        // this.lokacijeInit.sort(function (a, b) {
        //   return a.lokacija.localeCompare(b.lokacija, undefined, {
        //     numeric: true,
        //     sensitivity: "base",
        //   });
        // });

        if (this.lokacije.length < 2) {
          this.lokacija = this.lokacije[0];
        }

        // console.log(this.lokacija)
      });

    http
      .post("/labassays", {
        site: this.$store.state.site,
        token: this.$store.state.token,
      })
      .then((res) => {
        var i = 0;
        var kategorije = [];

        var LabAssays = [];

        res.data.testovi.forEach((element) => {
          LabAssays.push(element);
        });

        LabAssays = LabAssays.sort(function (a, b) {
          return (
            a.entryorder.localeCompare(b.entryorder, undefined, {
              numeric: true,
              sensitivity: "base",
            }) ||
            a.naziv.localeCompare(b.naziv, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          );
        });

        LabAssays.forEach((element) => {
          if (
            !kategorije.filter(
              (kategorija) =>
                kategorija === element.kategorija.split("|")[0].trim()
            ).length > 0
          ) {
            kategorije.push(element.kategorija.split("|")[0].trim());
          }
        });

        var temporaryCategory = {};
        var Klasa = "primary";

        kategorije.forEach((kategorija) => {
          temporaryCategory = {};
          temporaryCategory.categoryName = kategorija;
          temporaryCategory.bundle = false;
          temporaryCategory.items = [];

          LabAssays.forEach((element) => {
            if (element.manual) {
              Klasa = "pale";
            } else {
              Klasa = "primary";
            }

            if (element.kategorija.split("|")[0].trim() === kategorija) {
              if (kategorija === "Specifične") {
                temporaryCategory.bundle = true;

                if (element.calculated && element.specific) {
                  // Do nothing.
                } else {
                  if (!element.specific) {
                    temporaryCategory.items.push({
                      _idlabassay: element._id,
                      itemName: element.kategorija.split("|")[1].trim(),
                      entryorder: element.entryorder,
                      opis: element.kategorija.split("|")[2].trim(),
                      cijena: element.price,
                      code: element.code,
                      izabran: false,
                      testovi: element.bundledTests,
                    });
                  }
                }
              } else if (kategorija === "Paneli") {
                temporaryCategory.bundle = true;

                temporaryCategory.items.push({
                  _idlabassay: element._id,
                  itemName: element.kategorija.split("|")[1].trim(),
                  entryorder: element.entryorder,
                  opis: element.analit,
                  cijena: element.price,
                  code: element.code,
                  izabran: false,
                  testovi: element.bundledTests,
                });
              } else {
                if (
                  temporaryCategory.items.length ==
                  this.$store.state.display.list
                ) {
                  this.categories.push(temporaryCategory);
                  temporaryCategory = {};
                  temporaryCategory.categoryName = kategorija;
                  temporaryCategory.bundle = false;
                  temporaryCategory.items = [];
                  temporaryCategory.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    code: element.code,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: Klasa,
                  });
                } else {
                  temporaryCategory.items.push({
                    _idlabassay: element._id,
                    itemName: element.naziv.trim(),
                    entryorder: element.entryorder,
                    opis: element.analit,
                    cijena: element.price,
                    code: element.code,
                    uzorak: element.tip,
                    izabran: false,
                    klasa: Klasa,
                  });
                }
              }
            }
          });
          this.categories.push(temporaryCategory);
        });
      })
      .then((res) => {
        this.loaded = true;

        this.categories.forEach((element) => {
          this.kategorijeL.push(element.categoryName);
        });

        this.uniqueArray = [...new Set(this.kategorijeL)];

        this.categories = this.categories.sort(function (a, b) {
          return a.categoryName.localeCompare(b.categoryName, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        });

        this.categories.forEach((element) => {
          element.items = element.items.sort(function (a, b) {
            return (
              a.entryorder.localeCompare(b.entryorder, undefined, {
                numeric: true,
                sensitivity: "base",
              }) ||
              a.itemName.localeCompare(b.itemName, undefined, {
                numeric: true,
                sensitivity: "base",
              })
            );
          });
        });
      });
  },

  beforeDestroy() {
    bus.$off("removeTest");
    bus.$off("SamplesEntryRemove");
    bus.$off("SamplesEntryCalendar");
    bus.$off("setCalendar");
    bus.$off("SamplesEntryUrgent");
    bus.$off("SamplesEntryRemoveUrgent");
  },

  methods: {
    ...mapActions(["closeMenu", "toggleSidebar", "isToggleWithoutAnimation"]),

    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    testEvent(event, category, item, cijena) {
      
      this.initiatedEntry = true;

      switch (item.itemName) {
        
        case "CoV2 IgG Ab":
          setTimeout(() => {
            document.getElementById("CoV2 IgM Ab").click();
          }, 300);
          break;

        default:
          break;
      }

      switch (category.bundle) {
        case true:
          var test = {};
          var tag = {};

          this.uzorciList.forEach((element) => {
            item.testovi.forEach((analiza) => {
              test = {};
              tag = {};
              if (element.tip === analiza.uzorak) {
                test.itemName = analiza.itemName;
                test.opis = analiza.opis;
                test.cijena = analiza.cijena;
                test.uzorak = analiza.uzorak;
                item.izabran = true;

                analiza.izabran = true;
                test.klasa = analiza.klasa;
                test._id = analiza.labassay;

                tag.name = analiza.itemName;
                tag.id = analiza.labassay;
                tag.code = analiza.code;
                tag.type = analiza.klasa;
                tag.bundle = category.bundle;

                // Code 128
                // console.log(analiza.code);

                if (
                  !element.testovi.filter((el) => el.itemName === test.itemName)
                    .length > 0
                ) {
                  element.testovi.push(test);

                  element.testoviTag.push(tag);

                  this.categories.forEach((cat) => {
                    cat.items.forEach((it) => {
                      if (it.itemName === analiza.itemName) {
                        it.izabran = true;
                      }
                    });
                  });
                }
              }
            });
          });
          this.inputValue = "";
          break;

        default:
          var test = {};
          var tag = {};
          this.uzorciList.forEach((element) => {
            test = {};
            tag = {};
            if (element.tip === item.uzorak) {
              test.itemName = item.itemName;
              test.opis = item.opis;
              test.uzorak = item.uzorak;
              test.cijena = item.cijena;
              item.izabran = true;
              test.klasa = item.klasa;
              test._id = item._idlabassay;
              tag.name = item.itemName;
              tag.id = item._idlabassay;
              tag.code = item.code;
              tag.type = item.klasa;
              tag.bundle = category.bundle;

              // Code 128
              // console.log(item.code);

              if (
                !element.testovi.filter((el) => el.itemName === test.itemName)
                  .length > 0
              ) {
                element.testovi.push(test);
                element.testoviTag.push(tag);
              }
            }
          });

          this.categories.forEach((cat) => {
            cat.items.forEach((it) => {
              if (it.itemName === item.itemName) {
                it.izabran = true;
              }
            });
          });

          this.inputValue = "";
          break;
      }
    },

    Save() {
      var lokacijaID = "";

      this.timestamp = (
        new Date().getTime() -
        new Date().getTimezoneOffset() * 60000
      ).toString();

      this.uzorciList = this.uzorciList.filter(function (uzorak) {
        return uzorak.testovi.length;
      });

      this.lokacijeInit.forEach((element) => {
        if (element.lokacija === this.lokacija) {
          lokacijaID = element._id;
        }
      });

      http
        .post("/sacuvaj/uzorke", {
          site: this.$store.state.site,
          token: this.$store.state.token,
          timestamp: this.timestamp,
          siteCode: this.siteCode,
          uzorci: this.uzorciList,
          lokacija: lokacijaID,
          klijent: null,
          drstanje: this.drstanje,
          anticoag: this.anticoag,
          narucioc: null,
          posiljaoc: null,
          prioritet: this.prioritet,
          pid: this.pid,
          complete: this.complete,
          BrojProtokola: this.BrojProtokola,
          sampled: this.sampled,
          sampled_by: this.sampled_by,
          statusUzorka: this.statusUzorka,
          analysis: this.uzorciList[0].opis,
          prijem: this.$store.state.prijem,
          configuration: this.$store.state.configuration,
        })
        .then((res) => {
          if (res.data.success) {
            var datum = "";
            var temp = [];
            var response = {};

            // console.log(res.data);

            response = res.data.data[0];

            res.data.data.forEach((element) => {
              var site = this.$store.state.site;
              temp = element.datum.split("-");
              datum =
                temp[2].substring(0, 2) +
                "." +
                temp[1] +
                "." +
                temp[0].substring(2, 4) +
                " " +
                temp[2].substring(3, 8);

              var niz = [1];

              // console.log(site)

              switch (site) {
                case "5c69f68c338fe912f99f833b": // Podružnica Centralna Laboratorija, Sarajevo
                  niz = [1, 2];
                  break;
                case "5f9f705e444e51a464db2543": // Međunarodni aerodrom Sarajevo
                  niz = [1, 2, 3];
                  break;
                case "5f9f70a1444e51a464db259a": // Međunarodni aerodrom Tuzla
                  niz = [1, 2];
                  break;
                case "5fb81465900f08738c6985e7": // Poliklinika Sunce - Zenica
                  niz = [1, 2];
                  break;
                case "60508f5ff0a3cf9c7860f5ad": // PZU HBL Laboratorija - Istočno Sarajevo
                  niz = [1];
                  break;
                case "60508f95f0a3cf9c7860f5bd": // HBL Laboratorija - Novo Sarajevo
                  niz = [1];
                  break;
                case "60509039f0a3cf9c7860f5e1": // HBL Laboratorija - Dobrinja
                  niz = [1];
                  break;
                case "6068b249f68be9eab36b4fdb": // Podružnica 1. Unitic, Sarajevo
                  niz = [1, 2];
                  break;
                case "6068b2d5f68be9eab36b5003": // Podružnica 2. IUS, Sarajevo
                  niz = [1, 2];
                  break;
                case "6068b346f68be9eab36b502f": // Podružnica Visoko
                  niz = [1, 2];
                  break;
                case "6068b3b3f68be9eab36b5088": // Podružnica Tuzla
                  niz = [1, 2];
                  break;
                case "6068b471f68be9eab36b50f5": // Podružnica Goražde
                  niz = [1, 2];
                  break;
                case "6068b4fcf68be9eab36b511d": // Podružnica Bugojno
                  niz = [1, 2];
                  break;
                case "6068b55df68be9eab36b5175": // Podružnica Trebinje
                  niz = [1, 2];
                  break;

                default:
                  niz = [1, 2];
                  break;
              }

              niz.forEach(function (i) {
                printEPL(
                  element.patient,
                  element.sid,
                  element.pid,
                  element.godiste,
                  element.datum,
                  element.link,
                  element.code,
                  site,
                  element.prioritet,
                  element.protokol,
                  element.purpose,
                  element.izdavanje
                );
              });
            });

            router.push("/prijem");
          } else {
            if (
              res.data.message.code != undefined &&
              res.data.message.code === 11000
            ) {
              // console.log(res.data.message.errmsg);

              // Decrement protocol number.

              http
                .post("postavke/protokol/decrement", {
                  token: this.$store.state.token,
                  site: this.$store.state.site,
                })
                .then((response) => {
                  // console.log(response.data);

                  this.toastText =
                    "Došlo je do greške, molimo Vas da ponovite unos.";
                  this.toastIcon = "fa-warning";
                  this.toastPosition = "top-right";
                  this.className = "vuestic-toast-warning";

                  this.showToast(this.toastText, {
                    icon: this.toastIcon,
                    position: this.toastPosition,
                    duration: this.toastDuration,
                    fullWidth: this.isToastFullWidth,
                    className: this.className,
                  });

                  router.push("/prijem");
                });
            }
          }
        });
    },

    Discard() {
      router.push("/prijem");
    },

    setValue() {
      this.$data.oldUzorciList = _.cloneDeep(this.$data.uzorciList);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";

.color-icon-label-table {
  td:first-child {
    width: 1rem;
  }
}

.widget-height {
  min-height: 330px;
}
.vuestic-page-not-found-search {
  min-height: 330px;
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
    grid-template-columns: repeat(7, 1fr);
  }
}
.unchosen-link {
  color: $white;
  text-decoration: none;
}

.disabled-link {
  color: #e34a4a;
  text-decoration: none;
}

a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>
