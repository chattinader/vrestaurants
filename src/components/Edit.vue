<!----------------------------------------html------------------------------------------------------------------------------------------------------->
<template>
  <div class="edit container">
    <!----------------------------------------Formulaire modification restaurant--------------------------------------->
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <router-link class="btn" style="border-color: #555; color: #555" v-bind:to="'/restaurants/'+r._id">Retour</router-link>
    <h1 class="page-header">Modifier un restaurant</h1>
    <form v-on:submit="modifierRestaurant">
      <br>
      <div class="">
        <div class="form-row">
          <div class="form-group col-md-0">
            <label>Classe </label>
            <input type="text" class="form-control" style="width: 60px" v-model="grades.grade" placeholder="A - Z">
          </div>
          <div class="form-group col-md-5.5">
            <label>Nom </label>
            <input type="text" class="form-control" style="width: 500px" v-model="name" placeholder="Nom du restaurant" name="nom">
          </div>
          <div class="form-group col-md-4">
            <label>Cuisine </label>
            <input type="text" class="form-control" style="width: 500px" v-model="cuisine" placeholder="Type de cuisine" name="cuisine">
          </div>
        </div>
        <br>
        <hr>
        <div class="form-row">
          <div class="form-group col-md-0">
            <label>N° </label>
            <input type="text" style="width: 60px" class="form-control" v-model="address.building" placeholder="123">
          </div>
          <div class="form-group col-md-6">
            <label for="inputAddress">Address</label>
            <input type="text" style="width: 1070px" class="form-control" v-model="address.street" placeholder="Avenue, Boulevard, Rue...">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Ville</label>
            <input type="text" class="form-control" v-model="borough" placeholder="Ville">
          </div>
          <div class="form-group col-md-2">
            <label>Code postal</label>
            <input type="text" class="form-control" v-model="address.zipcode" placeholder="Code postal">
          </div>
        </div>
        <button type="submit" class="btn" style="border-color: #555; color: #555">Modifier</button>
      </div>
    </form>
  </div>
</template>

<!----------------------------------------Script-------------------------------------------------------------------------------------------------------->
<script>
  import Alert from './Alert'
  export default {
    name: 'edit',
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
          zipcode: ''
        },
        borough: '',
        alert: ''
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
          });
      },
      // ----------------------------------Modification d'un restaurant-------------------------------------------------
      modifierRestaurant(event) {
        if(!this.nom || !this.cuisine){
          this.alert = "Veuillez remplir les champs obligatoires";
        } else {
        let modifRestaurant = {
          nom: '',
          cuisine: '',
          grades: {
            date: '',
            grade: '',
            score: ''
          },
          address: {
            building: '',
            street: '',
            zipcode: ''
          },
          borough: ''
        }

        modifRestaurant.nom =this.name;
        modifRestaurant.cuisine =this.cuisine;
        modifRestaurant.grades.grade = this.grades.grade;
        modifRestaurant.address.building = this.address.building;
        modifRestaurant.address.street = this.address.street;
        modifRestaurant.address.zipcode = this.address.zipcode;
        modifRestaurant.borough = this.borough;

        this.$http.put('http://localhost:8080/api/restaurants/' + this._id, modifRestaurant)
          .then(function (response) {
            this.$router.push({path: '/', query: { alert: 'Restaurant modifié'}});
          });
        event.preventDefault();
        }
        event.preventDefault();
      },
    },
    created: function () {
      this.fetchRestaurant(this.$route.params.id);
    },
    components: {
      Alert
    }
  }
</script>

<!----------------------------------------Style--------------------------------------------------------------------------------------------------------->
<style scoped>

</style>
