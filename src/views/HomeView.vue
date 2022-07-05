
<script>

import { RouterLink, RouterView } from "vue-router";
import router from '../router';
export default {
  data() {
    return {  
}
},
  mounted(){
    const places = document.getElementById("list");
    places.style.display = "none";
    this.searchresults();
  },
  updated(){
    const places = document.getElementById("list");
    places.style.display = "none";
    this.searchresults();
  },

  methods : {
    searchresults(){
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3aVPOMG8VjhIbGEHZV3mkK8gG7d5OvHSJjEJHPaySywQ='
  }
};
fetch('https://api.foursquare.com/v3/places/search?query='+this.$route.query.query+'&ll='+this.$route.query.ll+'&radius=100000&sort=DISTANCE&limit=20', options)
  .then(response => response.json())
  .then(response => this.fillList(response))
  .catch(err => console.error(err));
  },
  fillList(response){
    const places = document.getElementById("list");
    places.innerHTML = "";
    if (response.results&&response.results.length>0) {
      places.style.display = "block";
    }
    for (const result of response.results) {
      const placeBox = document.createElement("div");
      const placeBoxBody =document.createElement("div");
      const name = document.createElement("h4");
  
      name.textContent = result.name;
      name.addEventListener('click', function(e) {router.push('/about?id=' + result.fsq_id);});
    
      console.log(result);
      laceBox.appendChild(placeBoxBody);
      placeBoxBody.appendChild(name);
      for (var categoryElement of result.categories){
        const category = document.createElement("p");
        const icon = document.createElement("img");
        category.textContent = categoryElement.name;
        placeBoxBody.appendChild(category);
        if(categoryElement.icon){
          icon.src = categoryElement.icon.prefix +"bg_32"+ categoryElement.icon.suffix;
          placeBoxBody.appendChild(icon);
  }
      }
      const distance = document.createElement("p");
      distance.textContent = result.distance + " metres";
      placeBoxBody.appendChild(distance);
      places.appendChild(placeBox);
    }
      },
  }
}
</script>

<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <h1>Bienvenido a tu <br>buscador de sitios.<span class="material-icons">search</span></h1>
  <div id="list"></div>
</template>

<style>

#list{
  border-style: groove;
  padding:20px;
  width:50%;
  border-radius: 10px;
  transform: translateX(30%);
  text-align: right;
  }
</style>