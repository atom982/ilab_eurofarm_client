<template>
  <div class="notifications-page">
    <div class="row">
      <div class="col-md-12">
          <!--  -->
          <form action="">
            <div class="row">
              <div class="col-md-4">
                  
                    <vuestic-simple-select
                          :label="'Izaberite klijenta'"
                          v-model="klijent"
                          name="klijent"
                          :required="true"
                          title=" "
                          ref="klijentSelect"
                          v-bind:options="klijenti"
                    ></vuestic-simple-select>
                      <vuestic-simple-select
                          :label="'Izaberite narudzbenicu'"
                          v-model="narudzbenica"
                          name="dobavljac"
                          :required="true"
                          title=" "
                          ref="dobavljacSelect"
                          v-bind:options="narudzbenice"
                    ></vuestic-simple-select>                
                         <div class="form-group with-icon-left">
                          <div class="input-group">
                            <input
                              id="racunbr-input-icon-left"
                              title=" "
                              v-model="racunbr"
                              name="racunbr-input-icon-left"
                              required
                            >
                            <i class="glyphicon glyphicon-pencil icon-left input-icon"></i>
                            <label
                              class="control-label"
                              for="racunbr-input-icon-left"
                            >{{'Unesite broj računa'}}</label>
                            <i class="bar"></i>
                          </div>
                        </div>
                  <div class="form-group with-icon-right">
                    <div class="input-group">
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
                                v-show="index < 8"
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
               <button  @click.prevent="Izdavanje()" style='white-space: nowrap;font-size: 11px;' title='' id='SacuvajUlaz'  class='btn btn-secondary-info btn-micro'>
                 <span id='SacuvajUlazs' style='font-size: 12px;' class='fa fa-flask'></span> 
                 <span style='text-transform: none; font-size: 12px;'>Izdavanje</span></button>
              </div>
              </div>
              <div class="col-md-8">

                <div class="table-responsive" v-if="stavke.length">
                  <table class="table table-striped first-td-padding">
                    <thead>
                      <tr>
                        <td width="20%">{{'LN'}}</td>
                        <td width="15%">{{'Opis'}}</td>
                        <td width="20%">{{'Kolicina'}}</td>
                        <td width="20%">{{'Lot'}}</td>
                        <td width="20%">{{'Rok'}}</td>
                        <td align="center" width="15%">{{'Uredi'}}</td>
                        <td align="center" width="15%">{{'Akcija'}}</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="element in stavke" :key="element.LN">           
                        <td>{{element.produkt.LN}}</td>
                        <td>{{element.produkt.opis}}</td>
                        <td>
                        <div  style="display:inline;">
                            <input
                              :value="element.kolicina"
                              @change="changeKolicina(element,$event)"
                              style="width:110px;font-size: 12px; line-height: 7px;"
                            />
                          </div>
                        </td>
                        <td>{{element.lot}}</td>
                        <td>{{element.rok}}</td>
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
    name: 'inventar-ulaz',
  computed: {
    filterItems() {
      var filtered = [];
      this.proizvodi.forEach(element => {
       
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
        klijent:'',
        klijenti:[],
        klijenti_select:[],
        racunbr:'',
        narudzbenica:"",
        narudzbenice:[],
        proizvodi:[],
        stavke:[],
        ulaz:[],
        izlaz:[],
        izdato:[],
        toastDuration: 2500,
       
      }
    },
    methods: {
      clear (field) {
        this[field] = ''
      },
      Add(data) {
     
        var d = new Date();
        var god = d.getFullYear();
        var mon = d.getMonth()+1 +2
        var day = d.getDate()
        if(mon<10 ){
          mon ='0'+mon
        }
        if(day<10 ){
          day ='0'+day
        }
        
        data.rok = d.getFullYear()+'-'+mon+'-'+day
        this.stavke.unshift(data)
        // console.log(data)
    },
    Izdavanje() {
      if (this.klijent.trim() === "" || this.racunbr.trim() === "") {
        this.toastText = "Unesite obavezna polja.";
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
      }else{
        // console.log('spremno za Izdavanje')
        var klijent_id = ""
        this.klijenti_select.forEach(element => {
           if(element.naziv === this.klijent){
             klijent_id = element._id
             // console.log(klijent_id)
           }
        });
        

        this.stavke.forEach(element => {
          this.izdato.push({
            ulaz:element._id,
            klijent:klijent_id,
            produkt:element.produkt._id,
            racunbr:this.racunbr,
            kolicina:element.kolicina,
            cijenak:element.cijenak,
            site: this.$store.state.site
          })
        });
    // console.log(this.izdato)

        http.post("inventar/createizlaz", {
              izdato: this.izdato,
              token: this.$store.state.token,
              site: this.$store.state.site
            })
            .then(res => {
              
              if (res.data.success) {
                // console.log('response receoi+ved')
              }
            });
      }
    },
    changeKolicina(item,event){
      // console.log(item.kolicina)// stara vrijednost
      // console.log(event.target.value)// nova vrijednost 
      if(event.target.value > item.kolicina){
        this.toastText = "Na stanju ne postoji unesena kolicina";
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
        event.target.value = item.kolicina  
      }else{
        item.kolicina = event.target.value;  // Pridruzivanje
      }
      
    }
    },
    created () {
      this.$nextTick(() => {
        this.$validator.validateAll()
      })

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
      watch: {
    klijent: function() {
        var klijent_id = ""
        this.inputValue  =""
        this.klijenti_select.forEach(element => {
           if(element.naziv === this.klijent){
             klijent_id = element._id
            // console.log(klijent_id)
           }
        });
        
        http.get("/inventar/listcijenek?token=" +
                this.$store.state.token +
                "&site=" +
                this.$store.state.site+ "&klijent=" +klijent_id,
              {}
            )
            .then(res => {
                if (res.data.success) {
                     // console.log('es.data')
                    // console.log(res.data)
                    this.ulaz= res.data.produkti
                    http.get("/inventar/listulaz?token=" +
                    this.$store.state.token +
                    "&site=" +
                          this.$store.state.site,
                        {}
                      )
                      .then(res => {
                          if (res.data.success) {
                              // console.log('RRRRes.data')
                              // console.log(res.data)
                              this.izlaz= res.data.produkti
                               this.izlaz.forEach(izlz => {
                                 this.ulaz.forEach(ulz => {
                                   if(izlz.produkt._id === ulz.produkt._id && ulz.klijent._id ===klijent_id){
                                     izlz.cijenak =ulz._id
                                     this.proizvodi.push(izlz)
                                   }
                                });
                              });

                          }
                        
                      });
                }
              
            });
            
     }
    },
  }
</script>

<style lang="scss" scoped>

</style>
