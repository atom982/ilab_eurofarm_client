<template>
  <div class="collapse-page">
    <div v-if="show" class="flex md12">
      <!-- Prikaz nalaza -->

      <div v-show="!main && pdf">
        <div class="btn-container">
          <button
            v-show="verificiran"
            class="btn btn-secondary btn-sm"
            @click.prevent="Nazad()"
          >
            <span class="fa fa-step-backward"></span>
            {{ " NAZAD" }}
          </button>
          <button
            v-show="!verificiran"
            class="btn btn-secondary-danger btn-sm"
            @click.prevent="Nazad()"
          >
            <span class="fa fa-step-backward"></span>
            {{ " NAZAD" }}
          </button>
          <button
            v-show="email_button && verificiran"
            class="btn btn-secondary btn-sm pull-right"
            :disabled="!Email(email)"
            @click.prevent="MailDialog()"
          >
            <span class="glyphicon glyphicon-send"></span>
            {{ " Pošalji" }}
          </button>
          <div
            v-show="email_button && verificiran"
            class="form-group with-icon-left pull-right"
          >
            <div class="input-group">
              <input
                size="40"
                id="input-icon-left"
                name="input-icon-left"
                v-model="email"
                title=" "
                required
              />
              <i class="fa fa-envelope-o icon-left input-icon"></i>
              <label class="control-label" for="input-icon-left">
                {{ "Email adresa" }}
              </label>
              <i class="bar"></i>
            </div>
          </div>
        </div>
        <hr />

        <!-- PDFObject -->

        <div id="pdf-container"></div>
      </div>

      <!-- Prikaz rezultata (Main screen) -->

      <vuestic-widget
        v-show="main"
        :headerText="header"
        :pagination="pagination"
        :main="main"
        :data_pid="Number(data_pid)"
        :data_length="Number(data_length)"
        :rezultati_length="Results.length"
        :spol="data_spol"
        :data_min="Number(data_min)"
        :datum="query_date"
        :today="today_date"
        :forward_disabled="forward_disabled"
        :backward_disabled="backward_disabled"
      >
        <vuestic-accordion-obrada>
          <vuestic-collapse-obrada
            v-for="uzorak in uzorci"
            v-show="!uzorak.removed"
            :id="uzorak.sid"
            :key="uzorak.sid"
            :sample="uzorak"
            :retest="save_retest"
          >
            <span :id="uzorak.sid" slot="header">{{ uzorak.tip }}</span>
            <div slot="body">
              <div style="line-height: 10px">&nbsp;</div>

              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!-- 





| Microbiology Table





              -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->

              <div v-if="uzorak.tip.includes('Mikrobiologija')" class="va-row">
                <div v-show="show_table" class="table-responsive">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr align="middle">
                        <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN'
                          "
                        ></td>
                        <td>{{ "ANALIZA" }}</td>
                        <td>{{ "REZULTAT" }}</td>
                        <td>{{ "JEDINICA" }}</td>
                        <td>{{ "REFERENCE" }}</td>
                       <!--  <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN'
                          "
                        ></td> -->
                       <!--  <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            MicrobiologyScenario != 'MAIBPoR'
                          "
                        >
                          {{ "PONOVI" }}
                        </td> -->
                        <td
                          v-if="MicrobiologyScenario === 'MAIBPoR'"
                          style="text-transform: none"
                        >
                          {{ "Bakterije" }}
                        </td>
                        <td></td>
                      </tr>
                    </thead>

                    <!-- Table Body -->

                    <tbody>
                      <tr
                        align="middle"
                        v-for="(test, index) in rezultati"
                        v-show="index < 1"
                        :key="test.labassay_id"
                        v-bind:class="{
                          'table-danger':
                            test.rezultat_m.length &&
                            test.rezultat_m[0].pozitivan,
                          'table-success':
                            test.rezultat_m.length &&
                            test.rezultat_m[0].negativan,
                          'table-warning': false,
                        }"
                      >
                        <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN'
                          "
                        >
                          <button
                            style="padding: 0.4px; padding-left: 2px"
                            v-if="uzorak.status === 'ZAPRIMLJEN'"
                            @click.prevent="MicroResultSelect($event)"
                            class="btn btn-secondary-danger btn-micro"
                          >
                            <i
                              class="fa fa-bug"
                              @click.prevent="MicroResultSelect($event)"
                            ></i>
                          </button>
                          <button
                            style="
                              padding: 0.6px;
                              padding-right: 1px;
                              padding-left: 1.2px;
                            "
                            v-if="uzorak.status != 'ZAPRIMLJEN'"
                            @click.prevent="ResetSample($event)"
                            class="btn btn-secondary-danger btn-micro"
                          >
                            <i
                              class="fa fa-backward"
                              @click.prevent="ResetSample($event)"
                            ></i>
                          </button>
                        </td>

                        <!-- ANALIZA -->

                        <td :title="test.analit">
                          <span>{{ test.ime }}</span>
                        </td>

                        <!-- REZULTAT -->

                        <td v-if="test.rezultat_m.length > 0">
                          <button
                            :id="test.labassay_id"
                            class="btn btn-primary btn-micro"
                            @click.prevent="OpenMicro($event, test)"
                          >
                            <span
                              :id="test.labassay_id"
                              class="glyphicon glyphicon-search"
                            ></span>
                            {{ "VIŠE" }}
                          </button>
                        </td>
                        <td v-if="test.rezultat_m.length < 1">
                          <button
                            :id="test.labassay_id"
                            class="btn btn-pale btn-micro"
                          >
                            <span
                              :id="test.labassay_id"
                              class="glyphicon glyphicon-ban-circle"
                            ></span>
                            {{ "VIŠE" }}
                          </button>
                        </td>

                        <!-- JEDINICA -->

                        <td>{{ test.unit }}</td>

                        <!-- REFERENCE -->

                        <td>{{ "/" }}</td>
                      <!--   <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN'
                          "
                        >
                          <i
                            style="font-size: 15px; color: #f7cc36; opacity: 0"
                            class="glyphicon glyphicon-stats"
                            id="reference"
                            title=" "
                          ></i>
                        </td> -->

                        <!-- PONOVI -->

                     <!--    <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            MicrobiologyScenario != 'MAIBPoR'
                          "
                        >
                          <button class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td> -->

                        <td v-if="MicrobiologyScenario === 'MAIBPoR'">
                          <button
                            @click.prevent="OpenMicroSelect($event, test)"
                            class="btn btn-primary btn-micro"
                          >
                            <span class="fa fa-bug"></span>
                          </button>
                        </td>

                        <!--  -->

                        <td>
                          <i
                            @click.prevent="Exclamation(test)"
                            v-bind:class="{
                              'fa fa-exclamation-triangle icon-right input-icon error-icon': false,
                            }"
                          ></i>
                          <i
                            v-bind:class="{
                              'fa fa-check success-icon icon-right input-icon': false,
                            }"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!-- 





END of Microbiology Table |





              -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->
              <!--  -->

              <!-- Uzorci | Default Table -->

              <div v-if="!uzorak.tip.includes('Mikrobiologija')" class="va-row">
                <div v-show="show_table" class="table-responsive">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr align="middle">
                       <!--  <td
                          width="10%"
                        ></td> -->
                        <td  width="25%" >{{ "ANALIZA" }}</td>
                        <td  width="25%">{{ "REZULTAT" }}</td>
                        <td  width="20%">{{ "JEDINICA" }}</td>
                        <td  width="25%">{{ "Referentni interval" }}</td>
                        <!-- <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN'
                          "
                        ></td> -->
                        <!-- <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            calculated
                          "
                        >
                          {{ "AKCIJA" }}
                        </td> -->
                 <!--        <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN'
                          "
                        >
                          {{ "PONOVI" }}
                        </td> -->
                        <td  width="5%"></td>
                      </tr>
                    </thead>

                    <!-- Table Body -->

                    <tbody>
                      <tr
                        align="middle"
                        v-for="test in rezultati"
                        :key="test.labassay_id"
                        v-bind:class="{
                          'table-danger':
                            Interpretacija(
                              test.analit,
                              test.rezultat,
                              test.unit,
                              test.dRef,
                              test.gRef,
                              $store.state.site,
                              test.interp,
                              test.extend,
                              spec
                            )[5] === 'Red' && !test.multidata,
                          'table-success':
                            Interpretacija(
                              test.analit,
                              test.rezultat,
                              test.unit,
                              test.dRef,
                              test.gRef,
                              $store.state.site,
                              test.interp,
                              test.extend,
                              spec
                            )[5] === 'Green' && !test.multidata,
                          'table-warning':
                            Interpretacija(
                              test.analit,
                              test.rezultat,
                              test.unit,
                              test.dRef,
                              test.gRef,
                              $store.state.site,
                              test.interp,
                              test.extend,
                              spec
                            )[5] === 'Yellow' && !test.multidata,
                        }"
                      >
                      <!--   <td
                          
                        >
                          <i
                            v-if="note != ''"
                            
                            style="color: #e34a4a"
                            class="fa fa-warning"
                          ></i>

                          <span
                            v-if="note === ''"
                            style="color: #d9d9d9"
                            class="fa fa-warning"
                          ></span>
                        </td> -->

                        <!-- ANALIZA -->

                        <td :title="''">
                          <span
                            @contextmenu="LabAssayEval($event, test)"
                            @click.prevent="Evaluation(test)"
                            >{{ test.ime }}</span
                          >
                        </td>

                        <!-- REZULTAT -->

                        <td v-if="!test.multidata" align ="center">
                          <div
                            v-show="test.edit == false"
                            style="
                              display: inline;
                              font-size: 14px;
                              line-height: 4.5px;
                            "
                          >
                            <label>
                              <strong>{{ test.rezultat }}</strong>
                            </label>
                          </div>
                          <div
                            v-show="test.edit == true"
                            style="display: inline; line-height: 5px"
                          >
                            <select
                              v-if="test.select_options != undefined"
                              style="width: 150px"
                              v-model="test.rezultat"
                            >
                              <option
                                v-for="option in test.select_options"
                                :key="option"
                              >
                                {{ option }}
                              </option>
                            </select>
                          </div>
                          <div
                            v-show="test.edit == true"
                            style="display: inline"
                          >
                            <input
                              v-if="test.select_options === undefined"
                              v-model="test.rezultat"
                              style="
                                width: 110px;
                                font-size: 12px;
                                line-height: 7px;
                              "
                            />
                          </div>
                          <sup
                            v-show="test.vise > 2"
                            @click.prevent="GetResults(test, uzorak.status)"
                          >
                            <i
                              style="font-size: 5px; color: #e34a4a"
                              class="fa fa-star"
                              id="star"
                              title=" "
                            ></i>
                          </sup>
                          <sup v-show="test.vise < 3">
                            <i
                              style="font-size: 5px; opacity: 0"
                              class="fa fa-star-o"
                              id="star"
                              title=" "
                            ></i>
                          </sup>
                        </td>
                        <td v-if="test.multidata && test.realizovan">
                          <button
                            :id="test.labassay_id"
                            class="btn btn-primary btn-micro"
                            @click.prevent="
                              MultiGet(
                                $event,
                                test.ime,
                                test.analit,
                                test.rezultat,
                                test.odobren
                              )
                            "
                          >
                            <span
                              :id="test.labassay_id"
                              @click.prevent="
                                MultiGet(
                                  $event,
                                  test.ime,
                                  test.analit,
                                  test.rezultat,
                                  test.odobren
                                )
                              "
                              class="glyphicon glyphicon-search"
                            ></span>
                            {{ "VIŠE" }}
                          </button>
                          <sup
                            v-show="test.multi_count > 2"
                            @click.prevent="
                              GetResultsMulti(test, uzorak.status)
                            "
                          >
                            <i
                              style="font-size: 5px; color: #e34a4a"
                              class="fa fa-star"
                              id="star"
                              title=" "
                            ></i>
                          </sup>
                          <sup v-show="test.multi_count < 3">
                            <i
                              style="font-size: 5px; opacity: 0"
                              class="fa fa-star-o"
                              id="star"
                              title=" "
                            ></i>
                          </sup>
                        </td>
                        <td v-if="test.multidata && !test.realizovan">
                          <button
                            :id="test.labassay_id"
                            class="btn btn-warning btn-micro"
                            @click.prevent="
                              MultiGet(
                                $event,
                                test.ime,
                                test.analit,
                                test.rezultat,
                                test.odobren
                              )
                            "
                          >
                            <span
                              :id="test.labassay_id"
                              @click.prevent="
                                MultiGet(
                                  $event,
                                  test.ime,
                                  test.analit,
                                  test.rezultat,
                                  test.odobren
                                )
                              "
                              class="glyphicon glyphicon-search"
                            ></span>
                            {{ "VIŠE" }}
                          </button>
                          <sup
                            v-show="test.multi_count > 2"
                            @click.prevent="
                              GetResultsMulti(test, uzorak.status)
                            "
                          >
                            <i
                              style="font-size: 5px; color: #e34a4a"
                              class="fa fa-star"
                              id="star"
                              title=" "
                            ></i>
                          </sup>
                          <sup v-show="test.multi_count < 3">
                            <i
                              style="font-size: 5px; opacity: 0"
                              class="fa fa-star-o"
                              id="star"
                              title=" "
                            ></i>
                          </sup>
                        </td>

                        <!-- JEDINICA -->

                        <td>{{ test.unit }}</td>

                        <!-- REFERENCE -->

                        <td v-if="!test.multidata">
                          {{
                            Interpretacija(
                              test.analit,
                              test.rezultat,
                              test.unit,
                              test.dRef,
                              test.gRef,
                              $store.state.site,
                              test.interp,
                              test.extend,
                              spec
                            )[4]
                          }}
                        </td>
                        <td v-if="test.multidata">{{ "/" }}</td>
                        <!-- <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN'
                          "
                        >
                          <i
                            v-if="!test.multidata"
                            @click.prevent="Reference($event, test)"
                            style="font-size: 15px; color: #f7cc36"
                            class="glyphicon glyphicon-stats"
                            id="reference"
                            title=" "
                          ></i>
                          <i
                            v-if="test.multidata"
                            style="font-size: 15px; color: #f7cc36; opacity: 0"
                            class="glyphicon glyphicon-stats"
                            id="reference"
                            title=" "
                          ></i>
                        </td> -->

                        <!-- AKCIJA -->

                       <!--  <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            calculated &&
                            !test.calculated
                          "
                        >
                          <button class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td> -->
                       <!--  <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            calculated &&
                            test.calculated
                          "
                        >
                          <button
                            @click.prevent="
                              Calculate(
                                $event,
                                test.labassay_id,
                                test.ime,
                                test.id
                              )
                            "
                            :id="test.test"
                            class="btn btn-primary btn-micro"
                          >
                            <span
                              :id="test.test"
                              class="fa fa-calculator"
                            ></span>
                          </button>
                        </td> -->

                        <!-- PONOVI -->

               <!--          <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            (test.rezultat === '' ||
                              test.manual ||
                              test.calculated)
                          "
                        >
                          <button class="btn btn-pale btn-micro">
                            <span class="glyphicon glyphicon-ban-circle"></span>
                          </button>
                        </td> -->
                        <!-- <td
                          v-if="
                            uzorak.status != 'ODOBREN' &&
                            uzorak.status != 'VERIFICIRAN' &&
                            test.rezultat != '' &&
                            !test.manual &&
                            !test.calculated
                          "
                        >
                          <button
                            v-if="!test.retest"
                            :id="test.test"
                            class="btn btn-primary btn-micro"
                            @click.prevent="RetestEnable($event)"
                          >
                            <span :id="test.test" class="fa fa-refresh"></span>
                          </button>
                          <button
                            v-if="test.retest"
                            :id="test.test"
                            class="btn btn-info btn-micro"
                            @click.prevent="RetestDisable($event)"
                          >
                            <span
                              :id="test.test"
                              class="glyphicon glyphicon-duplicate"
                            ></span>
                          </button>
                        </td> -->

                        <!--  -->

                        <td>
                          <i
                            @click.prevent="Exclamation(test)"
                            v-bind:class="{
                              'fa fa-exclamation-triangle icon-right input-icon error-icon':
                                Interpretacija(
                                  test.analit,
                                  test.rezultat,
                                  test.unit,
                                  test.dRef,
                                  test.gRef,
                                  $store.state.site,
                                  test.interp,
                                  test.extend,
                                  spec
                                )[5] === 'Red' && !test.multidata,
                            }"
                          ></i>
                          <i
                            v-bind:class="{
                              'fa fa-check success-icon icon-right input-icon':
                                Interpretacija(
                                  test.analit,
                                  test.rezultat,
                                  test.unit,
                                  test.dRef,
                                  test.gRef,
                                  $store.state.site,
                                  test.interp,
                                  test.extend,
                                  spec
                                )[5] === 'Green' && !test.multidata,
                            }"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- END of Uzorci | Default Table -->
            </div>
          </vuestic-collapse-obrada>
        </vuestic-accordion-obrada>

        <div style="min-height: 10px"></div>

        <!-- Nalaz -->

        <div v-show="verificiran" class="va-row">
          <div class="flex md12">
            <vuestic-collapse-nalaz
              :final="verificiran"
              :final_pdf="final_pdf"
              :samples="samples"
              :pdf="link"
              :pacijent="'Bosanski jezik'"
            >
              <span slot="header" id="HEADER">Nalaz</span>
              <div slot="body">
                <div class="va-row"></div>
              </div>
            </vuestic-collapse-nalaz>
          </div>
        </div>

        <br />

        <div v-show="verificiran" class="va-row">
          <div class="flex md12">
            <vuestic-collapse-nalaz
              :final="verificiran"
              :final_pdf="final_pdf"
              :samples="samples"
              :pdf="'ENG'"
              :pacijent="'Engleski jezik'"
            >
              <span slot="header">Nalaz</span>
              <div slot="body">
                <div class="va-row"></div>
              </div>
            </vuestic-collapse-nalaz>
          </div>
        </div>

        <br />

        <div v-show="verificiran" class="va-row">
          <div class="flex md12">
            <vuestic-collapse-nalaz
              :final="verificiran"
              :final_pdf="final_pdf"
              :samples="samples"
              :pdf="'DE'"
              :pacijent="'Njemački jezik'"
            >
              <span slot="header">Nalaz</span>
              <div slot="body">
                <div class="va-row"></div>
              </div>
            </vuestic-collapse-nalaz>
          </div>
        </div>

        <div>
          <hr />
        </div>

        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="btn-container">
              <button
                class="btn btn-secondary btn-sm wizard-back pull-left"
                @click.prevent="Povratak()"
              >
                <span class="fa fa-backward"></span>
                {{ " POVRATAK" }}
              </button>
              <button
                style="text-transform: none; color: #e34a4a"
                v-if="partials_condition && !verificiran"
                class="btn btn-secondary-warning btn-sm wizard-back pull-right"
                @click.prevent="Partials()"
              >
                <span style="color: #e34a4a" class="fa fa-file-pdf-o"></span>
                {{ " Djelimični nalaz" }}
              </button>
            </div>
          </div>
        </div>
      </vuestic-widget>

      <!-- Modals -->

      <!-- Prikaz Analita za Multi Testove -->

      <vuestic-modal-multi
        :show.sync="show"
        :sample="sample"
        ref="largeModalMulti"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">{{ naslov }}</div>
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr align="middle">
                <td width="10%"></td>
                <td width="20%">{{ "ANALIT" }}</td>
                <td width="30%">{{ "REZULTAT" }}</td>
                <td width="10%">{{ "JEDINICA" }}</td>
                <td width="20%">{{ "REFERENCE" }}</td>
                <td width="10%"></td>
              </tr>
            </thead>
            <tbody>
              <tr
                align="middle"
                v-for="test in analiti"
                :key="test.labID"
                v-bind:class="{
                  'table-danger':
                    Interpretacija(
                      test.opis,
                      test.rezultat,
                      test.jedinica,
                      test.refd,
                      test.refg,
                      $store.state.site,
                      test.interp,
                      test.extend,
                      spec
                    )[5] === 'Red' && !test.rezultat_multiple.length,
                  'table-success':
                    Interpretacija(
                      test.opis,
                      test.rezultat,
                      test.jedinica,
                      test.refd,
                      test.refg,
                      $store.state.site,
                      test.interp,
                      test.extend,
                      spec
                    )[5] === 'Green' && !test.rezultat_multiple.length,
                  'table-warning':
                    Interpretacija(
                      test.opis,
                      test.rezultat,
                      test.jedinica,
                      test.refd,
                      test.refg,
                      $store.state.site,
                      test.interp,
                      test.extend,
                      spec
                    )[5] === 'Yellow' && !test.rezultat_multiple.length,
                }"
              >
                <td v-if="test.flag != ''">{{ test.flag }}</td>
                <td v-if="test.flag === ''">&nbsp;</td>
                <td :title="test.opis">{{ test.naziv }}</td>
                <td :id="test.analit">
                  <div v-show="test.edit == false">
                    <label>
                      <strong>{{ test.rezultat }}</strong>
                    </label>
                  </div>
                  <select
                    multiple
                    :size="test.select_options.length"
                    v-if="
                      test.select_options != undefined &&
                      (test.kod === 's03' ||
                        test.kod === 's04' ||
                        test.kod === 's08' ||
                        test.kod === 's09')
                    "
                    style="min-width: 200px"
                    v-show="test.edit == true"
                    v-model="test.rezultat_multiple"
                  >
                    <option v-for="option in test.select_options" :key="option">
                      {{ option }}
                    </option>
                  </select>
                  <select
                    v-if="
                      test.select_options != undefined &&
                      test.kod != 's03' &&
                      test.kod != 's04' &&
                      test.kod != 's08' &&
                      test.kod != 's09'
                    "
                    style="width: 200px"
                    v-show="test.edit == true"
                    v-model="test.rezultat"
                  >
                    <option v-for="option in test.select_options" :key="option">
                      {{ option }}
                    </option>
                  </select>
                  <input
                    v-if="test.select_options === undefined"
                    style="width: 200px"
                    v-show="test.edit == true"
                    v-model="test.rezultat"
                  />
                </td>
                <td>
                  {{
                    Interpretacija(
                      test.opis,
                      test.rezultat,
                      test.jedinica,
                      test.refd,
                      test.refg,
                      $store.state.site,
                      test.interp,
                      test.extend,
                      spec
                    )[3]
                  }}
                </td>
                <td>
                  {{
                    Interpretacija(
                      test.opis,
                      test.rezultat,
                      test.jedinica,
                      test.refd,
                      test.refg,
                      $store.state.site,
                      test.interp,
                      test.extend,
                      spec
                    )[4]
                  }}
                </td>
                <td>
                  <i
                    @click.prevent="ExclamationMulti(test)"
                    v-bind:class="{
                      'fa fa-exclamation-triangle icon-right input-icon error-icon':
                        Interpretacija(
                          test.opis,
                          test.rezultat,
                          test.jedinica,
                          test.refd,
                          test.refg,
                          $store.state.site,
                          test.interp,
                          test.extend,
                          spec
                        )[5] === 'Red' && !test.rezultat_multiple.length,
                    }"
                  ></i>
                  <i
                    v-bind:class="{
                      'fa fa-check success-icon icon-right input-icon':
                        Interpretacija(
                          test.opis,
                          test.rezultat,
                          test.jedinica,
                          test.refd,
                          test.refg,
                          $store.state.site,
                          test.interp,
                          test.extend,
                          spec
                        )[5] === 'Green' && !test.rezultat_multiple.length,
                    }"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </vuestic-modal-multi>

      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!-- 





