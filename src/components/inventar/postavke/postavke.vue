<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-3">
        <div class="col-md-12">
          <fieldset>
            <ipostavke-radio-button
              :label="'Organizaciona jedinica'"
              :value="'Organizaciona jedinica'"
              :name="'radio'"
              v-model="radioModel"
            />
            <ipostavke-radio-button
              :label="'Dobavljac'"
              :value="'Dobavljac'"
              :name="'radio'"
              v-model="radioModel"
            />
            <ipostavke-radio-button
              :label="'Vrsta ugovora'"
              :value="'Vrsta ugovora'"
              :name="'radio'"
              v-model="radioModel"
            />
            <ipostavke-radio-button
              :label="'Ugovor'"
              :value="'Ugovor'"
              :name="'radio'"
              v-model="radioModel"
            />
            <ipostavke-radio-button
              :label="'Klasa proizvoda'"
              :value="'Klasa proizvoda'"
              :name="'radio'"
              v-model="radioModel"
            />
            <ipostavke-radio-button
              :label="'Program proizvoda'"
              :value="'Program proizvoda'"
              :name="'radio'"
              v-model="radioModel"
            />
            <ipostavke-radio-button
              :label="'Platforma proizvoda'"
              :value="'Platforma proizvoda'"
              :name="'radio'"
              v-model="radioModel"
            />
            <ipostavke-radio-button
              :label="'Proizvođači'"
              :value="'Proizvođači'"
              :name="'radio'"
              v-model="radioModel"
            />
            <ipostavke-radio-button
              :label="'Klijenti'"
              :value="'Klijenti'"
              :name="'radio'"
              v-model="radioModel"
            />
          </fieldset>
        </div>
      </div>

      <div class="col-md-9">
        <div class="row">
          <div class="col-md-12" v-show="radioModel === 'Organizaciona jedinica'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="lokacije.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="16%">{{'Site'}}</td>
                        <td width="22%">{{'Lokacija'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in lokacije" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Lokacije', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="LokacijeDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12" v-show="radioModel === 'Dobavljac'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="dobavljaci.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Naziv'}}</td>
                        <td width="15%">{{'ID broj'}}</td>
                        <td width="20%">{{'adresa'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in dobavljaci" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td>{{element.idbroj}}</td>
                        <td>{{element.adresa}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Dobavljac', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="DobavljacDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-12" v-show="radioModel === 'Vrsta ugovora'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="vrsteugovora.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Naziv'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in vrsteugovora" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Vrsta ugovora', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="VrstaDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-12" v-show="radioModel === 'Ugovor'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="ugovori.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Naziv'}}</td>
                        <td width="15%">{{'Datum'}}</td>
                        <td width="20%">{{'Vrijednost'}}</td>
                        <td width="20%">{{'Vrsta'}}</td>
                        <td width="20%">{{'Dobavljac'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in ugovori" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td>{{element.datum}}</td>
                        <td>{{element.vrijednost}}</td>
                        <td>{{element.vrsta.naziv}}</td>
                        <td>{{element.dobavljac.naziv}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Ugovor', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="UgovorDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12" v-show="radioModel === 'Klasa proizvoda'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="klase.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Naziv'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in klase" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Klasa proizvoda', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="KlasaDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12" v-show="radioModel === 'Program proizvoda'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="programi.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Naziv'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in programi" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Program proizvoda', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="ProgramDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        <div class="col-md-12" v-show="radioModel === 'Platforma proizvoda'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="platforme.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Naziv'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in platforme" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Platforma proizvoda', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="PlatformaDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> 
          <div class="col-md-12" v-show="radioModel === 'Proizvođači'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="proizvodjaci.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Naziv'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in proizvodjaci" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Proizvođači', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="ProizvodjacDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div> 
        <div class="col-md-12" v-show="radioModel === 'Klijenti'">
            <div class="row">
              <div class="col-md-12">
                <div class="table-responsive" v-if="klijenti.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="15%">{{'Site'}}</td>
                        <td width="20%">{{'Naziv'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in klijenti" :key="element._id">
                        <td>{{element.site.sifra + " | " + element.site.naziv}}</td>
                        <td>{{element.naziv}}</td>
                        <td align="center">
                          <i
                            @click="EditJson('Klijenti', element)"
                            v-bind:id="element._id"
                            style="font-size: 12px; color:#4ae387;"
                            class="vuestic-icon vuestic-icon-settings"
                          ></i>
                        </td>
                        <td align="center">
                          <i
                            @dblclick.prevent="KlijentDelete($event, element)"
                            v-bind:id="element._id"
                            style="color:#4ae387;"
                            class="fa fa-trash-o"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>         
        </div>
      </div>

      <ipostavke-modal
        :show.sync="show"
        ref="staticModaliPostavkeModal"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #4ae387;">{{radioModel}}</span>
          <span style="color: #acb5be;">|{{' Novi unos'}}</span>
        </div>

        <div class="row" v-show="radioModel === 'Organizaciona jedinica'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="selected_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="lok-input-icon-left"
                    title=" "
                    v-model="lokacija"
                    name="lok-input-icon-left"
                    required
                  />
                  <label class="control-label" for="lok-input-icon-left">{{'Naziv OJ'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row" v-show="radioModel === 'Dobavljac'">
          <div class="col-md-1"></div>

          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="dobavljac_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="dob-input-icon-left"
                    title=" "
                    v-model="dobavljac_naziv"
                    name="dob-input-icon-left"
                    required
                  />
                  <label class="control-label" for="dob-input-icon-left">{{'Naziv'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="idb-input-icon-left"
                    title=" "
                    v-model="dobavljac_idbroj"
                    name="idb-input-icon-left"
                    required
                  />
                  <label class="control-label" for="idb-input-icon-left">{{'ID Broj'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="adrd-input-icon-left"
                    title=" "
                    v-model="dobavljac_adresa"
                    name="adrd-input-icon-left"
                    required
                  />
                  <label class="control-label" for="adrd-input-icon-left">{{'Adresa'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
                <div class="form-group">
                <div class="input-group">
                  <input
                    id="teld-input-icon-left"
                    title=" "
                    v-model="dobavljac_tel"
                    name="teld-input-icon-left"
                    required
                  />
                  <label class="control-label" for="teld-input-icon-left">{{'Telefon'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
                <div class="form-group">
                <div class="input-group">
                  <input
                    id="emaild-input-icon-left"
                    title=" "
                    v-model="dobavljac_email"
                    name="emaild-input-icon-left"
                    required
                  />
                  <label class="control-label" for="emaild-input-icon-left">{{'Email'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
    <div class="row" v-show="radioModel === 'Vrsta ugovora'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="vrsta_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="nazivv-input-icon-left"
                    title=" "
                    v-model="vrsta_naziv"
                    name="nazivv-input-icon-left"
                    required
                  />
                  <label class="control-label" for="nazivv-input-icon-left">{{'Vrsta'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      <div class="row" v-show="radioModel === 'Ugovor'">
          <div class="col-md-1"></div>

          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="ugovor_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>
              <vuestic-simple-select
                label="Izaberite OJ"
                v-model="ugovor_oj"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_oj_select"
              ></vuestic-simple-select>

              <vuestic-simple-select
                label="Izaberite dobavljaca"
                v-model="ugovor_dobavljac"
                name="siteSelect"
                :required="true"
                title=" "
                ref="dobavljacSelect"
                v-bind:options="all_dobavljac_select"
              ></vuestic-simple-select>

              <vuestic-simple-select
                label="Izaberite vrstu"
                v-model="ugovor_vrsta"
                name="vrstaSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_vrsta_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="nazivu-input-icon-left"
                    title=" "
                    v-model="ugovor_naziv"
                    name="nazivu-input-icon-left"
                    required
                  />
                  <label class="control-label" for="nazivu-input-icon-left">{{'Naziv'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="vrijednostu-input-icon-left"
                    title=" "
                    v-model="ugovor_vrijednost"
                    name="vrijednostu-input-icon-left"
                    required
                  />
                  <label class="control-label" for="vrijednostu-input-icon-left">{{'Vrijednost'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

                <div class="form-group">
                <div class="input-group">
                  <input
                    id="vaziod-input-icon-left"
                    title=" "
                    v-model="ugovor_vazi_od"
                    name="vaziod-input-icon-left"
                    required
                  />
                  <label class="control-label" for="vaziod-input-icon-left">{{'Važi od'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
                <div class="form-group">
                <div class="input-group">
                  <input
                    id="vazido-input-icon-left"
                    title=" "
                    v-model="ugovor_vazi_do"
                    name="vazido-input-icon-left"
                    required
                  />
                  <label class="control-label" for="vazido-input-icon-left">{{'Važi do'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row" v-show="radioModel === 'Klasa proizvoda'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="klasa_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="nazivk-input-icon-left"
                    title=" "
                    v-model="klasa_naziv"
                    name="nazivk-input-icon-left"
                    required
                  />
                  <label class="control-label" for="nazivk-input-icon-left">{{'Klasa proizvoda'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row" v-show="radioModel === 'Program proizvoda'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="program_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="nazivp-input-icon-left"
                    title=" "
                    v-model="program_naziv"
                    name="nazivp-input-icon-left"
                    required
                  />
                  <label class="control-label" for="nazivp-input-icon-left">{{'Program proizvoda'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row" v-show="radioModel === 'Platforma proizvoda'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="platforma_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="nazivpl-input-icon-left"
                    title=" "
                    v-model="platforma_naziv"
                    name="nazivpl-input-icon-left"
                    required
                  />
                  <label class="control-label" for="nazivpl-input-icon-left">{{'Platforma proizvoda'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row" v-show="radioModel === 'Proizvođači'">
          <div class="col-md-1"></div>
          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="proizvodjac_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="nazivpr-input-icon-left"
                    title=" "
                    v-model="proizvodjac_naziv"
                    name="nazivpr-input-icon-left"
                    required
                  />
                  <label class="control-label" for="nazivpr-input-icon-left">{{'Proizvođači'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="row" v-show="radioModel === 'Klijenti'">
          <div class="col-md-1"></div>

          <div class="col-md-10">
            <fieldset>
              <vuestic-simple-select
                label="Izaberite site"
                v-model="klijent_site"
                name="siteSelect"
                :required="true"
                title=" "
                ref="siteSelect"
                v-bind:options="all_sites_select"
              ></vuestic-simple-select>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="dobk-input-icon-left"
                    title=" "
                    v-model="klijent_naziv"
                    name="dobk-input-icon-left"
                    required
                  />
                  <label class="control-label" for="dobk-input-icon-left">{{'Naziv'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="idbk-input-icon-left"
                    title=" "
                    v-model="klijent_idbroj"
                    name="idbk-input-icon-left"
                    required
                  />
                  <label class="control-label" for="idbk-input-icon-left">{{'ID Broj'}}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input
                    id="adrk-input-icon-left"
                    title=" "
                    v-model="klijent_adresa"
                    name="adrk-input-icon-left"
                    required
                  />
                  <label class="control-label" for="adrk-input-icon-left">{{'Adresa'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
                <div class="form-group">
                <div class="input-group">
                  <input
                    id="telk-input-icon-left"
                    title=" "
                    v-model="klijent_tel"
                    name="telk-input-icon-left"
                    required
                  />
                  <label class="control-label" for="telk-input-icon-left">{{'Telefon'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
                <div class="form-group">
                <div class="input-group">
                  <input
                    id="emailk-input-icon-left"
                    title=" "
                    v-model="klijent_email"
                    name="emailk-input-icon-left"
                    required
                  />
                  <label class="control-label" for="emailk-input-icon-left">{{'Email'}}</label>
                  <i class="bar"></i>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </ipostavke-modal>
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
    <json-edit-ipostavke
      :show.sync="show"
      ref="staticModalJSONEdit"
      cancelText="ODUSTANI"
      okText="POTVRDI"
    >
      <div slot="title">
        <span style="color: #4ae387;">{{'JSON Editor'}}</span>
      </div>
    </json-edit-ipostavke>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import { http } from "../../../../config/config.js";
import { bus } from "../../../main";
import ipostavkeModal from "./ipostavkeModal.vue";
import iRadioButton from "./iRadioButton.vue";
import iJsonEdit from "./iJsonEdit.vue";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.component("badge-column", BadgeColumn);
Vue.component("ipostavke-modal", ipostavkeModal);
Vue.component("ipostavke-radio-button", iRadioButton);
Vue.component("json-edit-ipostavke", iJsonEdit);

export default {
  name: "inventar-postavke",

  components: {
    Loading
  },

  data() {
    return {
      show: true,

      isLoading: false,
      fullPage: true,

      radioModel: "Sekcije",
      all_sites: [],
      all_sites_select: [],
      selected_site: "",
      lokacija: "",
      lokacije: [],
      dobavljac_site: "",
      dobavljac_site_id: "",
      dobavljac_naziv: "",
      dobavljac_idbroj: "",
      dobavljac_adresa: "",
      dobavljac_tel: "",
      dobavljac_email: "",
      lokacije_select: [],
      dobavljaci: [],
      ugovori: [],
      ugovor_site : "",
      ugovor_dobavljac: "",
      ugovor_naziv: "",
      ugovor_vrijednost: "",
      ugovor_vrsta: "",
      ugovor_vazi_od: "",
      ugovor_vazi_do: "",
      ugovor_oj: "",
      oj: [],
      klase:[],
      programi:[],
      platforme:[],
      proizvodjaci:[],
      klasa_site: "",
      klasa_site_id: "",
      klasa_naziv: "",
      program_site: "",
      program_site_id: "",
      program_naziv: "",
      platforma_site: "",
      platforma_site_id: "",
      platforma_naziv: "",
      proizvodjac_site: "",
      proizvodjac_site_id: "",
      proizvodjac_naziv: "",
      all_oj_select: [],
      all_dobavljac_select: [],
      all_vrsta_select: [],
      vrsteugovora: [],
      vrsta_naziv:"",
      vrsta_site:"",
      vrsta_site_id:"",
      klijenti:[],
      klijent_site: "",
      klijent_site_id: "",
      klijent_naziv: "",
      klijent_idbroj: "",
      klijent_adresa: "",
      klijent_tel: "",
      klijent_email: "",
      classes: ["primary", "warning", "danger", "info"],
    };
  },
  created() {
    http
      .get(
        "postavke/list/sekcije?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        if (res.data.success) {
          this.sekcije = res.data.sekcije;
          this.sekcije_select = [];
          this.sekcije.forEach(element => {
            this.sekcije_select.push(element.sekcija);
          });
        }
      });
  },
  mounted() {
    bus.$on("iPostavkeModalInsert", () => {
      switch (this.radioModel) {
        case "Organizaciona jedinica":
          this.LokacijeInsert();
          break;

        case "Dobavljac":
          this.DobavljacInsert();
          break;
        case "Vrsta ugovora":
          this.VrstaInsert();
          break;
        case "Ugovor":
          this.UgovorInsert();
          break;
        case "Klasa proizvoda":
          this.KlasaInsert();
          break;
        case "Program proizvoda":
          this.ProgramInsert();
          break;
        case "Platforma proizvoda":
          this.PlatformaInsert();
          break;
        case "Proizvođači":
          this.ProizvodjacInsert();
          break;
         case "Klijenti":
          this.KlijentInsert();
          break;         
        default:
          break;
      }
    });

    bus.$on("iPostavkeModalCancel", () => {
      this.Reset();
    });

    bus.$on("iPostavkeNoviUnos", () => {
      if (this.radioModel != "Sidebar") {
        this.$refs.staticModaliPostavkeModal.open();
      }
    });

    bus.$on("Refresh", data => {
      switch (data) {
        case "Lokacije":
          http
            .get(
              "inventar/listoj?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.lokacije = res.data.list;
              }
            });
          break;

        case "Dobavljac":
          http
            .get(
              "inventar/listdobavljac?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.dobavljaci = res.data.dobavljaci;
              }
            });

          break;

        case "Vrsta ugovora":
            http
            .get(
              "inventar/listvrsta?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.vrsteugovora = res.data.vrsteugovora;
              }
            });
        
          break;

          case "Ugovor":
            http
            .get(
              "inventar/listugovor?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.ugovori = res.data.ugovori;
              }
            });
        
          break;     
       case "Klasa proizvoda":
            http
            .get(
              "inventar/listklasa?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.klase = res.data.klase;
              }
            });
        
          break;
       case "Program proizvoda":
            http
            .get(
              "inventar/listprogram?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.programi = res.data.programi;
              }
            });
        
          break;
       case "Platforma proizvoda":
            http
            .get(
              "inventar/listplatforma?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.platforme = res.data.platforme;
              }
            });
        
          break;
        case "Proizvođači":
            http
            .get(
              "inventar/listproizvodjac?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.proizvodjaci = res.data.proizvodjaci;
              }
            });
        
          break;
          case "Klijenti":
            http
            .get(
              "inventar/listklijenti?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.klijenti = res.data.klijenti;
              }
            });
        
          break;
        default:
          break;
      }
    });
  },
  watch: {
    mjesto_site_radio: function() {
      this.mjesta_sites.forEach(element => {
        if (element.naziv === this.mjesto_site_radio) {
          this.mjesto_site = element;
          this.mjesta = element.mjesta;
          // console.log(element)
        }
      });
    },

    sidebar_site_radio: function() {
      this.sidebar_sites.forEach(element => {
        if (element.naziv === this.sidebar_site_radio) {
          this.sidebar_site = element;
          this.sidebar = element.sidebar;
          // console.log(element)
        }
      });
    },

    dobavljac_site: function() {
      this.lokacije.forEach(element => {
        if (
          element.site.sifra + " | " + element.site.naziv ===
          this.dobavljac_site
        ) {
          this.dobavljac_site_id = element.site._id
        }
      });
    },

    klijent_site: function() {
      // console.log('klijent site changed')
      this.all_sites.forEach(element => {
        // console.log(element)
        if (element.sifra + " | " + element.naziv ===this.klijent_site) {
          this.klijent_site_id = element._id
        }
      });
    },
    radioModel: function() {
      this.Reset();

      switch (this.radioModel) {
        case "Organizaciona jedinica":
          // Sites
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(///inventar/listoj
                  "inventar/listoj?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.lokacije = res.data.list;
                  }
                });
            });
          break;

        case "Dobavljac":
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "inventar/listdobavljac?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.dobavljaci = res.data.dobavljaci;

                    http
                      .get(
                        "postavke/list/lokacije?token=" +
                          this.$store.state.token +
                          "&site=" +
                          this.$store.state.site,
                        {}
                      )
                      .then(res => {
                        if (res.data.success) {
                          this.lokacije = res.data.lokacije;
                        }
                      });
                  }
                });
            });

          break;
          
          case "Vrsta ugovora":
           
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "inventar/listvrsta?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.vrsteugovora = res.data.vrsteugovora;

                  }
                });
            });

          break;
          
          case "Ugovor":
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "inventar/listdobavljac?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                 
                    this.dobavljaci =  res.data.dobavljaci
                    this.all_dobavljac_select = []
                    res.data.dobavljaci.forEach(element => {
                       this.all_dobavljac_select.push(element.naziv)
                    });

                      http
                      .get(
                        "inventar/listvrsta?token=" +
                          this.$store.state.token +
                          "&site=" +
                          this.$store.state.site,
                        {}
                      )
                      .then(res => {
                        if (res.data.success) {
                          this.vrsteugovora  = res.data.vrsteugovora
                           res.data.vrsteugovora.forEach(element => {
                             this.all_vrsta_select.push(element.naziv)
                           });
                    http
                      .get(
                        "inventar/listoj?token=" +
                          this.$store.state.token +
                          "&site=" +
                          this.$store.state.site,
                        {}
                      )
                      .then(res => {
                        if (res.data.success) {
                          this.oj = res.data.list
                           res.data.list.forEach(element => {
                             this.all_oj_select.push(element.naziv)
                           });
                    http
                      .get(
                        "inventar/listugovor?token=" +
                          this.$store.state.token +
                          "&site=" +
                          this.$store.state.site,
                        {}
                      )
                      .then(res => {
                        if (res.data.success) {
                          this.ugovori = res.data.ugovori
                          var dateobj =new Date()
                          this.ugovor_vazi_od = dateobj.toISOString()
                          this.ugovor_vazi_do = dateobj.toISOString()
                        }
                      });
                        }
                      });
    
                        }
                      });     
                  }
                });
            });

          break;
        case "Klasa proizvoda":
           
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "inventar/listklasa?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.klase = res.data.klase;

                  }
                });
            });

          break;
           case "Program proizvoda":
           
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "inventar/listprogram?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.programi = res.data.programi;

                  }
                });
            });

          break;
        case "Platforma proizvoda":
           
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "inventar/listplatforma?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.platforme = res.data.platforme;

                  }
                });
            });

          break;
        case "Proizvođači":          
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "inventar/listproizvodjac?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.proizvodjaci = res.data.proizvodjaci;

                  }
                });
            });

          break;
        case "Klijenti":
           
          http
            .get(
              "assays/site?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              this.all_sites = res.data.sites;
              this.all_sites_select = [];

              this.all_sites.forEach(element => {
                this.all_sites_select.push(
                  element.sifra + " | " + element.naziv
                );
              });

              http
                .get(
                  "inventar/listklijenti?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then(res => {
                  if (res.data.success) {
                    this.klijenti = res.data.klijenti;

                  }
                });
            });

          break;
        default:
          break;
      }
    }
  },
  beforeDestroy() {
    bus.$off("iPostavkeModalInsert");
    bus.$off("iPostavkeModalCancel");
    bus.$off("iPostavkeNoviUnos");
    bus.$off("Refresh");
  },
  methods: {
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Reset() {
      this.selected_site = "";
      this.lokacija = "";
     
    },

    EditJson(tab, element) {
      var obj = {};
      obj.element = element;
      obj.tab = tab;
      bus.$emit("JsonEditiPostavke", obj);
    },

    SidebarStatus(event, element, type) {
      this.isLoading = true;
      http
        .post("postavke/sidebar/edit", {
          type: type,
          element: element,
          token: this.$store.state.token,
          site: this.sidebar_site._id // this.$store.state.site
        })
        .then(res => {
          this.isLoading = false;
          if (res.data.success) {
            // console.log(res.data);
          }
        });

      // console.log(element);
    },


    LokacijeDelete(event, element) {
      // console.log('lokacije delete')
      http
        .post("inventar/deleteoj", {
          lokacija: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          
          if (res.data.success) {
            this.lokacije = res.data.lokacije;
          }
        });
    },
    DobavljacDelete(event, element) {
      http
        .post("inventar/deletedobavljac", {
          dobavljac: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.dobavljaci = res.data.dobavljaci;
          }
        });
    },
    VrstaDelete(event, element) {
      http
        .post("inventar/deletevrsta", {
          vrsta: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.vrsteugovora = res.data.vrsteugovora;
          }
        });
    },
    UgovorDelete(event, element) {
      http
        .post("inventar/deleteugovor", {
          ugovor: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.ugovori = res.data.ugovori;
          }
        });
    },
    KlasaDelete(event, element) {
      http
        .post("inventar/deleteklasa", {
          klasa: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.klase = res.data.klase;
          }
        });
    },
  ProgramDelete(event, element) {
      http
        .post("inventar/deleteprogram", {
          program: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.programi = res.data.programi;
          }
        });
    },
      PlatformaDelete(event, element) {
      http
        .post("inventar/deleteplatforma", {
          platforma: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.platforme = res.data.platforme;
          }
        });
    },
      ProizvodjacDelete(event, element) {
      http
        .post("inventar/deleteproizvodjac", {
          proizvodjac: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.proizvodjaci = res.data.proizvodjaci;
          }
        });
    },
      KlijentDelete(event, element) {
      http
        .post("inventar/deleteklijent", {
          klijent: element,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            this.klijenti = res.data.klijenti;
          }
        });
    },
    LokacijeInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.lokacije.forEach(element => {
        if (this.lokacija.trim() === element.lokacija) {
          exists = true;
        }
      });

      this.all_sites.forEach(element => {
        if (this.selected_site == element.sifra + " | " + element.naziv) {
          site = element._id;
        }
      });

      if (exists) {
        // console.warn("Already exists.");
      }

      if (
        this.lokacija.trim() === "" ||
        this.selected_site === "" 
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.lokacija,
          site: site
        };
        http
          .post("inventar/createoj", {
            lokacija: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.lokacije = res.data.lokacije;
              this.selected_site = "";
              this.lokacija = "";
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },

    DobavljacInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.dobavljaci.forEach(element => {
        if (
          this.dobavljac_naziv.trim() + " " + this.dobavljac_idbroj.trim() ===
          element.naziv.trim() + " " + element.idbroj.trim()
        ) {
          exists = true;
        }
      });


      if (exists) {
        // console.warn("Already exists.");
      }

      if (
        this.dobavljac_naziv.trim() === "" ||
        this.dobavljac_idbroj.trim() === "" ||
        this.dobavljac_adresa.trim() === "" ||
        this.dobavljac_tel.trim() === "" ||
        this.dobavljac_email === "" ||
        this.dobavljac_site === "" ||
        this.dobavljac_site_id === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.dobavljac_naziv,
          idbroj: this.dobavljac_idbroj,
          adresa: this.dobavljac_adresa,
          tel: this.dobavljac_tel,
          email: this.dobavljac_email,
          site: this.dobavljac_site_id
        };
        http
          .post("inventar/createdobavljac", {
            dobavljac: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.dobavljaci = res.data.dobavljaci;
              this.dobavljac_naziv = "";
              this.dobavljac_idbroj = "";
              this.dobavljac_adresa = "";
              this.dobavljac_tel = "";
              this.dobavljac_email = "";
              this.dobavljac_site_id= "";
              this.dobavljac_site = "";
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },
    VrstaInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.vrsteugovora.forEach(element => {
        if (
          this.vrsta_naziv.trim() === element.naziv.trim()
        ) {
          exists = true;
        }
      });


      if (exists) {
        // console.warn("Already exists.");
      }

    this.all_sites.forEach(element => {
    if (element.sifra + " | " + element.naziv === this.vrsta_site)        
              {
                  this.vrsta_site_id = element._id
              }
    });
      if (
        this.vrsta_naziv.trim() === "" ||       
        this.vrsta_site === "" ||
        this.vrsta_site_id === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.vrsta_naziv,
          site: this.vrsta_site_id
        };
        http
          .post("inventar/createvrsta", {
            vrsta: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.vrsteugovora = res.data.vrsteugovora;
              this.vrsta_naziv = "";
           
              this.vrsta_site_id= "";
              this.vrsta_site = "";
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },
    UgovorInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.ugovori.forEach(element => {
        if (
          this.ugovor_naziv.trim() + " " + this.ugovor_vazi_od.trim() ===
          element.naziv.trim() + " " + element.vazi_od.trim()
        ) {
          exists = true;
        }
      });


      if (exists) {
        // console.warn("Already exists.");
      }

      if (
        this.ugovor_naziv.trim() === "" ||
        this.ugovor_dobavljac.trim() === "" ||
        this.ugovor_vrijednost.trim() === "" ||
        this.ugovor_vrsta.trim() === "" ||
        this.ugovor_vazi_od === "" ||
        this.ugovor_vazi_do === "" ||
        this.ugovor_oj === "" ||
        this.ugovor_site === ""
      ) {
        uslov = false;
      }

      var ugovor_site_id = ''
      this.all_sites.forEach(element => {
            if (element.sifra + " | " + element.naziv === this.ugovor_site)        
              {
                  ugovor_site_id = element._id
              }
      });
      var ugovor_oj_id = ''
      this.oj.forEach(element => {
            if (element.naziv === this.ugovor_oj)        
              {
                  ugovor_oj_id = element._id
              }
      });
      var ugovor_dobavljac_id = ''
      this.dobavljaci.forEach(element => {
            if (element.naziv === this.ugovor_dobavljac)        
              {
                  ugovor_dobavljac_id = element._id
              }
      }); 
      var ugovor_vrsta_id = ''
      this.vrsteugovora.forEach(element => {
            if (element.naziv === this.ugovor_vrsta)        
              {
                  ugovor_vrsta_id = element._id
              }
      }); 
      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.ugovor_naziv,
          vazi_od: this.ugovor_vazi_od,
          vazi_do: this.ugovor_vazi_do,
          vrijednost: this.ugovor_vrijednost,
          vrsta:ugovor_vrsta_id,
          dobavljac: ugovor_dobavljac_id,
          oj: ugovor_oj_id,
          created_by:'',
          site: ugovor_site_id
        };
        http
          .post("inventar/createugovor", {
            ugovor: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.ugovori = res.data.ugovori;
              this.ugovor_naziv = "";
              this.ugovor_oj = "";
              this.ugovor_vrijednost = "";
              this.ugovor_vrsta = "";
              this.ugovor_dobavljac= "";
              this.ugovor_site = ""; 
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },
      KlasaInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.klase.forEach(element => {
        if (
          this.klasa_naziv.trim() === element.naziv.trim()
        ) {
          exists = true;
        }
      });


      if (exists) {
        // console.warn("Already exists.");
      }

    this.all_sites.forEach(element => {
    if (element.sifra + " | " + element.naziv === this.klasa_site)        
              {
                  this.klasa_site_id = element._id
              }
    });
      if (
        this.klasa_naziv.trim() === "" ||       
        this.klasa_site === "" ||
        this.klasa_site_id === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.klasa_naziv,
          site: this.klasa_site_id
        };
        http
          .post("inventar/createklasa", {
            klasa: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.klase = res.data.klase;
              this.klasa_naziv = "";
           
              this.klasa_site_id= "";
              this.klasa_site = "";
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },
    ProgramInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.programi.forEach(element => {
        if (
          this.program_naziv.trim() === element.naziv.trim()
        ) {
          exists = true;
        }
      });


      if (exists) {
        // console.warn("Already exists.");
      }

    this.all_sites.forEach(element => {
    if (element.sifra + " | " + element.naziv === this.program_site)        
              {
                  this.program_site_id = element._id
              }
    });
      if (
        this.program_naziv.trim() === "" ||       
        this.program_site === "" ||
        this.program_site_id === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.program_naziv,
          site: this.program_site_id
        };
        http
          .post("inventar/createprogram", {
            program: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.programi = res.data.programi;
              this.program_naziv = "";
           
              this.program_site_id= "";
              this.program_site = "";
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },
    PlatformaInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.platforme.forEach(element => {
        if (
          this.platforma_naziv.trim() === element.naziv.trim()
        ) {
          exists = true;
        }
      });


      if (exists) {
        // console.warn("Already exists.");
      }

    this.all_sites.forEach(element => {
    if (element.sifra + " | " + element.naziv === this.platforma_site)        
              {
                  this.platforma_site_id = element._id
              }
    });
      if (
        this.platforma_naziv.trim() === "" ||       
        this.platforma_site === "" ||
        this.platforma_site_id === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.platforma_naziv,
          site: this.platforma_site_id
        };
        http
          .post("inventar/createplatforma", {
            platforma: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.platforme = res.data.platforme;
              this.platforma_naziv = "";
           
              this.platforma_site_id= "";
              this.platforma_site = "";
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },
      ProizvodjacInsert() {
      var uslov = true;
      var exists = false;
      var site = "";

      this.proizvodjaci.forEach(element => {
        if (
          this.proizvodjac_naziv.trim() === element.naziv.trim()
        ) {
          exists = true;
        }
      });


      if (exists) {
        // console.warn("Already exists.");
      }

    this.all_sites.forEach(element => {
    if (element.sifra + " | " + element.naziv === this.proizvodjac_site)        
              {
                  this.proizvodjac_site_id = element._id
              }
    });
      if (
        this.proizvodjac_naziv.trim() === "" ||       
        this.proizvodjac_site === "" ||
        this.proizvodjac_site_id === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.proizvodjac_naziv,
          site: this.proizvodjac_site_id
        };
        http
          .post("inventar/createproizvodjac", {
            proizvodjac: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.proizvodjaci = res.data.proizvodjaci;
              this.proizvodjac_naziv = "";
           
              this.proizvodjac_site_id= "";
              this.proizvodjac_site = "";
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },
      KlijentInsert() {
      var uslov = true;
      var exists = false;
      var site = "";
      // console.log('this.klijent_site')
      // console.log(this.klijent_site_id)
      this.klijenti.forEach(element => {
        if (
          this.klijent_naziv.trim() + " " + this.klijent_idbroj.trim() ===
          element.naziv.trim() + " " + element.idbroj.trim()
        ) {
          exists = true;
        }
      });


      if (exists) {
        // console.warn("Already exists.");
      }

      if (
        this.klijent_naziv.trim() === "" ||
        this.klijent_idbroj.trim() === "" ||
        this.klijent_adresa.trim() === "" ||
        this.klijent_tel.trim() === "" ||
        this.klijent_email === "" ||
        this.klijent_site === "" ||
        this.klijent_site_id === ""
      ) {
        uslov = false;
      }

      if (uslov && (!exists || exists)) {
        let obj = {
          naziv: this.klijent_naziv,
          idbroj: this.klijent_idbroj,
          adresa: this.klijent_adresa,
          tel: this.klijent_tel,
          email: this.klijent_email,
          site: this.klijent_site_id
        };
        http
          .post("inventar/createklijent", {
            klijent: obj,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.klijenti = res.data.klijenti;
              this.klijent_naziv = "";
              this.klijent_idbroj = "";
              this.klijent_adresa = "";
              this.klijent_tel = "";
              this.klijent_email = "";
              this.klijent_site_id= "";
              this.klijent_site = "";
              bus.$emit("iPostavkeModalHide");
            }
          });
      } else {
        if (!exists) {
          // console.warn("Prerequisites not met.");
        }
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../sass/_variables.scss";
@import "../../../../node_modules/bootstrap/scss/functions";
@import "../../../../node_modules/bootstrap/scss/variables";
@import "../../../../node_modules/bootstrap/scss/mixins/breakpoints";

.abc-checkbox,
.abc-radio {
  display: flex !important;
  justify-content: flex-start;
}

input[type="checkbox"]:disabled + label,
input[type="radio"]:disabled + label,
input[type="checkbox"]:disabled,
input[type="radio"]:disabled {
  cursor: not-allowed;
}
.chart-container {
  padding: 0 2rem;
  height: 24rem;
}

.circle {
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 50%;
  display: inline-block;
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #f7cc36;
}

i:hover {
  color: #f7cc36 !important;
}
</style>

