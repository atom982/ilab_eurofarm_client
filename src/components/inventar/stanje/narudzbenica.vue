<template>
  <div class="notifications-page" style="min-height: 500px;">
    <div class="row">
      <div class="col-md-12">
       
          <!--  -->
          <form action="">
            <div class="row">
              <div class="col-md-4">
                    <vuestic-simple-select
                          :label="'Izaberite dobavljača'"
                          v-model="dobavljac"
                          name="dobavljac"
                          :required="true"
                          title=" "
                          ref="dobavljacSelect"
                          v-bind:options="dobavljaci"
                    ></vuestic-simple-select>
                      <vuestic-simple-select
                          :label="'Izaberite klijenta'"
                          v-model="klijent"
                          name="klijent"
                          :required="true"
                          title=" "
                          ref="klijentSelect"
                          v-bind:options="klijenti"
                    ></vuestic-simple-select>                
                  <div v-if="cbxKlijent" class="form-group with-icon-right">
                    <div class="input-group" v-show="isDisabled">
                      <input v-model="inputValue" id="clear-input" 
                             name="clear-input" required/>
                      <i class="fa fa-times icon-right input-icon pointer"
                         @click="clear('inputValue')"></i>
                      <label class="control-label" for="clear-input"
                             role="button">{{'Traži proizvod'}}</label><i
                      class="bar"></i>
                                    <div
                          v-show="cijened.length"
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
                                >{{item.produkt.LN}} | {{item.produkt.opis}}</a>
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
                        <td width="20%">{{'Količina'}}</td>
                        <td width="20%">{{'Cijena'}}</td>

                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in stavke" :key="element.produkt.LN">           
                        <td>{{element.produkt.LN}}</td>
                        <td>{{element.produkt.opis}}</td>
                        <td>
                        <div  style="display:inline;">
                            <input
                              v-model="element.kolicina"
                              style="width:110px;font-size: 12px; line-height: 7px;"
                            />
                          </div>
                        </td>
                        <td>{{element.cijena}}</td>
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
    name: 'StanjeNarudzbenica',
  computed: {
    filterItems() {
      var filtered = [];
      this.cijened.forEach(element => {
       
          filtered.push(element);
        
      });

      if (this.inputValue.length >= 1) {
        return filtered.filter(
          item =>
            item.produkt.LN.toUpperCase().search(this.inputValue.toUpperCase()) !==
              -1 ||
            item.produkt.opis.toUpperCase().search(this.inputValue.toUpperCase()) !==
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
        narudzbenice:[],
        cbxDobavljac:false,
        cbxKlijent:false,
        klijent:"",
        klijenti:[],
        klijenti_select:[],
        klijent_id:"",
        isDisabled:false,
        cijenek:[],
        cijened:[],
        toastDuration: 2500,
      }
    },
    watch: {

    klijent: function() {
      this.isDisabled = true
      this.cbxKlijent = true
      this.stavke = []
      this.inputValue =  ''
      this.klijenti_select.forEach(element => {
                if (element.naziv === this.klijent)        
                {
                    this.klijent_id = element._id
                }
            });
     http.get("/inventar/listcijened?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site+ "&dobavljac=" +this.dobavljac_id+ "&klijent=" +this.klijent_id,
              {}
            )
            .then(res => {
                if (res.data.success) {
                    this.cijened= res.data.produkti
                   
                } 
            });     
    },
    dobavljac: function() {
      this.isDisabled = true
      this.cbxKlijent = true
      this.stavke = []
      this.inputValue =  ''
      this.klijenti_select.forEach(element => {
                if (element.default)        
                {
                    this.klijent = element.naziv
                    this.klijent_id = element._id
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
                this.$store.state.site+ "&dobavljac=" +this.dobavljac_id+ "&klijent=" +this.klijent_id,
              {}
            )
            .then(res => {
                if (res.data.success) {
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

        
        var existsk = false 
        this.stavke.forEach(element => {
          if(element._id === data._id){
            existsk = true
          }
          });
        if(!existsk){
          this.stavke.unshift(data)
        }else{
        this.toastText = "Produkt već na narudžbenici!";
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
        

        
    },
      Save() {
        let narudzbenica  = {}
        let produkti =[]
        let ID = 0
        if(true){
            this.dobavljaci_select.forEach(element => {
                if (element.naziv === this.dobavljac)        
                {
                    this.dobavljac_id = element._id
                }
            });

            this.stavke.forEach(stavka => {
              // console.log(stavka)
                    produkti.push({
                        produkt:stavka.produkt._id,
                        kolicina:stavka.kolicina,
                        cijena: stavka.cijena,
                        cijenad:stavka._id
                    })
            });
            ID =this.narudzbenice.length + 1
            if(this.narudzbenice.length){

            }else{

            }
            // console.log('ID:'+ID)
                    narudzbenica= {
                    ID:ID.toString(),
                    dobavljac: this.dobavljac_id,
                    klijent:this.klijent_id,
                    produkti:produkti,
                    site:this.$store.state.site
                    }
                    http.post("inventar/createnarudzbenica", {
                                                        narudzbenica: narudzbenica,
                                                        token: this.$store.state.token,
                                                        site: this.$store.state.site
                                                    })
                    .then(res => {
                        if (res.data.success) {
                            // console.log(res.data)
                            this.narudzbenice = res.data.narudzbenice
                            this.stavke  = []
                            this.inputValue  =""
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
        http.get("/inventar/listnarudzbenica?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site,
              {}
            )
            .then(res => {
                if (res.data.success) {
                    this.narudzbenice = res.data.narudzbenice
                    // console.log(this.narudzbenice)
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