| Microbiology Modal





      -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->

      <vuestic-modal-micro-reset
        :show.sync="show"
        ref="staticModalResetSample"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #acb5be">{{ "Brisanje rezultata: " }}</span>
          <span style="color: #e34a4a">{{ CurrentTest }}</span>
        </div>
        <div>
          <h5>{{ "Jeste li sigurni da želite obrisati rezultat?" }}</h5>
        </div>
      </vuestic-modal-micro-reset>

      <vuestic-modal-micro-bactery
        :show.sync="show"
        :large="true"
        :sample="sample"
        :select="true"
        :update="
          !ShowAntibiotics &&
          !ShowBacteries &&
          MicrobiologyScenario === 'MAIBPoR'
        "
        :povratak="ShowAntibiotics || ShowBacteries"
        :empty="
          TemporaryAntibiotics.length > 0 || TemporaryBacteriesAdd.length > 0
        "
        ref="staticModalMicroBacterySelect"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title" v-if="!ShowAntibiotics && !ShowBacteries">
          <span style="color: #acb5be">{{ "Rezultat analize: " }}</span>
          <span style="color: #e34a4a">{{ CurrentTest }}</span>
        </div>
        <div slot="title" v-if="ShowAntibiotics && !ShowBacteries">
          <span style="color: #acb5be">{{ "Antibiotici | " }}</span>
          <span style="color: #e34a4a">{{ "Izbornik" }}</span>
        </div>
        <div slot="title" v-if="!ShowAntibiotics && ShowBacteries">
          <span style="color: #acb5be">{{ "Bakterije | " }}</span>
          <span style="color: #e34a4a">{{ "Izbornik" }}</span>
        </div>
        <div>
          <!--  -->

          <div class="row" v-if="show_table">
            <div
              class="col-md-1"
              v-if="
                MicrobiologyScenario === 'MAIBPoR' &&
                ShowBacteries &&
                !ShowAntibiotics
              "
            ></div>
            <div
              class="col-md-10"
              v-if="
                MicrobiologyScenario === 'MAIBPoR' &&
                ShowBacteries &&
                !ShowAntibiotics
              "
            >
              <div class="col-md-12" v-if="TemporaryBacteries.length">
                <div class="row">
                  <div class="col-md-4">
                    <div
                      class="form-check abc-checkbox abc-checkbox-primary"
                      v-for="bactery in filteredBacteries(1, 3)"
                      :key="bactery._id"
                    >
                      <input
                        class="form-check-input"
                        :id="bactery._id"
                        type="checkbox"
                        v-model="bactery.chosen"
                        @click="AddBacteries(bactery)"
                        :disabled="bactery.disabled"
                      />
                      <label class="form-check-label" :for="bactery._id">
                        <span
                          v-if="!bactery.chosen"
                          style="color: #e34a4a"
                          class="abc-label-text"
                          >{{ bactery.opis }}</span
                        >
                        <span
                          v-if="bactery.chosen"
                          style="color: #4ae387"
                          class="abc-label-text"
                          >{{ bactery.opis }}</span
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div
                      class="form-check abc-checkbox abc-checkbox-primary"
                      v-for="bactery in filteredBacteries(2, 3)"
                      :key="bactery._id"
                    >
                      <input
                        class="form-check-input"
                        :id="bactery._id"
                        type="checkbox"
                        v-model="bactery.chosen"
                        @click="AddBacteries(bactery)"
                        :disabled="bactery.disabled"
                      />
                      <label class="form-check-label" :for="bactery._id">
                        <span
                          v-if="!bactery.chosen"
                          style="color: #e34a4a"
                          class="abc-label-text"
                          >{{ bactery.opis }}</span
                        >
                        <span
                          v-if="bactery.chosen"
                          style="color: #4ae387"
                          class="abc-label-text"
                          >{{ bactery.opis }}</span
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div
                      class="form-check abc-checkbox abc-checkbox-primary"
                      v-for="bactery in filteredBacteries(3, 3)"
                      :key="bactery._id"
                    >
                      <input
                        class="form-check-input"
                        :id="bactery._id"
                        type="checkbox"
                        v-model="bactery.chosen"
                        @click="AddBacteries(bactery)"
                        :disabled="bactery.disabled"
                      />
                      <label class="form-check-label" :for="bactery._id">
                        <span
                          v-if="!bactery.chosen"
                          style="color: #e34a4a"
                          class="abc-label-text"
                          >{{ bactery.opis }}</span
                        >
                        <span
                          v-if="bactery.chosen"
                          style="color: #4ae387"
                          class="abc-label-text"
                          >{{ bactery.opis }}</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="col-md-1"
              v-if="
                MicrobiologyScenario === 'MAIBPoR' &&
                ShowAntibiotics &&
                !ShowBacteries
              "
            ></div>
            <div
              class="col-md-10"
              v-if="
                MicrobiologyScenario === 'MAIBPoR' &&
                ShowAntibiotics &&
                !ShowBacteries
              "
            >
              <div class="col-md-12" v-if="Antibiotics.length">
                <div class="row">
                  <div class="col-md-4">
                    <div
                      class="form-check abc-checkbox abc-checkbox-primary"
                      v-for="antibiotik in filteredAntibiotics(1, 3)"
                      :key="antibiotik._id"
                    >
                      <input
                        class="form-check-input"
                        :id="antibiotik._id"
                        type="checkbox"
                        v-model="antibiotik.chosen"
                        @click="AddAntibiotics(antibiotik)"
                        :disabled="antibiotik.disabled"
                      />
                      <label class="form-check-label" :for="antibiotik._id">
                        <span
                          v-if="!antibiotik.chosen"
                          style="color: #e34a4a"
                          class="abc-label-text"
                          >{{ antibiotik.opis }}</span
                        >
                        <span
                          v-if="antibiotik.chosen"
                          style="color: #4ae387"
                          class="abc-label-text"
                          >{{ antibiotik.opis }}</span
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div
                      class="form-check abc-checkbox abc-checkbox-primary"
                      v-for="antibiotik in filteredAntibiotics(2, 3)"
                      :key="antibiotik._id"
                    >
                      <input
                        class="form-check-input"
                        :id="antibiotik._id"
                        type="checkbox"
                        v-model="antibiotik.chosen"
                        @click="AddAntibiotics(antibiotik)"
                        :disabled="antibiotik.disabled"
                      />
                      <label class="form-check-label" :for="antibiotik._id">
                        <span
                          v-if="!antibiotik.chosen"
                          style="color: #e34a4a"
                          class="abc-label-text"
                          >{{ antibiotik.opis }}</span
                        >
                        <span
                          v-if="antibiotik.chosen"
                          style="color: #4ae387"
                          class="abc-label-text"
                          >{{ antibiotik.opis }}</span
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div
                      class="form-check abc-checkbox abc-checkbox-primary"
                      v-for="antibiotik in filteredAntibiotics(3, 3)"
                      :key="antibiotik._id"
                    >
                      <input
                        class="form-check-input"
                        :id="antibiotik._id"
                        type="checkbox"
                        v-model="antibiotik.chosen"
                        @click="AddAntibiotics(antibiotik)"
                        :disabled="antibiotik.disabled"
                      />
                      <label class="form-check-label" :for="antibiotik._id">
                        <span
                          v-if="!antibiotik.chosen"
                          style="color: #e34a4a"
                          class="abc-label-text"
                          >{{ antibiotik.opis }}</span
                        >
                        <span
                          v-if="antibiotik.chosen"
                          style="color: #4ae387"
                          class="abc-label-text"
                          >{{ antibiotik.opis }}</span
                        >
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-md-1"
              v-if="
                MicrobiologyScenario === 'MAIBPoR' &&
                !ShowAntibiotics &&
                !ShowBacteries
              "
            ></div>
            <div
              class="col-md-10"
              v-if="
                MicrobiologyScenario === 'MAIBPoR' &&
                !ShowAntibiotics &&
                !ShowBacteries
              "
            >
              <vuestic-tabs-bactery
                v-if="SelectedBacteries.length"
                :names="BacteryTabs"
                :tab="CurrentTab"
                :id="CurrentTab"
                :prikazi="
                  sample.status != 'VERIFICIRAN' && sample.status != 'ODOBREN'
                "
                ref="tabs"
              >
                <div
                  :slot="CurrentTab"
                  v-for="test in SelectedBacteries"
                  :key="test._id"
                >
                  <div class="row" v-show="test.opis === CurrentTab">
                    <!-- Antibiogram -->

                    <div class="table-responsive">
                      <table class="table table-striped first-td-padding">
                        <thead>
                          <tr align="left">
                            <td style="text-transform: none" width="30%">
                              {{ test.antibiogram.opis }}
                            </td>
                            <td width="10%">{{ "" }}</td>
                            <td width="20%">{{ "" }}</td>
                            <td width="20%">{{ "" }}</td>
                            <td width="20%">{{ "" }}</td>
                          </tr>
                        </thead>

                        <!-- Table Body -->

                        <tbody>
                          <tr
                            align="left"
                            v-for="abtk in test.antibiogram.antibiotici"
                            :key="abtk._id"
                            v-bind:class="{
                              'table-danger': false,
                              'table-success': false,
                              'table-warning': false,
                            }"
                          >
                            <!-- ANALIZA -->

                            <td :title="abtk.opis">{{ abtk.opis }}</td>
                            <td>
                              <bactery-radio-button
                                :disabled="
                                  sample.status === 'ODOBREN' ||
                                  sample.status === 'VERIFICIRAN'
                                "
                                :label="''"
                                :value="''"
                                :id="'' + test._id + abtk._id"
                                :name="test._id + abtk._id"
                                v-model="abtk.rezultat"
                              />
                            </td>
                            <td>
                              <postavke-radio-button
                                :disabled="
                                  sample.status === 'ODOBREN' ||
                                  sample.status === 'VERIFICIRAN'
                                "
                                :label="'Senzitivan'"
                                :value="'S'"
                                :id="'S' + test._id + abtk._id"
                                :name="test._id + abtk._id"
                                v-model="abtk.rezultat"
                              />
                            </td>
                            <td>
                              <postavke-radio-button
                                :disabled="
                                  sample.status === 'ODOBREN' ||
                                  sample.status === 'VERIFICIRAN'
                                "
                                :label="'Intermedijaran'"
                                :value="'I'"
                                :id="'I' + test._id + abtk._id"
                                :name="test._id + abtk._id"
                                v-model="abtk.rezultat"
                              />
                            </td>
                            <td>
                              <postavke-radio-button
                                :disabled="
                                  sample.status === 'ODOBREN' ||
                                  sample.status === 'VERIFICIRAN'
                                "
                                :label="'Rezistentan'"
                                :value="'R'"
                                :id="'R' + test._id + abtk._id"
                                :name="test._id + abtk._id"
                                v-model="abtk.rezultat"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <!-- END of Antibiogram -->
                  </div>
                </div>
              </vuestic-tabs-bactery>
            </div>

            <div
              class="col-md-12"
              v-if="
                MicrobiologyScenario === 'MANBNeR' ||
                MicrobiologyScenario === 'MANBPoR' ||
                MicrobiologyScenario === 'MAIBNeR'
              "
            >
              <div v-show="show_table" class="table-responsive">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr align="left">
                      <td>{{ "REZULTAT" }}</td>
                    </tr>
                  </thead>

                  <!-- Table Body -->

                  <tbody>
                    <tr
                      align="left"
                      v-for="(test, index) in rezultati"
                      v-show="index < 1"
                      :key="test.labassay_id"
                      v-bind:class="{
                        'table-danger':
                          test.rezultat_m.length &&
                          test.rezultat_m[0].pozitivan,
                        'table-success':
                          test.rezultat_m.length &&
                          test.rezultat_m[0].negativan,
                        'table-warning': false,
                      }"
                    >
                      <td
                        v-if="
                          sample.status != 'ODOBREN' &&
                          sample.status != 'VERIFICIRAN'
                        "
                      >
                        <div class="form-group">
                          <div class="input-group">
                            <textarea
                              type="text"
                              id="simple-textarea"
                              v-model="test.rezultat"
                              required
                            ></textarea>
                            <label
                              class="control-label"
                              for="simple-textarea"
                              >{{ "" }}</label
                            >
                            <i class="bar"></i>
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="
                          sample.status === 'ODOBREN' ||
                          sample.status === 'VERIFICIRAN'
                        "
                      >
                        <div class="form-group">
                          <div class="input-group">
                            <input
                              id="input-icon-left"
                              title=" "
                              name="input-icon-left"
                              disabled
                            />
                            <label
                              v-if="test.rezultat.length"
                              class="control-label"
                              for="input-icon-left"
                              >{{ test.rezultat }}</label
                            >
                            <label
                              v-if="!test.rezultat.length"
                              class="control-label"
                              for="input-icon-left"
                              >{{ "Nema podataka." }}</label
                            >
                            <i class="bar"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </vuestic-modal-micro-bactery>

      <vuestic-modal-micro-bactery
        :show.sync="show"
        :large="true"
        :sample="sample"
        ref="staticModalMicroBactery"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #acb5be">{{ "Rezultat analize: " }}</span>
          <span style="color: #e34a4a">{{ CurrentTest }}</span>
        </div>

        <div>
          <!--  -->

          <div class="row" v-if="show_table">
            <div class="col-md-12" v-if="true">
              <div v-show="show_table" class="table-responsive">
                <table class="table table-striped first-td-padding">
                  <thead>
                    <tr align="left">
                      <td>{{ "REZULTAT" }}</td>
                    </tr>
                  </thead>

                  <!-- Table Body -->

                  <tbody>
                    <tr
                      align="left"
                      v-for="(test, index) in rezultati"
                      v-show="index < 1"
                      :key="test.labassay_id"
                      v-bind:class="{
                        'table-danger':
                          test.rezultat_m.length &&
                          test.rezultat_m[0].pozitivan,
                        'table-success':
                          test.rezultat_m.length &&
                          test.rezultat_m[0].negativan,
                        'table-warning': false,
                      }"
                    >
                      <td
                        v-if="
                          sample.status != 'ODOBREN' &&
                          sample.status != 'VERIFICIRAN'
                        "
                      >
                        <div class="form-group">
                          <div class="input-group">
                            <textarea
                              type="text"
                              id="simple-textarea"
                              v-model="test.rezultat"
                              required
                            ></textarea>
                            <label
                              class="control-label"
                              for="simple-textarea"
                              >{{ "" }}</label
                            >
                            <i class="bar"></i>
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="
                          sample.status === 'ODOBREN' ||
                          sample.status === 'VERIFICIRAN'
                        "
                      >
                        <div class="form-group">
                          <div class="input-group">
                            <input
                              id="input-icon-left"
                              title=" "
                              name="input-icon-left"
                              disabled
                            />
                            <label
                              v-if="test.rezultat.length"
                              class="control-label"
                              for="input-icon-left"
                              >{{ test.rezultat }}</label
                            >
                            <label
                              v-if="!test.rezultat.length"
                              class="control-label"
                              for="input-icon-left"
                              >{{ "Nema podataka." }}</label
                            >
                            <i class="bar"></i>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </vuestic-modal-micro-bactery>

      <vuestic-modal-micro-result
        :show.sync="show"
        :sample="sample"
        :large="ShowAllBacteries"
        :neg="ModalNegative"
        :pos="ModalPositive"
        :selected="ModalPositiveCondition"
        ref="staticModalSelectResult"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #acb5be">{{ MicrobiologyModalHeader }} |</span>
          <span style="color: #e34a4a">{{ "Izbornik" }}</span>
        </div>

        <div class="row" v-if="!ModalNegative && !ModalPositive">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-6">
                <button
                  style="text-transform: none; border: 0px"
                  class="btn btn-secondary btn-sm wizard-back pull-left"
                  @click="
                    ModalNegative = true;
                    ModalPositive = false;
                  "
                >
                  {{ "Negativan" }}
                </button>
              </div>
              <div class="col-md-3"></div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-6">
                <button
                  style="text-transform: none; border: 0px"
                  class="btn btn-secondary-danger btn-sm wizard-next pull-right"
                  @click="
                    ModalPositive = true;
                    ModalNegative = false;
                  "
                >
                  {{ "Pozitivan" }}
                </button>
              </div>
              <div class="col-md-4"></div>
            </div>
          </div>
        </div>

        <div class="row" v-if="ModalNegative && !ModalPositive">
          <div class="col-md-1"></div>
          <div class="col-md-11">
            <vuestic-radio-button
              v-for="(desc, index) in MicrobiologyResult.NegativeDescriptions"
              :key="index"
              :label="MicrobiologyResult.NegativeDescriptions[index]"
              :id="MicrobiologyResult.NegativeDescriptions[index]"
              :value="MicrobiologyResult.NegativeDescriptions[index]"
              :name="MicrobiologyResult.NegativeDescriptions[index]"
              :disabled="false"
              v-model="NegativeResultSelection"
            />
          </div>
        </div>

        <div
          class="row"
          v-if="
            !ModalNegative &&
            ModalPositive &&
            !MicrobiologyResult.DefaultBacteries.length
          "
        >
          <div class="col-md-1"></div>
          <div class="col-md-11">
            <vuestic-radio-button
              v-for="(desc, index) in MicrobiologyResult.PositiveDescriptions"
              :key="index"
              :label="MicrobiologyResult.PositiveDescriptions[index]"
              :id="MicrobiologyResult.PositiveDescriptions[index]"
              :value="MicrobiologyResult.PositiveDescriptions[index]"
              :name="MicrobiologyResult.PositiveDescriptions[index]"
              :disabled="false"
              v-model="PositiveResultSelection"
            />
          </div>
        </div>

        <div
          class="row"
          v-if="
            !ModalNegative &&
            ModalPositive &&
            MicrobiologyResult.DefaultBacteries.length
          "
        >
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-2"></div>
              <div class="col-md-10">
                <div
                  class="form-check abc-checkbox abc-checkbox-primary"
                  v-for="(bakt, index) in MicrobiologyResult.DefaultBacteries"
                  :key="index"
                >
                  <input
                    class="form-check-input"
                    :id="bakt._id"
                    type="checkbox"
                    v-model="bakt.chosen"
                    @click="SelectBactery(bakt, index)"
                  />
                  <label class="form-check-label" :for="bakt._id">
                    <span style="color: #e34a4a" class="abc-label-text">
                      {{ bakt.opis }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-6">
            <div class="row">
              <div class="col-md-1"></div>
              <div class="col-md-6">
                <a
                  v-if="!ShowAllBacteries"
                  href="#"
                  @click.prevent="ShowAllBacteries = true"
                  style="font-size: 16px; color: #4ae387"
                  >Prikaži više</a
                >
              </div>
              <div class="col-md-5"></div>
            </div>

            <div class="row" v-if="ShowAllBacteries">
              <div class="col-md-1"></div>
              <div class="col-md-10">
                <div
                  class="form-check abc-checkbox abc-checkbox-primary"
                  v-for="(bakt, index) in MicrobiologyResult.RemainingBacteries"
                  :key="index"
                >
                  <input
                    class="form-check-input"
                    :id="bakt._id"
                    type="checkbox"
                    v-model="bakt.chosen"
                    @click="SelectBactery(bakt, index)"
                  />
                  <label class="form-check-label" :for="bakt._id">
                    <span style="color: #e34a4a" class="abc-label-text">
                      {{ bakt.opis }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vuestic-modal-micro-result>


       <vuestic-modal-delete
        :show.sync="show"
        ref="staticModalBiljeska"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #acb5be">{{ "Pacijent: " }}</span>
          <span style="color: #e34a4a">{{ ime + " " + prezime }}</span>
        </div>
        <div class="form-group">
                  <div class="col-md-12 info-widget-inner">
                    <div class="col-md-12">
                      <div class="col-md-12">
                        <div class="input-group">
                          <textarea type="text" v-model="note"></textarea>
                          <label class="control-label">{{'Bilješka o pacijentu'}}</label>
                          <i class="bar"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
      </vuestic-modal-delete>


      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!-- 





End of Microbiology Modal |





      -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->
      <!--  -->

      <!-- Bilješka o pacijentu -->

      <vuestic-modal-delete
        :show.sync="show"
        ref="staticModalDeleteSample"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a">{{ "478: Attention Required" }}</span>
        </div>
        <div>
          <strong>{{ "Jeste li sigurni da želite obrisati uzorak?" }}</strong>
        </div>
      </vuestic-modal-delete>

      <!-- Unos komentara -->

      <vuestic-modal-comment
        :show.sync="show"
        :comment="uzorci"
        ref="staticModalComment"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span>{{ "Izbor komentara za uzorak: " }}</span>
          <span style="color: #e34a4a">{{ sid }}</span>
        </div>

        <div>
          <h5></h5>
        </div>
      </vuestic-modal-comment>

      <!-- Uređivanje uzorka -->

      <vuestic-modal-edit
        :show.sync="show"
        :sample="sid"
        action="Edit"
        ref="staticModalEditSample"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">{{ "Uređivanje uzorka: " + sid }}</div>
        <div>
          <h5></h5>
        </div>
      </vuestic-modal-edit>

      <!-- Email Send -->

      <vuestic-modal-mail
        :show.sync="show"
        ref="staticModalSendMail"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span>{{ "Slanje nalaza na e-mail adresu" }}</span>
        </div>
        <div>
          <strong>{{ email }}</strong>
        </div>
      </vuestic-modal-mail>

      <!--  -->

      <vuestic-modal-all-results
        :show.sync="show"
        ref="staticModalAllResults"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "Izbor rezultata: " }}
          <span style="color: #e34a4a">{{ labassay }}</span>
        </div>
        <div>
          <div class="table-responsive">
            <table class="table table-striped first-td-padding">
              <thead>
                <tr>
                  <!-- <td width="20%"></td> -->

                  <td>analizator</td>
                  <td>vrijeme</td>
                  <td>rezultat</td>
                  <td>jedinica</td>
                  <td>reference</td>
                  <td
                    v-if="
                      sample_status != 'ODOBREN' &&
                      sample_status != 'VERIFICIRAN'
                    "
                  >
                    izbor
                  </td>
                  <td align="middle"></td>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="test in vise.rezultat"
                  v-show="test.rezultat_f != ''"
                  :key="test._id"
                  v-bind:class="{
                    'table-danger':
                      Interpretacija(
                        vise.labassay.analit,
                        test.rezultat_f,
                        test.jedinice_f,
                        vise.refd,
                        vise.refg,
                        $store.state.site,
                        vise.interp,
                        vise.extend,
                        spec
                      )[5] === 'Red' && !test.multidata,
                    'table-success':
                      Interpretacija(
                        vise.labassay.analit,
                        test.rezultat_f,
                        test.jedinice_f,
                        vise.refd,
                        vise.refg,
                        $store.state.site,
                        vise.interp,
                        vise.extend,
                        spec
                      )[5] === 'Green' && !test.multidata,
                    'table-warning':
                      Interpretacija(
                        vise.labassay.analit,
                        test.rezultat_f,
                        test.jedinice_f,
                        vise.refd,
                        vise.refg,
                        $store.state.site,
                        vise.interp,
                        vise.extend,
                        spec
                      )[5] === 'Yellow' && !test.multidata,
                  }"
                >
                  <td>{{ test.anaassay.aparat.ime }}</td>

                  <td>
                    {{
                      JSON.stringify(test.updated_at).slice(9, 11) +
                      "." +
                      JSON.stringify(test.updated_at).slice(6, 8) +
                      "." +
                      JSON.stringify(test.updated_at).slice(1, 5) +
                      " | "
                    }}
                    <sub>{{
                      JSON.stringify(test.updated_at).slice(12, 20)
                    }}</sub>
                  </td>
                  <td>{{ test.rezultat_f }}</td>
                  <td>{{ test.jedinice_f }}</td>
                  <td>
                    {{
                      Interpretacija(
                        vise.labassay.analit,
                        test.rezultat_f,
                        test.jedinice_f,
                        vise.refd,
                        vise.refg,
                        $store.state.site,
                        vise.interp,
                        vise.extend,
                        spec
                      )[4]
                    }}
                  </td>
                  <td
                    v-if="
                      sample_status != 'ODOBREN' &&
                      sample_status != 'VERIFICIRAN'
                    "
                  >
                    <i
                      v-if="!test.izabran"
                      @click.prevent="IzborTesta(vise, test)"
                      style="font-size: 18px; color: #e34a4a"
                      class="glyphicon glyphicon-unchecked"
                    ></i>

                    <i
                      v-if="test.izabran"
                      style="font-size: 18px; color: #4ae387"
                      class="glyphicon glyphicon-check"
                    ></i>
                  </td>
                  <td>
                    <i
                      v-bind:class="{
                        'fa fa-exclamation-triangle icon-right input-icon error-icon':
                          Interpretacija(
                            vise.labassay.analit,
                            test.rezultat_f,
                            test.jedinice_f,
                            vise.refd,
                            vise.refg,
                            $store.state.site,
                            vise.interp,
                            vise.extend,
                            spec
                          )[5] === 'Red',
                      }"
                    ></i>
                    <i
                      v-bind:class="{
                        'fa fa-check success-icon icon-right input-icon':
                          Interpretacija(
                            vise.labassay.analit,
                            test.rezultat_f,
                            test.jedinice_f,
                            vise.refd,
                            vise.refg,
                            $store.state.site,
                            vise.interp,
                            vise.extend,
                            spec
                          )[5] === 'Green',
                      }"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- END OF DRUGA TABELA -->
          </div>
        </div>
      </vuestic-modal-all-results>

      <vuestic-modal-error
        :show.sync="show"
        ref="staticModalError"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a">{{ "404: Not Found" }}</span>
        </div>
        <div>
          <strong>{{ "Greška prilikom čitanja nalaza." }}</strong>
        </div>
      </vuestic-modal-error>

       <vuestic-modal-handshake
        :show.sync="show"
        ref="staticModalHandshake"
        cancelText="ZATVORI"
        okText="POTVRDI"
        :okDisabled="okDisabled || posiljaoc == posiljaocInit"
        :cancelDisabled="cancelDisabled"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a">{{ "Izmjena pošiljaoca pacijenta" }}</span>
        </div>
        <div>
         
           <vuestic-simple-select
                v-show="[posiljaoc].length"
                v-model="posiljaoc"
                name="posiljaoc"
                required
                title=" "
                ref="posiljaocSelect"
                v-bind:options="lokacije"
                label=""
              ></vuestic-simple-select>

        </div>
      </vuestic-modal-handshake>

      <vuestic-modal-error
        :show.sync="show"
        ref="staticModalVerifyPrivilege"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a">{{ "401: Not Authorized" }}</span>
        </div>
        <div>
          <strong>{{ "Nemate odgovarajuće privilegije." }}</strong>
        </div>
      </vuestic-modal-error>

      <vuestic-modal-error
        :show.sync="show"
        ref="staticModalVerifyResult"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a">{{ "400: Bad Request" }}</span>
        </div>
        <div>
          <strong>{{ "Rezultat nije validan." }}</strong>
        </div>
      </vuestic-modal-error>

      <vuestic-modal-exclamation
        :show.sync="show"
        ref="staticModalExclamation"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a">{{ warning.analiza }}</span>
        </div>
        <div>
          <h5>{{ warning.control }}</h5>
          <p>{{ warning.text }}</p>
        </div>

        <!-- <div v-if="warning.napomena !=''">
          <h5>{{"Napomena"}}</h5>
          <p>{{warning.napomena}}</p>
        </div>-->
      </vuestic-modal-exclamation>

      <vuestic-modal-reference
        :show.sync="show"
        ref="staticModalReference"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "Referentne vrijednosti: " }}
          <span style="color: #e34a4a"
            >{{ reference.naziv }} ({{ reference.opis }})</span
          >
        </div>
        <div>
          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-2">
              <div class="form-group">
                <div class="input-group">
                  <input
                    style="color: #e34a4a"
                    id="input-icon-left"
                    title=" "
                    v-model="reference.dref"
                    name="input-icon-left"
                    required
                  />

                  <!-- <i class="glyphicon glyphicon-pencil icon-left input-icon"></i> -->

                  <label class="control-label" for="input-icon-left">
                    {{ "Donja" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-2">
              <div class="form-group">
                <div class="input-group">
                  <input
                    style="color: #e34a4a"
                    id="input-icon-left"
                    title=" "
                    v-model="reference.gref"
                    name="input-icon-left"
                    required
                  />

                  <!-- <i class="glyphicon glyphicon-pencil icon-left input-icon"></i> -->

                  <label class="control-label" for="input-icon-left">
                    {{ "Gornja" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-4">
              <vuestic-simple-select
                v-if="$store.state.access.level < 1"
                style="font-size: 14px"
                label="Interpretacija"
                v-model="reference.interp"
                title=" "
                v-bind:options="interpretacije"
              ></vuestic-simple-select>

              <div v-if="$store.state.access.level > 0" class="form-group">
                <div class="input-group">
                  <input
                    id="input-icon-left"
                    title=" "
                    v-model="reference.interp"
                    name="input-icon-left"
                    required
                    :disabled="true"
                  />

                  <!-- <i class="glyphicon glyphicon-pencil icon-left input-icon"></i> -->

                  <label class="control-label" for="input-icon-left">
                    {{ reference.interp }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="col-md-1"></div>
          </div>

          <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-2">
              <vuestic-simple-select
                style="font-size: 14px"
                label="Jedinica"
                v-model="reference.jedinica"
                title=" "
                v-bind:options="jedinice"
              ></vuestic-simple-select>
            </div>
            <div class="col-md-1"></div>

            <div class="col-md-7">
              <div class="form-group" v-show="reference.interp != 'spec'">
                <div class="input-group">
                  <input
                    style="color: #e34a4a"
                    id="input-icon-left"
                    title=" "
                    v-model="reference.extend"
                    name="input-icon-left"
                    required
                  />

                  <label class="control-label" for="input-icon-left">
                    {{ "Proširena referentna vrijednost" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>

              <div class="form-group" v-show="reference.interp === 'spec'">
                <div class="input-group">
                  <textarea
                    v-model="reference.extend"
                    type="text"
                    style="color: #e34a4a"
                    id="simple-textarea"
                    required
                  ></textarea>

                  <label class="control-label" for="simple-textarea">
                    {{ "Specifična interpretacija rezultata" }}
                  </label>
                  <i class="bar"></i>
                </div>
              </div>
            </div>
            <div class="col-md-1"></div>
          </div>
        </div>
      </vuestic-modal-reference>

      <vuestic-modal-find
        :show.sync="show"
        :data_pid="Number(data_pid)"
        :data_length="Number(data_length)"
        ref="staticModalFind"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "" }}
          <span style="color: #e34a4a">{{ "Redni broj pacijenta" }}</span>
        </div>
        <div>
          <h5></h5>
        </div>
      </vuestic-modal-find>

      <vuestic-modal-aparati
        :show.sync="show"
        ref="staticModalAparati"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "Izbor analizatora: " }}
          <span style="color: #e34a4a">
            {{ this.analiza.ime + " (" + this.analiza.analit + ")" }}
          </span>
        </div>
        <div>
          <vuestic-accordion-obrada>
            <vuestic-collapse-aparati
              v-for="element in analysers"
              :key="element._id"
              :analyser="element"
            >
              <span slot="header">
                {{ element.ime + ", " + element.site.naziv }}
              </span>
              <div slot="body">
                <div class="va-row"></div>
              </div>
            </vuestic-collapse-aparati>
          </vuestic-accordion-obrada>
        </div>
      </vuestic-modal-aparati>

      <!--  -->

      <vuestic-modal-results-multi
        :show.sync="show"
        ref="staticModalResultsMulti"
        cancelText="ODUSTANI"
        okText="POTVRDI"
      >
        <div slot="title">
          {{ "Izbor rezultata: " }}
          <span style="color: #e34a4a">{{ multi_test }}</span>
        </div>
        <div></div>
      </vuestic-modal-results-multi>

      <!-- Patient evaluation, Single -->

      <patient-evaluation-single
        :show.sync="show"
        ref="staticModalEvaluationSingle"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span>{{ ime + " " + prezime }}</span>
        </div>

        <div class="row" v-if="Procjena.length && !graph">
          <div class="col-md-12">
            <div class="table-responsive">
              <table
                class="table table-striped table-sm color-icon-label-table"
              >
                <thead>
                  <tr align="middle">
                    <td width="20%">{{ "REZULTAT" }}</td>
                    <td width="20%">{{ "JEDINICA" }}</td>
                    <td width="20%">{{ "REFERENCE" }}</td>
                    <td width="20%">{{ "DATUM" }}</td>
                    <td width="15%">{{ "VRIJEME" }}</td>
                    <td width="5%" align="middle"></td>
                  </tr>
                </thead>
                <tbody>
                  <!--  -->

                  <tr
                    align="middle"
                    v-for="(element, index) in Procjena"
                    :key="index"
                    v-bind:class="{
                      'table-danger':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Red',
                      'table-success':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Green',
                      'table-warning':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Yellow',
                    }"
                  >
                    <td width="19%">{{ element.rezultat }}</td>
                    <td width="19%">{{ element.jedinica }}</td>
                    <td width="19%">
                      {{
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[4]
                      }}
                    </td>
                    <td width="19%">{{ element.datum }}</td>
                    <td width="15%">{{ element.vrijeme }}</td>
                    <td width="9%" align="middle">
                      <i
                        v-bind:class="{
                          'fa fa-exclamation-triangle icon-right input-icon error-icon':
                            Interpretacija(
                              element.analit,
                              element.rezultat,
                              element.jedinica,
                              element.refd,
                              element.refg,
                              $store.state.site,
                              element.interp,
                              element.extend,
                              spec
                            )[5] === 'Red',
                        }"
                      ></i>
                      <i
                        v-bind:class="{
                          'fa fa-check success-icon icon-right input-icon':
                            Interpretacija(
                              element.analit,
                              element.rezultat,
                              element.jedinica,
                              element.refd,
                              element.refg,
                              $store.state.site,
                              element.interp,
                              element.extend,
                              spec
                            )[5] === 'Green',
                        }"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style="text-align: center">
                <span class="circle badge-info"></span>
                {{ table_header }}
              </div>
            </div>
          </div>
        </div>

        <!--  <div class="row" v-if="showLineChart">
          <div class="col-md-12">
            <hr>
          </div>
        </div>-->

        <div class="row" v-if="showLineChart && graph">
          <div class="col-md-12">
            <line-chart
              :options="optionsLineChart"
              :data="dataLineChart"
              type="line"
            ></line-chart>
          </div>
        </div>
        <div class="row" v-if="!showLineChart && graph">
          <div class="col-md-12">
            <!-- <div style="text-align:center;"> -->

            <div>
              <span style="color: #e34a4a">{{ "Nema podataka." }}</span>
            </div>
          </div>
        </div>
      </patient-evaluation-single>

      <!-- LabAssay evaluation, Single -->

      <patient-evaluation-single
        :show.sync="show"
        ref="staticModalLabAssayEvalSingle"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #4ae387">
            {{ analiza_eval.ime + " (" + analiza_eval.analit + ")" }}
          </span>
          <span>{{ " - Rezultati analize u zadnjih 14 dana" }}</span>
        </div>

        <div class="row" v-if="Procjena.length && !graph">
          <div class="col-md-12">
            <div class="table-responsive">
              <table
                class="table table-striped table-sm color-icon-label-table"
              >
                <thead>
                  <tr align="middle">
                    <td width="20%">{{ "REZULTAT" }}</td>
                    <td width="20%">{{ "JEDINICA" }}</td>
                    <td width="20%">{{ "REFERENCE" }}</td>
                    <td width="20%">{{ "DATUM" }}</td>
                    <td width="15%">{{ "VRIJEME" }}</td>
                    <td width="5%" align="middle"></td>
                  </tr>
                </thead>
                <tbody>
                  <!--  -->

                  <tr
                    align="middle"
                    v-for="(element, index) in Procjena"
                    :key="index"
                    v-bind:class="{
                      'table-danger':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Red',
                      'table-success':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Green',
                      'table-warning':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Yellow',
                    }"
                  >
                    <td width="19%">{{ element.rezultat }}</td>
                    <td width="19%">{{ element.jedinica }}</td>
                    <td width="19%">
                      {{
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[4]
                      }}
                    </td>
                    <td width="19%">{{ element.datum }}</td>
                    <td width="15%">{{ element.vrijeme }}</td>
                    <td width="9%" align="middle">
                      <i
                        v-bind:class="{
                          'fa fa-exclamation-triangle icon-right input-icon error-icon':
                            Interpretacija(
                              element.analit,
                              element.rezultat,
                              element.jedinica,
                              element.refd,
                              element.refg,
                              $store.state.site,
                              element.interp,
                              element.extend,
                              spec
                            )[5] === 'Red',
                        }"
                      ></i>
                      <i
                        v-bind:class="{
                          'fa fa-check success-icon icon-right input-icon':
                            Interpretacija(
                              element.analit,
                              element.rezultat,
                              element.jedinica,
                              element.refd,
                              element.refg,
                              $store.state.site,
                              element.interp,
                              element.extend,
                              spec
                            )[5] === 'Green',
                        }"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style="text-align: center">
                <span class="circle badge-info"></span>
                {{ table_header }}
              </div>
            </div>
          </div>
        </div>

        <!--  <div class="row" v-if="showLineChart">
          <div class="col-md-12">
            <hr>
          </div>
        </div>-->

        <div class="row" v-if="showLineChart && graph">
          <div class="col-md-12">
            <line-chart
              :options="optionsLineChart"
              :data="dataLineChart"
              type="line"
            ></line-chart>
          </div>
        </div>
        <div class="row" v-if="!showLineChart && graph">
          <div class="col-md-12">
            <!-- <div style="text-align:center;"> -->
            <div>
              <span style="color: #e34a4a">{{ "Nema podataka." }}</span>
            </div>
          </div>
        </div>
      </patient-evaluation-single>

      <!-- Patient evaluation, Multi -->

      <patient-evaluation-multi
        :show.sync="show"
        :multiparam_izbor="multiparam_izbor"
        :multiparam_izbornik="multiparam_izbornik"
        ref="staticModalEvaluationMulti"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span>{{ ime + " " + prezime }}</span>
        </div>

        <!--  -->

        <div class="row" v-if="Procjena.length && !graph">
          <div class="col-md-12">
            <div class="table-responsive">
              <table
                class="table table-striped table-sm color-icon-label-table"
              >
                <thead>
                  <tr align="middle">
                    <td width="20%">{{ "REZULTAT" }}</td>
                    <td width="20%">{{ "JEDINICA" }}</td>
                    <td width="20%">{{ "REFERENCE" }}</td>
                    <td width="20%">{{ "DATUM" }}</td>
                    <td width="15%">{{ "VRIJEME" }}</td>
                    <td width="5%" align="middle"></td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    align="middle"
                    v-for="(element, index) in Procjena"
                    :key="index"
                    v-bind:class="{
                      'table-danger':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Red',
                      'table-success':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Green',
                      'table-warning':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Yellow',
                    }"
                  >
                    <td width="19%">{{ element.rezultat }}</td>
                    <td width="19%">{{ element.jedinica }}</td>
                    <td width="19%">
                      {{
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[4]
                      }}
                    </td>
                    <td width="19%">{{ element.datum }}</td>
                    <td width="15%">{{ element.vrijeme }}</td>
                    <td width="9%" align="middle">
                      <i
                        v-bind:class="{
                          'fa fa-exclamation-triangle icon-right input-icon error-icon':
                            Interpretacija(
                              element.analit,
                              element.rezultat,
                              element.jedinica,
                              element.refd,
                              element.refg,
                              $store.state.site,
                              element.interp,
                              element.extend,
                              spec
                            )[5] === 'Red',
                        }"
                      ></i>
                      <i
                        v-bind:class="{
                          'fa fa-check success-icon icon-right input-icon':
                            Interpretacija(
                              element.analit,
                              element.rezultat,
                              element.jedinica,
                              element.refd,
                              element.refg,
                              $store.state.site,
                              element.interp,
                              element.extend,
                              spec
                            )[5] === 'Green',
                        }"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style="text-align: center">
                <span class="circle badge-info"></span>
                {{ table_header }}
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="!Procjena.length && !graph">
          <div class="col-md-12">
            <div>
              <span style="color: #e34a4a">{{ "Nema podataka." }}</span>
            </div>
          </div>
        </div>

        <div class="row" v-if="showLineChart && graph">
          <div class="col-md-12">
            <line-chart
              :options="optionsLineChart"
              :data="dataLineChart"
              type="line"
            ></line-chart>
          </div>
        </div>
        <div class="row" v-if="!showLineChart && graph">
          <div v-if="!showLineChart && !spinner" class="col-md-12">
            <div>
              <span style="color: #e34a4a">{{ "Nema podataka." }}</span>
            </div>
          </div>
          <div
            style="min-height: 400px"
            v-if="!showLineChart && spinner"
            class="col-md-12"
          >
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              "
            >
              <div style="float: left"></div>
              <span style="vertical-align: middle">
                <atom-spinner
                  style="opacity: 0.25"
                  :animation-duration="1000"
                  :size="300"
                  :color="'#4ae387'"
                />
              </span>
            </div>
          </div>
        </div>
      </patient-evaluation-multi>

      <!-- LabAssay evaluation, Multi -->

      <patient-evaluation-multi
        :show.sync="show"
        :multiparam_izbor="multiparam_izbor"
        :multiparam_izbornik="multiparam_izbornik"
        ref="staticModalLabAssayEvalMulti"
        cancelText="ZATVORI"
        okText="POTVRDI"
      >
        <div slot="title">
          <span style="color: #4ae387">
            {{ analiza_eval.ime + " (" + analiza_eval.analit + ")" }}
          </span>
          <span>{{ " - Rezultati analize u zadnjih 14 dana" }}</span>
        </div>

        <!--  -->

        <div class="row" v-if="Procjena.length && !graph">
          <div class="col-md-12">
            <div class="table-responsive">
              <table
                class="table table-striped table-sm color-icon-label-table"
              >
                <thead>
                  <tr align="middle">
                    <td width="20%">{{ "REZULTAT" }}</td>
                    <td width="20%">{{ "JEDINICA" }}</td>
                    <td width="20%">{{ "REFERENCE" }}</td>
                    <td width="20%">{{ "DATUM" }}</td>
                    <td width="15%">{{ "VRIJEME" }}</td>
                    <td width="5%" align="middle"></td>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    align="middle"
                    v-for="(element, index) in Procjena"
                    :key="index"
                    v-bind:class="{
                      'table-danger':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Red',
                      'table-success':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Green',
                      'table-warning':
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[5] === 'Yellow',
                    }"
                  >
                    <td width="19%">{{ element.rezultat }}</td>
                    <td width="19%">{{ element.jedinica }}</td>
                    <td width="19%">
                      {{
                        Interpretacija(
                          element.analit,
                          element.rezultat,
                          element.jedinica,
                          element.refd,
                          element.refg,
                          $store.state.site,
                          element.interp,
                          element.extend,
                          spec
                        )[4]
                      }}
                    </td>
                    <td width="19%">{{ element.datum }}</td>
                    <td width="15%">{{ element.vrijeme }}</td>
                    <td width="9%" align="middle">
                      <i
                        v-bind:class="{
                          'fa fa-exclamation-triangle icon-right input-icon error-icon':
                            Interpretacija(
                              element.analit,
                              element.rezultat,
                              element.jedinica,
                              element.refd,
                              element.refg,
                              $store.state.site,
                              element.interp,
                              element.extend,
                              spec
                            )[5] === 'Red',
                        }"
                      ></i>
                      <i
                        v-bind:class="{
                          'fa fa-check success-icon icon-right input-icon':
                            Interpretacija(
                              element.analit,
                              element.rezultat,
                              element.jedinica,
                              element.refd,
                              element.refg,
                              $store.state.site,
                              element.interp,
                              element.extend,
                              spec
                            )[5] === 'Green',
                        }"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style="text-align: center">
                <span class="circle badge-info"></span>
                {{ table_header }}
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="!Procjena.length && !graph">
          <div class="col-md-12">
            <div>
              <span style="color: #e34a4a">{{ "Nema podataka." }}</span>
            </div>
          </div>
        </div>

        <div class="row" v-if="showLineChart && graph">
          <div class="col-md-12">
            <line-chart
              :options="optionsLineChart"
              :data="dataLineChart"
              type="line"
            ></line-chart>
          </div>
        </div>
        <div class="row" v-if="!showLineChart && graph">
          <div v-if="!showLineChart && !spinner" class="col-md-12">
            <div>
              <span style="color: #e34a4a">{{ "Nema podataka." }}</span>
            </div>
          </div>
          <div
            style="min-height: 400px"
            v-if="!showLineChart && spinner"
            class="col-md-12"
          >
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              "
            >
              <div style="float: left"></div>
              <span style="vertical-align: middle">
                <atom-spinner
                  style="opacity: 0.25"
                  :animation-duration="1000"
                  :size="300"
                  :color="'#4ae387'"
                />
              </span>
            </div>
          </div>
        </div>
      </patient-evaluation-multi>


































      <eurofarm-modal-calendar
        :show.sync="showCalendar"
        :sample="$store.state.sid"
        :vrijeme="calendar"
        ref="staticModalSamplesEntryCalendarObrada"
      >
        <div slot="title">{{ "Vrijeme uzorkovanja" }}</div>
      </eurofarm-modal-calendar>





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
import router from "../../router";
import store from "vuex-store";
import utils from "services/utils";
import { http } from "../../../config/config.js";
import { barcode } from "../../../config/config.js";
import BadgeColumn from "./BadgeColumn.vue";
import { bus } from "../../main";
import { server } from "../../../config/config.js";
import { Interpretation } from "./functions/reference.js";
import izbornik from "./data-izbornik/izbornik";

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

