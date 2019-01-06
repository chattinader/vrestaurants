<!----------------------------------------html------------------------------------------------------------------------------------------------------->
<template>
  <div class="GoogleMap container">
    <!----------------------------------------Google Map--------------------------------------------------------------->
    <div id="map" class="h-500"></div>
  </div>
</template>
<!----------------------------------------Script-------------------------------------------------------------------------------------------------------->
<script>
  export default {
    data(){
      return {
        lng: '',
        lat: ''
      }
    },
    methods: {
      GoogleMap() {
        // ----------------------------------Récupération des données dur restaurants avec son id depuis le serveur-----
        this.$http.get('http://localhost:8080/api/restaurants/'+this.$route.params.id)
          .then(function(response) {
              this.r = JSON.parse(JSON.stringify(response.body.restaurant));
              this.adresse = this.r.address.building + ' ' + this.r.address.street + ' ' + this.r.address.zipcode + ' ' + this.r.borough;

              var geocoder;
              var map;
              geocoder = new google.maps.Geocoder();
              geocoder.geocode( { 'address': this.adresse}, function(results, status) {
                /* Récupération de sa latitude et de sa longitude */
                this.lat = results[0].geometry.location.lat();
                this.lng = results[0].geometry.location.lng();
                // ----------------------------------Paramétrage des coordonnées GPS------------------------------------------
                this.$map = new google.maps.Map(document.getElementById('map'), {
                  center: new google.maps.LatLng(this.lat, this.lng),
                  zoom: 18
                });
                // ----------------------------------Positionnement du curseur de Map-----------------------------------------
                return new google.maps.Marker({
                  position: new google.maps.LatLng(this.lat, this.lng),
                  icon: null,
                  map: this.$map,
                  title: null,
                });
            });
          });
      }
    },
    created: function () {
      this.GoogleMap();
    }
  }
</script>

<!----------------------------------------Style--------------------------------------------------------------------------------------------------------->
<style scoped>
  #map {
    margin: 0 auto;
    background: gray;
  }
  .h-500 {
    height:500px;
    width: 100%;
  }
</style>
