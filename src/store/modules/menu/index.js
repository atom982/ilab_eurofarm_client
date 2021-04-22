import * as types from "../../mutation-types";

import statistika from "./statistika"; // Statistika
import prijem from "./prijem"; // Prijem pacijenta
import certificates from "./certificates"; // Izdavanje potvrda
import barcode from "./barcode"; // Prijem uzorka
import naljepnice from "./naljepnice"; // Statusi uzoraka
import obrada from "./obrada"; // Obrada uzoraka
import nalazi from "./nalazi"; // Pregled nalaza
import email from "./email"; // Elektronska pošta
import analize from "./analize"; // Postavke analiza
import narucioci from "./narucioci"; // Group email
import protokol from "./protokol"; // Provjera nalaza
import changelog from "./changelog"; // Change Log
import reports from "./reports"; // Izvještaji

const state = {
  items: [
    statistika, // Statistika
    prijem, // Prijem pacijenta
    certificates, // Izdavanje potvrda
    barcode, // Prijem uzorka
    naljepnice, // Statusi uzoraka
    obrada, // Obrada uzoraka
    nalazi, // Pregled nalaza
    email, // Elektronska pošta
    analize, // Postavke analiza
    narucioci, // Group email
    protokol, // Provjera nalaza
    changelog, // Change Log  
    reports, // Izvještaji  
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
