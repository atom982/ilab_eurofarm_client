<template>
  <div class="form-elements">
    <vuestic-widget class="no-padding no-v-padding minHeight">
      <vuestic-tabs
        :names="['Registracija', 'Pregled']"
        :tab="'Registracija'"
        ref="tabs"
      >
        <div :slot="'Registracija'">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="naziv"
                    title=" "
                    v-model="naziv"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="naziv">{{ "Naziv" }}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="opis"
                    title=" "
                    v-model="opis"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="opis">{{ "Opis" }}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="jib"
                    title=" "
                    v-model="jib"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="jib">{{ "JIB" }}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="adresa"
                    title=" "
                    v-model="adresa"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="adresa">
                    {{ "Adresa" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="odgovornoLice"
                    title=" "
                    v-model="odgovornoLice"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="odgovornoLice">
                    {{ "Odgovorna osoba" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="telefon"
                    title=" "
                    v-model="telefon"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="telefon">
                    {{ "Telefon" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="lokal"
                    title=" "
                    v-model="lokal"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="lokal">{{ "Lokal" }}</label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="email"
                    title=" "
                    v-model="email"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="email">
                    {{ "Email adresa" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group with-icon-left">
                <div class="input-group">
                  <input
                    autocomplete="off"
                    id="web"
                    title=" "
                    v-model="web"
                    name="prp-input-icon-left"
                    required
                  />
                  <i
                    class="glyphicon glyphicon-pencil icon-left input-icon"
                  ></i>
                  <label class="control-label" for="web">
                    {{ "Web adresa" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <div class="form-check abc-checkbox abc-checkbox-primary">
                    <input
                      class="form-check-input"
                      id="checkbox-posiljaoc"
                      type="checkbox"
                      v-model="postavke.posiljaoc"
                    />
                    <label class="form-check-label" for="checkbox-posiljaoc">
                      <span class="abc-label-text">{{ "Pošiljaoc" }}</span>
                    </label>
                  </div>

                  <div class="form-check abc-checkbox abc-checkbox-primary">
                    <input
                      class="form-check-input"
                      id="checkbox-narucioc"
                      type="checkbox"
                      v-model="postavke.narucioc"
                    />
                    <label class="form-check-label" for="checkbox-narucioc">
                      <span class="abc-label-text">{{ "Naručioc" }}</span>
                    </label>
                  </div>

                  <div class="form-check abc-checkbox abc-checkbox-primary">
                    <input
                      class="form-check-input"
                      id="checkbox-izvrsioc"
                      type="checkbox"
                      v-model="postavke.izvrsioc"
                    />
                    <label class="form-check-label" for="checkbox-izvrsioc">
                      <span class="abc-label-text">{{ "Izvršioc" }}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <button
                    :disabled="naziv.trim() == '' || opis.trim() == ''"
                    class="btn btn-sm btn-secondary pull-right"
                    style="text-transform: none; border: 0px"
                    @click.prevent="Save()"
                  >
                    <span class="fa fa-save"></span>
                    {{ " SAČUVAJ" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div :slot="'Pregled'">
          <div class="row">
            <div class="col-md-12">
              <div class="table-responsive">
                <table
                  v-show="partneri.length"
                  class="table table-striped first-td-padding"
                >
                  <thead>
                    <tr>
                      <td width="20%">{{ "Naziv" }}</td>
                      <td width="25%">{{ "Opis" }}</td>
                      <td width="25%">{{ "Adresa" }}</td>
                      <td width="10%" align="center">{{ "Više" }}</td>
                      <td width="10%" align="center">{{ "Uredi" }}</td>
                      <td width="10%" align="center">{{ "Akcija" }}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="element in partneri" :key="element._id">
                      <td>{{ element.naziv }}</td>
                      <td>{{ element.opis }}</td>
                      <td>{{ element.adresa }}</td>

                      <td align="center">
                        <button
                          :disabled="false"
                          @click.prevent="Info($event, element)"
                          class="btn btn-info btn-micro"
                        >
                          <span
                            @click.prevent="Info($event, element)"
                            class="fa fa-database"
                          ></span>
                        </button>
                      </td>
                      <td align="center">
                        <button
                          :disabled="false"
                          @click.prevent="Edit($event, element)"
                          class="btn btn-warning btn-micro"
                        >
                          <span
                            @click.prevent="Edit($event, element)"
                            class="fa fa-edit"
                          ></span>
                        </button>
                      </td>
                      <td align="center">
                        <button
                          :disabled="
                            !element.postavke.narucioc &&
                            !element.postavke.posiljaoc &&
                            !element.postavke.izvrsioc
                          "
                          @click.prevent="Delete($event, element)"
                          class="btn btn-danger btn-micro"
                        >
                          <span
                            @click.prevent="Delete($event, element)"
                            class="fa fa-ban"
                          ></span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Modals -->

          <vuestic-modal-partneri-delete
            :show.sync="show"
            ref="staticModalPartneriDelete"
            cancelText="ODUSTANI"
            okText="POTVRDI"
          >
            <div slot="title">
              {{ "" }}
              <span style="color: #e34a4a">{{ "Otkazivanje ugovora" }}</span>
            </div>
            <div>
              <div class="row">
                <div class="col-md-3"></div>

                <div class="col-md-6">
                  <div class="form-group">
                    <div class="input-group">
                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          disabled
                          class="form-check-input"
                          id="checkbox-posiljaoc"
                          type="checkbox"
                          v-model="partner.postavke.posiljaoc"
                        />
                        <label
                          class="form-check-label"
                          for="checkbox-posiljaoc"
                        >
                          <span class="abc-label-text">{{ "Pošiljaoc" }}</span>
                        </label>
                      </div>

                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          disabled
                          class="form-check-input"
                          id="checkbox-narucioc"
                          type="checkbox"
                          v-model="partner.postavke.narucioc"
                        />
                        <label class="form-check-label" for="checkbox-narucioc">
                          <span class="abc-label-text">{{ "Naručioc" }}</span>
                        </label>
                      </div>

                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          disabled
                          class="form-check-input"
                          id="checkbox-izvrsioc"
                          type="checkbox"
                          v-model="partner.postavke.izvrsioc"
                        />
                        <label class="form-check-label" for="checkbox-izvrsioc">
                          <span class="abc-label-text">{{ "Izvršioc" }}</span>
                        </label>
                      </div>
                    </div>
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
                      <button v-if="false" @click.prevent="Test">
                        {{ "Loading..." }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vuestic-modal-partneri-delete>

          <vuestic-modal-partneri-edit
            :show.sync="show"
            ref="staticModalPartneriEdit"
            cancelText="ODUSTANI"
            okText="POTVRDI"
          >
            <div slot="title">
              {{ "" }}
              <span style="color: #e34a4a">{{ "Izmjena podataka" }}</span>
            </div>
            <div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="naziv"
                        title=" "
                        v-model="partner.naziv"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="naziv">{{
                        "Naziv"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="opis"
                        title=" "
                        v-model="partner.opis"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="opis">{{
                        "Opis"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="jib"
                        title=" "
                        v-model="partner.jib"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="jib">{{ "JIB" }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="adresa"
                        title=" "
                        v-model="partner.adresa"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="adresa">
                        {{ "Adresa" }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="odgovornoLice"
                        title=" "
                        v-model="partner.odgovornoLice"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="odgovornoLice">
                        {{ "Odgovorna osoba" }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="telefon"
                        title=" "
                        v-model="partner.telefon"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="telefon">
                        {{ "Telefon" }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="lokal"
                        title=" "
                        v-model="partner.lokal"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="lokal">{{
                        "Lokal"
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="email"
                        title=" "
                        v-model="partner.email"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="email">
                        {{ "Email adresa" }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group with-icon-left">
                    <div class="input-group">
                      <input
                        autocomplete="off"
                        id="web"
                        title=" "
                        v-model="partner.web"
                        name="prp-input-icon-left"
                        required
                      />
                      <i
                        class="glyphicon glyphicon-pencil icon-left input-icon"
                      ></i>
                      <label class="control-label" for="web">
                        {{ "Web adresa" }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          class="form-check-input"
                          id="checkbox-posiljaoc"
                          type="checkbox"
                          v-model="partner.postavke.posiljaoc"
                        />
                        <label
                          class="form-check-label"
                          for="checkbox-posiljaoc"
                        >
                          <span class="abc-label-text">{{ "Pošiljaoc" }}</span>
                        </label>
                      </div>

                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          class="form-check-input"
                          id="checkbox-narucioc"
                          type="checkbox"
                          v-model="partner.postavke.narucioc"
                        />
                        <label class="form-check-label" for="checkbox-narucioc">
                          <span class="abc-label-text">{{ "Naručioc" }}</span>
                        </label>
                      </div>

                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          class="form-check-input"
                          id="checkbox-izvrsioc"
                          type="checkbox"
                          v-model="partner.postavke.izvrsioc"
                        />
                        <label class="form-check-label" for="checkbox-izvrsioc">
                          <span class="abc-label-text">{{ "Izvršioc" }}</span>
                        </label>
                      </div>
                    </div>
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
                      <button v-if="false" @click.prevent="Test">
                        {{ "Loading..." }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vuestic-modal-partneri-edit>

          <vuestic-modal-partneri-info
            :show.sync="show"
            ref="staticModalPartneriInfo"
            cancelText="ZATVORI"
            okText="POTVRDI"
          >
            <div slot="title">
              {{ "" }}
              <span style="color: #e34a4a">{{ "Pregled podataka" }}</span>
            </div>
            <div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="naziv"
                        title=" "
                        v-model="partner.naziv"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="naziv">{{
                        "Naziv: " + partner.naziv
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="opis"
                        title=" "
                        v-model="partner.opis"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="opis">{{
                        "Opis: " + partner.opis
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="jib"
                        title=" "
                        v-model="partner.jib"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="jib">{{
                        "JIB: " + partner.jib
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="adresa"
                        title=" "
                        v-model="partner.adresa"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="adresa">
                        {{ "Adresa: " + partner.adresa }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="odgovornoLice"
                        title=" "
                        v-model="partner.odgovornoLice"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="odgovornoLice">
                        {{ "Odgovorna osoba: " + partner.odgovornoLice }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="telefon"
                        title=" "
                        v-model="partner.telefon"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="telefon">
                        {{ "Telefon: " + partner.telefon }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="lokal"
                        title=" "
                        v-model="partner.lokal"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="lokal">{{
                        "Lokal: " + partner.lokal
                      }}</label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="email"
                        title=" "
                        v-model="partner.email"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="email">
                        {{ "Email adresa: " + partner.email }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input
                        disabled
                        autocomplete="off"
                        id="web"
                        title=" "
                        v-model="partner.web"
                        name="prp-input-icon-left"
                        required
                      />

                      <label class="control-label" for="web">
                        {{ "Web adresa: " + partner.web }}
                      </label>
                      <i class="bar"></i>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          disabled
                          class="form-check-input"
                          id="checkbox-posiljaoc"
                          type="checkbox"
                          v-model="partner.postavke.posiljaoc"
                        />
                        <label
                          class="form-check-label"
                          for="checkbox-posiljaoc"
                        >
                          <span class="abc-label-text">{{ "Pošiljaoc" }}</span>
                        </label>
                      </div>

                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          disabled
                          class="form-check-input"
                          id="checkbox-narucioc"
                          type="checkbox"
                          v-model="partner.postavke.narucioc"
                        />
                        <label class="form-check-label" for="checkbox-narucioc">
                          <span class="abc-label-text">{{ "Naručioc" }}</span>
                        </label>
                      </div>

                      <div class="form-check abc-checkbox abc-checkbox-primary">
                        <input
                          disabled
                          class="form-check-input"
                          id="checkbox-izvrsioc"
                          type="checkbox"
                          v-model="partner.postavke.izvrsioc"
                        />
                        <label class="form-check-label" for="checkbox-izvrsioc">
                          <span class="abc-label-text">{{ "Izvršioc" }}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </vuestic-modal-partneri-info>
        </div>
      </vuestic-tabs>
    </vuestic-widget>

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
import { http } from "../../../config/config.js";
import { server } from "../../../config/config.js";
import { bus } from "../../main";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "narucioc",

  data() {
    return {
      show: true,
      timestamp: "",
      selected_tab: "",
      partneri: [],

      // Partner
      naziv: "",
      opis: "",
      jib: "",
      adresa: "",
      odgovornoLice: "",
      telefon: "",
      lokal: "",
      email: "",
      web: "",
      postavke: {
        posiljaoc: false,
        narucioc: false,
        izvrsioc: false,
      },
      site: "",
      created_at: "",
      updated_at: "",
      created_by: "",
      updated_by: "",

      partner: {
        _id: "",
        naziv: "",
        opis: "",
        jib: "",
        adresa: "",
        odgovornoLice: "",
        telefon: "",
        lokal: "",
        email: "",
        web: "",
        postavke: {
          posiljaoc: false,
          narucioc: false,
          izvrsioc: false,
        },
        created_at: "",
        updated_at: "",
        created_by: "",
        updated_by: "",
        __v: "",
      },
      // End of Partner

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

  watch: {},

  created() {
    this.selected_tab = "Registracija";
    http
      .get(
        "partneri/all/get?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        // console.warn(res.data.message);

        this.partneri = [];

        res.data.partneri.forEach((element) => {
          this.partneri.push(element);
        });
      });
  },

  mounted() {
    bus.$on("tabChanged", (data) => {
      // console.log(data);
      this.selected_tab = data;
    });
    bus.$on("PartneriRefresh", () => {
      // console.log("Refresh");
    });
    this.timestamp = (new Date().getTime() - new Date().getTimezoneOffset() * 60000).toString();

    bus.$on("partneriDelete", () => {
      this.isLoading = true;

      this.partner.postavke = {
        posiljaoc: false,
        narucioc: false,
        izvrsioc: false,
      };

      http
        .post("partneri/single/edit", {
          partner: this.partner,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          if (res.data.success) {
            bus.$emit("PotvrdiDelete");
            this.isLoading = false;

            this.partneri = [];

            res.data.partneri.forEach((element) => {
              this.partneri.push(element);
            });

            this.partner = {
              _id: "",
              naziv: "",
              opis: "",
              jib: "",
              adresa: "",
              odgovornoLice: "",
              telefon: "",
              lokal: "",
              email: "",
              web: "",
              postavke: {
                posiljaoc: false,
                narucioc: false,
                izvrsioc: false,
              },
              created_at: "",
              updated_at: "",
              created_by: "",
              updated_by: "",
              __v: "",
            };
          }
        });
    });

    bus.$on("partneriEdit", () => {
      this.isLoading = true;

      http
        .post("partneri/single/edit", {
          partner: this.partner,
          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          if (res.data.success) {
            bus.$emit("PotvrdiEdit");
            this.isLoading = false;

            this.partneri = [];

            res.data.partneri.forEach((element) => {
              this.partneri.push(element);
            });

            this.partner = {
              _id: "",
              naziv: "",
              opis: "",
              jib: "",
              adresa: "",
              odgovornoLice: "",
              telefon: "",
              lokal: "",
              email: "",
              web: "",
              postavke: {
                posiljaoc: false,
                narucioc: false,
                izvrsioc: false,
              },
              created_at: "",
              updated_at: "",
              created_by: "",
              updated_by: "",
              __v: "",
            };
          }
        });
    });

    bus.$on("partneriInfo", () => {});

    bus.$on("ModalCancel", () => {
      // console.log("Canceled");
      this.partner = {
        _id: "",
        naziv: "",
        opis: "",
        jib: "",
        adresa: "",
        odgovornoLice: "",
        telefon: "",
        lokal: "",
        email: "",
        web: "",
        postavke: {
          posiljaoc: false,
          narucioc: false,
          izvrsioc: false,
        },
        created_at: "",
        updated_at: "",
        created_by: "",
        updated_by: "",
        __v: "",
      };

      http
        .get(
          "partneri/all/get?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then((res) => {
          // console.warn(res.data.message);

          this.partneri = [];

          res.data.partneri.forEach((element) => {
            this.partneri.push(element);
          });
        });
    });
  },

  beforeDestroy() {
    bus.$off("tabChanged");
    bus.$off("PartneriRefresh");

    bus.$off("partneriDelete");
    bus.$off("partneriEdit");
    bus.$off("partneriInfo");
    bus.$off("ModalCancel");
  },

  methods: {
    Delete($event, element) {
      // console.log(element.postavke);
      this.partner = element;
      if (
        element.postavke.narucioc != false ||
        element.postavke.posiljaoc != false ||
        element.postavke.izvrsioc != false
      ) {
        this.$refs.staticModalPartneriDelete.open();
      }
    },
    Edit($event, element) {
      // console.log(element)
      this.partner = element;
      this.$refs.staticModalPartneriEdit.open();
    },
    Info($event, element) {
      // console.log(element)
      this.partner = element;
      this.$refs.staticModalPartneriInfo.open();
    },
    Test() {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
    onCancel() {},

    Save() {
      this.isLoading = true;
      http
        .post("partneri/new/insert", {
          naziv: this.naziv,
          opis: this.opis,
          jib: this.jib,
          adresa: this.adresa,
          odgovornoLice: this.odgovornoLice,
          telefon: this.telefon,
          lokal: this.lokal,
          email: this.email,
          web: this.web,
          postavke: this.postavke,

          token: this.$store.state.token,
          site: this.$store.state.site,
        })
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data);

            this.partneri = [];

            res.data.partneri.forEach((element) => {
              this.partneri.push(element);
            });

            this.naziv = "";
            this.opis = "";
            this.jib = "";
            this.adresa = "";
            this.odgovornoLice = "";
            this.telefon = "";
            this.lokal = "";
            this.email = "";

            this.web = "";
            this.postavke = {
              posiljaoc: false,
              narucioc: false,
              izvrsioc: false,
            };
          }
          setTimeout(() => {
            this.isLoading = false;
          }, 2000);
        });
    },

    /* 
    naziv: { type: String, default: "Nema podataka" },
    opis: { type: String, default: "Nema podataka" },
    jib: { type: String, default: "Nema podataka" },
    adresa: { type: String, default: "Nema podataka" },
    odgovornoLice: { type: String, default: "Nema podataka" },
    telefon: { type: String, default: "Nema podataka" },
    lokal: { type: String, default: "Nema podataka" },
    email: { type: String, default: "Nema podataka" },
    web: { type: String, default: "Nema podataka" },
    postavke: {
      type: Object,
      default: { posiljaoc: false, narucioc: false, izvrsioc: false },
    },

    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    created_by: { type: String, default: "Nema podataka" },
    updated_by: { type: String, default: "Nema podataka" }, 
    */
  },
};
</script>

<style lang="scss" scoped>
@import "../../sass/_variables.scss";
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

.widget.simple-vertical-wizard-widget {
  .widget-body {
    padding: 0 $widget-padding;
    @include media-breakpoint-down(sm) {
      padding: $widget-padding 0;
    }
  }
}

.form-wizard-page {
  .form-group {
    min-width: 200px;
    max-width: 360px;
    width: 80%;
  }
}

.minHeight {
  min-height: 650px;
}

.chart-container {
  padding: 0 2rem;
  height: 24rem;
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #e34a4a;
}

i:hover {
  color: #e34a4a !important;
}
</style>
