<!----------------------------------------html------------------------------------------------------------------------------------------------------->
<template>
  <div class="restaurants container">
    <Alert v-if="alert" v-bind:message="alert"/>
    <h1 class="page-header">Gestionnaire de restaurants</h1>
    <!----------------------------------------Recherche d'un restaurant par le nom----------------------------------->
    <input type="text" class="form-control form-control-dark w-100"
           v-on:input="fetchRestaurants()"
           v-model="nomRecherche"
           placeholder="Rechercher"><br>
    <h4 style="text-align: center">Nombre de restaurants: {{nbRestaurants}}</h4>

    <!----------------------------------------Barre de taille du tableau------------------------------------------->
    <input class="range" type="range"
           v-on:input="fetchRestaurants()"
           value=10 min=2 max=100
           v-model="pagesize"
    >
    <p style="text-align: center">Affichage par {{this.pagesize}}</p><br>

    <!----------------------------------------Boutons de selection des pages--------------------------------------->
    <div style="padding-bottom: 10px; text-align: center;">
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: this.page === 0}"
              v-on:click="premierePage()"
      ><span class="glyphicon glyphicon-chevron-left"></span><span class="glyphicon glyphicon-chevron-left"></span></button>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: (this.page === 0)}"
              v-on:click="pagePrecedente()"
      ><span class="glyphicon glyphicon-chevron-left"></span></button>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: ((this.page + 1) <= 3)}"
              v-on:click="selectionPage(-3)"
      >{{this.page - 2}}</button>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: ((this.page + 1) <= 2)}"
              v-on:click="selectionPage(-2)"
      >{{this.page - 1}}</button>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: ((this.page + 1) <= 1)}"
              v-on:click="selectionPage(-1)"
      >{{this.page}}</button>
      <a class="btn" style="border-color: #555">Page: {{this.page + 1}}</a>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: ((this.page + 1) > (nbPagesDeResultats -1))}"
              v-on:click="selectionPage(1)"
      >{{this.page + 2}}</button>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: ((this.page + 2) > (nbPagesDeResultats -1))}"
              v-on:click="selectionPage(2)"
      >{{this.page + 3}}</button>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: ((this.page + 3) > (nbPagesDeResultats -1))}"
              v-on:click="selectionPage(3)"
      >{{this.page + 4}}</button>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: (this.page === (nbPagesDeResultats -1))}"
              v-on:click="pageSuivante()"
      ><span class="glyphicon glyphicon-chevron-right"></span></button>
      <button class="btn" style="border-color: transparent; color: #555"
              v-bind:class="{invisible: (this.page === (nbPagesDeResultats -1))}"
              v-on:click="dernierePage()"
      ><span class="glyphicon glyphicon-chevron-right"></span><span class="glyphicon glyphicon-chevron-right"></span></button>
    </div>
    <!----------------------------------------Tableau des restaurants---------------------------------------------->
    <table class="table table-hover">
      <thead>
      <tr>
        <th>Nom</th>
        <th>Cuisine</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="r in restaurants">
        <td>{{r.name}}</td>
        <td>{{r.cuisine}}</td>
        <td><router-link class="btn" style="border-color: #555; color: #555" v-bind:to="'/restaurants/'+r._id"><span class="glyphicon glyphicon-list-alt"></span> Détails</router-link></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<!----------------------------------------Script-------------------------------------------------------------------------------------------------------->
<script>
  import Alert from './Alert';
    export default {
        name: 'Restaurants',
      components: {Alert},
      data () {
            return {
                restaurants: [],
                _id: '',
                name: '',
                cuisine: '',
                nbRestaurants: 0,
                page: 0,
                pagesize: 10,
                nomRecherche: '',
                nbPagesDeResultats: 0,
              alert: ''
            }
        },
        methods: {
            // ----------------------------------Récupération de la liste restaurants depuis le serveur-----------------
            fetchRestaurants() {
                this.$http.get('http://localhost:8080/api/restaurants?page='
                + this.page + "&pagesize="
                + this.pagesize + "&name=" + this.nomRecherche)
                    .then(function(response) {
                        this.restaurants = JSON.parse(JSON.stringify(response.body.data));
                        this.nbRestaurants = response.body.count;
                        this.nbPagesDeResultats = Math.ceil(this.nbRestaurants/this.pagesize);
                    });
            },
            // ----------------------------------Appel de la dernière page----------------------------------------------
            premierePage() {
                this.page = 0;
                this.fetchRestaurants();
            },

            // ----------------------------------Appel de la page suivante----------------------------------------------
            pageSuivante() {
                this.page++;
                this.fetchRestaurants();
            },

            // ----------------------------------Appel de la page précédente--------------------------------------------
            pagePrecedente() {
                this.page--;
                this.fetchRestaurants();
            },

            // ----------------------------------Appel de la dernière page----------------------------------------------
            dernierePage() {
                this.page = (this.nbPagesDeResultats - 1);
                this.fetchRestaurants();
            },

            // ----------------------------------Boutons sélection page-------------------------------------------------
            selectionPage(n) {
                this.page = this.page + n;
                this.fetchRestaurants();
            },
        },
        created: function() {
            if(this.$route.query.alert) {
              this.alert = this.$route.query.alert;
            }
            this.fetchRestaurants();
        },
      comments: {
          Alert
      }
    }
</script>

<!----------------------------------------Style--------------------------------------------------------------------------------------------------------->
<style scoped>
  /* --------------------------------------Style de l'input range---------------------------------------------------- */
.range {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-appearance: none;
     -moz-appearance: none;
          appearance: none;
  background: none;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  min-height: 50px;
  overflow: hidden;
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.range:focus {
  box-shadow: none;
  outline: none;
}
.range::-webkit-slider-runnable-track {
  background: #555;
  content: '';
  height: 2px;
  pointer-events: none;
}
.range::-webkit-slider-thumb {
  height: 18px;
  width: 18px;
  -webkit-appearance: none;
          appearance: none;
  background: #fff;
  border-radius: 8px;
  margin-top: -8px;
  border: 1px solid #777;
}

/* --------------------------------------Style des boutons cachés---------------------------------------------------- */
.invisible {
    cursor: not-allowed;
    pointer-events: none;
    color: transparent;
    background-color: transparent;
    border: none;
    /*
    width: 0px;
    padding: 0px 0px;
    margin: 0px 0px;
    */
}
</style>
