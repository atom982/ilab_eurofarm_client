<template>
  <div class="notifications-page" style="min-height: 500px;">
    <div class="row">
      <div class="col-md-12">
       
          <!--  -->
          <form action="">
            <div class="row">
              <div class="col-md-4">
                  <div class="row">
                    <div class="col-md-6">
                      <vuestic-checkbox
                        :label="'Dobavljac'"
                        :id="'cbxDobavljac'"
                        :disabled="isDisabled"
                        v-model="cbxDobavljac"/>
                    </div>
                    <div class="col-md-6">
                      <vuestic-checkbox
                        :label="'Klijent'"
                        :id="'cbxKlijent'"
                        :disabled="isDisabled"
                        v-model="cbxKlijent"/>
                    </div>
                  </div>
                    <vuestic-simple-select
                          v-if="cbxDobavljac"
                          :label="'Izaberite dobavljača'"
                          v-model="dobavljac"
                          name="dobavljac"
                          :required="true"
                          title=" "
                          ref="dobavljacSelect"
                          v-bind:options="dobavljaci"
                    ></vuestic-simple-select>
                      <vuestic-simple-select
                          v-if="cbxKlijent"
                          :label="'Izaberite klijenta'"
                          v-model="klijent"
                          name="klijent"
                          :required="true"
                          title=" "
                          ref="klijentSelect"
                          v-bind:options="klijenti"
                    ></vuestic-simple-select>  
                      <vuestic-simple-select
                          v-if="cbxDobavljac"
                          :label="'Za Klijenta'"
                          v-model="za_klijenta"
                          name="zaklijenta"
                          :required="true"
                          title=" "
                          ref="zaklijentaSelect"
                          v-bind:options="klijenti"
                    ></vuestic-simple-select>                
                  <div v-if="cbxDobavljac || cbxKlijent" class="form-group with-icon-right">
                    <div class="input-group" v-show="isDisabled">
                      <input v-model="inputValue" id="clear-input" 
                             name="clear-input" required/>
                      <i class="fa fa-times icon-right input-icon pointer"
                         @click="clear('inputValue')"></i>
                      <label class="control-label" for="clear-input"
                             role="button">{{'Traži proizvod'}}</label><i
                      class="bar"></i>
                                    <div
                          v-show="proizvodi.length"
                          class="vuestic-page-not-found-search__wallpaper vuestic-page-not-found-search__not-found-wallpaper-list"
                        >
                          <div
                            class="vuestic-page-not-found-search__wrapper"
                            :style="{'grid-template-columns': 'repeat(1, 1fr)'}"
                          >
                            <ul class="vuestic-page-not-found-search__list" style="color: #f7cc36;">
                              <li
                                class="vuestic-page-not-found-search__list-element"
                                v-for="(item, index) in filterItems"
                                :key="index"
                                v-if="inputValue.length"
                                v-show="index < 10"
                              >
                                <a
                                  @click.prevent="Add(item)"
                                  :class="{'unchosen-link': true, 'plain-link': false}"
                                  :id="item._id"
                                  href="#"
                                >{{item.LN}} | {{item.opis}}</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                    </div>
                  </div>
            <div class="form-group with-icon-left">
               <button @click.prevent="Save()"  title='' id='SacuvajUlazc'  class='btn btn-secondary-info btn-micro'>
                 <span  id='SacuvajUlazc' style='font-size: 12px;' class='fa fa-flask'></span> 
                 <span  style='text-transform: none; font-size: 12px;'>Sacuvaj</span></button>
              </div>
              </div>
              <div class="col-md-8">

                <div class="table-responsive" v-if="stavke.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="20%">{{'LN'}}</td>
                        <td width="15%">{{'Opis'}}</td>
                        <td width="20%">{{'Cijena'}}</td>

                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in stavke" :key="element.LN">           
                        <td>{{element.LN}}</td>
                        <td>{{element.opis}}</td>
                        <td>
                        <div  style="display:inline;">
                            <input
                              v-model="element.cijena"
                              style="width:110px;font-size: 12px; line-height: 7px;"
                            />
                          </div>
                        </td>
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
          </form>

      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../../../config/config.js";
  export default {
    name: 'UgovorUnos',
  computed: {
    filterItems() {
      var filtered = [];
      this.proizvodi.forEach(element => {
       
          filtered.push(element);
        
      });
      if (this.inputValue.length >= 1) {
        return filtered.filter(
          item =>
            item.LN.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1 ||
            item.opis.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1
        );
      } else {
        return filtered;
      }
    }
  },
    data () {
      return {
        inputValue: '',
        dobavljac:'',
        dobavljaci:[],
        dobavljaci_select:[],
        dobavljac_id:"",
        proizvodi:[],
        stavke:[],
        cbxDobavljac:false,
        cbxKlijent:false,
        klijent:"",
        za_klijenta:"",
        klijenti:[],
        klijenti_select:[],
        klijent_id:"",
        za_klijenta_id:"",
        isDisabled:false,
        cijenek:[],
        cijened:[],
        toastDuration: 2500,
      }
    },
    watch: {
    cbxDobavljac: function() {
      if(this.cbxDobavljac){
        this.cbxKlijent = false
        this.dobavljac = ""
        }
    },
    cbxKlijent: function() {
       if(this.cbxKlijent){
         this.cbxDobavljac = false
         this.klijent = ""
         }
    },
    klijent: function() {
      this.isDisabled = true
      this.klijenti_select.forEach(element => {
                if (element.naziv === this.klijent)        
                {
                    this.klijent_id = element._id
                }
            });
      http.get("/inventar/listcijenek?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site+ "&klijent=" + this.klijent_id,
              {}
            )
            .then(res => {
                if (res.data.success) {
                     // console.log('cijene k')
                    // console.log(res.data)
                    this.cijenek= res.data.produkti
                }
              
            });
    },
      za_klijenta: function() {
      this.isDisabled = true
      this.klijenti_select.forEach(element => {
                if (element.naziv === this.za_klijenta)        
                {
                    this.za_klijenta_id = element._id
                }
            });
    },
    dobavljac: function() {
      this.isDisabled = true
            this.klijenti_select.forEach(element => {
                if (element.default)        
                {
                    this.za_klijenta = element.naziv
                    this.za_klijenta_id = element._id
                }
            });
        this.dobavljaci_select.forEach(element => {
                if (element.naziv === this.dobavljac)        
                {
                    this.dobavljac_id = element._id
                }
            });
            http.get("/inventar/listcijened?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site+ "&dobavljac=" +this.dobavljac_id,
              {}
            )
            .then(res => {
                if (res.data.success) {
                     // console.log('cijene d')
                    // console.log(res.data)
                    this.cijened= res.data.produkti
                }
              
            });
    }
    },
    methods: {
      clear (field) {
        this[field] = ''
      },
      Add(data) {
        data.kolicina=""
        if(this.cbxDobavljac){
        var existsd = false 
        this.cijened.forEach(element => {
          if(element.produkt.LN === data.LN && element.za_klijenta ===this.za_klijenta_id){
            existsd = true
          }
        });
        if(!existsd){
          this.stavke.unshift(data)
        }else{
        this.toastText = "Cijena već definisana. Koristite pregled za izmjenu!";
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
         if(this.cbxKlijent){
        var existsk = false 
        this.cijenek.forEach(element => {
          if(element.produkt.LN === data.LN){
            existsk = true
          }
          });
        if(!existsk){
          this.stavke.unshift(data)
        }else{
        this.toastText = "Cijena već definisana. Koristite pregled za izmjenu!";
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

        
    },
      Save() {
        // console.log('sacuvaj')
        let cijene  = []
        if(this.cbxDobavljac){
            this.dobavljaci_select.forEach(element => {
                if (element.naziv === this.dobavljac)        
                {
                    this.dobavljac_id = element._id
                }
            });
            this.stavke.forEach(stavka => {
                cijene.push({
                    produkt:stavka._id,
                    dobavljac: this.dobavljac_id,
                    klijent:this.za_klijenta_id,
                    cijena:stavka.cijena,
                    site:this.$store.state.site
                    })
            });
            // console.log(cijene)
                    http.post("inventar/createcijened", {
                                                        cijene: cijene,
                                                        token: this.$store.state.token,
                                                        site: this.$store.state.site
                                                    })
                    .then(res => {
                        if (res.data.success) {
                            // console.log(res.data)
                            this.cijene = []
                            this.stavke  = []
                            this.isDisabled = false
                            this.inputValue  =""
                            this.cbxDobavljac = false
                            this.cbxKlijent = false
                        }
                    });
        }
        if(this.cbxKlijent){
            this.klijenti_select.forEach(element => {
                if (element.naziv === this.klijent)        
                {
                    this.klijent_id = element._id
                }
            });
            this.stavke.forEach(stavka => {
                cijene.push({
                    produkt:stavka._id,
                    klijent: this.klijent_id,
                    cijena:stavka.cijena,
                    site:this.$store.state.site
                    })
            });
            // console.log(cijene)
                    http.post("inventar/createcijenek", {
                                                        cijene: cijene,
                                                        token: this.$store.state.token,
                                                        site: this.$store.state.site
                                                    })
                    .then(res => {
                        if (res.data.success) {
                            // console.log(res.data)
                            this.cijene = []
                            this.stavke  = []
                            this.isDisabled = false
                            this.inputValue  =""
                            this.cbxDobavljac = false
                            this.cbxKlijent = false
                            this.cijene = this.cijene.splice(0,this.cijene.length - 1)
                        }
                    });
        }
        
    },
    },
    created () {
      this.$nextTick(() => {
        this.$validator.validateAll()
      })

        http.get("inventar/listdobavljac?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.dobavljaci_select = res.data.dobavljaci;
                 res.data.dobavljaci.forEach(element => {
                    this.dobavljaci.push(element.naziv)
                 });
              }
            });
        http.get("inventar/listklijenti?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
              if (res.data.success) {
                this.klijenti_select = res.data.klijenti;
                 res.data.klijenti.forEach(element => {
                    this.klijenti.push(element.naziv)
                 });
              }
            });
        http.get("/inventar/listprodukti?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
                if (res.data.success) {
                    this.proizvodi = res.data.proizvodi
                }
              
            });
        // http.post("inventar/listnarudzbenica", {
        //       dobavljac: this.dobavljac,
        //       token: this.$store.state.token,
        //       site: this.$store.state.site
        //     })
        //     .then(res => {
              
        //       if (res.data.success) {
        //         this.narudzbenice = res.data.narudzbenice;
        //       }
        //     });
    },
  }
</script>

<style lang="scss" scoped>

</style>
