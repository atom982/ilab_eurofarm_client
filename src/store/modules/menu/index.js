import * as types from "../../mutation-types";
import statistika from "./statistika";
import prijem from "./prijem";
import barcode from "./barcode";
import naljepnice from "./naljepnice";

import rtobrada from "./rtobrada"; // CoV2 RT PCR
import agobrada from "./agobrada"; // CoV2 Antigen

import rtnalazi from "./rtnalazi"; // RT PCR Nalazi
import agnalazi from "./agnalazi"; // Antigen Nalazi
import pdf from "./pdf"; // Pregled nalaza
import email from "./email"; // Elektronska pošta

import protokol from "./protokol";
import reports from "./reports";
import narucioci from "./narucioci";
import analize from "./analize";
import kontrole from "./kontrole";
import inventar from "./inventar";
import thermometer from "./loger";
import mikrobiologija from "./mikrobiologija";
import partneri from "./partneri";
import postavke from "./postavke";
import integracija from "./integracija";
import excel from "./excel";
import analysers from "./analysers";
import assays from "./assays";

const state = {
  items: [
    statistika,
    prijem,    
    barcode,
    naljepnice,

    rtobrada, // CoV2 RT PCR
    agobrada, // CoV2 Antigen

    rtnalazi, // RT PCR Nalazi
    agnalazi, // Antigen Nalazi
    pdf, // Pregled nalaza
    email, // Elektronska pošta

    protokol,
    postavke,
    narucioci,
    reports,    
    analize,
    kontrole,
    inventar,
    thermometer,
    mikrobiologija,
    partneri,  
    integracija,
    excel,
    analysers,
    assays
  ]
};

const mutations = {
  [types.TOGGLE_EXPAND_MENU_ITEM](state, payload) {
    let menuItem = payload.menuItem;
    let expand = payload.expand;
    if (menuItem.children && menuItem.meta) {
      menuItem.meta.expanded = expand;
    }
  }
};

const actions = {
  toggleExpandMenuItem({ commit }, payload) {
    commit(types.TOGGLE_EXPAND_MENU_ITEM, payload);
  }
};

export default {
  state,
  mutations,
  actions
};
