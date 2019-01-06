<!----------------------------------------html------------------------------------------------------------------------------------------------------->
<template>
  <div class="GoogleMap container">
    <!----------------------------------------Google Map--------------------------------------------------------------->
    <div v-if="msgAffiche">
      <p>Coordonnées GPS indisponibles pour ce restaurant</p>
    </div>
    <div id="map" class="h-500"></div>
  </div>
</template>
<!----------------------------------------Script-------------------------------------------------------------------------------------------------------->
<script>
  export default {
    props: {
      'zoom': {
        type: Number,
        default() {
          return 16
        }
      },
    },
    data(){
      return {
        r: {
        },
        address: {
          coord: ''
        },
        lng: '',
        lat: '',
        mapAffiche: false,
        msgAffiche: true
      }
    },
    methods: {
      GoogleMap() {
        // ----------------------------------Récupération des données dur restaurants avec son id depuis le serveur-----
        this.$http.get('http://localhost:8080/api/restaurants/'+this.$route.params.id)
          .then(function(response) {
            this.r = JSON.parse(JSON.stringify(response.body.restaurant));
            this.address.coord = this.r.address.coord;
            if(this.address.coord) {
              this.msgAffiche = false;
            } else {
              this.address.coord = [0,0];
              this.zoom = 2;
            }
            // ----------------------------------Paramétrage des coordonnées GPS------------------------------------------
            this.$map = new google.maps.Map(document.getElementById('map'), {
              center: new google.maps.LatLng(this.address.coord[1], this.address.coord[0]),
              zoom: this.zoom
            });
            // ----------------------------------Positionnement du curseur de Map-----------------------------------------
            return new google.maps.Marker({
              position: new google.maps.LatLng(this.address.coord[1], this.address.coord[0]),
              icon: null,
              map: this.$map,
              title: null,
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
    height:300px;
    width: 100%;
  }
</style>