import LineChart from "../vuestic-components/vuestic-chart/chart-types/LineChart";
import { AtomSpinner } from "epic-spinners";
import PDFObject from "pdfobject";

Vue.component("line-chart", LineChart);
Vue.component("badge-column", BadgeColumn);

export default {
  name: "collapse-obrada-rt",

  data() {
    return {
      okDisabled: false,
      cancelDisabled: false,
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* 





| Microbiology Data





*/
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */

      AllowGetSample: true,
      MicrobiologyOrder: false,
      MicrobiologySample: false,
      ModalNegative: false,
      ModalPositive: false,
      ModalPositiveCondition: false,
      ShowAllBacteries: false,
      ShowAntibiotics: false,
      ShowBacteries: false,
      BacteryTabs: [""],
      CurrentTab: "",
      CurrentTest: "",
      MicrobiologyModalHeader: "Predefinisani rezultati",
      SelectedBacteries: [],
      NegativeResultSelection: "",
      PositiveResultSelection: "",
      MicrobiologyScenario: "Unknown",
      Antibiotics: [],
      TemporaryAntibiotics: [],
      TemporaryBacteries: [],
      TemporaryBacteriesAdd: [],
      Antibiograms: [],
      Bacteries: [],

      MicrobiologyResult: {
        negative: null,
        positive: null,
        BUG: null,
        F_RESULT: "",
        M_RESULT: [],
        DefaultBacteries: [],
        RemainingBacteries: [],
        NegativeDescriptions: [],
        PositiveDescriptions: [],
      },

      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* 





End of Microbiology Data |





*/
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */

      // Patient evaluation, Multi

      save_retest: false,
      multiparam_izbor: "",
      klijent: null,
      multiparam_id: "",
      analit: {},
      multiparams: [],
      Response: {},
      spinner: false,
      multiparam_izbornik: [],
      warning: { analiza: "", text: "", control: "" },
      main: false,
      show: true,
      pdf: false,
      header: "",
      lokacija: {},
      samplesid: "",
      timestamp: "",
      pacijent: "",
      ime: "",
      prezime: "",
      note: "",
      noteInit: "",
      jmbg: "",
      pid: "",
      sid: "",
      email: "",
      email_tmp: "",
      verificiran: false,
      email_button: false,
      final_pdf: false,
      odobren: false,
      approved: 0,
      verified: 0,
      partials: [],
      partials_condition: false,
      count: 0,
      nalaz: {},
      report: {},
      path: "",
      url: "",
      uzorci: [],
      vise: [],
      samples: [],
      sample_status: "",
      labassay: "",
      multi_test: "",
      multi_rezultati: [],
      check: "",
      link: "",
      spec: "*",
      testovi: [],
      rezultati: [],
      analysers: [],
      analyser: {},
      analiza: {},
      analyser_selected: {},
      analyser_patient: {},
      analitiprikaz: [],
      analiti: [],
      naslov: "",
      calculated: false,
      show_table: false,
      sample: {},
      resdata: {},
      email_changed: false,
      Previous: { pid: null },
      Next: { pid: null },
      Results: [],
      Datum: { today: null, query: null, next: null, previous: null },
      pagination: false,
      forward_disabled: false,
      backward_disabled: false,
      data_length: 0,
      data_min: 1,
      data_pid: 0,
      data_spol: "",
      query_date: "",
      today_date: "",
      starost: "",
      reference: {},
      interpretacije: [
        "none",
        "A",
        "ogtt",
        "insul",
        "less",
        "lesseq",
        "lesspl",
        "infekc",
        "grt",
        "grtpl",
        "grtepl",
        "grtno",
        "grte",
        "neg",
        "nema",
        "urbl",
        "reakt",
        "e0x",
        "e02",
        "e04",
        "e05",
        "e07",
        "e08",
        "norm",
        "norma",
        "ured",
        "plus",
        "prisutno",
        "gljivice",
        "leuer",
        "morf",
        "titar",
        "tsh",
        "trag",
        "trg",
        "hol",
        "hdl",
        "ldl",
        "fpsa",
        "sediment",
        "bistar",
        "boja",
        "bojasp",
        "nesto",
        "exists",
        "blst",
        "leu",
        "spec",
      ],
      lokacijaNalaza: "",

      // Toasts

      toastText: "",
      toastIcon: "",
      toastPosition: "",
      toastDuration: 2500,
      isToastFullWidth: false,
      className: "",

      isLoading: false,
      fullPage: true,

      // Evaluation

      analiza_eval: {},
      showLineChart: false,
      optionsLineChart: {},
      dataLineChart: {},
      Procjena: [],

      // Settings

      jedinica: "",
      jedinice: [],
      graph: false,
      table_header: "",

      // Pošiljaoc pacijenta

      posiljaoc: "",
      posiljaocInit: "",
      lokacije: [],
      lokacijeObj: [],
      posiljaocObj: {},
      pacijentObj: {},
      handshake: true,
      showCalendar: true,
      calendar: ""
    };
  },
  components: {
    Loading,
    AtomSpinner,
  },

  watch: {
    email: function () {
      if (this.email.trim() != this.email_tmp.trim()) {
        this.email_changed = true;
      }
    },

    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* 





| Microbiology Watch





*/
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */

    ModalNegative: function () {
      if (this.ModalNegative) {
        // console.log("Izbor: negativan");

        this.MicrobiologyModalHeader = "Predefinisani rezultati";
        if (this.MicrobiologyScenario.includes("MANB")) {
          this.ModalPositiveCondition = true;
        } else {
          this.ModalPositiveCondition = false;
        }
      }
    },

    ModalPositive: function () {
      if (this.ModalPositive) {
        // console.log("Izbor: pozitivan");

        if (this.MicrobiologyScenario === "MAIBNoR") {
          this.MicrobiologyModalHeader = "Bakterije";
        } else {
          this.MicrobiologyModalHeader = "Predefinisani rezultati";
        }

        if (this.MicrobiologyScenario.includes("MANB")) {
          this.ModalPositiveCondition = true;
        } else {
          this.ModalPositiveCondition = false;
        }
      }
    },

    MicrobiologyScenario: function () {
      switch (this.MicrobiologyScenario) {
        case "MAIBNoR":
          // Ima definisan skup bakterija - Nema Rezultat
          this.ModalNegative = false;
          this.ModalPositive = false;
          this.ModalPositiveCondition = false;
          this.MicrobiologyModalHeader = "Predefinisani rezultati";
          this.NegativeResultSelection = "";
          this.PositiveResultSelection = "";
          this.SelectedBacteries = [];
          this.ShowAllBacteries = false;

          break;

        case "MAIBNeR":
          // Ima definisan skup bakterija - Negativan Rezultat
          this.SelectedBacteries = [];

          break;

        case "MAIBPoR":
          // Ima definisan skup bakterija - Pozitivan Rezultat
          break;

        case "MANBNoR":
          // Nema definisan skup bakterija - Nema Rezultat
          this.ModalNegative = false;
          this.ModalPositive = false;
          this.ModalPositiveCondition = false;
          this.MicrobiologyModalHeader = "Predefinisani rezultati";
          this.NegativeResultSelection = "";
          this.PositiveResultSelection = "";
          this.SelectedBacteries = [];
          this.ShowAllBacteries = false;

          break;

        case "MANBNeR":
          // Nema definisan skup bakterija - Negativan Rezultat
          this.SelectedBacteries = [];

          break;

        case "MANBPoR":
          // Nema definisan skup bakterija - Pozitivan Rezultat
          this.SelectedBacteries = [];

          break;

        default:
          // console.warn("Nije Mikrobiološka analiza.");
          break;
      }
    },

    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* 





End of Microbiology Watch |





*/
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
  },
  beforeCreate() {
    http
      .get(
        "postavke/jedinice/mount/list?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site,
        {}
      )
      .then((res) => {
        this.jedinice = res.data.jedinica;
      });
  },
  mounted() {
    bus.$on("Parametar", (data) => {
      // bus.$emit("Switch");

      this.spinner = true;

      this.analit = {};

      this.multiparams.forEach((element) => {
        if (element.opis === data) {
          this.analit = element;
          this.multiparam_id = element._id;
          this.multiparam_izbor = data;
        }
      });

      if (_.isEmpty(this.analit)) {
        // console.warn("Empty object.");
      } else {
        if (!_.isEmpty(this.Response)) {
          this.showLineChart = false;
          let palette = store.getters.palette;

          this.Procjena = [];

          var obj = {};
          var count = 0;

          this.Response.Multi.forEach((element) => {
            count++;
            element.multi.forEach((param) => {
              if (
                this.multiparam_id == param.labassay &&
                param.rezultat[0].rezultat_f.trim() != ""
              ) {
                obj.rezultat = param.rezultat[0].rezultat_f;
                obj.jedinica = param.rezultat[0].jedinice_f;
                obj.analit = "Nema podataka";
                obj.interp = param.interp;
                obj.extend = param.extend;
                obj.refd = param.refd;
                obj.refg = param.refg;
                obj.sid = "Nema podataka";
                obj.updated_at = new Date(param.rezultat[0].updated_at);

                var datum =
                  JSON.stringify(new Date(param.rezultat[0].updated_at)).slice(
                    9,
                    11
                  ) +
                  "." +
                  JSON.stringify(new Date(param.rezultat[0].updated_at)).slice(
                    6,
                    8
                  ) +
                  "." +
                  JSON.stringify(new Date(param.rezultat[0].updated_at)).slice(
                    1,
                    5
                  );
                var time = JSON.stringify(
                  new Date(
                    new Date(param.rezultat[0].updated_at).getTime() -
                      new Date(
                        param.rezultat[0].updated_at
                      ).getTimezoneOffset() *
                        60000
                  ).toISOString()
                ).substring(12, 17);
                obj.datum = datum;
                obj.vrijeme = time;
                obj.kontrola = this.Interpretacija(
                  "",
                  obj.rezultat,
                  obj.jedinica,
                  obj.refd,
                  obj.refg,
                  this.$store.state.site,
                  obj.interp,
                  obj.extend,
                  this.spec
                )[5];

                this.Procjena.push(obj);
                obj = {};
              }
            });

            if (count == this.Response.Multi.length) {
              this.Procjena.sort(function (a, b) {
                return Date.parse(a.updated_at) == Date.parse(b.updated_at)
                  ? 0
                  : +(Date.parse(a.updated_at) < Date.parse(b.updated_at)) ||
                      -1;
              });

              // Line Chart

              var data = [];

              if (this.Procjena.length) {
                this.optionsLineChart = {
                  responsive: true,
                  maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "",
                  },
                  scales: {
                    xAxes: [
                      {
                        display: true,
                        gridLines: {
                          display: true,
                          color: "#eee",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        display: true,
                        gridLines: {
                          display: true,
                          color: "#eee",
                        },
                      },
                    ],
                  },
                };

                var labels = [];
                var kontrola = [];
                var temp = "";

                this.Procjena.forEach((element) => {
                  if (!isNaN(element.rezultat.trim())) {
                    switch (element.kontrola) {
                      case "Red":
                        kontrola.push(palette.danger);
                        break;
                      case "Green":
                        kontrola.push(palette.primary);
                        break;
                      case "Yellow":
                        kontrola.push(palette.warning);
                        break;

                      default:
                        kontrola.push(palette.info);
                        break;
                    }

                    labels.push(element.datum);
                    data.push(element.rezultat);
                  }
                });

                this.dataLineChart = {
                  labels: labels,
                  datasets: [
                    {
                      label: this.table_header,
                      backgroundColor: utils.hex2rgb(palette.info, 0.5).css,
                      pointBorderColor: kontrola,
                      pointBackgroundColor: kontrola,
                      borderColor: palette.transparent,
                      data: data,
                    },
                  ],
                };

                if (data.length) {
                  setTimeout(() => {
                    this.showLineChart = true;
                  }, 500);
                }
              } else {
                // console.warn("No data.");

                this.spinner = false;
              }
            }
          });
        } else {
          // console.warn("Response not loaded.");
        }
      }
    });

    bus.$on("graph", () => {
      this.Procjena.sort(function (a, b) {
        return Date.parse(a.updated_at) == Date.parse(b.updated_at)
          ? 0
          : +(Date.parse(a.updated_at) < Date.parse(b.updated_at)) || -1;
      });

      var data = [];

      if (this.Procjena.length) {
        let palette = store.getters.palette;
        this.optionsLineChart = {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "",
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: true,
                  color: "#eee",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  display: true,
                  color: "#eee",
                },
              },
            ],
          },
        };

        var labels = [];
        var kontrola = [];
        var temp = "";

        this.Procjena.forEach((element) => {
          if (!isNaN(element.rezultat.trim())) {
            switch (element.kontrola) {
              case "Red":
                kontrola.push(palette.danger);
                break;
              case "Green":
                kontrola.push(palette.primary);
                break;
              case "Yellow":
                kontrola.push(palette.warning);
                break;

              default:
                kontrola.push(palette.info);
                break;
            }

            labels.push(element.datum);
            data.push(element.rezultat);
          }
        });

        this.dataLineChart = {
          labels: labels,
          datasets: [
            {
              label: this.analiza_eval.ime + " | " + this.analiza_eval.analit,
              backgroundColor: utils.hex2rgb(palette.info, 0.5).css,
              pointBorderColor: kontrola,
              pointBackgroundColor: kontrola,
              borderColor: palette.transparent,
              data: data,
            },
          ],
        };

        if (data.length) {
          this.showLineChart = true;
        }
      } else {
        // console.warn("No data.");
      }
      this.graph = false;
    });

    bus.$on("table", () => {
      this.Procjena.sort(function (a, b) {
        return Date.parse(a.updated_at) == Date.parse(b.updated_at)
          ? 0
          : +(Date.parse(a.updated_at) > Date.parse(b.updated_at)) || -1;
      });

      var data = [];

      if (this.Procjena.length) {
        let palette = store.getters.palette;
        this.optionsLineChart = {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "",
          },
          scales: {
            xAxes: [
              {
                display: true,
                gridLines: {
                  display: true,
                  color: "#eee",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  display: true,
                  color: "#eee",
                },
              },
            ],
          },
        };

        var labels = [];
        var kontrola = [];
        var temp = "";

        this.Procjena.forEach((element) => {
          if (!isNaN(element.rezultat.trim())) {
            switch (element.kontrola) {
              case "Red":
                kontrola.push(palette.danger);
                break;
              case "Green":
                kontrola.push(palette.primary);
                break;
              case "Yellow":
                kontrola.push(palette.warning);
                break;

              default:
                kontrola.push(palette.info);
                break;
            }

            labels.push(element.datum);
            data.push(element.rezultat);
          }
        });

        this.dataLineChart = {
          labels: labels,
          datasets: [
            {
              label: this.analiza_eval.ime + " | " + this.analiza_eval.analit,
              backgroundColor: utils.hex2rgb(palette.info, 0.5).css,
              pointBorderColor: kontrola,
              pointBackgroundColor: kontrola,
              borderColor: palette.transparent,
              data: data,
            },
          ],
        };

        if (data.length) {
          this.showLineChart = true;
        }
      } else {
        // console.warn("No data.");
      }
      this.graph = true;
    });

    bus.$on("note-o", (data) => {
      // Bilješka o pacijentu
      this.$refs.staticModalBiljeska.open();
      // this.$refs.staticModalDeleteSample.open();
    });

    bus.$on("trash", (data) => {
      this.sid = data.sid;
      this.$refs.staticModalDeleteSample.open();
    });

    bus.$on("edit", (data) => {
      this.sid = data.sid;
      this.$refs.staticModalEditSample.open();
    });

    bus.$on("comment", (data) => {
      this.sid = data.sid;
      this.$refs.staticModalComment.open();
    });

    bus.$on("barcode", (data) => {
      this.BarcodePrint(data);
    });

    bus.$on("save", (data) => {
      this.SaveResults(this.rezultati, "save");
    });

    bus.$on("check", (data) => {
      this.Approve(this.rezultati);
    });

    bus.$on("verify", (data) => {
      this.Verify(data, "verify");
    });

    bus.$on("handshake", (data) => { // Pošiljaoc pacijenta






      // console.log(data.sid);
      http
      .get(
        "posiljaoc/list/data?token=" +
          this.$store.state.token +
          "&site=" +
          this.$store.state.site + "&sid=" + data.sid,
        {}
      )
      .then((res) => {
        
        this.posiljaoc = res.data.sample.lokacija.lokacija
        this.posiljaocInit = res.data.sample.lokacija.lokacija
        this.posiljaocObj = res.data.sample.lokacija
        this.pacijentObj = res.data.sample.patient

        // console.log(this.pacijentObj)
        // console.log(this.posiljaocObj)

        // router.post("/posiljaoc/set/data", settings.PosiljaocSet);



            this.lokacije = [];
        
              http
                .get(
                  "postavke/list/lokacije?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then((res) => {
                  if (res.data.success) {
                    res.data.lokacije.forEach((element) => {
                      if (true) {
                        this.lokacije.push(element.lokacija);
                        this.lokacijeObj.push(element);
                    
                      }
                    });

                    this.lokacije.sort(function (a, b) {
                      return a.localeCompare(b, undefined, {
                        numeric: true,
                        sensitivity: "base",
                      });
                    });

                    this.$refs.staticModalHandshake.open();

                    
                  }
                });






        

        // this.isLoading = true

        // setTimeout(() => {
        //   this.isLoading = false
        //   this.$refs.staticModalHandshake.open();
        // }, 500);

       
        
      });
      
    });


















    bus.$on("undo", (data) => {
      this.Disapprove(this.rezultati, "undo");
    });

    bus.$on("unlock", (data) => {
      this.UnVerify(data, "unlock");
    });

    bus.$on("Nalaz", (data) => {
      this.lokacijaNalaza = "/";

      if (!data.final_pdf) {
        this.$refs.staticModalError.open();
      } else {
        if (data.pdf === "ENG") {
          this.path = this.samplesid + ".pdf";

          this.url = server + "nalazi/samples/" + this.path;

          var options = {
            width: "100%",
            height: "800px",
          };
          PDFObject.embed(this.url, "#pdf-container", options);

          this.email_button = true;
          this.main = false;
          this.pdf = true;
        } else if (data.pdf === "DE") {
          this.path = this.samplesid + "_German.pdf";

          this.url = server + "nalazi/partials/" + this.path;

          var options = {
            width: "100%",
            height: "800px",
          };
          PDFObject.embed(this.url, "#pdf-container", options);

          this.email_button = true;
          this.main = false;
          this.pdf = true;
        } else {
          this.path = this.timestamp + ".pdf";

          this.url = server + "nalazi/" + this.path;

          // console.log(this.url)
          // console.log(this.path)

          var options = {
            width: "100%",
            height: "800px",
          };
          PDFObject.embed(this.url, "#pdf-container", options);

          this.email_button = true;
          this.main = false;
          this.pdf = true;
        }
      }
    });

    bus.$on("pdf", (data) => {
      this.lokacijaNalaza = "/samples";

      if (!data.pdf_exists) {
        this.$refs.staticModalError.open();
      } else {
        this.path = "samples/" + data.sid + ".pdf";

        this.url = server + "nalazi/samples/" + data.sid + ".pdf";

        var options = {
          width: "100%",
          height: "800px",
        };
        PDFObject.embed(this.url, "#pdf-container", options);

        this.main = false;
        this.pdf = true;
      }
    });

    bus.$on("Sample", (data) => {
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* 





| Microbiology Get Sample Check





*/
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */

      if (data.tip.includes("Mikrobiologija")) {
        this.MicrobiologySample = true;
      } else {
        this.MicrobiologySample = false;
      }

      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* 





End of Microbiology Get Sample Check |





*/
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      this.$store.dispatch("SetSample", data.sid);
      this.GetSingleSample(data);
    });

    bus.$on("Deleted", (data) => {
      // console.log(this.pacijent)
      // console.log(this.note)

      // http
      //   .post("pacijenti/biljeska/save", {
      //     pacijent: this.pacijent,
      //     note: this.note,
      //     token: this.$store.state.token,
      //     site: this.$store.state.site
      //   })
      //   .then(res => {

      //     console.log(res.data)
      //     this.note = res.data.pacijent.note
      //     this.noteInit = res.data.pacijent.note
      //   });

      this.DeletedSample(data);
    });

    bus.$on("DeletedCancel", (data) => {

      // setTimeout(() => {
      //   this.note = this.noteInit
        
      // }, 300);
      
      
      // this.DeletedSample(data);
    });

    bus.$on("Edited", (data) => {
      this.EditSample(data);
    });

    bus.$on("SaveMulti", (data) => {
      this.SaveMultiResults(this.analiti, data);
    });

    bus.$on("Mail", () => {
      this.SendMail(this.email);
    });

    bus.$on("Error", () => {
      // Generate new Report
      // console.warn("Greška prilikom čitanja nalaza.");
    });

    bus.$on("Analyser", (data) => {
      this.AnalyserSelected(data);
    });

    bus.$on("Sljedeci", () => {
      this.Sljedeci();
    });

    bus.$on("Prethodni", () => {
      this.Prethodni();
    });

    bus.$on("Search", () => {
      this.$refs.staticModalFind.open();
    });

    bus.$on("Push", (data) => {
      if (this.$route.params.id != data) {
        this.Results.forEach((element) => {
          if (element.pid == data) {
            router.push(
              "/lpobrada/rezultati/" +
                element.patient +
                "/" +
                element.pid +
                "?date=" +
                element.date
            );
          }
        });
      } else {
        // console.warn("No change required.");
      }
    });

    bus.$on("Reference", () => {
      this.reference.dref = Math.abs(
        this.reference.dref.replace(/,/g, ".").trim()
      );
      this.reference.gref = Math.abs(
        this.reference.gref.replace(/,/g, ".").trim()
      );

      if (this.reference.interp != "spec") {
        this.reference.extend = this.reference.extend.replace(
          /(\r\n|\n|\r)/gm,
          " "
        );
      }

      if (
        isNaN(this.reference.dref) ||
        isNaN(this.reference.gref) ||
        this.reference.dref === "" ||
        this.reference.gref === "" ||
        this.reference.dref > this.reference.gref
      ) {
        // console.warn("Invalid value.");
      } else {
        document.getElementById(this.$store.state.sid).click();

        http
          .post("/rezultati/odobravanje/reference/", {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site,
            reference: this.reference,
          })
          .then((res) => {
            setTimeout(() => {
              document.getElementById(this.$store.state.sid).click();
            }, 500);
          });
      }
    });

    bus.$on("retest", (data) => {
      this.RetestSave(data);
    });

    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* 





| Microbiology Bus from Modal





