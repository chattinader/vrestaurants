<!----------------------------------------html------------------------------------------------------------------------------------------------------->
<template>
  <div class="about container">
    <!----------------------------------------A propos----------------------------------------------------------------->
    <h1 class="page-header">A propos</h1>
    <p><b>Gestionnaire de restaurants</b></p>
    <p>Ce site contient une liste de restaurants présentés sous forme d'un tableau sur plusieurs pages. Vous pouvez visualiser les informations
      de chaque restaurant (nom, type de cuisine, classe et adresse), ainsi que la position GPS sur une carte GoogleMap.</p>
    <p>Vouv avez la possibilité de soit modifier les informations d'un restaurant existant, de supprimer ou d'ajouter un restaurant.</p>
    <p>Pour rechercher un restaurant dans le tableau il suffit de rentrer le nom de ce dernier dans la barre de recherhce.</p>
    <hr>
    <h5>Ce Site est une application <b>VueJS</b> développée en <b>Mode CLI.</b></h5>
  </div>
</template>

<!----------------------------------------Script-------------------------------------------------------------------------------------------------------->
<script>
export default {
  name: 'About',
  data () {
    return {

    }
  }
}
</script>

<!----------------------------------------Style--------------------------------------------------------------------------------------------------------->
<style scoped>

</style>
