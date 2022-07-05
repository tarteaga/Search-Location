<script>
export default {
  data() {
    return {id : null, places : null, url : null};
  
  }, 
  beforeMount() {
    this.setId();
    this.getDetails();
  }, methods: {
    setId(){
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      this.id = urlParams.get("id");
      console.log(this.id);
    },
    getDetails(){
      const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: 'fsq3aVPOMG8VjhIbGEHZV3mkK8gG7d5OvHSJjEJHPaySywQ='
  }
};

fetch('https://api.foursquare.com/v3/places/'+this.id, options)
  .then(response => response.json())
  .then(response => this.asignPlaces(response))
  .catch(err => console.error(err));
    },
  asignPlaces(response){
    this.places = response;
    console.log(this.places);
    this.url ='https://maps.googleapis.com/maps/api/staticmap?size=400x400&markers=color:blue%7Clabel:' + this.places.name.charAt(0) 
  + '%7C' + this.places.geocodes.main.latitude + ',' + this.places.geocodes.main.longitude
  + '&key=AIzaSyAlRHdGrvbE9kK3yrnamTv0GOR9GQ58II4&Signature=hF8ono-DsZZj-SQr6DPdJ8Rlf3s=';
  console.log(this.url);
  }
  }
}




</script>



<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <div class="details">
    <h4 class="tittle"> {{places.name}}</h4>
    <p class="type"> 
      <span  v-for="category in places.categories"> {{category.name }}
       <span v-if="category!=places.categories[places.categories.length-1]">, 
       </span>
    </span>
    </p>
  
  <p class="address"> 
    <span class="material-icons">location_pin</span>
    {{places.location.formatted_address}}</p>
  <h4 v-if="places.chains.length>0">Cadenas a las que pertenece:</h4>
  <li v-for="chain in places.chains">{{chain.name}}</li>
  
  <h4 v-if="places.related_places.children">Lugares relacionados</h4>
  <li v-for="related in places.related_places.children" v-if="places.related_places.children">{{related.name}}</li>
  </div>
  <div class="map">
    <h3>Dónde encontrarnos</h3>
    <img :src="this.url">
  </div>

</template>

<style>
.tittle{
  font-size: 19px;
}
.details{
  padding: 20px;
  background-color: rgb(186, 199, 199);
  width: 40%;
  height: 10%;
  border-radius: 10px;
}
.map{
  padding: 10px;
  background-color: rgb(186, 199, 199);
  width: 50%;
  height: 20%;
  border-radius: 10px;
  text-align: center;
  padding-bottom: 40px;
}
.type{
  margin-top: -5%;
  font-size: 12px;
}
</style>