*/
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */

    bus.$on("Antibiotik", (data) => {
      // console.log("Prikaz izbornika antibiotika.");
      if (
        this.sample.status != "ODOBREN" &&
        this.sample.status != "VERIFICIRAN"
      ) {
        this.TemporaryAntibiotics = [];
        this.TemporaryBacteries = [];
        this.TemporaryBacteriesAdd = [];

        this.Antibiotics.forEach((element) => {
          element.chosen = false;
          element.disabled = false;
        });

        this.SelectedBacteries.forEach((selected) => {
          // Bacteria name must be Unique.
          if (selected.opis == data) {
            selected.antibiogram.antibiotici.forEach((ant) => {
              this.Antibiotics.forEach((antibiotik) => {
                if (antibiotik._id == ant._id) {
                  antibiotik.disabled = true;
                  antibiotik.chosen = true;
                  antibiotik.rezultat = ant.rezultat;
                }
              });
            });
          }
        });

        this.ShowAntibiotics = true;
      }
    });

    bus.$on("tabChanged", (data) => {
      // console.log("Tab changed.");
      this.CurrentTab = data;
      // console.log("Active tab: " + this.CurrentTab)
    });

    bus.$on("AllowClick", (data) => {
      if (this.MicrobiologySample) {
        if (data) {
          this.AllowGetSample = false;
          // console.log("Close sample.")
        } else {
          this.AllowGetSample = true;
          // console.log("Open sample.");
        }
      }
    });

    bus.$on("MicroReset", () => {
      // console.log("Reset: " + this.$store.state.sid);
      var Scenario = this.MicrobiologyScenario;

      this.rezultati[0].rezultat = "";
      this.rezultati[0].rezultat_m = [];
      this.rezultati[0].realizovan = false;

      this.MicrobiologyResult.DefaultBacteries.forEach((element) => {
        element.chosen = false;
      });

      this.MicrobiologyResult.RemainingBacteries.forEach((element) => {
        element.chosen = false;
      });

      this.SelectedBacteries = [];
      this.ShowAllBacteries = false;

      if (this.MicrobiologyScenario.includes("MAIB")) {
        this.main = false;
        // console.log(this.rezultati)

        http
          .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site,
            rezultati: this.rezultati,
          })
          .then((res) => {
            http
              .get(
                "rezultati/odobravanje/samples/" +
                  this.$route.params.patient +
                  "/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site +
                  "&date=" +
                  this.$route.query.date,
                {}
              )
              .then((res) => {
                // console.log(res.data)
                this.uzorci = [];

                res.data.results.forEach((element) => {
                  if (this.$store.state.sid === element.id) {
                    // console.log(element.rezultati[0].rezultat[0]);
                  }

                  var check = 0;
                  var zaprimljen = 0;
                  var realizovan = 0;

                  if (element.verificiran) {
                    var status_uzorka = "VERIFICIRAN";
                  } else {
                    var status_uzorka = element.status;
                  }

                  element.rezultati.forEach((test) => {
                    check++;

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                    ) {
                      zaprimljen++;
                    }

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                    ) {
                      realizovan++;
                    }

                    if (check === element.rezultati.length) {
                      // console.log("Provjera: Reset sample")

                      if (status_uzorka === "VERIFICIRAN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "VERIFICIRAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (status_uzorka === "ODOBREN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "ODOBREN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (zaprimljen < 1) {
                        this.uzorci.push({
                          sid: element.id,
                          status: "REALIZOVAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (realizovan < 1) {
                        var stat = "U OBRADI";
                        if (element.sample.tip.includes("Mikrobiologija")) {
                          if (
                            element.rezultati[0].rezultat[0].rezultat_m.length
                          ) {
                            stat = "REALIZOVAN";
                          }
                        }
                        this.uzorci.push({
                          sid: element.id,
                          status: stat,
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else {
                        this.uzorci.push({
                          sid: element.id,
                          status: "U OBRADI",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      }
                    }
                  });
                });

                this.uzorci = this.uzorci.sort(function (a, b) {
                  return a.sid.localeCompare(b.sid, undefined, {
                    numeric: true,
                    sensitivity: "base",
                  });
                });
              })
              .then((res) => {
                this.MicrobiologyScenario = "MAIBNoR";
                // console.log(
                //   "Scenario: " + Scenario + " - > " + this.MicrobiologyScenario
                // );
                this.main = true;
                bus.$emit("CloseMicroReset");
              });
          });
      } else if (this.MicrobiologyScenario.includes("MANB")) {
        this.main = false;

        http
          .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site,
            rezultati: this.rezultati,
          })
          .then((res) => {
            http
              .get(
                "rezultati/odobravanje/samples/" +
                  this.$route.params.patient +
                  "/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site +
                  "&date=" +
                  this.$route.query.date,
                {}
              )
              .then((res) => {
                // console.log(res.data)
                this.uzorci = [];

                res.data.results.forEach((element) => {
                  if (this.$store.state.sid === element.id) {
                    // console.log(element.rezultati[0].rezultat[0]);
                  }

                  var check = 0;
                  var zaprimljen = 0;
                  var realizovan = 0;

                  if (element.verificiran) {
                    var status_uzorka = "VERIFICIRAN";
                  } else {
                    var status_uzorka = element.status;
                  }

                  element.rezultati.forEach((test) => {
                    check++;

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                    ) {
                      zaprimljen++;
                    }

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                    ) {
                      realizovan++;
                    }

                    if (check === element.rezultati.length) {
                      if (status_uzorka === "VERIFICIRAN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "VERIFICIRAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (status_uzorka === "ODOBREN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "ODOBREN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (zaprimljen < 1) {
                        this.uzorci.push({
                          sid: element.id,
                          status: "REALIZOVAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (realizovan < 1) {
                        var stat = "U OBRADI";
                        if (element.sample.tip.includes("Mikrobiologija")) {
                          if (
                            element.rezultati[0].rezultat[0].rezultat_m.length
                          ) {
                            stat = "REALIZOVAN";
                          }
                        }
                        this.uzorci.push({
                          sid: element.id,
                          status: stat,
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else {
                        this.uzorci.push({
                          sid: element.id,
                          status: "U OBRADI",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      }
                    }
                  });
                });

                this.uzorci = this.uzorci.sort(function (a, b) {
                  return a.sid.localeCompare(b.sid, undefined, {
                    numeric: true,
                    sensitivity: "base",
                  });
                });
              })
              .then((res) => {
                this.MicrobiologyScenario = "MANBNoR";
                // console.log(
                //   "Scenario: " + Scenario + " - > " + this.MicrobiologyScenario
                // );
                this.main = true;
                bus.$emit("CloseMicroReset");
              });
          });
      } else {
        // Error
      }
    });

    bus.$on("MicroResult", () => {
      // console.log("Defining result...");

      var Scenario = this.MicrobiologyScenario;

      switch (this.MicrobiologyScenario) {
        case "MAIBNoR":
          // Ima definisan skup bakterija
          this.rezultati[0].rezultat_m = [];
          this.rezultati[0].rezultat_m.push({
            bakterija: false,
            negativan: this.ModalNegative,
            pozitivan: this.ModalPositive,
            _id: null,
            naziv: null,
            opis: null,
            antibiogram: {
              _id: null,
              naziv: null,
              opis: null,
              antibiotici: [
                {
                  _id: null,
                  rbr_a: null,
                  naziv: null,
                  opis: null,
                  rezultat: null,
                },
              ],
            },
          });

          if (this.ModalNegative) {
            this.rezultati[0].rezultat = this.NegativeResultSelection;
            this.isLoading = true;
            this.main = false;

            http
              .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
                email: this.$store.state.userId,
                token: this.$store.state.token,
                site: this.$store.state.site,
                rezultati: this.rezultati,
              })
              .then((res) => {
                http
                  .get(
                    "rezultati/odobravanje/samples/" +
                      this.$route.params.patient +
                      "/" +
                      this.$route.params.id +
                      "?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site +
                      "&date=" +
                      this.$route.query.date,
                    {}
                  )
                  .then((res) => {
                    this.uzorci = [];

                    res.data.results.forEach((element) => {
                      if (this.$store.state.sid === element.id) {
                        // console.log(element.rezultati[0].rezultat[0]);
                      }

                      var check = 0;
                      var zaprimljen = 0;
                      var realizovan = 0;

                      if (element.verificiran) {
                        var status_uzorka = "VERIFICIRAN";
                      } else {
                        var status_uzorka = element.status;
                      }

                      element.rezultati.forEach((test) => {
                        check++;

                        if (
                          test.rezultat[test.rezultat.length - 1].rezultat_f ===
                          ""
                        ) {
                          zaprimljen++;
                        }

                        if (
                          test.rezultat[test.rezultat.length - 1].rezultat_f !=
                          ""
                        ) {
                          realizovan++;
                        }

                        if (check === element.rezultati.length) {
                          if (status_uzorka === "VERIFICIRAN") {
                            this.uzorci.push({
                              sid: element.id,
                              status: "VERIFICIRAN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (status_uzorka === "ODOBREN") {
                            this.uzorci.push({
                              sid: element.id,
                              status: "ODOBREN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (zaprimljen < 1) {
                            this.uzorci.push({
                              sid: element.id,
                              status: "REALIZOVAN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (realizovan < 1) {
                            var stat = "U OBRADI";
                            if (element.sample.tip.includes("Mikrobiologija")) {
                              if (
                                element.rezultati[0].rezultat[0].rezultat_m
                                  .length
                              ) {
                                stat = "REALIZOVAN";
                              }
                            }
                            this.uzorci.push({
                              sid: element.id,
                              status: stat,
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else {
                            this.uzorci.push({
                              sid: element.id,
                              status: "U OBRADI",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          }
                        }
                      });
                    });

                    this.uzorci = this.uzorci.sort(function (a, b) {
                      return a.sid.localeCompare(b.sid, undefined, {
                        numeric: true,
                        sensitivity: "base",
                      });
                    });
                  })
                  .then((res) => {
                    bus.$emit("CloseMicroResult");
                    this.rezultati[0].realizovan = true;
                    this.MicrobiologyScenario = "MAIBNeR";
                    // console.log(
                    //   "Scenario: " +
                    //     Scenario +
                    //     " - > " +
                    //     this.MicrobiologyScenario
                    // );
                    this.main = true;
                    this.isLoading = false;
                  });
              });
          } else {
            this.PositiveResultSelection = "";
            this.SelectedBacteries.forEach((element) => {
              this.PositiveResultSelection =
                this.PositiveResultSelection + element.opis + "\n";
              var Antibiotici = [];
              var antibiotik = {};

              this.Antibiotics.forEach((antibiotik) => {
                element.antibiogram.antibiotici.forEach((ant) => {
                  if (antibiotik._id == ant) {
                    antibiotik = {
                      _id: antibiotik._id,
                      rbr_a: antibiotik.rbr_a,
                      naziv: antibiotik.naziv,
                      opis: antibiotik.opis,
                      disabled: false,
                      rezultat: "",
                    };
                    Antibiotici.push(antibiotik);
                    antibiotik = {};
                  }
                });
              });

              this.rezultati[0].rezultat_m.push({
                bakterija: true,
                negativan: this.largeModalneg,
                pozitivan: this.largeModalpos,
                _id: element._id,
                naziv: element.naziv,
                opis: element.opis,
                antibiogram: {
                  _id: element.antibiogram._id,
                  naziv: element.antibiogram.naziv,
                  opis: element.antibiogram.opis,
                  antibiotici: [...Antibiotici],
                },
              });
            });

            this.rezultati[0].rezultat = this.PositiveResultSelection.trim();
            this.isLoading = true;
            this.main = false;

            http
              .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
                email: this.$store.state.userId,
                token: this.$store.state.token,
                site: this.$store.state.site,
                rezultati: this.rezultati,
              })
              .then((res) => {
                http
                  .get(
                    "rezultati/odobravanje/samples/" +
                      this.$route.params.patient +
                      "/" +
                      this.$route.params.id +
                      "?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site +
                      "&date=" +
                      this.$route.query.date,
                    {}
                  )
                  .then((res) => {
                    this.uzorci = [];

                    res.data.results.forEach((element) => {
                      if (this.$store.state.sid === element.id) {
                        // console.log(element.rezultati[0].rezultat[0]);
                      }

                      var check = 0;
                      var zaprimljen = 0;
                      var realizovan = 0;

                      if (element.verificiran) {
                        var status_uzorka = "VERIFICIRAN";
                      } else {
                        var status_uzorka = element.status;
                      }

                      element.rezultati.forEach((test) => {
                        check++;

                        if (
                          test.rezultat[test.rezultat.length - 1].rezultat_f ===
                          ""
                        ) {
                          zaprimljen++;
                        }

                        if (
                          test.rezultat[test.rezultat.length - 1].rezultat_f !=
                          ""
                        ) {
                          realizovan++;
                        }

                        if (check === element.rezultati.length) {
                          if (status_uzorka === "VERIFICIRAN") {
                            this.uzorci.push({
                              sid: element.id,
                              status: "VERIFICIRAN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (status_uzorka === "ODOBREN") {
                            this.uzorci.push({
                              sid: element.id,
                              status: "ODOBREN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (zaprimljen < 1) {
                            this.uzorci.push({
                              sid: element.id,
                              status: "REALIZOVAN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (realizovan < 1) {
                            var stat = "U OBRADI";
                            if (element.sample.tip.includes("Mikrobiologija")) {
                              if (
                                element.rezultati[0].rezultat[0].rezultat_m
                                  .length
                              ) {
                                stat = "REALIZOVAN";
                              }
                            }
                            this.uzorci.push({
                              sid: element.id,
                              status: stat,
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else {
                            this.uzorci.push({
                              sid: element.id,
                              status: "U OBRADI",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          }
                        }
                      });
                    });

                    this.uzorci = this.uzorci.sort(function (a, b) {
                      return a.sid.localeCompare(b.sid, undefined, {
                        numeric: true,
                        sensitivity: "base",
                      });
                    });
                  })
                  .then((res) => {
                    bus.$emit("CloseMicroResult");
                    this.rezultati[0].realizovan = true;
                    this.MicrobiologyScenario = "MAIBPoR";
                    // console.log(
                    //   "Scenario: " +
                    //     Scenario +
                    //     " - > " +
                    //     this.MicrobiologyScenario
                    // );
                    this.main = true;
                    this.isLoading = false;
                  });
              });
          }

          break;

        case "MANBNoR":
          // Nema definisan skup bakterija
          this.rezultati[0].rezultat_m = [
            {
              bakterija: false,
              negativan: this.ModalNegative,
              pozitivan: this.ModalPositive,
              _id: null,
              naziv: null,
              opis: null,
              antibiogram: {
                _id: null,
                naziv: null,
                opis: null,
                antibiotici: [
                  {
                    _id: null,
                    rbr_a: null,
                    naziv: null,
                    opis: null,
                    rezultat: null,
                  },
                ],
              },
            },
          ];

          if (this.ModalNegative) {
            this.rezultati[0].rezultat = this.NegativeResultSelection;
            this.isLoading = true;
            this.main = false;

            http
              .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
                email: this.$store.state.userId,
                token: this.$store.state.token,
                site: this.$store.state.site,
                rezultati: this.rezultati,
              })
              .then((res) => {
                http
                  .get(
                    "rezultati/odobravanje/samples/" +
                      this.$route.params.patient +
                      "/" +
                      this.$route.params.id +
                      "?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site +
                      "&date=" +
                      this.$route.query.date,
                    {}
                  )
                  .then((res) => {
                    this.uzorci = [];

                    res.data.results.forEach((element) => {
                      if (this.$store.state.sid === element.id) {
                        // console.log(element.rezultati[0].rezultat[0]);
                      }

                      var check = 0;
                      var zaprimljen = 0;
                      var realizovan = 0;

                      if (element.verificiran) {
                        var status_uzorka = "VERIFICIRAN";
                      } else {
                        var status_uzorka = element.status;
                      }

                      element.rezultati.forEach((test) => {
                        check++;

                        if (
                          test.rezultat[test.rezultat.length - 1].rezultat_f ===
                          ""
                        ) {
                          zaprimljen++;
                        }

                        if (
                          test.rezultat[test.rezultat.length - 1].rezultat_f !=
                          ""
                        ) {
                          realizovan++;
                        }

                        if (check === element.rezultati.length) {
                          if (status_uzorka === "VERIFICIRAN") {
                            this.uzorci.push({
                              sid: element.id,
                              status: "VERIFICIRAN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (status_uzorka === "ODOBREN") {
                            this.uzorci.push({
                              sid: element.id,
                              status: "ODOBREN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (zaprimljen < 1) {
                            this.uzorci.push({
                              sid: element.id,
                              status: "REALIZOVAN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (realizovan < 1) {
                            var stat = "U OBRADI";
                            if (element.sample.tip.includes("Mikrobiologija")) {
                              if (
                                element.rezultati[0].rezultat[0].rezultat_m
                                  .length
                              ) {
                                stat = "REALIZOVAN";
                              }
                            }
                            this.uzorci.push({
                              sid: element.id,
                              status: stat,
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else {
                            this.uzorci.push({
                              sid: element.id,
                              status: "U OBRADI",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          }
                        }
                      });
                    });

                    this.uzorci = this.uzorci.sort(function (a, b) {
                      return a.sid.localeCompare(b.sid, undefined, {
                        numeric: true,
                        sensitivity: "base",
                      });
                    });
                  })
                  .then((res) => {
                    bus.$emit("CloseMicroResult");
                    this.rezultati[0].realizovan = true;
                    this.MicrobiologyScenario = "MANBNeR";
                    // console.log(
                    //   "Scenario: " +
                    //     Scenario +
                    //     " - > " +
                    //     this.MicrobiologyScenario
                    // );
                    this.main = true;
                    this.isLoading = false;
                  });
              });
          } else {
            this.rezultati[0].rezultat = this.PositiveResultSelection;
            this.isLoading = true;
            this.main = false;

            http
              .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
                email: this.$store.state.userId,
                token: this.$store.state.token,
                site: this.$store.state.site,
                rezultati: this.rezultati,
              })
              .then((res) => {
                http
                  .get(
                    "rezultati/odobravanje/samples/" +
                      this.$route.params.patient +
                      "/" +
                      this.$route.params.id +
                      "?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site +
                      "&date=" +
                      this.$route.query.date,
                    {}
                  )
                  .then((res) => {
                    this.uzorci = [];

                    res.data.results.forEach((element) => {
                      if (this.$store.state.sid === element.id) {
                        // console.log(element.rezultati[0].rezultat[0]);
                      }

                      var check = 0;
                      var zaprimljen = 0;
                      var realizovan = 0;

                      if (element.verificiran) {
                        var status_uzorka = "VERIFICIRAN";
                      } else {
                        var status_uzorka = element.status;
                      }

                      element.rezultati.forEach((test) => {
                        check++;

                        if (
                          test.rezultat[test.rezultat.length - 1].rezultat_f ===
                          ""
                        ) {
                          zaprimljen++;
                        }

                        if (
                          test.rezultat[test.rezultat.length - 1].rezultat_f !=
                          ""
                        ) {
                          realizovan++;
                        }

                        if (check === element.rezultati.length) {
                          if (status_uzorka === "VERIFICIRAN") {
                            this.uzorci.push({
                              sid: element.id,
                              status: "VERIFICIRAN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (status_uzorka === "ODOBREN") {
                            this.uzorci.push({
                              sid: element.id,
                              status: "ODOBREN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (zaprimljen < 1) {
                            this.uzorci.push({
                              sid: element.id,
                              status: "REALIZOVAN",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else if (realizovan < 1) {
                            var stat = "U OBRADI";
                            if (element.sample.tip.includes("Mikrobiologija")) {
                              if (
                                element.rezultati[0].rezultat[0].rezultat_m
                                  .length
                              ) {
                                stat = "REALIZOVAN";
                              }
                            }
                            this.uzorci.push({
                              sid: element.id,
                              status: stat,
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          } else {
                            this.uzorci.push({
                              sid: element.id,
                              status: "U OBRADI",
                              pdf_exists: element.pdf_exists,
                              tip: element.sample.tip,
                              _id: element._id,
                              removed: false,
                            });
                          }
                        }
                      });
                    });

                    this.uzorci = this.uzorci.sort(function (a, b) {
                      return a.sid.localeCompare(b.sid, undefined, {
                        numeric: true,
                        sensitivity: "base",
                      });
                    });
                  })
                  .then((res) => {
                    bus.$emit("CloseMicroResult");
                    this.rezultati[0].realizovan = true;
                    this.MicrobiologyScenario = "MANBPoR";
                    // console.log(
                    //   "Scenario: " +
                    //     Scenario +
                    //     " - > " +
                    //     this.MicrobiologyScenario
                    // );
                    this.main = true;
                    this.isLoading = false;
                  });
              });
          }

          break;

        default:
          break;
      }
    });

    bus.$on("ResetResultSelection", () => {
      // console.log('Clearing...');
      switch (this.MicrobiologyScenario) {
        case "MAIBNoR":
          this.ModalNegative = false;
          this.ModalPositive = false;
          this.ModalPositiveCondition = false;
          this.MicrobiologyModalHeader = "Predefinisani rezultati";
          this.NegativeResultSelection = "";
          this.PositiveResultSelection = "";
          this.SelectedBacteries = [];
          this.ShowAllBacteries = false;

          break;

        case "MAIBNeR":
          this.SelectedBacteries = [];

          break;

        case "MAIBPoR":
          break;

        case "MANBNoR":
          this.ModalNegative = false;
          this.ModalPositive = false;
          this.ModalPositiveCondition = false;
          this.MicrobiologyModalHeader = "Predefinisani rezultati";
          this.NegativeResultSelection = "";
          this.PositiveResultSelection = "";
          this.SelectedBacteries = [];
          this.ShowAllBacteries = false;

          break;

        case "MANBNeR":
          this.SelectedBacteries = [];

          break;

        case "MANBPoR":
          this.SelectedBacteries = [];

          break;

        default:
          break;
      }

      this.MicrobiologyResult.DefaultBacteries.forEach((element) => {
        element.chosen = false;
      });

      this.MicrobiologyResult.RemainingBacteries.forEach((element) => {
        element.chosen = false;
      });

      this.SelectedBacteries = [];
      this.ShowAllBacteries = false;
    });

    bus.$on("CancelMicroResult", () => {
      switch (this.MicrobiologyScenario) {
        case "MAIBNoR":
          this.ModalNegative = false;
          this.ModalPositive = false;
          this.ModalPositiveCondition = false;
          this.MicrobiologyModalHeader = "Predefinisani rezultati";
          this.NegativeResultSelection = "";
          this.PositiveResultSelection = "";
          this.SelectedBacteries = [];
          this.ShowAllBacteries = false;

          break;

        case "MAIBNeR":
          this.SelectedBacteries = [];

          break;

        case "MAIBPoR":
          break;

        case "MANBNoR":
          this.ModalNegative = false;
          this.ModalPositive = false;
          this.ModalPositiveCondition = false;
          this.MicrobiologyModalHeader = "Predefinisani rezultati";
          this.NegativeResultSelection = "";
          this.PositiveResultSelection = "";
          this.SelectedBacteries = [];
          this.ShowAllBacteries = false;

          break;

        case "MANBNeR":
          this.SelectedBacteries = [];

          break;

        case "MANBPoR":
          this.SelectedBacteries = [];

          break;

        default:
          break;
      }

      this.MicrobiologyResult.DefaultBacteries.forEach((element) => {
        element.chosen = false;
      });

      this.MicrobiologyResult.RemainingBacteries.forEach((element) => {
        element.chosen = false;
      });

      this.SelectedBacteries = [];
      this.ShowAllBacteries = false;
    });

    bus.$on("MicroBactery", () => {
      // console.log("Saving main result...");

      this.isLoading = true;
      this.main = false;

      http
        .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: this.rezultati,
        })
        .then((res) => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then((res) => {
              this.uzorci = [];

              res.data.results.forEach((element) => {
                if (this.$store.state.sid === element.id) {
                  // console.log(element.rezultati[0].rezultat[0]);
                }

                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach((test) => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (realizovan < 1) {
                      var stat = "U OBRADI";
                      if (element.sample.tip.includes("Mikrobiologija")) {
                        if (
                          element.rezultati[0].rezultat[0].rezultat_m.length
                        ) {
                          stat = "REALIZOVAN";
                        }
                      }
                      this.uzorci.push({
                        sid: element.id,
                        status: stat,
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function (a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base",
                });
              });
            })
            .then((res) => {
              this.main = true;
              this.isLoading = false;
              bus.$emit("CloseMicroBactery");
            });
        });
    });

    bus.$on("CancelMicroBactery", () => {});

    bus.$on("PovratakMicroBactery", () => {
      this.ShowAntibiotics = false;
      this.ShowBacteries = false;
    });

    bus.$on("SpasiMicroBactery", () => {
      if (this.TemporaryBacteriesAdd.length) {
        // console.log("Dodavanje bakterija...");
        var bakterija = {};
        var antibiogram = {};
        var antibiotik = {};

        this.TemporaryBacteriesAdd.forEach((element) => {
          this.Antibiograms.forEach((antibgr) => {
            if (
              JSON.stringify(element.antibiogram._id) ===
              JSON.stringify(antibgr._id)
            ) {
              antibiogram = antibgr;
            }
          });

          antibiogram.antibiotici.forEach((antbtk) => {
            antbtk.disabled = false;
            antbtk.rezultat = "";
          });

          bakterija.bakterija = true;
          bakterija._id = element._id;
          bakterija.naziv = element.naziv;
          bakterija.opis = element.opis;
          bakterija.antibiogram = antibiogram;

          // console.log(bakterija);

          this.SelectedBacteries.push(bakterija);
          this.BacteryTabs.push(bakterija.opis);
          this.rezultati[0].rezultat_m.push(bakterija);
          this.rezultati[0].rezultat =
            this.rezultati[0].rezultat + "\n" + bakterija.opis;
          bakterija = {};
          antibiogram = {};
        });

        /* var element = {
          chosen: true,
          disabled: false,
          _id: "5d95cfe793a77e0fec61aa6a",
          naziv: "Bakterija 3",
          opis: "Bakterija 3",
          antibiogram: {
            antibiotici: [
              "5d90ae5e89d972109c76c1b1",
              "5d90aed589d972109c76c1b3",
              "5d90af2389d972109c76c1b4",
              "5d90ae8289d972109c76c1b2",
              "5d90afe089d972109c76c1b8",
              "5d90b00f89d972109c76c1b9",
              "5d90b02289d972109c76c1ba"
            ],
            _id: "5d94750593a77e0fec61a8e9",
            naziv: "Antibiogram 2",
            opis: "Antibiogram 2",
            __v: 0
          },
          __v: 0
        }; */

        /* var bakterija = {
          bakterija: true,
          _id: "5d94751193a77e0fec61a8ea",
          naziv: "Bakterija 1",
          opis: "Bakterija 1",
          antibiogram: {
            _id: "5d9474f893a77e0fec61a8e8",
            naziv: "Antibiogram 1",
            opis: "Antibiogram 1",
            antibiotici: [
              {
                _id: "5d90ae3489d972109c76c1b0",
                rbr_a: "0",
                naziv: "FOX",
                opis: "Cefoxitin",
                disabled: false,
                rezultat: "S"
              },
              {
                _id: "5d90ae8289d972109c76c1b2",
                rbr_a: "0",
                naziv: "Cd",
                opis: "Clindamycin",
                disabled: false,
                rezultat: ""
              },
              {
                _id: "5d90af2389d972109c76c1b4",
                rbr_a: "0",
                naziv: "C",
                opis: "Chloramphenicol ",
                disabled: false,
                rezultat: ""
              },
              {
                _id: "5d90af6e89d972109c76c1b6",
                rbr_a: "0",
                naziv: "TE",
                opis: "Tetracycline",
                disabled: false,
                rezultat: ""
              }
            ]
          }
        }; */
      } else {
        // console.log("Dodavanje antibiotika...");
      }

      if (
        this.TemporaryAntibiotics.length ||
        this.TemporaryBacteriesAdd.length
      ) {
        this.TemporaryAntibiotics.forEach((element) => {
          this.rezultati[0].rezultat_m.forEach((selected) => {
            if (selected.opis == this.CurrentTab) {
              selected.antibiogram.antibiotici.push(element);
            }
          });
        });

        // this.show_table = false;
        this.isLoading = true;
        this.main = false;

        http
          .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
            email: this.$store.state.userId,
            token: this.$store.state.token,
            site: this.$store.state.site,
            rezultati: this.rezultati,
          })
          .then((res) => {
            http
              .get(
                "rezultati/odobravanje/samples/" +
                  this.$route.params.patient +
                  "/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site +
                  "&date=" +
                  this.$route.query.date,
                {}
              )
              .then((res) => {
                this.uzorci = [];

                res.data.results.forEach((element) => {
                  if (this.$store.state.sid === element.id) {
                    // console.log(element.rezultati[0].rezultat[0]);
                  }

                  var check = 0;
                  var zaprimljen = 0;
                  var realizovan = 0;

                  if (element.verificiran) {
                    var status_uzorka = "VERIFICIRAN";
                  } else {
                    var status_uzorka = element.status;
                  }

                  element.rezultati.forEach((test) => {
                    check++;

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                    ) {
                      zaprimljen++;
                    }

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                    ) {
                      realizovan++;
                    }

                    if (check === element.rezultati.length) {
                      if (status_uzorka === "VERIFICIRAN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "VERIFICIRAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (status_uzorka === "ODOBREN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "ODOBREN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (zaprimljen < 1) {
                        this.uzorci.push({
                          sid: element.id,
                          status: "REALIZOVAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (realizovan < 1) {
                        var stat = "U OBRADI";
                        if (element.sample.tip.includes("Mikrobiologija")) {
                          if (
                            element.rezultati[0].rezultat[0].rezultat_m.length
                          ) {
                            stat = "REALIZOVAN";
                          }
                        }
                        this.uzorci.push({
                          sid: element.id,
                          status: stat,
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else {
                        this.uzorci.push({
                          sid: element.id,
                          status: "U OBRADI",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      }
                    }
                  });
                });

                this.uzorci = this.uzorci.sort(function (a, b) {
                  return a.sid.localeCompare(b.sid, undefined, {
                    numeric: true,
                    sensitivity: "base",
                  });
                });
              })
              .then((res) => {
                this.MicrobiologyScenario = "MAIBPoR";
                this.ShowAntibiotics = false;
                this.ShowBacteries = false;
                // this.show_table = true;
                this.main = true;
                this.isLoading = false;

                if (this.TemporaryBacteriesAdd.length) {
                  this.CurrentTab = this.BacteryTabs[
                    this.BacteryTabs.length - 1
                  ];
                }
              });
          });
      } else {
        this.MicrobiologyScenario = "MAIBPoR";
        this.ShowAntibiotics = false;
        this.ShowBacteries = false;
      }
    });

    bus.$on("UpdateMicroBactery", (data) => {
      if (
        !this.ShowAntibiotics &&
        !this.ShowBacteries &&
        this.MicrobiologyScenario === "MAIBPoR"
      ) {
        if (
          this.sample.status != "ODOBREN" &&
          this.sample.status != "VERIFICIRAN"
        ) {
          this.TemporaryAntibiotics = [];
          this.TemporaryBacteries = [];
          this.TemporaryBacteriesAdd = [];
          var obj = {};

          this.Bacteries.forEach((element) => {
            obj.chosen = false;
            obj.disabled = false;
            obj._id = element._id;
            obj.naziv = element.naziv;
            obj.opis = element.opis;
            obj.antibiogram = element.antibiogram;
            obj.__v = element.__v;
            obj.chosen = element.chosen;
            this.TemporaryBacteries.push(obj);
            obj = {};
          });

          this.TemporaryBacteries.forEach((element) => {
            this.SelectedBacteries.forEach((selected) => {
              if (selected._id == element._id) {
                element.chosen = true;
                element.disabled = true;
              }
            });
          });

          this.ShowBacteries = true;
        }
      }
    });

    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* 





End of | Microbiology Bus from Modal





*/
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */

    bus.$on("PartnerChange", () => {

      if(this.handshake){

        this.handshake = false;

         this.lokacijeObj.forEach(element => {

        if(element.lokacija == this.posiljaoc){

          // this.posiljaoc = res.data.sample.lokacija.lokacija
          // this.posiljaocObj = res.data.sample.lokacija
          // this.pacijentObj = res.data.sample.patient

          // console.log(this.pacijentObj._id)
          // console.log(element._id)

          this.isLoading = true;
          this.okDisabled = true;
          this.cancelDisabled = true;

          http
          .post("/posiljaoc/set/data/", {
            patient: this.pacijentObj._id,
            token: this.$store.state.token,
            site: this.$store.state.site,
            lokacija: element._id,
          })
          .then((res) => {
            // console.log(res.data)
            if(res.data.success){
              this.isLoading = false;
              this.okDisabled = false;
              this.cancelDisabled = false;
              this.handshake = true;
              bus.$emit("PartnerChanged");

            }else{
              this.isLoading = false;
              this.okDisabled = false;
              this.cancelDisabled = false;
              this.handshake = true;
              console.warn("Greška prilikom izmjene pošiljaoca.")

            }
            
            
          });


          // setTimeout(() => {

            
            
          // }, 3000);


          

        }
        
      });

      }else{
        console.log("Waiting...")
      }

      


      


      
    });








    bus.$on("openCalendarObrada", () => {
      // console.log(this.$store.state.sid)

       this.isLoading = true;

          http
          .post("/uzorci/calendar/get", {
            id: this.$store.state.sid,
            token: this.$store.state.token,
            site: this.$store.state.site,
          })
          .then((res) => {
            // console.log(res.data.calendar)
            if(res.data.success){
              
              this.calendar = res.data.calendar
              setTimeout(() => {
                this.isLoading = false;
                this.$refs.staticModalSamplesEntryCalendarObrada.open();
              }, 300);
              

            }else{
              this.isLoading = false;
             
              console.warn("Greška prilikom pokušaja izmjene vremena uzorkovanja.")

            }
            
            
          });      


    });




    bus.$on("setCalendarObrada", (time) => {
      // console.log("Set Date and time:")

      // console.log(time)

       

       this.isLoading = true;

          http
          .post("/uzorci/calendar/set", {
            id: this.$store.state.sid,
            calendar: time,
            token: this.$store.state.token,
            site: this.$store.state.site,
          })
          .then((res) => {
            // console.log(res.data.calendar)
            if(res.data.success){
              
            this.calendar = time
            this.isLoading = false;
              

            }else{
              this.isLoading = false;
             
              console.warn("Greška prilikom pokušaja izmjene vremena uzorkovanja.")

            }
            
            
          });       
    });
  },

  beforeDestroy() {

    bus.$off("openCalendarObrada");
    bus.$off("setCalendarObrada");
    bus.$off("PartnerChange");

    bus.$off("Parametar");
    bus.$off("trash");
    bus.$off("edit");
    bus.$off("comment");
    bus.$off("barcode");
    bus.$off("save");
    bus.$off("check");
    bus.$off("verify");
    bus.$off("handshake");
    bus.$off("undo");
    bus.$off("unlock");
    bus.$off("Nalaz");
    bus.$off("pdf");
    bus.$off("Sample");
    bus.$off("Deleted");
    bus.$off("DeletedCancel");
    bus.$off("Edited");
    bus.$off("SaveMulti");
    bus.$off("Mail");
    bus.$off("Error");
    bus.$off("Analyser");
    bus.$off("Sljedeci");
    bus.$off("Prethodni");
    bus.$off("Search");
    bus.$off("Push");
    bus.$off("Reference");
    bus.$off("graph");
    bus.$off("table");
    bus.$off("retest");

    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* 





| Microbiology Bus Off





*/
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */

    // VuesticTabsBactery
    bus.$off("tabChanged");
    bus.$off("Antibiotik");

    // VuesticModalMicroResult, bus.$emit("CloseMicroResult")
    bus.$off("MicroResult");
    bus.$off("ResetResultSelection");
    bus.$off("CancelMicroResult");

    // VuesticModalMicroReset
    bus.$off("MicroReset");

    // VuesticCollapseObrada
    bus.$off("AllowClick");

    // VuesticModalMicroBactery, bus.$emit("CloseMicroBactery")
    bus.$off("MicroBactery");
    bus.$off("CancelMicroBactery");
    bus.$off("PovratakMicroBactery");
    bus.$off("SpasiMicroBactery");
    bus.$off("UpdateMicroBactery");

    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* 





End of Microbiology Bus Off |





*/
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
  },

  destroyed() {
    // console.log("Component is being destroyed...");
    // this.$destroy();
  },

  created() {
    this.Created();

    this.Previous.pid = Number(this.$route.params.id) - 1;
    this.Next.pid = Number(this.$route.params.id) + 1;
    this.query_date =
      this.$route.query.date.substring(8, 10) +
      "." +
      this.$route.query.date.substring(5, 7) +
      "." +
      this.$route.query.date.substring(0, 4);

    this.Datum.today = new Date(
      JSON.stringify(
        new Date(new Date().setDate(new Date().getDate()))
      ).substring(1, 11) + "T00:00:00"
    );

    this.today_date =
      JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
        .substring(1, 11)
        .substring(8, 10) +
      "." +
      JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
        .substring(1, 11)
        .substring(5, 7) +
      "." +
      JSON.stringify(new Date(new Date().setDate(new Date().getDate())))
        .substring(1, 11)
        .substring(0, 4);

    this.Datum.query = new Date(
      this.$route.query.date.substring(0, 10) + "T00:00:00"
    );

    this.Datum.next = new Date(
      new Date(this.$route.query.date.substring(0, 10) + "T00:00:00").setDate(
        this.Datum.query.getDate() + 1
      )
    );

    this.Datum.previous = new Date(
      new Date(this.$route.query.date.substring(0, 10) + "T00:00:00").setDate(
        this.Datum.query.getDate() - 1
      )
    );

    if (new Date(this.Datum.today) > new Date(this.Datum.query)) {
      this.pagination = false;
    } else if (new Date(this.Datum.today) < new Date(this.Datum.query)) {
      this.pagination = false;
    } else {
      this.pagination = true;
    }

    this.interpretacije = this.interpretacije.sort(function (a, b) {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    });
  },

  methods: {
    RetestSave(data) {
      this.isLoading = true;

      // console.log(this.rezultati)

      http
        .post("rezultati/odobravanje/retest/save/", {
          sid: this.$store.state.sid,
          rezultati: this.rezultati,
          site: this.$store.state.site,
          token: this.$store.state.token,
        })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            this.save_retest = false;
          } else {
          }
        });
    },

    ExclamationMulti(test) {
      this.warning = { analiza: "", text: "", napomena: "", control: "" };
      var rezultat = test.rezultat
        .replace(/,/g, ".")
        .replace(/</g, "")
        .replace(/>/g, "");

      var m_interp = {};
      var m_opis = "";

      // console.log(test.analit)

      this.analitiprikaz.forEach((element) => {
        element.labassay.multiparam.forEach((param) => {
          if (JSON.stringify(param._id) == JSON.stringify(test.analit)) {
            // console.log(element)
            // console.log(param)

            m_interp = param.interpretacija;
            m_opis = param.opis;
          }
        });
      });

      switch (
        this.Interpretacija(
          test.opis,
          rezultat,
          test.jedinica,
          test.refd,
          test.refg,
          this.$store.state.site,
          test.interp,
          "",
          this.spec
        )[2]
      ) {
        case "L":
          this.warning = {
            analiza: m_opis,
            text: m_interp.snizeno.text.trim(),
            napomena: m_interp.napomena.trim(),
            control: "Sniženo",
          };
          break;

        case "H":
          switch (test.interp) {
            case "neg":
              this.warning = {
                analiza: m_opis,
                text: m_interp.poviseno.text.trim(),
                napomena: m_interp.napomena.trim(),
                control: "Pozitivan",
              };
              break;

            default:
              this.warning = {
                analiza: m_opis,
                text: m_interp.poviseno.text.trim(),
                napomena: m_interp.napomena.trim(),
                control: "Povišeno",
              };
              break;
          }

          break;

        default:
          this.warning = { analiza: "", text: "", napomena: "", control: "" };
          break;
      }

      if (this.warning.text && this.warning.text != "") {
        // console.log(this.warning.analiza + " | " + this.warning.control + " - " + this.warning.text);
        // this.$refs.staticModalExclamation.open();
      }
    },

    Exclamation(test) {
      this.warning = { analiza: "", text: "", napomena: "", control: "" };
      var rezultat = test.rezultat
        .replace(/,/g, ".")
        .replace(/</g, "")
        .replace(/>/g, "");

      switch (
        this.Interpretacija(
          test.opis,
          rezultat,
          test.jedinica,
          test.dRef,
          test.gRef,
          this.$store.state.site,
          test.interp,
          test.extend,
          this.spec
        )[2]
      ) {
        case "L":
          this.warning = {
            analiza: test.analit,
            text: test.interpretacija.snizeno.text.trim(),
            napomena: test.interpretacija.napomena.trim(),
            control: "Sniženo",
          };
          break;

        case "H":
          switch (test.interp) {
            case "neg":
              this.warning = {
                analiza: test.analit,
                text: test.interpretacija.poviseno.text.trim(),
                napomena: test.interpretacija.napomena.trim(),
                control: "Pozitivan",
              };
              break;

            default:
              this.warning = {
                analiza: test.analit,
                text: test.interpretacija.poviseno.text.trim(),
                napomena: test.interpretacija.napomena.trim(),
                control: "Povišeno",
              };
              break;
          }

          break;

        default:
          this.warning = { analiza: "", text: "", napomena: "", control: "" };
          break;
      }

      if (this.warning.text && this.warning.text != "") {
        this.$refs.staticModalExclamation.open();
      }
    },

    LabAssayEval(e, test) {
      this.analiza_eval = test;
      e.preventDefault();
      this.spinner = false;
      this.showLineChart = false;
      let palette = store.getters.palette;
      this.table_header = test.ime + " | " + test.analit;
      if (!test.multidata) {
        this.isLoading = true;
        this.Procjena = [];

        http
          .get(
            "/labassay/evaluation/single" +
              "?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site +
              "&range=" +
              "14",
            {}
          )
          .then((response) => {
            if (response.data.Results.length) {
              var obj = {};
              var count = 0;

              response.data.Results.forEach((element) => {
                count++;
                element.rezultati.forEach((rez) => {
                  if (
                    rez.labassay === test.labassay_id &&
                    element.verificiran &&
                    rez.rezultat[rez.rezultat.length - 1].rezultat_f.trim() !=
                      ""
                  ) {
                    obj.rezultat =
                      rez.rezultat[rez.rezultat.length - 1].rezultat_f;
                    obj.jedinica =
                      rez.rezultat[rez.rezultat.length - 1].jedinice_f;
                    obj.analit = "";
                    obj.interp = rez.interp;
                    obj.extend = rez.extend;
                    obj.refd = rez.refd;
                    obj.refg = rez.refg;
                    obj.sid = element.id;
                    obj.updated_at =
                      rez.rezultat[rez.rezultat.length - 1].updated_at;

                    var datum =
                      JSON.stringify(
                        rez.rezultat[rez.rezultat.length - 1].updated_at
                      ).slice(9, 11) +
                      "." +
                      JSON.stringify(
                        rez.rezultat[rez.rezultat.length - 1].updated_at
                      ).slice(6, 8) +
                      "." +
                      JSON.stringify(
                        rez.rezultat[rez.rezultat.length - 1].updated_at
                      ).slice(1, 5);
                    var time = JSON.stringify(
                      new Date(
                        new Date(
                          rez.rezultat[rez.rezultat.length - 1].updated_at
                        ).getTime() -
                          new Date(
                            rez.rezultat[rez.rezultat.length - 1].updated_at
                          ).getTimezoneOffset() *
                            60000
                      ).toISOString()
                    ).substring(12, 17);

                    obj.datum = datum;
                    obj.vrijeme = time;
                    obj.kontrola = this.Interpretacija(
                      "",
                      obj.rezultat,
                      obj.jedinica,
                      obj.refd,
                      obj.refg,
                      this.$store.state.site,
                      obj.interp,
                      obj.extend,
                      this.spec
                    )[5];

                    this.Procjena.push(obj);
                    obj = {};
                  }
                });

                if (count == response.data.Results.length) {
                  this.Procjena.sort(function (a, b) {
                    return Date.parse(a.updated_at) == Date.parse(b.updated_at)
                      ? 0
                      : +(
                          Date.parse(a.updated_at) < Date.parse(b.updated_at)
                        ) || -1;
                  });

                  // Line Chart

                  var data = [];

                  if (this.Procjena.length) {
                    this.optionsLineChart = {
                      responsive: true,
                      maintainAspectRatio: false,
                      title: {
                        display: true,
                        text: "",
                      },
                      scales: {
                        xAxes: [
                          {
                            display: true,
                            gridLines: {
                              display: true,
                              color: "#eee",
                            },
                          },
                        ],
                        yAxes: [
                          {
                            display: true,
                            gridLines: {
                              display: true,
                              color: "#eee",
                            },
                          },
                        ],
                      },
                    };

                    var labels = [];
                    var kontrola = [];
                    var temp = "";

                    this.Procjena.forEach((element) => {
                      if (!isNaN(element.rezultat.trim())) {
                        switch (element.kontrola) {
                          case "Red":
                            kontrola.push(palette.danger);
                            break;
                          case "Green":
                            kontrola.push(palette.primary);
                            break;
                          case "Yellow":
                            kontrola.push(palette.warning);
                            break;

                          default:
                            kontrola.push(palette.info);
                            break;
                        }

                        labels.push(element.datum);
                        data.push(element.rezultat);
                      }
                    });

                    this.dataLineChart = {
                      labels: labels,
                      datasets: [
                        {
                          label: test.ime + " | " + test.analit,
                          backgroundColor: utils.hex2rgb(palette.info, 0.5).css,
                          pointBorderColor: kontrola,
                          pointBackgroundColor: kontrola,
                          borderColor: palette.transparent,
                          data: data,
                        },
                      ],
                    };

                    if (data.length) {
                      this.showLineChart = true;
                    }

                    // console.warn("Zadnjih 14 dana.");

                    this.$refs.staticModalLabAssayEvalSingle.open();
                  } else {
                    // console.warn("No data.");
                  }
                }
              });
            } else {
              // console.warn("No data.");
            }
            this.isLoading = false;
          });
      } else {
        // console.warn(test.ime + " | " + test.analit);

        this.multiparam_izbor = test.multiparam[0].opis;
        this.multiparam_id = test.multiparam[0]._id;

        this.multiparams = [];

        this.multiparam_izbornik = [];

        test.multiparam.forEach((element) => {
          this.multiparam_izbornik.push(element.opis);
          this.multiparams.push(element);
        });

        this.isLoading = true;
        this.Procjena = [];

        http
          .get(
            "/labassay/evaluation/multi" +
              "?token=" +
              this.$store.state.token +
              "&site=" +
              this.$store.state.site +
              "&labassay=" +
              test.labassay_id +
              "&range=" +
              "14",
            {}
          )
          .then((response) => {
            if (response.data.Multi.length) {
              this.Response = response.data;

              var obj = {};
              var count = 0;

              response.data.Multi.forEach((element) => {
                count++;
                element.multi.forEach((param) => {
                  if (
                    this.multiparam_id == param.labassay &&
                    param.rezultat[0].rezultat_f.trim() != ""
                  ) {
                    obj.rezultat = param.rezultat[0].rezultat_f;
                    obj.jedinica = param.rezultat[0].jedinice_f;
                    obj.analit = "Nema podataka";
                    obj.interp = param.interp;
                    obj.extend = param.extend;
                    obj.refd = param.refd;
                    obj.refg = param.refg;
                    obj.sid = "Nema podataka";
                    obj.updated_at = new Date(param.rezultat[0].updated_at);

                    var datum =
                      JSON.stringify(
                        new Date(param.rezultat[0].updated_at)
                      ).slice(9, 11) +
                      "." +
                      JSON.stringify(
                        new Date(param.rezultat[0].updated_at)
                      ).slice(6, 8) +
                      "." +
                      JSON.stringify(
                        new Date(param.rezultat[0].updated_at)
                      ).slice(1, 5);
                    var time = JSON.stringify(
                      new Date(
                        new Date(param.rezultat[0].updated_at).getTime() -
                          new Date(
                            param.rezultat[0].updated_at
                          ).getTimezoneOffset() *
                            60000
                      ).toISOString()
                    ).substring(12, 17);
                    obj.datum = datum;
                    obj.vrijeme = time;
                    obj.kontrola = this.Interpretacija(
                      "",
                      obj.rezultat,
                      obj.jedinica,
                      obj.refd,
                      obj.refg,
                      this.$store.state.site,
                      obj.interp,
                      obj.extend,
                      this.spec
                    )[5];

                    this.Procjena.push(obj);
                    obj = {};
                  }
                });

                if (count == response.data.Multi.length) {
                  this.Procjena.sort(function (a, b) {
                    return Date.parse(a.updated_at) == Date.parse(b.updated_at)
                      ? 0
                      : +(
                          Date.parse(a.updated_at) < Date.parse(b.updated_at)
                        ) || -1;
                  });

                  // Line Chart

                  var data = [];

                  if (this.Procjena.length) {
                    this.optionsLineChart = {
                      responsive: true,
                      maintainAspectRatio: false,
                      title: {
                        display: true,
                        text: "",
                      },
                      scales: {
                        xAxes: [
                          {
                            display: true,
                            gridLines: {
                              display: true,
                              color: "#eee",
                            },
                          },
                        ],
                        yAxes: [
                          {
                            display: true,
                            gridLines: {
                              display: true,
                              color: "#eee",
                            },
                          },
                        ],
                      },
                    };

                    var labels = [];
                    var kontrola = [];
                    var temp = "";

                    this.Procjena.forEach((element) => {
                      if (!isNaN(element.rezultat.trim())) {
                        switch (element.kontrola) {
                          case "Red":
                            kontrola.push(palette.danger);
                            break;
                          case "Green":
                            kontrola.push(palette.primary);
                            break;
                          case "Yellow":
                            kontrola.push(palette.warning);
                            break;

                          default:
                            kontrola.push(palette.info);
                            break;
                        }

                        labels.push(element.datum);
                        data.push(element.rezultat);
                      }
                    });

                    this.dataLineChart = {
                      labels: labels,
                      datasets: [
                        {
                          label: test.ime + " | " + test.analit,
                          backgroundColor: utils.hex2rgb(palette.info, 0.5).css,
                          pointBorderColor: kontrola,
                          pointBackgroundColor: kontrola,
                          borderColor: palette.transparent,
                          data: data,
                        },
                      ],
                    };

                    if (data.length) {
                      this.showLineChart = true;
                    }

                    this.$refs.staticModalLabAssayEvalMulti.open();
                  } else {
                    // console.warn("No data.");
                  }
                }
              });
            } else {
              // console.warn("No data.");
            }
            this.isLoading = false;
          });
      }
    },

    Evaluation(test) {
      this.analiza_eval = test;
      this.spinner = false;
      if (true) {
        this.showLineChart = false;
        let palette = store.getters.palette;
        this.table_header = test.ime + " | " + test.analit;

        if (test.multidata) {
          this.multiparam_izbor = test.multiparam[0].opis;
          this.multiparam_id = test.multiparam[0]._id;

          this.multiparams = [];

          this.multiparam_izbornik = [];

          test.multiparam.forEach((element) => {
            this.multiparam_izbornik.push(element.opis);
            this.multiparams.push(element);
          });

          this.isLoading = true;
          this.Procjena = [];

          http
            .get(
              "/patient/evaluation/multi" +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&patient=" +
                this.pacijent +
                "&labassay=" +
                test.labassay_id,
              {}
            )
            .then((response) => {
              if (response.data.Multi.length) {
                this.Response = response.data;

                var obj = {};
                var count = 0;

                response.data.Multi.forEach((element) => {
                  count++;
                  element.multi.forEach((param) => {
                    if (
                      this.multiparam_id == param.labassay &&
                      param.rezultat[0].rezultat_f.trim() != ""
                    ) {
                      obj.rezultat = param.rezultat[0].rezultat_f;
                      obj.jedinica = param.rezultat[0].jedinice_f;
                      obj.analit = "Nema podataka";
                      obj.interp = param.interp;
                      obj.extend = param.extend;
                      obj.refd = param.refd;
                      obj.refg = param.refg;
                      obj.sid = "Nema podataka";
                      obj.updated_at = new Date(param.rezultat[0].updated_at);

                      var datum =
                        JSON.stringify(
                          new Date(param.rezultat[0].updated_at)
                        ).slice(9, 11) +
                        "." +
                        JSON.stringify(
                          new Date(param.rezultat[0].updated_at)
                        ).slice(6, 8) +
                        "." +
                        JSON.stringify(
                          new Date(param.rezultat[0].updated_at)
                        ).slice(1, 5);
                      var time = JSON.stringify(
                        new Date(
                          new Date(param.rezultat[0].updated_at).getTime() -
                            new Date(
                              param.rezultat[0].updated_at
                            ).getTimezoneOffset() *
                              60000
                        ).toISOString()
                      ).substring(12, 17);
                      obj.datum = datum;
                      obj.vrijeme = time;
                      obj.kontrola = this.Interpretacija(
                        "",
                        obj.rezultat,
                        obj.jedinica,
                        obj.refd,
                        obj.refg,
                        this.$store.state.site,
                        obj.interp,
                        obj.extend,
                        this.spec
                      )[5];

                      this.Procjena.push(obj);
                      obj = {};
                    }
                  });

                  if (count == response.data.Multi.length) {
                    this.Procjena.sort(function (a, b) {
                      return Date.parse(a.updated_at) ==
                        Date.parse(b.updated_at)
                        ? 0
                        : +(
                            Date.parse(a.updated_at) < Date.parse(b.updated_at)
                          ) || -1;
                    });

                    // Line Chart

                    var data = [];

                    if (this.Procjena.length) {
                      this.optionsLineChart = {
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                          display: true,
                          text: "",
                        },
                        scales: {
                          xAxes: [
                            {
                              display: true,
                              gridLines: {
                                display: true,
                                color: "#eee",
                              },
                            },
                          ],
                          yAxes: [
                            {
                              display: true,
                              gridLines: {
                                display: true,
                                color: "#eee",
                              },
                            },
                          ],
                        },
                      };

                      var labels = [];
                      var kontrola = [];
                      var temp = "";

                      this.Procjena.forEach((element) => {
                        if (!isNaN(element.rezultat.trim())) {
                          switch (element.kontrola) {
                            case "Red":
                              kontrola.push(palette.danger);
                              break;
                            case "Green":
                              kontrola.push(palette.primary);
                              break;
                            case "Yellow":
                              kontrola.push(palette.warning);
                              break;

                            default:
                              kontrola.push(palette.info);
                              break;
                          }

                          labels.push(element.datum);
                          data.push(element.rezultat);
                        }
                      });

                      this.dataLineChart = {
                        labels: labels,
                        datasets: [
                          {
                            label: test.ime + " | " + test.analit,
                            backgroundColor: utils.hex2rgb(palette.info, 0.5)
                              .css,
                            pointBorderColor: kontrola,
                            pointBackgroundColor: kontrola,
                            borderColor: palette.transparent,
                            data: data,
                          },
                        ],
                      };

                      if (data.length) {
                        this.showLineChart = true;
                      }

                      this.$refs.staticModalEvaluationMulti.open();
                    } else {
                      // console.warn("No data.");
                    }
                  }
                });
              } else {
                // console.warn("No data.");
              }
              this.isLoading = false;
            });
        } else {
          this.isLoading = true;
          this.Procjena = [];

          http
            .get(
              "/patient/evaluation/single" +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&patient=" +
                this.pacijent,
              {}
            )
            .then((response) => {
              if (response.data.Results.length) {
                var obj = {};
                var count = 0;

                response.data.Results.forEach((element) => {
                  count++;
                  element.rezultati.forEach((rez) => {
                    if (
                      rez.labassay === test.labassay_id &&
                      element.verificiran &&
                      rez.rezultat[rez.rezultat.length - 1].rezultat_f.trim() !=
                        ""
                    ) {
                      obj.rezultat =
                        rez.rezultat[rez.rezultat.length - 1].rezultat_f;
                      obj.jedinica =
                        rez.rezultat[rez.rezultat.length - 1].jedinice_f;
                      obj.analit = "";
                      obj.interp = rez.interp;
                      obj.extend = rez.extend;
                      obj.refd = rez.refd;
                      obj.refg = rez.refg;
                      obj.sid = element.id;
                      obj.updated_at =
                        rez.rezultat[rez.rezultat.length - 1].updated_at;

                      var datum =
                        JSON.stringify(
                          rez.rezultat[rez.rezultat.length - 1].updated_at
                        ).slice(9, 11) +
                        "." +
                        JSON.stringify(
                          rez.rezultat[rez.rezultat.length - 1].updated_at
                        ).slice(6, 8) +
                        "." +
                        JSON.stringify(
                          rez.rezultat[rez.rezultat.length - 1].updated_at
                        ).slice(1, 5);
                      var time = JSON.stringify(
                        new Date(
                          new Date(
                            rez.rezultat[rez.rezultat.length - 1].updated_at
                          ).getTime() -
                            new Date(
                              rez.rezultat[rez.rezultat.length - 1].updated_at
                            ).getTimezoneOffset() *
                              60000
                        ).toISOString()
                      ).substring(12, 17);

                      obj.datum = datum;
                      obj.vrijeme = time;
                      obj.kontrola = this.Interpretacija(
                        "",
                        obj.rezultat,
                        obj.jedinica,
                        obj.refd,
                        obj.refg,
                        this.$store.state.site,
                        obj.interp,
                        obj.extend,
                        this.spec
                      )[5];

                      this.Procjena.push(obj);
                      obj = {};
                    }
                  });

                  if (count == response.data.Results.length) {
                    this.Procjena.sort(function (a, b) {
                      return Date.parse(a.updated_at) ==
                        Date.parse(b.updated_at)
                        ? 0
                        : +(
                            Date.parse(a.updated_at) < Date.parse(b.updated_at)
                          ) || -1;
                    });

                    // Line Chart

                    var data = [];

                    if (this.Procjena.length) {
                      this.optionsLineChart = {
                        responsive: true,
                        maintainAspectRatio: false,
                        title: {
                          display: true,
                          text: "",
                        },
                        scales: {
                          xAxes: [
                            {
                              display: true,
                              gridLines: {
                                display: true,
                                color: "#eee",
                              },
                            },
                          ],
                          yAxes: [
                            {
                              display: true,
                              gridLines: {
                                display: true,
                                color: "#eee",
                              },
                            },
                          ],
                        },
                      };

                      var labels = [];
                      var kontrola = [];
                      var temp = "";

                      this.Procjena.forEach((element) => {
                        if (!isNaN(element.rezultat.trim())) {
                          switch (element.kontrola) {
                            case "Red":
                              kontrola.push(palette.danger);
                              break;
                            case "Green":
                              kontrola.push(palette.primary);
                              break;
                            case "Yellow":
                              kontrola.push(palette.warning);
                              break;

                            default:
                              kontrola.push(palette.info);
                              break;
                          }

                          labels.push(element.datum);
                          data.push(element.rezultat);
                        }
                      });

                      this.dataLineChart = {
                        labels: labels,
                        datasets: [
                          {
                            label: test.ime + " | " + test.analit,
                            backgroundColor: utils.hex2rgb(palette.info, 0.5)
                              .css,
                            pointBorderColor: kontrola,
                            pointBackgroundColor: kontrola,
                            borderColor: palette.transparent,
                            data: data,
                          },
                        ],
                      };

                      if (data.length) {
                        this.showLineChart = true;
                      }

                      this.$refs.staticModalEvaluationSingle.open();
                    } else {
                      // console.warn("No data.");
                    }
                  }
                });
              } else {
                // console.warn("No data.");
              }
              this.isLoading = false;
            });
        }
      }
    },

    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* 





| Microbiology Methods





*/
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */

    filteredAntibiotics(column, columns) {
      return this.Antibiotics.filter(
        (item) => this.Antibiotics.indexOf(item) % columns === column - 1
      );
    },

    filteredBacteries(column, columns) {
      return this.TemporaryBacteries.filter(
        (item) => this.TemporaryBacteries.indexOf(item) % columns === column - 1
      );
    },

    AddAntibiotics(data) {
      var obj = {};

      if (!data.chosen) {
        (obj._id = data._id),
          (obj.rbr_a = data.rbr_a),
          (obj.naziv = data.naziv),
          (obj.opis = data.opis),
          (obj.rezultat = "");
        this.TemporaryAntibiotics.push(obj);
      } else {
        for (var i = 0; i < this.TemporaryAntibiotics.length; i++) {
          if (this.TemporaryAntibiotics[i]._id === data._id) {
            this.TemporaryAntibiotics.splice(i, 1);
            break;
          }
        }
      }
    },

    AddBacteries(data) {
      if (!data.chosen) {
        this.TemporaryBacteriesAdd.push(data);
      } else {
        for (var i = 0; i < this.TemporaryBacteriesAdd.length; i++) {
          if (this.TemporaryBacteriesAdd[i]._id === data._id) {
            this.TemporaryBacteriesAdd.splice(i, 1);
            break;
          }
        }
      }
    },

    OpenMicroSelect($event, test) {
      // console.log("Select Modal opening...");

      this.CurrentTab = "";
      this.testovi = [];
      this.rezultati = [];
      this.analitiprikaz = [];
      this.calculated = false;
      this.show_table = false;
      this.main = false;

      var topcije = null;
      topcije = izbornik.rez;

      http
        .get(
          "rezultati/showsingle/" +
            this.$store.state.sid +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then((res) => {
          // console.log(res.data);
          var test = {};

          if (res.data.data.length) {
            res.data.data.sort(function (a, b) {
              return a.testovi.labassay.grupa + a.testovi.labassay.grouporder ==
                b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                ? 0
                : +(
                    a.testovi.labassay.grupa + a.testovi.labassay.grouporder >
                    b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                  ) || -1;
            });

            this.testovi = res.data.data;
            this.analitiprikaz = res.data.multidata;

            res.data.data.forEach((element) => {
              test = {};
              test.realizovan = false;

              test.ime = element.testovi.labassay.naziv;
              test.test = element.testovi.labassay.sifra;
              test.analit = element.testovi.labassay.analit;
              test.IDE = element.testovi._id;
              test.labassay_id = element.testovi.labassay._id;

              test.multi_count = 0;
              test.multi_rezultati = [];

              res.data.multidata.forEach((multi) => {
                if (multi.labassay._id === element.testovi.labassay._id) {
                  test.multi_rezultati = multi.rezultat;
                  test.multi_count = multi.rezultat[0].rezultat.length;
                }
              });

              test.kategorija = element.testovi.labassay.kategorija;
              test.analyser = element.testovi.labassay.analyser;
              test.multiparam = element.testovi.labassay.multiparam;
              test.vise = element.testovi.rezultat.length;
              test.calculated = element.testovi.labassay.calculated;
              test.manual = element.testovi.labassay.manual;

              test.select_options = eval(
                "topcije." +
                  element.testovi.interp
                    .replace("%", "_")
                    .replace("/", "_")
                    .replace(" ", "_")
                    .replace(/-/g, "_")
                    .replace("#", "_")
                    .replace(/^\d+/, "")
              );

              element.testovi.rezultat.forEach((rezultat) => {
                test.sekcija = rezultat.anaassay.sekcija;
                test.rezultat = rezultat.rezultat_f;
                test.result = rezultat;
                test.anaassay = rezultat.anaassay;

                if (rezultat.rezultat_f != "") {
                  test.realizovan = true;
                }

                test.unit = rezultat.jedinice_f;

                if (res.data.verificiran || res.data.status === "ODOBREN") {
                  test.odobren = "ODOBREN";
                  test.edit = false;
                } else {
                  test.odobren != "ODOBREN";
                  test.edit = true;
                }

                test.jedinica = rezultat.jedinice_f;
                test.id = rezultat._id;
                test.multidata = element.testovi.labassay.multi;
                test.rezultat_m = rezultat.rezultat_m;
                test.bakterije = element.testovi.labassay.bakterije;
                test.neg_description = element.testovi.labassay.neg_description;
                test.pos_description = element.testovi.labassay.pos_description;
                test.refSet = element.testovi.grupa;
                test.dRef = element.testovi.refd;
                test.gRef = element.testovi.refg;
                test.interp = element.testovi.interp;
                test.extend = element.testovi.extend;
                test.retest = element.testovi.retest;
                test.interpretacija = element.testovi.labassay.interpretacija;
              });

              if (
                test.select_options != undefined &&
                !test.select_options.includes(test.rezultat)
              ) {
                test.select_options.unshift(test.rezultat);
              }
              this.rezultati.push(test);
            });

            if (this.MicrobiologySample && this.AllowGetSample) {
              // On open Modal
              // console.log("Microbiology sample check.");
              var bakterioloski = false;
              var negativan = false;
              var pozitivan = false;
              var bakterijed = [];
              var bakterijei = [];
              var neg_rezultati = [];
              var poz_rezultati = [];

              this.CurrentTest = this.rezultati[0].analit;

              neg_rezultati = [...this.rezultati[0].neg_description];
              poz_rezultati = [...this.rezultati[0].pos_description];

              if (this.rezultati[0].bakterije.length) {
                bakterioloski = true;

                var counter = 0;
                var ima = false;

                this.Bacteries.forEach((element) => {
                  element.chosen = false;
                  counter = 0;
                  ima = false;
                  this.rezultati[0].bakterije.forEach((bakt) => {
                    counter++;
                    if (element._id == bakt) {
                      ima = true;
                    }

                    if (
                      counter === this.rezultati[0].bakterije.length &&
                      !ima
                    ) {
                      bakterijed.push(element);
                    }

                    if (counter === this.rezultati[0].bakterije.length && ima) {
                      bakterijei.push(element);
                    }
                  });
                });

                switch (this.rezultati[0].rezultat_m.length) {
                  case 0:
                    this.MicrobiologyScenario = "MAIBNoR";
                    this.SelectedBacteries = [];
                    break;
                  case 1:
                    this.MicrobiologyScenario = "MAIBNeR";
                    this.SelectedBacteries = [];

                    negativan = true;

                    if (
                      !neg_rezultati.includes(this.rezultati[0].rezultat.trim())
                    ) {
                      neg_rezultati.unshift(this.rezultati[0].rezultat.trim());
                    }

                    break;

                  default:
                    this.MicrobiologyScenario = "MAIBPoR";
                    this.SelectedBacteries = [];
                    this.BacteryTabs = [];

                    this.rezultati[0].rezultat_m.forEach((element) => {
                      // console.log(element)
                      if (element.bakterija) {
                        this.SelectedBacteries.push(element);
                        this.BacteryTabs.push(element.opis);
                      }
                    });

                    // console.log("Izabrane bakterije:");
                    // console.log(this.SelectedBacteries);

                    let maxVal = this.SelectedBacteries.reduce((max, val) =>
                      max.antibiogram.antibiotici.length >
                      val.antibiogram.antibiotici.length
                        ? max
                        : val
                    );

                    if (this.CurrentTab == "") {
                      // this.CurrentTab = maxVal.opis;
                    }
                    this.CurrentTab = this.SelectedBacteries[0].opis;

                    bakterijed.forEach((element) => {
                      this.SelectedBacteries.forEach((bact) => {
                        if (element._id == bact._id) {
                          element.chosen = true;
                        }
                      });
                    });

                    bakterijei.forEach((element) => {
                      this.SelectedBacteries.forEach((bact) => {
                        if (element._id == bact._id) {
                          element.chosen = true;
                        }
                      });
                    });

                    pozitivan = true;
                    if (
                      !poz_rezultati.includes(this.rezultati[0].rezultat.trim())
                    ) {
                      poz_rezultati.unshift(this.rezultati[0].rezultat.trim());
                    }

                    break;
                }
              } else {
                bakterioloski = false;
                this.SelectedBacteries = [];

                switch (this.rezultati[0].rezultat_m.length) {
                  case 0:
                    this.MicrobiologyScenario = "MANBNoR";
                    neg_rezultati = this.rezultati[0].neg_description;
                    poz_rezultati = this.rezultati[0].pos_description;

                    break;

                  case 1:
                    if (this.rezultati[0].rezultat_m[0].negativan === true) {
                      this.MicrobiologyScenario = "MANBNeR";

                      negativan = true;

                      if (
                        !neg_rezultati.includes(
                          this.rezultati[0].rezultat.trim()
                        )
                      ) {
                        neg_rezultati.unshift(
                          this.rezultati[0].rezultat.trim()
                        );
                      }
                    } else {
                      this.MicrobiologyScenario = "MANBPoR";

                      pozitivan = true;

                      if (
                        !poz_rezultati.includes(
                          this.rezultati[0].rezultat.trim()
                        )
                      ) {
                        poz_rezultati.unshift(
                          this.rezultati[0].rezultat.trim()
                        );
                      }
                    }

                    break;

                  default:
                    this.MicrobiologyScenario = "Unknown";

                    break;
                }
              }

              this.MicrobiologyResult = {
                negative: negativan,
                positive: pozitivan,
                BUG: bakterioloski,
                F_RESULT: this.rezultati[0].rezultat,
                M_RESULT: [...this.rezultati[0].rezultat_m],
                DefaultBacteries: [...bakterijei],
                RemainingBacteries: [...bakterijed],
                NegativeDescriptions: [...neg_rezultati],
                PositiveDescriptions: [...poz_rezultati],
              };
            } else {
              this.MicrobiologyScenario = "Unknown";

              this.MicrobiologyResult = {
                negative: null,
                positive: null,
                BUG: null,
                F_RESULT: "",
                M_RESULT: [],
                DefaultBacteries: [],
                RemainingBacteries: [],
                NegativeDescriptions: [],
                PositiveDescriptions: [],
              };
            }

            this.rezultati.forEach((element) => {
              if (element.calculated) {
                this.calculated = true;
              }
            });
          }
        })
        .then(() => {
          this.ShowAntibiotics = false;
          this.ShowBacteries = false;
          this.show_table = true;
          this.main = true;
          this.$refs.staticModalMicroBacterySelect.open();
        });
    },

    OpenMicro($event, test) {
      // console.log("Result Modal opening...");
      this.CurrentTab = "";
      this.testovi = [];
      this.rezultati = [];
      this.analitiprikaz = [];
      this.calculated = false;
      this.show_table = false;
      this.main = false;

      var topcije = null;
      topcije = izbornik.rez;

      http
        .get(
          "rezultati/showsingle/" +
            this.$store.state.sid +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then((res) => {
          // console.log(res.data);
          var test = {};

          if (res.data.data.length) {
            res.data.data.sort(function (a, b) {
              return a.testovi.labassay.grupa + a.testovi.labassay.grouporder ==
                b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                ? 0
                : +(
                    a.testovi.labassay.grupa + a.testovi.labassay.grouporder >
                    b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                  ) || -1;
            });

            this.testovi = res.data.data;
            this.analitiprikaz = res.data.multidata;

            res.data.data.forEach((element) => {
              test = {};
              test.realizovan = false;

              test.ime = element.testovi.labassay.naziv;
              test.test = element.testovi.labassay.sifra;
              test.analit = element.testovi.labassay.analit;
              test.IDE = element.testovi._id;
              test.labassay_id = element.testovi.labassay._id;

              test.multi_count = 0;
              test.multi_rezultati = [];

              res.data.multidata.forEach((multi) => {
                if (multi.labassay._id === element.testovi.labassay._id) {
                  test.multi_rezultati = multi.rezultat;
                  test.multi_count = multi.rezultat[0].rezultat.length;
                }
              });

              test.kategorija = element.testovi.labassay.kategorija;
              test.analyser = element.testovi.labassay.analyser;
              test.multiparam = element.testovi.labassay.multiparam;
              test.vise = element.testovi.rezultat.length;
              test.calculated = element.testovi.labassay.calculated;
              test.manual = element.testovi.labassay.manual;

              test.select_options = eval(
                "topcije." +
                  element.testovi.interp
                    .replace("%", "_")
                    .replace("/", "_")
                    .replace(" ", "_")
                    .replace(/-/g, "_")
                    .replace("#", "_")
                    .replace(/^\d+/, "")
              );

              element.testovi.rezultat.forEach((rezultat) => {
                test.sekcija = rezultat.anaassay.sekcija;
                test.rezultat = rezultat.rezultat_f;
                test.result = rezultat;
                test.anaassay = rezultat.anaassay;

                if (rezultat.rezultat_f != "") {
                  test.realizovan = true;
                }

                test.unit = rezultat.jedinice_f;

                if (res.data.verificiran || res.data.status === "ODOBREN") {
                  test.odobren = "ODOBREN";
                  test.edit = false;
                } else {
                  test.odobren != "ODOBREN";
                  test.edit = true;
                }

                test.jedinica = rezultat.jedinice_f;
                test.id = rezultat._id;
                test.multidata = element.testovi.labassay.multi;
                test.rezultat_m = rezultat.rezultat_m;
                test.bakterije = element.testovi.labassay.bakterije;
                test.neg_description = element.testovi.labassay.neg_description;
                test.pos_description = element.testovi.labassay.pos_description;
                test.refSet = element.testovi.grupa;
                test.dRef = element.testovi.refd;
                test.gRef = element.testovi.refg;
                test.interp = element.testovi.interp;
                test.extend = element.testovi.extend;
                test.retest = element.testovi.retest;
                test.interpretacija = element.testovi.labassay.interpretacija;
              });

              if (
                test.select_options != undefined &&
                !test.select_options.includes(test.rezultat)
              ) {
                test.select_options.unshift(test.rezultat);
              }
              this.rezultati.push(test);
            });

            if (this.MicrobiologySample && this.AllowGetSample) {
              // On open Modal
              // console.log("Microbiology sample check.");
              var bakterioloski = false;
              var negativan = false;
              var pozitivan = false;
              var bakterijed = [];
              var bakterijei = [];
              var neg_rezultati = [];
              var poz_rezultati = [];

              this.CurrentTest = this.rezultati[0].analit;

              neg_rezultati = [...this.rezultati[0].neg_description];
              poz_rezultati = [...this.rezultati[0].pos_description];

              if (this.rezultati[0].bakterije.length) {
                bakterioloski = true;

                var counter = 0;
                var ima = false;

                this.Bacteries.forEach((element) => {
                  element.chosen = false;
                  counter = 0;
                  ima = false;
                  this.rezultati[0].bakterije.forEach((bakt) => {
                    counter++;
                    if (element._id == bakt) {
                      ima = true;
                    }

                    if (
                      counter === this.rezultati[0].bakterije.length &&
                      !ima
                    ) {
                      bakterijed.push(element);
                    }

                    if (counter === this.rezultati[0].bakterije.length && ima) {
                      bakterijei.push(element);
                    }
                  });
                });

                switch (this.rezultati[0].rezultat_m.length) {
                  case 0:
                    this.MicrobiologyScenario = "MAIBNoR";
                    this.SelectedBacteries = [];
                    break;
                  case 1:
                    this.MicrobiologyScenario = "MAIBNeR";
                    this.SelectedBacteries = [];

                    negativan = true;

                    if (
                      !neg_rezultati.includes(this.rezultati[0].rezultat.trim())
                    ) {
                      neg_rezultati.unshift(this.rezultati[0].rezultat.trim());
                    }

                    break;

                  default:
                    this.MicrobiologyScenario = "MAIBPoR";
                    this.SelectedBacteries = [];
                    this.BacteryTabs = [];

                    this.rezultati[0].rezultat_m.forEach((element) => {
                      // console.log(element)
                      if (element.bakterija) {
                        this.SelectedBacteries.push(element);
                        this.BacteryTabs.push(element.opis);
                      }
                    });

                    // console.log("Izabrane bakterije:");
                    // console.log(this.SelectedBacteries);

                    let maxVal = this.SelectedBacteries.reduce((max, val) =>
                      max.antibiogram.antibiotici.length >
                      val.antibiogram.antibiotici.length
                        ? max
                        : val
                    );

                    if (this.CurrentTab == "") {
                      // this.CurrentTab = maxVal.opis;
                    }
                    this.CurrentTab = this.SelectedBacteries[0].opis;

                    bakterijed.forEach((element) => {
                      this.SelectedBacteries.forEach((bact) => {
                        if (element._id == bact._id) {
                          element.chosen = true;
                        }
                      });
                    });

                    bakterijei.forEach((element) => {
                      this.SelectedBacteries.forEach((bact) => {
                        if (element._id == bact._id) {
                          element.chosen = true;
                        }
                      });
                    });

                    pozitivan = true;
                    if (
                      !poz_rezultati.includes(this.rezultati[0].rezultat.trim())
                    ) {
                      poz_rezultati.unshift(this.rezultati[0].rezultat.trim());
                    }

                    break;
                }
              } else {
                bakterioloski = false;
                this.SelectedBacteries = [];

                switch (this.rezultati[0].rezultat_m.length) {
                  case 0:
                    this.MicrobiologyScenario = "MANBNoR";
                    neg_rezultati = this.rezultati[0].neg_description;
                    poz_rezultati = this.rezultati[0].pos_description;

                    break;

                  case 1:
                    if (this.rezultati[0].rezultat_m[0].negativan === true) {
                      this.MicrobiologyScenario = "MANBNeR";

                      negativan = true;

                      if (
                        !neg_rezultati.includes(
                          this.rezultati[0].rezultat.trim()
                        )
                      ) {
                        neg_rezultati.unshift(
                          this.rezultati[0].rezultat.trim()
                        );
                      }
                    } else {
                      this.MicrobiologyScenario = "MANBPoR";

                      pozitivan = true;

                      if (
                        !poz_rezultati.includes(
                          this.rezultati[0].rezultat.trim()
                        )
                      ) {
                        poz_rezultati.unshift(
                          this.rezultati[0].rezultat.trim()
                        );
                      }
                    }

                    break;

                  default:
                    this.MicrobiologyScenario = "Unknown";

                    break;
                }
              }

              this.MicrobiologyResult = {
                negative: negativan,
                positive: pozitivan,
                BUG: bakterioloski,
                F_RESULT: this.rezultati[0].rezultat,
                M_RESULT: [...this.rezultati[0].rezultat_m],
                DefaultBacteries: [...bakterijei],
                RemainingBacteries: [...bakterijed],
                NegativeDescriptions: [...neg_rezultati],
                PositiveDescriptions: [...poz_rezultati],
              };
            } else {
              this.MicrobiologyScenario = "Unknown";

              this.MicrobiologyResult = {
                negative: null,
                positive: null,
                BUG: null,
                F_RESULT: "",
                M_RESULT: [],
                DefaultBacteries: [],
                RemainingBacteries: [],
                NegativeDescriptions: [],
                PositiveDescriptions: [],
              };
            }

            this.rezultati.forEach((element) => {
              if (element.calculated) {
                this.calculated = true;
              }
            });
          }
        })
        .then(() => {
          this.ShowAntibiotics = false;
          this.ShowBacteries = false;
          this.show_table = true;
          this.main = true;
          this.$refs.staticModalMicroBactery.open();
        });
    },

    SelectBactery(data) {
      if (!data.chosen) {
        this.SelectedBacteries.push(data);
      } else {
        for (var i = this.SelectedBacteries.length - 1; i >= 0; i--) {
          if (this.SelectedBacteries[i]._id === data._id) {
            this.SelectedBacteries.splice(i, 1);
          }
        }
      }

      if (this.SelectedBacteries.length > 0) {
        this.ModalPositiveCondition = true;
      } else {
        this.ModalPositiveCondition = false;
      }
    },

    MicroResultSelect(event) {
      this.uzorci.forEach((element) => {
        if (element.sid === this.$store.state.sid) {
          this.sample.status = "U OBRADI";
        }
      });
      this.$refs.staticModalSelectResult.open();
    },

    ResetSample(event) {
      this.$refs.staticModalResetSample.open();
    },

    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* 





End of Microbiology Methods |





*/
    /* -- */
    /* -- */
    /* -- */
    /* -- */
    /* -- */

    onCancel() {},

    Prethodni() {
      this.pagination = false;

      var check = 0;
      var found = false;
      this.Results.forEach((element) => {
        check++;
        if (element.pid == this.Previous.pid) {
          found = true;
          router.push(
            "/lpobrada/rezultati/" +
              element.patient +
              "/" +
              element.pid +
              "?date=" +
              element.date
          );
        }
      });

      if (check === this.Results.length) {
        if (found) {
          http
            .get(
              "/rezultati/pagination" +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&pid=" +
                this.Previous.pid.toString() +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then((res) => {
              // res.data.rezultati = res.data.rezultati.sort(function (a, b) {
              //   return a.pid.localeCompare(b.pid, undefined, {
              //     numeric: true,
              //     sensitivity: "base",
              //   });
              // });
              // this.data_length =
              //   res.data.rezultati[res.data.rezultati.length - 1].pid;
              // this.data_min = res.data.rezultati[0].pid;
              // if (Object.getOwnPropertyNames(res.data).length === 0) {
              //   // console.warn("No data.");
              //   this.pagination = true;
              //   this.backward_disabled = true;
              // } else {
              //   this.data_pid = res.data.data.pid;
              //   this.Results = res.data.rezultati;
              //   router.push(
              //     "/lpobrada/rezultati/" +
              //       res.data.data.patient +
              //       "/" +
              //       res.data.data.pid +
              //       "?date=" +
              //       res.data.data.date
              //   );
              // }
            });
        } else {
          this.Previous.pid = this.Previous.pid - 1;
          if (this.Previous.pid > 0) {
            this.Prethodni();
          } else {
          }
        }
      } else {
      }
    },

    Sljedeci() {
      this.pagination = false;

      var check = 0;
      var found = false;
      this.Results.forEach((element) => {
        check++;
        if (element.pid == this.Next.pid) {
          found = true;
          router.push(
            "/lpobrada/rezultati/" +
              element.patient +
              "/" +
              element.pid +
              "?date=" +
              element.date
          );
        }
      });

      if (check === this.Results.length) {
        if (found) {
          http
            .get(
              "/rezultati/pagination" +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&pid=" +
                this.Next.pid.toString() +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then((res) => {
              // res.data.rezultati = res.data.rezultati.sort(function (a, b) {
              //   return a.pid.localeCompare(b.pid, undefined, {
              //     numeric: true,
              //     sensitivity: "base",
              //   });
              // });
              // this.data_length =
              //   res.data.rezultati[res.data.rezultati.length - 1].pid;
              // this.data_min = res.data.rezultati[0].pid;
              // if (Object.getOwnPropertyNames(res.data).length === 0) {
              //   // console.warn("No data.");
              //   this.pagination = true;
              //   this.forward_disabled = true;
              // } else {
              //   this.data_pid = res.data.data.pid;
              //   this.Results = res.data.rezultati;
              //   router.push(
              //     "/lpobrada/rezultati/" +
              //       res.data.data.patient +
              //       "/" +
              //       res.data.data.pid +
              //       "?date=" +
              //       res.data.data.date
              //   );
              // }
            });
        } else {
          this.Next.pid = this.Next.pid + 1;
          this.Sljedeci();
        }
      } else {
      }
    },

    Created() {
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* 





| Microbiology Provjera





*/
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */

      this.MicrobiologyOrder = false;

      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* 





End of Microbiology Provjera |





*/
      /* -- */
      /* -- */
      /* -- */
      /* -- */
      /* -- */

      http
        .get(
          "rezultati/odobravanje/samples/" +
            this.$route.params.patient +
            "/" +
            this.$route.params.id +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site +
            "&date=" +
            this.$route.query.date,
          {}
        )
        .then((res) => {
          this.header =
            // "Obrada rezultata za pacijenta: " +
            res.data.results[0].patient.ime +
            " " +
            res.data.results[0].patient.prezime;
          this.lokacija = res.data.lokacija;
          this.klijent = res.data.results[0].customer;
          // console.log(this.klijent);
          this.final_pdf = res.data.final_pdf;

          this.analyser_patient = res.data.results[0].patient;

          this.timestamp = res.data.results[0].timestamp;

          this.pacijent = res.data.results[0].patient._id;
          this.ime = res.data.results[0].patient.ime;
          this.prezime = res.data.results[0].patient.prezime;
          this.note = res.data.results[0].patient.note.trim();
          this.noteInit = res.data.results[0].patient.note.trim();

          // console.log("Bilješka o pacijentu:")
          // console.log(this.note)
          this.data_spol = res.data.results[0].patient.spol;
          this.jmbg = res.data.results[0].patient.jmbg;
          this.pid = res.data.results[0].sample.pid;

          this.samplesid = res.data.results[0].sample.id;

          // if (this.lokacija.sendEmail) {
          //   this.email = this.lokacija.email;
          // } else {
          //   this.email = res.data.results[0].patient.email.trim();
          // }

          this.email = res.data.results[0].patient.email.trim();

          this.email_tmp = res.data.results[0].patient.email.trim();

          // Starost

          var str = "";
          var tmp = "";
          var jmbgDan = this.jmbg.slice(0, 2);
          var jmbgMjesec = this.jmbg.slice(2, 4);
          var jmbgGodina = this.jmbg.slice(4, 7);

          if (jmbgGodina[0] === "9") {
            str = "1";
            tmp = jmbgGodina;
            jmbgGodina = str.concat(tmp);
          } else if (jmbgGodina[0] === "0") {
            str = "2";
            tmp = jmbgGodina;
            jmbgGodina = str.concat(tmp);
          } else {
            // console.warn("Invalid year...");
          }

          var date = jmbgGodina + "-" + jmbgMjesec + "-" + jmbgDan;
          var jmbgObj = this.parse_date(date);
          var zGodina = jmbgObj.years + 1;
          this.starost = zGodina;

          //

          if (!this.Email(this.email)) {
            this.email = "";
            this.email_tmp = "";
          }

          this.count = res.data.results.length;
          this.approved = 0;
          this.verified = 0;

          this.odobren = true;
          this.verificiran = true;
          this.partials = [];
          this.partials_condition = false;

          res.data.results.forEach((element) => {
            if (element.verificiran) {
              this.verified++;
              this.partials.push(element._id);
            }
            if (
              element.status === "ODOBREN" ||
              element.status === "VERIFICIRAN"
            ) {
              this.approved++;
            }
            if (
              element.status != "ODOBREN" &&
              element.status != "VERIFICIRAN"
            ) {
              this.odobren = false;
            }
            if (!element.verificiran) {
              this.verificiran = false;
            }
          });

          if (this.count > this.verified && this.verified > 1) {
            this.partials_condition = true;
          }

          this.uzorci = [];

          this.nalaz.patient = res.data.results[0].patient._id;
          this.nalaz.samples = [];

          res.data.results.forEach((element) => {
            var check = 0;
            var zaprimljen = 0;
            var realizovan = 0;

            if (element.verificiran) {
              var status_uzorka = "VERIFICIRAN";
            } else {
              var status_uzorka = element.status;
            }

            this.nalaz.samples.push(element._id);

            element.rezultati.forEach((test) => {
              check++;

              if (test.rezultat[test.rezultat.length - 1].rezultat_f === "") {
                zaprimljen++;
              }

              if (test.rezultat[test.rezultat.length - 1].rezultat_f != "") {
                realizovan++;
              }

              if (check === element.rezultati.length) {
                /* -- */
                /* -- */
                /* -- */
                /* -- */
                /* -- */
                /* 





| Microbiology Provjera





*/
                /* -- */
                /* -- */
                /* -- */
                /* -- */
                /* -- */

                if (element.sample.tip.includes("Mikrobiologija")) {
                  this.MicrobiologyOrder = true;
                }

                /* -- */
                /* -- */
                /* -- */
                /* -- */
                /* -- */
                /* 





End of Microbiology Provjera |





*/
                /* -- */
                /* -- */
                /* -- */
                /* -- */
                /* -- */

                // console.log("Provjera: Created")

                if (status_uzorka === "VERIFICIRAN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "VERIFICIRAN",
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                } else if (status_uzorka === "ODOBREN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "ODOBREN",
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                } else if (zaprimljen < 1) {
                  this.uzorci.push({
                    sid: element.id,
                    status: "REALIZOVAN",
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                } else if (realizovan < 1) {
                  var stat = "U OBRADI";
                  if (element.sample.tip.includes("Mikrobiologija")) {
                    if (element.rezultati[0].rezultat[0].rezultat_m.length) {
                      stat = "REALIZOVAN";
                    }
                  }
                  this.uzorci.push({
                    sid: element.id,
                    status: stat,
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                } else {
                  this.uzorci.push({
                    sid: element.id,
                    status: "U OBRADI",
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                }
              }
            });
          });

          this.uzorci = this.uzorci.sort(function (a, b) {
            return a.sid.localeCompare(b.sid, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          });
          this.main = true;

          this.pagination = true;

          http
            .get(
              "/rezultati/pagination" +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&pid=" +
                this.$route.params.id +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then((res) => {
              // res.data.rezultati = res.data.rezultati.sort(function (a, b) {
              //   return a.pid.localeCompare(b.pid, undefined, {
              //     numeric: true,
              //     sensitivity: "base",
              //   });
              // });

              // this.data_length =
              //   res.data.rezultati[res.data.rezultati.length - 1].pid;
              // this.data_min = res.data.rezultati[0].pid;
              // if (Object.getOwnPropertyNames(res.data).length === 0) {
              //   // console.warn("No data.");

              //   this.pagination = true;
              // } else {
              //   this.data_pid = res.data.data.pid;
              //   this.Results = res.data.rezultati;
              // }

              /* -- */
              /* -- */
              /* -- */
              /* -- */
              /* -- */
              /* 





| Microbiology Get Bakterije, Antibiograme i Antibiotike





*/
              /* -- */
              /* -- */
              /* -- */
              /* -- */
              /* -- */

              if (this.MicrobiologyOrder) {
                http
                  .get(
                    "mikrobiologija/bakterije/get?token=" +
                      this.$store.state.token +
                      "&site=" +
                      this.$store.state.site,
                    {}
                  )
                  .then((res) => {
                    this.Bacteries = res.data.bakterije;
                    http
                      .get(
                        "mikrobiologija/antibiogrami/get?token=" +
                          this.$store.state.token +
                          "&site=" +
                          this.$store.state.site,
                        {}
                      )
                      .then((res) => {
                        this.Antibiograms = res.data.antibiogrami;

                        this.Antibiograms.sort(function (a, b) {
                          return a.naziv.localeCompare(b.naziv, undefined, {
                            numeric: true,
                            sensitivity: "base",
                          });
                        });

                        http
                          .get(
                            "mikrobiologija/antibiotici/get?token=" +
                              this.$store.state.token +
                              "&site=" +
                              this.$store.state.site,
                            {}
                          )
                          .then((res) => {
                            res.data.antibiotici.sort(function (a, b) {
                              return a.rbr_a.localeCompare(b.rbr_a, undefined, {
                                numeric: true,
                                sensitivity: "base",
                              });
                            });

                            this.Antibiotics = [];

                            res.data.antibiotici.forEach((element) => {
                              element.chosen = false;
                              element.disabled = false;
                              this.Antibiotics.push(element);
                            });
                          });
                      });
                  });
              }

              /* -- */
              /* -- */
              /* -- */
              /* -- */
              /* -- */
              /* 





End of Microbiology Get Bakterije, Antibiograme i Antibiotike |





*/
              /* -- */
              /* -- */
              /* -- */
              /* -- */
              /* -- */
            });
        });
    },

    Povratak() {
      router.push("/lpobrada/pregled/" + "?sekcija=" + "Obrada uzoraka: COVID 19 RT LAMP Test");
    },

    Nazad() {
      this.email_button = false;
      this.main = true;
      this.pdf = false;
    },

    Email: function (email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    },

    parse_date: function (date) {
      // Takes one string parameter -- date in YYYY-MM-DD
      date = date.split("-");
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth() + 1;
      var day = today.getDate();
      var yy = parseInt(date[0]);
      var mm = parseInt(date[1]);
      var dd = parseInt(date[2]);
      var years, months, days;
      // months
      months = month - mm;
      if (day < dd) {
        months = months - 1;
      }
      // years
      years = year - yy;
      if (month * 100 + day < mm * 100 + dd) {
        years = years - 1;
        months = months + 12;
      }
      // days
      days = Math.floor(
        (today.getTime() -
          new Date(yy + years, mm + months - 1, dd).getTime()) /
          (24 * 60 * 60 * 1000)
      );
      //
      return { years: years, months: months, days: days };
    },

    GetSingleSample(data) {
      // "_id" : ObjectId("5f6ca517e4d760238841bba3"), db.getCollection('LabAssays').find({"naziv" : "Starost"})

      this.testovi = [];
      this.rezultati = [];
      this.analitiprikaz = [];
      this.calculated = false;

      var topcije = null;
      topcije = izbornik.rez;

      this.show_table = false;

      http
        .get(
          "rezultati/showsingle/" +
            data.sid +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then((res) => {
          var test = {};

          if (res.data.data.length) {
            res.data.data.sort(function (a, b) {
              return a.testovi.labassay.grupa + a.testovi.labassay.grouporder ==
                b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                ? 0
                : +(
                    a.testovi.labassay.grupa + a.testovi.labassay.grouporder >
                    b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                  ) || -1;
            });

            this.testovi = res.data.data;
            this.analitiprikaz = res.data.multidata;

            // console.log(this.analitiprikaz);

            res.data.data.forEach((element) => {
              test = {};
              test.realizovan = false;

              test.ime = element.testovi.labassay.naziv;
              test.test = element.testovi.labassay.sifra;
              test.analit = element.testovi.labassay.analit;
              test.IDE = element.testovi._id;
              test.labassay_id = element.testovi.labassay._id;

              test.multi_count = 0;
              test.multi_rezultati = [];

              res.data.multidata.forEach((multi) => {
                if (multi.labassay._id === element.testovi.labassay._id) {
                  test.multi_rezultati = multi.rezultat;
                  test.multi_count = multi.rezultat[0].rezultat.length;
                }
              });

              test.kategorija = element.testovi.labassay.kategorija;
              test.analyser = element.testovi.labassay.analyser;
              test.multiparam = element.testovi.labassay.multiparam;
              test.vise = element.testovi.rezultat.length;
              test.calculated = element.testovi.labassay.calculated;
              test.manual = element.testovi.labassay.manual;

              test.select_options = eval(
                "topcije." +
                  element.testovi.interp
                    .replace("%", "_")
                    .replace("/", "_")
                    .replace(" ", "_")
                    .replace(/-/g, "_")
                    .replace("#", "_")
                    // .replace(/[0-9]/g, "_")
                    .replace(/^\d+/, "")
              );

              element.testovi.rezultat.forEach((rezultat) => {
                test.sekcija = rezultat.anaassay.sekcija;

                if (
                  rezultat.anaassay.test === "5f6ca517e4d760238841bba3" &&
                  rezultat.rezultat_f.trim() == ""
                ) {
                  // console.log("Starost pacijenta: " + this.starost);
                  test.rezultat = JSON.stringify(this.starost);
                } else {
                  test.rezultat = rezultat.rezultat_f;
                }

                test.result = rezultat;
                test.anaassay = rezultat.anaassay;

                if (rezultat.rezultat_f != "") {
                  test.realizovan = true;
                }

                test.unit = rezultat.jedinice_f;

                if (res.data.verificiran || res.data.status === "ODOBREN") {
                  test.odobren = "ODOBREN";
                  test.edit = false;
                } else {
                  test.odobren != "ODOBREN";
                  test.edit = true;
                }

                test.jedinica = rezultat.jedinice_f;
                test.id = rezultat._id;
                test.multidata = element.testovi.labassay.multi;
                test.rezultat_m = rezultat.rezultat_m;
                test.bakterije = element.testovi.labassay.bakterije;
                test.neg_description = element.testovi.labassay.neg_description;
                test.pos_description = element.testovi.labassay.pos_description;
                test.refSet = element.testovi.grupa;
                test.dRef = element.testovi.refd;
                test.gRef = element.testovi.refg;
                test.interp = element.testovi.interp;
                test.extend = element.testovi.extend;
                test.retest = element.testovi.retest;
                test.interpretacija = element.testovi.labassay.interpretacija;
              });

              if (
                test.select_options != undefined &&
                !test.select_options.includes(test.rezultat)
              ) {
                test.select_options.unshift(test.rezultat);
              }
              this.rezultati.push(test);
            });

            /* -- */
            /* -- */
            /* -- */
            /* -- */
            /* -- */
            /* 





| Microbiology Sample Check





*/
            /* -- */
            /* -- */
            /* -- */
            /* -- */
            /* -- */

            // if (this.MicrobiologySample && this.AllowGetSample) {
            if (this.MicrobiologySample) {
              // On first Click
              // console.warn("Microbiology sample check.");

              var bakterioloski = false;
              var negativan = false;
              var pozitivan = false;
              var bakterijed = [];
              var bakterijei = [];
              var neg_rezultati = [];
              var poz_rezultati = [];

              this.CurrentTest = this.rezultati[0].analit;

              neg_rezultati = [...this.rezultati[0].neg_description];
              poz_rezultati = [...this.rezultati[0].pos_description];

              if (this.rezultati[0].bakterije.length) {
                // console.log("Ima bakterije.");

                bakterioloski = true;

                var counter = 0;
                var ima = false;

                this.Bacteries.forEach((element) => {
                  element.chosen = false;
                  counter = 0;
                  ima = false;
                  this.rezultati[0].bakterije.forEach((bakt) => {
                    counter++;
                    if (element._id == bakt) {
                      ima = true;
                    }

                    if (
                      counter === this.rezultati[0].bakterije.length &&
                      !ima
                    ) {
                      bakterijed.push(element);
                    }

                    if (counter === this.rezultati[0].bakterije.length && ima) {
                      bakterijei.push(element);
                    }
                  });
                });

                switch (this.rezultati[0].rezultat_m.length) {
                  case 0:
                    // Ima definisan skup bakterija - Nema Rezultat
                    this.MicrobiologyScenario = "MAIBNoR";
                    this.SelectedBacteries = [];
                    break;
                  case 1:
                    // Ima definisan skup bakterija - Negativan Rezultat
                    this.MicrobiologyScenario = "MAIBNeR";
                    this.SelectedBacteries = [];

                    negativan = true;

                    if (
                      !neg_rezultati.includes(this.rezultati[0].rezultat.trim())
                    ) {
                      neg_rezultati.unshift(this.rezultati[0].rezultat.trim());
                    }

                    break;

                  default:
                    // Ima definisan skup bakterija - Pozitivan Rezultat
                    this.MicrobiologyScenario = "MAIBPoR";
                    this.SelectedBacteries = [];
                    this.BacteryTabs = [];

                    this.rezultati[0].rezultat_m.forEach((element) => {
                      // console.log(element)
                      if (element.bakterija) {
                        this.SelectedBacteries.push(element);
                        this.BacteryTabs.push(element.opis);
                      }
                    });

                    // console.log("Izabrane bakterije:");
                    // console.log(this.SelectedBacteries);

                    let maxVal = this.SelectedBacteries.reduce((max, val) =>
                      max.antibiogram.antibiotici.length >
                      val.antibiogram.antibiotici.length
                        ? max
                        : val
                    );

                    if (this.CurrentTab == "") {
                      // this.CurrentTab = maxVal.opis;
                    }
                    this.CurrentTab = this.SelectedBacteries[0].opis;

                    bakterijed.forEach((element) => {
                      this.SelectedBacteries.forEach((bact) => {
                        if (element._id == bact._id) {
                          element.chosen = true;
                        }
                      });
                    });

                    bakterijei.forEach((element) => {
                      this.SelectedBacteries.forEach((bact) => {
                        if (element._id == bact._id) {
                          element.chosen = true;
                        }
                      });
                    });

                    pozitivan = true;
                    if (
                      !poz_rezultati.includes(this.rezultati[0].rezultat.trim())
                    ) {
                      poz_rezultati.unshift(this.rezultati[0].rezultat.trim());
                    }

                    break;
                }
              } else {
                bakterioloski = false;

                // console.log("Nema bakterije.");

                this.SelectedBacteries = [];

                switch (this.rezultati[0].rezultat_m.length) {
                  case 0:
                    // Nema definisan skup bakterija - Nema Rezultat
                    this.MicrobiologyScenario = "MANBNoR";
                    neg_rezultati = this.rezultati[0].neg_description;
                    poz_rezultati = this.rezultati[0].pos_description;

                    break;

                  case 1:
                    if (this.rezultati[0].rezultat_m[0].negativan === true) {
                      // Nema definisan skup bakterija - Negativan Rezultat
                      this.MicrobiologyScenario = "MANBNeR";

                      negativan = true;

                      if (
                        !neg_rezultati.includes(
                          this.rezultati[0].rezultat.trim()
                        )
                      ) {
                        neg_rezultati.unshift(
                          this.rezultati[0].rezultat.trim()
                        );
                      }
                    } else {
                      // Nema definisan skup bakterija - Pozitivan Rezultat
                      this.MicrobiologyScenario = "MANBPoR";

                      pozitivan = true;

                      if (
                        !poz_rezultati.includes(
                          this.rezultati[0].rezultat.trim()
                        )
                      ) {
                        poz_rezultati.unshift(
                          this.rezultati[0].rezultat.trim()
                        );
                      }
                    }

                    break;

                  default:
                    // Error
                    this.MicrobiologyScenario = "Unknown";

                    break;
                }
              }

              this.MicrobiologyResult = {
                negative: negativan,
                positive: pozitivan,
                BUG: bakterioloski,
                F_RESULT: this.rezultati[0].rezultat,
                M_RESULT: [...this.rezultati[0].rezultat_m],
                DefaultBacteries: [...bakterijei],
                RemainingBacteries: [...bakterijed],
                NegativeDescriptions: [...neg_rezultati],
                PositiveDescriptions: [...poz_rezultati],
              };
              // console.log(this.MicrobiologyResult)
            } else {
              // console.log("Uzorak nije mikrobiološki || Sample closed");

              this.MicrobiologyScenario = "Unknown";

              this.MicrobiologyResult = {
                negative: null,
                positive: null,
                BUG: null,
                F_RESULT: "",
                M_RESULT: [],
                DefaultBacteries: [],
                RemainingBacteries: [],
                NegativeDescriptions: [],
                PositiveDescriptions: [],
              };
            }

            /* -- */
            /* -- */
            /* -- */
            /* -- */
            /* -- */
            /* 





End of Microbiology Sample Check |





*/
            /* -- */
            /* -- */
            /* -- */
            /* -- */
            /* -- */

            this.rezultati.forEach((element) => {
              if (element.calculated) {
                this.calculated = true;
              }
            });

            this.sample = data;
            this.show_table = true;
          }
        })
        .then(() => {
          bus.$emit("SetClientHeight", data.sid);
        });
    },

    /* GetAnalysers() {
      http
        .get(
          "postavke/aparat/listall?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then(res => {
          if (res.data.success === false) {
          } else {
            res.data.aparati.forEach(element => {
              if (element.tip === "IMUNOHEMIJSKI") {
                element.selected = false;
                this.analysers.push(element);
              }
            });
          }
        });
    }, */

    SelectAnalyser(test) {
      http
        .get(
          "rezultati/odobravanje/analysers" +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site +
            "&test=" +
            test.labassay_id,
          {}
        )
        .then((res) => {
          this.analysers = [];

          res.data.anaassays.forEach((element) => {
            element.aparat.site = element.site;
            this.analysers.push(element.aparat);
          });

          this.analysers.forEach((analyser) => {
            analyser.selected = false;
          });

          this.analiza = test;

          this.rezultati.forEach((element) => {
            this.analysers.forEach((analyser) => {
              if (
                element.ime === this.analiza.ime &&
                element.anaassay.aparat === analyser._id
              ) {
                analyser.selected = true;
                this.analyser_selected = analyser;
              }
            });
          });
          this.$refs.staticModalAparati.open();
        });
    },

    AnalyserSelected(analyser) {
      this.analyser = analyser;

      if (this.analyser_selected._id === analyser._id) {
        this.$refs.staticModalAparati.close();

        // console.warn("No change required.");
      } else {
        http
          .post("rezultati/odobravanje/references", {
            token: this.$store.state.token,
            site: this.$store.state.site,
            id: this.sample.sid,
            pacijent: this.analyser_patient,
            analiza: this.analiza,
            analyser: this.analyser,
          })
          .then((res) => {
            if (res.data.success) {
              var data = {};

              this.uzorci.forEach((element) => {
                if (element.sid === this.$store.state.sid) {
                  data = element;
                }
              });

              this.testovi = [];
              this.rezultati = [];
              this.analitiprikaz = [];
              this.calculated = false;

              var topcije = null;
              topcije = izbornik.rez;

              this.show_table = false;

              http
                .get(
                  "rezultati/showsingle/" +
                    data.sid +
                    "?token=" +
                    this.$store.state.token +
                    "&site=" +
                    this.$store.state.site,
                  {}
                )
                .then((res) => {
                  var test = {};

                  if (res.data.data.length) {
                    res.data.data.sort(function (a, b) {
                      return a.testovi.labassay.grupa +
                        a.testovi.labassay.grouporder ==
                        b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                        ? 0
                        : +(
                            a.testovi.labassay.grupa +
                              a.testovi.labassay.grouporder >
                            b.testovi.labassay.grupa +
                              b.testovi.labassay.grouporder
                          ) || -1;
                    });

                    this.testovi = res.data.data;
                    this.analitiprikaz = res.data.multidata;

                    res.data.data.forEach((element) => {
                      test = {};
                      test.realizovan = false;

                      test.ime = element.testovi.labassay.naziv;
                      test.test = element.testovi.labassay.sifra;
                      test.analit = element.testovi.labassay.analit;
                      test.IDE = element.testovi._id;
                      test.labassay_id = element.testovi.labassay._id;

                      test.multi_count = 0;
                      test.multi_rezultati = [];

                      res.data.multidata.forEach((multi) => {
                        if (
                          multi.labassay._id === element.testovi.labassay._id
                        ) {
                          test.multi_rezultati = multi.rezultat;
                          test.multi_count = multi.rezultat[0].rezultat.length;
                        }
                      });

                      test.kategorija = element.testovi.labassay.kategorija;
                      test.analyser = element.testovi.labassay.analyser;
                      test.multiparam = element.testovi.labassay.multiparam;
                      test.vise = element.testovi.rezultat.length;
                      test.calculated = element.testovi.labassay.calculated;
                      test.manual = element.testovi.labassay.manual;

                      test.select_options = eval(
                        "topcije." +
                          element.testovi.interp
                            .replace("%", "_")
                            .replace("/", "_")
                            .replace(" ", "_")
                            .replace(/-/g, "_")
                            .replace("#", "_")
                            // .replace(/[0-9]/g, "_")
                            .replace(/^\d+/, "")
                      );

                      element.testovi.rezultat.forEach((rezultat) => {
                        test.sekcija = rezultat.anaassay.sekcija;
                        test.rezultat = rezultat.rezultat_f;
                        test.result = rezultat;
                        test.anaassay = rezultat.anaassay;

                        if (rezultat.rezultat_f != "") {
                          test.realizovan = true;
                        }

                        test.unit = rezultat.jedinice_f;

                        if (
                          res.data.verificiran ||
                          res.data.status === "ODOBREN"
                        ) {
                          test.odobren = "ODOBREN";
                          test.edit = false;
                        } else {
                          test.odobren != "ODOBREN";
                          test.edit = true;
                        }

                        test.jedinica = rezultat.jedinice_f;
                        test.id = rezultat._id;
                        test.multidata = element.testovi.labassay.multi;
                        test.rezultat_m = rezultat.rezultat_m;
                        test.bakterije = element.testovi.labassay.bakterije;
                        test.neg_description =
                          element.testovi.labassay.neg_description;
                        test.pos_description =
                          element.testovi.labassay.pos_description;
                        test.refSet = element.testovi.grupa;
                        test.dRef = element.testovi.refd;
                        test.gRef = element.testovi.refg;
                        test.interp = element.testovi.interp;
                        test.extend = element.testovi.extend;
                        test.retest = element.testovi.retest;
                        test.interpretacija =
                          element.testovi.labassay.interpretacija;
                      });

                      if (
                        test.select_options != undefined &&
                        !test.select_options.includes(test.rezultat)
                      ) {
                        test.select_options.unshift(test.rezultat);
                      }
                      this.rezultati.push(test);
                    });

                    this.rezultati.forEach((element) => {
                      if (element.calculated) {
                        this.calculated = true;
                      }
                    });

                    this.sample = data;
                    this.show_table = true;
                  }
                });
              this.$refs.staticModalAparati.close();
            } else {
              // console.warn(res.data.message);
              // this.$refs.staticModalAparati.close();
            }
          });
      }
    },

    Reference(event, test) {
      this.reference = {
        sample: this.$store.state.sid,
        labassay: test.labassay_id,
        naziv: test.ime,
        opis: test.analit,
        dref: test.dRef,
        gref: test.gRef,
        interp: test.interp,
        extend: test.extend,
        jedinica: test.jedinica,
      };
      this.$refs.staticModalReference.open();
    },

    BarcodePrint(data) {
      var link = barcode + data.sid + ".png";

      http
        .get(
          "uzorci/barcode/" +
            data.sid +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {}
        )
        .then((res) => {
          // console.log(res.data)
          printEPL(
            res.data.name + " " + res.data.surname,
            data.sid,
            res.data.pacijentRBr,
            res.data.godiste,
            res.data.datum,
            link,
            res.data.code,
            this.$store.state.site,
            res.data.prioritet,
            res.data.protokol,
            res.data.purpose,
            res.data.izdavanje
          );
        });
    },

    SaveResults(rezultati, from) {
      // Vue Loading Overlay Component
      this.isLoading = true;

      if (!this.MicrobiologySample) {
        rezultati.forEach((element) => {
          element.rezultat = element.rezultat.replace(/,/g, ".");
        });

        rezultati[0].rezultat_m = [];
      }

      http
        .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: rezultati,
        })
        .then((res) => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then((res) => {
              this.uzorci = [];

              res.data.results.forEach((element) => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach((test) => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    // console.log("Provjera: Save (single)")

                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (realizovan < 1) {
                      var stat = "U OBRADI";
                      if (element.sample.tip.includes("Mikrobiologija")) {
                        if (
                          element.rezultati[0].rezultat[0].rezultat_m.length
                        ) {
                          stat = "REALIZOVAN";
                        }
                      }
                      this.uzorci.push({
                        sid: element.id,
                        status: stat,
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function (a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base",
                });
              });

              // Vue Loading Overlay Component
              this.isLoading = false;
            });
        });
    },

    DeletedSample(data) {

      router.push("/lpobrada/pregled");

      // this.uzorci.forEach((element) => {
      //   if (element.sid === data) {
      //     element.removed = false;
      //   }
      // });

      // for (var i = 0; i < this.uzorci.length; i++) {
      //   if (this.uzorci[i].sid === data) {
      //     this.uzorci.splice(i, 1);
      //     break;
      //   }
      // }

      // if (this.uzorci.length) {
      //   this.show = false;
      //   this.main = false;
      //   http
      //     .get(
      //       "rezultati/odobravanje/samples/" +
      //         this.$route.params.patient +
      //         "/" +
      //         this.$route.params.id +
      //         "?token=" +
      //         this.$store.state.token +
      //         "&site=" +
      //         this.$store.state.site +
      //         "&date=" +
      //         this.$route.query.date,
      //       {}
      //     )
      //     .then((res) => {
      //       this.count = res.data.results.length;
      //       this.approved = 0;

      //       this.odobren = true;
      //       this.verificiran = true;

      //       this.resdata = {};

      //       this.resdata = res.data.results;

      //       res.data.results.forEach((element) => {
      //         if (
      //           element.status === "ODOBREN" ||
      //           element.status === "VERIFICIRAN"
      //         ) {
      //           this.approved++;
      //         }
      //         if (
      //           element.status != "ODOBREN" &&
      //           element.status != "VERIFICIRAN"
      //         ) {
      //           this.odobren = false;
      //         }
      //         if (!element.verificiran) {
      //           this.verificiran = false;
      //         }
      //       });

      //       if (this.count == this.approved) {
      //         var report = [];

      //         this.uzorci.forEach((element) => {
      //           report.push(element._id);
      //         });

      //         http
      //           .post("nalazi/create", {
      //             token: this.$store.state.token,
      //             site: this.$store.state.site,
      //             type: "multi",
      //             uzorci: this.uzorci,
      //             samples: report,
      //             timestamp: this.timestamp,
      //             napomena: "",
      //             status: false,
      //             idNalaza: "",
      //             location: "/",
      //             klijent: this.klijent,
      //             naziv: this.timestamp,
      //           })
      //           .then((res) => {
      //             if (res.data.success) {
      //               http
      //                 .post("nalazi/memo", {
      //                   token: this.$store.state.token,
      //                   site: this.$store.state.site,
      //                   timestamp: this.timestamp,
      //                   height: res.data.memo,
      //                   location: "/",
      //                   naziv: this.timestamp,
      //                 })
      //                 .then((res) => {
      //                   this.final_pdf = true;

      //                   this.uzorci = [];

      //                   this.resdata.forEach((element) => {
      //                     var check = 0;
      //                     var zaprimljen = 0;
      //                     var realizovan = 0;

      //                     if (element.verificiran) {
      //                       var status_uzorka = "VERIFICIRAN";
      //                     } else {
      //                       var status_uzorka = element.status;
      //                     }

      //                     element.rezultati.forEach((test) => {
      //                       check++;

      //                       if (
      //                         test.rezultat[test.rezultat.length - 1]
      //                           .rezultat_f === ""
      //                       ) {
      //                         zaprimljen++;
      //                       }

      //                       if (
      //                         test.rezultat[test.rezultat.length - 1]
      //                           .rezultat_f != ""
      //                       ) {
      //                         realizovan++;
      //                       }

      //                       if (check === element.rezultati.length) {
      //                         // console.log("Provjera: Sample Delete")

      //                         if (status_uzorka === "VERIFICIRAN") {
      //                           this.uzorci.push({
      //                             sid: element.id,
      //                             status: "VERIFICIRAN",
      //                             pdf_exists: element.pdf_exists,
      //                             tip: element.sample.tip,
      //                             _id: element._id,
      //                             removed: false,
      //                           });
      //                         } else if (status_uzorka === "ODOBREN") {
      //                           this.uzorci.push({
      //                             sid: element.id,
      //                             status: "ODOBREN",
      //                             pdf_exists: element.pdf_exists,
      //                             tip: element.sample.tip,
      //                             _id: element._id,
      //                             removed: false,
      //                           });
      //                         } else if (zaprimljen < 1) {
      //                           this.uzorci.push({
      //                             sid: element.id,
      //                             status: "REALIZOVAN",
      //                             pdf_exists: element.pdf_exists,
      //                             tip: element.sample.tip,
      //                             _id: element._id,
      //                             removed: false,
      //                           });
      //                         } else if (realizovan < 1) {
      //                           var stat = "U OBRADI";
      //                           if (
      //                             element.sample.tip.includes("Mikrobiologija")
      //                           ) {
      //                             if (
      //                               element.rezultati[0].rezultat[0].rezultat_m
      //                                 .length
      //                             ) {
      //                               stat = "REALIZOVAN";
      //                             }
      //                           }
      //                           this.uzorci.push({
      //                             sid: element.id,
      //                             status: stat,
      //                             pdf_exists: element.pdf_exists,
      //                             tip: element.sample.tip,
      //                             _id: element._id,
      //                             removed: false,
      //                           });
      //                         } else {
      //                           this.uzorci.push({
      //                             sid: element.id,
      //                             status: "U OBRADI",
      //                             pdf_exists: element.pdf_exists,
      //                             tip: element.sample.tip,
      //                             _id: element._id,
      //                             removed: false,
      //                           });
      //                         }
      //                       }
      //                     });
      //                   });

      //                   this.uzorci = this.uzorci.sort(function (a, b) {
      //                     return a.sid.localeCompare(b.sid, undefined, {
      //                       numeric: true,
      //                       sensitivity: "base",
      //                     });
      //                   });

      //                   this.main = true;
      //                   this.show = true;
      //                 });
      //             }
      //           });
      //       } else {
      //         this.uzorci = [];

      //         res.data.results.forEach((element) => {
      //           var check = 0;
      //           var zaprimljen = 0;
      //           var realizovan = 0;

      //           if (element.verificiran) {
      //             var status_uzorka = "VERIFICIRAN";
      //           } else {
      //             var status_uzorka = element.status;
      //           }

      //           element.rezultati.forEach((test) => {
      //             check++;

      //             if (
      //               test.rezultat[test.rezultat.length - 1].rezultat_f === ""
      //             ) {
      //               zaprimljen++;
      //             }

      //             if (
      //               test.rezultat[test.rezultat.length - 1].rezultat_f != ""
      //             ) {
      //               realizovan++;
      //             }

      //             if (check === element.rezultati.length) {
      //               // console.log("Provjera: Sample Delete")

      //               if (status_uzorka === "VERIFICIRAN") {
      //                 this.uzorci.push({
      //                   sid: element.id,
      //                   status: "VERIFICIRAN",
      //                   pdf_exists: element.pdf_exists,
      //                   tip: element.sample.tip,
      //                   _id: element._id,
      //                   removed: false,
      //                 });
      //               } else if (status_uzorka === "ODOBREN") {
      //                 this.uzorci.push({
      //                   sid: element.id,
      //                   status: "ODOBREN",
      //                   pdf_exists: element.pdf_exists,
      //                   tip: element.sample.tip,
      //                   _id: element._id,
      //                   removed: false,
      //                 });
      //               } else if (zaprimljen < 1) {
      //                 this.uzorci.push({
      //                   sid: element.id,
      //                   status: "REALIZOVAN",
      //                   pdf_exists: element.pdf_exists,
      //                   tip: element.sample.tip,
      //                   _id: element._id,
      //                   removed: false,
      //                 });
      //               } else if (realizovan < 1) {
      //                 var stat = "U OBRADI";
      //                 if (element.sample.tip.includes("Mikrobiologija")) {
      //                   if (
      //                     element.rezultati[0].rezultat[0].rezultat_m.length
      //                   ) {
      //                     stat = "REALIZOVAN";
      //                   }
      //                 }
      //                 this.uzorci.push({
      //                   sid: element.id,
      //                   status: stat,
      //                   pdf_exists: element.pdf_exists,
      //                   tip: element.sample.tip,
      //                   _id: element._id,
      //                   removed: false,
      //                 });
      //               } else {
      //                 this.uzorci.push({
      //                   sid: element.id,
      //                   status: "U OBRADI",
      //                   pdf_exists: element.pdf_exists,
      //                   tip: element.sample.tip,
      //                   _id: element._id,
      //                   removed: false,
      //                 });
      //               }
      //             }
      //           });
      //         });

      //         this.uzorci = this.uzorci.sort(function (a, b) {
      //           return a.sid.localeCompare(b.sid, undefined, {
      //             numeric: true,
      //             sensitivity: "base",
      //           });
      //         });

      //         this.main = true;
      //         this.show = true;
      //       }
      //     });
      // } else {
      //   router.push("/lpobrada/pregled");
      // }
    },

    EditSample(data) {
      document.getElementById(data).click();

      http
        .get(
          "rezultati/odobravanje/samples/" +
            this.$route.params.patient +
            "/" +
            this.$route.params.id +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site +
            "&date=" +
            this.$route.query.date,
          {}
        )
        .then((res) => {
          this.uzorci = [];

          res.data.results.forEach((element) => {
            var check = 0;
            var zaprimljen = 0;
            var realizovan = 0;

            if (element.verificiran) {
              var status_uzorka = "VERIFICIRAN";
            } else {
              var status_uzorka = element.status;
            }

            element.rezultati.forEach((test) => {
              check++;

              if (test.rezultat[test.rezultat.length - 1].rezultat_f === "") {
                zaprimljen++;
              }

              if (test.rezultat[test.rezultat.length - 1].rezultat_f != "") {
                realizovan++;
              }

              if (check === element.rezultati.length) {
                // console.log("Provjera: Edit")

                if (status_uzorka === "VERIFICIRAN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "VERIFICIRAN",
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                } else if (status_uzorka === "ODOBREN") {
                  this.uzorci.push({
                    sid: element.id,
                    status: "ODOBREN",
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                } else if (zaprimljen < 1) {
                  this.uzorci.push({
                    sid: element.id,
                    status: "REALIZOVAN",
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                } else if (realizovan < 1) {
                  var stat = "U OBRADI";
                  if (element.sample.tip.includes("Mikrobiologija")) {
                    if (element.rezultati[0].rezultat[0].rezultat_m.length) {
                      stat = "REALIZOVAN";
                    }
                  }
                  this.uzorci.push({
                    sid: element.id,
                    status: stat,
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                } else {
                  this.uzorci.push({
                    sid: element.id,
                    status: "U OBRADI",
                    pdf_exists: element.pdf_exists,
                    tip: element.sample.tip,
                    _id: element._id,
                    removed: false,
                  });
                }
              }
            });
          });

          this.uzorci = this.uzorci.sort(function (a, b) {
            return a.sid.localeCompare(b.sid, undefined, {
              numeric: true,
              sensitivity: "base",
            });
          });
        })
        .then(() => {
          setTimeout(() => {
            document.getElementById(this.$store.state.sid).click();
          }, 500);
        });
    },

    RetestEnable: function (event) {
      this.rezultati.forEach((element) => {
        if (element.test === event.target.id) {
          element.retest = true;
        }
      });

      this.save_retest = true;

      http
        .post("rezultati/odobravanje/retest/da/", {
          id_u: this.$store.state.sid,
          id_t: event.target.id,
          site: this.$store.state.site,
          token: this.$store.state.token,
        })
        .then((res) => {
          if (res.data.success) {
            this.rezultati.forEach((element) => {
              if (element.test === event.target.id) {
                element.retest = true;
              }
            });
          }
        });
    },

    RetestDisable: function (event) {
      this.rezultati.forEach((element) => {
        if (element.test === event.target.id) {
          element.retest = false;
        }
      });

      this.save_retest = true;

      http
        .post("rezultati/odobravanje/retest/ne/", {
          id_u: this.$store.state.sid,
          id_t: event.target.id,
          site: this.$store.state.site,
          token: this.$store.state.token,
        })
        .then((res) => {
          if (res.data.success) {
            this.rezultati.forEach((element) => {
              if (element.test === event.target.id) {
                element.retest = false;
              }
            });
          }
        });
    },

    MultiGet: function (event, naziv, ana, rezultat, odobren) {
      // Sediment urina
      // console.log(event.target.id)

      this.naslov = "Rezultati testa: " + naziv + " (" + ana + ")";
      this.analiti = [];
      var single = {};
      var i = 0;
      var kontrola = false;

      this.uzorci.forEach((element) => {
        if (element.sid === this.$store.state.sid) {
          this.check = element.status;
        }
      });

      this.analitiprikaz.forEach((element) => {
        i++;
        single = {};

        var opcije = null;
        opcije = izbornik.data;

        var noResult = true;

        if (event.target.id === element.labassay._id) {
          // console.log(element.labassay)
          element.rezultat.forEach((analit) => {
            if (analit.rezultat[0].rezultat_f.trim() != "") {
              noResult = false;
            }
          });
          // console.log(noResult)
        }

        if (event.target.id === element.labassay._id) {
          element.rezultat.forEach((analit) => {
            single.kod = analit.rezultat[0].module_sn;

            element.labassay.multiparam.forEach((mparam) => {
              if (mparam.kod === single.kod) {
                if (mparam.izbornik.length) {
                  // console.log(mparam.kod);
                  // console.log(mparam.izbornik);
                  single.select_options = mparam.izbornik;
                } else {
                  single.select_options = undefined;
                }
              }
            });

            /* single.select_options = eval(
              "opcije." +
                analit.rezultat[0].module_sn
                  .replace("%", "_")
                  .replace("/", "_")
                  .replace(" ", "_")
                  .replace(/-/g, "_")
                  .replace("#", "_")
                  // .replace(/[0-9]/g, "_")
                  .replace(/^\d+/, "")
            ); */

            var tmpOptionsAna = [];
            if (single.select_options != undefined) {
              tmpOptionsAna = single.select_options.slice();
              single.select_options = tmpOptionsAna.slice();
            }

            if (
              analit.rezultat[0].rezultat_f.trim() != "" &&
              single.select_options != undefined &&
              !single.select_options.includes(analit.rezultat[0].rezultat_f)
            ) {
              // Sediment urina (Epitelne ćelije, Kristali i Soli)
              if (
                single.kod != "s03" &&
                single.kod != "s04" &&
                single.kod != "s08" &&
                single.kod != "s09"
              ) {
                single.select_options.unshift(analit.rezultat[0].rezultat_f);
              }
            }

            single.refd = analit.refd;
            single.labID = event.target.id;
            single.refg = analit.refg;
            single.interp = analit.interp;
            single.interpretacija = null;
            single.nazivTesta = naziv;
            single.grupa = analit.grupa;
            single.naziv = analit.rezultat[0].sn;
            single.opis = analit.rezultat[0].dilucija;
            single.jedinica = analit.rezultat[0].jedinice_f;
            single.rezultat = analit.rezultat[0].rezultat_f;
            single.flag = analit.rezultat[0].rezultat_i;
            single.manual = element.labassay.manual;
            single.odobren = odobren;

            if (
              single.select_options != undefined &&
              (single.kod === "s03" ||
                single.kod === "s04" ||
                single.kod === "s08" ||
                single.kod === "s09")
            ) {
              // Sediment urina (Epitelne ćelije, Kristali i Soli)
              single.rezultat_multiple = single.rezultat.split(";");
              for (var i = single.rezultat_multiple.length - 1; i >= 0; i--) {
                single.rezultat_multiple[i] = single.rezultat_multiple[
                  i
                ].trim();
                if (single.rezultat_multiple[i] === "") {
                  single.rezultat_multiple.splice(i, 1);
                }
              }
            } else {
              single.rezultat_multiple = [];
            }

            if (this.check === "ODOBREN" || this.check === "VERIFICIRAN") {
              single.edit = false;
            } else {
              single.edit = true;
            }

            if (
              ana === "Opšti pregled urina" &&
              this.check != "ODOBREN" &&
              this.check != "VERIFICIRAN"
            ) {
              if (
                analit.rezultat[0].rezultat_f === "" &&
                single.select_options != undefined
              ) {
                if (noResult) {
                  single.rezultat = single.select_options[1];
                }
              }
            }

            single.analit = analit.rezultat[0].anaassay;
            single.izbor = ana;

            // Opšti pregled urina (Urobilinogen)
            if (single.kod === "o12" && single.rezultat.trim() === "") {
              if (noResult) {
                single.rezultat = "16";
              }
            }

            this.analiti.push(single);

            single = {};
          });
        }

        if (i === this.analitiprikaz.length) {
          kontrola = true;
        }
      });

      if (kontrola) {
        this.$refs.largeModalMulti.open();
      }
    },

    Interpretacija: function (
      test,
      rezultat,
      jedinica,
      refd,
      refg,
      site,
      interp,
      extend,
      spec
    ) {
      return Interpretation(
        test,
        rezultat,
        jedinica,
        refd,
        refg,
        site,
        interp,
        extend,
        spec
      );
    },

    MailDialog() {
      this.$refs.staticModalSendMail.open();
    },

    SendMail(email) {
      if (this.path.length === 14) {
        // ENG

        var a = this.path.substring(0, 10);
        var b = "/samples";
      } else if (this.path.length === 21) {
        // DE

        var a = this.path.substring(0, 17);
        var b = "/partials";
      } else {
        // BOS

        var a = this.timestamp;
        var b = "/";
      }
      // Vue Loading Overlay Component
      this.isLoading = true;

      http
        .post("nalazi/mail", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          email: email,
          timestamp: this.timestamp,
          location: b,
          naziv: a,
        })
        .then((res) => {
          // Vue Loading Overlay Component
          this.isLoading = false;

          if (res.data.success) {
            this.toastText = "Nalaz uspješno poslan.";
            this.toastIcon = "fa-check";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-primary";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: 2500,
              fullWidth: this.false,
              className: this.className,
            });

            if (this.email_changed) {
              // http
              //   .post("pacijenti/detalji/update/" + this.pacijent, {
              //     email: email.trim(),
              //     token: this.$store.state.token,
              //     site: this.$store.state.site,
              //   })
              //   .then((res) => {});
            }
          } else {
            this.toastText = "Greška prilikom slanja nalaza!";
            this.toastIcon = "fa-remove";
            this.toastPosition = "top-right";
            this.className = "vuestic-toast-danger";

            this.showToast(this.toastText, {
              icon: this.toastIcon,
              position: this.toastPosition,
              duration: 2500,
              fullWidth: this.false,
              className: this.className,
            });
          }
        });
    },

    SaveMultiResults(analiti, data) {
      analiti.forEach((analit) => {
        analit.rezultat = analit.rezultat.replace(/,/g, ".");

        if (analit.rezultat_multiple.length) {
          analit.rezultat = "";

          analit.rezultat_multiple.forEach((element) => {
            if (element === "") {
            } else {
              analit.rezultat = analit.rezultat + element + ";";
            }
          });

          analit.rezultat = analit.rezultat
            .trim()
            .slice(0, analit.rezultat.length - 1);
        }
      });

      // Vue Loading Overlay Component
      this.isLoading = true;

      http
        .post("/rezultati/odobravanje/analiti/" + this.$store.state.sid, {
          analiti: analiti,
          site: this.$store.state.site,
          token: this.$store.state.token,
        })
        .then((res) => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then((res) => {
              this.uzorci = [];

              res.data.results.forEach((element) => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach((test) => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    // console.log("Provjera: Save (multi)")

                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (realizovan < 1) {
                      var stat = "U OBRADI";
                      if (element.sample.tip.includes("Mikrobiologija")) {
                        if (
                          element.rezultati[0].rezultat[0].rezultat_m.length
                        ) {
                          stat = "REALIZOVAN";
                        }
                      }
                      this.uzorci.push({
                        sid: element.id,
                        status: stat,
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function (a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base",
                });
              });

              // Vue Loading Overlay Component
              this.isLoading = false;
            });
        })
        .then((res) => {
          var data = {};

          this.uzorci.forEach((element) => {
            if (element.sid === this.$store.state.sid) {
              data = element;
            }
          });

          this.testovi = [];
          this.rezultati = [];
          this.analitiprikaz = [];
          this.calculated = false;

          var topcije = null;
          topcije = izbornik.rez;

          this.show_table = false;

          http
            .get(
              "rezultati/showsingle/" +
                data.sid +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then((res) => {
              var test = {};

              if (res.data.data.length) {
                res.data.data.sort(function (a, b) {
                  return a.testovi.labassay.grupa +
                    a.testovi.labassay.grouporder ==
                    b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                    ? 0
                    : +(
                        a.testovi.labassay.grupa +
                          a.testovi.labassay.grouporder >
                        b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                      ) || -1;
                });

                this.testovi = res.data.data;
                this.analitiprikaz = res.data.multidata;

                res.data.data.forEach((element) => {
                  test = {};
                  test.realizovan = false;

                  test.ime = element.testovi.labassay.naziv;
                  test.test = element.testovi.labassay.sifra;
                  test.analit = element.testovi.labassay.analit;
                  test.IDE = element.testovi._id;
                  test.labassay_id = element.testovi.labassay._id;

                  test.multi_count = 0;
                  test.multi_rezultati = [];

                  res.data.multidata.forEach((multi) => {
                    if (multi.labassay._id === element.testovi.labassay._id) {
                      test.multi_rezultati = multi.rezultat;
                      test.multi_count = multi.rezultat[0].rezultat.length;
                    }
                  });

                  test.kategorija = element.testovi.labassay.kategorija;
                  test.analyser = element.testovi.labassay.analyser;
                  test.multiparam = element.testovi.labassay.multiparam;
                  test.vise = element.testovi.rezultat.length;
                  test.calculated = element.testovi.labassay.calculated;
                  test.manual = element.testovi.labassay.manual;

                  test.select_options = eval(
                    "topcije." +
                      element.testovi.interp
                        .replace("%", "_")
                        .replace("/", "_")
                        .replace(" ", "_")
                        .replace(/-/g, "_")
                        .replace("#", "_")
                        // .replace(/[0-9]/g, "_")
                        .replace(/^\d+/, "")
                  );

                  element.testovi.rezultat.forEach((rezultat) => {
                    test.sekcija = rezultat.anaassay.sekcija;
                    test.rezultat = rezultat.rezultat_f;
                    test.result = rezultat;
                    test.anaassay = rezultat.anaassay;

                    if (rezultat.rezultat_f != "") {
                      test.realizovan = true;
                    }

                    test.unit = rezultat.jedinice_f;

                    if (res.data.verificiran || res.data.status === "ODOBREN") {
                      test.odobren = "ODOBREN";
                      test.edit = false;
                    } else {
                      test.odobren != "ODOBREN";
                      test.edit = true;
                    }

                    test.jedinica = rezultat.jedinice_f;
                    test.id = rezultat._id;
                    test.multidata = element.testovi.labassay.multi;
                    test.rezultat_m = rezultat.rezultat_m;
                    test.bakterije = element.testovi.labassay.bakterije;
                    test.neg_description =
                      element.testovi.labassay.neg_description;
                    test.pos_description =
                      element.testovi.labassay.pos_description;
                    test.refSet = element.testovi.grupa;
                    test.dRef = element.testovi.refd;
                    test.gRef = element.testovi.refg;
                    test.interp = element.testovi.interp;
                    test.extend = element.testovi.extend;
                    test.retest = element.testovi.retest;
                    test.interpretacija =
                      element.testovi.labassay.interpretacija;
                  });

                  if (
                    test.select_options != undefined &&
                    !test.select_options.includes(test.rezultat)
                  ) {
                    test.select_options.unshift(test.rezultat);
                  }
                  this.rezultati.push(test);
                });

                this.rezultati.forEach((element) => {
                  if (element.calculated) {
                    this.calculated = true;
                  }
                });

                this.sample = data;
                this.show_table = true;
              }
            });
        });
    },

    Calculate: function (event, id, ime, edited) {
      http
        .post("/rezultati/odobravanje/calculate/" + this.$store.state.sid, {
          _id: id,
          token: this.$store.state.token,
          site: this.$store.state.site,
          ime: ime,
          pid: this.pid,
        })
        .then((res) => {
          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then((res) => {
              this.uzorci = [];

              res.data.results.forEach((element) => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach((test) => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    // console.log("Provjera: Calculate")

                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (realizovan < 1) {
                      var stat = "U OBRADI";
                      if (element.sample.tip.includes("Mikrobiologija")) {
                        if (
                          element.rezultati[0].rezultat[0].rezultat_m.length
                        ) {
                          stat = "REALIZOVAN";
                        }
                      }
                      this.uzorci.push({
                        sid: element.id,
                        status: stat,
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function (a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base",
                });
              });
            });
        })
        .then((res) => {
          var data = {};

          this.uzorci.forEach((element) => {
            if (element.sid === this.$store.state.sid) {
              data = element;
            }
          });

          this.testovi = [];
          this.rezultati = [];
          this.analitiprikaz = [];
          this.calculated = false;

          var topcije = null;
          topcije = izbornik.rez;

          http
            .get(
              "rezultati/showsingle/" +
                data.sid +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then((res) => {
              var test = {};

              if (res.data.data.length) {
                res.data.data.sort(function (a, b) {
                  return a.testovi.labassay.grupa +
                    a.testovi.labassay.grouporder ==
                    b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                    ? 0
                    : +(
                        a.testovi.labassay.grupa +
                          a.testovi.labassay.grouporder >
                        b.testovi.labassay.grupa + b.testovi.labassay.grouporder
                      ) || -1;
                });

                this.testovi = res.data.data;
                this.analitiprikaz = res.data.multidata;

                res.data.data.forEach((element) => {
                  test = {};
                  test.realizovan = false;

                  test.ime = element.testovi.labassay.naziv;
                  test.test = element.testovi.labassay.sifra;
                  test.analit = element.testovi.labassay.analit;
                  test.IDE = element.testovi._id;
                  test.labassay_id = element.testovi.labassay._id;

                  test.multi_count = 0;
                  test.multi_rezultati = [];

                  res.data.multidata.forEach((multi) => {
                    if (multi.labassay._id === element.testovi.labassay._id) {
                      test.multi_rezultati = multi.rezultat;
                      test.multi_count = multi.rezultat[0].rezultat.length;
                    }
                  });

                  test.kategorija = element.testovi.labassay.kategorija;
                  test.analyser = element.testovi.labassay.analyser;
                  test.multiparam = element.testovi.labassay.multiparam;
                  test.vise = element.testovi.rezultat.length;
                  test.calculated = element.testovi.labassay.calculated;
                  test.manual = element.testovi.labassay.manual;

                  test.select_options = eval(
                    "topcije." +
                      element.testovi.interp
                        .replace("%", "_")
                        .replace("/", "_")
                        .replace(" ", "_")
                        .replace(/-/g, "_")
                        .replace("#", "_")
                        // .replace(/[0-9]/g, "_")
                        .replace(/^\d+/, "")
                  );

                  element.testovi.rezultat.forEach((rezultat) => {
                    test.sekcija = rezultat.anaassay.sekcija;
                    test.rezultat = rezultat.rezultat_f;
                    test.result = rezultat;
                    test.anaassay = rezultat.anaassay;

                    if (rezultat.rezultat_f != "") {
                      test.realizovan = true;
                    }

                    test.unit = rezultat.jedinice_f;

                    if (res.data.verificiran || res.data.status === "ODOBREN") {
                      test.odobren = "ODOBREN";
                      test.edit = false;
                    } else {
                      test.odobren != "ODOBREN";
                      test.edit = true;
                    }

                    test.jedinica = rezultat.jedinice_f;
                    test.id = rezultat._id;
                    test.multidata = element.testovi.labassay.multi;
                    test.rezultat_m = rezultat.rezultat_m;
                    test.bakterije = element.testovi.labassay.bakterije;
                    test.neg_description =
                      element.testovi.labassay.neg_description;
                    test.pos_description =
                      element.testovi.labassay.pos_description;
                    test.refSet = element.testovi.grupa;
                    test.dRef = element.testovi.refd;
                    test.gRef = element.testovi.refg;
                    test.interp = element.testovi.interp;
                    test.extend = element.testovi.extend;
                    test.retest = element.testovi.retest;
                    test.interpretacija =
                      element.testovi.labassay.interpretacija;
                  });

                  if (
                    test.select_options != undefined &&
                    !test.select_options.includes(test.rezultat)
                  ) {
                    test.select_options.unshift(test.rezultat);
                  }
                  this.rezultati.push(test);
                });

                this.rezultati.forEach((element) => {
                  if (element.calculated) {
                    this.calculated = true;
                  }
                });

                this.sample = data;
              }
            });
        });
    },

    Approve(rezultati) {

      if (!this.$store.state.configuration.verify.rt) {
        this.$refs.staticModalVerifyPrivilege.open();
      } else if (this.rezultati[0].rezultat.trim() === ""){
        // console.log(this.rezultati)
        this.$refs.staticModalVerifyResult.open();
      } else{
        // Paste Code Here
        this.rezultati.forEach((element) => {
        element.edit = false;
      });

      this.calculated = false;

      if (!this.MicrobiologySample) {
        rezultati.forEach((element) => {
          element.rezultat = element.rezultat.replace(/,/g, ".");
        });

        rezultati[0].rezultat_m = [];
      }

      http
        .post("/rezultati/odobravanje/sacuvaj/" + this.$store.state.sid, {
          email: this.$store.state.userId,
          token: this.$store.state.token,
          site: this.$store.state.site,
          rezultati: rezultati,
        })
        .then((res) => {
          // Vue Loading Overlay Component
          this.isLoading = true;
          console.log("Odobravanje uzorka: " + this.$store.state.sid);

          http
            .post("/rezultati/odobravanje/odobri/" + this.$store.state.sid, {
              testovi: rezultati,
              site: this.$store.state.site,
              token: this.$store.state.token,
            })
            .then((res) => {
              console.log("Uzorak odobren.");

              this.sample.status = "ODOBREN";

              this.report = {};

              this.uzorci.forEach((element) => {
                if (element.sid === this.$store.state.sid) {
                  this.report = element;
                }
              });

              var sample = [];
              sample.push(this.report._id);

              // console.log("Kreiranje nalaza na njemačkom jeziku.")

              http
                .post("nalazi/create", {
                  token: this.$store.state.token,
                  site: this.$store.state.site,
                  type: "single",
                  uzorci: this.uzorci,
                  samples: sample,
                  timestamp: this.timestamp,
                  napomena: "",
                  status: false,
                  idNalaza: "",
                  location: "/samples",
                  klijent: this.klijent,
                  naziv: this.report.sid,
                })
                .then((res) => {
                  console.log("Kreiranje nalaza na engleskom jeziku.");

                  http
                    .get(
                      "rezultati/odobravanje/samples/" +
                        this.$route.params.patient +
                        "/" +
                        this.$route.params.id +
                        "?token=" +
                        this.$store.state.token +
                        "&site=" +
                        this.$store.state.site +
                        "&date=" +
                        this.$route.query.date,
                      {}
                    )
                    .then((res) => {
                      this.final_pdf = res.data.final_pdf;

                      this.count = res.data.results.length;
                      this.approved = 0;

                      this.odobren = true;
                      this.verificiran = true;

                      res.data.results.forEach((element) => {
                        if (
                          element.status === "ODOBREN" ||
                          element.status === "VERIFICIRAN"
                        ) {
                          this.approved++;
                        }
                        if (
                          element.status != "ODOBREN" &&
                          element.status != "VERIFICIRAN"
                        ) {
                          this.odobren = false;
                        }
                        if (!element.verificiran) {
                          this.verificiran = false;
                        }
                      });

                      var response = res.data.results;

                      console.warn("Kreirati nalaz na njemačkom jeziku.");

                      http
                        .post("nalazi/create", {
                          token: this.$store.state.token,
                          site: this.$store.state.site,
                          type: "partial",
                          uzorci: this.uzorci,
                          samples: sample,
                          timestamp: this.timestamp,
                          napomena: "",
                          status: false,
                          idNalaza: "",
                          location: "/partials",
                          klijent: this.klijent,
                          naziv: this.report.sid,
                        })
                        .then((res) => {
                          if (this.count == this.approved) {
                            // console.warn("Generate new Report.");

                            var report = [];

                            this.uzorci.forEach((element) => {
                              report.push(element._id);
                            });

                            console.log(
                              "Kreiranje nalaza na bosanskom jeziku."
                            );

                            http
                              .post("nalazi/create", {
                                token: this.$store.state.token,
                                site: this.$store.state.site,
                                type: "multi",
                                uzorci: this.uzorci,
                                samples: report,
                                timestamp: this.timestamp,
                                napomena: "",
                                status: false,
                                idNalaza: "",
                                location: "/",
                                klijent: this.klijent,
                                naziv: this.timestamp,
                              })
                              .then((res) => {
                                if (res.data.success) {
                                  http
                                    .post("nalazi/memo", {
                                      token: this.$store.state.token,
                                      site: this.$store.state.site,
                                      timestamp: this.timestamp,
                                      height: res.data.memo,
                                      location: "/",
                                      naziv: this.timestamp,
                                    })
                                    .then((res) => {
                                      this.uzorci = [];

                                      response.forEach((element) => {
                                        var check = 0;
                                        var zaprimljen = 0;
                                        var realizovan = 0;

                                        if (element.verificiran) {
                                          var status_uzorka = "VERIFICIRAN";
                                        } else {
                                          var status_uzorka = element.status;
                                        }

                                        element.rezultati.forEach((test) => {
                                          check++;

                                          if (
                                            test.rezultat[
                                              test.rezultat.length - 1
                                            ].rezultat_f === ""
                                          ) {
                                            zaprimljen++;
                                          }

                                          if (
                                            test.rezultat[
                                              test.rezultat.length - 1
                                            ].rezultat_f != ""
                                          ) {
                                            realizovan++;
                                          }

                                          if (
                                            check === element.rezultati.length
                                          ) {
                                            // console.log("Provjera: Approve")

                                            if (
                                              status_uzorka === "VERIFICIRAN"
                                            ) {
                                              this.uzorci.push({
                                                sid: element.id,
                                                status: "VERIFICIRAN",
                                                pdf_exists: element.pdf_exists,
                                                tip: element.sample.tip,
                                                _id: element._id,
                                                removed: false,
                                              });
                                            } else if (
                                              status_uzorka === "ODOBREN"
                                            ) {
                                              this.uzorci.push({
                                                sid: element.id,
                                                status: "ODOBREN",
                                                pdf_exists: element.pdf_exists,
                                                tip: element.sample.tip,
                                                _id: element._id,
                                                removed: false,
                                              });
                                            } else if (zaprimljen < 1) {
                                              this.uzorci.push({
                                                sid: element.id,
                                                status: "REALIZOVAN",
                                                pdf_exists: element.pdf_exists,
                                                tip: element.sample.tip,
                                                _id: element._id,
                                                removed: false,
                                              });
                                            } else if (realizovan < 1) {
                                              var stat = "U OBRADI";
                                              if (
                                                element.sample.tip.includes(
                                                  "Mikrobiologija"
                                                )
                                              ) {
                                                if (
                                                  element.rezultati[0]
                                                    .rezultat[0].rezultat_m
                                                    .length
                                                ) {
                                                  stat = "REALIZOVAN";
                                                }
                                              }
                                              this.uzorci.push({
                                                sid: element.id,
                                                status: stat,
                                                pdf_exists: element.pdf_exists,
                                                tip: element.sample.tip,
                                                _id: element._id,
                                                removed: false,
                                              });
                                            } else {
                                              this.uzorci.push({
                                                sid: element.id,
                                                status: "U OBRADI",
                                                pdf_exists: element.pdf_exists,
                                                tip: element.sample.tip,
                                                _id: element._id,
                                                removed: false,
                                              });
                                            }
                                          }
                                        });
                                      });

                                      this.uzorci = this.uzorci.sort(function (
                                        a,
                                        b
                                      ) {
                                        return a.sid.localeCompare(
                                          b.sid,
                                          undefined,
                                          {
                                            numeric: true,
                                            sensitivity: "base",
                                          }
                                        );
                                      });

                                      this.main = true;

                                      // Vue Loading Overlay Component

                                      // Eurofarm Centar
                                      // VERIFIKACIJA
                                      this.Verify(this.uzorci[0])
                                      // this.isLoading = false;
                                    });
                                }
                              });
                          } else {
                            this.uzorci = [];

                            res.data.results.forEach((element) => {
                              var check = 0;
                              var zaprimljen = 0;
                              var realizovan = 0;

                              if (element.verificiran) {
                                var status_uzorka = "VERIFICIRAN";
                              } else {
                                var status_uzorka = element.status;
                              }

                              element.rezultati.forEach((test) => {
                                check++;

                                if (
                                  test.rezultat[test.rezultat.length - 1]
                                    .rezultat_f === ""
                                ) {
                                  zaprimljen++;
                                }

                                if (
                                  test.rezultat[test.rezultat.length - 1]
                                    .rezultat_f != ""
                                ) {
                                  realizovan++;
                                }

                                if (check === element.rezultati.length) {
                                  // console.log("Provjera: Approve")

                                  if (status_uzorka === "VERIFICIRAN") {
                                    this.uzorci.push({
                                      sid: element.id,
                                      status: "VERIFICIRAN",
                                      pdf_exists: element.pdf_exists,
                                      tip: element.sample.tip,
                                      _id: element._id,
                                      removed: false,
                                    });
                                  } else if (status_uzorka === "ODOBREN") {
                                    this.uzorci.push({
                                      sid: element.id,
                                      status: "ODOBREN",
                                      pdf_exists: element.pdf_exists,
                                      tip: element.sample.tip,
                                      _id: element._id,
                                      removed: false,
                                    });
                                  } else if (zaprimljen < 1) {
                                    this.uzorci.push({
                                      sid: element.id,
                                      status: "REALIZOVAN",
                                      pdf_exists: element.pdf_exists,
                                      tip: element.sample.tip,
                                      _id: element._id,
                                      removed: false,
                                    });
                                  } else if (realizovan < 1) {
                                    var stat = "U OBRADI";
                                    if (
                                      element.sample.tip.includes(
                                        "Mikrobiologija"
                                      )
                                    ) {
                                      if (
                                        element.rezultati[0].rezultat[0]
                                          .rezultat_m.length
                                      ) {
                                        stat = "REALIZOVAN";
                                      }
                                    }
                                    this.uzorci.push({
                                      sid: element.id,
                                      status: stat,
                                      pdf_exists: element.pdf_exists,
                                      tip: element.sample.tip,
                                      _id: element._id,
                                      removed: false,
                                    });
                                  } else {
                                    this.uzorci.push({
                                      sid: element.id,
                                      status: "U OBRADI",
                                      pdf_exists: element.pdf_exists,
                                      tip: element.sample.tip,
                                      _id: element._id,
                                      removed: false,
                                    });
                                  }
                                }
                              });
                            });

                            this.uzorci = this.uzorci.sort(function (a, b) {
                              return a.sid.localeCompare(b.sid, undefined, {
                                numeric: true,
                                sensitivity: "base",
                              });
                            });

                            this.main = true;

                            // Vue Loading Overlay Component
                            this.isLoading = false;
                          }
                        });
                    })
                    .then((res) => {});
                });
            });
        });
      }

      
    },

    Disapprove(rezultati, from) {
      this.rezultati.forEach((element) => {
        if (element.calculated) {
          this.calculated = true;
        }
      });

      http
        .post("/rezultati/odobravanje/ukloni/" + this.$store.state.sid, {
          testovi: rezultati,
          site: this.$store.state.site,
          token: this.$store.state.token,
        })
        .then((res) => {
          // Vue Loading Overlay Component
          this.isLoading = true;

          http
            .get(
              "rezultati/odobravanje/samples/" +
                this.$route.params.patient +
                "/" +
                this.$route.params.id +
                "?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site +
                "&date=" +
                this.$route.query.date,
              {}
            )
            .then((res) => {
              this.sample.status = "REALIZOVAN";

              this.final_pdf = res.data.final_pdf;

              this.count = res.data.results.length;
              this.approved = 0;

              this.odobren = true;
              this.verificiran = true;

              res.data.results.forEach((element) => {
                if (
                  element.status === "ODOBREN" ||
                  element.status === "VERIFICIRAN"
                ) {
                  this.approved++;
                }
                if (
                  element.status != "ODOBREN" &&
                  element.status != "VERIFICIRAN"
                ) {
                  this.odobren = false;
                }
                if (!element.verificiran) {
                  this.verificiran = false;
                }
              });

              this.uzorci = [];

              res.data.results.forEach((element) => {
                var check = 0;
                var zaprimljen = 0;
                var realizovan = 0;

                if (element.verificiran) {
                  var status_uzorka = "VERIFICIRAN";
                } else {
                  var status_uzorka = element.status;
                }

                element.rezultati.forEach((test) => {
                  check++;

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                  ) {
                    zaprimljen++;
                  }

                  if (
                    test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                  ) {
                    realizovan++;
                  }

                  if (check === element.rezultati.length) {
                    // console.log("Provjera: Disapprove")

                    if (status_uzorka === "VERIFICIRAN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "VERIFICIRAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (status_uzorka === "ODOBREN") {
                      this.uzorci.push({
                        sid: element.id,
                        status: "ODOBREN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (zaprimljen < 1) {
                      this.uzorci.push({
                        sid: element.id,
                        status: "REALIZOVAN",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else if (realizovan < 1) {
                      var stat = "U OBRADI";
                      if (element.sample.tip.includes("Mikrobiologija")) {
                        if (
                          element.rezultati[0].rezultat[0].rezultat_m.length
                        ) {
                          stat = "REALIZOVAN";
                        }
                      }
                      this.uzorci.push({
                        sid: element.id,
                        status: stat,
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    } else {
                      this.uzorci.push({
                        sid: element.id,
                        status: "U OBRADI",
                        pdf_exists: element.pdf_exists,
                        tip: element.sample.tip,
                        _id: element._id,
                        removed: false,
                      });
                    }
                  }
                });
              });

              this.uzorci = this.uzorci.sort(function (a, b) {
                return a.sid.localeCompare(b.sid, undefined, {
                  numeric: true,
                  sensitivity: "base",
                });
              });

              this.main = true;
            });

          this.rezultati.forEach((element) => {
            element.edit = true;
          });

          // Vue Loading Overlay Component
          this.isLoading = false;
        });
    },

    Verify(data) {
      if (false) {
        this.$refs.staticModalVerifyPrivilege.open();
      } else {
        http
          .post("/rezultati/obrada/verifikacija/" + this.$store.state.sid, {
            site: this.$store.state.site,
            token: this.$store.state.token,
            verify: true,
          })
          .then((res) => {
            http
              .get(
                "rezultati/odobravanje/samples/" +
                  this.$route.params.patient +
                  "/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site +
                  "&date=" +
                  this.$route.query.date,
                {}
              )
              .then((res) => {
                this.sample.status = "VERIFICIRAN";

                this.final_pdf = res.data.final_pdf;

                this.count = res.data.results.length;
                this.approved = 0;
                this.verified = 0;

                this.odobren = true;
                this.verificiran = true;
                this.partials = [];
                this.partials_condition = false;

                res.data.results.forEach((element) => {
                  if (element.verificiran) {
                    this.partials.push(element._id);
                    this.verified++;
                  }
                  if (
                    element.status === "ODOBREN" ||
                    element.status === "VERIFICIRAN"
                  ) {
                    this.approved++;
                  }
                  if (
                    element.status != "ODOBREN" &&
                    element.status != "VERIFICIRAN"
                  ) {
                    this.odobren = false;
                  }
                  if (!element.verificiran) {
                    this.verificiran = false;
                  }
                });

                if (this.count > this.verified && this.verified > 1) {
                  this.partials_condition = true;
                }

                this.uzorci = [];

                res.data.results.forEach((element) => {
                  var check = 0;
                  var zaprimljen = 0;
                  var realizovan = 0;

                  if (element.verificiran) {
                    var status_uzorka = "VERIFICIRAN";
                  } else {
                    var status_uzorka = element.status;
                  }

                  element.rezultati.forEach((test) => {
                    check++;

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                    ) {
                      zaprimljen++;
                    }

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                    ) {
                      realizovan++;
                    }

                    if (check === element.rezultati.length) {
                      // console.log("Provjera: Verify")

                      if (status_uzorka === "VERIFICIRAN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "VERIFICIRAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (status_uzorka === "ODOBREN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "ODOBREN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (zaprimljen < 1) {
                        this.uzorci.push({
                          sid: element.id,
                          status: "REALIZOVAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (realizovan < 1) {
                        var stat = "U OBRADI";
                        if (element.sample.tip.includes("Mikrobiologija")) {
                          if (
                            element.rezultati[0].rezultat[0].rezultat_m.length
                          ) {
                            stat = "REALIZOVAN";
                          }
                        }
                        this.uzorci.push({
                          sid: element.id,
                          status: stat,
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else {
                        this.uzorci.push({
                          sid: element.id,
                          status: "U OBRADI",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      }
                    }
                  });
                });

                this.uzorci = this.uzorci.sort(function (a, b) {
                  return a.sid.localeCompare(b.sid, undefined, {
                    numeric: true,
                    sensitivity: "base",
                  });
                });

                if (this.verificiran) {
                  http
                    .post("rezultati/nalazi/status", {
                      token: this.$store.state.token,
                      site: this.$store.state.site,
                      timestamp: this.timestamp,
                      location: "/",
                      naziv: this.timestamp,
                      status: true,
                    })
                    .then((res) => {
                      this.isLoading = false;
                      this.main = true;

                      // if (this.lokacija.sendEmail) {
                      //   this.isLoading = true;
                      //   http
                      //     .post("nalazi/mail", {
                      //       token: this.$store.state.token,
                      //       site: this.$store.state.site,
                      //       email: this.lokacija.email,
                      //       timestamp: this.timestamp,
                      //       location: "/",
                      //       naziv: this.timestamp,
                      //     })
                      //     .then((res) => {
                      //       if (res.data.success) {
                      //         this.isLoading = false;
                      //       } else {
                      //         this.isLoading = false;
                      //       }
                      //     });
                      // } else {
                      // }
                    });
                } else {
                  this.isLoading = false;
                  this.main = true;
                }
              });
          });
      }
    },

    UnVerify(data) {
      if (!this.$store.state.configuration.verify.rt) {
        this.$refs.staticModalVerifyPrivilege.open();
      } else {
        this.verificiran = false;
        this.sid = data.sid;

        http
          .post("/rezultati/obrada/verifikacija/" + data.sid, {
            site: this.$store.state.site,
            token: this.$store.state.token,
            verify: false,
          })
          .then((res) => {
            http
              .get(
                "rezultati/odobravanje/samples/" +
                  this.$route.params.patient +
                  "/" +
                  this.$route.params.id +
                  "?token=" +
                  this.$store.state.token +
                  "&site=" +
                  this.$store.state.site +
                  "&date=" +
                  this.$route.query.date,
                {}
              )
              .then((res) => {
                this.sample.status = "ODOBREN";

                this.final_pdf = res.data.final_pdf;

                this.count = res.data.results.length;
                this.approved = 0;

                this.odobren = true;
                this.verificiran = true;
                this.verified = 0;
                this.partials = [];
                this.partials_condition = false;

                res.data.results.forEach((element) => {
                  if (element.verificiran) {
                    this.verified++;
                    this.partials.push(element._id);
                  }
                  if (
                    element.status === "ODOBREN" ||
                    element.status === "VERIFICIRAN"
                  ) {
                    this.approved++;
                  }
                  if (
                    element.status != "ODOBREN" &&
                    element.status != "VERIFICIRAN"
                  ) {
                    this.odobren = false;
                  }
                  if (!element.verificiran) {
                    this.verificiran = false;
                  }
                });

                if (this.count > this.verified && this.verified > 1) {
                  this.partials_condition = true;
                }

                this.uzorci = [];

                res.data.results.forEach((element) => {
                  var check = 0;
                  var zaprimljen = 0;
                  var realizovan = 0;

                  if (element.verificiran) {
                    var status_uzorka = "VERIFICIRAN";
                  } else {
                    var status_uzorka = element.status;
                  }

                  element.rezultati.forEach((test) => {
                    check++;

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f === ""
                    ) {
                      zaprimljen++;
                    }

                    if (
                      test.rezultat[test.rezultat.length - 1].rezultat_f != ""
                    ) {
                      realizovan++;
                    }

                    if (check === element.rezultati.length) {
                      // console.log("Provjera: Unverify")

                      if (status_uzorka === "VERIFICIRAN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "VERIFICIRAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (status_uzorka === "ODOBREN") {
                        this.uzorci.push({
                          sid: element.id,
                          status: "ODOBREN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (zaprimljen < 1) {
                        this.uzorci.push({
                          sid: element.id,
                          status: "REALIZOVAN",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else if (realizovan < 1) {
                        var stat = "U OBRADI";
                        if (element.sample.tip.includes("Mikrobiologija")) {
                          if (
                            element.rezultati[0].rezultat[0].rezultat_m.length
                          ) {
                            stat = "REALIZOVAN";
                          }
                        }
                        this.uzorci.push({
                          sid: element.id,
                          status: stat,
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      } else {
                        this.uzorci.push({
                          sid: element.id,
                          status: "U OBRADI",
                          pdf_exists: element.pdf_exists,
                          tip: element.sample.tip,
                          _id: element._id,
                          removed: false,
                        });
                      }
                    }
                  });
                });

                this.uzorci = this.uzorci.sort(function (a, b) {
                  return a.sid.localeCompare(b.sid, undefined, {
                    numeric: true,
                    sensitivity: "base",
                  });
                });

                if (!this.verificiran) {
                  http
                    .post("rezultati/nalazi/status", {
                      token: this.$store.state.token,
                      site: this.$store.state.site,
                      timestamp: this.timestamp,
                      location: "/",
                      naziv: this.timestamp,
                      status: false,
                    })
                    .then((res) => {
                      this.Disapprove(this.rezultati)
                      // this.main = true;
                    });
                } else {
                  this.Disapprove(this.rezultati)
                  // this.main = true;
                }
              });
          });
      }
    },

    GetResults(data, status) {
      this.sample_status = status;
      this.vise = [];
      this.labassay = "";
      http
        .post(
          "/rezultati/odobravanje/results" +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {
            id: this.sample.sid,
            labassay: data.labassay_id,
          }
        )
        .then((res) => {
          if (res.data.success) {
            this.vise = res.data.element;
            this.labassay =
              this.vise.labassay.naziv + " (" + this.vise.labassay.analit + ")";

            var i = 0;
            res.data.element.rezultat.forEach((element) => {
              i++;
              if (res.data.element.rezultat.length == i) {
                element.izabran = true;
              } else {
                element.izabran = false;
              }
            });

            this.vise.rezultat.sort(function (a, b) {
              return Date.parse(a.created_at) == Date.parse(b.created_at)
                ? 0
                : +(Date.parse(a.created_at) < Date.parse(b.created_at)) || -1;
            });

            this.$refs.staticModalAllResults.open();
          }
        });
    },

    GetResultsMulti(data, status) {
      this.sample_status = status;

      this.multi_rezultati = [];
      this.multi_test = data.ime + " (" + data.analit + ")";

      // this.$refs.staticModalResultsMulti.open();

      // this.multi_rezultati = data.multi_rezultati

      data.multi_rezultati.forEach((element) => {
        element.rezultat.forEach((rez) => {});
      });
    },

    IzborTesta(vise, test) {
      document.getElementById(this.sample.sid).click();

      http
        .post(
          "/rezultati/odobravanje/choose" +
            "?token=" +
            this.$store.state.token +
            "&site=" +
            this.$store.state.site,
          {
            id: this.sample.sid,
            labassay: vise.labassay._id,
            picked: test._id,
          }
        )
        .then((res) => {
          document.getElementById(this.sample.sid).click();
          this.$refs.staticModalAllResults.close();
        });
    },

    Partials() {
      http
        .post("nalazi/create", {
          token: this.$store.state.token,
          site: this.$store.state.site,
          type: "partial",
          uzorci: this.uzorci,
          samples: this.partials,
          timestamp: this.timestamp,
          napomena: "",
          status: false,
          idNalaza: "",
          location: "/partials",
          klijent: this.klijent,
          naziv: this.timestamp,
        })
        .then((res) => {
          if (res.data.success) {
            if (!res.data.success) {
              this.$refs.staticModalError.open();
            } else {
              this.path = this.timestamp + ".pdf";

              this.url = server + "nalazi/partials/" + this.path;

              var options = {
                width: "100%",
                height: "800px",
              };
              PDFObject.embed(this.url, "#pdf-container", options);

              this.email_button = true;
              this.main = false;
              this.pdf = true;
            }
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse-page {
  &__content {
    padding: 2rem;
    &__title {
      font-size: 1.375rem;
      font-weight: bold;
    }
  }
}

.icon-bar a {
  color: #fff;
  text-decoration: none;
}

.icon-bar a:hover {
  color: #4ae387;
}

i:hover {
  color: #4ae387 !important;
}

.circle {
  width: 1rem;
  opacity: 0.5;
  height: 1rem;
  border-radius: 50%;
  display: inline-block;
}
</style>
