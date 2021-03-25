<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <!-- <vuestic-widget :headerText="'Laboratorijske analize'"> -->
        <vuestic-data-table-labassays
          :apiMode="apiMode"
          :apiUrl="apiUrl"
          :data="tableData"
          :tableFields="tableFields"
          :itemsPerPage="itemsPerPage"
          :onEachSide="onEachSide"
          :sortFunctions="sortFunctions"
          :paginationPath="paginationPath"
          :token="token"
          :site="site"
        ></vuestic-data-table-labassays>
        <!-- </vuestic-widget> -->

        <labassay-delete
          :show.sync="show"
          ref="staticModalLabAssayDelete"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title" v-if="$store.state.access.level < 1">
            {{labassay.naziv}}
            <span style="color: #e34a4a;">({{labassay.analit}})</span>
          </div>

          <div v-if="$store.state.access.level < 1">
            <h5 style="color: #e34a4a;">{{ 'Jeste li sigurni da želite obrisati zapis?'}}</h5>
          </div>

          <div slot="title" v-if="$store.state.access.level > 0">
            {{''}}
            <span style="color: #e34a4a;">{{'401: Not Authorized'}}</span>
          </div>
          <div v-if="$store.state.access.level > 0">
            <h5>{{'Niste autorizirani!'}}</h5>
          </div>
        </labassay-delete>

        <json-edit-labassay
          :show.sync="show"
          ref="staticModalJSONEdit"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">
            <span style="color: #4ae387;">{{'JSON Editor'}}</span>
          </div>
        </json-edit-labassay>

        <labassay-edit-modal
          :show.sync="show"
          :labassay="labassay"
          :large="true"
          ref="staticModalEditLabAssay"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">
            {{labassay.naziv}}
            <span style="color: #e34a4a;">({{labassay.analit}})</span>
          </div>
          <div>
            <fieldset>
              <div class="row">
                <div class="col-md-3" v-if="!Uredi">
                  <fieldset>
                    <div class="tree-view-advanced-preview">
                      <vuestic-tree-root ref="treeView">
                        <vuestic-tree-category isOpen label="Dodatne informacije">
                          <vuestic-tree-node>
                            <a
                              href="#"
                              :class="{'clicked': izbor === 'Opis', 'lnk': izbor != 'Opis'}"
                            >
                              <div @click="doSomethingOnClick('Opis')">Opis</div>
                            </a>
                            <a
                              href="#"
                              :class="{'clicked': izbor === 'Povišeno', 'lnk': izbor != 'Povišeno'}"
                            >
                              <div @click="doSomethingOnClick('Povišeno')">Povišeno</div>
                            </a>
                            <a
                              href="#"
                              :class="{'clicked': izbor === 'Sniženo', 'lnk': izbor != 'Sniženo'}"
                            >
                              <div @click="doSomethingOnClick('Sniženo')">Sniženo</div>
                            </a>

                            <a
                              href="#"
                              :class="{'clicked': izbor === 'Vrijeme određivanja', 'lnk': izbor != 'Vrijeme određivanja'}"
                            >
                              <div
                                @click="doSomethingOnClick('Vrijeme određivanja')"
                              >Vrijeme određivanja</div>
                            </a>

                            <a
                              href="#"
                              :class="{'clicked': izbor === 'Priprema', 'lnk': izbor != 'Priprema'}"
                            >
                              <div @click="doSomethingOnClick('Priprema')">Priprema</div>
                            </a>

                            <a
                              href="#"
                              :class="{'clicked': izbor === 'Napomena', 'lnk': izbor != 'Napomena'}"
                            >
                              <div @click="doSomethingOnClick('Napomena')">Napomena</div>
                            </a>
                          </vuestic-tree-node>
                        </vuestic-tree-category>
                      </vuestic-tree-root>
                      <div>
                        <br />
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div class="col-md-9" v-if="!Uredi">
                  <div class="form-group">
                    <div class="col-md-12 info-widget-inner" v-if="izbor === 'Opis'">
                      <div class="input-group">
                        <textarea
                          rows="10"
                          type="text"
                          v-model="labassay.interpretacija.opis"
                          required
                        ></textarea>
                        <label class="control-label">{{'Opis'}}</label>
                        <i class="bar"></i>
                      </div>
                      <div style="min-height: 5px;"></div>
                      <div class="input-group">
                        <a
                          href="#"
                          :class="{'addon': !Uredi, 'lnk': Uredi}"
                          @click="Uredi = !Uredi"
                        >Osnovne informacije</a>
                      </div>
                    </div>
                    <div class="col-md-12 info-widget-inner" v-if="izbor === 'Povišeno'">
                      <div class="input-group">
                        <textarea
                          rows="10"
                          type="text"
                          v-model="labassay.interpretacija.poviseno.text"
                          required
                        ></textarea>
                        <label class="control-label">{{'Povišeno'}}</label>
                        <i class="bar"></i>
                      </div>
                      <div style="min-height: 5px;"></div>
                      <div class="input-group">
                        <a
                          href="#"
                          :class="{'addon': !Uredi, 'lnk': Uredi}"
                          @click="Uredi = !Uredi"
                        >Osnovne informacije</a>
                      </div>
                    </div>
                    <div class="col-md-12 info-widget-inner" v-if="izbor === 'Sniženo'">
                      <div class="input-group">
                        <textarea
                          rows="10"
                          type="text"
                          v-model="labassay.interpretacija.snizeno.text"
                          required
                        ></textarea>
                        <label class="control-label">{{'Sniženo'}}</label>
                        <i class="bar"></i>
                      </div>
                      <div style="min-height: 5px;"></div>
                      <div class="input-group">
                        <a
                          href="#"
                          :class="{'addon': !Uredi, 'lnk': Uredi}"
                          @click="Uredi = !Uredi"
                        >Osnovne informacije</a>
                      </div>
                    </div>

                    <div class="col-md-12 info-widget-inner" v-if="izbor === 'Vrijeme određivanja'">
                      <div class="input-group">
                        <textarea
                          rows="10"
                          type="text"
                          v-model="labassay.interpretacija.vrijeme"
                          required
                        ></textarea>
                        <label class="control-label">{{'Vrijeme određivanja'}}</label>
                        <i class="bar"></i>
                      </div>
                      <div style="min-height: 5px;"></div>
                      <div class="input-group">
                        <a
                          href="#"
                          :class="{'addon': !Uredi, 'lnk': Uredi}"
                          @click="Uredi = !Uredi"
                        >Osnovne informacije</a>
                      </div>
                    </div>

                    <div class="col-md-12 info-widget-inner" v-if="izbor === 'Priprema'">
                      <div class="input-group">
                        <textarea
                          rows="10"
                          type="text"
                          v-model="labassay.interpretacija.priprema"
                          required
                        ></textarea>
                        <label class="control-label">{{'Priprema'}}</label>
                        <i class="bar"></i>
                      </div>
                      <div style="min-height: 5px;"></div>
                      <div class="input-group">
                        <a
                          href="#"
                          :class="{'addon': !Uredi, 'lnk': Uredi}"
                          @click="Uredi = !Uredi"
                        >Osnovne informacije</a>
                      </div>
                    </div>

                    <div class="col-md-12 info-widget-inner" v-if="izbor === 'Napomena'">
                      <div class="input-group">
                        <textarea
                          rows="10"
                          type="text"
                          v-model="labassay.interpretacija.napomena"
                          required
                        ></textarea>
                        <label class="control-label">{{'Napomena'}}</label>
                        <i class="bar"></i>
                      </div>
                      <div style="min-height: 5px;"></div>
                      <div class="input-group">
                        <a
                          href="#"
                          :class="{'addon': !Uredi, 'lnk': Uredi}"
                          @click="Uredi = !Uredi"
                        >Osnovne informacije</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6" v-if="Uredi">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.sifra"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Šifra analize'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.naziv"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Naziv analize'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div v-if="labassay.multi" class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.analit"
                        name="input-icon-left"
                        required
                        :disabled="$store.state.access.level > 0"
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label
                        v-if="$store.state.access.level > 0"
                        class="control-label"
                        for="input-icon-left"
                      >{{labassay.analit}}</label>
                      <label
                        v-if="$store.state.access.level < 1"
                        class="control-label"
                        for="input-icon-left"
                      >{{'Opis analize'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div v-if="!labassay.multi" class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.analit"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Opis analize'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <vuestic-simple-select
                    class="form-group with-icon-left"
                    label="Jedinica"
                    v-model="labassay.jedinica"
                    title=" "
                    v-bind:options="jedinice"
                  ></vuestic-simple-select>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.grouporder"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Redni broj na nalazu'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div v-if="$store.state.access.level < 1" class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.code"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Code 128'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.price"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Cijena'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="col-md-6" v-if="Uredi">
                  <div v-show="false" class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.sekcija"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Sekcija'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <vuestic-simple-select
                    class="form-group with-icon-left"
                    label="Sekcija"
                    v-model="labassay.sekcija"
                    title=" "
                    v-bind:options="sekcije"
                  ></vuestic-simple-select>

                  <div v-show="false" class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.grupa"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Grupa'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <vuestic-simple-select
                    class="form-group with-icon-left"
                    label="Grupa"
                    v-model="labassay.grupa"
                    title=" "
                    v-bind:options="grupe"
                  ></vuestic-simple-select>

                  <vuestic-simple-select
                    class="form-group with-icon-left"
                    label="Kategorija"
                    v-model="labassay.kategorija"
                    title=" "
                    v-bind:options="kategorije"
                  ></vuestic-simple-select>

                  <vuestic-simple-select
                    class="form-group with-icon-left"
                    label="Tip uzorka"
                    v-model="labassay.tip"
                    title=" "
                    v-bind:options="uzorci"
                  ></vuestic-simple-select>

                  <div v-show="false" class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="labassay.entryorder"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Prikaz na unosu'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <vuestic-simple-select
                    class="form-group with-icon-left"
                    label="Prikaz na unosu"
                    v-model="labassay.entryorder"
                    title=" "
                    v-bind:options="entryorders"
                  ></vuestic-simple-select>

                  <vuestic-multi-select
                    label="Prikaz na lokaciji"
                    v-model="labassay.sites"
                    title=" "
                    v-bind:options="sajtovi"
                  ></vuestic-multi-select>

                  <!-- <div class="form-group">
                  <div class="input-group">-->
                  <a
                    v-if="!labassay.multi"
                    href="#"
                    :class="{'addon': Uredi, 'lnk': !Uredi}"
                    @click="Uredi = !Uredi"
                  >Dodatne informacije</a>
                  <!--   </div>
                  </div>
                  -->
                  <!-- <div
                    v-if="$store.state.access.level < 1"
                    class="form-check abc-checkbox abc-checkbox-primary"
                  >
                    <input
                      class="form-check-input"
                      id="checkbox1"
                      type="checkbox"
                      v-model="labassay.specific"
                    >
                    <label class="form-check-label" for="checkbox1">
                      <span class="abc-label-text">{{'Specifična analiza'}}</span>
                    </label>
                  </div>-->
                </div>
              </div>
            </fieldset>
          </div>
        </labassay-edit-modal>

        <multi-modal
          :show.sync="show"
          ref="staticModalLabAssayMulti"
          cancelText="ODUSTANI"
          okText="POTVRDI"
        >
          <div slot="title">{{'Dodavanje analita'}}</div>

          <div>
            <div class="row">
              <div class="col-md-4">
                <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-8">
                    <div style="text-align:center;" class="testoviDiv">
                      <h5>
                        {{'Naziv testa:'}}
                        <span style="color: #e34a4a;">{{labassay.naziv}}</span>
                      </h5>
                      <h5>{{labassay.analit}}</h5>
                      <hr />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-4 form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="analitKod"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Kod'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <div class="col-md-4 form-group"></div>
                </div>

                <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-8 form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="analitNaziv"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite naziv'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-8 form-group with-icon-left">
                    <div class="input-group">
                      <input
                        
                        autocomplete="off"
                        id="input-icon-left"
                        title=" "
                        v-model="analitOpis"
                        name="input-icon-left"
                        required
                      />
                      <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                      <label class="control-label" for="input-icon-left">{{'Unesite opis'}}</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-2"></div>
                  <div class="col-md-4 form-group">
                    <vuestic-simple-select
                      label="Jedinica"
                      v-model="jedinica"
                      name="grupa"
                      :required="true"
                      title=" "
                      ref="grupaSelect"
                      v-bind:options="jedinice"
                    ></vuestic-simple-select>
                  </div>

                  <div class="col-md-4 form-group"></div>
                </div>

                <div class="row">
                  <div class="col-md-2"></div>
                  <!-- || analitKod.trim() === '' || analitNaziv.trim() === '' || analitOpis.trim() === '' || jedinica.trim() === '' -->

                  <div class="col-md-8">
                    <button
                      :disabled="edit"
                      class="btn btn-sm btn-primary"
                      @click.prevent="sacuvajAnalit"
                    >
                      <span class="fa fa-save"></span>
                      {{ ' Sačuvaj'}}
                    </button>
                  </div>

                  <div class="col-md-12"></div>
                </div>
              </div>

              <div class="col-md-8">
                <div class="table-responsive">
                  <table v-if="tabela" class="table table-striped first-td-padding">
                    <thead>
                      <tr v-if="$store.state.access.level < 1">
                        <td width="10%">{{"kod"}}</td>
                        <td width="28%">{{"naziv"}}</td>
                        <td width="28%">{{"analit (opis)"}}</td>
                        <td width="12%">{{"jedinica"}}</td>
                        <td width="12%">{{"Uredi"}}</td>
                        <td width="10%">{{"akcija"}}</td>
                      </tr>

                      <tr v-if="$store.state.access.level > 0">
                        <td width="12%">{{"kod"}}</td>
                        <td width="32%">{{"naziv"}}</td>
                        <td width="32%">{{"analit (opis)"}}</td>
                        <td width="14%">{{"jedinica"}}</td>
                        <td width="10%">{{"Uredi"}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in analiti" :key="element.kod">
                        <td>{{element.kod}}</td>
                        <td>{{element.naziv}}</td>
                        <td>{{element.opis}}</td>

                        <td
                          style="width:130px; height:70%"
                          v-if="temp_id != element.naziv"
                        >{{element.jedinica}}</td>
                        <td style="width:130px; height:70%" v-if="temp_id === element.naziv">
                          <div v-show="edit === false">
                            <label>{{element.jedinica}}</label>
                          </div>
                          <select
                            style="width:80px; height:70%"
                            v-show="edit === true"
                            v-model="element.jedinica"
                          >
                            <option v-for="option in jedinice" :key="option">{{ option }}</option>
                          </select>
                        </td>
                        <td>
                          <button
                            :disabled="edit"
                            v-if="temp_id != element.naziv"
                            @click.prevent="editAnaUnit($event, element.jedinica)"
                            title=" "
                            v-bind:id="element.naziv"
                            class="btn btn-micro btn-info"
                          >
                            <span v-bind:id="element.naziv" class="glyphicon glyphicon-edit"></span>
                            {{''}}
                          </button>
                          <button
                            :disabled="edit"
                            v-if="uredi && temp_id === element.naziv"
                            @click.prevent="editAnaUnit($event, element.jedinica)"
                            title=" "
                            v-bind:id="element.naziv"
                            class="btn btn-micro btn-info"
                          >
                            <span v-bind:id="element.naziv" class="glyphicon glyphicon-edit"></span>
                            {{''}}
                          </button>
                          <button
                            v-if="!uredi && temp_id === element.naziv"
                            @click.prevent="saveAnaUnit($event, element.jedinica)"
                            title=" "
                            v-bind:id="element.naziv"
                            class="btn btn-micro btn-secondary"
                          >
                            <span v-bind:id="element.naziv" class="fa fa-save"></span>
                            {{''}}
                          </button>
                        </td>
                        <td v-if="$store.state.access.level < 1">
                          <button
                            :disabled="edit"
                            v-bind:id="element.naziv"
                            class="btn btn-danger btn-micro"
                            @dblclick.prevent="AnalitDelete($event)"
                          >
                            <span v-bind:id="element.naziv" class="fa fa-trash-o"></span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </multi-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import BadgeColumn from "./BadgeColumn.vue";
import LocalData from "./vuestic-datatable/data/local-data";
import FieldsDef from "./fields-definition";
import { apiUrlLabAssays } from "../../../config/config.js";
import { http } from "../../../config/config.js";
import { bus } from "../../main";

Vue.component("badge-column", BadgeColumn);

export default {
  data() {
    return {
      show: true,
      apiUrl: apiUrlLabAssays,
      apiMode: true,
      sortFunctions: FieldsDef.sortFunctions,
      tableData: LocalData.data,
      onEachSide: 1,
      tableFields: FieldsDef.tableFields,
      paginationPath: "",
      itemsPerPage: [
        {
          value: 5
        },
        {
          value: 6
        }
      ],
      token: this.$store.state.token,
      site: this.$store.state.site,
      labassay: {},
      jedinica: "",
      jedinice: [],
      sekcije: [],
      grupe: [],
      entryorders: [],
      uzorci: [],
      kategorije: [],
      sajtovi: [],
      analit: "",
      analiti: [],
      analit_id: "",
      temp_id: "",
      analitKod: "",
      analitNaziv: "",
      analitOpis: "",
      tabela: false,
      uredi: true,
      edit: false,
      Uredi: true,
      izbor: "Povišeno",

      // Toasts
      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: ""
    };
  },

  name: "labassays",

  mounted() {
    bus.$on("LabAssayInterpretacija", data => {
      this.Uredi = false;
      this.izbor = "Povišeno";
      this.labassay = data.labassay;
      // console.log(this.labassay.interpretacija);
      this.$refs.staticModalEditLabAssay.open();
    });

    bus.$on("EditJSON", data => {
      bus.$emit("JsonEditOpen", data);
    });

    bus.$on("LabAssayMulti", data => {
      this.labassay = data.labassay;
      if (this.labassay.multi) {
        this.analit = this.labassay.naziv;
        this.analit_id = this.labassay._id;

        http
          .post("postavke/labtest/analit/list", {
            analit: this.labassay.naziv,
            analit_id: this.analit_id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success) {
              this.analiti = res.data.analiti;
              this.tabela = true;
              this.jedinica = "";
              this.$refs.staticModalLabAssayMulti.open();
            } else {
            }
          });
      }
    });

    bus.$on("LabAssayUredi", data => {
      this.Uredi = true;
      this.izbor = "Povišeno";
      this.labassay = data.labassay;
      this.$refs.staticModalEditLabAssay.open();
    });

    bus.$on("LabAssayAkcija", data => {
      this.labassay = data.labassay;
      this.$refs.staticModalLabAssayDelete.open();
    });

    bus.$on("LabAssayCancel", () => {
      bus.$emit("LabAssayRefresh");
    });

    bus.$on("LabAssayEdit", () => {
      this.EditLabAssay(this.labassay);
    });

    bus.$on("LabAssayLength", data => {
      // console.log("Maximum length exceeded.");
    });

    bus.$on("LabAssayDelete", () => {
      this.Delete();
    });

    bus.$on("LabAssayClose", () => {
      bus.$emit("LabAssayRefresh");
      bus.$emit("AnaAssayRefresh");
      this.analitKod = "";
      this.analitNaziv = "";
      this.analitOpis = "";
      this.jedinica = "";
      this.tabela = false;
      this.edit = false;
      this.uredi = true;
    });

    // Settings
    http
      .get(
        "assays/settings?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then(res => {
        this.sekcije = [];
        this.uzorci = [];
        this.kategorije = [];

        res.data.settings[0].sekcije.forEach(element => {
          if (!element.toLowerCase().includes("mikrobiologija")) {
            this.sekcije.push(element);
          }
        });

        res.data.settings[0].lab_tipovi.forEach(element => {
          if (!element.toLowerCase().includes("mikrobiologija")) {
            this.uzorci.push(element);
          }
        });

        res.data.settings[0].kategorije.forEach(element => {
          if (!element.toLowerCase().includes("mikrobiologija")) {
            this.kategorije.push(element);
          }
        });

        this.jedinice = res.data.settings[0].jedinice;
        this.entryorders = res.data.settings[0].entryorders;
        this.grupe = res.data.settings[0].grupe;
      });

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
        this.sajtovi = [];
        res.data.sites.forEach(element => {
          this.sajtovi.push(element.sifra);
        });
      });
  },

  beforeDestroy() {
    bus.$off("EditJSON");
    bus.$off("LabAssayMulti");
    bus.$off("LabAssayUredi");
    bus.$off("LabAssayAkcija");
    bus.$off("LabAssayCancel");
    bus.$off("LabAssayEdit");
    bus.$off("LabAssayInterpretacija");
    bus.$off("LabAssayLength");
    bus.$off("LabAssayDelete");
    bus.$off("LabAssayClose");
  },

  methods: {
    doSomethingOnClick(input) {
      this.izbor = input;
    },
    Delete() {
      http
        .post("postavke/labtest/delete", {
          _id: this.labassay._id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success) {
            bus.$emit("LabAssayHide");
            bus.$emit("LabAssayRefresh");
          } else {
            // console.warn("Greška prilikom brisanja.");
          }
        });
    },
    EditLabAssay(labassay) {
      var item = true;

      if (this.$store.state.access.level > 0) {
        if (
          labassay.sifra.trim() === "" ||
          labassay.naziv.trim() === "" ||
          labassay.analit.trim() === "" ||
          labassay.sekcija.trim() === "" ||
          labassay.grupa.trim() === "" ||
          labassay.entryorder.trim() === ""
        ) {
          item = false;
          bus.$emit("LabAssayRefresh");
          this.toastText = "Sva polja su obavezna.";
          this.toastIcon = "fa-warning";
          this.toastPosition = "top-right";
          this.className = "vuestic-toast-warning";

          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className
          });
        }

        if (isNaN(labassay.grouporder) || isNaN(labassay.price)) {
          item = false;
          bus.$emit("LabAssayRefresh");
          this.toastText = "Sva polja nisu validirana.";
          this.toastIcon = "fa-warning";
          this.toastPosition = "top-right";
          this.className = "vuestic-toast-warning";

          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className
          });
        }
      }

      if (item) {
        http
          .post("postavke/labtest/edit", {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site,
            _id: labassay._id,
            sifra: labassay.sifra.trim(),
            naziv: labassay.naziv.trim(),
            analit: labassay.analit.trim(),
            jedinica: labassay.jedinica.trim(),
            grouporder: labassay.grouporder.trim(),
            price: labassay.price.trim(),
            specific: labassay.specific,
            code: labassay.code.trim(),
            sekcija: labassay.sekcija.trim(),
            grupa: labassay.grupa.trim(),
            kategorija: labassay.kategorija.trim(),
            tip: labassay.tip.trim(),
            entryorder: labassay.entryorder.trim(),
            interpretacija: labassay.interpretacija,
            sites: labassay.sites
          })
          .then(res => {
            if (res.data.success) {
              http
                .post("assays/lab/price", {
                  token: this.$store.state.token,
                  site: this.$store.state.site,
                  _id: labassay._id,
                  naziv: labassay.naziv.trim(),
                  analit: labassay.analit.trim(),
                  price: labassay.price.trim(),
                  code: labassay.code.trim()
                })
                .then(res => {
                  if (res.data.success) {
                    // console.log(res.data);
                    bus.$emit("LabAssayHide");
                    bus.$emit("LabAssayRefresh");
                    // this.Uredi = true
                    setTimeout(() => {
                      // this.izbor = "Povišeno"
                    }, 500);
                  } else {
                    // console.warn("Greška prilikom izmjene podataka.");
                  }
                });
            } else {
              // console.warn("Greška prilikom izmjene podataka.");
            }
          });
      }
    },

    AnalitDelete: function(event) {
      http
        .post("postavke/labtest/analit/delete", {
          email: this.$store.state.userId,
          analit: event.target.id,
          test: this.analit,
          analit_id: this.analit_id,
          token: this.$store.state.token,
          site: this.$store.state.site
        })
        .then(res => {
          this.analitKod = "";
          this.analitNaziv = "";
          this.analitOpis = "";
          this.analiti = res.data.analiti;

          if (this.analiti.length > 0) {
            this.tabela = true;
          } else {
            this.tabela = false;
          }
        });
    },

    editAnaUnit(event, unit) {
      this.edit = true;
      this.uredi = false;
      this.temp_id = event.target.id;
    },

    saveAnaUnit(event, unit) {
      this.edit = false;
      this.uredi = true;
      this.temp_id = event.target.id;

      http
        .post("postavke/labtest/analit/edit", {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          analit: event.target.id,
          test: this.analit,
          analit_id: this.analit_id,
          unit: unit,
          site: this.$store.state.site
        })
        .then(res => {
          if (res.data.success === false) {
            this.toastText = "Greška prilikom upisa.";
            this.toastIcon = "fa-remove";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-danger";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className
            });
          } else {
            this.toastText = "Izmjena uspješno obavljena.";
            this.toastIcon = "fa-check";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-primary";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: this.toastDuration,
              fullWidth: this.isToastFullWidth,
              className: this.className
            });
          }
        });
    },

    sacuvajAnalit: function(event) {
      var item = true;

      if (this.$store.state.access.level > 0) {
        if (
          this.analitNaziv.trim() === "" ||
          this.analitOpis.trim() === "" ||
          this.analitKod.trim() === ""
        ) {
          item = false;
          this.toastText = "Sva polja su obavezna.";
          this.toastIcon = "fa-warning";
          this.toastPosition = "top-right";
          this.className = "vuestic-toast-warning";

          this.showToast(this.toastText, {
            icon: this.toastIcon,
            position: this.toastPosition,
            duration: this.toastDuration,
            fullWidth: this.isToastFullWidth,
            className: this.className
          });
        } else {
          var i = 0;

          for (i = 0; i < this.analiti.length; i++) {
            if (this.analitNaziv.trim() == this.analiti[i].naziv) {
              item = false;

              this.toastText = "Analit već postoji.";
              this.toastIcon = "fa-warning";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-warning";
              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className
              });
            }
          }
        }
      }

      if (item) {
        http
          .post("postavke/labtest/analit/save", {
            email: this.$store.state.userId,
            analitKod: this.analitKod,
            analitNaziv: this.analitNaziv,
            analitOpis: this.analitOpis,
            analitJedinica: this.jedinica,
            analit: this.analit,
            analit_id: this.analit_id,
            token: this.$store.state.token,
            site: this.$store.state.site
          })
          .then(res => {
            if (res.data.success === false) {
              this.toastText = "Greška prilikom upisa.";
              this.toastIcon = "fa-remove";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-danger";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className
              });
            } else {
              this.toastText = "Unos uspješno obavljen.";
              this.toastIcon = "fa-check";
              this.toastPosition = "top-right";
              this.className = "vuestic-toast-primary";

              this.showToast(this.toastText, {
                icon: this.toastIcon,
                position: this.toastPosition,
                duration: this.toastDuration,
                fullWidth: this.isToastFullWidth,
                className: this.className
              });
              this.analitKod = "";
              this.analitNaziv = "";
              this.analitOpis = "";
              this.jedinica = "";
            }
            if (res.data.success) {
              this.analiti = res.data.analiti;
              if (this.analiti.length > 0) {
                this.tabela = true;
              }
            } else {
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../sass/variables";
@import "../../sass/toasts";
@import "../../../node_modules/bootstrap/scss/functions";
@import "../../../node_modules/bootstrap/scss/variables";
@import "../../../node_modules/bootstrap/scss/mixins/breakpoints";

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

.circle {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  display: inline-block;
}

.testoviDiv {
  margin: 0 auto;
}

.lnk {
  color: $dark-gray;
  text-decoration: none;
}

a:hover {
  color: $vue-green;
}

.clicked {
  color: $vue-green;
  text-transform: uppercase;
}

.addon {
  color: $theme-red;
  text-transform: uppercase;
}
</style>
