<!----------------------------------------html--------------------------------------------------------------------------------------------------------->
<template>
  <div class="details container">
    <!----------------------------------------Affichage détails restaurant--------------------------------------------->
    <router-link class="btn" style="border-color: #555; color: #555" to="/">Retour</router-link>
    <h1 class="page-header">{{name}}
      <span class="pull-right">
        <router-link class="btn" style="border-color: #555; color: #555" v-bind:to="'/edit/'+r._id">Modifier</router-link>
        <button class="btn" style="border-color: #555; color: #555" v-on:click="supprimerRestaurant(r._id)">Supprimer</button>
      </span>
    </h1>
    <ul class="list-group">
      <li class="list-group-item"><span class="glyphicon glyphicon-qrcode" aria-hidden="true"></span> <b>ID:</b> {{_id}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span> <b>Classe:</b> {{grades.grade}}</li>
      <li class="list-group-item"><span class="glyphicon glyphicon-glass" aria-hidden="true"></span> <b>Cuisine:</b> {{cuisine}}</li>
    </ul>

    <hr>

    <ul class="list-group">
      <li class="list-group-item"><span class="glyphicon glyphicon-home" aria-hidden="true"></span>
        <b>Adresse:</b> {{address.building}} {{address.street}}
        {{address.zipcode}}, {{borough}}
      </li>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-screenshot" aria-hidden="true"></span>
         <b>Coordonnées</b><hr>
          <google-map></google-map>
      </li>
    </ul>
  </div>
</template>

<!----------------------------------------Script--------------------------------------------------------------------------------------------------------->
<script>
  export default {
    name: 'Details',
    data () {
      return {
        r: {

        },
        _id: 'Indéfini',
        name: 'Indéfini',
        cuisine: 'Indéfini',
        grades: {
          date: 'Indéfini',
          grade: 'Indéfini',
          score: ''
        },
        address: {
          building: 'Indéfini',
          street: '',
          zipcode: '',
          coord: ''
        },
        borough: '',
        lng: '',
        lat: ''
      }
    },
    methods: {
      // ----------------------------------Récupération d'un restaurants avec son id depuis le serveur------------------
      fetchRestaurant(id) {
        this.$http.get('http://localhost:8080/api/restaurants/'+id)
          .then(function(response) {
            this.r = JSON.parse(JSON.stringify(response.body.restaurant));
            this.name = this.r.name;
            this._id = this.r._id;
            this.cuisine = this.r.cuisine;
            this.grades.grade = this.r.grades.grade;
            this.address.building = this.r.address.building;
            this.address.street = this.r.address.street;
            this.address.zipcode = this.r.address.zipcode;
            this.borough = this.r.borough;
            this.address.coord = this.r.address.coord;
          });
        },
      // ----------------------------------Suppression d'un restaurant--------------------------------------------------
      supprimerRestaurant(id) {
        this.$http.delete('http://localhost:8080/api/restaurants/'+id)
          .then(function (response) {
            this.$router.push({path: '/', query: {alert: 'Restaurant supprimé'}})
          })
      }
    },
    created: function () {
      this.fetchRestaurant(this.$route.params.id);
    }
  }
</script>

<!----------------------------------------Style--------------------------------------------------------------------------------------------------------->
<style scoped>

</style>
