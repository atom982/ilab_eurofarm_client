import Vue from "vue";
import Vuex from "vuex";
import VuexI18n from "vuex-i18n";
import app from "./modules/app";
import menu from "./modules/menu";
import { http } from "../../config/config.js";
import router from "../router";
import { bus } from "../main";
import * as getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  getters,
  modules: {
    app,
    menu,
  },
  state: {
    userId: null,
    language: null,
    customer: false,
    token: null,
    password: null,
    expired: false, // Password
    site: null,
    idleTime: null,
    pid_bcode: null,
    note: false,
    access: { level: null },
    reports: {
      fpodanu: false,
      ppodanu: false,
      ppomjestu: false,
      ppolokaciji: false,
      protokol: false,
      tatpopacijentu: false,
      worklists: false,
    },

    // Eurofarm Centar

    dashboard: {
      PJC: false,
      SJJ: false,
      TZL: false,
      PSZ: false,
      HLI: false,
      HLN: false,
      HLD: false,
    },

    prijem: 1,
    viber: false,

    configuration: {
      unos: {
        rt: false,
        ag: false,
        at: false,
      },
      obrada: {
        rt: false,
        ag: false,
        at: false,
      },
      protokol: {
        rt: false,
        ag: false,
        at: false,
      },
      sampled: {
        rt: false,
        ag: false,
        at: false,
      },
      verify: {
        rt: false,
        ag: false,
        at: false,
      },
    },

    default_route: "/statistika",
    display: { list: "15", show: "20", columns: "7", rows: "1" },
    connect: false,
    notify: false,
    notifym: false,
    alarms: [["Nema pristiglih odobrenja.", "Test"]],
    messages: [["Nema kompletiranih rezultata.", "Test"]],
    temperatura: [],
    counter: 0,
    korisnici: 0,
    // socketid: "",
    dropdown: "RADNA LISTA",
    filter: "",
    odobriSID: "",
    Sidebar: [],
    sid: "",

    pretraga: {
      filterBar: "",
      itemsPerPage: "DANAS",
      dateRange: {
        from: ["", ""],
        to: ["", ""],
      },
      paginationPage: "1",
    },
  },
  mutations: {
    RETRIEVE_DATA(state, data) {
      // Simulation using sockets
      // state.counter++;
    },
    layoutSidebar(state, data) {
      state.Sidebar = [];
      state.note = false;
      state.Sidebar = data.sidebar;

      store.getters.menuItems.forEach((item) => {
        item.meta.show = false;
        item.meta.default = false;
      });

      store.getters.menuItems.forEach((item) => {
        if (item.path === state.default_route) {
          // console.log(item.path)
          item.meta.default = true;
        }
      });

      state.Sidebar.forEach((property) => {
        store.getters.menuItems.forEach((item) => {
          if (item.meta.title == property) {
            item.meta.show = true;
            item.meta.class = "primary";

            // Provjera nalaza

            if (item.meta.title == "#") {
              item.meta.show = true;
              state.note = true;
              item.meta.class = "danger";
            }
          }
        });
      });

      router.push(state.default_route);
    },
    changeSid(state, noviSID) {
      state.odobriSID = noviSID;
    },
    SID(state, sid) {
      state.sid = sid;
    },
    authUser(state, userData) {
      state.userId = userData.userId;
      state.language = userData.language;
      state.customer = userData.customer;
      state.token = userData.token;
      state.site = userData.site;
      state.idleTime = userData.idleTime;
      state.pid_bcode = userData.pid_bcode;
      state.default_route = userData.default_route;
      state.dashboard = userData.dashboard;
      state.prijem = userData.prijem;
      state.configuration = userData.configuration;
      state.viber = userData.viber;
      state.access = userData.access;
      state.display = userData.display;
      state.reports = userData.reports;
      state.sites = userData.sites;

      state.password = userData.password;

      // Users Password Expiration Date
      
      var day_start = new Date(new Date(userData.changed_at).toString().substring(4, 15));
      var day_end = new Date(new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toString().substring(4, 15));
      var total_days = (day_end - day_start) / (1000 * 60 * 60 * 24);
      // console.log(day_start)
      // console.log(day_end)

      if(!isNaN(total_days)){
        // console.log(total_days)
      }
      

      if (total_days > 365) {
        state.expired = true;
      } else {
        state.expired = false;
      }

      if (state.alarms[0][0].toString().length > 10) {
        if (state.language === "rs") {
          state.alarms = [["Нема пристиглих одобрења.", "Test"]];
        } else if (state.language === "en") {
          state.alarms = [["There are no approved results.", "Test"]];
        } else {
          state.alarms = [["Nema pristiglih odobrenja.", "Test"]];
        }
      }

      if (state.messages[0][0].toString().length > 10) {
        if (state.language === "rs") {
          state.messages = [["Нема комплетираних резултата.", "Test"]];
        } else if (state.language === "en") {
          state.messages = [["There are no completed results.", "Test"]];
        } else {
          state.messages = [["Nema kompletiranih rezultata.", "Test"]];
        }
      }
    },
    clearAuthData(state) {
      state.password = null;
    },
    changeSite(state, site) {
      state.site = site;
    },
    changeDropdown(state, dropdown) {
      state.dropdown = dropdown;
    },
    changeFilter(state, filter) {
      state.filter = filter;
      if (filter != "") {
      }
    },

    changeDateRange(state, data) {
      state.pretraga.dateRange.from[0] = data.od;
      state.pretraga.dateRange.from[1] = data.from;
      state.pretraga.dateRange.to[0] = data.do;
      state.pretraga.dateRange.to[1] = data.to;

      if (data.od != "" || data.do != "") {
        state.pretraga.itemsPerPage = "Svi Rezultati";
      }
    },
    changeFilterBar(state, data) {
      // console.log("Data from STORE: " + data)
      state.pretraga.filterBar = data;
    },
    changeItemsPerPage(state, data) {
      state.pretraga.itemsPerPage = data;
    },
    changePaginationPage(state, data) {
      state.pretraga.paginationPage = data;
    },

    resetSite(state) {
      state.alarms = [];
      state.messages = [];

      if (state.language === "rs") {
        state.alarms = [["Нема пристиглих одобрења.", "Test"]];
        state.messages = [["Нема комплетираних резултата.", "Test"]];
      } else if (state.language === "en") {
        state.alarms = [["There are no approved results.", "Test"]];
        state.messages = [["There are no completed results.", "Test"]];
      } else {
        state.alarms = [["Nema pristiglih odobrenja.", "Test"]];
        state.messages = [["Nema kompletiranih rezultata.", "Test"]];
      }

      state.notify = false;
      state.notifym = false;
    },
    resetLanguage(state, lng) {
      state.language = lng;

      if (state.alarms[0][0].toString().length > 10) {
        if (state.language === "rs") {
          state.alarms = [["Нема пристиглих одобрења.", "Test"]];
        } else if (state.language === "en") {
          state.alarms = [["There are no approved results.", "Test"]];
        } else {
          state.alarms = [["Nema pristiglih odobrenja.", "Test"]];
        }
      }

      if (state.messages[0][0].toString().length > 10) {
        if (state.language === "rs") {
          state.messages = [["Нема комплетираних резултата.", "Test"]];
        } else if (state.language === "en") {
          state.messages = [["There are no completed results.", "Test"]];
        } else {
          state.messages = [["Nema kompletiranih rezultata.", "Test"]];
        }
      }
    },
    resetidleTime(state, tm) {
      state.idleTime = tm;
    },
    SOCKET_CONNECT: (state, status) => {
      state.connect = true;
    },
    SOCKET_ODOBREN(state, alarm) {
      if (alarm[1] === localStorage.getItem("site")) {
        var uslov = true;

        if (state.alarms[0][0].toString().length > 10) {
          state.alarms = [];
        }

        state.notify = true;
        var niz = [];

        state.alarms.forEach((member) => {
          if (member[0] === alarm[0]) {
            uslov = false;
          }
        });

        if (uslov) {
          niz.push(alarm[0]);
          niz.push(alarm[2]);
          if (alarm[1] === localStorage.getItem("site")) {
            state.alarms.push(niz);
          } else {
            state.notify = false;
          }
        }
      }
    },
    SOCKET_TEMPERATURA(state, message) {
      state.counter++;

      if (!state.temperatura.length) {
        state.temperatura.push({
          slave_id: message[0].slave_id,
          active: true,
          time: message[3],
          temperatura: message[1],
          vlaznost: message[2],
          naziv: message[0].ime,
          _id: message[0]._id,
          frizider: message[0],
        });
      } else {
        var found = false;
        state.temperatura.forEach((device) => {
          if (device.slave_id === message[0].slave_id) {
            device.active = true;
            device.time = message[3];
            device.temperatura = message[1];
            device.vlaznost = message[2];
            found = true;
          }
        });
        if (!found) {
          state.temperatura.push({
            slave_id: message[0].slave_id,
            active: true,
            time: message[3],
            temperatura: message[1],
            vlaznost: message[2],
            naziv: message[0].ime,
            _id: message[0]._id,
            frizider: message[0],
          });
        }
      }
    },
    SOCKET_KOMPLETIRAN(state, message) {
      if (message[1] === localStorage.getItem("site")) {
        var usl = true;

        if (state.messages[0][0].toString().length > 10) {
          state.messages = [];
        }

        state.notifym = true;
        var niz = [];

        state.messages.forEach((clan) => {
          if (clan[0] === message[0]) {
            usl = false;
          }
        });

        if (usl) {
          niz.push(message[0]);
          niz.push(message[2]);

          if (message[1] === localStorage.getItem("site")) {
            state.messages.push(niz);
          } else {
            state.notifym = false;
          }
        }
      }
    },
    setujAlarme(state, element) {
      var niz = [];

      state.alarms.forEach((member) => {
        if (member[0] != element[0]) {
          niz.push(member);
        }
      });

      state.alarms = niz;
      if (!niz.length) {
        state.notify = false;
        if (state.language === "rs") {
          var a = ["Нема пристиглих одобрења.", "Test"];
        } else if (state.language === "en") {
          var a = ["There are no approved results.", "Test"];
        } else {
          var a = ["Nema pristiglih odobrenja.", "Test"];
        }

        state.alarms.push(a);
      }
    },
    setujMessage(state, element) {
      var niz = [];

      state.messages.forEach((member) => {
        if (member[0] != element[0]) {
          niz.push(member);
        }
      });

      state.messages = niz;
      if (!niz.length) {
        state.notifym = false;
        if (state.language === "rs") {
          var b = ["Нема комплетираних резултата.", "Test"];
        } else if (state.language === "en") {
          var b = ["There are no completed results.", "Test"];
        } else {
          var b = ["Nema kompletiranih rezultata.", "Test"];
        }

        state.messages.push(b);
      }
    },
    SOCKET_GET(state, korisnici) {
      state.korisnici = korisnici;
    },
  },
  actions: {
    RETRIEVE_DATA_FROM_STORE({ commit, dispatch }, element) {
      commit("RETRIEVE_DATA", element);
    },
    setSID({ commit, dispatch }, element) {
      commit("changeSid", element);
    },
    SetSample({ commit, dispatch }, element) {
      commit("SID", element);
    },
    dohvatiKorisnike({ commit, dispatch }) {
      this.emit("dohvati");
    },
    izbaciElement({ commit, dispatch }, element) {
      commit("setujAlarme", element);
    },
    izbaciElement2({ commit, dispatch }, element) {
      commit("setujMessage", element);
    },
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("clearAuthData");
        http
          .post("logout/users", {
            user: localStorage.getItem("userId"),
            language: localStorage.getItem("language"),
            token: localStorage.getItem("token"),
            site: localStorage.getItem("site"),
            idleTime: localStorage.getItem("idleTime"),
            type: "automatic",
          })
          .then((res) => {
            localStorage.removeItem("userId");
            localStorage.removeItem("language");
            localStorage.removeItem("token");
            localStorage.removeItem("site");
            localStorage.removeItem("idleTime");

            router.push("/auth/login");
          });
      }, expirationTime * 1000);
    },
    login({ commit, dispatch }, authData) {
      http
        .post("login/users", {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        })
        .then((res) => {
          var UserLoginPass = null;

          if (authData.password == "Proba123") {
            UserLoginPass = false;
          } else {
            UserLoginPass = true;
          }

          if (res.data.success === true) {
            if (!UserLoginPass) {
              // console.warn("Initial Password must be changed.");
            }

            Vue.i18n.set(res.data.data.language);
            localStorage.setItem("userId", res.data.data.localId);
            localStorage.setItem("language", res.data.data.language);
            localStorage.setItem("token", res.data.data.idToken);
            localStorage.setItem("site", res.data.data.site);
            localStorage.setItem("idleTime", res.data.data.idleTime);

            // console.log(res.data.data)

            commit("authUser", {

              // Users Password Expiration Date
              changed_at: res.data.data.changed_at,

              userId: res.data.data.localId,
              language: res.data.data.language,
              customer: res.data.data.customer,
              token: res.data.data.idToken,
              site: res.data.data.site,
              idleTime: res.data.data.idleTime,
              pid_bcode: res.data.data.pid_bcode,
              default_route: res.data.data.default_route,
              dashboard: res.data.data.dashboard,
              prijem: res.data.data.prijem,
              configuration: res.data.data.configuration,
              viber: res.data.data.viber,
              access: res.data.data.access,
              display: res.data.data.display,
              reports: res.data.data.reports,
              sites: res.data.data.sites,

              password: UserLoginPass,
            });

            commit("layoutSidebar", {
              sidebar: res.data.data.sidebar,
            });
          } else {
            if (res.data.message === "Greška prilikom konekcije na DB.") {
              bus.$emit("UserLoginDB", res.data.message);
            }
            if (res.data.message === "Korisnik nije pronađen.") {
              bus.$emit("UserLoginFind", res.data.message);
            }
            if (res.data.message === "Pogrešna šifra.") {
              bus.$emit("UserLoginPass", res.data.message);
            }
            if (res.data.message === "User Account has Expired.") {
              bus.$emit("AccountExpired", res.data.message);
            }
          }
        })
        .catch((error) => console.log(error));
    },
    autoLogin({ commit }) {
      const userId = localStorage.getItem("userId");
      const language = localStorage.getItem("language");
      const site = localStorage.getItem("site");
      const idleTime = localStorage.getItem("idleTime");
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      }

      router.push("/");
      commit("authUser", {
        userId: userId,
        language: language,
        token: token,
        site: site,
        idleTime: idleTime,
      });
    },
    logout({ commit }, state) {
      commit("clearAuthData");

      http
        .post("logout/users", {
          user: localStorage.getItem("userId"),
          language: localStorage.getItem("language"),
          token: localStorage.getItem("token"),
          site: localStorage.getItem("site"),
          idleTime: localStorage.getItem("idleTime"),
          type: "manual",
        })
        .then((res) => {
          // console.log(res.data)
          localStorage.removeItem("userId");
          localStorage.removeItem("language");
          localStorage.removeItem("token");
          localStorage.removeItem("site");
          localStorage.removeItem("idleTime");

          router.replace("/auth/login");
        });
    },
    siteChange({ commit, dispatch }, site) {
      localStorage.setItem("site", site);
      commit("changeSite", site);
    },
    dropdownChange({ commit, dispatch }, dropdown) {
      commit("changeDropdown", dropdown);
    },
    filterChange({ commit, dispatch }, filter) {
      commit("changeFilter", filter);
    },
    siteClear({ commit, dispatch }, site) {
      commit("resetSite");
    },
    languageChange({ commit, dispatch }, lng) {
      commit("resetLanguage", lng);
    },
    idleTimeChange({ commit, dispatch }, tm) {
      commit("resetidleTime", tm);
    },

    DateRangeChange({ commit, dispatch }, data) {
      commit("changeDateRange", data);
    },
    FilterBarChange({ commit, dispatch }, data) {
      commit("changeFilterBar", data);
    },
    ItemsPerPageChange({ commit, dispatch }, data) {
      commit("changeItemsPerPage", data);
    },
    PaginationPageChange({ commit, dispatch }, data) {
      commit("changePaginationPage", data);
    },
  },
});

Vue.use(VuexI18n.plugin, store);

export default store;
